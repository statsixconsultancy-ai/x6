"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { token } from "@/lib/site";
import { Eyebrow, Reveal } from "./ui";

export default function Token() {
  const stage = useRef<HTMLDivElement>(null);
  const tilt = (e: React.PointerEvent) => {
    const el = stage.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${(x * 26).toFixed(1)}deg`);
    el.style.setProperty("--rx", `${(-y * 22).toFixed(1)}deg`);
  };
  const reset = () => { stage.current?.style.setProperty("--ry", "0deg"); stage.current?.style.setProperty("--rx", "0deg"); };
  
  return (
    <section id="token" className="sec sec--dark" aria-labelledby="token-title">
      <div className="token-wrap">
        <div ref={stage} className="coin-stage" onPointerMove={tilt} onPointerLeave={reset}>
          <span className="coin-ring" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/coin-hero.webp" alt="The X6 coin: silver, with a reeded edge and the X6 hexagon mark" width={760} height={760} />
        </div>

        <div>
          <Eyebrow n="05">Cryptocurrency</Eyebrow>
          <h2 id="token-title" className="h2">Meet {token.name}. <em>The asset at the centre.</em></h2>
          <p className="sub">Every product, payment and vote in the ecosystem is designed around one native cryptocurrency.</p>
          <div className="prose" style={{ marginTop: 24 }}>
            <p>X6 is intended to be the unit of value that ties the ecosystem together: the asset people hold, the currency applications settle in, and the key that unlocks participation. Its purpose is utility first: a token with a job to do, not a symbol without one.</p>
          </div>

          <dl className="spec">
            <div className="spec-row"><dt>Coin name</dt><dd><span className="fact">{token.name}</span></dd></div>
            <div className="spec-row"><dt>Purpose</dt><dd>The native settlement and participation asset of the X6 ecosystem.</dd></div>
            <div className="spec-row"><dt>Utility</dt><dd>Payments, network fees, platform access, governance and developer incentives. <a href="#utility" style={{ color: "#ff8a3d" }}>See token utility</a>.</dd></div>
          </dl>

          <Reveal className="warn">
            <b>Protect yourself.</b> X6 Coins has not launched. Only trust a contract address announced through official X6 channels. Any token sold as X6 Coins before then is not ours. We will never DM you first, ask for your seed phrase, or promise returns.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
