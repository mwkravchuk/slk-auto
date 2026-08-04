// src/app/layout.tsx

import { Inter } from "next/font/google";

import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { isHoldingSite } from "@/lib/siteMode";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

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
      "Mobile auto repair that comes to you. Brakes, oil changes, diagnostics, and more from SLK Auto Repair in the Sacramento area.",
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
        } ${inter.className}`}
      >
        {isHolding ? (
          <main className="flex-1">{children}</main>
        ) : (
          <>
            {/* Dark header frame */}
            <header className="bg-brand-dark text-slate-50">
              <div className="mx-auto grid max-w-5xl grid-cols-3 items-center px-4 md:px-6">
                {/* Left column: empty spacer (keeps logo truly centered) */}
                <div />

                {/* Center: logo */}
                <Link href="/" className="flex justify-center">
                  <Image
                    src="/images/slk-logo.jpeg"
                    alt="SLK Auto Repair logo"
                    width={984}
                    height={727}
                    className="h-20 w-auto max-w-full object-contain md:h-24"
                    priority
                  />
                </Link>

                {/* Right: phone (always occupies the column, but hides text on mobile) */}
                <div className="flex justify-end">
                  <a
                    href="tel:+19161231234"
                    className="inline-flex items-center gap-2 text-sm font-medium text-brand-accent"
                  >
                    {/* icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M2.25 6.75c0 7.455 6.045 13.5 13.5 13.5.966 0 1.91-.102 2.823-.297a1.125 1.125 0 00.927-1.102v-3.345a1.125 1.125 0 00-.84-1.086l-3.21-.803a1.125 1.125 0 00-1.173.417l-1.04 1.39a10.522 10.522 0 01-4.7-4.7l1.39-1.04a1.125 1.125 0 00.417-1.173l-.803-3.21a1.125 1.125 0 00-1.086-.84H3.647a1.125 1.125 0 00-1.102.927c-.195.913-.297 1.857-.297 2.823z" />
                    </svg>

                    {/* hide number on small screens but keep the element present */}
                    <span className="hidden sm:inline">916-123-1234</span>
                  </a>
                </div>
              </div>
            </header>

            {/* Page content */}
            <main className="flex-1">{children}</main>

            {/* Dark footer frame */}
            <footer className="mt-8 border-t border-slate-700 bg-brand-dark text-slate-500">
              <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="space-y-2 text-slate-400">
                    <h3 className="text-sm font-semibold text-slate-300">
                      SLK Auto Repair
                    </h3>
                    <p className="text-xs max-w-xs">
                      Mobile auto repair that comes to you. Brakes, oil
                      changes, diagnostics, and more in the Sacramento area.
                    </p>
                  </div>

                  <div className="space-y-2 text-slate-400">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
                      Contact
                    </h4>
                    <p className="text-xs">
                      Phone: <span className="font-medium">916-123-1234</span>
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
                  </div>

                  <div className="space-y-2 text-slate-400">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
                      Quick links
                    </h4>
                    <div className="flex flex-col gap-1 text-xs">
                      <Link href="/quote" className="hover:text-brand-accent">
                        Request a quote
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-800 pt-4 text-[11px] text-slate-500 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <p>© {year} SLK Auto Repair. All rights reserved.</p>
                  <p>Website by Mark Kravchuk.</p>
                </div>
              </div>
            </footer>
          </>
        )}
      </body>
    </html>
  );
}
