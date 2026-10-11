// 08 More: play the extension's tones, run a demo engine test, reveal the tracks output and the namespace bars.
import { reduce } from './state.js';
import { play } from './sound.js';

const sec = document.getElementById('s-more');
sec.querySelector('.bento').classList.add('js');

/* sound: ▶ plays the tone; the row shows an equalizer while it plays */
document.getElementById('m-tones').addEventListener('click', async e => {
  const b = e.target.closest('button'); if (!b) return;
  const li = b.closest('li');
  li.classList.add('play');
  await play(b.dataset.t);
  setTimeout(() => li.classList.remove('play'), 1400);
});

/* engines: Test makes a call (simulated here) and the reading changes from "on disk" to "proven" */
document.getElementById('m-engs').addEventListener('click', e => {
  const b = e.target.closest('.test'); if (!b) return;
  const nt = b.closest('.er').querySelector('.nt');
  b.disabled = true; b.textContent = 'testing…';
  setTimeout(() => {
    if (b.dataset.ok) { nt.textContent = `Answered a test turn in ${(1.1 + Math.random() * 1.8).toFixed(1)}s: proven, not just read from disk. (Demo, no call leaves this page.)`; nt.className = 'nt ok'; b.textContent = '✓ Tested'; }
    else { nt.textContent = 'Nothing to call: the gemini command is not on this machine. Install it, then test again. (Demo)'; nt.className = 'nt bad'; b.textContent = 'Install first'; }
  }, reduce ? 0 : 1100);
});

/* the tracks output types in line by line, the namespace bars grow, once each */
const term = document.getElementById('m-term'), ns = document.getElementById('m-ns');
term.querySelectorAll('.out[data-d]').forEach(o => { o.style.transitionDelay = (+o.dataset.d * 0.45 + 0.2) + 's'; });
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } }), { threshold: 0.5 });
if (reduce) { term.classList.add('on'); ns.classList.add('on'); } else { io.observe(term); io.observe(ns); }
