"use client";

import { useState } from "react";
import { roadmap } from "@/lib/site";
import { Eyebrow } from "./ui";

export default function Roadmap() {
  const curIdx = Math.max(0, roadmap.findIndex((r) => r.status === "current"));
  const [sel, setSel] = useState(curIdx);
  const p = roadmap[sel];
  const fill = (curIdx / (roadmap.length - 1)) * 100 * ((roadmap.length - 1) / roadmap.length) + 100 / roadmap.length / 2;

  return (
    <section id="roadmap" className="sec sec--cream" aria-labelledby="rm-title">
      <div className="head">
        <div>
          <Eyebrow n="13">Roadmap &amp; Development Milestones</Eyebrow>
          <h2 id="rm-title" className="h2">The journey, <em>in the open.</em></h2>
        </div>
        <div className="prose">
          <p className="sub" style={{ marginTop: 0, marginBottom: 18 }}>Five phases from foundation to global expansion. Completed work is marked complete only when it is done; dates appear once they are committed.</p>
          <p>Select a phase to see its milestones.</p>
        </div>
      </div>

      <div className="rm-line" role="tablist" aria-label="Roadmap phases">
        <span className="rm-fill" style={{ width: `${fill}%` }} aria-hidden="true" />
        {roadmap.map((r, i) => (
          <button key={r.phase} type="button" role="tab" id={`rm-${i}`} aria-controls="rm-panel" aria-selected={sel === i} data-status={r.status} className="rm-node" onClick={() => setSel(i)}>
            <span className="dot">{r.phase}</span>
            <b>{r.title}</b>
            <small>{r.status === "current" ? "Current phase" : r.status === "complete" ? "Complete" : "Planned"}{r.target ? ` · Target ${r.target}` : ""}</small>
          </button>
        ))}
      </div>

      <div className="rm-panel" id="rm-panel" role="tabpanel" aria-labelledby={`rm-${sel}`}>
        <div>
          <div className="big">{p.phase}</div>
          <h3 className="h3" style={{ marginTop: 18, fontSize: "clamp(28px,2.6vw,40px)" }}>{p.title}</h3>
          <p className="sub" style={{ fontSize: 17 }}>{p.summary}</p>
          <div className="row" style={{ marginTop: 22 }}>
            <span className={`chip ${p.status === "current" ? "chip--current" : p.status === "complete" ? "chip--live" : "chip--concept"}`}>{p.status === "current" ? "In progress" : p.status === "complete" ? "Complete" : "Planned"}</span>
            {p.target && <span className="fact">Target: {p.target}</span>}
          </div>
        </div>
        <ul aria-label={`Phase ${p.phase} milestones`}>
          {p.milestones.map((m) => (
            <li key={m}>
              <i className={p.status === "complete" ? "done" : p.status === "current" ? "cur" : ""} aria-hidden="true" />
              {m}
              <span className="kicker" style={{ marginLeft: "auto" }}>{p.status === "complete" ? "Done" : p.status === "current" ? "In progress" : "Planned"}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
