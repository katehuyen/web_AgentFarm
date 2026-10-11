// 06 Never waits: a question card that answers itself when its countdown runs out, a tool permission that never does,
// and the Now page on a phone that mirrors both. Auto-answer covers questions only; permissions wait for a person.
// The countdown is shortened for the demo (12 seconds).
import { ACCT, S, reduce, on, vis } from './state.js';
import { play, sound } from './sound.js';

const $ = id => document.getElementById('w-' + id);
const SECS = 12, RING = 97.4;

/* questions an agent asks mid-task; the first option is the recommended one */
const QUESTIONS = [
  { q: 'Which export format should the timeline use?', o: ['CSV', 'JSON lines', 'Both'] },
  { q: 'The old export writer is still imported in two places. Remove it, or keep a shim?', o: ['Remove it', 'Keep a shim'] },
  { q: 'What should the new row limit setting be called?', o: ['<code>timelineExportMaxRows</code>', '<code>exportRowCap</code>'] },
];
const PERMS = ['git push origin main', 'rm -rf dist/vsix'];

const card = $('q'), perm = $('perm');
let qi = 0, left = SECS, answered = false, permOpen = true, permSince = Math.max(1, S.longest - 2), pi = 0, tick = 0, reminders = 0;

/* sound events light their chip for a moment, and play the extension's tone when the sound is switched on */
const TONE = { card: 'pulse', ask: 'knock', done: 'crystal', quota: 'ticks' };
function ring(ev) {
  const s = $('sound').querySelector(`[data-ev="${ev}"]`);
  if (!s) return;
  if (sound.on && vis['s-waits']) play(TONE[ev]);
  if (reduce) return;
  s.classList.add('on'); setTimeout(() => s.classList.remove('on'), 1800);
}
const snd = $('snd');
snd.addEventListener('click', () => sound.set(!sound.on));
sound.watch(v => { snd.setAttribute('aria-pressed', v); snd.textContent = v ? 'Sound on' : 'Sound off'; if (v) play('pulse'); });

function showQuestion(quiet) {
  const Q = QUESTIONS[qi % QUESTIONS.length];
  answered = false; left = SECS;
  card.classList.remove('done');
  $('qq').innerHTML = Q.q;
  $('opts').innerHTML = Q.o.map((t, i) => `<button type="button" data-i="${i}">${t}${i === 0 ? '<em>Recommended</em>' : ''}</button>`).join('');
  $('qf').textContent = 'Nobody at the desk? When the ring runs out, the recommended option goes in.';
  clock();
  phone();
  if (!quiet) ring('card');
}

function answer(i, auto) {
  if (answered) return;
  answered = true;
  const Q = QUESTIONS[qi % QUESTIONS.length], btns = $('opts').querySelectorAll('button');
  btns.forEach((b, k) => { b.disabled = true; b.classList.toggle('pick', k === i); });
  card.classList.add('done');
  $('qf').innerHTML = (auto ? `No answer in ${SECS}s, so the recommended option went in: <b>${Q.o[i]}</b>.` : `Answered: <b>${Q.o[i]}</b>.`) + ' developer carries on.';
  phone();
  setTimeout(() => ring('done'), 2600);
  setTimeout(() => { qi++; showQuestion(); }, reduce ? 6000 : 7000);
}

function clock() {
  $('cd').textContent = '0:' + String(Math.max(0, left)).padStart(2, '0');
  $('ring').style.strokeDashoffset = (RING * (1 - Math.max(0, left) / SECS)).toFixed(1);
}

function decide(allow) {
  if (!permOpen) return;
  permOpen = false;
  perm.classList.add('ok');
  $('since').textContent = allow ? 'allowed' : 'denied';
  $('pf').textContent = allow ? 'Allowed from your phone. reviewer goes ahead.' : 'Denied from your phone. reviewer is told no and finds another way.';
  phone();
  setTimeout(() => {
    pi++; permOpen = true; permSince = 0; reminders = 0;
    perm.classList.remove('ok');
    $('pq').innerHTML = `Run <code>${PERMS[pi % PERMS.length]}</code>?`;
    $('pf').textContent = 'A tool permission is never answered for you. It waits, rings, and reaches your phone.';
    since(); phone(); ring('ask');
  }, 9000);
}
function since() { if (permOpen) $('since').textContent = permSince ? `waiting ${permSince}m` : 'just now'; }

/* the phone: the Now page with what waits, what runs and what it costs */
function phone() {
  const Q = QUESTIONS[qi % QUESTIONS.length], items = [];
  if (!answered) items.push(`<div class="pw"><div class="t"><b>developer</b><span class="eng">Claude</span><span>0:${String(Math.max(0, left)).padStart(2, '0')}</span></div><p>${Q.q}</p><div class="bt"><button type="button" class="y" data-a="q">${Q.o[0].replace(/<[^>]+>/g, '')}</button><button type="button" data-a="open">Open</button></div></div>`);
  if (permOpen) items.push(`<div class="pw p"><div class="t"><b>reviewer</b><span class="eng x">Codex</span><span>${permSince ? permSince + 'm' : 'now'}</span></div><p>Run ${PERMS[pi % PERMS.length]}?</p><div class="bt"><button type="button" class="y" data-a="allow">Allow</button><button type="button" data-a="deny">Deny</button></div></div>`);
  $('pwl').innerHTML = items.length ? items.join('') : '<span class="none">Nothing is waiting for you.</span>';
  $('pw').textContent = items.length;
  $('psub').textContent = `${items.length} waiting · 3 running · $${S.cost.toFixed(2)} today`;
}
function money() {
  $('pc').textContent = '$' + S.cost.toFixed(2);
  $('pacc').innerHTML = ACCT.map(a => `<div class="acc"><span>${a.n}</span><u><i style="width:${Math.round(a.h)}%;background:${a.c}"></i></u><span>${Math.round(a.h)}%</span></div>`).join('');
}

$('opts').addEventListener('click', e => { const b = e.target.closest('button'); if (b) answer(+b.dataset.i, false); });
$('pwl').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.a === 'q') answer(0, false);
  else if (b.dataset.a === 'open') card.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  else decide(b.dataset.a === 'allow');
});

on('pass', p => { if (p.why === 'q') ring('quota'); money(); });
on('minute', () => { if (permOpen) { permSince++; since(); phone(); } });

showQuestion(true); since(); money();

/* the countdown only runs while the section is on screen */
setInterval(() => {
  if (!vis['s-waits']) return;
  tick++;
  if (!answered && !reduce) {
    left--; clock();
    if (left <= 0) answer(0, true);
    else { const t = $('pwl').querySelector('.pw:not(.p) .t span:last-child'); if (t) t.textContent = $('cd').textContent; }
  }
  if (tick % 4 === 0) { money(); $('psub').textContent = $('psub').textContent.replace(/\$[\d.]+/, '$' + S.cost.toFixed(2)); }
  /* the reminder rings twice, as the app's default does (every 3 minutes there, every 30 seconds here) */
  if (permOpen && tick % 30 === 0 && reminders < 2) { reminders++; ring('ask'); }
}, 1000);
