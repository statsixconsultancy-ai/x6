"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { SCENARIOS, VERDICT_LABEL } from "./modules";
import { CreditCard } from "./Cards";
import "./intelligence.css";


const FEATURES = [
  { k: "Market analytics", b: "Readable summaries of market and network activity around X6, with sources shown." },
  { k: "Data interpretation", b: "Plain-language explanations of transactions, contracts and token movements." },
  { k: "Blockchain analytics", b: "Flows, holder distribution and treasury activity, traced from public on-chain data." },
  { k: "Automated workflows", b: "Rules that trigger actions on on-chain events, alerts, reports or payouts, with human approval." },
  { k: "AI agents", b: "Assistants that can prepare transactions for you to review; they never sign on your behalf." },
  { k: "User assistance", b: "Answers in your language about fees, wallets and what a transaction will do." },
  { k: "Fraud & anomaly signals", b: "Planned monitoring for scam contracts and unusual activity. Listed as live only once implemented." },
  { k: "Predictive insights", b: "Scenario ranges, not price predictions, every output shows its uncertainty and limits." },
];

/** The intelligence layer's readout for one card, printed where the card has been read. */
function Readout({ i }: { i: number }) {
  const sc = SCENARIOS[i];
  return (
    <>
      <span className="r-c">{`// X6 intelligence layer · card •••• ${sc.last4}`}</span>
      {"\n\n"}
      <span className="r-k">TRANSACTION</span>{"\n"}
      <span className="r-v">{sc.tx}</span>{"\n\n"}
      <span className="r-k">IN PLAIN WORDS</span>{"\n"}
      <span className="r-p">{sc.plain}</span>{"\n\n"}
      <span className="r-k">CHECKS</span>{"\n"}
      {sc.checks.map(([label, ok]) => (
        <span key={label} className={ok ? "r-ok" : "r-bad"}>{`${ok ? "✓" : "✕"} ${label}`}{"\n"}</span>
      ))}
      {"\n"}
      <span className="r-k">VERDICT</span>{"\n"}
      <span className={`r-verdict r-${sc.verdict}`}>{VERDICT_LABEL[sc.verdict].toUpperCase()}</span>
      <span className="r-p">{`. ${sc.advice}`}</span>
    </>
  );
}

const PALETTE = ["#FF4A12", "#FF5A1F", "#FF6B2C", "#FF8A3D", "#FFB06A", "#FFD9B5", "#FFF3E6"];

function hash(a: number, b: number, c: number) {
  let h = (Math.imul(a, 374761393) + Math.imul(b, 668265263) + Math.imul(c, 2147483647)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177) | 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

export default function Intelligence() {
  const sectionRef = useRef<HTMLElement>(null);
  const beltRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const codeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numRef = useRef<HTMLSpanElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const belt = beltRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = SCENARIOS.length;

    let W = 0, cw = 0, ch = 0, gap = 0, Lx = 0, dpr = 1, cardTop = 70, radius = 0;
    const measure = () => {
      W = window.innerWidth;
      const first = cardRefs.current[0]!;
      cw = first.offsetWidth;
      ch = first.offsetHeight;
      gap = parseFloat(getComputedStyle(sectionRef.current!).getPropertyValue("--gap")) / 100 * W || 0.0475 * W;
      radius = 0.016 * W;
      Lx = belt.clientWidth / 2;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(belt.clientWidth * dpr);
      canvas.height = Math.round(belt.clientHeight * dpr);
    };
    measure();
    window.addEventListener("resize", measure);

    let off = W / 2 - 0.62 * cw;
    const autoSpeed = () => (reduced ? 0 : -0.075 * W);
    let vel = autoSpeed();
    let hover = 0, hoverTarget = 0;
    let dragging = false, lastX = 0, lastT = 0, dragVel = 0;
    let shown = 0, crossing = -1;
    const sparks: { x: number; y: number; vx: number; vy: number; s: number; c: string; life: number }[] = [];

    /* ---------- input ---------- */
    const enter = () => (hoverTarget = 1);
    const leave = () => (hoverTarget = 0);
    const down = (e: PointerEvent) => {
      dragging = true;
      belt.setPointerCapture(e.pointerId);
      belt.classList.add("is-dragging");
      lastX = e.clientX;
      lastT = performance.now();
      dragVel = 0;
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      off += dx;
      dragVel = (dx / Math.max(8, now - lastT)) * 1000 * 0.8 + dragVel * 0.2;
      lastX = e.clientX;
      lastT = now;
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      belt.classList.remove("is-dragging");
      vel = dragVel;
    };
    const wheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        vel += -e.deltaX * 6;
        e.preventDefault();
      }
    };
    belt.addEventListener("pointerenter", enter);
    belt.addEventListener("pointerleave", leave);
    belt.addEventListener("pointerdown", down);
    belt.addEventListener("pointermove", move);
    belt.addEventListener("pointerup", up);
    belt.addEventListener("pointercancel", up);
    belt.addEventListener("wheel", wheel, { passive: false });

    /* ---------- only run while visible ---------- */
    let visible = true;
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting), { rootMargin: "100px" });
    io.observe(sectionRef.current!);

    let raf = 0, prev = performance.now();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      if (!visible || document.hidden) return;
      const t = now / 1000;

      /* speed */
      hover += (hoverTarget - hover) * Math.min(1, dt * 4);
      const target = autoSpeed() * (1 - 0.65 * hover);
      if (!dragging) {
        vel += (target - vel) * (1 - Math.exp(-2.2 * dt));
        off += vel * dt;
      }
      const span = cw + gap;
      const period = span * n;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let curCross = -1, curProg = 0;
      for (let i = 0; i < n; i++) {
        const card = cardRefs.current[i]!, code = codeRefs.current[i]!;
        const x = ((((off + i * span + span) % period) + period) % period) - span;
        const cut = Math.max(0, Math.min(cw, Lx - x));
        const tr = `translate3d(${x.toFixed(2)}px,0,0)`;
        card.style.transform = tr;
        code.style.transform = tr;
        if (cut > 0) {
          card.style.clipPath = `inset(0 0 0 ${cut.toFixed(1)}px round 0 ${radius}px ${radius}px 0)`;
          const m = `linear-gradient(90deg, transparent ${cut.toFixed(1)}px, #000 ${(cut + 26).toFixed(1)}px)`;
          card.style.maskImage = m;
          card.style.webkitMaskImage = m;
          code.style.visibility = "visible";
          code.style.clipPath = `inset(0 ${(cw - cut).toFixed(1)}px 0 0)`;
        } else {
          card.style.clipPath = "";
          card.style.maskImage = "";
          card.style.webkitMaskImage = "";
          code.style.visibility = "hidden";
        }
        if (cut > 0 && cut < cw) {
          curCross = i;
          curProg = cut / cw;
        }
        if (cut > 0 && x + cw > Lx) drawFx(i, x, cut, t);
      }

      /* counter: checks run so far, then the verdict */
      if (curCross !== -1) {
        const sc = SCENARIOS[curCross];
        const n = sc.checks.length;
        if (curCross !== crossing) {
          crossing = curCross;
          shown = 0;
        }
        const goal = Math.min(n, Math.floor(curProg * (n + 1.2)));
        shown += (goal - shown) * Math.min(1, dt * 14);
        const done = Math.round(shown);
        if (numRef.current) numRef.current.textContent = `${done}/${n}`;
        if (tagRef.current) {
          const final = done >= n;
          tagRef.current.textContent = final ? VERDICT_LABEL[sc.verdict] : "Checking…";
          tagRef.current.dataset.verdict = final ? sc.verdict : "";
        }
      }

      /* sparks */
      if (!reduced) {
        for (let k = 0; k < 3; k++) {
          if (Math.random() < 0.7 && curCross !== -1) {
            sparks.push({
              x: Lx + Math.random() * 30,
              y: cardTop - 10 + Math.random() * (ch + 20),
              vx: -30 + Math.random() * 70 + vel * 0.6,
              vy: (Math.random() - 0.5) * 50,
              s: 0.8 + Math.random() * 1.8,
              c: PALETTE[(Math.random() * PALETTE.length) | 0],
              life: 0.3 + Math.random() * 0.8,
            });
          }
        }
        for (let k = sparks.length - 1; k >= 0; k--) {
          const s = sparks[k];
          s.life -= dt;
          if (s.life <= 0) { sparks.splice(k, 1); continue; }
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          ctx.globalAlpha = Math.min(1, s.life * 2.2);
          ctx.fillStyle = s.c;
          ctx.fillRect(s.x, s.y, s.s, s.s);
        }
        ctx.globalAlpha = 1;
      }
    };

    function drawFx(i: number, x: number, cut: number, t: number) {
      /* 1. haze */
      const hw = Math.min(150, x + cw - Lx);
      if (hw > 0) {
        const g = ctx.createLinearGradient(Lx, 0, Lx + 150, 0);
        g.addColorStop(0, "rgba(255,96,40,.42)");
        g.addColorStop(1, "rgba(255,96,40,0)");
        ctx.fillStyle = g;
        ctx.fillRect(Lx, cardTop, hw, ch);
      }
      /* 2. dithered particles fixed to the card surface (3px grid, card-local) */
      const R = 0.3 * cw;
      const rows = Math.ceil(ch / 3);
      const g0 = Math.floor(cut / 3);
      const g1 = Math.min(Math.ceil(cw / 3), Math.ceil((cut + R) / 3));
      const tw = Math.floor(t * 9) + 97;
      for (let gx = g0; gx < g1; gx++) {
        const sx = x + gx * 3;
        const d = sx - Lx;
        if (d < 0) continue;
        const p = Math.pow(Math.max(0, 1 - d / R), 1.7);
        if (p <= 0) continue;
        for (let row = -5; row < rows + 5; row++) {
          const inside = row >= 0 && row < rows;
          let thr = inside ? p * 0.92 : p * 0.16 * (1 - (row < 0 ? -row : row - rows + 1) / 6);
          if (thr <= 0) continue;
          if (hash(gx, row, i) >= thr) continue;
          if (!reduced && hash(gx, row, tw) < 0.22) continue;
          const h2 = hash(row, gx, i + 31);
          const col = d < 10 ? PALETTE[4 + Math.floor(h2 * 3)] : PALETTE[Math.floor(h2 * h2 * 7)];
          const size = 1.1 + h2 * 1.7;
          const jx = reduced ? 0 : (hash(gx, row, tw + 7) - 0.5) * 1.6;
          const jy = reduced ? 0 : (hash(row, gx, tw + 13) - 0.5) * 1.6;
          ctx.fillStyle = col;
          ctx.fillRect(sx + jx, cardTop + row * 3 + jy, size, size);
        }
      }
    }

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", measure);
      belt.removeEventListener("pointerenter", enter);
      belt.removeEventListener("pointerleave", leave);
      belt.removeEventListener("pointerdown", down);
      belt.removeEventListener("pointermove", move);
      belt.removeEventListener("pointerup", up);
      belt.removeEventListener("pointercancel", up);
      belt.removeEventListener("wheel", wheel);
    };
  }, []);

  return (
    <section id="intelligence" ref={sectionRef} className="intel" aria-labelledby="intel-title">
      <div className="intel-head">
        <div>
          <span className="intel-eyebrow">08 · AI-Powered Crypto Intelligence</span>
          <h2 id="intel-title" className="intel-h2">
            Intelligence that serves
            <br />
            <em>the currency.</em>
          </h2>
        </div>
        <div>
          <p className="intel-p">
            AI is not the product. X6 is. AI is the layer that reads every wallet, payment and contract in the
            ecosystem and turns raw blockchain activity into structured signals: analytics you can understand,
            risks you can see before you sign, and automations builders can rely on.
          </p>
        </div>
      </div>

      <div className="intel-stage">
        <div className="badge" aria-hidden="true">
          <span className="badge-label">AI risk check</span>
          <span className="badge-pill">
            <span className="badge-num" ref={numRef}>0/3</span>
            <span className="badge-tag" ref={tagRef}>Checking…</span>
          </span>
        </div>

        <div
          className="belt"
          ref={beltRef}
          role="region"
          aria-label="Sample card transactions. Drag to move the belt; as each card passes the scanner, the AI layer explains it and runs safety checks."
        >
          <div className="belt-codes" aria-hidden="true">
            {SCENARIOS.map((sc, i) => (
              <div key={sc.id} className="m-code" ref={(el) => { codeRefs.current[i] = el; }}>
                <div className="c-read"><Readout i={i} /></div>
              </div>
            ))}
          </div>
          <div className="belt-cards">
            {SCENARIOS.map((sc, i) => (
              <div
                key={sc.id}
                className={`m-card cc cc--${sc.finish}`}
                ref={(el) => { cardRefs.current[i] = el; }}
                role="img"
                aria-label={`Sample X6 ${sc.kind.toLowerCase()} card ending ${sc.last4}: ${sc.title}. ${sc.plain} Verdict: ${VERDICT_LABEL[sc.verdict]}.`}
              >
                <CreditCard s={sc} />
              </div>
            ))}
          </div>
          <canvas className="belt-fx" ref={canvasRef} aria-hidden="true" />
        </div>

        <div className="scan" aria-hidden="true"><b /><i /></div>
      </div>

      <div className="belt-note">
        <span>Concept preview · sample cards and transactions, not real data</span>
        <span>Each card is read as it crosses the line: what happened, the checks, the verdict</span>
      </div>

      <div className="intel-features">
        {FEATURES.map((f, i) => (
          <div key={f.k} className="intel-feature">
            <span className="intel-k">{String(i + 1).padStart(2, "0")} · Planned</span>
            <b>{f.k}</b>
            <p>{f.b}</p>
          </div>
        ))}
      </div>
      <div className="intel-disclaimer" role="note">
        <b>Not financial advice.</b> AI-generated insights are informational. They are not guaranteed predictions,
        recommendations or investment advice, and they can be wrong. Always verify on-chain data yourself.
      </div>
    </section>
  );
}
