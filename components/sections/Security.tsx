"use client";

import { useState } from "react";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { security, token } from "@/lib/site";
import { Eyebrow, Reveal } from "./ui";

export default function Security() {
  const [out, setOut] = useState<{ tone: "info" | "good" | "bad"; text: string }>({
    tone: "info",
    text: "Paste any contract address that claims to be X6 to check it against the official record.",
  });

  const check = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = String(new FormData(e.currentTarget).get("addr") || "").trim();
    if (!v) return setOut({ tone: "info", text: "Enter an address to check." });
    if (!token.contractAddress) {
      return setOut({ tone: "bad", text: "No official X6 contract has been published yet. Any token presented as X6 today is not ours. Do not buy it or connect your wallet to it." });
    }
    const match = v.toLowerCase() === token.contractAddress.toLowerCase();
    setOut(match
      ? { tone: "good", text: `Match. This is the official X6 contract on ${token.network ?? "the announced network"}. Always confirm the network as well as the address.` }
      : { tone: "bad", text: "No match. This address is not the official X6 contract. Do not send funds or approve transactions with it." });
  };

  return (
    <section id="security" className="sec sec--grey" aria-labelledby="sec-title">
      <div className="head">
        <div>
          <Eyebrow n="11">Security, Trust &amp; Transparency</Eyebrow>
          <h2 id="sec-title" className="h2">Trust is earned <em>in public.</em></h2>
        </div>
        <div className="prose">
          <p className="sub" style={{ marginTop: 0, marginBottom: 18 }}>No cryptocurrency is risk-free, and we won&rsquo;t pretend X6 is. What we can promise is to show our work.</p>
          <p>This section only displays verified claims. Where something has not happened yet, like an audit, it says so plainly, and the badge changes only when there is a public report to link to.</p>
        </div>
      </div>

      <Reveal className="verify">
        <div>
          <ShieldCheck size={28} aria-hidden="true" style={{ color: "#ff8a3d" }} />
          <h3 className="h3" style={{ marginTop: 14 }}>Verify the official contract</h3>
          <p>Scammers copy names, logos and websites. They cannot copy a contract address. Check any address against the one published here before you buy, swap or approve anything.</p>
        </div>
        <form onSubmit={check} aria-label="Contract verification">
          <label htmlFor="addr">Contract address</label>
          <div className="field">
            <input id="addr" name="addr" placeholder="0x…" autoComplete="off" spellCheck={false} />
            <button type="submit" className="btn btn--hot">Check</button>
          </div>
          <div className="verify-out" data-tone={out.tone} role="status" aria-live="polite">{out.text}</div>
        </form>
      </Reveal>

      <div className="sec-grid">
        {security.map((s, i) => (
          <Reveal key={s.key} className="sec-card" delay={(i % 3) * 80}>
            <div className="top">
              <span className="kicker">{String(i + 1).padStart(2, "0")}</span>
              {s.verified && s.link
                ? <span className="chip chip--live">Verified</span>
                : <span className="chip chip--concept">Planned practice</span>}
            </div>
            <h3 className="h3">{s.title}</h3>
            <p>{s.body}</p>
            {s.verified && s.link && <a href={s.link} target="_blank" rel="noopener noreferrer">View evidence <ArrowUpRight size={13} aria-hidden="true" /></a>}
          </Reveal>
        ))}
      </div>
      <p className="note">Never share your seed phrase or private key. X6 team members will never contact you first about payments, investments or wallet issues.</p>
    </section>
  );
}
