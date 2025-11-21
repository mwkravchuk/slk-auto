import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SLK Auto Repair",
  description: "Convenient mobile auto repair - we come to you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50">
        {/* Simple top nav */}
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
            <Link href="/" className="font-semibold">
              SLK Auto Repair
            </Link>
            <nav className="space-x-4 text-sm text-slate-300">
              <a href="/quote" className="hover:text-white">
                Get a quote
              </a>
            </nav>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-6">{children}</div>
      </body>
    </html>
  );
}
