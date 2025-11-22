// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="space-y-12 md:space-y-14">
      {/* FULL-WIDTH HERO */}
      <section className="relative w-full bg-slate-950 text-slate-50">
        <div className="relative h-80 w-full md:h-[70vh]">
          {/* Background image */}
          <Image
            src="/images/hero-van.jpeg"
            alt="Mobile auto repair van"
            fill
            priority
            className="object-cover"
          />
          {/* Dark gradient overlay so text is readable */}
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-brand-dark/70 to-brand-dark/15" />

          {/* Centered content with constrained width */}
          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-5xl items-center px-4 md:px-6">
              <div className="max-w-lg space-y-4">

                {/* Short, bold copy */}
                <p className="text-3xl md:text-4xl font-semibold leading-snug">
                  Mobile auto repair that comes to you. Brakes, oil changes,
                  diagnostics, and more in the Sacramento area.
                </p>

                {/* Big CTAs */}
                <div className="my-10">
                  <div className="flex flex-wrap items-center gap-3 my-3">
                    <Link
                      href="/quote"
                      className="inline-flex items-center justify-center bg-brand-accent px-6 py-2.5 text-sm font-semibold text-slate-950 hover:bg-[#ffb917]"
                    >
                      Request a quote
                    </Link>
                    <a
                      href="tel:+1-555-555-5555"
                      className="inline-flex items-center justify-center border border-slate-200 bg-white/95 px-6 py-2.5 text-sm font-semibold text-slate-900 hover:border-brand-primary hover:text-brand-primary-soft"
                    >
                      Call for service
                    </a>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Typical response time: under 1 business day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT (CONSTRAINED WIDTH, WHITE BACKGROUND) */}
      <div className="mx-auto max-w-5xl px-4 md:px-6 space-y-10 md:space-y-12 pb-12">
        {/* Slim services row – no cards, just clean text with subtle separators */}
        <section className="space-y-4">
          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
            <h2 className="text-lg font-semibold text-slate-900">
              What we can help with
            </h2>
            <Link
              href="/quote"
              className="text-xs font-medium text-brand-primary hover:text-brand-primary-soft"
            >
              Not sure what you need? Describe the problem →
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3 text-sm">
            {[
              {
                title: "Brakes",
                body: "Pads and rotors, brake noise, soft pedal feel.",
              },
              {
                title: "Oil & basic service",
                body: "Oil changes and simple maintenance checks.",
              },
              {
                title: "No-start & battery",
                body: "Battery testing and replacement when the car won’t start.",
              },
            ].map((item) => (
              <div key={item.title} className="space-y-1 border-t border-slate-200 pt-3">
                <h3 className="text-sm font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Service area – just lines + text, no box */}
        <section className="space-y-2 border-t border-slate-200 pt-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Service area
          </h2>
          <p className="text-sm text-slate-600 max-w-xl">
            Based in Sacramento. Serving nearby neighborhoods and cities (this
            text will be updated once Sam locks in his exact coverage area).
          </p>
          <p className="text-xs text-slate-500">
            Not sure if you&apos;re in range? Send a quote request with your
            address and we&apos;ll confirm.
          </p>
        </section>

        {/* Final CTA band – one intentional use of a filled background */}
        <section className="border-y border-slate-200 bg-brand-accent-soft px-5 py-6 md:px-6 md:py-7">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Ready to get your car looked at?
              </h2>
              <p className="text-sm text-slate-700 max-w-md">
                Tell us a bit about your vehicle and what&apos;s going on.
                We&apos;ll follow up with an estimated price and time window.
              </p>
            </div>
            <Link
              href="/quote"
              className="inline-flex items-center bg-slate-950 px-5 py-2.5 text-sm font-semibold text-brand-accent hover:bg-slate-900"
            >
              Request a quote
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
