import { getServiceLabel, getServiceMenuItem } from "@/lib/services";

export type QuoteRequest = {
  name: string;
  email: string;
  phone: string;
  vin: string;
  year: string;
  make: string;
  model: string;
  engine: string;
  mileage: string;
  serviceType: string;
  description: string;
  location: string;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return char;
    }
  });
}

function display(value: string) {
  return value || "Not provided";
}

export function vehicleName(request: QuoteRequest) {
  return [request.year, request.make, request.model].filter(Boolean).join(" ");
}

function textField(label: string, value: string) {
  return `- ${label}: ${display(value)}`;
}

function htmlRows(rows: Array<[string, string]>) {
  return rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 8px 0; color: #64748b; vertical-align: top; width: 32%; overflow-wrap: anywhere;">${escapeHtml(
            label
          )}</td>
          <td style="padding: 8px 0; color: #0f172a; font-weight: 600; overflow-wrap: anywhere;">${escapeHtml(
            display(value)
          )}</td>
        </tr>`
    )
    .join("");
}

export function buildOwnerText(request: QuoteRequest) {
  const serviceLabel = getServiceLabel(request.serviceType);
  const selectedService = getServiceMenuItem(request.serviceType);

  const menuGuide = selectedService
    ? `
Menu guide (not final estimate):
${textField("Typical time", selectedService.typicalTime)}
${textField("Price guide", selectedService.priceNote)}
${textField("Helpful context", selectedService.quoteHint)}
`
    : "";

  return `New quote request for SLK Auto Repair

Priority summary:
${textField("Service", serviceLabel)}
${textField("Vehicle", vehicleName(request))}
${textField("Location", request.location)}
${textField("Reply-to email", request.email)}
${textField("Phone", request.phone)}
${menuGuide}
Customer notes:
${display(request.description)}

Vehicle details:
${textField("Year/Make/Model", vehicleName(request))}
${textField("Mileage", request.mileage)}
${textField("Engine", request.engine)}
${textField("VIN", request.vin)}

Customer:
${textField("Name", request.name)}
${textField("Email", request.email)}
${textField("Phone", request.phone)}

Pricing note:
The menu time and price are only planning guides. Confirm exact parts, labor, timing, and final pricing with the customer before booking.`;
}

export function buildOwnerHtml(request: QuoteRequest) {
  const serviceLabel = getServiceLabel(request.serviceType);
  const selectedService = getServiceMenuItem(request.serviceType);
  const notesHtml = escapeHtml(display(request.description)).replace(
    /\n/g,
    "<br />"
  );

  return `<!doctype html>
<html>
  <body style="margin: 0; background: #f8fafc; font-family: Arial, sans-serif; color: #0f172a;">
    <div style="max-width: 680px; margin: 0 auto; padding: 24px;">
      <div style="background: #071b3a; color: white; padding: 24px; border-bottom: 4px solid #f4c041;">
        <p style="margin:0 0 14px; font-size:16px; font-weight:700; letter-spacing:0.04em;">SLK AUTO REPAIR</p>
        <p style="margin: 0 0 8px; color: #f4c041; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">New quote request</p>
        <h1 style="margin: 0; font-size: 26px; line-height: 1.25;">${escapeHtml(
          serviceLabel
        )}</h1>
        <p style="margin: 8px 0 0; color: #cbd5e1;">${escapeHtml(
          vehicleName(request)
        )} - ${escapeHtml(request.location)}</p>
      </div>

      <div style="background: white; border: 1px solid #e2e8f0; border-top: 0; padding: 22px;">
        <h2 style="margin: 0 0 10px; font-size: 16px;">Customer &amp; contact</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          ${htmlRows([
            ["Customer", request.name],
            ["Reply-to email", request.email],
            ["Phone", request.phone],
            ["Vehicle", vehicleName(request)],
            ["Location", request.location],
          ])}
        </table>

        ${
          selectedService
            ? `<div style="margin-top: 18px; background: #fff8df; border-left: 4px solid #f4c041; padding: 14px 16px;">
                <p style="margin: 0 0 8px; font-size: 12px; font-weight: 700; color: #475569; letter-spacing: 0.1em; text-transform: uppercase;">Menu guide, not final estimate</p>
                <p style="margin: 0; font-size: 14px;"><strong>Typical time:</strong> ${escapeHtml(
                  selectedService.typicalTime
                )}</p>
                <p style="margin: 6px 0 0; font-size: 14px;"><strong>Price guide:</strong> ${escapeHtml(
                  selectedService.priceNote
                )}</p>
                <p style="margin: 10px 0 0; font-size: 13px; line-height: 1.5; color: #475569;">${escapeHtml(
                  selectedService.quoteHint
                )}</p>
              </div>`
            : ""
        }

        <div style="margin-top: 22px;">
          <h2 style="margin: 0 0 10px; font-size: 16px;">Customer notes</h2>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 14px 16px; font-size: 14px; line-height: 1.6;">${notesHtml}</div>
        </div>

        <div style="margin-top: 22px;">
          <h2 style="margin: 0 0 10px; font-size: 16px;">Vehicle details</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            ${htmlRows([
              ["Year/Make/Model", vehicleName(request)],
              ["Mileage", request.mileage],
              ["Engine", request.engine],
              ["VIN", request.vin],
            ])}
          </table>
        </div>

        <div style="margin-top: 22px; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; line-height: 1.5; color: #64748b;">
          Menu times and prices are planning guides only. Confirm exact parts, labor, timing, and final pricing with the customer before booking.
        </div>
      </div>
    </div>
  </body>
</html>`;
}

export function buildCustomerText(request: QuoteRequest) {
  const serviceLabel = getServiceLabel(request.serviceType);

  return `Hi ${request.name},

Thanks for reaching out to SLK Auto Repair. We received your request and will review the vehicle details before confirming the next step.

What happens next:
- We check whether the job is a fit for mobile service.
- We confirm parts, pricing, timing, and availability before booking.
- If anything important is missing, we can reply to this email.

Your request:
${textField("Service", serviceLabel)}
${textField("Vehicle", vehicleName(request))}
${textField("Location", request.location)}
${textField("Notes", request.description)}

Final pricing is confirmed after we review the details.

SLK Auto Repair`;
}

export function buildCustomerHtml(request: QuoteRequest) {
  const serviceLabel = getServiceLabel(request.serviceType);

  return `<!doctype html>
<html>
  <body style="margin: 0; background: #f8fafc; font-family: Arial, sans-serif; color: #0f172a;">
    <div style="max-width: 640px; margin: 0 auto; padding: 24px;">
      <div style="background: #071b3a; color: #ffffff; padding: 22px 24px; border-bottom: 4px solid #f4c041;"><p style="margin:0; font-size:22px; font-weight:700; letter-spacing:0.04em;">SLK AUTO REPAIR</p><p style="margin:6px 0 0; color:#cbd5e1; font-size:12px; letter-spacing:0.06em;">MOBILE AUTOMOTIVE SERVICE</p></div>
      <div style="background: white; border: 1px solid #e2e8f0; padding: 24px;">
        <p style="margin: 0 0 8px; color: #0b4f7c; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">SLK Auto Repair</p>
        <h1 style="margin: 0; font-size: 24px; line-height: 1.25;">Thanks for reaching out.</h1>
        <p style="margin: 12px 0 0; color: #475569; line-height: 1.6;">Hi ${escapeHtml(request.name)}, we received your quote request. We will review your vehicle details and follow up to confirm pricing, parts, timing, and availability.</p>

        <div style="margin-top: 20px; background: #fff8df; border-left: 4px solid #f4c041; padding: 14px 16px;">
          <p style="margin: 0; font-weight: 700;">What happens next</p>
          <ol style="margin: 8px 0 0; padding-left: 18px; color: #475569; line-height: 1.6;">
            <li>We check whether the job is a fit for mobile service.</li>
            <li>We confirm parts, pricing, timing, and availability before booking.</li>
            <li>If anything important is missing, we can reply to this email.</li>
          </ol>
        </div>

        <div style="margin-top: 22px;">
          <h2 style="margin: 0 0 10px; font-size: 16px;">Your request</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            ${htmlRows([
              ["Service", serviceLabel],
              ["Vehicle", vehicleName(request)],
              ["Location", request.location],
              ["Notes", request.description],
            ])}
          </table>
        </div>

        <p style="margin: 22px 0 0; font-size: 12px; line-height: 1.5; color: #64748b;">Final pricing is confirmed after we review the details. Need to add something? Simply reply to this email.</p>
      </div>
    </div>
  </body>
</html>`;
}

