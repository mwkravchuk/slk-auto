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
                <p className="text-3xl md:text-4xl font-semibold leading-snug">
                  Mobile auto repair that comes to you. Brakes, oil changes,
                  diagnostics, and more in the Sacramento area.
                </p>

                <div className="my-10">
                  <div className="flex flex-wrap items-center gap-3 my-3">
                    <Link
                      href="/quote"
                      className="inline-flex items-center justify-center bg-brand-accent px-6 py-2.5 text-sm font-semibold text-slate-950 hover:bg-[#ffb917] transition-transform duration-150 ease-out hover:-translate-y-0.25"
                    >
                      Request a quote
                    </Link>
                    <a
                      href="tel:+1-555-555-5555"
                      className="inline-flex items-center justify-center border border-slate-200 bg-white/95 px-6 py-2.5 text-sm font-semibold text-slate-900  hover:text-brand-primary-soft transition-transform duration-150 ease-out hover:-translate-y-0.25"
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
        {/* Services intro */}
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
        </section>

        {/* Big service sections */}
        <section className="space-y-10 md:space-y-11">
          {/* Brakes */}
          <article className="group border border-slate-200 bg-white md:flex transition-shadow duration-200 ease-out hover:shadow-md">
            <div className="relative h-56 w-full md:h-72 md:w-1/2 overflow-hidden">
              <Image
                src="/images/service-brakes.avif"
                alt="Disc brake and caliper close up"
                fill
                className="object-cover transition-transform duration-200 ease-out group-hover:scale-102"
              />
            </div>
            <div className="px-5 py-6 md:w-1/2 md:px-6 md:py-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Brakes
              </h3>
              <p className="text-sm text-slate-700 mb-3">
                Pads and rotors, brake noise, soft or spongy pedal feel. If your
                car isn&apos;t stopping the way it should, we can inspect and
                replace what&apos;s needed on-site.
              </p>
              <p className="text-xs text-slate-500">
                Let us know if you&apos;re feeling vibrations, grinding, or hear
                any squealing — that helps narrow things down before Sam shows
                up.
              </p>
            </div>
          </article>

          {/* Oil & basic service */}
          <article className="group border border-slate-200 bg-slate-50 md:flex md:flex-row-reverse transition-shadow duration-200 ease-out hover:shadow-md">
            <div className="relative h-56 w-full md:h-72 md:w-1/2 overflow-hidden">
              <Image
                src="/images/service-oil.avif"
                alt="Motor oil being poured into an engine"
                fill
                className="object-cover transition-transform duration-200 ease-out group-hover:scale-102"
              />
            </div>
            <div className="px-5 py-6 md:w-1/2 md:px-6 md:py-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Oil & basic service
              </h3>
              <p className="text-sm text-slate-700 mb-3">
                Routine oil changes and simple maintenance checks to keep your
                vehicle healthy and avoid bigger issues down the road.
              </p>
              <p className="text-xs text-slate-500">
                Share your vehicle&apos;s approximate mileage and last service
                date in your quote request if you know it.
              </p>
            </div>
          </article>

          {/* No-start & battery */}
          <article className="group border border-slate-200 bg-white md:flex transition-shadow duration-200 ease-out hover:shadow-md">
            <div className="relative h-56 w-full md:h-72 md:w-1/2 overflow-hidden">
              <Image
                src="/images/service-battery.avif"
                alt="Mechanic testing a car battery"
                fill
                className="object-cover transition-transform duration-200 ease-out group-hover:scale-102"
              />
            </div>
            <div className="px-5 py-6 md:w-1/2 md:px-6 md:py-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                No-start & battery
              </h3>
              <p className="text-sm text-slate-700 mb-3">
                Car won&apos;t start? We can test your battery and charging
                system and replace the battery on-site if needed.
              </p>
              <p className="text-xs text-slate-500">
                Mention any clicking sounds, dim lights, or if the issue is
                intermittent — that helps point us in the right direction.
              </p>
            </div>
          </article>
        </section>

        {/* Service area – now with map image */}
        <section className="space-y-10 border-t border-slate-200 mt-20 pt-10">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              Service area
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              Based in Sacramento. Serving nearby neighborhoods and cities.
            </p>
            <p className="text-xs text-slate-500">
              Not sure if you&apos;re in range? Send a quote request with your
              address and we&apos;ll confirm.
            </p>
          </div>

          <div className="relative h-64 w-full border border-slate-200 bg-slate-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3120.9849163523495!2d-121.35064672384254!3d38.5341158680573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ac35df12a1c93%3A0x4cde1b9f4656eaae!2sCordova%20Golf%20Course!5e0!3m2!1sen!2sus!4v1764139244354!5m2!1sen!2sus"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen>
            </iframe>
          </div>
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
