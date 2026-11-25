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

export async function POST(req: Request) {
  if (isHoldingSite()) {
    return NextResponse.json(
      { error: "Quote requests are not available." },
      { status: 404 }
    );
  }

  try {
    let raw: unknown;
    try { raw = await req.json(); } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    const body = raw as Record<string, unknown>;
    for (const [key, value] of Object.entries(body)) {
      const max = key === "description" ? 3000 : key === "location" ? 300 : 254;
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
    });

    if (ownerResult.error) {
      console.error("Resend error (to owner):", ownerResult.error);
      return NextResponse.json(
        { error: "Failed to send quote request." },
        { status: 500 }
      );
    }

    try {
    const confirmResult = await resend.emails.send({
      from,
      to: test ? to : quoteRequest.email,
      subject: `${test ? "[TEST] " : ""}We received your quote request - SLK Auto Repair`,
      text: buildCustomerText(quoteRequest),
      html: buildCustomerHtml(quoteRequest),
      replyTo: to,
    });

    if (confirmResult.error) {
      console.error("Resend error (to customer):", confirmResult.error);
    }

    } catch {
      console.error("Customer confirmation send threw after owner email was accepted.");
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error in /api/quote:", err);
    return NextResponse.json(
      { error: "Failed to submit quote request." },
      { status: 500 }
    );
  }
}
