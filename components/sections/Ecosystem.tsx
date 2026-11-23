"use client";

import { useState } from "react";
import { ecosystem, type Status } from "@/lib/site";
import { Eyebrow, StatusChip, statusLabel } from "./ui";

const VISUAL: Record<string, { icon: string; bg: string; glow: string }> = {
  wallet: { icon: "/icons/eco-wallet.webp", bg: "#DFE9D4", glow: "rgba(150,206,150,.9)" },
  infrastructure: { icon: "/icons/eco-server.webp", bg: "#E7E9EE", glow: "rgba(169,180,200,.8)" },
  ai: { icon: "/icons/eco-chip.webp", bg: "#F9DCC7", glow: "rgba(249,150,84,.8)" },
  integrations: { icon: "/icons/eco-plug.webp", bg: "#ECD6E2", glow: "rgba(222,150,200,.85)" },
  payments: { icon: "/icons/eco-pay.webp", bg: "#DFE9D4", glow: "rgba(150,206,150,.9)" },
  developers: { icon: "/icons/eco-code.webp", bg: "#F2ECDF", glow: "rgba(246,222,104,.8)" },
  community: { icon: "/icons/eco-people.webp", bg: "#F4EBC6", glow: "rgba(246,222,104,.9)" },
  connectivity: { icon: "/icons/eco-globe.webp", bg: "#F0E4E6", glow: "rgba(222,150,200,.85)" },
};

export default function Ecosystem() {
  const [sel, setSel] = useState(0);
  const cur = ecosystem[sel];
  const v = VISUAL[cur.key];
  const counts = (["live", "development", "concept"] as Status[]).map((s) => [s, ecosystem.filter((e) => e.status === s).length] as const);

  return (
    <section id="ecosystem" className="sec sec--cream" aria-labelledby="eco-title">
      <div className="head">
        <div>
          <Eyebrow n="10">The Ecosystem</Eyebrow>
          <h2 id="eco-title" className="h2">Eight parts. <em>One economy.</em></h2>
        </div>
        <div>
          <p className="sub" style={{ marginTop: 0 }}>Each product has a clear purpose and a direct relationship with the native token. Each is labelled honestly by how far along it is.</p>
          <div className="legend" style={{ marginTop: 22 }} aria-label="Status summary">
            {counts.map(([s, n]) => (
              <span key={s} className="row" style={{ gap: 8 }}><StatusChip status={s} /> {n} of {ecosystem.length}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="eco">
        <div className="eco-list" role="tablist" aria-label="Ecosystem products">
          {ecosystem.map((e, i) => (
            <button key={e.key} type="button" role="tab" id={`eco-${i}`} aria-controls="eco-panel" aria-selected={sel === i} className="eco-btn" onClick={() => setSel(i)}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="ico" src={VISUAL[e.key].icon} alt="" width={36} height={36} />
              <span className="t">{e.title}</span>
              <span className="chip chip--concept" style={{ fontSize: 9.5 }} title={statusLabel(e.status)}>{e.status === "live" ? "Live" : e.status === "development" ? "Dev" : "Concept"}</span>
            </button>
          ))}
        </div>

        <div className="eco-panel" id="eco-panel" role="tabpanel" aria-labelledby={`eco-${sel}`} key={cur.key}>
          <div className="eco-visual" style={{ ["--bg" as string]: v.bg, ["--glow" as string]: v.glow }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={v.icon} alt="" width={480} height={480} />
            <span className="big">{String(sel + 1).padStart(2, "0")}</span>
          </div>
          <div className="eco-body">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <span className="kicker">Purpose</span>
              <StatusChip status={cur.status} />
            </div>
            <h3 className="h3">{cur.title}</h3>
            <p>{cur.purpose}</p>
            <div>
              <span className="kicker" style={{ display: "block", marginBottom: 8 }}>Functionality</span>
              <ul>{cur.functionality.map((f) => <li key={f}>{f}</li>)}</ul>
            </div>
            <div className="eco-meta">
              <div><span className="kicker">Value</span><p>{cur.value}</p></div>
              <div><span className="kicker">Role of the token</span><p>{cur.token}</p></div>
            </div>
          </div>
        </div>
      </div>
      <p className="note">Status key. Live: available to the public today. In development: being built or tested. Roadmap concept: designed, not yet in development.</p>
    </section>
  );
}
