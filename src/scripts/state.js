// Shared demo state. Every section shows the same farm: one relay chain, one set of accounts, one running version.
// The relay hero (relay.js) is the only writer of leg, context and quota; other sections read the state and listen for events.
// All data here is demo data shaped like the real app; nothing is fetched.

const hex = n => Array.from({ length: n }, () => '0123456789abcdef'[(Math.random() * 16) | 0]).join('');

export const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const wait = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));
export { hex };

/* Four accounts of one engine. h = five-hour window %, w = weekly %; colours mark the account in the relay views. */
export const ACCT = [
  { n: 'acct-a', c: '#a8f035', h: 22, w: 61, left: '2d 6h' },
  { n: 'acct-b', c: '#71e3ed', h: 6, w: 38, left: '1d 7h' },
  { n: 'acct-c', c: '#e4e07f', h: 71, w: 44, left: '2h 39m' },
  { n: 'acct-d', c: '#8f6cc8', h: 48, w: 72, left: '2h 59m' },
];

/* leg: the live relay leg; ctx: its context in %; acc: index of the standing account; sid: the live session id. */
export const S = {
  leg: 92, ctx: 26, acc: 2, sid: '3efb20bf', ver: '3.931.0', boot: '7c2e91f4',
  phase: 'work', busy: false, passes: 0, step: 4, cost: 41.2, tok: 1.8, longest: 6,
};

/* tiny event bus: pass, rotate, ver, reloading */
const subs = {};
export function on(ev, fn) { (subs[ev] = subs[ev] || []).push(fn); }
export function emit(ev, data) {
  for (const fn of subs[ev] || []) { try { fn(data); } catch (err) { console.error(err); } }
}

/* the account the next leg would move to: the emptiest five-hour window, other than `except` */
export function emptiest(except) {
  return ACCT.map((a, k) => ({ a, k })).filter(x => x.k !== except).sort((p, q) => p.a.h - q.a.h)[0].k;
}

/* Ouroboros (the agent rebuilds and reloads Agent Farm) is shown by two sections; one shared cooldown keeps it rare. */
let lastOuro = -1e9;
export function canOuro() { return !S.busy && S.phase === 'work' && performance.now() - lastOuro > 40000; }
export function startOuro() { lastOuro = performance.now(); S.busy = true; }
export function nextVer() { const p = S.ver.split('.').map(Number); return `${p[0]}.${p[1] + 1}.0`; }
export function finishOuro(ver) { S.ver = ver; S.boot = hex(8); S.busy = false; emit('ver', ver); }

/* which sections are on screen; sections pause their drawing when they are not */
export const vis = {};
const io = new IntersectionObserver(es => es.forEach(e => { vis[e.target.id] = e.isIntersecting; }));
document.querySelectorAll('section[id^="s-"]').forEach(s => io.observe(s));

/* the longest wait grows by a minute every minute */
setInterval(() => { S.longest++; emit('minute'); }, 60000);
