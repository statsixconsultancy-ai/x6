/**
 * Six sample card transactions on the belt, and what the X6 intelligence layer
 * would make of each: a plain-language explanation, the checks it ran, a risk
 * verdict and a suggestion. All of it is illustrative, no real cards or users.
 */
export type Verdict = "low" | "medium" | "high";

export interface Scenario {
  id: string;
  /** Card finish, see .cc--<finish> in intelligence.css */
  finish: "obsidian" | "copper" | "pearl" | "sage" | "lilac" | "sand";
  last4: string;
  holder: string;
  expiry: string;
  kind: string;
  title: string;
  tx: string;
  plain: string;
  checks: [string, boolean][];
  verdict: Verdict;
  advice: string;
}

export const SCENARIOS: Scenario[] = [
  {
    id: "cross-border",
    finish: "obsidian",
    last4: "4417",
    holder: "A. RAO",
    expiry: "11/29",
    kind: "Debit",
    title: "Cross-border payment",
    tx: "Send 120 X6 → 0x7a3f…e91c (Lagos)",
    plain: "You're sending 120 X6 to a wallet you've paid twice before. The network fee is shown before you sign and the transfer settles in one confirmation.",
    checks: [["Address seen before", true], ["Fee shown up front", true], ["Network matches", true]],
    verdict: "low",
    advice: "Safe to confirm.",
  },
  {
    id: "phishing",
    finish: "copper",
    last4: "0932",
    holder: "M. OKAFOR",
    expiry: "04/28",
    kind: "Credit",
    title: "Token approval request",
    tx: "approve(spender: 0x91c0…04aa, amount: UNLIMITED)",
    plain: "This site is asking for permission to spend every token of this kind in your wallet, forever. The contract was deployed two days ago and isn't verified.",
    checks: [["Contract verified", false], ["Spending limit set", false], ["Site matches contract", false]],
    verdict: "high",
    advice: "Reject. If you need the app, approve only the exact amount.",
  },
  {
    id: "fee-spike",
    finish: "pearl",
    last4: "7720",
    holder: "L. FERREIRA",
    expiry: "08/30",
    kind: "Debit",
    title: "Network fee spike",
    tx: "Swap 50 X6 → stable · fee now 6× usual",
    plain: "The network is congested, so this swap costs about six times more than it did this morning. Nothing is wrong with the transaction itself.",
    checks: [["Recipient verified", true], ["Slippage within limit", true], ["Fee within normal range", false]],
    verdict: "medium",
    advice: "Wait. Fees usually fall back within the hour.",
  },
  {
    id: "subscription",
    finish: "sage",
    last4: "5581",
    holder: "J. MÜLLER",
    expiry: "02/29",
    kind: "Virtual",
    title: "Recurring payment found",
    tx: "Monthly pull · 9.99 X6 · merchant #A41",
    plain: "The same merchant has charged this card on the 3rd of every month since June. You can pause or cancel it from the wallet in one tap.",
    checks: [["Merchant identified", true], ["Amount unchanged", true], ["You approved it", true]],
    verdict: "low",
    advice: "No action needed. A reminder set before the next charge.",
  },
  {
    id: "new-device",
    finish: "lilac",
    last4: "3306",
    holder: "S. TAN",
    expiry: "06/31",
    kind: "Credit",
    title: "New device signature",
    tx: "Sign-in + transfer from an unrecognised device",
    plain: "A signature request came from a device and region this wallet has never used, two minutes after a password reset.",
    checks: [["Known device", false], ["Usual region", false], ["2-step confirmed", true]],
    verdict: "high",
    advice: "Hold the transfer and confirm it's you on your usual device.",
  },
  {
    id: "portfolio",
    finish: "sand",
    last4: "8814",
    holder: "K. ADEYEMI",
    expiry: "10/30",
    kind: "Debit",
    title: "Portfolio across networks",
    tx: "Balances read from 4 networks · 11 assets",
    plain: "Your holdings are spread over four networks. Two small balances are stuck on a network you haven't used in a year and cost more to move than they're worth.",
    checks: [["All balances found", true], ["Prices sourced", true], ["Dust balances flagged", true]],
    verdict: "low",
    advice: "Consider consolidating next time fees are low.",
  },
];

export const VERDICT_LABEL: Record<Verdict, string> = { low: "Low risk", medium: "Medium risk", high: "High risk" };
