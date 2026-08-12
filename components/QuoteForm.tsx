"use client";

import { useState, type FormEvent } from "react";
import {
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
  onServiceTypeChange?: (serviceType: string) => void;
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

export function QuoteForm({
  initialServiceType,
  onServiceTypeChange,
}: QuoteFormProps) {
  const [form, setForm] = useState<QuoteFormData>(() =>
    createInitialForm(initialServiceType)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

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

      const resetForm = createInitialForm(initialServiceType);
      setStatus("success");
      setForm(resetForm);
      onServiceTypeChange?.(resetForm.serviceType);
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

    if (key === "serviceType") {
      onServiceTypeChange?.(normalizeServiceId(value));
    }
  }

  const inputBase =
    "w-full border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary";
  const labelBase = "mb-1 block text-xs font-semibold text-slate-800";

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-slate-950">
            Contact details
          </h2>
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
              placeholder="Text preferred"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-slate-950">
            Vehicle information
          </h2>
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
              placeholder="17 characters"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-slate-950">
            Service request
          </h2>
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

        {form.serviceType === "other" && (
          <div className="border border-brand-accent bg-[#fff8df] px-4 py-3 text-xs leading-5 text-slate-700">
            Not sure is fine. Describe what changed, what you hear or see, and
            whether the car is safe to drive.
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
            placeholder="Symptoms, warning lights, noises, when it started, or anything already checked."
            required
          />
        </div>
      </section>

      <div className="space-y-4 border-t border-slate-200 pt-5">
        {status === "success" && (
          <div className="border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs leading-5 text-emerald-800">
            Sent. We will review the details and follow up with the next step.
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
          {isSubmitting ? "Sending..." : "Send request"}
        </button>

        <p className="text-[11px] leading-5 text-slate-500">
          By submitting, you agree to be contacted by SLK Auto Repair about this
          request.
        </p>
      </div>
    </form>
  );
}
