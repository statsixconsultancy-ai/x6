"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  BadgeCheck,
  Blocks,
  Code2,
  Gift,
  KeyRound,
  Receipt,
  ServerCog,
  Vote,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow, Reveal } from "./ui";
import UtilityScene from "./UtilityScenes";

interface Use {
  key: string;
  icon: LucideIcon;
  title: string;
  short: string;
  /** Where the token goes (or comes from). */
  dest: string;
  destNote: string;
  /** Tokens flow from you to dest, or from dest to you. */
  inbound?: boolean;
  outcome: string;
  detail: string;
  demand: string;
  tint: string;
}

const USES: Use[] = [
  { key: "pay", icon: Wallet, title: "Ecosystem payments", short: "Pay for goods, services and apps", dest: "Merchant", destNote: "Accepts X6 at checkout", outcome: "Paid in one shared currency", detail: "Settles on-chain in one confirmation, with a plain-language receipt instead of a raw hash.", demand: "Every purchase needs X6 in a wallet.", tint: "#E9C22E" },
  { key: "fees", icon: Receipt, title: "Transaction fees", short: "The fee asset for X6 apps", dest: "X6 network", destNote: "Validates and records", outcome: "Fee shown before you sign", detail: "Planned as the fee asset across X6 applications, so using the network itself creates steady demand.", demand: "Usage, not hype, drives the need for X6.", tint: "#F2772F" },
  { key: "access", icon: KeyRound, title: "Platform access", short: "Unlock premium tools", dest: "AI analytics Pro", destNote: "Premium insights", outcome: "Advanced tools unlocked", detail: "Holding or spending X6 opens premium features such as deeper AI analytics. Thresholds will be published with the product.", demand: "Access is tied to holding, not just buying once.", tint: "#3FB874" },
  { key: "participate", icon: ServerCog, title: "Network participation", short: "Help run ecosystem services", dest: "Ecosystem service", destNote: "Operated by the community", outcome: "You help keep it running", detail: "Take part in programmes that secure or operate services, where the final design allows it.", demand: "Participants commit X6 to take part.", tint: "#C564C4" },
  { key: "govern", icon: Vote, title: "Governance", short: "Propose and vote", dest: "Community proposal", destNote: "Grants, features, priorities", outcome: "Your vote is counted", detail: "Voting weight comes from X6 held, so the people who use the ecosystem decide where it goes.", demand: "Influence requires holding X6.", tint: "#E9C22E" },
  { key: "build", icon: Code2, title: "Developer incentives", short: "Grants and bounties for builders", dest: "Grants programme", destNote: "Funded from ecosystem allocation", inbound: true, outcome: "Builders are paid in X6", detail: "Independent developers earn X6 for shipping integrations, tools and fixes that extend the ecosystem.", demand: "More builders, more reasons to use X6.", tint: "#F2772F" },
  { key: "integrate", icon: Blocks, title: "Application integrations", short: "Partner apps accept X6", dest: "Partner app", destNote: "Integrated via the SDK", outcome: "“Pay with X6” anywhere", detail: "Standard interfaces and an SDK let partner apps add X6 checkout and balances in a few lines.", demand: "Each integration adds a place to spend X6.", tint: "#3FB874" },
  { key: "reward", icon: Gift, title: "Participation rewards", short: "Recognition for real contribution", dest: "Ecosystem", destNote: "Where legally appropriate", inbound: true, outcome: "Contribution rewarded", detail: "Rewards for genuine contribution, never for simply holding, and only where legal and technically appropriate in each region.", demand: "Rewards circulate X6 to active members.", tint: "#C564C4" },
];

const CYCLE_MS = 5200;

export default function Utility() {
  const [sel, setSel] = useState(0);
  const [auto, setAuto] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Cycle through uses while the stage is on screen, until the reader picks one.
  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.4 });
    if (stageRef.current) io.observe(stageRef.current);
    const id = window.setInterval(() => {
      if (visible && !document.hidden) setSel((s) => (s + 1) % USES.length);
    }, CYCLE_MS);
    return () => { window.clearInterval(id); io.disconnect(); };
  }, [auto]);

  const pick = (i: number) => { setAuto(false); setSel(i); };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (sel + d + USES.length) % USES.length;
    pick(n);
    tabs.current[n]?.focus();
  };

  const u = USES[sel];

  return (
    <section id="utility" className="sec sec--cream" aria-labelledby="utility-title">
      <div className="head">
        <div>
          <Eyebrow n="07">Token Utility</Eyebrow>
          <h2 id="utility-title" className="h2">One token. <em>Eight jobs to do.</em></h2>
        </div>
        <div className="prose">
          <p className="sub" style={{ marginTop: 0, marginBottom: 18 }}>A token earns its place by being useful. Pick a use to see where X6 goes and what you get back.</p>
          <p>Every use below is planned and will launch progressively. Each one will be marked live only when it actually is.</p>
        </div>
      </div>

      <div className="ut">
        <div className="ut-list" role="tablist" aria-label="Uses of the X6 token" aria-orientation="vertical" onKeyDown={onKey}>
          {USES.map((x, i) => {
            const I = x.icon;
            return (
              <button
                key={x.key}
                ref={(el) => { tabs.current[i] = el; }}
                type="button"
                role="tab"
                id={`ut-${x.key}`}
                aria-selected={sel === i}
                aria-controls="ut-stage"
                tabIndex={sel === i ? 0 : -1}
                className="ut-tab"
                style={{ ["--tint" as string]: x.tint }}
                onClick={() => pick(i)}
              >
                <span className="ut-ico"><I size={18} strokeWidth={1.7} aria-hidden="true" /></span>
                <span className="ut-txt"><b>{x.title}</b><small>{x.short}</small></span>
                {sel === i && auto && <span className="ut-timer" aria-hidden="true" key={`t-${sel}`} />}
              </button>
            );
          })}
        </div>

        <div
          ref={stageRef}
          id="ut-stage"
          role="tabpanel"
          aria-labelledby={`ut-${u.key}`}
          className="ut-stage"
          style={{ ["--tint" as string]: u.tint }}
        >
          <div className="ut-grid" aria-hidden="true" />
          <UtilityScene key={u.key} id={u.key} />

          <div className="ut-out" key={`o-${u.key}`}>
            <div className="ut-out-head">
              <BadgeCheck size={18} aria-hidden="true" />
              <b>{u.outcome}</b>
              <span className="chip chip--concept" style={{ color: "rgba(244,241,234,.7)" }}>Planned</span>
            </div>
            <p>{u.detail}</p>
            <p className="ut-demand"><span>Why it matters for demand</span>{u.demand}</p>
          </div>
        </div>
      </div>

      <div className="demand">
        <Reveal>
          <span className="kicker" style={{ color: "rgba(244,241,234,.5)" }}>How utility relates to demand</span>
          <h3 className="h3" style={{ marginTop: 12, color: "#f4f1ea" }}>Usage creates reasons to hold the token.</h3>
          <ul>
            <li><b>01</b>When applications charge fees in X6, people who use them need X6.</li>
            <li><b>02</b>When governance requires X6, people who care about decisions hold it.</li>
            <li><b>03</b>When builders are paid in X6, the ecosystem grows its own economy.</li>
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <span className="kicker">What utility does not mean</span>
          <h3 className="h3" style={{ marginTop: 12 }}>Utility is not a price guarantee.</h3>
          <ul>
            <li><b>×</b>Demand from utility can be outweighed by supply, market conditions or regulation.</li>
            <li><b>×</b>Planned features may change, be delayed or not launch at all.</li>
            <li><b>×</b>Nothing on this site is a promise that X6 will increase in value.</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
