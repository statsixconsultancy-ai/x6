/**
 * Single source of truth for brand, token and project facts.
 *
 * RULE: anything set to `null` is unpublished and renders as a clearly labelled
 * placeholder ("To be published"). Replace with verified project data only -
 * never with estimates. Percentages in `allocation` must total exactly 100.
 */

export type Status = "live" | "development" | "concept";

export const site = {
  name: "X6",
  tagline: "The Nexus Point of Cryptocurrency, Artificial Intelligence and Global Connectivity.",
  description:
    "A connected cryptocurrency ecosystem where blockchain infrastructure, intelligent technology and global digital participation converge.",
};

export const social = {
  /** "Follow the launch" button target. Change it here only. */
  instagram: "https://www.instagram.com/stat6ai",
};

export const token = {
  name: "X6 Coins" as string | null,
  ticker: null as string | null,
  network: null as string | null,
  standard: null as string | null,
  contractAddress: null as string | null,
  totalSupply: null as string | null,
  circulatingSupply: null as string | null,
  decimals: null as number | null,
  burnMechanism: null as string | null,
  acquisition: [] as { label: string; href: string }[], // official venues only, once live
};

/** Token allocation. Leave `percent` null until the published tokenomics are final. */
export const allocation: { key: string; label: string; percent: number | null; vesting: string | null; purpose: string }[] = [
  { key: "public", label: "Public distribution", percent: null, vesting: null, purpose: "Tokens made available to the community through official, disclosed distribution events." },
  { key: "ecosystem", label: "Ecosystem development", percent: null, vesting: null, purpose: "Funds products, integrations and infrastructure that give the token real utility." },
  { key: "liquidity", label: "Liquidity", percent: null, vesting: null, purpose: "Supports orderly markets on venues the project officially announces." },
  { key: "community", label: "Community & developer incentives", percent: null, vesting: null, purpose: "Grants, builder programmes and participation rewards where legally appropriate." },
  { key: "team", label: "Team & contributors", percent: null, vesting: null, purpose: "Aligns the people building the ecosystem with its long-term success; expected to vest over time." },
  { key: "treasury", label: "Treasury & reserves", percent: null, vesting: null, purpose: "Covers audits, security, operations and unforeseen needs, under transparent governance." },
];

export const roadmap: { phase: string; title: string; status: "current" | "planned" | "complete"; target: string | null; summary: string; milestones: string[] }[] = [
  {
    phase: "01", title: "Foundation", status: "current", target: null,
    summary: "Defining what X6 is, how it works and how it will be governed, before a single token exists.",
    milestones: ["Brand and ecosystem identity", "Blockchain architecture selection", "Token design and economic model", "Whitepaper and technical documentation", "Legal and compliance review"],
  },
  {
    phase: "02", title: "Infrastructure", status: "planned", target: null,
    summary: "Building and hardening the contracts and wallets the ecosystem will depend on.",
    milestones: ["Smart contract development", "Independent security audit", "Wallet integrations", "Testnet deployment and public testing", "Ecosystem foundation and developer docs"],
  },
  {
    phase: "03", title: "Ecosystem Launch", status: "planned", target: null,
    summary: "Bringing the token and first applications to the public through official channels.",
    milestones: ["Token generation event", "Official contract publication and verification", "First ecosystem applications", "Community programmes", "Transparency dashboard"],
  },
  {
    phase: "04", title: "AI Integration", status: "planned", target: null,
    summary: "Adding the intelligence layer that makes the ecosystem easier to understand and safer to use.",
    milestones: ["AI-assisted on-chain analytics", "Anomaly and fraud signal monitoring", "Intelligent user assistance", "Automation tools for builders"],
  },
  {
    phase: "05", title: "Global Expansion", status: "planned", target: null,
    summary: "Widening access across regions, languages and integrations, at the pace regulation allows.",
    milestones: ["Strategic integrations", "Localised community hubs", "Cross-border payment flows", "International developer programmes"],
  },
];

export const ecosystem: { key: string; title: string; status: Status; purpose: string; functionality: string[]; value: string; token: string }[] = [
  {
    key: "wallet", title: "Digital wallet", status: "concept",
    purpose: "A self-custodial home for X6 and other supported assets, designed so newcomers can hold crypto without fear of making an irreversible mistake.",
    functionality: ["Self-custody with clear key back-up flows", "Plain-language transaction previews", "Address checks before every send"],
    value: "Removes the most common reason people lose funds: confusing interfaces at the moment of signing.",
    token: "The natural place to hold, send and use X6 across the ecosystem.",
  },
  {
    key: "infrastructure", title: "Cryptocurrency infrastructure", status: "concept",
    purpose: "The smart contracts, node access and indexing that every other X6 product is built on.",
    functionality: ["Token and utility contracts", "Reliable read and write access to the network", "Public, verifiable contract records"],
    value: "A dependable base layer means products can be added without re-inventing the plumbing.",
    token: "Defines the token itself and the rules that govern it.",
  },
  {
    key: "ai", title: "AI-powered applications", status: "concept",
    purpose: "Tools that turn raw blockchain activity into explanations, alerts and automations people can act on.",
    functionality: ["Natural-language insights on on-chain activity", "Risk and anomaly signals", "Assistants that explain before you sign"],
    value: "Makes a technical system legible to everyone, not only specialists.",
    token: "Planned to use X6 for access to advanced features, subject to final design.",
  },
  {
    key: "integrations", title: "Blockchain integrations", status: "concept",
    purpose: "Connections to other networks and protocols so value and data are not trapped in one place.",
    functionality: ["Bridges and cross-chain messaging via audited partners", "Standard token interfaces", "Integration guides for partner apps"],
    value: "Interoperability turns isolated tools into one connected economy.",
    token: "Extends where X6 can be used beyond its home network.",
  },
  {
    key: "payments", title: "Digital payment infrastructure", status: "concept",
    purpose: "Rails for sending and receiving value across borders quickly, with transparent costs.",
    functionality: ["Quote, confirm, settle, receipt flow", "Merchant and invoice tools", "Exportable transaction records"],
    value: "Brings the speed of blockchain settlement to everyday payments.",
    token: "Planned as a settlement and fee asset inside X6 payment flows.",
  },
  {
    key: "developers", title: "Developer ecosystem", status: "concept",
    purpose: "SDKs, APIs and documentation that let independent builders create on top of X6.",
    functionality: ["TypeScript SDK and REST API", "Webhooks for on-chain events", "Sandbox and testnet tooling"],
    value: "An ecosystem grows fastest when other people can build on it.",
    token: "Developer incentives and grants are planned to be denominated in X6.",
  },
  {
    key: "community", title: "Community network", status: "concept",
    purpose: "Spaces where holders, builders and newcomers learn, propose and decide together.",
    functionality: ["Proposals and discussion", "On-chain voting where applicable", "AI-drafted, human-reviewed summaries"],
    value: "Gives the people who use the ecosystem a real voice in how it evolves.",
    token: "Planned to carry governance weight in community decisions.",
  },
  {
    key: "connectivity", title: "Global connectivity tools", status: "concept",
    purpose: "Localisation, identity and messaging layers that make participation possible across regions and languages.",
    functionality: ["Multi-language interfaces", "Portable on-chain identity", "Region-aware compliance flows"],
    value: "Lowers the barriers that keep most of the world out of digital finance.",
    token: "Connects participants everywhere through one shared asset.",
  },
];

/** Security claims render only when `verified` is true and a `link` is present. */
export const security: { key: string; title: string; body: string; verified: boolean; link: string | null }[] = [
  { key: "contracts", title: "Smart contract security", body: "Contracts will be written to minimise privileged roles, use well-reviewed standard libraries and be tested against known attack patterns before deployment.", verified: false, link: null },
  { key: "audits", title: "Independent audits", body: "No audit has been published yet. Before launch, contracts are planned to be reviewed by an independent security firm, and the full report will be linked here, not summarised.", verified: false, link: null },
  { key: "wallet", title: "Wallet security", body: "Wallet products are designed around self-custody, transaction simulation and address checks, so users can see what a transaction will do before they sign it.", verified: false, link: null },
  { key: "keys", title: "Private-key protection", body: "X6 will never ask for your seed phrase or private key. Anyone who does is not us. Keys stay on your device; we cannot recover them for you.", verified: false, link: null },
  { key: "verification", title: "Transaction verification", body: "Every transaction is validated by the network's consensus rules and recorded publicly. Anyone can independently verify it on a block explorer.", verified: false, link: null },
  { key: "monitoring", title: "Network monitoring", body: "Planned AI-assisted monitoring looks for unusual contract activity and known scam patterns, so issues can be flagged and communicated quickly.", verified: false, link: null },
  { key: "transparency", title: "Transparency practices", body: "Allocations, treasury movements and roadmap progress are intended to be published openly, with on-chain addresses anyone can watch.", verified: false, link: null },
  { key: "custody", title: "Custody arrangements", body: "Users hold their own assets. Any project treasury is planned to sit in multi-signature wallets with published signer policies.", verified: false, link: null },
  { key: "risk", title: "Risk management", body: "Crypto assets are volatile and can lose value. We publish risks plainly, avoid promises of returns and encourage people to only commit what they can afford to lose.", verified: false, link: null },
];

export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Vision", href: "#vision" },
  { label: "Technology", href: "#blockchain" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Token", href: "#token" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Community", href: "#community" },
];

export const PLACEHOLDER = "To be published";
export const show = (v: string | number | null | undefined) => (v === null || v === undefined || v === "" ? null : String(v));
