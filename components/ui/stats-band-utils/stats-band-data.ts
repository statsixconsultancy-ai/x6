/** A tiny picture that backs up a number. */
export type StatVisual =
  /** A line through recent values, oldest first. */
  | { kind: "trend"; values: number[] }
  /** One bar per day; anything under 100 (%) is inked as an incident. */
  | { kind: "uptime"; days: number[] }
  /** A histogram; bins below `marker` (in the same units as `max`) are inked. */
  | { kind: "distribution"; bins: number[]; max: number; marker: number }
  /** A dotted world with [longitude, latitude] points lit up. */
  | { kind: "map"; points: [number, number][] };

export interface Stat {
  label: string;
  value: number;
  decimals?: number;
  /** `compact` counts inside its final unit, e.g. 0.0M → 2.3M. */
  notation?: "standard" | "compact";
  prefix?: string;
  suffix?: string;
  /** The line under the number. */
  detail?: string;
  /** Replaces `detail` on hover or focus: one line of context. */
  context?: string;
  visual?: StatVisual;
}

/** Example stats for the component's own demo. Replace with your real numbers. */
export const stats: Stat[] = [
  {
    label: "Requests served",
    value: 2_340_000_000,
    notation: "compact",
    decimals: 1,
    detail: "Example figure",
    context: "Sample data shipped with the component",
    visual: { kind: "trend", values: [12, 14, 13, 17, 19, 18, 22, 25, 24, 28, 31, 34] },
  },
  {
    label: "Uptime",
    value: 99.98,
    decimals: 2,
    suffix: "%",
    detail: "Example figure",
    context: "Two short incidents in the sample period",
    visual: { kind: "uptime", days: Array.from({ length: 30 }, (_, i) => (i === 9 || i === 22 ? 99.6 : 100)) },
  },
  {
    label: "Median latency",
    value: 42,
    suffix: " ms",
    detail: "Example figure",
    context: "Most requests land under 60 ms",
    visual: { kind: "distribution", bins: [2, 6, 14, 22, 18, 11, 6, 3, 2, 1], max: 200, marker: 60 },
  },
  {
    label: "Regions",
    value: 6,
    detail: "Example figure",
    context: "Lit dots mark sample regions",
    visual: { kind: "map", points: [[-122.4, 37.8], [-74, 40.7], [-0.1, 51.5], [8.7, 50.1], [103.8, 1.35], [151.2, -33.9]] },
  },
];
