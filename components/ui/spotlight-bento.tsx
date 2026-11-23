"use client";

import { type CSSProperties, type ReactNode, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Bento grid with a pointer-tracked spotlight, a gentle 3D tilt and a
 * staggered spring reveal on scroll. Cards take a column span on a 6-column grid.
 */
export function SpotlightBento({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("sb-grid", className)}>{children}</div>;
}

export interface SpotlightCardProps {
  index: number;
  span?: 2 | 3 | 4 | 6;
  tall?: boolean;
  /** Visual beside the text instead of above it. */
  row?: boolean;
  tone?: "light" | "dark";
  visual?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function SpotlightCard({ index, span = 2, tall, row, tone = "light", visual, children, className }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (reduce) return;
    el.style.setProperty("--rx", `${((y / r.height - 0.5) * -4).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((x / r.width - 0.5) * 5).toFixed(2)}deg`);
  };
  const leave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <motion.div
      ref={ref}
      className={cn("sb-card", tall && "sb-card--tall", row && "sb-card--row", tone === "dark" && "sb-card--dark", className)}
      style={{ gridColumn: `span ${span}` } as CSSProperties}
      onPointerMove={move}
      onPointerLeave={leave}
      initial={reduce ? false : { opacity: 0, y: 36, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: (index % 3) * 0.08 }}
    >
      <div className="sb-spot" aria-hidden="true" />
      {visual && <div className={cn("sb-visual", tone === "dark" && "dark")}>{visual}</div>}
      <div className="sb-body">{children}</div>
    </motion.div>
  );
}
