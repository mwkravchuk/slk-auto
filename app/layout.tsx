// src/app/layout.tsx

import { Inter } from "next/font/google";

import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M6.62 3.16a1 1 0 0 1 1.09-.27l3 1.2a1 1 0 0 1 .6.74l.5 2.7a1 1 0 0 1-.27.86l-1.3 1.3a11.05 11.05 0 0 0 4.95 4.95l1.3-1.3a1 1 0 0 1 .86-.27l2.7.5a1 1 0 0 1 .74.6l1.2 3a1 1 0 0 1-.27 1.09l-1.5 1.5c-.3.3-.72.45-1.14.39-2.26-.32-4.45-1.14-6.53-2.45a19.44 19.44 0 0 1-5.9-5.9C4.3 10.45 3.48 8.26 3.16 6c-.06-.42.08-.84.39-1.14z"
        className="fill-current"
      />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "SLK Auto Repair – Mobile Auto Repair in Sacramento",
  description:
    "Mobile auto repair that comes to you. Brakes, oil changes, diagnostics, and more from SLK Auto Repair in the Sacramento area.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const year = new Date().getFullYear();

  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col bg-white text-slate-900 ${inter.className}`}>
        {/* Dark header frame */}
        <header className="bg-brand-dark text-brand-accent">
          <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
            <div className="relative flex items-center">
              {/* Left spacer to balance the layout */}
              <div className="flex-1">
              </div>

              {/* Centered logo */}
              <Link
                href="/"
                className="absolute left-1/2 -translate-x-1/2 flex items-center"
              >
                <Image
                  src="/images/slk-logo.jpeg"
                  alt="SLK Auto Repair logo"
                  width={984}   // intrinsic size, just for aspect ratio
                  height={727}
                  className="h-22 w-auto md:h-25"
                />
              </Link>

              {/* Right side: phone */}
              <div className="flex flex-1 justify-end">
                <a
                  href="tel:+1-555-555-5555" // replace with Sam's real number
                  className="hidden items-center text-m md:flex gap-1"
                >
                  <PhoneIcon className="h-5 w-5" />
                  <span className="font-medium">916-123-1234</span>
                </a>
              </div>
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
                <h3 className="text-sm font-semibold text-slate-300">SLK Auto Repair</h3>
                <p className="text-xs max-w-xs">
                  Mobile auto repair that comes to you. Brakes, oil changes,
                  diagnostics, and more in the Sacramento area.
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
                  Email: <span className="font-medium">quotes@slkautorepair.com</span>
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
      </body>
    </html>
  );
}
