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

Screenshots are in the extension repo under `info/screenshots`.

| Screen on the site | Screenshots |
|---|---|
| Console, session cards, transcript, restart notice | 004, 035, 080 |
| Now page on the phone, three tabs | 021, 023 |
| Missions page and the Sentry block | 043 |
| Sound page: events, tones, quiet hours | 060 |
| Engines page and the honesty line | 073, 074 |
| Accounts | 074, 076 |
| Projects page, Backlog tab: tabs, capture, areas, Next up, rows | the owner's two screenshots of 2026-10-11 (not in `info/screenshots`) |

## Motion

- A section animates only while it is on screen (`vis` in `scripts/state.js`).
- `prefers-reduced-motion` stops every animation and shows each scene in its finished state.
- The two Ouroboros demos (relay hero and console) share one cooldown, so the page updates itself rarely.
- Sound plays only after a click.

## Demo data

No real emails, Windows paths, account names or spending from the screenshots appear on the site. Account names are `acct-a` to `acct-d`, the chain is `chn_7f3a`, the project is `orbit-app`, and the chain works the backlog family `X-40 Timeline export, end to end` (twelve parts) before the queue in `src/data/backlog.js`.
