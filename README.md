# agentfarm.space · source

> **Türkçe not:** Bu dal sitenin kaynak kodu. Yüklenecek bitmiş site `main` dalında; açmak ve Hostinger'a yüklemek için oradaki README'ye bak.

The website of **Agent Farm**, mission control for AI agents in VS Code (publisher Muvusoft, extension id `muvusoft.agent-farm`).

One long landing page, built as a static site with [Astro](https://astro.build). Every screen on it is rebuilt from real screenshots of the extension and runs on demo data. Every number it states comes from the extension's source or a real screen, and `src/data/facts.js` says where.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (Node 22 or newer) |
| `npm run build` | Build the finished site into `dist/`: `astro build`, then `scripts/finish.mjs` |
| `npm run deploy` | Build, then replace the contents of the `main` branch with `dist/` and push it |
| `npm run check` | Astro and TypeScript diagnostics |

To look at a build, open `dist/index.html` straight from disk; no server is needed.

## Branches

- **`source`**: this code. Every change happens here.
- **`main`**: only the finished site (`index.html`, `favicon.svg`, `robots.txt`, `assets/`), written by `npm run deploy`. It is what Hostinger serves, by upload to `public_html` or through Hostinger's Git deployment. Never edit it by hand: the next deploy replaces it.

## The finished site

`scripts/finish.mjs` turns Astro's output into a plain site:

- every path is relative, so `index.html` works from disk and in any folder on any host;
- all scripts are bundled from `src/scripts/main.js` into one plain script, `assets/site.js` (module scripts do not run from disk);
- all styles are in `assets/site.css`, fonts in `assets/fonts/`, sounds in `assets/sounds/`;
- `index.html` stays readable, and its links to `site.css` and `site.js` carry `?v=<site version>` so browsers fetch the new files after a deploy.

## The page, in order

The order lives in `src/data/page.js` (plan v0.7 §5); section numbers and the side index are computed from it. After the three v2 prototype heroes and the whole-farm board, the page is read in nine chapters, one per district of the board (`districts` in `src/data/features.js`). Each chapter starts with an opener (`src/components/Chapter.astro`, id `ch-<district id>`) showing the district's tiles.

| # | Chapter | Section | Id | From |
|---|---|---|---|---|
| 01 | | Relay hero: live leg counter, relay track, quota shield, console | `s-relay` | prototype v2.3 Relay Launch |
| 02 | | Fleet wall: six live Agent Farm pages | `s-fleet` | prototype v2.2 Control Room |
| 03 | | The whole farm: every capability as a tile in nine districts, with stories that run across them | `s-atlas` | plan v0.7, the extension's source, the owner's Mserisi screenshots |
| 04 | I Never stops | Day and night: one chain across three days and four nights, item by item | `s-days` | prototype v2.3 |
| 05 | I | The rules of the relay (real defaults) | `s-rules` | prototype v2.3 |
| 06 | II Any project | Backlog: projects of any kind, the work list, and the Track tab | `s-backlog` | the owner's Projects screenshots (2026-10-11), M14 |
| 07 | III Beyond code | Studio: a production makes a short film | `s-studio` | M1a, M1b, the extension's `media/studio.js` |
| 08 | IV Recipes and triggers | Tasks: plan, runs, a watch trigger, Gatekeeper, a recipe | `s-auto` | M7-8-a to d, M15 |
| 09 | V Works as a team | Console, exploded and assembled on scroll | `s-console` | prototype v2.1 Command Deck |
| 10 | V | Together: a mission with a lead and a team, and Sentry | `s-together` | screenshot 043 |
| 11 | VI Never forgets | Memory: sessions, a turn kept, the wiki compiled, the vault in Obsidian | `s-memory` | M3, M4, M5, the extension's `_REF/wiki.md` |
| 12 | VII Any brain | Brains: engines, routes, route health, accounts, secrets | `s-brains` | M9, M9b, M13, Mz2, Mz3a, Mz3b, 073, 074 |
| 13 | VIII Just ask | The bridge: an agent sets the farm up from one sentence | `s-bridge` | the extension's `_REF/bridge.md` and source |
| 14 | VIII | Never waits: question card, permission, phone, all ten tones | `s-waits` | screenshots 004, 021, 023, 060 |
| 15 | IX Yours alone | Local: nothing goes to us, and the proof | `s-local` | the v2.1 proof block |
| 16 | | Start: straight answers and the closing band | `s-close` | v2.3 closing band |

## Structure

```
src/
  pages/index.astro            the page: composes the sections in order
  layouts/Base.astro           <head>, self-hosted fonts, global styles
  components/                  Header, SideIndex, Chapter (a chapter opener), Footer (markup only)
  components/sections/         Relay … Close, one file per section (markup only)
  styles/base.css              tokens, header, buttons, shared section heading, footer
  styles/chapter.css           the chapter openers
  styles/sections/*.css        one file per section, every rule scoped by the section id
  scripts/main.js              the page's one script: imports the others in page order
  scripts/state.js             the shared demo farm: accounts, relay leg, backlog queue, version, event bus
  scripts/*.js                 one script per section, plus header, side index, chapters and sound
  scripts/film.js              the Studio demo's short film, painted on a canvas
  data/facts.js                every stated figure, with its source
  data/page.js                 the page order and which chapter each section belongs to
  data/backlog.js              the demo backlog: project, the family the chain works, the queue, captures; the other projects and their tracks
  data/features.js             every capability (63), its district, where the page shows it, and the story steps: the board, the chapter openers, later /features and /pricing
  data/site.js                 links, the call to action, the site version
public/
  assets/sounds/               the extension's own tones (media/sounds)
scripts/
  finish.mjs                   second half of the build: makes dist/ a plain site
  deploy-main.sh               npm run deploy: puts dist/ on the main branch
  main-README.md               the README main carries (Turkish: how to open and upload the site)
docs/DESIGN.md                 palette, type, motion and demo-data rules
```

## Conventions

- **One farm.** All sections read `scripts/state.js`. The relay hero is the only writer of leg, context and quota, and it closes the front backlog item when its leg finishes it; other sections listen for `pass`, `rotate`, `item`, `filed`, `ver` and `reloading`. A chapter tile clicked sends `feature` with the tile's id; a demo that shows that tile switches to it and answers with `showing`. `data-shows="<tile ids>"` on an element with an id is where a tile's "See it" goes. The leg, the accounts, the backlog queue, the cost and the running version agree everywhere on the page.
- **Scoping.** Section styles are plain CSS files scoped by the section id (`#s-waits …`), so they also reach markup that scripts create. Element ids carry a section prefix (`r-`, `f-`, `a-`, `d-`, `b-`, `st-`, `au-`, `c-`, `t-`, `me-`, `br-`, `bg-`, `w-`, `l-`, `x-`). Keyframes are named `<section>-<name>`.
- **Facts.** A figure the page states goes into `src/data/facts.js` with a comment naming its source. Re-check them when the extension ships a release that changes them.
- **Demo data.** Screens are rebuilt, never pasted: no real emails, paths, account names or spending from the screenshots appear on the site.
- **Motion.** Every section pauses its animation while it is off screen and respects `prefers-reduced-motion`. Sound never plays without a click.
- **Privacy.** Fonts are self-hosted; the page makes no third-party request.
- **Versions.** The site follows semver in `package.json`, `src/data/site.js` and `CHANGELOG.md`. Design prototypes and the plan are versioned outside this repo (`AF-WEB_PLAN_v0.7`, `AF-WEB_PROTO v1.x / v2.x`).

## Open decisions

- Hosting: Hostinger (decided 2026-10-11).
- The extension's repository is closing (plan v0.7 §8), so nothing links to it. The call to action goes to the Marketplace listing (`src/data/site.js`); check that the listing is live on the day the extension is published. The changelog gets its own page with the /features pages.
- The header's "Join early access" goes to the closing band until an early access list exists.
- An Open Graph image and the extra product pages (plan §6).
