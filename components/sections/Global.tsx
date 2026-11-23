"use client";

import { useEffect, useRef } from "react";
import FactChart from "./FactChart";
import { Bullet } from "./FactViz";
import StatsBand, { type Stat } from "@/components/ui/stats-band";
import { WORLD, worldLand } from "@/components/ui/stats-band-utils/stats-band-world";
import { ecosystem, roadmap } from "@/lib/site";
import { Eyebrow } from "./ui";

const current = roadmap.findIndex((r) => r.status === "current");
const live = ecosystem.filter((e) => e.status === "live").length;

/** Facts about the project only, no usage, adoption or volume claims. */
const STATS: Stat[] = [
  {
    label: "Ecosystem products",
    value: ecosystem.length,
    detail: "Wallet, payments, AI, developer tools…",
    context: `${live} live today · the rest are roadmap concepts`,
    visual: { kind: "uptime", days: ecosystem.map((e) => (e.status === "live" ? 99 : 100)) },
  },
  {
    label: "Roadmap phases",
    value: roadmap.length,
    detail: "Foundation → Global expansion",
    context: current >= 0 ? `Phase ${roadmap[current].phase} · ${roadmap[current].title} in progress` : "Progress published as it happens",
    visual: { kind: "distribution", bins: roadmap.map(() => 1), max: roadmap.length, marker: Math.max(1, current + 1) },
  },
  {
    label: "Core pillars",
    value: 4,
    detail: "Crypto · blockchain · AI · connectivity",
    context: "One asset at the centre, three layers around it",
  },
  {
    label: "Regions live",
    value: 0,
    detail: "Pre-launch, no regional availability yet",
    context: "Lit dots are design targets, not users",
    visual: { kind: "map", points: [[80.27, 13.08], [3.38, 6.52], [-46.63, -23.55], [13.4, 52.52]] },
  },
];

/** Cities the arcs connect: [name, lon, lat]. Design targets, not live markets. */
const CITIES: [string, number, number][] = [
  ["Chennai", 80.27, 13.08], ["Lagos", 3.38, 6.52], ["São Paulo", -46.63, -23.55], ["Berlin", 13.4, 52.52],
  ["Singapore", 103.82, 1.35], ["Dubai", 55.27, 25.2], ["New York", -74.0, 40.71], ["Tokyo", 139.69, 35.69],
  ["Nairobi", 36.82, -1.29], ["London", -0.13, 51.51], ["Mexico City", -99.13, 19.43], ["Sydney", 151.21, -33.87],
];
const ROUTES: [number, number][] = [[0, 4], [0, 5], [5, 3], [3, 9], [9, 6], [6, 2], [2, 1], [1, 8], [8, 0], [4, 7], [7, 11], [6, 10], [1, 5], [4, 11]];

const D2R = Math.PI / 180;
const toVec = (lon: number, lat: number) => [Math.cos(lat * D2R) * Math.cos(lon * D2R), Math.sin(lat * D2R), Math.cos(lat * D2R) * Math.sin(lon * D2R)];

/** Cinematic globe: real continents in dots, lit sphere, atmosphere, city arcs with comet trails, an orbit and a satellite. */
function GlobeCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // Land: each map cell sampled twice for density. Ocean: a sparse even scatter.
    const land: number[][] = [];
    worldLand.forEach((on, i) => {
      if (!on) return;
      const cx = i % WORLD.columns, cy = Math.floor(i / WORLD.columns);
      for (const [ox, oy] of [[0.28, 0.3], [0.72, 0.7]]) {
        let lon = WORLD.west + ((cx + ox) / WORLD.columns) * (WORLD.east - WORLD.west);
        if (lon > 180) lon -= 360;
        const lat = WORLD.north - ((cy + oy) / WORLD.rows) * (WORLD.north - WORLD.south);
        land.push(toVec(lon, lat));
      }
    });
    const ocean: number[][] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < 1400; i++) {
      const y = 1 - (i / 1399) * 2, rad = Math.sqrt(1 - y * y), th = golden * i;
      ocean.push([Math.cos(th) * rad, y, Math.sin(th) * rad]);
    }
    const cities = CITIES.map(([, lon, lat]) => toVec(lon, lat));
    const stars = Array.from({ length: 140 }, (_, i) => {
      const h = Math.sin(i * 127.1) * 43758.5453;
      const h2 = Math.sin(i * 311.7) * 12345.678;
      return [h - Math.floor(h), h2 - Math.floor(h2), (i % 7) / 7];
    });

    const norm = (v: number[]) => { const l = Math.hypot(v[0], v[1], v[2]); return [v[0] / l, v[1] / l, v[2] / l]; };
    const slerp = (a: number[], b: number[], t: number) => norm([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]);

    let mx = 0, cm = 0;
    const onMove = (e: PointerEvent) => { mx = e.clientX / window.innerWidth - 0.5; };
    if (!reduced) window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    let raf = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const T = reduced ? 4000 : now;
      cm += (mx - cm) * 0.04;
      const W = canvas.width, H = canvas.height, R = W * 0.36, cx = W / 2, cy = H / 2;
      ctx.clearRect(0, 0, W, H);

      // star field
      for (const [sx, sy, tw] of stars) {
        const a = 0.12 + 0.25 * (0.5 + 0.5 * Math.sin(T / 900 + tw * 20));
        ctx.fillStyle = `rgba(244,241,234,${a.toFixed(3)})`;
        ctx.fillRect(sx * W, sy * H, 1.2 * dpr, 1.2 * dpr);
      }

      const rot = (reduced ? 1.2 : T * 0.00005) + cm * 0.6 - 1.4;
      const tilt = 0.32;
      const cr = Math.cos(rot), sr = Math.sin(rot), ct = Math.cos(tilt), st = Math.sin(tilt);
      const proj = (p: number[], k = 1) => {
        const x1 = p[0] * cr + p[2] * sr, z1 = -p[0] * sr + p[2] * cr;
        const y2 = -p[1] * ct - z1 * st, z2 = -p[1] * st + z1 * ct;
        return [cx + x1 * R * k, cy + y2 * R * k, z2];
      };

      // orbit ring (back half), drawn before the globe
      const orbitTilt = 1.15, orbitR = 1.32;
      const orbitPt = (a: number) => {
        const x = Math.cos(a) * orbitR, z = Math.sin(a) * orbitR;
        return [cx + x * R, cy + z * Math.cos(orbitTilt) * R * 0.38 - z * 0.18 * R, z];
      };
      const drawOrbit = (front: boolean) => {
        ctx.lineWidth = 1 * dpr;
        ctx.strokeStyle = "rgba(244,241,234,0.14)";
        ctx.setLineDash([3 * dpr, 6 * dpr]);
        ctx.beginPath();
        let started = false;
        for (let k = 0; k <= 160; k++) {
          const a = (k / 160) * Math.PI * 2;
          const [x, y, z] = orbitPt(a);
          if ((z > 0) !== front) { started = false; continue; }
          if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
        const sa = (reduced ? 1 : T / 4200) % (Math.PI * 2);
        const [sx, sy, sz] = orbitPt(sa);
        if ((sz > 0) === front) {
          ctx.shadowColor = "#FF5A1F"; ctx.shadowBlur = 16 * dpr;
          ctx.fillStyle = "#FFB06A";
          ctx.beginPath(); ctx.arc(sx, sy, 3.2 * dpr, 0, Math.PI * 2); ctx.fill();
          ctx.shadowBlur = 0;
        }
      };
      drawOrbit(false);

      // atmosphere glow (circular, so no hard canvas edge)
      const atm = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.22);
      atm.addColorStop(0, "rgba(255,110,50,0.28)");
      atm.addColorStop(0.45, "rgba(255,90,31,0.08)");
      atm.addColorStop(1, "rgba(255,90,31,0)");
      ctx.fillStyle = atm;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.22, 0, Math.PI * 2); ctx.fill();

      // lit sphere body
      const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      body.addColorStop(0, "rgba(58,40,34,0.95)");
      body.addColorStop(0.6, "rgba(26,22,24,0.96)");
      body.addColorStop(1, "rgba(12,13,16,0.98)");
      ctx.fillStyle = body;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();

      // ocean + land dots, shaded by a light from the upper left
      const light = (x: number, y: number, z: number) => Math.max(0, 0.55 + 0.45 * ((-(x - cx) / R) * 0.45 + (-(y - cy) / R) * 0.5 + z * 0.75));
      const od = 1.1 * dpr;
      for (const p of ocean) {
        const [x, y, z] = proj(p);
        if (z <= 0) continue;
        ctx.fillStyle = `rgba(244,241,234,${(0.05 + 0.1 * z).toFixed(3)})`;
        ctx.fillRect(x, y, od, od);
      }
      const ld = 1.9 * dpr;
      for (const p of land) {
        const [x, y, z] = proj(p);
        if (z <= -0.05) continue;
        const l = light(x, y, z);
        const a = Math.min(1, (0.25 + 0.75 * z) * (0.45 + 0.75 * l));
        ctx.fillStyle = z > 0 ? `rgba(255,${Math.round(214 - 60 * (1 - l))},${Math.round(181 - 80 * (1 - l))},${a.toFixed(3)})` : "rgba(244,241,234,0.05)";
        ctx.fillRect(x - ld / 2, y - ld / 2, ld, ld);
      }

      // rim light
      const rim = ctx.createRadialGradient(cx, cy, R * 0.82, cx, cy, R * 1.01);
      rim.addColorStop(0, "rgba(255,138,61,0)");
      rim.addColorStop(1, "rgba(255,138,61,0.35)");
      ctx.fillStyle = rim;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.01, 0, Math.PI * 2); ctx.fill();

      // routes with comet trails
      ROUTES.forEach(([ai, bi], idx) => {
        const A = cities[ai], B = cities[bi];
        const dist = Math.acos(Math.max(-1, Math.min(1, A[0] * B[0] + A[1] * B[1] + A[2] * B[2])));
        const lift = 0.12 + dist * 0.12;
        const N = 64;
        const pts: number[][] = [];
        for (let k = 0; k <= N; k++) {
          const t = k / N, p = slerp(A, B, t), h = 1 + lift * Math.sin(Math.PI * t);
          pts.push(proj([p[0] * h, p[1] * h, p[2] * h]));
        }
        ctx.lineWidth = 1 * dpr;
        for (let k = 1; k <= N; k++) {
          const q = pts[k], p0 = pts[k - 1];
          if (q[2] < -0.05 || p0[2] < -0.05) continue;
          ctx.strokeStyle = `rgba(255,122,60,${(0.1 + 0.3 * Math.max(0, q[2])).toFixed(3)})`;
          ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(q[0], q[1]); ctx.stroke();
        }
        if (reduced) return;
        const head = ((T / 2600 + idx * 0.173) % 1.25);
        const tail = 0.22;
        ctx.lineCap = "round";
        for (let k = 1; k <= N; k++) {
          const t = k / N;
          if (t > head || t < head - tail) continue;
          const q = pts[k], p0 = pts[k - 1];
          if (q[2] < 0 || p0[2] < 0) continue;
          const f = 1 - (head - t) / tail;
          ctx.strokeStyle = `rgba(255,${Math.round(170 + 70 * f)},${Math.round(110 + 110 * f)},${(f * 0.95).toFixed(3)})`;
          ctx.lineWidth = (0.8 + 2 * f) * dpr;
          ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(q[0], q[1]); ctx.stroke();
        }
        if (head <= 1) {
          const hp = pts[Math.min(N, Math.round(head * N))];
          if (hp[2] > 0) {
            ctx.shadowColor = "#FF5A1F"; ctx.shadowBlur = 14 * dpr;
            ctx.fillStyle = "#FFF3E6";
            ctx.beginPath(); ctx.arc(hp[0], hp[1], 2.2 * dpr, 0, Math.PI * 2); ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
        ctx.lineCap = "butt";
      });

      // city markers with pulse rings
      cities.forEach((c, i) => {
        const [x, y, z] = proj(c);
        if (z <= 0.02) return;
        const pulse = reduced ? 0.5 : ((T / 1800 + i * 0.37) % 1);
        ctx.strokeStyle = `rgba(255,90,31,${((1 - pulse) * 0.7 * z).toFixed(3)})`;
        ctx.lineWidth = 1.2 * dpr;
        ctx.beginPath(); ctx.arc(x, y, (3 + pulse * 12) * dpr, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = `rgba(255,243,230,${(0.5 + 0.5 * z).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(x, y, 2.4 * dpr, 0, Math.PI * 2); ctx.fill();
      });

      drawOrbit(true);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", onMove); };
  }, []);
  return <canvas ref={ref} className="global-canvas" aria-hidden="true" />;
}

export default function Global() {
  return (
    <section id="global" className="sec sec--dark global" aria-labelledby="global-title">
      <GlobeCanvas />
      <div className="global-inner">
        <Eyebrow n="09">Global Crypto Connectivity</Eyebrow>
        <h2 id="global-title" className="h2">One network. <em>A world without digital borders.</em></h2>
        <p className="sub">Our ambition is a currency that works the same in Chennai, Lagos, São Paulo or Berlin. It is an ambition, not a claim of global adoption.</p>
        <div className="prose" style={{ marginTop: 24 }}>
          <p>Blockchains don&rsquo;t recognise borders, but people still face them: in fees, in banking access, in language and in regulation. X6 is designed to lower those barriers wherever it is legally possible to do so, and to be honest about where it is not.</p>
        </div>
      </div>
      <div className="global-band">
        <StatsBand
          className="x6-stats"
          layout="divided"
          stats={STATS}
          title="Built to reach everyone. Honest about where it is today."
          description="International access, cross-border payments, connected apps and open developer programmes are the goal. Every number here is a fact about the project, not a usage claim."
        />
      </div>
      <div className="global-chart">
        <FactChart
          kicker="The barriers"
          title="Who still gets left at the edge."
          big="1.4B"
          sub="adults worldwide still have no bank account"
          viz={<Bullet value={6.5} target={3} max={8} valueLabel="~6.5% to send $200" targetLabel="UN 2030 target: 3%" ticks={["0%", "2%", "4%", "6%", "8%"]} />}
          stats={[{ k: "Unbanked adults", v: "~1.4B" }, { k: "Cost vs target", v: "2x+" }]}
          source="Sources: World Bank Global Findex (unbanked adults); World Bank Remittance Prices Worldwide (cost to send $200, early 2025)."
        >
          <p>Access, language and cost still decide who can take part. About 1.4 billion adults have no account, and sending $200 across borders costs around 6.5% on average, more than double the UN&rsquo;s 3% goal. Closing that gap is what X6 is built around.</p>
        </FactChart>
      </div>
      <div className="global-stamp">Visualisation is illustrative.<br />Live regional availability will be listed here once launched.</div>
    </section>
  );
}
