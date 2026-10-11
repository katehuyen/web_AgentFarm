// Backlog: the Projects page, Backlog tab, running on the page's one queue (state.js BQ).
// The relay hero closes the front item when its leg finishes it ('item'); this section shows that, and between closes it
// files new work: a person types a thought into the capture box, or an agent files something it noticed (#byAI).
// Rows and chips are re-rendered from the queue and slid into place, so every move reads as the queue changing.
import { S, BQ, BL, ACCT, on, vis, reduce, nextCapture, file } from './state.js';

const $ = id => document.getElementById('b-' + id);
const TAKE = 5, ROWS = 6;
const esc = t => t.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const sleep = ms => new Promise(r => setTimeout(r, ms));
/* waits, then keeps waiting while the section is off screen or the tab is hidden */
async function hold(ms) { await sleep(ms); while (!vis['s-backlog'] || document.hidden) await sleep(400); }

const rowsEl = $('rows'), chipsEl = $('chips');
let extra = null; /* a row shown under the queue: a capture in the inbox, or an item just filed at the back */
let closing = null; /* the front item while it is shown closed, before the queue moves up */

function meta(it) {
  return `<span class="meta"><em class="k ${it.k}">#${it.k}</em>${it.by ? `<span class="by">#by${it.by}</span>` : ''}<span class="sz">${it.s}</span>`
    + `${it.part ? `<span class="par">↳ ${it.part}</span>` : ''}${it.wait ? `<span class="wt" title="waits on ${it.wait}">⛔ ${it.wait}</span>` : ''}</span>`;
}
function row(it, i, st) {
  const who = st === 'doing' ? `● ⑂ ${S.leg} on it · ${ACCT[S.acc].n} · ctx <span class="cx">${Math.round(S.ctx)}</span>%`
    : st === 'done' ? `✓ closed by ⑂ ${closing.leg}` : '';
  return `<li class="row ${st}" data-c="${it.c}"><span class="no${i >= 0 && i < TAKE ? ' take' : ''}">${i >= 0 ? i + 1 : ''}</span><i class="cb"></i>`
    + `<code class="${it.part ? 'part' : ''}">${it.c}</code><span class="t">${esc(it.t)}</span>${meta(it)}${who ? `<span class="who">${who}</span>` : ''}</li>`;
}
function extraRow() {
  if (!extra) return '';
  const it = extra.it;
  if (extra.inbox) return `<li class="row inbox" data-c="inbox"><span class="no">📥</span><i class="cb"></i><code>—</code><span class="t">${esc(it.t)}</span><span class="meta">inbox · not filed yet</span></li>`;
  return `<li class="row filed${extra.gone ? ' gone' : ''}" data-c="${it.c}"><span class="no">${BQ.indexOf(it) + 1}</span><i class="cb"></i><code>${it.c}</code><span class="t">${esc(it.t)}</span>${meta(it)}`
    + `<span class="who">${it.by === 'AI' ? `filed by the agent on ⑂ ${S.leg}, a proposal` : 'filed · queued at the back'}</span></li>`;
}
function render() {
  /* the item just closed stays on top, unnumbered, until the queue moves up under it */
  rowsEl.innerHTML = (closing ? row(closing.it, -1, 'done') : '')
    + BQ.slice(0, closing ? ROWS - 1 : ROWS).map((it, i) => row(it, i, i === 0 ? 'doing' : '')).join('') + extraRow();
  chipsEl.innerHTML = BQ.map((it, i) => `<span class="chip${i < TAKE ? ' take' : ''}" data-c="${it.c}"><i>${i + 1}</i><code>${it.c}</code><small>${it.part ? '↳ ' : ''}${it.s}</small></span>${i === TAKE - 1 ? '<span class="cut" data-c="cut">┊</span>' : ''}`).join('');
  $('q').textContent = BQ.length;
  $('open').textContent = BL.open; $('done').textContent = BL.done;
}
/* re-render, sliding every row and chip from where it was (first, last, invert, play) */
function move(fn) {
  const at = el => [...el.children].map(c => [c.dataset.c, c.getBoundingClientRect()]);
  const before = new Map([...at(rowsEl), ...at(chipsEl)]);
  fn(); render();
  if (reduce) return;
  for (const c of [...rowsEl.children, ...chipsEl.children]) {
    const b = before.get(c.dataset.c), a = c.getBoundingClientRect();
    if (!b) { c.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: 'ease-out' }); continue; }
    const dx = b.left - a.left, dy = b.top - a.top;
    if (dx || dy) c.animate([{ transform: `translate(${dx}px,${dy}px)` }, { transform: 'none' }], { duration: 560, easing: 'cubic-bezier(.2,.8,.2,1)' });
  }
}
render();

/* the live context figure on the item being worked */
setInterval(() => { if (vis['s-backlog']) { const cx = rowsEl.querySelector('.doing .cx'); if (cx) cx.textContent = Math.round(S.ctx); } }, 500);
on('pass', () => { if (!closing) render(); });

/* the relay leg finished the front item: show it closed, then move the queue up */
on('item', async p => {
  if (!vis['s-backlog'] || reduce) { closing = null; render(); return; }
  closing = { it: p.closed, leg: p.leg };
  render();
  await sleep(1500);
  move(() => { closing = null; });
});

/* capture and file, while the section is on screen */
const ta = $('ta'), typed = $('typed'), add = $('add');
async function capture() {
  while (BQ.length >= 16) await hold(1000); /* the demo files no faster than the chain closes */
  const it = nextCapture();
  if (it.who === 'you') {
    ta.classList.add('typing');
    for (let i = 1; i <= it.t.length; i++) { typed.textContent = it.t.slice(0, i); await sleep(28 + Math.random() * 40); }
    await hold(500);
    add.classList.add('hit'); await sleep(260); add.classList.remove('hit');
    typed.textContent = ''; ta.classList.remove('typing');
    move(() => { extra = { it, inbox: true }; });
    await hold(1700);
  }
  /* filed: it gets its code and goes to the back of the queue */
  move(() => { file(it); extra = { it }; });
  await hold(2600);
  extra.gone = true; render();
  await sleep(450);
  move(() => { extra = null; });
}
async function loop() {
  await hold(1200);
  for (;;) { await capture(); await hold(1800); }
}
if (!reduce) loop();
