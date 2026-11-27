/* Design Atlas — About section motion: POINT → LINE → PLANE → VOLUME → WORLD (15s loop).
 * Uses the section's existing markup (#about > .about-heading + ol.about-stages > li.about-stage).
 * Adds a 4:5 motion panel on the right (grid columns 7–12 on desktop, above the list on mobile),
 * highlights the matching list row, writes its wordmark on, and fills the timeline rail in red.
 *
 *   import { mountAboutMotion } from './about-motion.js';
 *   const about = mountAboutMotion(document.getElementById('about'));
 *   // about.destroy()
 *
 * options: { breakpoint: 960, stickyTop: 96 }
 */
const STYLE_ID = 'da-about-motion-style';
const CSS = (bp, top) => `
.da-about .about-stages{position:relative}
.da-about .about-stage{transition:opacity .5s}
.da-about .about-stage.is-dim{opacity:.38}
.da-about .about-geometry svg{transition:transform .5s cubic-bezier(.22,1,.36,1),color .4s}
.da-about .about-stage.is-active .about-geometry{color:#E65551}
.da-about .about-stage.is-active .about-geometry svg{transform:scale(1.2)}
.da-about .about-artwork svg{display:block;width:100%;height:100%}
.da-about-fill{position:absolute;left:18px;top:24px;width:1px;height:0;background:#E65551;transition:height .7s cubic-bezier(.22,1,.36,1);pointer-events:none}
.da-about-stage{width:100%;aspect-ratio:4/5;background:var(--plate,#f3f2ef)}
.da-about-stage svg{display:block;width:100%;height:100%}
@media (min-width:${bp}px){
 .da-about{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap,clamp(16px,2.2vw,36px));align-items:start}
 .da-about>.about-heading{grid-column:1/-1}
 .da-about>.about-stages{grid-column:1/7;grid-row:2;max-width:none}
 .da-about>.da-about-stage{grid-column:7/13;grid-row:2;position:sticky;top:${top}px;max-height:calc(100vh - ${top + 32}px)}
}
@media (max-width:${bp - 1}px){.da-about>.da-about-stage{margin:0 0 28px}}
@media (prefers-reduced-motion:reduce){.da-about .about-stage,.da-about-fill{transition:none}}
`;

export function mountAboutMotion(section, opts = {}) {
  const BP = opts.breakpoint ?? 960, TOP = opts.stickyTop ?? 96;
  const NS = 'http://www.w3.org/2000/svg';
  if (!document.getElementById(STYLE_ID)) { const st = document.createElement('style'); st.id = STYLE_ID; st.textContent = CSS(BP, TOP); document.head.appendChild(st); }
  section.classList.add('da-about');
  const list = section.querySelector('.about-stages');
  const heading = section.querySelector('.about-heading');
  const items = [...section.querySelectorAll('.about-stage')].slice(0, 5);

  /* motion panel, inserted right after the heading (so on mobile it sits above the list) */
  const STAGE = document.createElement('div');
  STAGE.className = 'da-about-stage'; STAGE.setAttribute('aria-hidden', 'true');
  const SVG = document.createElementNS(NS, 'svg');
  SVG.setAttribute('viewBox', '0 0 1000 1250');
  const L = document.createElementNS(NS, 'g'); SVG.appendChild(L); STAGE.appendChild(SVG);
  (heading ? heading.after(STAGE) : section.prepend(STAGE));

  /* red rail fill */
  const fill = document.createElement('div'); fill.className = 'da-about-fill'; list.appendChild(fill);

  /* wordmarks: swap each <img> for the same SVG inline so its ink strokes can be written on */
  const marks = items.map(li => {
    const img = li.querySelector('.about-artwork img'); if (!img) return null;
    let markup = '';
    try { markup = decodeURIComponent(img.src.split(',').slice(1).join(',')); } catch (e) { return null; }
    const wrap = document.createElement('span'); wrap.innerHTML = markup;
    const svg = wrap.querySelector('svg'); if (!svg) return null;
    svg.removeAttribute('aria-labelledby'); svg.querySelector('title')?.remove();
    svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', img.alt || '');
    img.replaceWith(svg);
    const ink = [...svg.querySelectorAll('[stroke="#1c1b19"]')];
    let T = 0; const segs = ink.map(e => { let L = 0; try { L = e.getTotalLength(); } catch (_) {} const s = { e, a: T, L: Math.max(L, 1) }; T += s.L; return s; });
    return { svg, segs, T, img };
  });
  function writeOn(m, k) { if (!m) return; const g = k * m.T; m.segs.forEach(s => { const v = Math.min(1, Math.max(0, (g - s.a) / s.L)); s.e.style.strokeDasharray = v >= 1 ? '' : `${v * s.L} ${s.L + 1}`; }); }

  let lastSt = -1;
  function onFrame(t) {
    const st = Math.min(4, Math.floor(t / 3));
    label.textContent = `0${st + 1} / 05`;
    items.forEach((li, i) => { li.classList.toggle('is-active', i === st); li.classList.toggle('is-dim', i !== st); });
    marks.forEach((m, i) => writeOn(m, i === st ? eio(pr(t, st * 3 + .05, st * 3 + 1.1)) : 1));
    if (st !== lastSt) { const li = items[st]; fill.style.height = Math.max(0, li.offsetTop + 29 - 24) + 'px'; lastSt = st; }
  }



  const INK='#1c1b19',LINE='#b9b5ae',RED='#E65551';
  function el(t,a,p){const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);(p||L).appendChild(e);return e}
  const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x)),pr=(t,a,b)=>clamp((t-a)/(b-a));
  const eo=x=>1-Math.pow(1-x,4),ei=x=>x*x,sio=x=>-(Math.cos(Math.PI*x)-1)/2,eio=x=>x<.5?8*x**4:1-Math.pow(-2*x+2,4)/2;
  const lerp=(a,b,k)=>a+(b-a)*k,lerp3=(a,b,k)=>[lerp(a[0],b[0],k),lerp(a[1],b[1],k),lerp(a[2],b[2],k)];
  const f1=n=>n.toFixed(1);

  /* camera */
  const CX=500,CY=600,F=12000;let cam={rx:0,ry:0,s:1};
  function proj(p){let [x,y,z]=p;let c=Math.cos(cam.ry),s=Math.sin(cam.ry);[x,z]=[x*c+z*s,-x*s+z*c];c=Math.cos(cam.rx);s=Math.sin(cam.rx);[y,z]=[y*c-z*s,y*s+z*c];
   const k=F/(F+z)*cam.s;return [CX+x*k,CY+y*k,k,z]}
  let DEPTH=true;function psplit(pts){if(!DEPTH)return [path(pts),''];let f='',b='',pf=0,pb=0,prev=null;for(const p of pts){const q=proj(p),s=f1(q[0])+' '+f1(q[1]);
   if(q[3]<=0){f+=(pf?'L':(prev&&prev[3]>0?'M'+prev.s+'L':'M'))+s;pf=1;pb=0}else{b+=(pb?'L':(prev&&prev[3]<=0?'M'+prev.s+'L':'M'))+s;pb=1;pf=0}prev={...q,3:q[3],s}}return [f,b]}
  const path=(pts,closed)=>pts.length<2?'':'M'+pts.map(p=>{const q=proj(p);return f1(q[0])+' '+f1(q[1])}).join('L')+(closed?'Z':'');
  const KEY=[[0,0,0,1],[6.2,0,0,1],[7.4,-.4,.5,1],[9.0,-.46,.62,1],[12.0,-.42,.62,1],[14.2,-.3,.62,1],[14.75,0,0,1],[15.01,0,0,1]];
  function camAt(t){let i=0;while(i<KEY.length-2&&t>=KEY[i+1][0])i++;const a=KEY[i],b=KEY[i+1],k=sio(pr(t,a[0],b[0]));return {rx:lerp(a[1],b[1],k),ry:lerp(a[2],b[2],k),s:lerp(a[3],b[3],k)}}

  const A=228,RS=A*1.58;
  /* object spin (only once it has depth) */
  const spinA=t=>t<9.6?0:1.25*Math.PI*sio(pr(t,9.6,14.2));
  const spinY=(p,a)=>{const c=Math.cos(a),s=Math.sin(a);return [p[0]*c+p[2]*s,p[1],-p[0]*s+p[2]*c]};
  /* world morph: every point of the object is pulled onto the sphere */
  function W(p,t){const m=eio(pr(t,12.0,12.9)),sh=1-eio(pr(t,14.2,14.7));const l=Math.hypot(...p)||1;const q=lerp3(p,p.map(v=>v/l*RS),m);return spinY(q,spinA(t)).map(v=>v*sh)}
  const seg=(a,b,n=18)=>[...Array(n+1)].map((_,i)=>lerp3(a,b,i/n));

  const guide=el('circle',{cx:CX,cy:CY,r:0,fill:'none',stroke:LINE,'stroke-width':1.3,'stroke-dasharray':'5 7'});
  const cross=el('path',{fill:'none',stroke:LINE,'stroke-width':1.2});
  const ripple=el('ellipse',{fill:'none',stroke:LINE,'stroke-width':1.2});
  const hatchB=el('path',{fill:'none',stroke:LINE,'stroke-width':1,opacity:.45});
  const bodyB=el('path',{fill:'none',stroke:INK,'stroke-width':1.3,'stroke-linecap':'round','stroke-linejoin':'round',opacity:.28});
  const extraB=el('path',{fill:'none',stroke:INK,'stroke-width':1,'stroke-linecap':'round',opacity:.22});
  const hatch=el('path',{fill:'none',stroke:LINE,'stroke-width':1.1});
  const body=el('path',{fill:'none',stroke:INK,'stroke-width':2.6,'stroke-linecap':'round','stroke-linejoin':'round'});
  const extra=el('path',{fill:'none',stroke:INK,'stroke-width':1.4,'stroke-linecap':'round'});
  const equ=el('path',{fill:'none',stroke:RED,'stroke-width':1.8,'stroke-linecap':'round'});
  const trail=[.8,.45,.2].map(o=>el('path',{fill:'none',stroke:RED,'stroke-width':3.4,'stroke-linecap':'round',opacity:o}));
  const ball=el('ellipse',{fill:RED});
  const label=el('text',{x:40,y:1212,'font-family':'IBM Plex Mono, Consolas, monospace','font-size':22,'letter-spacing':4,fill:'#8a867f'});

  /* the object at time t, as 3D polylines in object space */
  function edgesAt(t){
   const out=[],hat=[];
   const grow=eio(pr(t,3.3,4.4)),half=A*grow;                 /* LINE grows out of the point */
   const split=eio(pr(t,6.0,6.8));                          /* PLANE: line splits into top & bottom */
   const ext=eio(pr(t,9.0,9.6));                            /* VOLUME: plane splits into front & back */
   if(t>=3.3&&t<6.0){out.push(seg([-half,0,0],[half,0,0]))}
   else if(t>=6.0){
    const y0=-A*split,y1=A*split,zf=-A*ext,zb=A*ext;
    const face=z=>[seg([-A,y0,z],[A,y0,z]),seg([A,y0,z],[A,y1,z]),seg([A,y1,z],[-A,y1,z]),seg([-A,y1,z],[-A,y0,z])];
    out.push(...face(zf));if(ext>0){out.push(...face(zb));for(const [x,y] of[[-A,y0],[A,y0],[A,y1],[-A,y1]])out.push(seg([x,y,zf],[x,y,zb]))}
    const hk=pr(t,6.2,7.0);for(let j=1;j<8;j++){const y=lerp(-A,A,j/8);if(Math.abs(y)<=A*split*hk+1e-6)hat.push(seg([-A,y,zf],[A,y,zf],24))}
   }
   return {out,hat};
  }
  const cubeV=[[-A,-A,-A],[A,-A,-A],[A,A,-A],[-A,A,-A],[-A,-A,A],[A,-A,A],[A,A,A],[-A,A,A]];
  const WALK=[1,5,6,2,3,7,4,0,1];
  function ballObj(t){
   if(t<0.55)return [0,lerp(-760,0,ei(t/.55)),0];
   if(t<1.0){const k=pr(t,.55,1.0);return [0,-150*4*k*(1-k),0]}
   if(t<1.3){const k=pr(t,1.0,1.3);return [0,-46*4*k*(1-k),0]}
   if(t<3.3)return [0,0,0];
   if(t<4.4)return [A*eio(pr(t,3.3,4.4)),0,0];
   if(t<5.2)return [lerp(A,-A,sio(pr(t,4.4,5.2))),0,0];
   if(t<6.0)return [lerp(-A,A,sio(pr(t,5.2,6.0))),0,0];
   if(t<6.8)return [A,-A*eio(pr(t,6.0,6.8)),0];
   if(t<9.0){const u=pr(t,6.8,9.0)*4,i=Math.min(3,Math.floor(u)),P=[[A,-A],[A,A],[-A,A],[-A,-A],[A,-A]];const k=eio(u-i);return [lerp(P[i][0],P[i+1][0],k),lerp(P[i][1],P[i+1][1],k),0]}
   if(t<9.6)return [A,-A,-A*eio(pr(t,9.0,9.6))];
   if(t<12.0){const u=pr(t,9.6,12.0)*8,i=Math.min(7,Math.floor(u));return lerp3(cubeV[WALK[i]],cubeV[WALK[i+1]],eio(u-i))}
   if(t<14.2){const a=-Math.PI/4+2*Math.PI*1.0*sio(pr(t,12.0,14.2));const s=Math.hypot(A,A,A);return [s*.82*Math.cos(a),-s*.32,s*.82*Math.sin(a)]}
   return [0,0,0];
  }
  function ballWorld(t){
   if(t>=14.7)return [0,lerp(0,-760,ei(pr(t,14.7,15))),0];
   if(t>=12.0&&t<14.2){const p=ballObj(t),l=Math.hypot(...p);return spinY(p.map(v=>v/l*RS*1.0),spinA(t))}
   if(t>=11.9&&t<12.0)return W(ballObj(t),t);
   if(t>=14.2)return lerp3(spinY((()=>{const p=ballObj(14.199),l=Math.hypot(...p);return p.map(v=>v/l*RS)})(),spinA(14.2)),[0,0,0],eio(pr(t,14.2,14.7)));
   return W(ballObj(t),t);
  }

  function render(t){
   cam=camAt(t);
   /* guide circle: drawn around the point, then grows into the globe's silhouette */
   const gIn=eo(pr(t,1.15,2.0)),gR=lerp(120,lerp(A*1.75,RS,eio(pr(t,12.0,12.9))),eio(pr(t,3.3,4.6)))*(1-eio(pr(t,14.2,14.7)));
   guide.setAttribute('r',gR);guide.setAttribute('pathLength',1);guide.setAttribute('stroke-dasharray',gIn<1?`${gIn} 1`:'5 7');guide.removeAttribute(gIn<1?'x':'pathLength');
   if(gIn>=1){guide.removeAttribute('pathLength');guide.setAttribute('stroke-dasharray','5 7')}
   guide.setAttribute('transform',`rotate(${-90+t*14} ${CX} ${CY})`);guide.setAttribute('opacity',t<1.15?0:.85);
   {const k=eo(pr(t,1.35,2.1)),c=eio(pr(t,3.3,4.0));const r=lerp(200,0,c)*k;cross.setAttribute('d',r>1?`M${CX} ${CY-r}V${CY+r}M${CX-r} ${CY}H${CX+r}`:'');cross.setAttribute('opacity',.8)}
   {let rk=0,rs=0;[[.55,1],[1.0,.6],[1.3,.35]].forEach(([a,s])=>{const k=pr(t,a,a+.75);if(k>0&&k<1){rk=k;rs=s}});
    ripple.setAttribute('cx',CX);ripple.setAttribute('cy',CY+14);ripple.setAttribute('rx',rk?50+190*eo(rk)*rs:0);ripple.setAttribute('ry',rk?(12+40*eo(rk))*rs:0);ripple.setAttribute('opacity',rk?(1-rk)*.9:0)}

   const {out,hat}=edgesAt(Math.min(t,14.7));
   DEPTH=t>=9.05;{const sp2=(arr,F,B)=>{let f='',b='';arr.forEach(p=>{const pts=p.map(q=>W(q,t));if(DEPTH&&t<12.5){const z=pts.reduce((a,q)=>a+proj(q)[3],0)/pts.length;if(z<=1)f+=path(pts);else b+=path(pts);return}const [x,y]=psplit(pts);f+=x;b+=y});F.setAttribute('d',f);B.setAttribute('d',b)};sp2(out,body,bodyB);sp2(hat,hatch,hatchB);hatch.setAttribute('opacity',.9)}
   /* WORLD: meridians & equator grow out of the morphed cube */
   let xd='',ed='';const xs=[];const g=eo(pr(t,12.6,13.5)),sh=1-eio(pr(t,14.2,14.7)),sp=spinA(t);
   if(g>0&&t<14.7){for(let m=0;m<4;m++){const a0=Math.PI/4+m*Math.PI/2,pts=[],n=Math.ceil(48*g);for(let i=0;i<=n;i++){const th=-Math.PI/2+Math.PI*i/48;pts.push(spinY([RS*Math.cos(th)*Math.cos(a0),RS*Math.sin(th),RS*Math.cos(th)*Math.sin(a0)],sp).map(v=>v*sh))}xs.push(pts)}
    const pts=[],n=Math.ceil(72*g);for(let i=0;i<=n;i++){const a=i/72*2*Math.PI;pts.push(spinY([RS*Math.cos(a),0,RS*Math.sin(a)],sp).map(v=>v*sh))}ed=path(pts)}
   DEPTH=true;{let f='',b='';xs.forEach(p=>{const [x,y]=psplit(p);f+=x;b+=y});extra.setAttribute('d',f);extraB.setAttribute('d',b)}equ.setAttribute('d',ed);

   /* ball */
   const p=ballWorld(t),q=proj(p);
   let s=0;for(const tt of[.55,1.0,1.3]){const d=t-tt;if(d>=0&&d<.14)s=Math.max(s,Math.sin(Math.PI*d/.14)*(tt===.55?1:.55))}
   const fall=(t<.55||t>14.7)?.32:0,R=16*q[2];
   ball.setAttribute('cx',q[0]);ball.setAttribute('cy',q[1]-R*s*.35);ball.setAttribute('rx',R*(1+s*.5-fall*.3));ball.setAttribute('ry',R*(1-s*.4+fall));
   trail.forEach((tr,i)=>{const pts=[];for(let j=0;j<=12;j++){const tt=t-.08*(i+j/12);if(tt<3.3)continue;pts.push(ballWorld(tt))}tr.setAttribute('d',t>3.3&&t<14.7?path(pts):'')});

   onFrame(t);
  }



  /* playback: loop while the section is on screen */
  const D = 15; let t = 0, last = null, raf = 0, visible = false, alive = true;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function frame(now) { if (!alive || !visible) { raf = 0; return; } if (last != null) t = (t + Math.min(.1, (now - last) / 1000)) % D; last = now; render(t); raf = requestAnimationFrame(frame); }
  function start() { if (raf || reduce) return; last = null; raf = requestAnimationFrame(frame); }
  if (reduce) { render(13.6); items.forEach(li => li.classList.remove('is-dim', 'is-active')); marks.forEach(m => writeOn(m, 1)); fill.style.height = '0'; }
  else render(0);
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(e => { visible = e[0].isIntersecting; if (visible) start(); }, { threshold: .15 }) : null;
  io ? io.observe(section) : (visible = true, start());

  return {
    seek(x) { t = x; render(t); },
    destroy() {
      alive = false; cancelAnimationFrame(raf); io && io.disconnect();
      STAGE.remove(); fill.remove(); section.classList.remove('da-about');
      items.forEach(li => li.classList.remove('is-dim', 'is-active'));
      marks.forEach(m => { if (m) m.svg.replaceWith(m.img); });
    },
  };
}
