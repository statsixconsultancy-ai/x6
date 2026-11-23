import MetricsBoard, { type MetricsBoardData } from "@/components/ui/metrics-board";
import FactChart from "./FactChart";
import { FallLine } from "./FactViz";
import { Eyebrow, Reveal } from "./ui";

/** Sample figures for the concept board. Not X6 metrics, X6 has not launched. */
const SAMPLE: MetricsBoardData = {
  "7d": { bars: [4, 6, 5, 7, 6, 8, 9], total: "312", delta: "+6%" },
  "30d": { bars: [3, 4, 4, 6, 7, 8, 10], total: "1,284", delta: "+18%" },
  "90d": { bars: [2, 3, 5, 4, 6, 8, 9], total: "3,910", delta: "+41%" },
};

const DRIVERS = [
  { t: "Blockchain adoption", b: "More institutions and developers now build on public blockchains than at any point before." },
  { t: "Digital asset participation", b: "Holding and using digital assets is moving from niche to mainstream in many regions." },
  { t: "AI × blockchain convergence", b: "Intelligent tools make on-chain systems easier to use, audit and automate." },
  { t: "Ecosystem expansion", b: "Each new X6 product adds another reason to use the same shared asset." },
  { t: "Token utility development", b: "Utility grows as features move from roadmap concept to live." },
  { t: "Developer participation", b: "Open SDKs and grants let independent builders multiply what the ecosystem offers." },
  { t: "Global integration", b: "Integrations and localisation widen who can participate." },
];

export default function Growth() {
  return (
    <section id="growth" className="sec sec--grey" aria-labelledby="growth-title">
      <div className="head">
        <div>
          <Eyebrow n="12">Growth &amp; Long-term Opportunity</Eyebrow>
          <h2 id="growth-title" className="h2">Growth is built, <em>not promised.</em></h2>
        </div>
        <div className="prose">
          <p className="sub" style={{ marginTop: 0, marginBottom: 18 }}>The long-term opportunity for X6 depends on one thing: whether people find the ecosystem genuinely useful.</p>
          <p>The broad trends are real, and they favour connected, transparent and easy-to-use crypto ecosystems. But trends create opportunity, not outcomes. What X6 becomes will be decided by execution, measured milestone by milestone.</p>
        </div>
      </div>

      <div className="growth-board">
        <Reveal className="board">
          <MetricsBoard data={SAMPLE} metric="sample txns" fig="Concept" name="Ecosystem board" />
        </Reveal>
        <div>
          <span className="kicker">How growth will be reported</span>
          <h3 className="h3" style={{ marginTop: 12 }}>A public board, not a promise.</h3>
          <p className="sub" style={{ fontSize: 16.5 }}>Once X6 is live, ecosystem activity will be published on a board like this, read straight from the chain. Press 7D, 30D or 90D to try it.</p>
          <p className="note" style={{ marginTop: 14 }}>Sample data only. These figures are illustrative and are not X6 metrics.</p>
          <ol aria-label="What drives ecosystem growth">
            {DRIVERS.map((d) => <li key={d.t}><span><b>{d.t}.</b> {d.b}</span></li>)}
          </ol>
        </div>
      </div>

      <div className="versus">
        <Reveal className="a">
          <span className="kicker">What we work to build</span>
          <h3 className="h3" style={{ marginTop: 10 }}>Ecosystem growth</h3>
          <ul>
            <li>More live products and integrations</li>
            <li>More builders, contributors and community members</li>
            <li>More real transactions that use X6 for a purpose</li>
            <li>Measurable progress against a public roadmap</li>
          </ul>
        </Reveal>
        <div className="vs" aria-hidden="true">vs</div>
        <Reveal className="b" delay={120}>
          <span className="kicker">What no one can promise</span>
          <h3 className="h3" style={{ marginTop: 10 }}>Token price</h3>
          <ul>
            <li>Set by markets, sentiment and liquidity, not by the team</li>
            <li>Can fall even while the ecosystem grows</li>
            <li>Affected by regulation and the wider crypto market</li>
            <li>Never guaranteed: X6 is not an investment product with returns</li>
          </ul>
        </Reveal>
      </div>
      <FactChart
        kicker="Hype versus use"
        title="Activity without context tells you nothing."
        big="-84%"
        sub="Bitcoin's fall from its Dec 2017 peak to Dec 2018"
        viz={<FallLine
          points={[
            { x: 0, v: 19700, label: "~$19.7k", when: "Dec 2017" },
            { x: 12, v: 3200, label: "~$3.2k", when: "Dec 2018" },
            { x: 47, v: 69000, label: "~$69k", when: "Nov 2021" },
            { x: 59, v: 15500, label: "~$15.5k", when: "Nov 2022" },
          ]}
          falls={[{ from: 0, to: 1, text: "-84%" }, { from: 2, to: 3, text: "-77%" }]}
          note="Peaks and troughs only, joined by straight lines on a log scale. Not daily prices."
        />}
        stats={[{ k: "2017 to 2018", v: "-84%" }, { k: "2021 to 2022", v: "-77%" }]}
        source="Approximate peak-to-trough falls from public Bitcoin price history. Past performance says nothing about the future."
      >
        <p>Price and trading spikes arrive with no explanation of supply, utility or risk, and the crashes that follow can be brutal. X6 measures growth by real use, explained in plain words, not by spikes.</p>
      </FactChart>
      <p className="note">Nothing on this website is financial advice or an offer of securities. Cryptocurrencies are highly volatile; you could lose all of the money you put in.</p>
    </section>
  );
}
