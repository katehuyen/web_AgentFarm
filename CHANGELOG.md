# Changelog

All notable changes to agentfarm.space. The site follows [semantic versioning](https://semver.org).

## 0.5.0 · 2026-10-11

The page is now read in nine chapters, one per district of the board, and every chapter shows its part of the farm working.

- Chapter openers: each district of the board opens its chapter with its numeral, name and tiles. Click a tile to read it; "See it" goes to the part of the chapter that shows it, and a demo that can show the tile switches to it. The side index lists the chapters.
- New chapter III, Beyond code: the Studio page rebuilt. A production makes a short film, "The last keeper": a vision model fails the first storm take and it is made again with the critique, Triage keeps what passed, Assemble lines the scenes up for a Premiere sequence, and the player beside the page plays the film. The film is drawn on a canvas, not a video file.
- New chapter IV, Recipes and triggers: the Tasks page rebuilt (plan, runs, "tell the farm what to do, in words"), and a file landing in a watched folder that Gatekeeper checks before a recipe runs.
- New chapter VI, Never forgets: the Sessions page, one session's turns, a turn kept for the wiki, the compile that writes a wiki page, and the vault in Obsidian with its graph.
- New chapter VII, Any brain: the Engines page with a test turn, routes that plug other models into Claude Code and OpenCode (a route made from a template, saved and tested), route health, the free-model radar, accounts with their policies, and the secret vault.
- New chapter VIII, Just ask: a chat in which an agent sets the farm up over the bridge, one command at a time: a weekly video recipe and its schedule, a session picked up by its id, a new route, an agent packed for another machine.
- Chapter II, Any project: the Projects page now lists a documentary, a thesis and a campaign next to the app, with their own backlogs, and has the Track tab: which session and which turn worked each item, and what an agent tried that did not work.
- Section More is gone: its ten tones are under Never waits, its engines card became chapter VII, its platform card the bridge chat, and its figures are under the board.
- Copy: the fleet band says "nothing is sent to us" (engines talk to their own providers, so "nothing leaves your machine" was not exact); the hero says code is one kind of work; the bridge counts are recounted from the extension's source.
- The extension's repository is closing, so the page no longer links to it or calls the source public. The call to action goes to the extension's Marketplace listing; the footer links there too.
- Sections renumbered 01–16.

## 0.4.0 · 2026-10-11

The page now shows everything the farm does, not only the relay.

- New section 03 The whole farm: 63 capabilities as tiles in nine districts (Never stops, Any project, Beyond code, Recipes and triggers, Works as a team, Never forgets, Any brain, Just ask, Yours alone) and a card of the figures under them. Click a tile and the desk below reads it out; a few tile figures follow the live relay, accounts and backlog.
- Five stories play across the board, one step at a time, with a line following the path: a long video landing in a watched folder, a weekend chain, a thesis chapter, continuing another engine's session by its id, and a recipe set up from one sentence. On phones the tiles become chips and the desk shows the path so far.
- One list for every capability (`src/data/features.js`), with where each line was checked; the /features and /pricing pages planned next will read the same list.
- Sections renumbered 01–12; files renamed to match.

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
