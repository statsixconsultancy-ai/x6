import type { ReactNode } from "react";

export type Bar = { label: string; value: number; display: string; accent?: boolean };

type Props = {
  dark?: boolean; kicker: string; title: ReactNode; children: ReactNode; big: string; sub: string;
  stats?: { k: string; v: string }[]; source: string;
  /** Column chart data (used when `viz` is not given). */
  bars?: Bar[]; ticks?: string[]; max?: number;
  /** Any other visualisation. */
  viz?: ReactNode;
};

/** Card shell for sourced data. The visual is either a column chart or any custom `viz`. */
export default function FactChart({ dark, kicker, title, children, big, sub, bars, ticks, max = 1, stats, source, viz }: Props) {
  return (
    <article className={dark ? "fc fc--dark" : "fc"}>
      <span className="fc-kicker">{kicker}</span>
      <h3 className="fc-title">{title}</h3>
      <div className="fc-copy">{children}</div>

      <div className="fc-figure">
        <span className="fc-big">{big}</span>
        <span className="fc-sub">{sub}</span>
      </div>

      {viz ? (
        <div className="fc-viz">{viz}</div>
      ) : bars && ticks ? (
        <div className="fc-chart" role="img" aria-label={`${sub}: ${bars.map((b) => `${b.label} ${b.display}`).join(", ")}`}>
          <div className="fc-y" aria-hidden="true">{ticks.map((t) => <span key={t}>{t}</span>)}</div>
          <div className="fc-plot">
            <div className="fc-grid" aria-hidden="true">{ticks.map((t) => <i key={t} />)}</div>
            <div className="fc-bars">
              {bars.map((b, i) => {
                const h = `${(b.value / max) * 100}%`;
                return (
                  <div key={b.label} className="fc-col">
                    <span className="fc-v" style={{ bottom: `calc(${h} + 6px)` }}>{b.display}</span>
                    <span className={b.accent ? "fc-bar fc-bar--accent" : "fc-bar"} style={{ height: h, animationDelay: `${i * 90}ms` }} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="fc-x" aria-hidden="true">{bars.map((b) => <span key={b.label}>{b.label}</span>)}</div>
        </div>
      ) : null}

      {stats && (
        <dl className="fc-stats">
          {stats.map((s) => <div key={s.k}><dt>{s.k}</dt><dd>{s.v}</dd></div>)}
        </dl>
      )}
      <p className="fc-source">{source}</p>
    </article>
  );
}
