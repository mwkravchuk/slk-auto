"use client";

import Image from "next/image";
import { useState } from "react";
import { QuoteForm } from "@/components/QuoteForm";
import {
  getServiceMenuItem,
  normalizeServiceId,
} from "@/lib/services";

type QuoteRequestContentProps = {
  initialServiceType?: string;
};

function RequestNote() {
  return (
    <div className="border border-brand-accent bg-[#fff8df] px-4 py-3 text-sm leading-6 text-slate-800 md:px-5 md:py-4">
      <h2 className="font-semibold text-slate-950">
        Before anything is booked
      </h2>
      <p className="mt-1">
        This form starts the conversation. Final pricing, parts, and timing are
        confirmed after the request is reviewed.
      </p>
    </div>
  );
}

function SelectedServiceCard({ serviceType }: { serviceType: string }) {
  const selectedService = getServiceMenuItem(serviceType);

  if (!selectedService) {
    return null;
  }

  return (
    <div className="overflow-hidden border border-slate-200 bg-slate-50 text-sm shadow-sm">
      {selectedService.imageSrc && (
        <div className="relative h-40 w-full bg-slate-100">
          <Image
            src={selectedService.imageSrc}
            alt={selectedService.imageAlt ?? ""}
            fill
            sizes="(max-width: 1024px) 100vw, 320px"
            className="object-cover"
          />
        </div>
      )}

      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-primary">
          Selected service
        </p>
        <h2 className="mt-2 text-lg font-semibold text-slate-950">
          {selectedService.name}
        </h2>
        <p className="mt-2 text-xs leading-5 text-slate-600">
          {selectedService.summary}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
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
    </div>
  );
}

export function QuoteRequestContent({
  initialServiceType,
}: QuoteRequestContentProps) {
  const [selectedServiceType, setSelectedServiceType] = useState(() =>
    normalizeServiceId(initialServiceType)
  );
  const hasSelectedService = Boolean(getServiceMenuItem(selectedServiceType));

  return (
    <div
      className={`grid gap-8 lg:items-start ${
        hasSelectedService ? "lg:grid-cols-[minmax(0,1fr)_320px]" : ""
      }`}
    >
      <div className="space-y-5">
        <RequestNote />

        {hasSelectedService && (
          <div className="lg:hidden">
            <SelectedServiceCard serviceType={selectedServiceType} />
          </div>
        )}

        <div className="border border-slate-200 bg-white px-5 py-6 shadow-sm md:px-6 md:py-7">
          <QuoteForm
            initialServiceType={initialServiceType}
            onServiceTypeChange={setSelectedServiceType}
          />
        </div>
      </div>

      {hasSelectedService && (
        <aside className="hidden lg:sticky lg:top-24 lg:block">
          <SelectedServiceCard serviceType={selectedServiceType} />
        </aside>
      )}
    </div>
  );
}
