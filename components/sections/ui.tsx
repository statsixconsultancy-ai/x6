"use client";

import { createElement, useEffect, useRef, type ReactNode } from "react";
import type { Status } from "@/lib/site";
import { PLACEHOLDER } from "@/lib/site";

/** Fades/rises children in when they enter the viewport. */
export function Reveal({ children, as = "div", delay = 0, className = "", style, ...rest }: { children: ReactNode; as?: string; delay?: number; className?: string; style?: React.CSSProperties; [k: string]: unknown }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.classList.add("in"); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return createElement(as, { ...rest, ref, className: `rv ${className}`, style: { ...style, transitionDelay: `${delay}ms` } }, children);
}

export function Eyebrow({ n, children }: { n: string; children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span className="eyebrow-n">{n}</span>
      <span className="eyebrow-l">{children}</span>
    </p>
  );
}

const STATUS_LABEL: Record<Status, string> = { live: "Live", development: "In development", concept: "Roadmap concept" };
export function StatusChip({ status }: { status: Status }) {
  return <span className={`chip chip--${status}`}>{STATUS_LABEL[status]}</span>;
}
export const statusLabel = (s: Status) => STATUS_LABEL[s];

/** Renders a value, or a clearly labelled placeholder when it isn't published yet. */
export function Fact({ value, placeholder = PLACEHOLDER }: { value: string | null; placeholder?: string }) {
  return value ? <span className="fact">{value}</span> : <span className="ph">{placeholder}</span>;
}
