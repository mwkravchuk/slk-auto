import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isHoldingSite } from "@/lib/siteMode";
import { getServiceLabel, normalizeServiceId } from "@/lib/services";
import { type QuoteRequest, vehicleName, buildOwnerText, buildOwnerHtml, buildCustomerText, buildCustomerHtml } from "@/lib/quoteEmails";

const requiredFields: Array<[keyof QuoteRequest, string]> = [
  ["name", "Name"],
  ["email", "Email"],
  ["year", "Vehicle year"],
  ["make", "Vehicle make"],
  ["model", "Vehicle model"],
  ["serviceType", "Service type"],
  ["description", "Description"],
  ["location", "Service location"],
];

function readString(body: Record<string, unknown>, key: keyof QuoteRequest) {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

function parseQuoteRequest(body: Record<string, unknown>): QuoteRequest {
  return {
    name: readString(body, "name"),
    email: readString(body, "email"),
    phone: readString(body, "phone"),
    vin: readString(body, "vin"),
    year: readString(body, "year"),
    make: readString(body, "make"),
    model: readString(body, "model"),
    engine: readString(body, "engine"),
    mileage: readString(body, "mileage"),
    serviceType: normalizeServiceId(readString(body, "serviceType")),
    description: readString(body, "description"),
    location: readString(body, "location"),
  };
}

function quoteLog(event: string, submissionId: string, fields: Record<string, unknown> = {}) {
  console.info(JSON.stringify({ event, submissionId, ...fields }));
}

export async function POST(req: Request) {
  if (isHoldingSite()) {
    return NextResponse.json(
      { error: "Quote requests are not available." },
      { status: 404 }
    );
  }

  let submissionId = "unknown";
  try {
    if (!req.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return NextResponse.json({ error: "Expected JSON." }, { status: 415 });
    const reader = req.body?.getReader();
    if (!reader) return NextResponse.json({ error: "Missing request body." }, { status: 400 });
    const decoder = new TextDecoder();
    let bytes = 0;
    let payload = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 16384) { await reader.cancel(); return NextResponse.json({ error: "Request too large." }, { status: 413 }); }
      payload += decoder.decode(value, { stream: true });
    }
    payload += decoder.decode();
    let raw: unknown;
    try { raw = JSON.parse(payload); } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    const body = raw as Record<string, unknown>;
    if (typeof body.submissionId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.submissionId)) return NextResponse.json({ error: "Invalid submission ID. Reload the page and try again." }, { status: 400 });
    submissionId = body.submissionId;
    const allowed = new Set(["submissionId","turnstileToken","name","email","phone","vin","year","make","model","engine","mileage","serviceType","description","location"]);
    for (const [key, value] of Object.entries(body)) {
      if (!allowed.has(key)) return NextResponse.json({ error: "Unexpected form field." }, { status: 400 });
      const max = key === "turnstileToken" ? 2048 : key === "description" ? 3000 : key === "location" ? 300 : 254;
      if (typeof value !== "string" || value.length > max) return NextResponse.json({ error: "Invalid or overly long form field." }, { status: 400 });
    }
    const quoteRequest = parseQuoteRequest(body);
    const missingFields = requiredFields
      .filter(([key]) => !quoteRequest[key])
      .map(([, label]) => label);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}.` },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quoteRequest.email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const mode = process.env.SLK_EMAIL_MODE;
    if (mode !== "test" && mode !== "live") {
      return NextResponse.json({ error: "Email delivery is disabled in this environment." }, { status: 503 });
    }
    if (mode === "live" && process.env.VERCEL_ENV !== "production") {
      return NextResponse.json({ error: "Live email delivery is unavailable here." }, { status: 503 });
    }
    const test = mode === "test";
    const apiKey = process.env.RESEND_API_KEY;
    const to = test ? process.env.SLK_TEST_EMAIL : process.env.SLK_QUOTE_TO_EMAIL;
    const from = process.env.SLK_QUOTE_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      console.error(
        "Missing RESEND_API_KEY, SLK_QUOTE_TO_EMAIL, or SLK_QUOTE_FROM_EMAIL env vars"
      );
      return NextResponse.json(
        { error: "Quote request email is not configured yet." },
        { status: 500 }
      );
    }

    const secret = process.env.TURNSTILE_SECRET_KEY;
    const hostname = process.env.TURNSTILE_EXPECTED_HOSTNAME;
    if (!secret || !hostname) {
      quoteLog("quote.security_config_missing", submissionId);
      return NextResponse.json({ error: "Security check unavailable. Please try again later." }, { status: 503 });
    }
    if (typeof body.turnstileToken !== "string" || !body.turnstileToken) return NextResponse.json({ error: "Please complete the security check." }, { status: 400 });
    try {
      const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: body.turnstileToken }),
        signal: AbortSignal.timeout(8000),
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Verification unavailable");
      const verification = await response.json();
      if (verification.success !== true || verification.hostname !== hostname || verification.action !== "quote") {
        quoteLog("quote.challenge_rejected", submissionId);
        return NextResponse.json({ error: "Security check expired or failed. Please try again." }, { status: 400 });
      }
    } catch {
      quoteLog("quote.challenge_unavailable", submissionId);
      return NextResponse.json({ error: "Security check unavailable. Please try again." }, { status: 503 });
    }
    quoteLog("quote.validated", submissionId, { mode });
    const resend = new Resend(apiKey);
    const serviceLabel = getServiceLabel(quoteRequest.serviceType);
    const subject = `${test ? "[TEST] " : ""}Quote request: ${serviceLabel} - ${vehicleName(
      quoteRequest
    )}`;

    const ownerResult = await resend.emails.send({
      from,
      to,
      subject,
      text: buildOwnerText(quoteRequest),
      html: buildOwnerHtml(quoteRequest),
      replyTo: test ? to : quoteRequest.email,
    }, { idempotencyKey: `quote/${mode}/${submissionId}/owner` });

    if (ownerResult.error) {
      quoteLog("quote.owner_failed", submissionId, { code: ownerResult.error.name });
      return NextResponse.json(
        { error: "Failed to send quote request." },
        { status: 500 }
      );
    }

    quoteLog("quote.owner_accepted", submissionId, { emailId: ownerResult.data?.id });
    try {
    const confirmResult = await resend.emails.send({
      from,
      to: test ? to : quoteRequest.email,
      subject: `${test ? "[TEST] " : ""}We received your quote request - SLK Auto Repair`,
      text: buildCustomerText(quoteRequest),
      html: buildCustomerHtml(quoteRequest),
      replyTo: to,
    }, { idempotencyKey: `quote/${mode}/${submissionId}/customer` });

    if (confirmResult.error) {
      quoteLog("quote.customer_failed", submissionId, { code: confirmResult.error.name });
    } else {
      quoteLog("quote.customer_accepted", submissionId, { emailId: confirmResult.data?.id });
    }

    } catch {
      quoteLog("quote.customer_exception", submissionId);
    }
    return NextResponse.json({ ok: true });
  } catch {
    quoteLog("quote.exception", submissionId);
    return NextResponse.json(
      { error: "Failed to submit quote request." },
      { status: 500 }
    );
  }
}
