import { ArrowRight } from "lucide-react";
import { Eyebrow, Reveal } from "./ui";
import ComingSoon from "./ComingSoon";

const PATHS = [
  { t: "Explore the cryptocurrency", b: "What X6 is, what it is for and what has been published so far.", href: "#token" },
  { t: "Understand the token", b: "What X6 is for, and which details have been published so far.", href: "#utility" },
  { t: "Read the documentation", b: "Whitepaper and technical docs are being written in Phase 01.", href: null },
  { t: "Join the community", b: "Official channels open soon. Until then, treat any 'official' group as unverified.", href: null },
  { t: "Follow development", b: "Track every milestone, from planned to complete.", href: "#roadmap" },
  { t: "Explore applications", b: "Eight products, each labelled by how far along it is.", href: "#ecosystem" },
  { t: "Check security", b: "Verify contracts and see which security practices are in place.", href: "#security" },
  { t: "Learn the technology", b: "How the blockchain foundation works, in plain words.", href: "#blockchain" },
];

const FAQ: { q: string; a: string[] }[] = [
  { q: "What is X6?", a: ["X6 is a planned cryptocurrency and the native asset of a connected ecosystem that combines blockchain infrastructure, AI-powered tools and global access. It is currently in its Foundation phase and has not launched."] },
  { q: "What is a cryptocurrency, in simple terms?", a: ["A cryptocurrency is digital money recorded on a blockchain, a public ledger maintained by many independent computers. You control it with a private key, and transfers are verified by the network rather than a bank."] },
  { q: "What problem does X6 solve?", a: ["Crypto today is fragmented, hard to use and often opaque. X6 aims to offer one connected ecosystem where the asset is easy to understand, its rules are public and its applications work together."] },
  { q: "Which blockchain does X6 use?", a: ["The host network has not been finalised. It will be announced with the technical documentation, together with the contract address. Until then, treat any claim about X6's network with caution."] },
  { q: "What can the token be used for?", a: ["Planned uses include ecosystem payments, transaction fees, access to premium tools, governance, developer incentives and application integrations. Each will be marked live only when it actually launches."] },
  { q: "How does AI fit in?", a: ["AI is a supporting layer: it explains on-chain activity, surfaces analytics, helps detect anomalies and assists users. AI-generated insights are informational only, they are not predictions or investment advice."] },
  { q: "How is the supply allocated?", a: ["Allocation categories are defined: public distribution, ecosystem development, liquidity, community and developer incentives, team and contributors, and treasury. Percentages and vesting will be published before launch and must total 100%."] },
  { q: "How can I acquire X6?", a: ["You can't yet. X6 has not launched and there is no official sale or listing. When that changes, official venues will be listed on this site. Anything offered before then is not ours."] },
  { q: "Where can I store X6?", a: ["Once live, X6 will be storable in compatible self-custodial wallets on its host network. Supported wallets will be listed here. Never share your seed phrase with anyone, including people claiming to be from X6."] },
  { q: "Is X6 safe?", a: ["No cryptocurrency is completely safe. X6 is planned to undergo independent audits, publish its contracts and allocations, and follow transparent treasury practices, but smart contracts, markets and wallets all carry risk."] },
  { q: "What are the investment risks?", a: ["Crypto assets are highly volatile and can lose most or all of their value. Projects can be delayed or fail, regulation can change, and liquidity can disappear. Only commit what you can afford to lose, and consider independent financial advice.", "Nothing on this site is financial advice, an offer of securities, or a promise of returns."] },
  { q: "Where do I find official updates?", a: ["This website is the canonical source. Official community channels will be linked here when they open, and every announcement about contracts or sales will be mirrored on this page."] },
];

export default function Community() {
  return (
    <>
      <section id="community" className="sec sec--grey" aria-labelledby="com-title">
        <div className="head">
          <div>
            <Eyebrow n="14">Community, FAQ &amp; Next steps</Eyebrow>
            <h2 id="com-title" className="h2">Built with the people <em>who use it.</em></h2>
          </div>
          <div className="prose">
            <p className="sub" style={{ marginTop: 0, marginBottom: 18 }}>A currency is only as strong as the community that understands it. Start wherever you are.</p>
            <p>Every path below leads to something real on this page or tells you honestly that it isn&rsquo;t ready yet.</p>
          </div>
        </div>

        <div className="paths">
          {PATHS.map((p, i) => {
            const inner = (
              <>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <b>{p.t}</b>
                <span>{p.b}</span>
                <span className="go">{p.href ? "Open →" : "Coming soon"}</span>
              </>
            );
            return p.href
              ? <a key={p.t} href={p.href} className="path">{inner}</a>
              : <div key={p.t} className="path soon" aria-disabled="true">{inner}</div>;
          })}
        </div>
        <div className="channels" id="channels" aria-label="Official channels">
          <span className="kicker" style={{ marginRight: 6 }}>Official channels</span>
          {["X (Twitter)", "Telegram", "Discord", "GitHub", "Newsletter"].map((c) => (
            <span key={c} className="chan">{c} · not yet open</span>
          ))}
        </div>

        <div className="faq-wrap" id="faq">
          <div className="sticky">
            <span className="kicker">Trust centre</span>
            <h3 className="h2" style={{ fontSize: "clamp(34px,3.6vw,58px)", marginTop: 14 }}>Questions, <em>answered plainly.</em></h3>
            <p className="sub" style={{ fontSize: 17 }}>From crypto basics to risk. If your question isn&rsquo;t here, the documentation will cover it when it&rsquo;s published.</p>
          </div>
          <div className="faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <div className="ans">{f.a.map((p) => <p key={p}>{p}</p>)}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="sec final" aria-labelledby="final-title">
        <span className="final-coin" style={{ left: "6%", top: "18%" }} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/coin-hero.webp" alt="" />
        </span>
        <span className="final-coin" style={{ right: "7%", bottom: "14%", width: "clamp(90px,10vw,160px)", animationDelay: "-2s" }} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/coin-edge.webp" alt="" />
        </span>
        <Reveal>
          <h2 id="final-title" className="h2">Be part of the next evolution of <em>digital connectivity.</em></h2>
          <p className="sub">Explore the ecosystem. Discover the technology. Join the community.</p>
        </Reveal>
      </section>

      <ComingSoon />

      <footer className="footer">
        <div className="footer-top">
          <div>
            <div className="footer-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/x6-logo-orange-128.png" alt="X6" width={32} height={32} />
            </div>
            <p className="footer-tag">The Nexus Point of Cryptocurrency, Artificial Intelligence and Global Connectivity.</p>
          </div>
          <div>
            <h4>Project</h4>
            <ul>
              <li><a href="#vision">About</a></li>
              <li><a href="#blockchain">Technology</a></li>
              <li><a href="#token">Token</a></li>
              <li><a href="#roadmap">Roadmap</a></li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li><span className="soon">Documentation</span></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#security">Verify contract</a></li>
              <li><a href="#community">Community</a></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><span className="soon">Contact</span></li>
              <li><span className="soon">Privacy Policy</span></li>
              <li><span className="soon">Terms</span></li>
              <li><a href="#risk">Risk Disclosure</a></li>
            </ul>
          </div>
        </div>
        <div className="risk" id="risk">
          <p>
            <strong style={{ color: "rgba(244,241,234,.8)" }}>Risk disclosure.</strong> X6 is in development and has not launched. Information on this website describes plans that may change and is not financial, legal or tax advice, nor an offer or solicitation to buy any asset. Cryptocurrencies are highly volatile and may lose all value; smart contracts may contain vulnerabilities; and regulation varies by jurisdiction and may restrict access. Do your own research and only commit what you can afford to lose.
          </p>
          <small>© {new Date().getFullYear()} X6 Coins</small>
        </div>
      </footer>
    </>
  );
}
