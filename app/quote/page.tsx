// src/app/quote/page.tsx
import { QuoteForm } from "@/components/QuoteForm";
import { isHoldingSite } from "@/lib/siteMode";
import { getServiceMenuItem, normalizeServiceId } from "@/lib/services";
import { redirect } from "next/navigation";

type QuotePageProps = {
  searchParams: Promise<{
    service?: string | string[];
  }>;
};

export default async function QuotePage({ searchParams }: QuotePageProps) {
  if (isHoldingSite()) {
    redirect("/");
  }

  const params = await searchParams;
  const requestedService = Array.isArray(params.service)
    ? params.service[0]
    : params.service;
  const initialServiceType = normalizeServiceId(requestedService);
  const selectedService = getServiceMenuItem(initialServiceType);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div>
            <div className="mb-7 max-w-2xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
                Quote request
              </p>
              <h1 className="text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
                Start the quote conversation
              </h1>
              <p className="text-sm leading-6 text-slate-600">
                Share the vehicle, service, location, and symptoms. We will
                use this to confirm the right service, estimated price, parts,
                and next step.
              </p>
            </div>

            <div className="border border-slate-200 bg-white px-5 py-6 shadow-sm md:px-6 md:py-7">
              <QuoteForm initialServiceType={initialServiceType} />
            </div>
          </div>

          <aside className="space-y-4 border border-slate-200 bg-slate-50 p-5 text-sm lg:sticky lg:top-6">
            {selectedService && (
              <div className="border-b border-slate-200 pb-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-primary">
                  Selected service
                </p>
                <h2 className="mt-2 text-lg font-semibold text-slate-950">
                  {selectedService.name}
                </h2>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Time
                    </p>
                    <p className="mt-1 font-semibold text-slate-950">
                      {selectedService.typicalTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Price
                    </p>
                    <p className="mt-1 font-semibold text-slate-950">
                      {selectedService.priceNote}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-950">
                What happens next
              </h2>
              <div className="space-y-3 text-slate-600">
                <p>
                  We review the request and check whether the job makes sense
                  for mobile service.
                </p>
                <p>
                  We confirm pricing, parts, timing, and any details needed
                  before booking.
                </p>
                <p>
                  If the request is missing something important, we can reply
                  directly to ask for the missing detail.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 text-xs leading-5 text-slate-500">
              Prices shown on the service menu are only planning guides. The
              confirmed quote comes after we review the vehicle and job
              details.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
