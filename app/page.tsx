// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { isHoldingSite } from "@/lib/siteMode";

const quickServiceLinks = [
  { label: "Oil change", href: "/quote?service=oil_change" },
  { label: "Brakes", href: "/quote?service=brakes" },
  { label: "Battery", href: "/quote?service=battery_replacement" },
  { label: "Check engine light", href: "/quote?service=diagnostics" },
  { label: "Not sure yet", href: "/quote?service=other" },
];

function HoldingPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-white px-4 text-slate-900">
      <div className="max-w-xl text-center">
        <h1 className="text-2xl font-medium leading-snug md:text-3xl">
          This website is a work in progress.
        </h1>
      </div>
    </section>
  );
}

export default function HomePage() {
  if (isHoldingSite()) {
    return <HoldingPage />;
  }

  return (
    <div className="bg-white">
      <section className="relative w-full bg-brand-dark text-slate-50">
        <div className="relative h-[400px] w-full sm:h-[500px] md:h-[64vh]">
          <Image
            src="/images/hero-van.jpeg"
            alt="Mobile auto repair van"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-brand-dark/95 via-brand-dark/78 to-brand-dark/20" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white to-transparent" />

          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-5xl items-center px-4 pb-10 md:px-6 md:pb-14">
              <div className="max-w-xl space-y-5">
                <div className="space-y-3">
                  <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
                    SLK Auto Repair
                  </h1>
                  <p className="max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
                    Mobile auto repair that comes to you for maintenance,
                    brakes, diagnostics, and no-start help.
                  </p>
                </div>

                <div className="grid gap-3 sm:flex sm:flex-wrap sm:items-center">
                  <Link
                    href="/services"
                    className="inline-flex w-full items-center justify-center bg-brand-accent px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-[#f3aa00] sm:w-auto"
                  >
                    Choose a service
                  </Link>
                  <Link
                    href="/quote"
                    className="inline-flex w-full items-center justify-center border border-white/65 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/18 sm:w-auto"
                  >
                    Describe the issue
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-20 bg-white py-14 md:py-16">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl font-semibold text-slate-950 md:text-3xl">
              What I can help with
            </h2>
            <p className="text-sm leading-6 text-slate-600">
              Common mobile services for everyday maintenance and repairs. The
              full services page has rough time ranges and quote guidance when
              you want more detail.
            </p>
          </div>

          <div className="mt-8 space-y-7 md:mt-10 md:space-y-4">
            <article className="md:flex md:items-center md:gap-8">
              <div className="relative h-52 w-full overflow-hidden bg-slate-100 sm:h-64 md:w-[46%]">
                <Image
                  src="/images/service-oil.avif"
                  alt="Motor oil being poured into an engine"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center py-4 md:flex-1 md:py-0">
                <h3 className="text-xl font-semibold text-slate-950">
                  Oil changes and basic maintenance
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Routine oil service and quick maintenance checks to keep your
                  vehicle healthy between bigger repairs.
                </p>
              </div>
            </article>

            <article className="md:flex md:flex-row-reverse md:items-center md:gap-8">
              <div className="relative h-52 w-full overflow-hidden bg-slate-100 sm:h-64 md:w-[46%]">
                <Image
                  src="/images/service-brakes.avif"
                  alt="Disc brake and caliper close up"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center py-4 md:flex-1 md:py-0">
                <h3 className="text-xl font-semibold text-slate-950">
                  Brakes and repair work
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Brake pads, rotors, grinding or squealing sounds, starters,
                  alternators, suspension concerns, and other repair requests
                  that make sense for mobile service.
                </p>
              </div>
            </article>

            <article className="md:flex md:items-center md:gap-8">
              <div className="relative h-52 w-full overflow-hidden bg-slate-100 sm:h-64 md:w-[46%]">
                <Image
                  src="/images/service-battery.avif"
                  alt="Mechanic testing a car battery"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center py-4 md:flex-1 md:py-0">
                <h3 className="text-xl font-semibold text-slate-950">
                  Diagnostics and no-start help
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Check engine lights, drivability problems, battery testing,
                  and charging-system issues where a clear first look can point
                  the job in the right direction.
                </p>
              </div>
            </article>
          </div>

          <div className="mt-9 border-t border-slate-200 pt-8 pb-2 md:mt-16 md:flex md:items-center md:justify-between md:gap-8 md:border-t-0 md:pt-0">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold leading-tight text-slate-950">
                Need help with your car?
              </h3>
              <div className="flex flex-wrap gap-2">
                {quickServiceLinks.map((service) => (
                  <Link
                    key={service.label}
                    href={service.href}
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-primary hover:bg-brand-accent-soft/60 hover:text-brand-primary"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/services"
              className="mt-5 inline-flex w-full items-center justify-center bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-soft sm:w-auto md:mt-0 md:shrink-0"
            >
              Choose a service
            </Link>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-20 border-y border-slate-200 bg-slate-50 py-14 md:py-16"
      >
        <div className="mx-auto grid max-w-5xl gap-7 px-4 md:grid-cols-[1fr_0.9fr] md:items-center md:gap-12 md:px-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-950 md:text-3xl">
              About me
            </h2>
            <p className="text-sm leading-6 text-slate-600">
              Good mobile repair should feel straightforward: clear
              communication, careful work, and a process that does not make you
              rearrange your whole day.
            </p>
            <p className="text-sm leading-6 text-slate-600">
              I treat every car like something important because it is. The goal
              is to handle the work the right way, explain what is happening,
              and make it easy to schedule the next step.
            </p>
          </div>

          <div
            className="min-h-[260px] border border-slate-200 bg-slate-100 md:min-h-[320px]"
            aria-hidden="true"
          />
        </div>
      </section>

      <section className="bg-white py-14 md:py-16">
        <div className="mx-auto max-w-5xl space-y-7 px-4 md:px-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-slate-950">
              Service area
            </h2>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Mobile service around Sacramento. Share your location when
              requesting a quote and I will confirm availability before booking.
            </p>
          </div>

          <div className="relative h-56 w-full overflow-hidden border border-slate-200 bg-slate-100 sm:h-64 md:h-80">
            <iframe
              src="https://www.google.com/maps?ll=38.535376,-121.363790&z=11&output=embed"
              title="General Sacramento service area map"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-44 w-44 rounded-full border-2 border-brand-primary/75 bg-brand-primary/15 shadow-[0_0_0_1px_rgba(255,255,255,0.75)_inset] sm:h-56 sm:w-56 md:h-72 md:w-72" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-dark text-white">
        <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-2xl font-semibold">
                Ready to start the quote?
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Send the vehicle details once. I can use that to confirm the
                right service, parts, estimate, and appointment window.
              </p>
            </div>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center bg-brand-accent px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-[#f3aa00]"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
