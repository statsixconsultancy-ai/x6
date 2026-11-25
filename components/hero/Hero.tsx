"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowDown, Coins, Menu, MessagesSquare, Sparkles, Globe2, X } from "lucide-react";
import { navLinks, site, social, token } from "@/lib/site";
import { useMagnetic } from "@/components/useMagnetic";
import "./hero.css";


/** One word per 1.75 s slot: currency → intelligence → community → connectivity.
 *  Icons are our own Three.js renders (tools/icon-lab), already in each word's tint. */
const WORDS = [
  { word: "currency", tint: "#3FB874", rgb: [63, 184, 116], src: "/icons/value.webp", Fallback: Coins },
  { word: "intelligence", tint: "#F2772F", rgb: [242, 119, 47], src: "/icons/ai.webp", Fallback: Sparkles },
  { word: "community", tint: "#E9C22E", rgb: [233, 194, 46], src: "/icons/community.webp", Fallback: MessagesSquare },
  { word: "connectivity", tint: "#C564C4", rgb: [197, 100, 196], src: "/icons/web.webp", Fallback: Globe2 },
] as const;

const SLOT = 1750;
const ENTER = 500;
const LEAVE = 420;
const XFADE = 770;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeIn = (t: number) => t * t * t;
const smooth = (t: number) => t * t * (3 - 2 * t);

function HeroIcon({ i }: { i: number }) {
  const w = WORDS[i];
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  // The image may fail before hydration attaches onError, check once on mount.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  const Fallback = w.Fallback;
  if (failed) return <Fallback strokeWidth={1.4} aria-hidden="true" />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={imgRef} src={w.src} alt="" width={480} height={480} decoding="async" onError={() => setFailed(true)} />;
}

export default function Hero() {
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.22);
  const heroRef = useRef<HTMLElement>(null);
  const coinRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* One clock: a long Web Animation whose currentTime every frame reads (seekable by recorders). */
    const clockEl = document.createElement("i");
    const clock = clockEl.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1e9 });
    const onVis = () => (document.hidden ? clock.pause() : clock.play());
    document.addEventListener("visibilitychange", onVis);

    const hero = heroRef.current!;
    const coin = coinRef.current!;
    let mx = 0, my = 0, cmx = 0, cmy = 0;
    const onMove = (e: PointerEvent) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; };
    if (!reduced) window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const T = reduced ? 800 : Math.max(0, Number(clock.currentTime) || 0);
      const idx = ((Math.floor(T / SLOT) % 4) + 4) % 4;
      const tl = T % SLOT;

      /* ---------- words + icons ---------- */
      for (let i = 0; i < 4; i++) {
        const w = wordRefs.current[i], ic = iconRefs.current[i];
        if (!w || !ic) continue;
        if (i !== idx) {
          w.style.opacity = "0";
          ic.style.opacity = "0";
          continue;
        }
        const e = reduced ? 1 : easeOut(clamp(tl / ENTER));
        const l = reduced ? 0 : easeIn(clamp((tl - (SLOT - LEAVE)) / LEAVE));
        w.style.opacity = String(e * (1 - l));
        w.style.transform = `translate3d(0, ${(0.32 * (1 - e) - 0.16 * l).toFixed(4)}em, 0) scale(${(0.96 + 0.04 * e).toFixed(4)})`;
        w.style.filter = `blur(${(10 * (1 - e) + 8 * l).toFixed(2)}px)`;

        const e2 = reduced ? 1 : easeOut(clamp((tl - 60) / ENTER));
        const bobY = reduced ? 0 : Math.sin((T / 1000) * Math.PI * 1.1) * 0.028;
        const bobR = reduced ? 0 : Math.sin((T / 1000) * Math.PI * 0.7) * 3;
        ic.style.opacity = String(e2 * (1 - l));
        ic.style.transform = `translate3d(0, ${(bobY - 0.16 * l).toFixed(4)}em, 0) scale(${(0.7 + 0.3 * e2).toFixed(4)}) rotate(${(-14 * (1 - e2) + bobR).toFixed(2)}deg)`;
        ic.style.filter = l > 0 ? `blur(${(8 * l).toFixed(2)}px)` : "";
      }

      /* ---------- panel crossfade (0.77 s window straddling each change) ---------- */
      let cur = idx, nxt = idx, m = 1;
      if (!reduced) {
        if (tl > SLOT - XFADE / 2) { m = (tl - (SLOT - XFADE / 2)) / XFADE; nxt = (idx + 1) % 4; }
        else if (tl < XFADE / 2) { m = 0.5 + tl / XFADE; cur = (idx + 3) % 4; }
      }
      const s = cur === nxt ? 1 : smooth(clamp(m));
      const dx = reduced ? 0 : Math.sin(T / 5200) * 2.2;
      const dy = reduced ? 0 : Math.cos(T / 6100) * 1.6;
      for (let i = 0; i < 4; i++) {
        const el = layerRefs.current[i];
        if (!el) continue;
        const op = i === nxt ? s : i === cur ? 1 - s : 0;
        el.style.opacity = op.toFixed(3);
        el.style.transform = `translate3d(${dx * (i % 2 ? -1 : 1)}%, ${dy}%, 0) scale(1.08)`;
      }

      /* ---------- CTA flashes while "the web" holds ---------- */
      const lit = idx === 3 && tl > ENTER && tl < SLOT - LEAVE;
      ctaRef.current?.classList.toggle("is-lit", lit && !reduced);

      /* ---------- ambient colour + coin parallax ---------- */
      const ca = (WORDS[cur] ?? WORDS[0]).rgb, cb = (WORDS[nxt] ?? WORDS[0]).rgb;
      const col = [0, 1, 2].map((k) => Math.round(ca[k] + (cb[k] - ca[k]) * s));
      hero.style.setProperty("--amb", `${col[0]}, ${col[1]}, ${col[2]}`);
      cmx += (mx - cmx) * 0.06; cmy += (my - cmy) * 0.06;
      const bob = reduced ? 0 : Math.sin(T / 1300) * 10;
      coin.style.transform = `translate3d(${(cmx * -18).toFixed(2)}px, ${(bob + cmy * -14).toFixed(2)}px, 0) rotateY(${(cmx * 22).toFixed(2)}deg) rotateX(${(-cmy * 16).toFixed(2)}deg) rotate(${(reduced ? 0 : Math.sin(T / 2100) * 3).toFixed(2)}deg)`;
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      clock.cancel();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
    };
  }, [ctaRef]);

  return (
    <section ref={heroRef} className="hero" aria-labelledby="hero-title">
      <div className="hero-panel">
        {WORDS.map((_, i) => (
          <div key={i} className="hero-layer" data-i={i} ref={(el) => { layerRefs.current[i] = el; }} aria-hidden="true" />
        ))}
        <div className="hero-aurora" aria-hidden="true"><i /><i /><i /></div>
        <div className="hero-dots" aria-hidden="true" />
        <div className="hero-sweep" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />

        <div className="hero-coin-wrap" aria-hidden="true">
          <div className="hero-orbits">
            <span className="o o1"><b /></span>
            <span className="o o2"><b /><b /></span>
            <span className="o o3"><b /></span>
          </div>
          <div className="hero-coin-shadow" />
          <div ref={coinRef} className="hero-coin">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/coin-hero.webp" alt="" width={760} height={760} />
          </div>
        </div>

        <nav className="hero-nav" aria-label="Primary">
          <a href="#top" className="hero-logo" aria-label={`${site.name} home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/x6-logo-orange-128.png" alt="" width={44} height={44} className="hero-logo-img" />
          </a>
          <div className="hero-links">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </div>
          <button type="button" className="hero-burger icon-btn" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
            <Menu size={20} />
          </button>
        </nav>

        <div className="hero-copy">
          <h1 id="hero-title" className="hero-h1">
            <span className="sr-only">A New Era of Digital Currency Begins Here.</span>
            <span aria-hidden="true">
              <span className="line">A new era of</span>
              <span className="line hero-slot">
                {WORDS.map((w, i) => (
                  <span key={w.word} className="hero-item" style={{ ["--tint" as string]: w.tint }}>
                    <span className="hero-ico" ref={(el) => { iconRefs.current[i] = el; }}>
                      <HeroIcon i={i} />
                    </span>
                    <span className="hero-word" ref={(el) => { wordRefs.current[i] = el; }}>{w.word}</span>
                  </span>
                ))}
              </span>
              <span className="line line-muted">begins here.</span>
            </span>
          </h1>
        </div>

        <div className="hero-row">
          <a ref={ctaRef} href={social.instagram} target="_blank" rel="noopener noreferrer" className="hero-btn magnetic">
            Follow the launch <ArrowRight aria-hidden="true" />
          </a>
          <p className="hero-caption">
            A connected cryptocurrency ecosystem where blockchain infrastructure,
            <br /> intelligent technology and global participation converge.
          </p>
        </div>
      </div>

      <div className="hero-strip">
        <svg className="hero-notch" viewBox="0 0 1440 62" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 62 H1062 C1092 62 1098 54 1116 34 C1138 9 1146 1 1178 1 H1440 V62 Z" fill="#FBF6EF" />
        </svg>
        <a href="#vision" className="hero-scroll">
          <ArrowDown size={14} aria-hidden="true" /> Scroll to explore
        </a>
        <div className="hero-strip-inner">
          <p className="hero-strip-title">
            One digital currency,
            <br /> a connected economy.
          </p>
          <div className="hero-fact">
            <b>{token.name ?? "X6"}</b>
            <span>Native cryptocurrency of the ecosystem</span>
          </div>
          <div className="hero-fact">
            <b>4</b>
            <span>Pillars: crypto, blockchain, AI, connectivity</span>
          </div>
          <div className="hero-fact">
            <b>01</b>
            <span>Current roadmap phase: Foundation</span>
          </div>
          <svg className="hero-mark" viewBox="0 0 120 110" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
            <circle cx="60" cy="50" r="34" />
            <ellipse cx="60" cy="50" rx="14" ry="34" />
            <path d="M26 50h68M31 33h58M31 67h58" />
            <circle cx="22" cy="18" r="3" /><circle cx="104" cy="24" r="3" /><circle cx="98" cy="92" r="3" />
            <path d="M24.5 20 44 32M101 26.5 85 36M95.6 89.6 80 76" strokeDasharray="2 3" />
            <path d="M8 104h104" />
          </svg>
        </div>
      </div>

      {menuOpen && (
        <div className="hero-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <button type="button" className="hero-menu-close icon-btn" style={{ display: "inline-flex" }} aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <X size={20} />
          </button>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
        </div>
      )}
    </section>
  );
}
