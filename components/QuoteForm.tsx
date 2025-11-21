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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact info */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-100">
          Your contact details
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Name<span className="text-red-400">*</span>
            </label>
            <input
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Email<span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Phone</label>
            <input
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Vehicle info */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-100">
          Vehicle information
        </h2>
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            VIN <span className="text-slate-400 text-xs">(optional)</span>
          </label>
          <input
            className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500"
            value={form.vin}
            onChange={(e) => updateField("vin", e.target.value)}
          />
          <p className="mt-1 text-xs text-slate-400">
            Recommended if you have it handy (on registration or driver door).
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Year<span className="text-red-400">*</span>
            </label>
            <input
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500"
              value={form.year}
              onChange={(e) => updateField("year", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Make<span className="text-red-400">*</span>
            </label>
            <input
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500"
              value={form.make}
              onChange={(e) => updateField("make", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Model<span className="text-red-400">*</span>
            </label>
            <input
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500"
              value={form.model}
              onChange={(e) => updateField("model", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Engine <span className="text-slate-400 text-xs">(if known)</span>
            </label>
            <input
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500"
              value={form.engine}
              onChange={(e) => updateField("engine", e.target.value)}
              placeholder="e.g. 2.5L I4"
            />
          </div>
        </div>
      </section>

      {/* Service info */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-100">
          What do you need done?
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Service type<span className="text-red-400">*</span>
            </label>
            <select
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500"
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
            <label className="block text-sm text-slate-300 mb-1">
              Location<span className="text-red-400">*</span>
            </label>
            <input
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500"
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="City / neighborhood, or address"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Describe the issue or work needed
          </label>
          <textarea
            className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500 min-h-20"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Any noises, warning lights, or details that might help."
          />
        </div>
      </section>

      {/* Status + submit */}
      <div className="space-y-3">
        {status === "success" && (
          <p className="text-sm text-emerald-400">
            Thanks! Your request has been sent. Sam will get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-400">
            {errorMessage || "Something went wrong sending your request."}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Request quote"}
        </button>

        <p className="text-xs text-slate-500">
          By submitting, you agree to be contacted by SLK Auto Repair about your
          quote.
        </p>
      </div>
    </form>
  );
}
