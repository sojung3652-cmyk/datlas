/* Design Atlas — orbit sphere around the hero description.
 * An invisible sphere with two dashed orbits sits on the centre of the paragraph.
 * A red ball and a small ink dot travel the orbits, passing in front of and behind the text.
 *
 *   import { mountHeroOrbit } from './hero-orbit.js';
 *   const orbit = mountHeroOrbit(document.querySelector('.hero-copy'));   // the block that holds the <p>
 *   // orbit.destroy()
 *
 * options: { paragraph: element (default: first <p> inside root), size: 0.26, stretch: 1.18, lift: 0.22 }
 */
export function mountHeroOrbit(root, opts = {}) {
  const NS = 'http://www.w3.org/2000/svg';
  const LINE = '#A7A7A4', RED = '#E65551', INK = '#111111';
  const P = opts.paragraph || root.querySelector('p');
  const SIZE = opts.size ?? 0.26, SY = opts.stretch ?? 1.18, LIFT = opts.lift ?? 0.22;

  /* layering: back orbit layer (0) · text (1) · front orbit layer (2) */
  if (getComputedStyle(root).position === 'static') root.style.position = 'relative';
  root.style.isolation = 'isolate';
  const lifted = [...root.children];
  lifted.forEach(c => { if (getComputedStyle(c).position === 'static') c.style.position = 'relative'; c.style.zIndex = '1'; });

  const mkLayer = z => {
    const s = document.createElementNS(NS, 'svg');
    s.setAttribute('aria-hidden', 'true');
    s.style.cssText = `position:absolute;transform:translate(-50%,-50%);overflow:visible;pointer-events:none;z-index:${z}`;
    root.appendChild(s); return s;
  };
  const BACK = mkLayer(0), FRONT = mkLayer(2);
  const el = (t, a, p) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
  const mk = (p, a) => el('path', Object.assign({ fill: 'none', 'stroke-linecap': 'round' }, a), p);
  const sio = x => -(Math.cos(Math.PI * x) - 1) / 2;

  /* two great circles of the sphere */
  const RINGS = [{ ax: .42, az: .3 }, { ax: 1.25, az: -.55 }];
  RINGS.forEach(r => {
    r.b = mk(BACK, { stroke: LINE, 'stroke-width': 1, 'stroke-dasharray': '3 5', opacity: .42 });
    r.f = mk(FRONT, { stroke: LINE, 'stroke-width': 1.2, 'stroke-dasharray': '4 5', opacity: .75 });
  });
  const balls = [
    { ring: 0, speed: 1 / 4.6, phase: 0, col: RED, r: 6, tail: true },
    { ring: 1, speed: -1 / 7.5, phase: .4, col: INK, r: 3.2 },
  ];
  balls.forEach(b => {
    b.tails = b.tail ? [.8, .4, .15].map(o => ({ o, b: mk(BACK, { stroke: RED, 'stroke-width': 2, opacity: 0 }), f: mk(FRONT, { stroke: RED, 'stroke-width': 2.2, opacity: 0 }) })) : [];
    b.eb = el('circle', { fill: b.col, r: 0 }, BACK);
    b.ef = el('circle', { fill: b.col, r: 0 }, FRONT);
  });

  let R = 100;
  function layout() {
    R = Math.max(P.offsetWidth * SIZE, 80);
    const W = R * 2.6, H = R * SY * 2.6;
    const x = P.offsetLeft + P.offsetWidth / 2, y = P.offsetTop + P.offsetHeight / 2 - R * SY * LIFT;
    [BACK, FRONT].forEach(s => {
      s.setAttribute('width', W); s.setAttribute('height', H);
      s.setAttribute('viewBox', `${-W / 2} ${-H / 2} ${W} ${H}`);
      s.style.left = x + 'px'; s.style.top = y + 'px';
    });
  }
  function pt(ring, a, spin) {
    let x = Math.cos(a), y = 0, z = Math.sin(a), c, s;
    c = Math.cos(ring.ax); s = Math.sin(ring.ax); [y, z] = [y * c - z * s, y * s + z * c];
    c = Math.cos(ring.az); s = Math.sin(ring.az); [x, y] = [x * c - y * s, x * s + y * c];
    c = Math.cos(spin); s = Math.sin(spin); [x, z] = [x * c + z * s, -x * s + z * c];
    c = Math.cos(.28); s = Math.sin(.28); [y, z] = [y * c - z * s, y * s + z * c];
    const k = 1 + z * .12; return [x * R * k, y * R * SY * k, z];
  }
  function split(pts) {
    let b = '', f = '', pb = 0, pf = 0;
    for (const p of pts) {
      const s = `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
      if (p[2] >= 0) { f += (pf ? 'L' : 'M') + s; pf = 1; pb = 0; } else { b += (pb ? 'L' : 'M') + s; pb = 1; pf = 0; }
    }
    return [b, f];
  }
  function render(t) {
    const spin = t * .22;
    RINGS.forEach(r => {
      const pts = []; for (let k = 0; k <= 120; k++) pts.push(pt(r, k / 120 * 2 * Math.PI, spin));
      const [b, f] = split(pts); r.b.setAttribute('d', b); r.f.setAttribute('d', f);
    });
    balls.forEach(b => {
      const u = t * b.speed + b.phase, n = Math.floor(u), f = u - n;
      const a = 2 * Math.PI * (n + (.35 * f + .65 * sio(f))), p = pt(RINGS[b.ring], a, spin), front = p[2] >= 0, k = 1 + p[2] * .35;
      const put = (e, on) => { e.setAttribute('cx', p[0]); e.setAttribute('cy', p[1]); e.setAttribute('r', on ? b.r * k : 0); e.setAttribute('opacity', on ? (front ? 1 : .45) : 0); };
      put(b.ef, front); put(b.eb, !front);
      const len = (.25 + .9 * Math.abs(Math.sin(Math.PI * f))) * Math.sign(b.speed);
      b.tails.forEach((tl, i) => {
        const pts = []; for (let j = 0; j <= 10; j++) pts.push(pt(RINGS[b.ring], a - len * (i + j / 10) / 3, spin));
        const [bb, ff] = split(pts);
        tl.b.setAttribute('d', bb); tl.f.setAttribute('d', ff);
        tl.b.setAttribute('opacity', tl.o * .45); tl.f.setAttribute('opacity', tl.o);
      });
    });
  }

  layout();
  const ro = 'ResizeObserver' in window ? new ResizeObserver(layout) : null;
  ro ? ro.observe(root) : addEventListener('resize', layout);
  let raf = 0, alive = true;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loop = now => { if (!alive) return; render(now / 1000); raf = requestAnimationFrame(loop); };
  if (reduce) render(1.2); else raf = requestAnimationFrame(loop);

  return {
    destroy() {
      alive = false; cancelAnimationFrame(raf);
      ro ? ro.disconnect() : removeEventListener('resize', layout);
      BACK.remove(); FRONT.remove();
      lifted.forEach(c => { c.style.zIndex = ''; });
    },
  };
}
