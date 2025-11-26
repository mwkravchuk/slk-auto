// components/QuoteForm.tsx
"use client";

import { useState } from "react";

type QuoteFormData = {
  name: string;
  email: string;
  phone: string;
  vin: string;
  year: string;
  make: string;
  model: string;
  engine: string;
  serviceType: string;
  description: string;
  location: string;
};

const initialForm: QuoteFormData = {
  name: "",
  email: "",
  phone: "",
  vin: "",
  year: "",
  make: "",
  model: "",
  engine: "",
  serviceType: "",
  description: "",
  location: "",
};

export function QuoteForm() {
  const [form, setForm] = useState<QuoteFormData>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
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
      setForm(initialForm);
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong.");
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
    "w-full border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary placeholder:text-slate-400";
  const labelBase =
    "block text-xs font-medium text-slate-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact info */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-900">
          Your contact details
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelBase}>
              Name<span className="text-red-500">*</span>
            </label>
            <input
              className={inputBase}
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
          </div>
          <div>
            <label className={labelBase}>
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className={inputBase}
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              required
            />
          </div>
          <div>
            <label className={labelBase}>Phone</label>
            <input
              className={inputBase}
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="Optional, but helpful"
            />
          </div>
        </div>
      </section>

      {/* Vehicle info */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-900">
          Vehicle information
        </h2>
        <div>
          <label className={labelBase}>
            VIN{" "}
            <span className="text-[11px] font-normal text-slate-500">
              (optional)
            </span>
          </label>
          <input
            className={inputBase}
            value={form.vin}
            onChange={(e) => updateField("vin", e.target.value)}
          />
          <p className="mt-1 text-[11px] text-slate-500">
            Found on your registration, insurance card, or inside the driver
            door.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <label className={labelBase}>
              Year<span className="text-red-500">*</span>
            </label>
            <input
              className={inputBase}
              value={form.year}
              onChange={(e) => updateField("year", e.target.value)}
              required
            />
          </div>
          <div>
            <label className={labelBase}>
              Make<span className="text-red-500">*</span>
            </label>
            <input
              className={inputBase}
              value={form.make}
              onChange={(e) => updateField("make", e.target.value)}
              required
            />
          </div>
          <div>
            <label className={labelBase}>
              Model<span className="text-red-500">*</span>
            </label>
            <input
              className={inputBase}
              value={form.model}
              onChange={(e) => updateField("model", e.target.value)}
              required
            />
          </div>
          <div>
            <label className={labelBase}>
              Engine{" "}
              <span className="text-[11px] font-normal text-slate-500">
                (if known)
              </span>
            </label>
            <input
              className={inputBase}
              value={form.engine}
              onChange={(e) => updateField("engine", e.target.value)}
              placeholder="e.g. 2.5L I4"
            />
          </div>
        </div>
      </section>

      {/* Service info */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-900">
          What do you need done?
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelBase}>
              Service type<span className="text-red-500">*</span>
            </label>
            <select
              className={inputBase}
              value={form.serviceType}
              onChange={(e) => updateField("serviceType", e.target.value)}
              required
            >
              <option value="">Select an option</option>
              <option value="oil_change">Oil change</option>
              <option value="brakes_front">Front brakes (pads/rotors)</option>
              <option value="battery">Battery replacement</option>
              <option value="diagnostic">
                Check engine light / diagnostic
              </option>
              <option value="other">Other (describe below)</option>
            </select>
          </div>
          <div>
            <label className={labelBase}>
              Location<span className="text-red-500">*</span>
            </label>
            <input
              className={inputBase}
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="City / neighborhood, or address"
              required
            />
          </div>
        </div>

        <div>
          <label className={labelBase}>
            Describe the issue or work needed
          </label>
          <textarea
            className={`${inputBase} min-h-24 resize-y`}
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Any noises, warning lights, or details that might help."
          />
        </div>
      </section>

      {/* Status + submit */}
      <div className="space-y-4">
        {status === "success" && (
          <div className="border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
            Thanks! Your request has been sent. Sam will get back to you soon.
          </div>
        )}
        {status === "error" && (
          <div className="border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800">
            {errorMessage || "Something went wrong sending your request."}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:bg-brand-primary-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Request quote"}
        </button>

        <p className="text-[11px] text-slate-500">
          By submitting, you agree to be contacted by SLK Auto Repair about your
          quote.
        </p>
      </div>
    </form>
  );
}
