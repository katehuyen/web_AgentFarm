# Changelog

All notable changes to agentfarm.space. The site follows [semantic versioning](https://semver.org).

## 0.3.0 · 2026-10-11

The page now says where the work comes from: the project backlog.

- New section 04 Backlog: the Projects page, Backlog tab, rebuilt with demo data (project tabs, capture box, area codes, Next up with "agents take 5", families, sizes, `#byAI` / `#byREQ`, ⛔ waits on). A thought is captured and filed while you watch, and the item the relay's live leg is working closes when that leg finishes it.
- Section 05 (was Days) now shows the chain across three days and four nights, not three nights: nights are shaded and the legs run through them, a band above the legs names the backlog item each leg worked, and the backlog beside the strip ticks off as it plays.
- One backlog for the whole page (`src/data/backlog.js`, `state.js`): the hero, the console card and the Backlog section all work the same queue.
- Copy: the hero, the fleet band, the closing line and a new first answer ("Where does the work come from?") speak of the backlog and of day and night, not of nights alone.
- Sections renumbered 01–11; files renamed to match.

## 0.2.0 · 2026-10-11

The site can now be opened and uploaded without any tools.

- The build writes a plain site: `index.html` with relative paths, `assets/site.css`, one plain script `assets/site.js`, fonts and sounds under `assets/`. It opens from disk with a double-click and uploads to Hostinger as it is.
- Branches: `main` carries only the finished site, `source` carries the code; `npm run deploy` rebuilds and updates `main`.
- All page scripts now start from one entry, `src/scripts/main.js`; components hold markup only.

## 0.1.0 · 2026-10-11

First version of the landing page, combining the three v2 prototypes in the agreed order.

- Relay hero (from prototype v2.3), fleet wall (v2.2) and exploded console (v2.1), sharing one demo farm, so the leg, accounts, cost and running version agree across the page.
- Days and the rules of the relay (v2.3), with the relay defaults read from the extension's `package.json`.
- New: Never waits (question card with an auto-answer countdown, a tool permission, the Now page on a phone, sound events with an opt-in sound switch).
- New: Together (a mission played round by round, and the Missions page rebuilt).
- New: More (the extension's ten sound events with their real tones, the five engines with a demo test, project tracks, bridge namespaces, settings sections, the density wall).
- New: Local (nothing goes to us), the proof figures, straight answers and the closing band.
- Astro static build, self-hosted fonts, side index, reduced-motion support, every section paused while off screen.
