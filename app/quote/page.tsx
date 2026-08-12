// src/app/quote/page.tsx
import { QuoteRequestContent } from "@/components/QuoteRequestContent";
import { isHoldingSite } from "@/lib/siteMode";
import { normalizeServiceId } from "@/lib/services";
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

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
        <h1 className="mb-7 text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
          Request a quote
        </h1>
        <QuoteRequestContent initialServiceType={initialServiceType} />
      </div>
    </div>
  );
}
