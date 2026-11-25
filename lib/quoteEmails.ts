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

const logoUrl = "https://www.slkautorepair.com/images/slk-logo-transparent.png";

function rows(fields: Array<[string, string]>) {
  return fields.map(([label, value]) => `<tr><td width="34%" valign="top" style="padding:7px 8px 7px 0;color:#475569;font-size:14px;line-height:1.5;">${escapeHtml(label)}</td><td valign="top" style="padding:7px 0;color:#0f172a;font-size:14px;line-height:1.5;font-weight:600;overflow-wrap:anywhere;word-break:break-word;">${escapeHtml(display(value)).replace(/\n/g,"<br>")}</td></tr>`).join("");
}

function section(title: string, html: string) {
  return `<h2 style="font-size:17px;line-height:1.4;margin:0 0 8px;color:#071b3a;">${escapeHtml(title)}</h2>${html}`;
}

function table(fields: Array<[string, string]>) {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;table-layout:fixed;">${rows(fields)}</table>`;
}

function shell(title: string, subtitle: string, body: string) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;"><tr><td align="center" style="padding:10px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;"><tr><td align="center" bgcolor="#071b3a" style="background:#071b3a;color:#ffffff;padding:32px 10px 28px;border-bottom:3px solid #f4c041;"><img src="${logoUrl}" alt="SLK Auto Repair" width="200" style="display:block;width:200px;max-width:100%;height:auto;margin:0 auto 24px;color:#ffffff;font-size:18px;"><h1 style="margin:0;color:#ffffff;font-size:30px;font-weight:600;line-height:1.15;letter-spacing:-0.7px;">${escapeHtml(title)}</h1><p style="margin:12px 0 0;color:#dbe3ee;font-size:15px;line-height:1.5;">${escapeHtml(subtitle)}</p></td></tr><tr><td bgcolor="#ffffff" style="background:#ffffff;padding:22px 10px 24px;">${body}</td></tr></table></td></tr></table></body></html>`;
}

function button(label: string, href: string, gold = false) {
  return `<a href="${escapeHtml(href)}" style="display:inline-block;background:${gold ? "#f4c041" : "#071b3a"};color:${gold ? "#071b3a" : "#ffffff"};font-size:14px;font-weight:700;text-decoration:none;padding:12px 16px;margin:4px;border-radius:6px;">${escapeHtml(label)}</a>`;
}

function requestFields(request: QuoteRequest): Array<[string, string]> {
  return [["Service", getServiceLabel(request.serviceType)], ["Vehicle", vehicleName(request)], ["Location", request.location], ["Notes", request.description]];
}

function contactFields(request: QuoteRequest): Array<[string, string]> {
  return [["Name", request.name], ["Email", request.email], ["Phone", request.phone]].filter((field) => field[1]) as Array<[string,string]>;
}

function vehicleFields(request: QuoteRequest): Array<[string, string]> {
  return [["Mileage", request.mileage], ["Engine", request.engine], ["VIN", request.vin]].filter((field) => field[1]) as Array<[string,string]>;
}

function plain(fields: Array<[string,string]>) {
  return fields.map(([label,value]) => label + ": " + display(value)).join("\n");
}

export function buildCustomerText(request: QuoteRequest) {
  return `Request received

We'll review your request and follow up with pricing and availability.

Your request
${plain(requestFields(request))}

Need to add anything? Reply to this email.

SLK Auto Repair`;
}

export function buildCustomerHtml(request: QuoteRequest) {
  return shell("Request received", "We'll review your request and follow up with pricing and availability.", section("Your request", table(requestFields(request))) + '<p style="margin:20px 0 0;color:#475569;font-size:14px;line-height:1.5;">Need to add anything? Reply to this email.</p>');
}

export function buildOwnerText(request: QuoteRequest) {
  const guide = getServiceMenuItem(request.serviceType);
  const vehicle = vehicleFields(request);
  return `New quote request — ${getServiceLabel(request.serviceType)}
${vehicleName(request)} · ${request.location}

Customer
${plain(contactFields(request))}

Customer notes
${request.description}${vehicle.length ? "\n\nVehicle details\n" + plain(vehicle) : ""}${guide ? "\n\nPlanning guide (not a final quote)\n" + plain([["Typical time",guide.typicalTime],["Price",guide.priceNote]]) : ""}`;
}

export function buildOwnerHtml(request: QuoteRequest) {
  const guide = getServiceMenuItem(request.serviceType);
  const phone = request.phone.replace(/[^\d]/g, "");
  const vehicle = vehicleFields(request);
  const actions = button("Email customer", "mailto:" + encodeURIComponent(request.email), true) + (phone ? button("Call customer", "tel:" + (request.phone.trim().startsWith("+") ? "+" : "") + phone) : "");
  const notes = `<p style="margin:0;font-size:15px;line-height:1.6;overflow-wrap:anywhere;">${escapeHtml(request.description).replace(/\n/g,"<br>")}</p>`;
  const block = (html: string) => `<div style="border-top:1px solid #e2e8f0;padding-top:16px;margin-top:16px;">${html}</div>`;
  return shell(getServiceLabel(request.serviceType), vehicleName(request) + " · " + request.location,
    `<div style="text-align:center;margin:0 0 16px;">${actions}</div>` +
    section("Customer", table(contactFields(request))) +
    block(section("Customer notes",notes)) +
    (vehicle.length ? block(section("Vehicle details",table(vehicle))) : "") +
    (guide ? block(section("Planning guide (not a final quote)",table([["Typical time",guide.typicalTime],["Price",guide.priceNote]]))) : ""));
}
