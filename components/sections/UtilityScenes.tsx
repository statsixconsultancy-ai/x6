"use client";

import type { CSSProperties, ReactElement } from "react";
import { Check, Code2, Gift, Lock, Plane, ShoppingBag, Gamepad2, Wallet } from "lucide-react";

/**
 * One distinct animated scene per token use. Each scene replays on mount
 * (the parent re-keys it), runs a one-shot story in ~2.4s, then idles.
 * All motion is CSS (transform/opacity) so it stays smooth under load.
 */

const Coin = ({ className = "", style }: { className?: string; style?: CSSProperties }) => <i className={`sc-coin ${className}`} style={style} aria-hidden="true" />;

/* 1, Pay at checkout: phone → terminal → receipt */
function PayScene() {
  return (
    <div className="sc sc-pay">
      <div className="sc-phone">
        <span className="sc-phone-notch" />
        <small>Checkout</small>
        <b>Coffee &amp; pastry</b>
        <span className="sc-btn">Pay with X6</span>
      </div>
      <Coin className="sc-pay-coin" />
      <div className="sc-term">
        <div className="sc-term-screen"><Check size={26} strokeWidth={3} /></div>
        <div className="sc-term-keys">{Array.from({ length: 6 }, (_, i) => <i key={i} />)}</div>
        <div className="sc-receipt"><b>Paid</b><i /><i /><i style={{ width: "50%" }} /></div>
      </div>
    </div>
  );
}

/* 2, Fees: a transaction drops its fee into the next block on a moving chain */
function FeesScene() {
  return (
    <div className="sc sc-fees">
      <div className="sc-tx">
        <span>Send</span>
        <b>Fee shown before you sign</b>
        <span className="sc-tx-fee">fee · X6</span>
      </div>
      <Coin className="sc-fee-coin" />
      <div className="sc-chain">
        <div className="sc-chain-track">
          {Array.from({ length: 12 }, (_, i) => <div key={i} className="sc-blk"><i /><i /><i /></div>)}
        </div>
        <div className="sc-blk sc-blk--new"><i /><i /><i /><Check size={16} strokeWidth={3} /></div>
      </div>
    </div>
  );
}

/* 3, Access: the coin unlocks a premium panel */
function AccessScene() {
  return (
    <div className="sc sc-access">
      <div className="sc-panel">
        <div className="sc-panel-top"><b>AI analytics</b><span>Pro</span></div>
        <div className="sc-bars">{[38, 62, 48, 80, 66, 92, 74].map((h, i) => <i key={i} style={{ height: `${h}%`, ["--i" as string]: i }} />)}</div>
      </div>
      <div className="sc-lock">
        <span className="sc-shackle" />
        <span className="sc-lock-body"><Lock size={18} /></span>
      </div>
      <Coin className="sc-key-coin" />
    </div>
  );
}

/* 4, Participate: your node joins a ring of community nodes */
function ParticipateScene() {
  const N = 8;
  const pts = Array.from({ length: N }, (_, i) => {
    const a = Math.PI / 2 + (i / N) * Math.PI * 2;
    return [50 + Math.cos(a) * 36, 50 + Math.sin(a) * 36] as const;
  });
  return (
    <div className="sc sc-part">
      <svg viewBox="0 0 100 100" className="sc-ring">
        <circle cx="50" cy="50" r="36" className="sc-ring-track" />
        <circle cx="50" cy="50" r="36" className="sc-ring-lit" pathLength={1} />
        {pts.map(([x, y], i) => <line key={i} x1="50" y1="50" x2={x} y2={y} className="sc-spoke" style={{ ["--i" as string]: i }} />)}
        <g className="sc-orbit"><circle cx="50" cy="14" r="1.6" /></g>
        {pts.map(([x, y], i) => <circle key={`n${i}`} cx={x} cy={y} r={i === 0 ? 5.4 : 3.6} className={i === 0 ? "sc-me" : "sc-node"} style={{ ["--i" as string]: i }} />)}
      </svg>
      <div className="sc-core"><Coin /></div>
      <span className="sc-tag">Your node is online</span>
    </div>
  );
}

/* 5, Govern: your vote drops into the ballot and the tally moves */
function GovernScene() {
  return (
    <div className="sc sc-gov">
      <div className="sc-prop">
        <small>Community proposal</small>
        <b>Translate the wallet into 10 languages</b>
        <div className="sc-tally">
          <div><span>For</span><i className="sc-for" /></div>
          <div><span>Against</span><i className="sc-against" /></div>
        </div>
        <span className="sc-voted"><Check size={14} strokeWidth={3} /> Your vote counted</span>
      </div>
      <div className="sc-box">
        <Coin className="sc-vote-coin" />
        <span className="sc-slot" />
        <span className="sc-box-front">VOTE</span>
      </div>
    </div>
  );
}

/* 6, Build: code ships, review passes, the grant flows back to you */
function BuildScene() {
  return (
    <div className="sc sc-build">
      <div className="sc-editor">
        <div className="sc-editor-bar"><i /><i /><i /><span>integration.ts</span></div>
        {[72, 54, 86, 40, 64].map((w, k) => <p key={k} style={{ ["--w" as string]: `${w}%`, ["--i" as string]: k }}><em>{k + 1}</em><span /></p>)}
        <span className="sc-merged"><Code2 size={14} /> Merged</span>
      </div>
      {[0, 1, 2].map((k) => <Coin key={k} className="sc-grant-coin" style={{ ["--i" as string]: k }} />)}
      <div className="sc-you"><Wallet size={18} /><b>You</b><span className="sc-plus">+ grant</span></div>
    </div>
  );
}

/* 7, Integrate: one SDK lights up "Pay with X6" in every partner app */
function IntegrateScene() {
  const apps = [{ I: ShoppingBag, t: "Shop" }, { I: Gamepad2, t: "Games" }, { I: Plane, t: "Travel" }];
  return (
    <div className="sc sc-int">
      <div className="sc-sdk"><Code2 size={16} /> X6 SDK</div>
      <svg className="sc-wires" viewBox="0 0 300 84" preserveAspectRatio="none">
        {[50, 150, 250].map((x, i) => <path key={x} d={`M150 0 C150 42, ${x} 42, ${x} 84`} pathLength={1} style={{ ["--i" as string]: i }} />)}
      </svg>
      <div className="sc-apps">
        {apps.map(({ I, t }, i) => (
          <div key={t} className="sc-app" style={{ ["--i" as string]: i }}>
            <I size={22} />
            <b>{t}</b>
            <span className="sc-paybtn">Pay with X6</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 8, Reward: contribution fills the grid, the gift opens, the coin comes to you */
function RewardScene() {
  return (
    <div className="sc sc-rew">
      <div className="sc-grid">
        {Array.from({ length: 7 * 14 }, (_, i) => {
          const c = i % 14, r = Math.floor(i / 14);
          const on = (c * 7 + r * 3) % 5 !== 0;
          return <i key={i} className={on ? "on" : ""} style={{ ["--d" as string]: `${(c + r) * 32}ms`, ["--o" as string]: 0.35 + (((c * 13 + r * 7) % 10) / 10) * 0.65 }} />;
        })}
        <small>Your contributions</small>
      </div>
      <div className="sc-gift">
        <Coin className="sc-gift-coin" />
        <span className="sc-lid" />
        <span className="sc-giftbox"><Gift size={22} /></span>
      </div>
    </div>
  );
}

const SCENES: Record<string, () => ReactElement> = {
  pay: PayScene,
  fees: FeesScene,
  access: AccessScene,
  participate: ParticipateScene,
  govern: GovernScene,
  build: BuildScene,
  integrate: IntegrateScene,
  reward: RewardScene,
};

export default function UtilityScene({ id }: { id: string }) {
  const S = SCENES[id];
  return S ? <S /> : null;
}
