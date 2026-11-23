/* Different chart types for the sourced fact cards. Colours come from the card's CSS variables. */

/** Horizontal comparison bars with a change badge. */
export function CompareBars({ rows, delta }: { rows: { label: string; value: number; display: string; accent?: boolean }[]; delta: string }) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <div className="viz-cmp">
      {rows.map((r) => (
        <div key={r.label} className="viz-cmp-row">
          <span className="viz-cmp-l">{r.label}</span>
          <span className="viz-cmp-track">
            <span className={r.accent ? "viz-cmp-fill viz-cmp-fill--hot" : "viz-cmp-fill"} style={{ width: `${(r.value / max) * 100}%` }}>{r.display}</span>
          </span>
        </div>
      ))}
      <span className="viz-delta">{delta}</span>
    </div>
  );
}

/** 10 x 10 waffle: each square is 1% of the whole. */
export function Waffle({ lost, satoshi, labels }: { lost: number; satoshi: number; labels: { rest: string; lost: string; satoshi: string } }) {
  return (
    <div className="viz-waffle-wrap">
      <div className="viz-waffle" role="img" aria-label={`${lost}% lost, of which about ${satoshi}% is Satoshi's coins`}>
        {Array.from({ length: 100 }, (_, i) => (
          <i key={i} className={i < satoshi ? "w-sat" : i < lost ? "w-lost" : ""} style={{ animationDelay: `${i * 8}ms` }} />
        ))}
      </div>
      <ul className="viz-legend">
        <li><i className="w-lost" />{labels.lost}</li>
        <li><i className="w-sat" />{labels.satoshi}</li>
        <li><i />{labels.rest}</li>
      </ul>
    </div>
  );
}

/** Bubble timeline: x = date, bubble area = amount. */
export function BubbleTimeline({ items, axis }: { items: { name: string; m: number; t: number; amount: string }[]; axis: { t: number; label: string }[] }) {
  const W = 720, base = 118, step = 640 / 14, k = 1.1;
  const x = (t: number) => 40 + t * step;
  return (
    <div className="viz-scroll">
      <svg viewBox="0 0 720 196" className="viz-svg" role="img" aria-label="Bridge hacks by date, bubble size shows amount stolen">
        <line x1="20" x2={W - 20} y1={base} y2={base} className="v-axis" />
        {axis.map((a) => (
          <g key={a.label}>
            <line x1={x(a.t)} x2={x(a.t)} y1={base} y2={base + 6} className="v-axis" />
            <text x={x(a.t)} y={base + 20} textAnchor="middle" className="v-t">{a.label}</text>
          </g>
        ))}
        {items.map((d, i) => {
          const r = Math.sqrt(d.m) * k;
          return (
            <g key={d.name}>
              <circle cx={x(d.t)} cy={base - r} r={r} className="v-bub" style={{ animationDelay: `${i * 90}ms` }} />
              <text x={x(d.t)} y={base - 2 * r - 8} textAnchor="middle" className="v-val">{d.amount}</text>
              <text x={x(d.t)} y={base + 42 + (i % 2) * 14} textAnchor="middle" className="v-t">{d.name}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Bullet chart: actual value against a target marker. */
export function Bullet({ value, target, max, valueLabel, targetLabel, ticks }: { value: number; target: number; max: number; valueLabel: string; targetLabel: string; ticks: string[] }) {
  return (
    <div className="viz-bullet" role="img" aria-label={`${valueLabel} against a target of ${targetLabel}`}>
      <div className="viz-bullet-track">
        <span className="viz-bullet-fill" style={{ width: `${(value / max) * 100}%` }}><b>{valueLabel}</b></span>
        <span className="viz-bullet-target" style={{ left: `${(target / max) * 100}%` }}><em>{targetLabel}</em></span>
      </div>
      <div className="viz-bullet-ticks" aria-hidden="true">{ticks.map((t) => <span key={t}>{t}</span>)}</div>
    </div>
  );
}

/** Line through key points on a log scale, with fall badges. */
export function FallLine({ points, falls, note }: { points: { x: number; v: number; label: string; when: string }[]; falls: { from: number; to: number; text: string }[]; note: string }) {
  const W = 720, H = 210, top = 30, bot = 170, lo = 2500, hi = 90000;
  const X = (m: number) => 100 + (m / 59) * 570;
  const Y = (v: number) => bot - (Math.log(v / lo) / Math.log(hi / lo)) * (bot - top);
  const pts = points.map((p) => `${X(p.x)},${Y(p.v)}`).join(" ");
  return (
    <div className="viz-scroll">
      <svg viewBox={`0 0 ${W} ${H}`} className="viz-svg" role="img" aria-label="Bitcoin peaks and troughs on a log scale">
        {[3000, 10000, 30000].map((g) => (
          <g key={g}>
            <line x1="70" x2="690" y1={Y(g)} y2={Y(g)} className="v-grid" />
            <text x="64" y={Y(g) + 4} textAnchor="end" className="v-t">${g / 1000}k</text>
          </g>
        ))}
        <polyline points={pts} className="v-line" fill="none" />
        {falls.map((f) => {
          const a = points[f.from], b = points[f.to];
          return <text key={f.text} x={(X(a.x) + X(b.x)) / 2 + 14} y={(Y(a.v) + Y(b.v)) / 2} className="v-fall">{f.text}</text>;
        })}
        {points.map((p, i) => (
          <g key={p.label}>
            <circle cx={X(p.x)} cy={Y(p.v)} r="5" className={i % 2 === 0 ? "v-dot v-dot--peak" : "v-dot"} />
            <text x={X(p.x)} y={Y(p.v) + (i % 2 === 0 ? -12 : 20)} textAnchor="middle" className="v-val">{p.label}</text>
            <text x={X(p.x)} y={H - 8} textAnchor="middle" className="v-t">{p.when}</text>
          </g>
        ))}
      </svg>
      <p className="viz-note">{note}</p>
    </div>
  );
}
