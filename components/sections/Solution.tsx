import { Eyebrow, Reveal } from "./ui";
import FactChart from "./FactChart";
import { Waffle } from "./FactViz";

const PILLARS = [
  { t: "Cryptocurrency", s: "The core asset and economic foundation", icon: "/icons/value.webp", bg: "#DFE9D4", x: 50, y: 6 },
  { t: "Blockchain", s: "Transactions, transparency, ownership", icon: "/icons/coin-edge.webp", bg: "#E7E9EE", x: 94, y: 50 },
  { t: "Artificial intelligence", s: "The supporting intelligence layer", icon: "/icons/ai.webp", bg: "#F9DCC7", x: 50, y: 94 },
  { t: "Global connectivity", s: "Participation across borders", icon: "/icons/web.webp", bg: "#F0E4E6", x: 6, y: 50 },
];

const FLOW = [
  { t: "Own", b: "You hold X6 in a wallet you control. Ownership is recorded on-chain, not in a company database." },
  { t: "Transact", b: "Every transfer is validated by the network and settled publicly, verifiable by anyone, reversible by no one." },
  { t: "Understand", b: "AI-powered tools explain activity, flag risks and surface insights, so decisions rest on information." },
  { t: "Participate", b: "Users, builders and communities in any region join the same network on the same terms." },
  { t: "Use", b: "Payments, access, fees and governance give the token a job to do inside the ecosystem." },
];

export default function Solution() {
  return (
    <section id="solution" className="sec sec--cream" aria-labelledby="solution-title">
      <div className="solution-top">
        <div>
          <Eyebrow n="04">Our Solution</Eyebrow>
          <h2 id="solution-title" className="h2">One connected <em>crypto ecosystem.</em></h2>
          <p className="sub">X6 brings a native cryptocurrency, the blockchain it runs on, an AI layer and global access together, so each part makes the others more useful.</p>
          <div className="prose" style={{ marginTop: 26 }}>
            <p>The cryptocurrency sits at the centre. <strong>Blockchain</strong> gives it security, transparency and provable ownership. <strong>Artificial intelligence</strong> makes the system easier to understand and safer to use. <strong>Global connectivity</strong> decides who can take part, and the answer should be anyone.</p>
            <p>Instead of separate products stitched together later, X6 is designed as one economy from day one: the same asset, the same records and the same rules across every application built on it.</p>
          </div>
        </div>
        <Reveal className="orbit" aria-label="Diagram: the X6 coin at the centre of four pillars">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <circle className="ring" cx="50" cy="50" r="44" />
            <circle className="ring" cx="50" cy="50" r="30" />
            {PILLARS.map((p) => <line key={p.t} className="spoke" x1="50" y1="50" x2={p.x} y2={p.y} />)}
          </svg>
          <div className="orbit-core">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/coin-hero.webp" alt="" width={760} height={760} />
          </div>
          {PILLARS.map((p) => (
            <div key={p.t} className="pillar" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
              <div className="ico" style={{ ["--tint-bg" as string]: p.bg }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.icon} alt="" width={58} height={58} />
              </div>
              <b>{p.t}</b>
              <span>{p.s}</span>
            </div>
          ))}
        </Reveal>
      </div>

      <div className="flow" role="list" aria-label="How the ecosystem works, step by step">
        <span className="flow-dot" aria-hidden="true" />
        {FLOW.map((f, i) => (
          <Reveal key={f.t} className="flow-step" role="listitem" delay={i * 90}>
            <span className="pin">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="h3">{f.t}</h3>
            <p>{f.b}</p>
          </Reveal>
        ))}
      </div>
      <FactChart
        kicker="Why it matters"
        title="Less to learn before your first transaction."
        big="~20%"
        sub="of all bitcoin is estimated to be lost for good"
        viz={<Waffle lost={20} satoshi={6} labels={{ lost: "~3.7M BTC estimated lost", satoshi: "of which ~1.1M are Satoshi's coins", rest: "~14.8M BTC still moving" }} />}
        stats={[{ k: "Lost = untouched for", v: "5+ years" }, { k: "Estimate date", v: "mid-2020" }]}
        source="Each square is 1% of ~18.5M bitcoin in existence. Source: Chainalysis, 2020 estimate; totals vary between analysts."
      >
        <p>Seed phrases, gas fees, hex addresses, networks and approvals are a lot to hold in your head. Lose the keys and the coins are gone: Chainalysis estimated about 3.7 million bitcoin may be lost this way. X6 is designed to explain each step in plain words.</p>
      </FactChart>
      <p className="note">Status today: X6 is in its Foundation phase. Everything shown here describes the intended design; nothing in this diagram is live yet. Progress is tracked openly in the roadmap below.</p>
    </section>
  );
}
