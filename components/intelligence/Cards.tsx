import type { Scenario } from "./modules";

/** A payment card face: chip, contactless mark, masked number, holder, expiry and the X6 mark. */
export function CreditCard({ s }: { s: Scenario }) {
  return (
    <>
      <div className="cc-sheen" aria-hidden="true" />
      <div className="cc-top">
        <div className="cc-brand">
          <b>X6</b>
        </div>
        <span className="cc-kind">{s.kind}</span>
      </div>

      <div className="cc-mid">
        <svg className="cc-chip" viewBox="0 0 50 38" aria-hidden="true">
          <defs>
            <linearGradient id={`chip-${s.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f6dc9a" />
              <stop offset=".5" stopColor="#d4a94e" />
              <stop offset="1" stopColor="#f2d58a" />
            </linearGradient>
          </defs>
          <rect x="1" y="1" width="48" height="36" rx="7" fill={`url(#chip-${s.id})`} stroke="rgba(0,0,0,.25)" />
          <path d="M1 13h14M1 25h14M35 13h14M35 25h14M15 1v36M35 1v36M15 19h20" stroke="rgba(80,55,10,.45)" strokeWidth="1.2" fill="none" />
        </svg>
        <svg className="cc-nfc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M8.5 7.5a6 6 0 0 1 0 9" />
          <path d="M12 5a9.5 9.5 0 0 1 0 14" />
          <path d="M15.5 2.5a13 13 0 0 1 0 19" />
        </svg>
      </div>

      <div className="cc-number" aria-label={`Card ending ${s.last4}`}>
        <span>••••</span><span>••••</span><span>••••</span><span>{s.last4}</span>
      </div>

      <div className="cc-bottom">
        <div>
          <small>Card holder</small>
          <b>{s.holder}</b>
        </div>
        <div>
          <small>Expires</small>
          <b>{s.expiry}</b>
        </div>
        <div className="cc-mark" aria-hidden="true">
          <i /><i />
          <span>X6 PAY</span>
        </div>
      </div>

      <div className="cc-tx">
        <span className="cc-tx-k">{s.title}</span>
        <span className="cc-tx-v">{s.tx}</span>
      </div>
    </>
  );
}
