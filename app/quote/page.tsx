// src/app/quote/page.tsx
import { QuoteForm } from "@/components/QuoteForm";

export default function QuotePage() {
  return (
    <main className="py-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold mb-2">
          Request a Mobile Repair Quote
        </h1>
        <p className="text-slate-300 mb-8">
          Fill out a few details about your vehicle and the work you need. SLK
          Auto Repair will follow up with an estimated price and time window.
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <QuoteForm />
        </div>
      </div>
    </main>
  );
}

