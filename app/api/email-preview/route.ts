import { buildOwnerHtml, buildCustomerHtml, type QuoteRequest } from "@/lib/quoteEmails";
import { buildOwnerHtml as originalOwner, buildCustomerHtml as originalCustomer } from "@/lib/quoteEmailsOriginal";

const sample: QuoteRequest = {
  name: "Alex Example", email: "alex@example.com", phone: "916-555-0100",
  year: "2018", make: "Toyota", model: "Camry", engine: "2.5L", mileage: "84000",
  vin: "", serviceType: "brakes", description: "Grinding noise when braking.\nMostly noticeable at low speeds.", location: "Sacramento, CA"
};

export function GET(req: Request) {
  if (process.env.NODE_ENV !== "development") return new Response("Not found", { status: 404 });
  const params = new URL(req.url).searchParams;
  const owner = params.get("type") === "owner";
  const original = params.get("version") === "original";
  const html = original ? (owner ? originalOwner(sample) : originalCustomer(sample)) : (owner ? buildOwnerHtml(sample) : buildCustomerHtml(sample));
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
}
