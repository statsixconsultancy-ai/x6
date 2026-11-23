"use client";

import { useState } from "react";
import BridgeLosses from "./BridgeLosses";
import { Eyebrow, Reveal } from "./ui";

const STAGES = [
  { k: "01", t: "Signed", b: "You approve a transaction in your wallet. Your private key signs it as proof it came from you." },
  { k: "02", t: "Broadcast", b: "The signed transaction is sent to the network and waits with others to be included." },
  { k: "03", t: "Validated", b: "Independent nodes check the signature, the balance and the contract rules." },
  { k: "04", t: "Recorded", b: "Valid transactions are grouped into a block that links to the one before it." },
  { k: "05", t: "Final", b: "Once the network agrees, the record is effectively permanent and publicly visible." },
];

const TOPICS = [
  { icon: "/icons/bc-architecture.webp", glow: "#C564C4", t: "Blockchain architecture", plain: "A blockchain is a shared record book copied across many computers. Each new page (a block) references the page before it, so the history cannot be quietly rewritten.", tech: "Blocks contain ordered transactions plus a cryptographic hash of the previous block. X6 is designed to run as a token and contract suite on an established, battle-tested network rather than a brand-new chain; the specific network will be confirmed in the technical documentation." },
  { icon: "/icons/bc-decentral.webp", glow: "#3FB874", t: "Decentralised infrastructure", plain: "No single company keeps the record. Thousands of independent participants hold copies, so there is no central switch to turn off and no single point to corrupt.", tech: "Validator or miner sets are distributed across operators and jurisdictions. The degree of decentralisation depends on the chosen network and will be documented alongside it." },
  { icon: "/icons/bc-verify.webp", glow: "#3FB874", t: "Transaction verification", plain: "Before a payment counts, the network checks that it was really signed by the owner and that the funds exist. Fake or double-spent transactions are rejected automatically.", tech: "Nodes verify ECDSA/EdDSA signatures, nonces and state transitions against protocol rules. Invalid transactions never enter a block." },
  { icon: "/icons/bc-contracts.webp", glow: "#C564C4", t: "Smart contracts", plain: "Smart contracts are programs that live on the blockchain and run exactly as written. They define how X6 is created, moved and used, and anyone can read the rules.", tech: "X6 contracts are planned to use audited standard implementations for the token interface, minimise admin privileges, and be verified on a public explorer so source code matches deployed bytecode." },
  { icon: "/icons/bc-consensus.webp", glow: "#E9C22E", t: "Consensus mechanisms", plain: "Consensus is how thousands of computers agree on one version of the truth without trusting each other. It is what makes the shared record reliable.", tech: "Common models include Proof-of-Stake (validators lock capital as collateral) and Proof-of-Work (miners spend computation). X6 inherits the consensus of its host network; the choice will be published with the network decision." },
  { icon: "/icons/bc-security.webp", glow: "#F2772F", t: "Network security", plain: "Attacking a large blockchain would require controlling a huge share of its participants or capital, usually far more expensive than any possible gain.", tech: "Security is a function of economic stake or hash power, client diversity and finality guarantees. Contract-level security is addressed separately through audits and monitoring (see Security)." },
  { icon: "/icons/bc-transparency.webp", glow: "#E9C22E", t: "Transaction transparency", plain: "Every X6 transaction will be visible on a public explorer. You don't have to take anyone's word for balances, supply or treasury movements, you can look.", tech: "Public ledgers expose addresses, amounts and timestamps. Treasury and allocation addresses are planned to be published so anyone can monitor them." },
  { icon: "/icons/bc-interop.webp", glow: "#C564C4", t: "Interoperability", plain: "Value shouldn't be trapped on one network. Interoperability lets X6 and the apps built on it connect to other blockchains and the wider crypto economy.", tech: "Planned through standard token interfaces and audited cross-chain messaging or bridge partners. Bridges add risk, so any integration will be disclosed with its trust assumptions." },
  { icon: "/icons/bc-scale.webp", glow: "#3FB874", t: "Scalability", plain: "A currency for everyday use needs to be fast and affordable even when many people use it at once.", tech: "Approaches include high-throughput base layers and Layer-2 rollups that batch transactions and settle to a secure base chain. Throughput and fee figures will only be published once measured." },
];

const BLOCKS = Array.from({ length: 12 }, (_, i) => i);

export default function Blockchain() {
  const [tab, setTab] = useState(0);
  const cur = TOPICS[tab];
  return (
    <section id="blockchain" className="sec sec--grey" aria-labelledby="chain-title">
      <div className="head">
        <div>
          <Eyebrow n="06">Blockchain Technology</Eyebrow>
          <h2 id="chain-title" className="h2">A ledger everyone can check. <em>No one can rewrite.</em></h2>
        </div>
        <div>
          <p className="sub" style={{ marginTop: 0 }}>Blockchain is what turns X6 from a number in a database into an asset you truly own. Here is how it works, in plain words and in technical detail.</p>
        </div>
      </div>

      <div className="chain" aria-hidden="true">
        <div className="chain-track">
          {[...BLOCKS, ...BLOCKS].map((b, i) => (
            <div key={i} className="blk">
              <i>block #{String(1000 + (b % 12)).padStart(4, "0")}</i><br />prev: 0x{((b * 2654435761) >>> 0).toString(16).slice(0, 6)}…<br />txs: ✓ verified
            </div>
          ))}
        </div>
      </div>

      <div className="txflow" role="list" aria-label="Life of a transaction">
        {STAGES.map((s, i) => (
          <Reveal key={s.k} className="tx-stage" role="listitem" delay={i * 80} style={{ ["--i" as string]: i }}>
            <span className="pulse" aria-hidden="true" />
            <span className="k">{s.k}</span>
            <b>{s.t}</b>
            <p>{s.b}</p>
          </Reveal>
        ))}
      </div>

      <div className="tech">
        <div className="tech-tabs" role="tablist" aria-label="Blockchain topics">
          {TOPICS.map((t, i) => (
            <button key={t.t} type="button" role="tab" id={`tt-${i}`} aria-controls="tech-panel" aria-selected={tab === i} className="tech-tab" onClick={() => setTab(i)}>
              <span>{String(i + 1).padStart(2, "0")}</span>{t.t}
            </button>
          ))}
        </div>
        <div className="tech-panel" id="tech-panel" role="tabpanel" aria-labelledby={`tt-${tab}`}>
          <div className="tech-text" key={`t${tab}`}>
            <span className="kicker">In plain words</span>
            <h3 className="h3">{cur.t}</h3>
            <p className="tech-plain">{cur.plain}</p>
            <span className="kicker" style={{ marginTop: 28 }}>Under the hood</span>
            <p className="tech-deep">{cur.tech}</p>
          </div>
          <div className="tech-art" style={{ ["--glow" as string]: cur.glow }} aria-hidden="true">
            <span className="tech-ring" />
            <span className="tech-ring tech-ring--2" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={cur.icon} src={cur.icon} alt="" width={440} height={440} />
            <span className="tech-num">{String(tab + 1).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
      <BridgeLosses />
      <p className="note">The host network, consensus model and performance figures for X6 have not been finalised. They will be published in the technical documentation; this page will not state capabilities before they are confirmed.</p>
    </section>
  );
}
