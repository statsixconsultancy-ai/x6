# X6 — AI × Crypto × Global Connectivity

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lucide. Built section by section.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Sections (15)

01 Hero · 02 Vision · 03 Problem · 04 Solution · 05 Cryptocurrency · 06 Blockchain · 07 Token utility ·
08 AI intelligence (Distill belt) · 09 Global connectivity · 10 Ecosystem · 11 Security (+ contract checker) ·
12 Tokenomics (interactive chart) · 13 Growth · 14 Roadmap · 15 Community, FAQ, final CTA, footer.

Hero and section 08 follow the approved Vela and Distill references; new sections live in `components/sections/`.
3D icons and the metallic coin are rendered by `tools/icon-lab` and live in `public/icons/`.

## Placeholders to replace before launch

All brand, token, tokenomics, roadmap, ecosystem and security facts live in `lib/site.ts`. Anything `null` renders as a labelled placeholder; allocation percentages must total 100 or the chart refuses to go proportional. Project/coin name is the working name **X6**; network and supply read
"To be announced" / "Published at launch" on purpose — no figures are invented.

Nav links and CTAs point at section anchors (`#vision`, `#ecosystem`, `#token`, `#roadmap`, `#community`). They come to life
as each section is added.

## Notes

- Hero icons load from the reference CDN and are hue-shifted with CSS filters per word. If they fail to load, a line icon
  in the same tint is shown instead.
- Both sections honour `prefers-reduced-motion` (hero holds on "AI", belt stands still but can still be dragged).
- The AI belt animates only while it is on screen.

## Component library

- `components/ui/metrics-board.tsx` — isometric dashboard (react-isokit), used in 13 Growth with labelled sample data.
- `components/ui/stats-band.tsx` — count-up stats with visuals, used in 09 Global with project facts only.
- `components/ui/spotlight-bento.tsx` — spotlight/tilt bento grid, used in 03 Problem.
- `components/kokonutui/metric-card.tsx` — Kokonut UI metric card (`npx shadcn@latest add https://kokonutui.com/r/metric-card.json`).

Demos of all of them: `/components` (not linked from the site).

## Run locally

Double-click `start-site.bat` (Windows), or `npm install` then `npm run dev`, and open http://localhost:3000.

## Put it online with Vercel (no need to run anything on your computer)

Once the site is on Vercel it stays online by itself. You never have to start it again.

1. Put this folder in a GitHub repository (GitHub Desktop: File > Add local repository > Publish).
2. Go to vercel.com, sign in with GitHub, click **Add New > Project** and pick that repository.
3. Leave every setting as it is (Vercel detects Next.js) and click **Deploy**.

After that, every change you push to GitHub goes live automatically in about a minute.

`start-site.bat` is only for previewing on your own computer before you push.
