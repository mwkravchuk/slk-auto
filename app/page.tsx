// src/app/page.tsx
export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
      <div className="max-w-xl px-6 py-10 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">
          SLK Auto Repair
        </h1>
        <p className="text-slate-300 mb-6">
          Coming soon: convenient mobile auto repair. We come to you for
          diagnostics, brakes, oil changes, and more.
        </p>
        <p className="text-sm text-slate-400">
          I&apos;m currently building out the full site. In the meantime, you
          can reach Sam by phone or Instagram for quotes and appointments.
        </p>
      </div>
    </main>
  );
}
