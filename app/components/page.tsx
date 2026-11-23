import type { Metadata } from "next";
import MetricCard from "@/components/kokonutui/metric-card";
import MetricsBoard from "@/components/ui/metrics-board";
import StatsBand from "@/components/ui/stats-band";

export const metadata: Metadata = { title: "X6 component demos", robots: { index: false } };

/** Demo gallery for the integrated components. Not linked from the main site. */
export default function ComponentsDemo() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 font-sans text-zinc-900 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-24">
        <header>
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">X6 · component demos</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Integrated components</h1>
          <p className="mt-3 max-w-xl text-zinc-600">
            Each component with its default sample data. On the main site they receive X6 data, or are labelled as samples.
          </p>
        </header>

        <section className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Kokonut UI · Metric Card</h2>
            <p className="mt-2 text-sm text-zinc-600">
              <code className="rounded bg-zinc-200/70 px-1.5 py-0.5">components/kokonutui/metric-card.tsx</code>. Hover or drag the chart,
              Shift + arrows to select a range, click a segment to chart it alone.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <MetricCard />
            <MetricCard
              label="Sample network fees"
              segments={["Payments", "Swaps", "Contracts"]}
              format="number"
              defaultPeriod={7}
              events={[]}
            />
          </div>
        </section>

        <section className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Metrics Board</h2>
            <p className="mt-2 text-sm text-zinc-600">
              <code className="rounded bg-zinc-200/70 px-1.5 py-0.5">components/ui/metrics-board.tsx</code> · built on react-isokit. Press 7D, 30D or 90D.
            </p>
          </div>
          <div className="w-full max-w-xl">
            <MetricsBoard />
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-xl font-semibold">Stats Band</h2>
          <StatsBand
            layout="divided"
            title="Fast, steady, and close to everyone"
            description="Sample figures shipped with the component."
          />
        </section>
      </div>
    </main>
  );
}
