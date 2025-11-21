// src/app/api/quote/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      vin,
      year,
      make,
      model,
      engine,
      serviceType,
      description,
      location,
    } = body ?? {};

    // Basic validation
    if (!name || !email || !year || !make || !model || !serviceType || !location) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Build the text summary that we'll put in the email
    const summary = `
New quote request for SLK Auto Repair

Customer:
- Name: ${name}
- Email: ${email}
- Phone: ${phone || "N/A"}

Vehicle:
- VIN: ${vin || "N/A"}
- Year/Make/Model: ${[year, make, model].filter(Boolean).join(" ")}
- Engine: ${engine || "N/A"}

Service:
- Type: ${serviceType}
- Description: ${description || "N/A"}

Location:
- ${location}
`;

    // send email to Sam
    const to = process.env.SLK_QUOTE_TO_EMAIL;
    const from = process.env.SLK_QUOTE_FROM_EMAIL;

    if (!to || !from) {
      console.error("Missing SLK_QUOTE_TO_EMAIL or SLK_QUOTE_FROM_EMAIL env vars");
    } else {
      await resend.emails.send({
        from,
        to,
        subject: "New mobile repair quote request",
        text: summary,
        replyTo: email, // so Sam can just reply to the customer
      });
    }

    // send email to customer to confirm
    const { data: confirmData, error: confirmError } = await resend.emails.send({
      from: from || "no-reply@slk-auto.com",
      to: email,
      subject: "We received your quote request – SLK Auto Repair",
      text: `Hi ${name},

Thanks for reaching out to SLK Auto Repair. We’ve received your request and will follow up with an estimated price and time window.

Here’s what you submitted:
${summary}

If anything looks off, you can reply to this email with corrections.

– SLK Auto Repair`,
    });

    if (confirmError) {
      console.error("Resend error (to customer):", confirmError);
    } else {
      console.log("Resend success (to customer):", confirmData);
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
