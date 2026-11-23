"use client";

import type { ReactNode } from "react";
import { SpotlightBento, SpotlightCard } from "@/components/ui/spotlight-bento";
import type { SpendingCategory } from "@/components/kokonutui/spending-ring";
import type { ContextSegment } from "@/components/kokonutui/ai-context-meter";
import type { ActivityData } from "@/components/kokonutui/apple-activity-card";
import type { UptimeService } from "@/components/kokonutui/uptime-card";

/* ---------- illustrative data for each Kokonut UI chart (none of it is X6 data) ---------- */

// 01, one portfolio scattered across networks
export const NETWORKS: SpendingCategory[] = [
  { name: "Network A", amount: 4210, change: 3.2, stroke: "stroke-orange-500", dot: "bg-orange-500" },
  { name: "Network B", amount: 2630, change: -4.1, stroke: "stroke-amber-400", dot: "bg-amber-400" },
  { name: "Network C", amount: 1840, change: 12.6, stroke: "stroke-emerald-500", dot: "bg-emerald-500" },
  { name: "Network D", amount: 1120, change: -9.8, stroke: "stroke-fuchsia-500", dot: "bg-fuchsia-500" },
  { name: "Network E", amount: 640, change: 1.4, stroke: "stroke-zinc-700", dot: "bg-zinc-700" },
  { name: "Network F", amount: 260, change: -2.2, stroke: "stroke-zinc-400", dot: "bg-zinc-400" },
];

// 02, everything a newcomer has to hold in their head before one transaction
export const LOAD: ContextSegment[] = [
  { id: "seed", label: "Seed phrase", tokens: 38_000, color: "bg-orange-500" },
  { id: "gas", label: "Gas & fees", tokens: 42_000, color: "bg-amber-400" },
  { id: "addr", label: "Hex addresses", tokens: 30_000, color: "bg-emerald-500" },
  { id: "nets", label: "Networks", tokens: 36_000, color: "bg-fuchsia-400" },
  { id: "approve", label: "Approvals", tokens: 34_000, color: "bg-sky-400" },
];

// 04, spiky, context-free activity (deterministic, so server and client agree)
export const HYPE = (() => {
  let seed = 11;
  const r = () => ((seed = (seed * 16_807) % 2_147_483_647) / 2_147_483_647);
  return Array.from({ length: 26 * 7 }, (_, i) => {
    const spike = i % 37 === 9 || i % 53 === 20 ? 6 : 1;
    return r() < 0.35 ? 0 : Math.round(r() * 5 * spike);
  });
})();

// 05, participation, nowhere near complete
export const ACCESS: ActivityData[] = [
  { label: "ACCESS", color: "#FF5A1F", colorEnd: "#FF8A3D", size: 180, current: 34, target: 100, unit: "%" },
  { label: "LANGUAGE", color: "#E9C22E", colorEnd: "#F4D35E", size: 140, current: 22, target: 100, unit: "%" },
  { label: "LOW COST", color: "#C564C4", colorEnd: "#DE96C8", size: 100, current: 41, target: 100, unit: "%" },
];

// 06, disclosures that go missing, framed as a status page
export const DISCLOSURES: UptimeService[] = [
  {
    name: "Token allocation",
    incidents: {
      14: { title: "Allocation table removed from site", status: "down", minutes: 1440, updates: [{ time: "09:00", label: "Noticed", note: "Page now returns 404." }, { time: "17:40", label: "No response", note: "Team did not comment." }] },
      59: { title: "Allocation still unpublished", status: "down", minutes: 1440, updates: [{ time: "08:00", label: "Ongoing" }] },
    },
  },
  {
    name: "Audit report",
    missing: 20,
    incidents: {
      33: { title: "'Audit coming soon' banner", status: "degraded", minutes: 720, updates: [{ time: "12:00", label: "Announced", note: "No auditor named." }] },
      59: { title: "No report linked", status: "degraded", minutes: 720, updates: [{ time: "08:00", label: "Ongoing" }] },
    },
  },
  {
    name: "Treasury wallet",
    incidents: {
      41: { title: "Unlabelled outflow", status: "down", minutes: 600, updates: [{ time: "02:14", label: "Observed", note: "Large transfer to a new address." }, { time: "11:30", label: "Unexplained" }] },
    },
  },
  {
    name: "Vesting schedule",
    incidents: {
      22: { title: "Unlock date changed", status: "degraded", minutes: 480, updates: [{ time: "15:05", label: "Changed", note: "Moved earlier without notice." }] },
    },
  },
];


/** One illustrative chart beside a short, readable explanation. */
export function ChartFeature({ title, children, chart, dark, kicker }: { title: ReactNode; children: ReactNode; chart: ReactNode; dark?: boolean; kicker?: string }) {
  return (
    <SpotlightBento className="cf">
      <SpotlightCard index={0} span={6} row tone={dark ? "dark" : "light"} visual={<>{chart}<span className="sb-tag">Illustrative example</span></>}>
        {kicker && <span className="cf-kicker">{kicker}</span>}
        <h3 className="h3">{title}</h3>
        {children}
      </SpotlightCard>
    </SpotlightBento>
  );
}
