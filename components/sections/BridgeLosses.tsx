"use client";

import { useState } from "react";

/* Real, publicly reported cross-chain bridge exploits. Amounts are approximate USD at the time of the attack.
   t = months since Aug 2021. */
const HACKS = [
  { name: "Poly Network", when: "Aug 2021", t: 0, m: 611, tag: "Contract flaw",
    text: "An attacker abused a flaw in the cross-chain contract that manages who may unlock funds, and took assets on several chains at once.",
    outcome: "Most of the funds were returned within days." },
  { name: "Wormhole", when: "Feb 2022", t: 6, m: 325, tag: "Verification flaw",
    text: "A bug in signature checking let the attacker mint 120,000 wrapped ETH on Solana without depositing anything, then swap it for real assets.",
    outcome: "Jump Crypto replaced the missing funds." },
  { name: "Ronin Bridge", when: "Mar 2022", t: 7, m: 625, tag: "Stolen keys",
    text: "Attackers gained control of 5 of the 9 validator keys needed to approve withdrawals, then drained the bridge behind the Axie Infinity game.",
    outcome: "Went unnoticed for six days. Attributed to the Lazarus Group." },
  { name: "Harmony Horizon", when: "Jun 2022", t: 10, m: 100, tag: "Stolen keys",
    text: "Only 2 of 5 multisig keys were needed to move funds, and both were compromised.",
    outcome: "Attributed to the Lazarus Group." },
  { name: "Nomad", when: "Aug 2022", t: 12, m: 190, tag: "Config flaw",
    text: "A faulty upgrade meant any message looked pre-approved. Once one withdrawal was copied, hundreds of wallets repeated it.",
    outcome: "A chaotic free-for-all rather than a single attacker." },
  { name: "BNB Bridge", when: "Oct 2022", t: 14, m: 570, tag: "Proof forgery",
    text: "Forged proofs tricked the bridge into minting 2 million BNB, which the attacker started moving to other chains.",
    outcome: "Validators halted the chain; a large part was frozen." },
];

const AXIS = [{ t: 0, l: "Aug 2021" }, { t: 5, l: "Jan 2022" }, { t: 10, l: "Jun 2022" }, { t: 14, l: "Oct 2022" }];
const GRID = [0, 200, 400, 600];
const X = (t: number) => 82 + (t / 14) * 366;
const Y = (m: number) => 270 - (m / 700) * 240;
const R = (m: number) => Math.sqrt(m) * 0.85;

export default function BridgeLosses() {
  const [hover, setHover] = useState<number | null>(null);
  const [pin, setPin] = useState<number | null>(null);
  const active = hover ?? pin;
  const d = active !== null ? HACKS[active] : null;

  return (
    <article className="br">
      <div className="br-chart">
        <svg viewBox="0 0 480 310" className="br-svg" role="group" aria-label="Bridge hacks by date and amount stolen. Select a bubble for details.">
          {GRID.map((g) => (
            <g key={g}>
              <line x1="52" x2="460" y1={Y(g)} y2={Y(g)} className={g === 0 ? "br-axis" : "br-grid"} />
              <text x="44" y={Y(g) + 4} textAnchor="end" className="br-t">{g === 0 ? "$0" : `$${g}M`}</text>
            </g>
          ))}
          {AXIS.map((a) => <text key={a.l} x={X(a.t)} y="296" textAnchor="middle" className="br-t">{a.l}</text>)}
          {HACKS.map((h, i) => (
            <g
              key={h.name}
              className={"br-b" + (active === i ? " is-on" : active !== null ? " is-dim" : "")}
              tabIndex={0}
              role="button"
              aria-label={`${h.name}, ${h.when}, about $${h.m} million`}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              onClick={() => setPin(pin === i ? null : i)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setPin(pin === i ? null : i); } }}
            >
              <circle cx={X(h.t)} cy={Y(h.m)} r={R(h.m)} style={{ animationDelay: `${i * 90}ms` }} />
              <text x={X(h.t)} y={Y(h.m) - R(h.m) - 7} textAnchor="middle" className="br-n">{h.name.split(" ")[0]}</text>
            </g>
          ))}
        </svg>
        <p className="br-note">Bubble area = amount stolen. Hover or tap a bubble.</p>
      </div>

      <div className="br-side">
        <div className="br-default" aria-hidden={d ? true : undefined}>
          <span className="br-kicker">Interoperability, in real numbers</span>
          <h3 className="br-title">Why crypto loses the most money at the bridge.</h3>
          <p className="br-copy">Moving value between chains means wrapping, bridging and unwrapping, with a fee and a trust assumption at every hop. Chainalysis counted about <strong>$2 billion</strong> stolen in cross-chain bridge attacks in 2022 alone. X6 aims to keep value inside one connected ecosystem.</p>
          <div className="br-stats">
            <div><b>~$2B</b><span>stolen from bridges, 2022</span></div>
            <div><b>13</b><span>bridge attacks in 2022</span></div>
            <div><b>~69%</b><span>of all funds stolen</span></div>
          </div>
          <p className="br-source">Approximate USD at time of attack. Sources: public incident reports, Chainalysis 2022 Crypto Crime Report.</p>
        </div>

        <div className={"br-detail" + (d ? " is-open" : "")} aria-live="polite">
          {d && (
            <>
              <div className="br-detail-top">
                <span className="br-tag">{d.tag}</span>
                <button type="button" className="br-x" aria-label="Close details" onClick={() => { setPin(null); setHover(null); }}>×</button>
              </div>
              <h4>{d.name}</h4>
              <span className="br-when">{d.when}</span>
              <span className="br-amt">${d.m}M</span>
              <p>{d.text}</p>
              <p className="br-out">{d.outcome}</p>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
