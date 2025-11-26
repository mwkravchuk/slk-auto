// src/app/quote/page.tsx
import { QuoteForm } from "@/components/QuoteForm";

export default function QuotePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
      <div className="max-w-2xl">
        <h1 className="mb-2 text-3xl font-semibold text-slate-900">
          Request a mobile repair quote
        </h1>
        <p className="mb-8 text-sm text-slate-600">
          Tell us a bit about your vehicle and what you need done. SLK Auto
          Repair will follow up with an estimated price and time window.
        </p>

        <div className="border border-slate-200 bg-white px-5 py-6 md:px-6 md:py-7">
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}
