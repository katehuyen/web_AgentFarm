// 10 Local: the outgoing line is drawn and cut once, when the diagram comes into view.
const m = document.getElementById('l-mach');
const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { m.classList.add('on'); io.disconnect(); } }, { threshold: 0.45 });
io.observe(m);
