// src/app/layout.tsx

import { Manrope } from "next/font/google";

import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { isHoldingSite } from "@/lib/siteMode";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

const instagramUrl = "https://www.instagram.com/slk_autorepair/";
const barRegistrationLabel = "BAR ARD #: pending";
const contactPhoneDisplay = "916-123-1234";
const contactSmsHref = "sms:+19161231234";

export function generateMetadata(): Metadata {
  if (isHoldingSite()) {
    return {
      title: "SLK Auto Repair - Website Coming Soon",
      description: "SLK Auto Repair is building out its website.",
    };
  }

  return {
    title: "SLK Auto Repair - Mobile Auto Repair in Sacramento",
    description:
      "Request a clear quote for mobile auto repair in the Sacramento area. Oil changes, brakes, diagnostics, battery help, and more from SLK Auto Repair.",
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const year = new Date().getFullYear();
  const isHolding = isHoldingSite();

  return (
    <html lang="en">
      <body
        className={`min-h-screen flex flex-col ${
          isHolding ? "bg-brand-dark text-slate-50" : "bg-white text-slate-900"
        } ${manrope.className}`}
      >
        {isHolding ? (
          <main className="flex-1">{children}</main>
        ) : (
          <>
            {/* Dark header frame */}
            <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0f0e1a]/95 text-slate-50 backdrop-blur">
              <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4 md:h-[72px] md:px-6">
                <Link href="/" className="flex shrink-0">
                  <Image
                    src="/images/slk-logo-transparent.png"
                    alt="SLK Auto Repair logo"
                    width={703}
                    height={201}
                    className="h-8 w-auto max-w-full object-contain md:h-10"
                    priority
                  />
                </Link>

                <nav
                  className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300 md:gap-5"
                  aria-label="Main navigation"
                >
                  <Link href="/services" className="hover:text-brand-accent">
                    Services
                  </Link>
                  <Link
                    href="/#about"
                    className="hidden hover:text-brand-accent sm:inline"
                  >
                    About me
                  </Link>
                </nav>

                <div className="flex shrink-0 justify-end">
                  <a
                    href={contactSmsHref}
                    aria-label="Text SLK Auto Repair"
                    className="inline-flex items-center gap-2 text-sm font-medium text-brand-accent"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M21 12a8.5 8.5 0 0 1-8.5 8.5 8.9 8.9 0 0 1-3.7-.8L3 21l1.3-5.2a8.5 8.5 0 1 1 16.7-3.8Z" />
                      <path d="M8 10.5h8" />
                      <path d="M8 14h5.5" />
                    </svg>

                    <span>Text</span>
                  </a>
                </div>
              </div>
            </header>

            {/* Page content */}
            <main className="flex-1 pt-16 md:pt-[72px]">{children}</main>

            {/* Dark footer frame */}
            <footer className="border-t border-slate-700 bg-brand-dark text-slate-500">
              <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-2 text-slate-400">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
                      Contact
                    </h4>
                    <p className="text-xs">
                      Text:{" "}
                      <a
                        href={contactSmsHref}
                        className="font-medium hover:text-brand-accent"
                      >
                        {contactPhoneDisplay}
                      </a>
                    </p>
                    <p className="text-xs">
                      Email:{" "}
                      <span className="font-medium">
                        slkautorepair@gmail.com
                      </span>
                    </p>
                    <p className="text-xs">
                      Service area: Sacramento and nearby neighborhoods.
                    </p>
                    <p className="text-xs">{barRegistrationLabel}</p>
                  </div>

                  <div className="space-y-2 text-slate-400">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
                      Quick links
                    </h4>
                    <div className="flex flex-col gap-1 text-xs">
                      <Link
                        href="/services"
                        className="hover:text-brand-accent"
                      >
                        Services
                      </Link>
                      <Link href="/#about" className="hover:text-brand-accent">
                        About me
                      </Link>
                      <Link href="/quote" className="hover:text-brand-accent">
                        Request a quote
                      </Link>
                      <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="SLK Auto Repair on Instagram"
                        className="mt-2 inline-flex w-fit items-center gap-2 text-slate-300 hover:text-brand-accent"
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <rect
                            width="16"
                            height="16"
                            x="4"
                            y="4"
                            rx="4"
                          />
                          <circle cx="12" cy="12" r="3.25" />
                          <path d="M16.5 7.5h.01" />
                        </svg>
                        <span>Instagram</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-800 pt-4 text-[11px] text-slate-500 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <p>© {year} SLK Auto Repair.</p>
                </div>
              </div>
            </footer>
          </>
        )}
      </body>
    </html>
  );
}
