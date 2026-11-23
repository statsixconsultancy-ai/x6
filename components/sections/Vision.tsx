"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Eyebrow, Reveal } from "./ui";

const PAIRS = [
  { a: "Roads", b: "coins", c: "#C79A12" },
  { a: "Wires", b: "banknotes", c: "#2F9E61" },
  { a: "The internet", b: "data", c: "#B04FAE" },
  { a: "X6 Coins", b: "value", c: "#F04A10" },
];

/** A word that rolls letter by letter to the next one. */
function Roll({ text, prev, className }: { text: string; prev: string | null; className?: string }) {
  return (
    <span className={`roll ${className ?? ""}`}>
      {prev !== null && prev !== text && (
        <span className="roll-out" aria-hidden="true" key={`o-${prev}`}>
          {[...prev].map((ch, i) => <span key={i} style={{ ["--i" as string]: i }}>{ch === " " ? "\u00a0" : ch}</span>)}
        </span>
      )}
      <span className="roll-in" key={`i-${text}`}>
        {[...text].map((ch, i) => <span key={i} style={{ ["--i" as string]: i }}>{ch === " " ? "\u00a0" : ch}</span>)}
      </span>
    </span>
  );
}

function Words({ text, em }: { text: string; em?: boolean }) {
  return <>{text.split(" ").map((w, i) => <span key={i} className={`w${em ? " w-em" : ""}`}>{w} </span>)}</>;
}

const PRINCIPLES = [
  { t: "Everyday money", b: "Useful to anyone with a phone, not only early adopters." },
  { t: "Provable ownership", b: "Your keys, your record, verifiable by anyone." },
  { t: "Borderless", b: "The same terms in every country." },
  { t: "Shared economies", b: "One settlement layer for apps and communities." },
  { t: "Access by design", b: "Clear language, low costs, forgiving interfaces." },
  { t: "Helpful AI", b: "AI that explains the currency, never replaces it." },
];

export default function Vision() {
  const ref = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(0);
  const prevK = useRef<number | null>(null);

  // Words sharpen into place as the reader scrolls through the statement.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLSpanElement>(".w"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { words.forEach((w) => w.classList.add("on")); return; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      words.forEach((w) => {
        const r = w.getBoundingClientRect();
        w.classList.toggle("on", r.top < vh * 0.82);
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  // Cycle the "X carried Y" line while it is on screen.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    const id = window.setInterval(() => {
      if (!visible || document.hidden) return;
      setK((x) => { prevK.current = x; return (x + 1) % PAIRS.length; });
    }, 2400);
    return () => { window.clearInterval(id); io.disconnect(); };
  }, []);

  const pair = PAIRS[k];
  const prev = prevK.current === null ? null : PAIRS[prevK.current];

  return (
    <section id="vision" className="sec sec--cream vision" aria-labelledby="vision-title">
      <div className="vision-eyebrow"><Eyebrow n="02">The Vision</Eyebrow></div>
      <h2 id="vision-title" className="sr-only">Reimagining digital currency</h2>

      <div ref={ref} className="vstage">
        <p className="vline vline--1"><Words text="Money has always followed the networks people build." /></p>

        <p className="vline vline--roll" style={{ ["--c" as string]: pair.c }} aria-live="off">
          <Roll text={pair.a} prev={prev?.a ?? null} />{" "}
          <span className="vline-mid">carried</span>{" "}
          <Roll text={pair.b} prev={prev?.b ?? null} className="roll--em" />
          <span className="vline-dot">.</span>
        </p>
        <span className="sr-only">Roads carried coins, wires carried banknotes, and the internet carried data.</span>

        <p className="vline vline--3"><Words text="But value never learned to move as freely as information." /></p>

        <p className="vline vline--4">
          <Words text="X6 Coins exists to" />
          <span className="vgap"><Words text="close that gap." em /></span>
        </p>
      </div>

      <div className="vactions">
        <a href="#token" className="btn magnetic">Discover the token <ArrowRight size={16} aria-hidden="true" /></a>
        <a href="#roadmap" className="btn btn--ghost magnetic">See the roadmap</a>
      </div>

      <ul className="vprin" aria-label="What X6 Coins stands for">
        {PRINCIPLES.map((p, i) => (
          <Reveal as="li" key={p.t} delay={i * 60}>
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            <b>{p.t}</b>
            <span>{p.b}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
