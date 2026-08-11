"use client";

import { useState, type FormEvent } from "react";
import {
  getServiceMenuItem,
  normalizeServiceId,
  quoteServiceOptions,
} from "@/lib/services";

type QuoteFormData = {
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

const blankForm: QuoteFormData = {
  name: "",
  email: "",
  phone: "",
  vin: "",
  year: "",
  make: "",
  model: "",
  engine: "",
  mileage: "",
  serviceType: "",
  description: "",
  location: "",
};

type QuoteFormProps = {
  initialServiceType?: string;
};

function createInitialForm(initialServiceType?: string): QuoteFormData {
  return {
    ...blankForm,
    serviceType: normalizeServiceId(initialServiceType),
  };
}

function RequiredMark() {
  return <span className="text-red-500">*</span>;
}

export function QuoteForm({ initialServiceType }: QuoteFormProps) {
  const [form, setForm] = useState<QuoteFormData>(() =>
    createInitialForm(initialServiceType)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const selectedService = getServiceMenuItem(form.serviceType);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send quote request.");
      }

      setStatus("success");
      setForm(createInitialForm(initialServiceType));
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateField<K extends keyof QuoteFormData>(
    key: K,
    value: QuoteFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const inputBase =
    "w-full border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary";
  const labelBase = "mb-1 block text-xs font-semibold text-slate-800";
  const helperBase = "mt-1 text-[11px] leading-4 text-slate-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="border border-brand-accent bg-[#fff8df] px-4 py-3 text-sm leading-6 text-slate-800">
        This starts the quote conversation. We will confirm exact pricing,
        parts, timing, and availability before any work is booked.
      </div>

      <section className="space-y-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-slate-950">
            Contact details
          </h2>
          <p className="text-xs text-slate-500">
            Required so we can reply with the estimate and next step.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelBase} htmlFor="quote-name">
              Name <RequiredMark />
            </label>
            <input
              id="quote-name"
              className={inputBase}
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              autoComplete="name"
              autoFocus
              required
            />
          </div>

          <div>
            <label className={labelBase} htmlFor="quote-email">
              Email <RequiredMark />
            </label>
            <input
              id="quote-email"
              type="email"
              className={inputBase}
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className={labelBase} htmlFor="quote-phone">
              Phone{" "}
              <span className="font-normal text-slate-500">(optional)</span>
            </label>
            <input
              id="quote-phone"
              className={inputBase}
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              autoComplete="tel"
              placeholder="Helpful for faster scheduling"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-slate-950">
            Vehicle information
          </h2>
          <p className="text-xs text-slate-500">
            Year, make, and model are required because parts and labor can vary
            by vehicle.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className={labelBase} htmlFor="quote-year">
              Year <RequiredMark />
            </label>
            <input
              id="quote-year"
              className={inputBase}
              value={form.year}
              onChange={(e) => updateField("year", e.target.value)}
              placeholder="2016"
              required
            />
          </div>

          <div>
            <label className={labelBase} htmlFor="quote-make">
              Make <RequiredMark />
            </label>
            <input
              id="quote-make"
              className={inputBase}
              value={form.make}
              onChange={(e) => updateField("make", e.target.value)}
              placeholder="Toyota"
              required
            />
          </div>

          <div>
            <label className={labelBase} htmlFor="quote-model">
              Model <RequiredMark />
            </label>
            <input
              id="quote-model"
              className={inputBase}
              value={form.model}
              onChange={(e) => updateField("model", e.target.value)}
              placeholder="Camry"
              required
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className={labelBase} htmlFor="quote-mileage">
              Mileage{" "}
              <span className="font-normal text-slate-500">(if known)</span>
            </label>
            <input
              id="quote-mileage"
              className={inputBase}
              value={form.mileage}
              onChange={(e) => updateField("mileage", e.target.value)}
              placeholder="95,000"
            />
          </div>

          <div>
            <label className={labelBase} htmlFor="quote-engine">
              Engine{" "}
              <span className="font-normal text-slate-500">(if known)</span>
            </label>
            <input
              id="quote-engine"
              className={inputBase}
              value={form.engine}
              onChange={(e) => updateField("engine", e.target.value)}
              placeholder="2.5L I4"
            />
          </div>

          <div>
            <label className={labelBase} htmlFor="quote-vin">
              VIN <span className="font-normal text-slate-500">(optional)</span>
            </label>
            <input
              id="quote-vin"
              className={inputBase}
              value={form.vin}
              onChange={(e) => updateField("vin", e.target.value)}
            />
            <p className={helperBase}>
              Found on registration, insurance, or inside the driver door.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-slate-950">
            Service request
          </h2>
          <p className="text-xs text-slate-500">
            Choose the closest menu item and describe what you are noticing.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelBase} htmlFor="quote-service-type">
              Service type <RequiredMark />
            </label>
            <select
              id="quote-service-type"
              className={inputBase}
              value={form.serviceType}
              onChange={(e) => updateField("serviceType", e.target.value)}
              required
            >
              <option value="">Select an option</option>
              {quoteServiceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelBase} htmlFor="quote-location">
              Service location <RequiredMark />
            </label>
            <input
              id="quote-location"
              className={inputBase}
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="City, neighborhood, or address"
              autoComplete="street-address"
              required
            />
          </div>
        </div>

        {selectedService && (
          <div className="border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Typical time
                </p>
                <p className="mt-1 font-semibold text-slate-950">
                  {selectedService.typicalTime}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Price guide
                </p>
                <p className="mt-1 font-semibold text-slate-950">
                  {selectedService.priceNote}
                </p>
              </div>
            </div>
            <details className="mt-3 text-xs leading-5 text-slate-600">
              <summary className="cursor-pointer font-semibold text-slate-800">
                Quote note
              </summary>
              <p className="mt-2">{selectedService.quoteHint}</p>
            </details>
          </div>
        )}

        {form.serviceType === "other" && (
          <div className="border border-brand-accent bg-[#fff8df] px-4 py-3 text-xs leading-5 text-slate-700">
            Not sure is fine. Use the notes box to describe what changed, what
            you hear or see, and whether the car is safe to drive.
          </div>
        )}

        <div>
          <label className={labelBase} htmlFor="quote-description">
            What is going on? <RequiredMark />
          </label>
          <textarea
            id="quote-description"
            className={`${inputBase} min-h-28 resize-y`}
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Include symptoms, warning lights, noises, when it started, and anything already checked."
            required
          />
        </div>
      </section>

      <div className="space-y-4 border-t border-slate-200 pt-5">
        {status === "success" && (
          <div className="border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs leading-5 text-emerald-800">
            Thanks. Your request has been sent. We will review the vehicle
            details and follow up with the next step.
          </div>
        )}
        {status === "error" && (
          <div className="border border-red-200 bg-red-50 px-3 py-2 text-xs leading-5 text-red-800">
            {errorMessage || "Something went wrong sending your request."}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-soft disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? "Sending..." : "Send quote request"}
        </button>

        <p className="text-[11px] leading-5 text-slate-500">
          By submitting, you agree to be contacted by SLK Auto Repair about this
          request. Final pricing is confirmed after we review the vehicle and
          job details.
        </p>
      </div>
    </form>
  );
}
