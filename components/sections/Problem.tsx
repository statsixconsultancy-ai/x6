"use client";

import { ArrowRight } from "lucide-react";
import FactChart from "./FactChart";
import { CompareBars } from "./FactViz";
import { Eyebrow, Reveal } from "./ui";

const MORE = [
  { t: "Fragmented networks", b: "Hundreds of blockchains run side by side, each with its own wallets, tokens and rules. One person's holdings end up split across networks that rarely talk to each other." },
  { t: "Complicated experiences", b: "Seed phrases, gas fees, hex addresses and approvals overwhelm newcomers before their first transaction." },
  { t: "Limited interoperability", b: "Moving value between chains means wrapping, bridging and unwrapping, with a fee at every hop." },
  { t: "Hard-to-understand assets", b: "Raw on-chain activity spikes and stalls with no explanation of supply, utility or risk." },
  { t: "Barriers to participation", b: "Language, banking access and cost still decide who can take part." },
  { t: "Lack of transparency", b: "Allocations vanish, audits stay “coming soon” and treasuries move without labels." },
];

export default function Problem() {
  return (
    <section id="problem" className="sec sec--grey" aria-labelledby="problem-title">
      <div className="head">
        <div>
          <Eyebrow n="03">The Problem</Eyebrow>
          <h2 id="problem-title" className="h2">Why crypto needs <em>a new approach.</em></h2>
        </div>
        <div className="prose">
          <p className="sub" style={{ marginTop: 0 }}>Cryptocurrency proved that value can move without intermediaries. It has not yet proved that ordinary people can use it with confidence.</p>
        </div>
      </div>

      <div className="pb-pair">
        <FactChart
          kicker="Security & custody risk"
          title="Billions are stolen every year."
          big="$3.4B"
          sub="stolen in crypto hacks in 2025"
          max={4}
          ticks={["$4B", "$3B", "$2B", "$1B", "$0"]}
          bars={[
            { label: "2022", value: 3.7, display: "$3.7B" },
            { label: "2023", value: 1.7, display: "$1.7B" },
            { label: "2024", value: 2.2, display: "$2.2B" },
            { label: "2025", value: 3.4, display: "$3.4B", accent: true },
          ]}
          stats={[{ k: "Bybit hack, Feb 2025", v: "~$1.5B" }, { k: "Keys compromised, 2024", v: "43.8%" }]}
          source="Source: Chainalysis crime reports, 2022–2025 (2022, 2023 and Bybit figures approximate)."
        >
          <p>Private keys are the weak point. When a platform or a wallet is breached, the loss is usually final.</p>
        </FactChart>
        <FactChart
          dark
          kicker="One wrong signature"
          title="Approvals can empty a wallet."
          big="$494M"
          sub="drained by phishing drainers in 2024"
          viz={<CompareBars rows={[{ label: "2023", value: 295.5, display: "$295.5M" }, { label: "2024", value: 494, display: "$494M", accent: true }]} delta="+67% in a year" />}
          stats={[{ k: "Wallet addresses hit, 2024", v: "~332,000" }, { k: "Largest single theft", v: "$55.4M" }]}
          source="Source: Scam Sniffer annual phishing reports (2023, 2024)."
        >
          <p>One unlimited approval or a fake signing request can hand a malicious contract access to everything in a wallet. Nothing needs to be hacked: the owner signs it themselves.</p>
        </FactChart>
      </div>

      <ul className="pb-list" aria-label="Other problems">
        {MORE.map((m, i) => (
          <Reveal as="li" key={m.t} delay={(i % 3) * 70}>
            <h3>{m.t}</h3>
            <p>{m.b}</p>
          </Reveal>
        ))}
      </ul>

      <div className="pb-foot">
        <p>One idea answers all of them: a currency people can understand, verify and use.</p>
        <a href="#solution" className="btn magnetic">See our solution <ArrowRight size={16} aria-hidden="true" /></a>
      </div>
    </section>
  );
}
