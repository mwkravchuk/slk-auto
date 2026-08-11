import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isHoldingSite } from "@/lib/siteMode";
import { serviceMenu, type ServiceMenuItem } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services - SLK Auto Repair",
  description:
    "View common SLK Auto Repair mobile mechanic services, planning times, and quote guidance.",
};

const obviousServiceIds = [
  "oil_change",
  "brakes",
  "battery_replacement",
] as const;

const issueCards: Array<{
  title: string;
  href: string;
}> = [
  {
    title: "Car will not start",
    href: "/quote?service=other",
  },
  {
    title: "Check engine light",
    href: "/quote?service=diagnostics",
  },
  {
    title: "Grinding or shaking",
    href: "/quote?service=other",
  },
  {
    title: "Battery or electrical",
    href: "/quote?service=other",
  },
  {
    title: "Something else",
    href: "/quote?service=other",
  },
];

const serviceById = new Map(serviceMenu.map((service) => [service.id, service]));

function servicesForIds(serviceIds: readonly string[]) {
  return serviceIds
    .map((serviceId) => serviceById.get(serviceId))
    .filter((service): service is ServiceMenuItem => Boolean(service));
}

export default function ServicesPage() {
  if (isHoldingSite()) {
    redirect("/");
  }

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-5xl px-4 pt-10 pb-20 md:px-6 md:pt-14 md:pb-28">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <h1 className="text-2xl font-semibold leading-tight text-slate-950 md:text-3xl">
            Services
          </h1>
          <p className="max-w-2xl text-xs leading-5 text-slate-500 md:text-right">
            We will confirm the final quote after reviewing the vehicle
            details.
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          <section>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {servicesForIds(obviousServiceIds).map((service) => (
                <Link
                  key={service.id}
                  href={`/quote?service=${service.id}`}
                  className="group flex min-h-full flex-col overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-200 ease-out hover:border-brand-primary/60 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                >
                  {service.imageSrc && (
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100 md:h-52">
                      <Image
                        src={service.imageSrc}
                        alt={service.imageAlt ?? ""}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col gap-5 p-5 md:p-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold leading-snug text-slate-950 transition-colors group-hover:text-brand-primary">
                        {service.name}
                      </h3>
                      <p className="text-xs leading-5 text-slate-500">
                        {service.summary}
                      </p>
                      {service.id === "oil_change" && (
                        <p className="text-[11px] leading-5 text-slate-500">
                          * Diesel and European vehicles can cost more
                          depending on oil spec, capacity, and parts.
                        </p>
                      )}
                    </div>

                    <div className="mt-auto grid grid-cols-2 gap-3 border-y border-slate-200 py-3">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                          Time
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-950">
                          {service.typicalTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                          Price
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-950">
                          {service.priceNote}
                        </p>
                      </div>
                    </div>

                    <span className="text-sm font-semibold text-brand-primary transition-colors group-hover:text-brand-primary-soft">
                      Start quote
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="pb-2 md:pb-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <h2 className="text-sm font-semibold text-slate-950">
                Not sure what it needs?
              </h2>
              <div className="flex flex-wrap gap-2 lg:flex-nowrap lg:justify-end">
                {issueCards.map((card) => (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="inline-flex min-h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 shadow-sm transition-colors duration-200 hover:border-brand-primary hover:bg-brand-accent-soft/60 hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                  >
                    <span className="whitespace-nowrap">
                      {card.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
