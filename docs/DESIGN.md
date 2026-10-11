# Design notes

## Direction

Mission Control: the site looks like the instrument it sells. Dark, dense, precise, with one signal colour. Everything that moves on the page is a working miniature of the real app.

## Palette

Measured from screenshots of the real app (VS Code dark theme with Agent Farm's own colours). Tokens live in `src/styles/base.css`.

| Token | Value | Use |
|---|---|---|
| `--void` | `#090a07` | page background |
| `--ink` | `#eeefe6` | text |
| `--dim` / `--faint` | `#a3a495` / `#5f6056` | secondary text, rules |
| `--ed` / `--side` / `--panel` | `#2b2c26` / `#1b1c17` / `#33342d` | editor, sidebar and panel surfaces in rebuilt screens |
| `--lime` | `#a8f035` | the signal colour: live, done, the call to action |
| `--pink` | `#ec0f74` | quota handover, permission, a cut line |
| `--cyan` | `#71e3ed` | results coming back, the second account |
| `--yellow` | `#e4e07f` | questions, a changed version |
| `--violet` | `#8f6cc8` | the fourth account, wiki links |
| `--claude` / `--agy` / `--teal` | `#e8a33d` / `#f0609a` / `#84dfd0` | engine pills: Claude Code, Antigravity, OpenCode |

The four demo accounts use lime, cyan, yellow and violet everywhere on the page.

## Type

- Display: Big Shoulders Display (variable), uppercase, for headings and big numbers.
- Text: Geist (variable).
- Code, labels and figures: Geist Mono (variable).
- Rebuilt app screens use the system UI font, as VS Code does.

All three are self-hosted through `@fontsource-variable`; the page sends no request to a font CDN.

## Sources for rebuilt screens

Screenshots are in the extension repo under `info/screenshots` and `info/Mserisi`; the project files keep a copy of the Mserisi set (`agentfarm-web/04_materyal/Mserisi`). None is published: every screen is redrawn with demo data, in English.

| Screen on the site | Screenshots |
|---|---|
| Console, session cards, transcript, restart notice | 004, 035, 080 |
| Now page on the phone, three tabs | 021, 023 |
| Missions page and the Sentry block | 043 |
| Sound page: events, tones, quiet hours (Never waits) | 060 |
| Projects page, Backlog tab: tabs, capture, areas, Next up, rows | the owner's two screenshots of 2026-10-11 (not in `info/screenshots`) |
| Projects page, Track tab | M14 |
| Studio page: Pipeline, Assets, Triage, Assemble | M1a, M1b |
| Tasks page: Plan, Runs, the words box; a workflow's steps; Gatekeeper settings | M7-8-a to d, M15 |
| Sessions page, one session's turns, the vault in Obsidian | M3, M4, M5 |
| Engines page, routes and route health, providers | M9, M9b, 073, 074 |
| Accounts and account policies | M13, Mz3a, Mz3b, 074, 076 |
| Secrets | Mz2 |
| The bridge chat | no screenshot: the ops, their arguments and the notification text are the extension's own (`_REF/bridge.md`, `extension.ts`) |
| The whole farm: what each tile claims | the extension's source and `info/KURALLAR`, and the owner's Mserisi screenshots (`info/Mserisi`: Studio, Sessions, Tasks, Engines, Accounts, Secrets, Capability Matrix, Track, Gatekeeper); each line's check is in `src/data/features.js` (`src`) |

## Motion

- A section animates only while it is on screen (`vis` in `scripts/state.js`).
- `prefers-reduced-motion` stops every animation and shows each scene in its finished state.
- The two Ouroboros demos (relay hero and console) share one cooldown, so the page updates itself rarely.
- Sound plays only after a click.

## Demo data

No real emails, Windows paths, account names, session titles or spending from the screenshots appear on the site, and UI strings the extension still has in Turkish are shown in English. Account names are `acct-a` to `acct-d`, the chain is `chn_7f3a`, the project is `orbit-app`, and the chain works the backlog family `X-40 Timeline export, end to end` (twelve parts) before the queue in `src/data/backlog.js`. The stories on the whole-farm board use invented files and ids (`interview-take-4.mp4`, session `7c41d2e9`).

The chapters share one second demo world, so a session met in one chapter is the same in the next: the documentary "The last keeper" (Studio makes its film; session `7c41e2a0`, "Storm shots keep losing the beam", is kept for the wiki in Memory, picked up by its id in the bridge chat, and closes item S-6 on the Track tab), a thesis on lighthouse keepers' logbooks, and a spring campaign. The other projects on the Projects page are `The last keeper`, `Thesis` and `Spring launch`.

The film the Studio demo makes is painted frame by frame on a canvas (`scripts/film.js`): six scenes of five seconds, no video file, labelled as a demo. In the app each shot would come from the model its step names.
