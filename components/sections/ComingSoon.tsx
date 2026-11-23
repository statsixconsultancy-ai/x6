"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { token } from "@/lib/site";

/** Cinematic launch teaser: aurora light, a floating coin, and a frosted-glass title card. */
export default function ComingSoon() {
  const ref = useRef<HTMLElement>(null);
  const glass = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.classList.add("play"); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("play"); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const move = (e: React.PointerEvent) => {
    const g = glass.current;
    if (!g) return;
    const r = g.getBoundingClientRect();
    g.style.setProperty("--gx", `${e.clientX - r.left}px`);
    g.style.setProperty("--gy", `${e.clientY - r.top}px`);
    const s = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty("--px", `${((e.clientX - s.left) / s.width - 0.5).toFixed(3)}`);
    ref.current!.style.setProperty("--py", `${((e.clientY - s.top) / s.height - 0.5).toFixed(3)}`);
  };

  const name = token.name ?? "X6 Coins";

  return (
    <section ref={ref} id="launch" className="cs" aria-labelledby="cs-title" onPointerMove={move}>
      <div className="cs-aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="cs-rays" aria-hidden="true" />
      <div className="cs-coin" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/coin-hero.webp" alt="" width={760} height={760} />
      </div>
      <div className="cs-grain" aria-hidden="true" />

      <div ref={glass} className="cs-glass">
        <span className="cs-pill"><span className="cs-live" /> Launching soon</span>
        <h2 id="cs-title" className="cs-title">
          <span className="cs-name" aria-label={name}>
            {[...name].map((ch, i) => <span key={i} aria-hidden="true" style={{ ["--i" as string]: i }}>{ch === " " ? " " : ch}</span>)}
          </span>
          <span className="cs-sub">is coming soon.</span>
        </h2>
        <p className="cs-copy">The native currency of the X6 ecosystem is almost here. The official contract address will be announced on this website first. Until then, any token sold as {name} is not ours.</p>
        <div className="cs-actions">
          <a href="#roadmap" className="cs-btn cs-btn--solid">Follow the launch <ArrowRight size={16} aria-hidden="true" /></a>
          <a href="#security" className="cs-btn"><ShieldCheck size={16} aria-hidden="true" /> How to verify the contract</a>
        </div>
      </div>
    </section>
  );
}
