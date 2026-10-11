# agentfarm.space

The website of **Agent Farm**, mission control for AI coding agents in VS Code ([extension repo](https://github.com/katehuyen/vsc_AgentFarm)).

One long landing page, built as a static site with [Astro](https://astro.build). Every screen on it is rebuilt from real screenshots of the extension and runs on demo data. Every number it states comes from the extension's source or a real screen, and `src/data/facts.js` says where.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (Node 22 or newer) |
| `npm run dev` | Local dev server at `http://localhost:4321` |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run check` | Astro and TypeScript diagnostics |

Deploy: any static host. For Cloudflare Pages the build command is `npm run build` and the output directory is `dist`.

## The page, in order

The order was agreed with the product owner: the three v2 prototype heroes first (v2.3, then v2.2, then v2.1), then the rest of the plan.

| # | Section | Id | From |
|---|---|---|---|
| 01 | Relay hero: live leg counter, relay track, quota shield, console | `s-relay` | prototype v2.3 Relay Launch |
| 02 | Fleet wall: six live Agent Farm pages | `s-fleet` | prototype v2.2 Control Room |
| 03 | Console, exploded and assembled on scroll | `s-console` | prototype v2.1 Command Deck |
| 04 | Days: one chain drawn across days | `s-days` | prototype v2.3 |
| 05 | The rules of the relay (real defaults) | `s-rules` | prototype v2.3 |
| 06 | Never waits: question card, permission, phone, sound | `s-waits` | new, screenshots 004, 021, 023, 060 |
| 07 | Together: a mission with a lead and a team | `s-together` | new, screenshot 043 |
| 08 | More: sound, engines, memory, platform, settings | `s-more` | new, screenshots 060, 073, 074 |
| 09 | Local: nothing goes to us, and the proof | `s-local` | new, plus the v2.1 proof block |
| 10 | Start: straight answers and the closing band | `s-close` | v2.3 closing band |

## Structure

```
src/
  pages/index.astro            the page: composes the sections in order
  layouts/Base.astro           <head>, self-hosted fonts, global styles
  components/                  Header, SideIndex, Footer
  components/sections/         S01Relay … S10Close, one file per section
  styles/base.css              tokens, header, buttons, shared section heading, footer
  styles/sections/*.css        one file per section, every rule scoped by the section id
  scripts/state.js             the shared demo farm: accounts, relay leg, version, event bus
  scripts/*.js                 one script per section, plus sound.js
  data/facts.js                every stated figure, with its source
  data/site.js                 links, the call to action, the site version
public/
  sounds/                      the extension's own tones (media/sounds, MIT)
docs/DESIGN.md                 palette, type, motion and demo-data rules
```

## Conventions

- **One farm.** All sections read `scripts/state.js`. The relay hero is the only writer of leg, context and quota; other sections listen for `pass`, `rotate`, `ver` and `reloading`. The leg, the accounts, the cost and the running version agree everywhere on the page.
- **Scoping.** Section styles are plain CSS files scoped by the section id (`#s-waits …`), so they also reach markup that scripts create. Element ids carry a section prefix (`r-`, `f-`, `c-`, `d-`, `w-`, `t-`, `m-`, `l-`, `x-`). Keyframes are named `<section>-<name>`.
- **Facts.** A figure the page states goes into `src/data/facts.js` with a comment naming its source. Re-check them when the extension ships a release that changes them.
- **Demo data.** Screens are rebuilt, never pasted: no real emails, paths, account names or spending from the screenshots appear on the site.
- **Motion.** Every section pauses its animation while it is off screen and respects `prefers-reduced-motion`. Sound never plays without a click.
- **Privacy.** Fonts are self-hosted; the page makes no third-party request.
- **Versions.** The site follows semver in `package.json`, `src/data/site.js` and `CHANGELOG.md`. Design prototypes and the plan are versioned outside this repo (`AF-WEB_PLAN_v0.4`, `AF-WEB_PROTO v1.x / v2.x`).

## Open decisions

- Where the call to action goes (plan §5.11): an early access list or the Marketplace listing. Until then it points at the extension's public repository; change it in `src/data/site.js`.
- An Open Graph image and the extra product pages (plan §6).
