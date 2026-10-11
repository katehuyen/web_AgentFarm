# agentfarm.space · source

> **Türkçe not:** Bu dal sitenin kaynak kodu. Yüklenecek bitmiş site `main` dalında; açmak ve Hostinger'a yüklemek için oradaki README'ye bak.

The website of **Agent Farm**, mission control for AI coding agents in VS Code ([extension repo](https://github.com/katehuyen/vsc_AgentFarm)).

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

The order was agreed with the product owner: the three v2 prototype heroes first (v2.3, then v2.2, then v2.1), then the rest of the plan.

| # | Section | Id | From |
|---|---|---|---|
| 01 | Relay hero: live leg counter, relay track, quota shield, console | `s-relay` | prototype v2.3 Relay Launch |
| 02 | Fleet wall: six live Agent Farm pages | `s-fleet` | prototype v2.2 Control Room |
| 03 | The whole farm: every capability as a tile in nine districts, with stories that run across them | `s-atlas` | new (plan v0.7), the extension's source and the owner's Mserisi screenshots |
| 04 | Console, exploded and assembled on scroll | `s-console` | prototype v2.1 Command Deck |
| 05 | Backlog: the project's work list, captured, ordered and worked off | `s-backlog` | new, the owner's Projects → Backlog screenshots (2026-10-11) |
| 06 | Day and night: one chain across three days and four nights, item by item | `s-days` | prototype v2.3 |
| 07 | The rules of the relay (real defaults) | `s-rules` | prototype v2.3 |
| 08 | Never waits: question card, permission, phone, sound | `s-waits` | new, screenshots 004, 021, 023, 060 |
| 09 | Together: a mission with a lead and a team | `s-together` | new, screenshot 043 |
| 10 | More: sound, engines, memory, platform, settings | `s-more` | new, screenshots 060, 073, 074 |
| 11 | Local: nothing goes to us, and the proof | `s-local` | new, plus the v2.1 proof block |
| 12 | Start: straight answers and the closing band | `s-close` | v2.3 closing band |

## Structure

```
src/
  pages/index.astro            the page: composes the sections in order
  layouts/Base.astro           <head>, self-hosted fonts, global styles
  components/                  Header, SideIndex, Footer (markup only)
  components/sections/         S01Relay … S12Close, one file per section (markup only)
  styles/base.css              tokens, header, buttons, shared section heading, footer
  styles/sections/*.css        one file per section, every rule scoped by the section id
  scripts/main.js              the page's one script: imports the others in page order
  scripts/state.js             the shared demo farm: accounts, relay leg, backlog queue, version, event bus
  scripts/*.js                 one script per section, plus header, side index and sound
  data/facts.js                every stated figure, with its source
  data/backlog.js              the demo backlog: project, the family the chain works, the queue, captures
  data/features.js             every capability (63), its district and its story steps: the 03 board, later /features and /pricing
  data/site.js                 links, the call to action, the site version
public/
  assets/sounds/               the extension's own tones (media/sounds, MIT)
scripts/
  finish.mjs                   second half of the build: makes dist/ a plain site
  deploy-main.sh               npm run deploy: puts dist/ on the main branch
  main-README.md               the README main carries (Turkish: how to open and upload the site)
docs/DESIGN.md                 palette, type, motion and demo-data rules
```

## Conventions

- **One farm.** All sections read `scripts/state.js`. The relay hero is the only writer of leg, context and quota, and it closes the front backlog item when its leg finishes it; other sections listen for `pass`, `rotate`, `item`, `filed`, `ver` and `reloading`. The leg, the accounts, the backlog queue, the cost and the running version agree everywhere on the page.
- **Scoping.** Section styles are plain CSS files scoped by the section id (`#s-waits …`), so they also reach markup that scripts create. Element ids carry a section prefix (`r-`, `f-`, `c-`, `b-`, `d-`, `w-`, `t-`, `m-`, `l-`, `x-`). Keyframes are named `<section>-<name>`.
- **Facts.** A figure the page states goes into `src/data/facts.js` with a comment naming its source. Re-check them when the extension ships a release that changes them.
- **Demo data.** Screens are rebuilt, never pasted: no real emails, paths, account names or spending from the screenshots appear on the site.
- **Motion.** Every section pauses its animation while it is off screen and respects `prefers-reduced-motion`. Sound never plays without a click.
- **Privacy.** Fonts are self-hosted; the page makes no third-party request.
- **Versions.** The site follows semver in `package.json`, `src/data/site.js` and `CHANGELOG.md`. Design prototypes and the plan are versioned outside this repo (`AF-WEB_PLAN_v0.4`, `AF-WEB_PROTO v1.x / v2.x`).

## Open decisions

- Hosting: Hostinger (decided 2026-10-11).
- Where the call to action goes (plan §5.11): an early access list or the Marketplace listing. Until then it points at the extension's public repository; change it in `src/data/site.js`.
- An Open Graph image and the extra product pages (plan §6).
