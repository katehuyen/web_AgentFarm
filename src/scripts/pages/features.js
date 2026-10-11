// /features/: search and the district buttons filter the cards. The words typed and the district picked stay in the
// address (?q=…&d=…), so a filtered list can be shared.
import '../header.js';

const $ = id => document.getElementById('fh-' + id);
const q = $('q'), bar = document.querySelector('.fds');
const groups = [...document.querySelectorAll('.fhub .fd')];
let d = '';

function show() {
  const words = q.value.toLowerCase().split(/\s+/).filter(Boolean);
  let n = 0;
  for (const g of groups) {
    let m = 0;
    const inD = d === '' || g.dataset.d === d;
    for (const c of g.querySelectorAll('.fc')) {
      const hit = inD && words.every(w => c.dataset.q.includes(w));
      c.hidden = !hit;
      if (hit) m++;
    }
    g.hidden = m === 0;
    n += m;
  }
  $('n').textContent = `${n} shown`;
  $('none').hidden = n > 0;
  const u = new URL(location.href);
  q.value.trim() ? u.searchParams.set('q', q.value.trim()) : u.searchParams.delete('q');
  d !== '' ? u.searchParams.set('d', d) : u.searchParams.delete('d');
  try { history.replaceState(null, '', u); } catch { /* a page opened from disk may refuse it */ }
}
function pick(v) {
  d = v;
  for (const b of bar.querySelectorAll('button')) { const on = b.dataset.d === d; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); }
  show();
}
q.addEventListener('input', show);
bar.addEventListener('click', e => { const b = e.target.closest('button'); if (b) pick(b.dataset.d === d && d !== '' ? '' : b.dataset.d); });
$('clear').addEventListener('click', () => { q.value = ''; pick(''); q.focus(); });

const p = new URLSearchParams(location.search);
if (p.get('q')) q.value = p.get('q');
if (p.has('d') && groups[+p.get('d')]) pick(p.get('d')); else if (p.get('q')) show();
