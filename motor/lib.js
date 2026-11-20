// =====================================================================
// Biblioteca visual: personagens, bichos, cenários, objetos e efeitos.
// Tudo devolve strings SVG. Quadro do mundo = 576 x 1024.
// =====================================================================
const INK = '#1f2a44', SW = 6;
const W = 576, H = 1024;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const ease = x => { x = clamp(x); return x * x * (3 - 2 * x); };
const easeOut = x => 1 - Math.pow(1 - clamp(x), 3);
const lerp = (a, b, k) => a + (b - a) * k;
function rng(seed) { let s = seed % 2147483647; if (s <= 0) s += 2147483646; return () => (s = s * 16807 % 2147483647) / 2147483647; }
const T = (x, y, s = 1, extra = '') => `transform="translate(${x} ${y}) scale(${s}) ${extra}"`;

// ---------------------------------------------------------------- paleta
const COR = {
  pedraCinza: '#A3ACB9', pedraMarrom: '#A0693F', pedraVermelha: '#E5485E',
  ouro: '#FFD166', ceuDia1: '#A8DCF0', ceuDia2: '#E3F4FA',
  noite1: '#2B2D5C', noite2: '#4B4A8A',
};

// ================================================================ PESSOAS
// p: aparência; st: pose/expressão. Origem = entre os pés.
const DIM = {
  kid:   { head: [102, 94], headY: -462, torso: [124, 190], torsoY: -344, leg: 165, arm: 150, legW: 36, neck: 40 },
  adult: { head: [86, 80],  headY: -590, torso: [150, 260], torsoY: -505, leg: 245, arm: 225, legW: 44, neck: 36 },
};
function cabelo(p, camada) { // camada: 'tras' | 'frente'
  const c = p.hair, d = p.hairDark || '#000', hs = p.hairStyle, [rx, ry] = p._d.head;
  const k = rx / 102; // escala relativa à cabeça infantil
  const S = s => `<g transform="scale(${k})">${s}</g>`;
  if (camada === 'tras') {
    if (hs === 'coque') return S(`<circle cx="0" cy="-118" r="44" fill="${c}" stroke="${INK}" stroke-width="${SW}"/><path d="M-20 -128 q20 -16 40 0" stroke="${d}" stroke-width="5" fill="none"/>`);
    if (hs === 'rabo') return S(`<path d="M80 -40 q70 10 60 110 q-10 30 -30 10 q10 -70 -40 -90z" fill="${c}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/><circle cx="84" cy="-40" r="12" fill="${p.accent || '#FF6B8B'}" stroke="${INK}" stroke-width="4"/>`);
    if (hs === 'longo') return S(`<path d="M-108 -10 C-120 -100 120 -100 108 -10 L116 120 q-30 20 -40 -10 L-76 110 q-10 30 -40 10 Z" fill="${c}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`);
    if (hs === 'puff') { let s = `<circle cx="0" cy="-138" r="58" fill="${c}" stroke="${INK}" stroke-width="${SW}"/>`; return S(s); }
    return '';
  }
  if (hs === 'franja') return S(`<path d="M-108 30 C-118 -90 -50 -112 0 -110 C56 -112 118 -88 108 30 L96 30 L94 -30 L-94 -30 L-96 30Z" fill="${c}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
      <path d="M-96 -24 L-90 -52 L-66 -28 L-56 -58 L-34 -26 L-20 -58 L0 -26 L16 -58 L34 -26 L48 -58 L66 -28 L80 -56 L96 -24" fill="${c}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M-40 -90 q30 -12 60 -4" stroke="#fff" stroke-width="6" opacity=".3" fill="none" stroke-linecap="round"/>`);
  if (hs === 'curto') return S(`<path d="M-102 -2 C-108 -96 -40 -106 0 -104 C48 -106 108 -96 102 -2 C92 -36 70 -50 40 -50 C10 -46 -20 -56 -40 -48 C-70 -46 -92 -30 -102 -2Z" fill="${c}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`);
  if (hs === 'careca') return S(`<path d="M-104 20 C-110 -20 -96 -40 -84 -30 C-80 0 -92 10 -104 20Z M104 20 C110 -20 96 -40 84 -30 C80 0 92 10 104 20Z" fill="${c}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M-30 -80 q30 -12 60 0" stroke="#fff" stroke-width="6" opacity=".35" fill="none" stroke-linecap="round"/>`);
  if (hs === 'cachos') { let s = ''; [[-92, -30], [-80, -70], [-50, -95], [-12, -108], [28, -104], [62, -88], [88, -60], [96, -24]].forEach(([x, y]) => s += `<circle cx="${x}" cy="${y}" r="32" fill="${c}" stroke="${INK}" stroke-width="${SW}"/>`); return S(s + `<path d="M-100 0 C-100 -86 100 -86 100 0 C80 -40 -80 -40 -100 0Z" fill="${c}"/>`); }
  // coque / rabo / longo / puff: franja simples por cima
  return S(`<path d="M-102 0 C-104 -86 -40 -96 0 -94 C44 -96 104 -86 102 0 C86 -50 40 -60 0 -56 C-40 -60 -86 -50 -102 0Z" fill="${c}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`);
}
function olhos(p, st) {
  const ex = st.eyes || 'open', [rx] = p._d.head, k = rx / 102, sep = 40 * k, er = 30 * k, eyR = 34 * k;
  const [lx, ly] = st.look || [0, 0];
  let s = '';
  for (const x of [-sep, sep]) {
    if (ex === 'happy') { s += `<path d="M${x - 24 * k} ${12 * k} Q${x} ${-18 * k} ${x + 24 * k} ${12 * k}" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`; continue; }
    if (ex === 'closed') { s += `<path d="M${x - 24 * k} ${2 * k} Q${x} ${22 * k} ${x + 24 * k} ${2 * k}" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`; continue; }
    if (ex === 'squeeze') { s += `<path d="M${x - 22 * k} ${-8 * k} L${x + (x < 0 ? 18 : -18) * k} ${4 * k} L${x - 22 * k} ${16 * k}" transform="${x > 0 ? `translate(${2 * x} 0) scale(-1 1)` : ''}" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`; continue; }
    const blink = st.blink == null ? 1 : st.blink;
    const irisR = (ex === 'wide' ? 15 : 22) * k, pup = (ex === 'wide' ? 7 : 11) * k;
    s += `<g transform="translate(${x} ${5 * k}) scale(1 ${blink})">`;
    s += `<ellipse rx="${er}" ry="${eyR}" fill="#fff" stroke="${INK}" stroke-width="${SW}"/>`;
    s += `<circle cx="${lx * k}" cy="${ly * k}" r="${irisR}" fill="${p.eye || '#6B4226'}"/><circle cx="${lx * k}" cy="${ly * k}" r="${pup}" fill="#1b2238"/>`;
    s += `<circle cx="${lx * k - 8 * k}" cy="${ly * k - 9 * k}" r="${7 * k}" fill="#fff"/><circle cx="${lx * k + 8 * k}" cy="${ly * k + 7 * k}" r="${3.5 * k}" fill="#fff"/>`;
    if (ex === 'sad' || ex === 'tired') s += `<path d="M${-er - 4} ${-eyR - 4} L${er + 4} ${-eyR - 4} L${er + 4} ${(ex === 'tired' ? -2 : -14) * k} Q0 ${(ex === 'tired' ? 8 : -6) * k} ${-er - 4} ${(ex === 'tired' ? -2 : -14) * k}Z" fill="${p.skin}"/><path d="M${-er} ${(ex === 'tired' ? -2 : -14) * k} Q0 ${(ex === 'tired' ? 8 : -6) * k} ${er} ${(ex === 'tired' ? -2 : -14) * k}" fill="none" stroke="${INK}" stroke-width="5"/>`;
    s += `</g>`;
  }
  if (p.glasses) s += `<circle cx="${-sep}" cy="${5 * k}" r="${40 * k}" fill="none" stroke="${p.glasses}" stroke-width="7"/><circle cx="${sep}" cy="${5 * k}" r="${40 * k}" fill="none" stroke="${p.glasses}" stroke-width="7"/><path d="M-4 0 q4 -6 8 0" stroke="${p.glasses}" stroke-width="7" fill="none"/>`;
  // sobrancelhas
  const br = { open: [0, 0], wide: [-10, 0], sad: [8, -14], worried: [6, -12], angry: [-6, 14], happy: [-6, 0], closed: [0, 0], squeeze: [6, -10], tired: [6, -6] }[st.brow || ex] || [0, 0];
  const by = -40 * k + br[0] * k, inner = br[1] * k;
  s += `<path d="M${-sep - 20 * k} ${by} Q${-sep} ${by - 10 * k} ${-sep + 18 * k} ${by + inner * -0.6 - (inner ? 0 : 0)}" fill="none" stroke="${p.browColor || p.hairDark || INK}" stroke-width="${p.browW || 7}" stroke-linecap="round" transform="rotate(${br[1] * 0.8} ${-sep} ${by})"/>`;
  s += `<path d="M${sep + 20 * k} ${by} Q${sep} ${by - 10 * k} ${sep - 18 * k} ${by}" fill="none" stroke="${p.browColor || p.hairDark || INK}" stroke-width="${p.browW || 7}" stroke-linecap="round" transform="rotate(${-br[1] * 0.8} ${sep} ${by})"/>`;
  if (st.tears) { const tl = clamp(st.tears) * 70 * k; for (const x of [-sep, sep]) s += `<path d="M${x + (x < 0 ? -6 : 6)} ${30 * k} q${x < 0 ? -6 : 6} ${tl / 2} 0 ${tl}" stroke="#6EC6F0" stroke-width="${9 * k}" fill="none" stroke-linecap="round" opacity=".9"/><circle cx="${x + (x < 0 ? -6 : 6)}" cy="${30 * k + tl}" r="${7 * k}" fill="#6EC6F0"/>`; }
  return s;
}
function boca(p, st) {
  const k = p._d.head[0] / 102, m = st.mouth || 'smile', o = clamp(st.talk || 0);
  let s = `<g transform="translate(0 ${62 * k}) scale(${k})">`;
  if (m === 'talk' && o > 0.1 || m === 'open' || m === 'grin') {
    const h = m === 'grin' ? 34 : m === 'open' ? 36 : 10 + o * 30, w = 28;
    const d = `M${-w} -6 Q0 0 ${w} -6 Q${w} ${h} 0 ${h} Q${-w} ${h} ${-w} -6Z`;
    s += `<path d="${d}" fill="#B3263E"/><clipPath id="cb${st._id || 0}"><path d="${d}"/></clipPath><g clip-path="url(#cb${st._id || 0})"><rect x="-40" y="-12" width="80" height="12" fill="#fff"/><ellipse cx="0" cy="${h + 4}" rx="${w * .7}" ry="${h * .45}" fill="#F26D7D"/></g><path d="${d}" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  } else if (m === 'o') s += `<ellipse cx="0" cy="8" rx="12" ry="16" fill="#B3263E" stroke="${INK}" stroke-width="${SW}"/>`;
  else if (m === 'flat' || m === 'talk') s += `<path d="M-16 6 h32" stroke="${INK}" stroke-width="${SW}" stroke-linecap="round"/>`;
  else if (m === 'sad') s += `<path d="M-22 14 Q0 -4 22 14" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linecap="round"/>`;
  else if (m === 'wavy') s += `<path d="M-24 8 q6 -8 12 0 q6 8 12 0 q6 -8 12 0 q6 8 12 0" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
  else if (m === 'tight') s += `<path d="M-14 6 q14 -6 28 0" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linecap="round"/>`;
  else s += `<path d="M-24 0 Q0 22 24 0" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linecap="round"/>`;
  s += `</g>`;
  if (p.mustache) s += `<path d="M${-34 * k} ${54 * k} q${17 * k} ${-16 * k} ${34 * k} ${-4 * k} q${17 * k} ${-12 * k} ${34 * k} ${4 * k} q${-10 * k} ${14 * k} ${-34 * k} ${6 * k} q${-24 * k} ${8 * k} ${-34 * k} ${-6 * k}z" fill="${p.mustache}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
  return s;
}
function cabeca(p, st) {
  const [rx, ry] = p._d.head, k = rx / 102;
  let s = cabelo(p, 'tras');
  s += `<circle cx="${-rx + 2}" cy="${18 * k}" r="${20 * k}" fill="${p.skin}" stroke="${INK}" stroke-width="${SW}"/><circle cx="${rx - 2}" cy="${18 * k}" r="${20 * k}" fill="${p.skin}" stroke="${INK}" stroke-width="${SW}"/>`;
  s += `<ellipse rx="${rx}" ry="${ry}" fill="${p.skin}" stroke="${INK}" stroke-width="${SW}"/>`;
  if (p.wrinkles) s += `<path d="M${-30 * k} ${-60 * k} q${30 * k} -8 ${60 * k} 0 M${-24 * k} ${-48 * k} q${24 * k} -6 ${48 * k} 0" stroke="#c99a7c" stroke-width="3" fill="none"/>`;
  s += cabelo(p, 'frente');
  if (p.cap) s += `<g transform="scale(${k})"><path d="M-104 -30 C-104 -110 104 -110 104 -30Z" fill="${p.cap}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/><path d="M-110 -30 h220 q0 18 -20 18 h-180 q-20 0 -20 -18z" fill="${p.capBrim || '#1b2238'}" stroke="${INK}" stroke-width="5"/><circle cx="0" cy="-66" r="14" fill="#FFD166" stroke="${INK}" stroke-width="4"/></g>`;
  if (st.blush !== false) s += `<ellipse cx="${-62 * k}" cy="${44 * k}" rx="${18 * k}" ry="${11 * k}" fill="#FF8FA3" opacity="${st.blushStrong ? .8 : .5}"/><ellipse cx="${62 * k}" cy="${44 * k}" rx="${18 * k}" ry="${11 * k}" fill="#FF8FA3" opacity="${st.blushStrong ? .8 : .5}"/>`;
  s += olhos(p, st);
  s += `<path d="M${-6 * k} ${36 * k} q${6 * k} ${6 * k} ${12 * k} 0" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
  s += boca(p, st);
  if (st.sweat) s += `<path d="M${rx - 10} ${-40 * k} q12 20 0 28 q-12 -8 0 -28z" fill="#9FDCF5" stroke="${INK}" stroke-width="3"/>`;
  return s;
}
function braco(p, side, ang, d) { // side -1 esq, 1 dir; ang = graus para fora
  const sx = side * (d.torso[0] / 2 + 12), sy = d.torsoY + 24;
  const rot = side < 0 ? ang : -ang;
  return `<g transform="translate(${sx} ${sy}) rotate(${rot})"><rect x="-23" y="-12" width="46" height="${d.arm}" rx="23" fill="${p.sleeve || p.shirt}" stroke="${INK}" stroke-width="${SW}"/><rect x="-9" y="10" width="10" height="40" rx="5" fill="#fff" opacity=".35"/><circle cx="0" cy="${d.arm}" r="17" fill="${p.skin}" stroke="${INK}" stroke-width="5"/>${p._hold && p._hold.side === side ? p._hold.svg : ''}</g>`;
}
function pessoa(p, st = {}) {
  const d = DIM[p.type || 'kid']; p._d = d;
  const t = st.t || 0, walk = st.walk, bob = walk != null ? Math.abs(Math.sin(walk * Math.PI)) * -10 : Math.sin(t * 3 + (st.ph || 0)) * 4;
  const hold = st.hold; p._hold = hold || null;
  let armL = st.armL ?? 8, armR = st.armR ?? 8;
  if (walk != null) { armL += Math.sin(walk * Math.PI * 2) * 14; armR -= Math.sin(walk * Math.PI * 2) * 14; }
  else if (st.still !== true) { const ph = st.ph || 0, viv = st.viv ?? 1; // vida: braços e corpo sempre em movimento
    armL += (Math.sin(t * 2.1 + ph) * 6 + Math.max(0, Math.sin(t * .9 + ph * 2)) * 10) * viv;
    armR += (Math.sin(t * 2.4 + ph + 1) * 6 + Math.max(0, Math.sin(t * .8 + ph * 3 + 2)) * 10) * viv;
    if (st.mouth === 'talk') { armL += Math.abs(Math.sin(t * 4 + ph)) * 18; armR += Math.abs(Math.sin(t * 3.3 + ph)) * 14; } }
  const sit = st.sit, upY = sit ? d.leg * 0.55 : 0;
  if (typeof window !== 'undefined' && window._cab && !st.nocheck) window._cab.push({ x: st.x || 0, y: (st.y || 0) + (d.headY + upY + 5) * (st.s || 1), r: d.head[1] * (st.s || 1) }); // p/ checagem de enquadramento
  let s = `<g ${T(st.x || 0, st.y || 0, st.s || 1, st.flip ? 'scale(-1 1)' : '')}>`;
  if (st.shadow !== false) s += `<ellipse cx="0" cy="4" rx="${d.torso[0] * 0.75}" ry="12" fill="#000" opacity=".12"/>`;
  // pernas
  const lw = d.legW, legTop = -d.leg;
  if (sit) {
    for (const sd of [-1, 1]) { const x = sd * 40; s += `<rect x="${x - lw / 2}" y="${-d.leg * 0.5}" width="${lw}" height="${d.leg * 0.5}" rx="8" fill="${p.pants}" stroke="${INK}" stroke-width="${SW}"/><path d="${sd < 0 ? `M${x - lw / 2 - 14} 8 q0 -20 24 -20 h${lw - 10} v20z` : `M${x + lw / 2 + 14} 8 q0 -20 -24 -20 h${-(lw - 10)} v20z`}" fill="${p.shoes}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`; }
    s += `<rect x="${-d.torso[0] / 2 - 6}" y="${-d.leg * 0.62}" width="${d.torso[0] + 12}" height="${d.leg * 0.2}" rx="20" fill="${p.pants}" stroke="${INK}" stroke-width="${SW}"/>`;
  } else {
    for (const sd of [-1, 1]) {
      const a = walk != null ? Math.sin(walk * Math.PI * 2) * 16 * sd : 0;
      s += `<g transform="translate(${sd * 26} ${legTop}) rotate(${a})"><rect x="${-lw / 2}" y="0" width="${lw}" height="${d.leg}" rx="6" fill="${p.pants}" stroke="${INK}" stroke-width="${SW}"/><path d="${sd < 0 ? `M${-lw / 2 - 14} ${d.leg + 8} q0 -20 24 -20 h${lw - 10} v20z` : `M${lw / 2 + 14} ${d.leg + 8} q0 -20 -24 -20 h${-(lw - 10)} v20z`}" fill="${p.shoes}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/></g>`;
    }
    if (p.shorts) s += `<rect x="${-d.torso[0] / 2 + 10}" y="${legTop}" width="${d.torso[0] - 20}" height="70" rx="8" fill="${p.shorts}" stroke="${INK}" stroke-width="${SW}"/>`;
  }
  // tronco + cabeça (podem inclinar)
  const hipY = legTop + upY;
  s += `<g transform="translate(0 ${upY + bob}) rotate(${st.bend || 0} 0 ${legTop})">`;
  s += braco(p, -1, armL, d) + braco(p, 1, armR, d);
  const tw = d.torso[0], th = d.torso[1], ty = d.torsoY;
  s += `<rect x="${-tw / 2}" y="${ty}" width="${tw}" height="${legTop - ty + 14}" rx="22" fill="${p.shirt}" stroke="${INK}" stroke-width="${SW}"/>`;
  if (p.hood) s += `<path d="M${-tw / 2 + 6} ${ty + 12} q${tw / 2 - 6} 40 ${tw - 12} 0" fill="none" stroke="${INK}" stroke-width="5"/><path d="M-14 ${ty + 30} v40 M14 ${ty + 30} v40" stroke="#fff" stroke-width="5" stroke-linecap="round"/><rect x="${-tw / 3}" y="${ty + th - 80}" width="${tw * 2 / 3}" height="44" rx="10" fill="none" stroke="${INK}" stroke-width="4"/>`;
  if (p.uniform) s += `<path d="M-30 ${ty} L0 ${ty + 30} L30 ${ty}" fill="#DCE6F2" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><rect x="${tw / 2 - 52}" y="${ty + 50}" width="30" height="34" rx="4" fill="#FFD166" stroke="${INK}" stroke-width="4"/><path d="M0 ${ty + 30} v${th - 30}" stroke="${INK}" stroke-width="3" opacity=".5"/>`;
  if (p.apron) s += `<path d="M${-tw / 2 + 14} ${ty + 40} h${tw - 28} v${th + 40} h${-(tw - 28)}z" fill="#FFFFFF" stroke="${INK}" stroke-width="5"/><path d="M-26 ${ty + th - 10} h52" stroke="#e0d6c8" stroke-width="4"/>`;
  if (p.bag) s += `<path d="M${-tw / 2} ${ty + 10} L${tw / 2 - 10} ${ty + th - 40}" stroke="#7a4a2a" stroke-width="12"/><rect x="${tw / 2 - 40}" y="${ty + th - 60}" width="70" height="60" rx="8" fill="#B8733F" stroke="${INK}" stroke-width="5"/>`;
  if (st.pocket) { const pk = clamp(st.pocket); s += `<ellipse cx="${tw / 2 - 6}" cy="${legTop + 30}" rx="${16 + 26 * pk}" ry="${14 + 22 * pk}" fill="${p.pants}" stroke="${INK}" stroke-width="5"/>`; if (pk > 0.3) s += `<circle cx="${tw / 2 - 6}" cy="${legTop + 18 - 10 * pk}" r="${8 + 6 * pk}" fill="${COR.pedraVermelha}" stroke="${INK}" stroke-width="3"/>`; }
  s += `<rect x="-20" y="${d.headY + d.head[1] - 20}" width="40" height="${d.neck}" fill="${p.skinDark}" stroke="${INK}" stroke-width="5"/>`;
  if (st.handsPocket) s += `<path d="M${-tw / 2 + 4} ${ty + th - 30} q${-14} 20 6 30 M${tw / 2 - 4} ${ty + th - 30} q14 20 -6 30" fill="none" stroke="${INK}" stroke-width="4"/>`;
  s += `<g transform="translate(0 ${d.headY}) rotate(${(st.tilt || 0) + Math.sin(t * 1.6 + (st.ph || 0)) * 3 + (st.mouth === 'talk' ? Math.sin(t * 6) * 2.5 : 0)})">${cabeca(p, st)}</g>`;
  s += `</g></g>`;
  return s;
}

// --------------------------------------------------------------- elenco
const NICO = { type: 'kid', hairStyle: 'franja', hair: '#2A2633', hairDark: '#14121a', skin: '#EDC29A', skinDark: '#DDAA80', eye: '#6B4226', shirt: '#E8434F', sleeve: '#E8434F', pants: '#4F78B8', shoes: '#FFFFFF', glasses: '#3a2a20', hood: 1 };
const PAI = { type: 'adult', hairStyle: 'curto', hair: '#2A2633', hairDark: '#14121a', skin: '#E2B48C', skinDark: '#CF9E75', eye: '#6B4226', shirt: '#33507E', sleeve: '#33507E', pants: '#26324F', shoes: '#1b1b22', mustache: '#2A2633', uniform: 1 };
const PAI_CAP = { ...PAI, cap: '#26324F' };
const ARI = { type: 'adult', hairStyle: 'careca', hair: '#E8E8E8', hairDark: '#9a9a9a', skin: '#EBC3A0', skinDark: '#D8AC88', eye: '#4F7FC4', shirt: '#F2C14E', sleeve: '#F2C14E', pants: '#5A6E8C', shoes: '#4a2f1d', mustache: '#EDEDED', cap: '#3E6FB0', capBrim: '#2c4f8a', bag: 1, wrinkles: 1 };
const NEUSA = { type: 'adult', hairStyle: 'coque', hair: '#8a5a3c', hairDark: '#5a3520', skin: '#C98E66', skinDark: '#B57B55', eye: '#6B4226', shirt: '#F49AB0', sleeve: '#F49AB0', pants: '#7C5BA6', shoes: '#4a2f1d', apron: 1 };
const PROF = { type: 'adult', hairStyle: 'longo', hair: '#C2562A', hairDark: '#8a3a18', skin: '#F2CBA8', skinDark: '#E2B48E', eye: '#4F8A5B', shirt: '#9C7CE0', sleeve: '#9C7CE0', pants: '#3E5C8C', shoes: '#333', glasses: '#333' };
const VELHO = { type: 'adult', hairStyle: 'careca', hair: '#F0F0F0', hairDark: '#aaa', skin: '#D7A27E', skinDark: '#C28E6A', eye: '#6B4226', shirt: '#7A9E7E', sleeve: '#7A9E7E', pants: '#6B5B4B', shoes: '#3a2a1a', mustache: '#F0F0F0', wrinkles: 1 };
const SENHORA = { type: 'adult', hairStyle: 'coque', hair: '#D9D9D9', hairDark: '#999', skin: '#F0C9A8', skinDark: '#DDB08C', eye: '#6B4226', shirt: '#6FB3D9', sleeve: '#6FB3D9', pants: '#8A6FB8', shoes: '#333', glasses: '#555', wrinkles: 1 };
const MOCA = { type: 'adult', hairStyle: 'rabo', hair: '#3B2418', hairDark: '#24140b', skin: '#A86F4A', skinDark: '#955F3D', eye: '#6B4226', shirt: '#FFD166', sleeve: '#FFD166', pants: '#3FA796', shoes: '#fff', accent: '#E8434F' };
const MOCO = { type: 'adult', hairStyle: 'curto', hair: '#C9A15A', hairDark: '#8a6a30', skin: '#F2CBA8', skinDark: '#E2B48E', eye: '#4F7FC4', shirt: '#5FB8A8', sleeve: '#5FB8A8', pants: '#4a4a6a', shoes: '#333' };
const KIDS = [
  { type: 'kid', hairStyle: 'cachos', hair: '#D9632B', hairDark: '#9E3F15', skin: '#F6CDA8', skinDark: '#E9B48E', eye: '#5B8BD0', shirt: '#F2B33D', sleeve: '#F2B33D', pants: '#3E5C8C', shoes: '#E8434F' },
  { type: 'kid', hairStyle: 'puff', hair: '#3B2418', hairDark: '#24140b', skin: '#B07650', skinDark: '#9C6542', eye: '#6B4226', shirt: '#8BD06B', sleeve: '#8BD06B', pants: '#4F78B8', shoes: '#FFD43B' },
  { type: 'kid', hairStyle: 'rabo', hair: '#E3B04B', hairDark: '#a87a20', skin: '#F6D3B3', skinDark: '#E9BC98', eye: '#4F8A5B', shirt: '#B78CF2', sleeve: '#B78CF2', pants: '#E8434F', shoes: '#fff', accent: '#5EC8F2' },
  { type: 'kid', hairStyle: 'curto', hair: '#4a2f1d', hairDark: '#2a180a', skin: '#8C5A3C', skinDark: '#7a4c30', eye: '#3a2a1a', shirt: '#5EC8F2', sleeve: '#5EC8F2', pants: '#C9B38A', shoes: '#E8434F' },
  { type: 'kid', hairStyle: 'longo', hair: '#1f1a2a', hairDark: '#000', skin: '#F0D0B0', skinDark: '#E0BC98', eye: '#3a2a1a', shirt: '#FF9F43', sleeve: '#FF9F43', pants: '#5FB8A8', shoes: '#fff' },
];

// ================================================================ PIPOCA (salsicha)
function pipoca(st = {}) {
  const t = st.t || 0, wag = Math.sin(t * (st.wagFast ? 22 : 12)) * (st.wag ?? 1) * 18, walk = st.walk;
  const lying = st.lying;
  let s = `<g ${T(st.x || 0, st.y || 0, st.s || 1, st.flip ? 'scale(-1 1)' : '')}>`;
  s += `<ellipse cx="10" cy="${lying ? 6 : 100}" rx="150" ry="12" fill="#000" opacity=".12"/>`;
  const by = lying ? 40 : 0;
  // rabo
  s += `<g transform="translate(130 ${10 + by}) rotate(${-30 + wag})"><path d="M0 0 q40 -10 46 -50" fill="none" stroke="${INK}" stroke-width="16" stroke-linecap="round"/><path d="M0 0 q40 -10 46 -50" fill="none" stroke="#9B5A2E" stroke-width="8" stroke-linecap="round"/></g>`;
  // patas
  if (!lying) [-100, -60, 80, 116].forEach((x, i) => { const a = walk != null ? Math.sin(walk * Math.PI * 2 + (i % 2) * Math.PI) * 18 : 0; s += `<g transform="translate(${x + 12} 58) rotate(${a})"><rect x="-12" y="-4" width="24" height="42" rx="10" fill="#9B5A2E" stroke="${INK}" stroke-width="5"/></g>`; });
  else [-110, 60].forEach(x => s += `<rect x="${x - 40}" y="${by + 50}" width="46" height="20" rx="10" fill="#9B5A2E" stroke="${INK}" stroke-width="5"/>`);
  // corpo
  s += `<rect x="-120" y="${-20 + by}" width="260" height="${lying ? 76 : 90}" rx="45" fill="#9B5A2E" stroke="${INK}" stroke-width="${SW}"/>`;
  s += `<path d="M-90 ${10 + by} q80 -20 200 0" stroke="#B8733F" stroke-width="10" fill="none" stroke-linecap="round" opacity=".6"/>`;
  s += `<rect x="-62" y="${-20 + by}" width="30" height="${lying ? 76 : 90}" fill="#E8434F" stroke="${INK}" stroke-width="4"/><circle cx="-47" cy="${44 + by}" r="10" fill="#FFD43B" stroke="${INK}" stroke-width="3"/>`;
  // cabeça
  const hy = (lying ? 34 : -50) + (st.headUp ? -14 : 0) + Math.sin(t * 5) * (st.bark ? 4 : 1.5);
  s += `<g transform="translate(-110 ${hy})">`;
  s += `<ellipse cx="0" cy="0" rx="70" ry="62" fill="#9B5A2E" stroke="${INK}" stroke-width="${SW}"/>`;
  s += `<ellipse cx="-50" cy="30" rx="46" ry="30" fill="#B8733F" stroke="${INK}" stroke-width="${SW}"/>`;
  if (st.bark || st.tongue) s += `<path d="M-74 46 q14 26 34 6" fill="#F26D7D" stroke="${INK}" stroke-width="4"/>`;
  else s += `<path d="M-62 50 q14 12 28 0" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
  s += `<ellipse cx="-88" cy="20" rx="13" ry="10" fill="#1b2238"/><circle cx="-92" cy="16" r="3.5" fill="#fff"/>`;
  if (st.stone) s += pedra(-62, 62, 22, COR.pedraVermelha);
  if (st.eyes === 'closed') s += `<path d="M-36 -16 q18 14 34 0" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  else if (st.eyes === 'happy') s += `<path d="M-36 -10 q18 -20 34 0" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  else s += `<g transform="translate(-18 -16)"><ellipse rx="20" ry="23" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="-3" r="13" fill="#6B4226"/><circle cx="-3" r="6.5" fill="#1b2238"/><circle cx="-8" cy="-7" r="4.5" fill="#fff"/></g>`;
  s += `<path d="M-32 -46 q14 -8 28 -2" stroke="#4a2612" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  s += `<ellipse cx="-40" cy="14" rx="10" ry="6" fill="#FF8FA3" opacity=".5"/>`;
  const ear = Math.sin(t * 4) * 4 + (st.walk != null ? Math.sin(st.walk * Math.PI * 2) * 8 : 0);
  s += `<g transform="translate(40 -30) rotate(${ear})"><path d="M0 -10 q50 10 40 80 q-6 20 -26 4 q-10 -40 -24 -84z" fill="#6E3B1C" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/></g>`;
  s += `</g></g>`;
  return s;
}

// ================================================================ OBJETOS
function pedra(x, y, r, cor, opts = {}) {
  const rot = opts.rot || 0, g = opts.glow;
  let s = `<g transform="translate(${x} ${y}) rotate(${rot})">`;
  if (g) s += `<circle r="${r * 2.2}" fill="url(#brilhoVermelho)" opacity="${g}"/>`;
  s += `<path d="M${-r} ${r * .1} C${-r} ${-r * .8} ${-r * .3} ${-r} ${r * .2} ${-r * .9} C${r * .9} ${-r * .8} ${r * 1.05} ${-r * .1} ${r * .9} ${r * .4} C${r * .75} ${r * .9} ${-r * .6} ${r * .95} ${-r} ${r * .1}Z" fill="${cor}" stroke="${INK}" stroke-width="${Math.max(2.5, r * .14)}" stroke-linejoin="round"/>`;
  s += `<path d="M${-r * .5} ${-r * .35} q${r * .3} ${-r * .3} ${r * .6} ${-r * .3}" stroke="#fff" stroke-width="${Math.max(2, r * .16)}" opacity=".55" fill="none" stroke-linecap="round"/>`;
  if (opts.txt) s += `<text x="0" y="${r * .2}" text-anchor="middle" font-family="Caveat, cursive" font-weight="700" font-size="${opts.fs || r * .32}" fill="#fff" stroke="${INK}" stroke-width="${(opts.fs || r * .32) * .12}" paint-order="stroke">${opts.txt}</text>`;
  if (opts.rabisco) s += `<path d="M${-r * .5} ${r * .1} q${r * .2} ${-r * .1} ${r * .4} 0 t${r * .4} 0 M${-r * .4} ${r * .35} q${r * .2} ${-r * .1} ${r * .4} 0" stroke="#fff" stroke-width="${r * .07}" fill="none" opacity=".8"/>`;
  return s + `</g>`;
}
function pilhaPedras(seed, n, x0, x1, ybase, hmax, rmin = 14, rmax = 26, cor = COR.pedraVermelha, prog = 1) {
  const R = rng(seed); let s = '';
  const items = [];
  for (let i = 0; i < n; i++) { const u = R(), x = lerp(x0, x1, u), hh = hmax * Math.sin(Math.PI * u) * (0.3 + 0.7 * R()); items.push([x, ybase - R() * hh, rmin + R() * (rmax - rmin), R() * 360, R()]); }
  items.sort((a, b) => a[1] - b[1]);
  items.forEach(([x, y, r, rot, rr], i) => { if (i / n <= prog) s += pedra(x, y, r, cor, { rot, rabisco: rr > .55 }); });
  return s;
}
const plim = (x, y, k, cor = '#FFD166') => { // k: 0..1 progresso
  if (k <= 0 || k >= 1) return '';
  const r = 10 + 40 * easeOut(k), o = 1 - k; let s = `<g transform="translate(${x} ${y})" opacity="${o}">`;
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; s += `<line x1="${Math.cos(a) * r * .5}" y1="${Math.sin(a) * r * .5}" x2="${Math.cos(a) * r}" y2="${Math.sin(a) * r}" stroke="${cor}" stroke-width="6" stroke-linecap="round"/>`; }
  return s + `</g>`;
};
function caiPedra(x, y0, y1, k, r, cor) { // pedra caindo com quique
  if (k <= 0) return '';
  const kk = clamp(k / 0.55), y = k < 0.55 ? lerp(y0, y1, kk * kk) : y1 - Math.abs(Math.sin((k - 0.55) / 0.45 * Math.PI)) * 18 * (1 - (k - .55) / .45);
  return pedra(x, y, r, cor, { rot: k * 200 }) + plim(x, y1, (k - 0.5) / 0.4);
}
function luzes(seed, n, x0, x1, y0, y1, t, speed = 60, cor = '#FFE08A') {
  const R = rng(seed); let s = '';
  for (let i = 0; i < n; i++) { const x = lerp(x0, x1, R()), base = lerp(y0, y1, R()), ph = R() * 10, y = base - ((t * speed + ph * 50) % (y1 - y0 + 200)), r = 3 + R() * 5, tw = .5 + .5 * Math.sin(t * 6 + ph * 3); if (y < y0 - 200) continue; s += `<circle cx="${x + Math.sin(t * 2 + ph) * 10}" cy="${y}" r="${r * 2.4}" fill="${cor}" opacity="${.18 * tw}"/><circle cx="${x + Math.sin(t * 2 + ph) * 10}" cy="${y}" r="${r}" fill="${cor}" opacity="${.6 + .4 * tw}"/>`; }
  return s;
}
const etiqueta = (x, y, txt, k = 1, cor = '#E8434F') => { const sc = easeOut(k * 3) * (1 + .15 * Math.sin(clamp(k * 3) * Math.PI)); const w = txt.length * 22 + 40; return `<g transform="translate(${x} ${y}) scale(${sc}) rotate(-4)"><rect x="${-w / 2}" y="-34" width="${w}" height="68" rx="14" fill="#fff" stroke="${INK}" stroke-width="5"/><rect x="${-w / 2}" y="-34" width="${w}" height="20" rx="10" fill="${cor}" stroke="${INK}" stroke-width="5"/><text x="0" y="24" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="34" fill="${INK}">${txt}</text></g>`; };
const balao = (x, y, txt, k = 1, fs = 40) => { const sc = easeOut(k * 4); const w = Math.max(90, txt.length * fs * .62 + 40); return `<g transform="translate(${x} ${y}) scale(${sc})"><path d="M${-w / 2} -40 h${w} q20 0 20 20 v40 q0 20 -20 20 h${-w / 2 + 30} l-24 26 l-2 -26 h${-w / 2 + 6 + 20} q-20 0 -20 -20 v-40 q0 -20 20 -20z" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><text x="10" y="${fs * .38}" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="${fs}" fill="${INK}">${txt}</text></g>`; };
const interrog = (x, y, t) => `<text x="${x}" y="${y + Math.sin(t * 4) * 6}" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="90" fill="#FFD166" stroke="${INK}" stroke-width="6" paint-order="stroke">?</text>`;
const zzz = (x, y, t) => { let s = ''; for (let i = 0; i < 3; i++) { const k = (t * .6 + i / 3) % 1; s += `<text x="${x + k * 50}" y="${y - k * 90}" font-family="Poppins" font-weight="800" font-size="${26 + k * 26}" fill="#fff" opacity="${1 - k}" stroke="${INK}" stroke-width="4" paint-order="stroke">z</text>`; } return s; };
const bolha = (x, y, r, k, conteudo) => { const sc = easeOut(k * 3); return `<g transform="translate(${x} ${y}) scale(${sc})"><circle r="${r + 10}" fill="#fff" opacity=".35"/><clipPath id="bb${Math.round(x)}_${Math.round(y)}"><circle r="${r}"/></clipPath><g clip-path="url(#bb${Math.round(x)}_${Math.round(y)})">${conteudo}</g><circle r="${r}" fill="none" stroke="${INK}" stroke-width="6"/><circle r="${r}" fill="none" stroke="#fff" stroke-width="2" opacity=".6"/></g>`; };
const sepia = s => `<g filter="url(#sepia)">${s}</g>`;

function jornal(x, y, s = 1, fechado = false) {
  if (fechado) return `<g ${T(x, y, s)}><rect x="-80" y="-14" width="160" height="28" rx="4" fill="#F4F1E8" stroke="${INK}" stroke-width="5"/><path d="M-60 0 h120" stroke="#bbb" stroke-width="4"/></g>`;
  return `<g ${T(x, y, s)}><rect x="-130" y="-170" width="260" height="190" rx="6" fill="#F4F1E8" stroke="${INK}" stroke-width="6"/><line x1="0" y1="-170" x2="0" y2="20" stroke="${INK}" stroke-width="3" opacity=".4"/><rect x="-112" y="-150" width="96" height="22" fill="#333"/><rect x="14" y="-150" width="96" height="60" fill="#c9c3b2"/>${[0, 1, 2, 3, 4].map(i => `<path d="M-112 ${-112 + i * 22} h92 M14 ${-72 + i * 18} h96" stroke="#aaa" stroke-width="5"/>`).join('')}</g>`;
}
function paoTriangulo(x, y, s = 1) { return `<g ${T(x, y, s)}><path d="M-110 30 h220 l-40 30 h-140z" fill="#fff" stroke="${INK}" stroke-width="5" opacity=".95"/><path d="M-90 30 L-20 -70 L50 30Z" fill="#F2D29B" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M-72 22 L-20 -50 L32 22Z" fill="#FFF3D6"/><path d="M-50 10 q20 -10 50 0" stroke="#FFD166" stroke-width="10" stroke-linecap="round" fill="none"/><path d="M-10 30 L60 -70 L130 30Z" transform="translate(-20 0)" fill="#F2D29B" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M8 22 L40 -36 L92 22Z" fill="#FFF3D6"/></g>`; }
function bilhete(x, y, s = 1, rot = 0) { return `<g ${T(x, y, s, `rotate(${rot})`)}><rect x="-90" y="-70" width="180" height="140" rx="6" fill="#FFF8C4" stroke="${INK}" stroke-width="5"/><text x="-70" y="-28" font-family="Caveat, cursive" font-size="36" font-weight="700" fill="#2c4f8a">Pai,</text><path d="M-70 0 q20 -8 40 0 t40 0 t40 0 M-70 30 q20 -8 40 0 t40 0" stroke="#2c4f8a" stroke-width="4" fill="none"/></g>`; }
function celular(x, y, s = 1) { return `<g ${T(x, y, s)}><rect x="-50" y="-90" width="100" height="180" rx="16" fill="#2a2a3a" stroke="${INK}" stroke-width="6"/><rect x="-40" y="-74" width="80" height="140" rx="6" fill="#BFE3F2"/><rect x="-30" y="-50" width="50" height="22" rx="10" fill="#fff"/><rect x="-10" y="-14" width="40" height="22" rx="10" fill="#8BD06B"/></g>`; }
function carrinho(x, y, s = 1, cheio = 1, t = 0) { return `<g ${T(x, y, s)}><path d="M-150 -20 l40 -90 h220 l-30 90z" fill="#5FB8A8" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>${pilhaPedras(7, Math.round(26 * cheio), -110, 100, -100, 70, 14, 22)}<line x1="80" y1="-30" x2="180" y2="10" stroke="#8a5a3c" stroke-width="12" stroke-linecap="round"/><line x1="-80" y1="-30" x2="-140" y2="40" stroke="#8a5a3c" stroke-width="10"/><circle cx="-60" cy="30" r="34" fill="#333" stroke="${INK}" stroke-width="6"/><circle cx="-60" cy="30" r="12" fill="#aaa"/></g>`; }
function mochila(x, y, s = 1) { return `<g ${T(x, y, s)}><rect x="-70" y="-90" width="140" height="170" rx="36" fill="#F2B33D" stroke="${INK}" stroke-width="6"/><rect x="-46" y="0" width="92" height="56" rx="14" fill="#E59A1F" stroke="${INK}" stroke-width="5"/>${pilhaPedras(11, 9, -50, 50, -80, 40, 12, 18)}</g>`; }
function lanterna(x, y, s = 1, rot = 0) { return `<g ${T(x, y, s, `rotate(${rot})`)}><rect x="-14" y="-10" width="70" height="28" rx="6" fill="#E8434F" stroke="${INK}" stroke-width="5"/><path d="M-14 -16 h-24 v40 h24z" fill="#ddd" stroke="${INK}" stroke-width="5"/></g>`; }
function cadeado(x, y, s = 1) { return `<g ${T(x, y, s)}><path d="M-40 -10 v-40 a40 40 0 0 1 80 0 v40" fill="none" stroke="#8a8a8a" stroke-width="16"/><path d="M-40 -10 v-40 a40 40 0 0 1 80 0 v40" fill="none" stroke="${INK}" stroke-width="4"/><rect x="-62" y="-14" width="124" height="104" rx="14" fill="#B5763A" stroke="${INK}" stroke-width="6"/><circle cx="0" cy="26" r="12" fill="#3a2a1a"/><rect x="-5" y="30" width="10" height="28" fill="#3a2a1a"/><circle cx="-36" cy="70" r="10" fill="#7a4a1a" opacity=".6"/><circle cx="30" cy="0" r="7" fill="#7a4a1a" opacity=".6"/></g>`; }
function bebe(x, y, s = 1) { return `<g ${T(x, y, s)}><ellipse cx="0" cy="40" rx="70" ry="80" fill="#FCE3E3" stroke="${INK}" stroke-width="6"/><circle cx="0" cy="-40" r="56" fill="#F6CDA8" stroke="${INK}" stroke-width="6"/><path d="M-26 -44 q8 -8 16 0 M10 -44 q8 -8 16 0" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-10 -18 q10 8 20 0" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M-6 -96 q10 -14 16 4" stroke="${INK}" stroke-width="4" fill="none"/><ellipse cx="-30" cy="-26" rx="10" ry="6" fill="#FF8FA3" opacity=".6"/><ellipse cx="30" cy="-26" rx="10" ry="6" fill="#FF8FA3" opacity=".6"/></g>`; }

// ================================================================ CENÁRIOS
function ceu(c1, c2) { return `<defs><linearGradient id="ceu${c1.slice(1)}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect x="-300" y="-300" width="${W + 600}" height="${H + 600}" fill="url(#ceu${c1.slice(1)})"/>`; }
function casinhas(seed, y, noite = false) {
  const R = rng(seed), cores = noite ? ['#4B4A8A', '#5B4F95', '#3E5E8F', '#6A5598', '#46407A'] : ['#F6C177', '#F49AB0', '#8FD3E8', '#C6A6E8', '#F7E07A', '#A8DDB5'];
  let s = '', x = -60;
  while (x < W + 60) {
    const w = 110 + R() * 70, h = 170 + R() * 160, c = cores[Math.floor(R() * cores.length)];
    s += `<rect x="${x}" y="${y - h}" width="${w}" height="${h + 20}" fill="${c}" stroke="${INK}" stroke-width="4"/>`;
    if (R() > .45) s += `<path d="M${x - 8} ${y - h} L${x + w / 2} ${y - h - 50} L${x + w + 8} ${y - h}Z" fill="${noite ? '#2B2D5C' : '#E06B5A'}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
    else s += `<rect x="${x - 6}" y="${y - h - 14}" width="${w + 12}" height="16" fill="${c}" stroke="${INK}" stroke-width="4"/>`;
    for (let yy = y - h + 26; yy < y - 70; yy += 64) for (let xx = x + 16; xx < x + w - 34; xx += 44) {
      const lit = noite && R() > .45;
      s += `<rect x="${xx}" y="${yy}" width="28" height="38" rx="3" fill="${noite ? (lit ? '#FFD97A' : '#2a2f55') : '#E9F6FF'}" stroke="${INK}" stroke-width="3"/>`;
    }
    s += `<rect x="${x + w / 2 - 20}" y="${y - 64}" width="40" height="64" rx="4" fill="${noite ? '#2a2550' : '#8a5a3c'}" stroke="${INK}" stroke-width="3"/>`;
    x += w;
  }
  return s;
}
function arvore(x, y, s = 1, noite = false) { return `<g ${T(x, y, s)}><rect x="-14" y="-140" width="28" height="140" fill="#8a5a3c" stroke="${INK}" stroke-width="5"/><circle cx="0" cy="-190" r="80" fill="${noite ? '#2F5E5A' : '#6CC27A'}" stroke="${INK}" stroke-width="6"/><circle cx="-24" cy="-214" r="22" fill="#fff" opacity=".15"/></g>`; }
function poste(x, y, s = 1, aceso = false) { return `<g ${T(x, y, s)}>${aceso ? `<circle cx="0" cy="-300" r="90" fill="#FFE08A" opacity=".18"/>` : ''}<rect x="-6" y="-290" width="12" height="290" fill="#3a3f5c" stroke="${INK}" stroke-width="3"/><path d="M-24 -290 h48 l-10 -34 h-28z" fill="${aceso ? '#FFE08A' : '#E9F6FF'}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/></g>`; }
function banco(x, y, s = 1, afunda = 0) { return `<g ${T(x, y, s)}><path d="M-130 ${-60 + afunda} Q0 ${-60 + afunda * 2.2} 130 ${-60 + afunda}" stroke="${INK}" stroke-width="30" fill="none"/><path d="M-130 ${-60 + afunda} Q0 ${-60 + afunda * 2.2} 130 ${-60 + afunda}" stroke="#B8733F" stroke-width="20" fill="none"/><rect x="-130" y="-140" width="260" height="20" rx="6" fill="#B8733F" stroke="${INK}" stroke-width="5"/><rect x="-112" y="-60" width="14" height="60" fill="#3a3f5c"/><rect x="98" y="-60" width="14" height="60" fill="#3a3f5c"/></g>`; }
function praca(t, noite = false) {
  let s = noite ? ceu('#2B2D5C', '#4B4A8A') : ceu('#A8DCF0', '#E3F4FA');
  if (!noite) s += `<circle cx="470" cy="130" r="50" fill="#FFE08A" opacity=".9"/>`;
  else s += `<circle cx="460" cy="120" r="40" fill="#F4F1D0"/>`;
  s += casinhas(5, 640, noite);
  s += `<rect x="-300" y="640" width="${W + 600}" height="700" fill="${noite ? '#3a3a6a' : '#EBD9BC'}" stroke="${INK}" stroke-width="4"/>`;
  for (let x = -300; x < W + 300; x += 72) s += `<line x1="${x}" y1="640" x2="${x - 60}" y2="1400" stroke="${noite ? '#2f2f5a' : '#d8c3a0'}" stroke-width="3"/>`;
  s += arvore(60, 700, .9, noite) + arvore(520, 690, .8, noite) + poste(150, 680, .8, noite) + poste(430, 680, .8, noite);
  return s;
}
function fachadaCasa(t, hora = 'dia') { // casa azul do Nico com portão
  const n = hora === 'noite', tarde = hora === 'tarde';
  let s = n ? ceu('#2B2D5C', '#4B4A8A') : tarde ? ceu('#F59E6B', '#FCD9A6') : ceu('#A8DCF0', '#E3F4FA');
  if (tarde) s += `<circle cx="120" cy="560" r="70" fill="#FFD97A" opacity=".9"/>`;
  s += `<rect x="-300" y="300" width="300" height="400" fill="${n ? '#3E3E70' : '#F6C177'}" stroke="${INK}" stroke-width="4"/><rect x="576" y="260" width="300" height="440" fill="${n ? '#45407A' : '#C6A6E8'}" stroke="${INK}" stroke-width="4"/>`;
  s += `<rect x="40" y="300" width="496" height="400" fill="${n ? '#3B5A8F' : '#7DB7E8'}" stroke="${INK}" stroke-width="6"/>`;
  s += `<path d="M20 300 L288 140 L556 300Z" fill="${n ? '#5a2f3a' : '#E06B5A'}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
  s += `<rect x="90" y="370" width="110" height="100" rx="6" fill="${n ? '#FFD97A' : '#E9F6FF'}" stroke="${INK}" stroke-width="5"/><path d="M145 370 v100 M90 420 h110" stroke="${INK}" stroke-width="4"/>`;
  s += `<rect x="376" y="370" width="110" height="100" rx="6" fill="${n ? '#2a2f55' : '#E9F6FF'}" stroke="${INK}" stroke-width="5"/><path d="M431 370 v100 M376 420 h110" stroke="${INK}" stroke-width="4"/>`;
  s += `<rect x="243" y="500" width="90" height="200" rx="6" fill="#8a5a3c" stroke="${INK}" stroke-width="5"/><circle cx="318" cy="600" r="7" fill="#FFD166" stroke="${INK}" stroke-width="3"/>`;
  s += `<rect x="-300" y="700" width="${W + 600}" height="700" fill="${n ? '#3a3a6a' : '#D9C7A8'}" stroke="${INK}" stroke-width="4"/>`;
  // muro e portão
  s += `<rect x="-300" y="760" width="${W + 600}" height="60" fill="${n ? '#5a5a8a' : '#F3E6D2'}" stroke="${INK}" stroke-width="4"/>`;
  for (let x = 200; x <= 376; x += 22) s += `<rect x="${x}" y="700" width="10" height="120" fill="#3a3f5c" stroke="${INK}" stroke-width="2"/>`;
  s += `<rect x="196" y="700" width="190" height="12" fill="#3a3f5c"/>`;
  return s;
}
function cozinha(t, hora = 'manha') {
  const n = hora === 'noite', aman = hora === 'amanhecer';
  let s = `<rect x="-300" y="-300" width="${W + 600}" height="1100" fill="${n ? '#5E5A86' : '#F7E7B4'}"/>`;
  for (let y = 420; y < 760; y += 40) for (let x = -300; x < W + 300; x += 40) s += `<rect x="${x + 2}" y="${y + 2}" width="36" height="36" fill="${n ? '#6A6694' : '#FFF6DA'}" opacity=".7"/>`;
  s += `<rect x="330" y="140" width="190" height="200" rx="8" fill="${n ? '#2B2D5C' : aman ? '#FCC08A' : '#BFE3F2'}" stroke="${INK}" stroke-width="6"/><path d="M425 140 v200 M330 240 h190" stroke="${INK}" stroke-width="5"/>`;
  if (n) s += `<circle cx="470" cy="190" r="22" fill="#F4F1D0"/>`;
  s += `<g transform="translate(130 200)"><circle r="56" fill="#fff" stroke="${INK}" stroke-width="6"/><line x1="0" y1="0" x2="0" y2="-36" stroke="${INK}" stroke-width="6" stroke-linecap="round" transform="rotate(${t * 40})"/><line x1="0" y1="0" x2="24" y2="0" stroke="${INK}" stroke-width="6" stroke-linecap="round"/></g>`;
  s += `<rect x="-300" y="800" width="${W + 600}" height="600" fill="${n ? '#4a4670' : '#D9B98A'}" stroke="${INK}" stroke-width="4"/>`;
  return s;
}
const mesa = (x, y, w = 520) => `<rect x="${x - w / 2}" y="${y}" width="${w}" height="34" rx="8" fill="#B8733F" stroke="${INK}" stroke-width="6"/><rect x="${x - w / 2 + 30}" y="${y + 30}" width="22" height="230" fill="#8a5a3c" stroke="${INK}" stroke-width="5"/><rect x="${x + w / 2 - 52}" y="${y + 30}" width="22" height="230" fill="#8a5a3c" stroke="${INK}" stroke-width="5"/><rect x="${x - w / 2 - 10}" y="${y - 6}" width="${w + 20}" height="14" rx="6" fill="#E8434F" opacity=".9"/>`;
function escola(t) {
  let s = ceu('#A8DCF0', '#E3F4FA');
  s += `<rect x="-300" y="180" width="${W + 600}" height="520" fill="#F4B59A" stroke="${INK}" stroke-width="5"/>`;
  for (let x = -260; x < W + 260; x += 120) s += `<rect x="${x}" y="240" width="70" height="90" rx="4" fill="#E9F6FF" stroke="${INK}" stroke-width="4"/><rect x="${x}" y="390" width="70" height="90" rx="4" fill="#E9F6FF" stroke="${INK}" stroke-width="4"/>`;
  s += `<rect x="190" y="130" width="196" height="60" rx="8" fill="#fff" stroke="${INK}" stroke-width="5"/><text x="288" y="172" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="34" fill="${INK}">ESCOLA</text>`;
  s += `<rect x="-300" y="700" width="${W + 600}" height="700" fill="#E6D3B3" stroke="${INK}" stroke-width="4"/>`;
  return s;
}
function quarto(t) {
  let s = `<rect x="-300" y="-300" width="${W + 600}" height="1100" fill="#C9B6E8"/>`;
  for (let x = -300; x < W + 300; x += 60) s += `<rect x="${x}" y="-300" width="26" height="1100" fill="#D4C3EE"/>`;
  s += `<rect x="-300" y="800" width="${W + 600}" height="600" fill="#9C84C9" stroke="${INK}" stroke-width="4"/>`;
  return s;
}
function espelho(x, y, s = 1, reflexo = '') { return `<g ${T(x, y, s)}><rect x="-130" y="-260" width="260" height="380" rx="120" fill="#F2C14E" stroke="${INK}" stroke-width="8"/><clipPath id="esp"><rect x="-108" y="-238" width="216" height="336" rx="100"/></clipPath><rect x="-108" y="-238" width="216" height="336" rx="100" fill="#CDEBF5"/><g clip-path="url(#esp)">${reflexo}</g><path d="M-70 -180 l40 -30 M-80 -140 l70 -50" stroke="#fff" stroke-width="10" opacity=".55" stroke-linecap="round"/><rect x="-108" y="-238" width="216" height="336" rx="100" fill="none" stroke="${INK}" stroke-width="5"/></g>`; }
function salaEscada(t) {
  let s = `<rect x="-300" y="-300" width="${W + 600}" height="1300" fill="#3E3A6E"/>`;
  s += `<rect x="60" y="120" width="140" height="180" rx="6" fill="#2B2D5C" stroke="${INK}" stroke-width="5"/><circle cx="160" cy="170" r="18" fill="#F4F1D0"/><path d="M60 210 h140 M130 120 v180" stroke="${INK}" stroke-width="4"/>`;
  s += `<path d="M260 200 L60 200" stroke="none"/>`;
  // escada subindo para a direita
  for (let i = 0; i < 7; i++) s += `<rect x="${230 + i * 50}" y="${780 - i * 70}" width="${W + 300 - 230 - i * 50}" height="70" fill="${i % 2 ? '#6B5598' : '#7A64A8'}" stroke="${INK}" stroke-width="5"/>`;
  s += `<path d="M230 700 L600 210" stroke="#8a5a3c" stroke-width="14"/>${[0, 1, 2, 3, 4, 5].map(i => `<line x1="${250 + i * 60}" y1="${780 - i * 80}" x2="${250 + i * 60}" y2="${690 - i * 80}" stroke="#8a5a3c" stroke-width="8"/>`).join('')}`;
  s += `<rect x="-300" y="850" width="${W + 600}" height="600" fill="#2f2b58" stroke="${INK}" stroke-width="4"/>`;
  return s;
}
function corredor(t) {
  let s = `<rect x="-300" y="-300" width="${W + 600}" height="1700" fill="#1f1f3f"/>`;
  s += `<path d="M-300 -300 L200 380 L376 380 L876 -300Z" fill="#2a2a50"/><path d="M-300 1400 L200 640 L376 640 L876 1400Z" fill="#26264a"/>`;
  s += `<rect x="200" y="380" width="176" height="260" fill="#171733" stroke="${INK}" stroke-width="4"/>`;
  for (const [x, y] of [[60, 300], [480, 300]]) s += `<rect x="${x - 30}" y="${y}" width="60" height="80" rx="4" fill="#3a3a6a" stroke="${INK}" stroke-width="3"/>`;
  return s;
}
function garagem(t, luz = 'noite') { // 'noite' | 'acesa' | 'amanhecer'
  const ac = luz === 'acesa', am = luz === 'amanhecer';
  let s = `<rect x="-300" y="-300" width="${W + 600}" height="1100" fill="${ac ? '#B9A57E' : am ? '#E9B48C' : '#2E3B66'}"/>`;
  for (let x = -300; x < W + 300; x += 90) s += `<rect x="${x}" y="-300" width="88" height="1100" fill="none" stroke="${ac ? '#a8946e' : am ? '#d9a07a' : '#26335a'}" stroke-width="4"/>`;
  s += `<rect x="350" y="110" width="170" height="120" rx="6" fill="${am ? '#FFB36B' : ac ? '#3a3a6a' : '#1f2550'}" stroke="${INK}" stroke-width="5"/><path d="M435 110 v120" stroke="${INK}" stroke-width="4"/>`;
  if (am) s += `<circle cx="470" cy="210" r="34" fill="#FFE08A"/>`;
  s += `<rect x="20" y="230" width="190" height="16" fill="#8a5a3c" stroke="${INK}" stroke-width="4"/><rect x="40" y="190" width="40" height="40" fill="#E8434F" stroke="${INK}" stroke-width="3"/><rect x="100" y="200" width="60" height="30" fill="#5FB8A8" stroke="${INK}" stroke-width="3"/>`;
  s += `<rect x="-300" y="800" width="${W + 600}" height="600" fill="${ac ? '#8E8166' : am ? '#C9906C' : '#232D52'}" stroke="${INK}" stroke-width="4"/>`;
  if (ac) s += `<path d="M288 -40 L120 800 L456 800Z" fill="#FFF3C4" opacity=".25"/><rect x="250" y="-60" width="76" height="40" fill="#FFF3C4" stroke="${INK}" stroke-width="4"/>`;
  return s;
}
function armario(x, y, s = 1, abre = 0, luz = 0) {
  let r = `<g ${T(x, y, s)}><rect x="-150" y="-460" width="300" height="460" rx="8" fill="#7A5235" stroke="${INK}" stroke-width="7"/>`;
  r += `<rect x="-136" y="-446" width="272" height="432" fill="#2a1a10"/>`;
  if (luz) r += `<rect x="-136" y="-446" width="272" height="432" fill="#FF5A6E" opacity="${luz * .8}"/><circle cx="0" cy="-230" r="${200 * luz}" fill="#FF8A9A" opacity="${luz * .5}"/>`;
  const a = abre * 80;
  r += `<g transform="translate(-136 0) scale(${Math.cos(a * Math.PI / 180)} 1)"><rect x="0" y="-446" width="136" height="432" fill="#8E6240" stroke="${INK}" stroke-width="5"/><rect x="16" y="-420" width="104" height="170" fill="none" stroke="#6a4428" stroke-width="5"/><rect x="16" y="-220" width="104" height="180" fill="none" stroke="#6a4428" stroke-width="5"/><circle cx="118" cy="-240" r="8" fill="#FFD166" stroke="${INK}" stroke-width="3"/></g>`;
  r += `<g transform="translate(136 0) scale(${-Math.cos(a * Math.PI / 180)} 1)"><rect x="0" y="-446" width="136" height="432" fill="#8E6240" stroke="${INK}" stroke-width="5"/><rect x="16" y="-420" width="104" height="170" fill="none" stroke="#6a4428" stroke-width="5"/><rect x="16" y="-220" width="104" height="180" fill="none" stroke="#6a4428" stroke-width="5"/><circle cx="118" cy="-240" r="8" fill="#FFD166" stroke="${INK}" stroke-width="3"/></g>`;
  if (abre < .1) r += cadeado(0, -250, .45);
  return r + `</g>`;
}
function fundo(c1, c2) { return `<defs><radialGradient id="fd${c1.slice(1)}${c2.slice(1)}" cx=".5" cy=".42" r=".8"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient></defs><rect x="-300" y="-300" width="${W + 600}" height="${H + 600}" fill="url(#fd${c1.slice(1)}${c2.slice(1)})"/>`; }
function bolsoClose(t, cor = '#4F78B8') { // close numa calça jeans com bolso
  return `<rect x="-300" y="-300" width="${W + 600}" height="${H + 600}" fill="${cor}"/>
   ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => `<line x1="${-300 + i * 120}" y1="-300" x2="${-200 + i * 120}" y2="1400" stroke="#fff" opacity=".05" stroke-width="30"/>`).join('')}
   <path d="M90 420 Q288 380 486 420 L470 820 Q288 880 106 820Z" fill="${cor}" stroke="${INK}" stroke-width="8"/>
   <path d="M90 420 Q288 380 486 420" stroke="#F2B33D" stroke-width="5" stroke-dasharray="14 10" fill="none" transform="translate(0 18)"/>
   <path d="M106 820 Q288 880 470 820" stroke="#F2B33D" stroke-width="5" stroke-dasharray="14 10" fill="none" transform="translate(0 -18)"/>
   <rect x="-300" y="300" width="${W + 600}" height="18" fill="#3a5a8f" stroke="${INK}" stroke-width="4"/>`;
}

// ================================================================ EP02: sinos, chuva, Bento & cia
const BENTO = { type: 'adult', hairStyle: 'careca', hair: '#E6E6E6', hairDark: '#9a9a9a', browColor: '#F2F2F2', browW: 13, skin: '#E8B48E', skinDark: '#D49E78', eye: '#4a5a6a', shirt: '#8E3B46', sleeve: '#8E3B46', pants: '#5E6470', shoes: '#2a1f18', wrinkles: 1, glasses: '#555' };
const PRIMO = { type: 'kid', hairStyle: 'curto', hair: '#C9A15A', hairDark: '#8a6a30', skin: '#F6D3B3', skinDark: '#E9BC98', eye: '#4F7FC4', shirt: '#5FB8A8', sleeve: '#5FB8A8', pants: '#3E5C8C', shoes: '#E8434F' };
const TIA = { type: 'adult', hairStyle: 'rabo', hair: '#C9A15A', hairDark: '#8a6a30', skin: '#F6D3B3', skinDark: '#E9BC98', eye: '#4F7FC4', shirt: '#E07A9B', sleeve: '#E07A9B', pants: '#3a3f5c', shoes: '#333', accent: '#FFD166' };
function sino(x, y, s = 1, swing = 0, meia = false, cor = '#F2C14E') { // swing em graus
  let r = `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-30" y="-18" width="60" height="12" rx="4" fill="#6B4226" stroke="${INK}" stroke-width="4"/><g transform="rotate(${swing} 0 -6)">`;
  r += `<path d="M0 -6 v10" stroke="${INK}" stroke-width="5"/><path d="M-34 52 Q-34 4 0 4 Q34 4 34 52 L40 60 L-40 60Z" fill="${cor}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
  r += `<path d="M-18 46 Q-18 18 -4 14" stroke="#fff" stroke-width="5" opacity=".5" fill="none" stroke-linecap="round"/><circle cx="${swing * -.4}" cy="66" r="9" fill="#8a5a1a" stroke="${INK}" stroke-width="4"/>`;
  if (meia) r += `<path d="M-40 14 Q0 -4 40 14 L44 58 Q0 70 -44 58Z" fill="#fff" stroke="${INK}" stroke-width="4"/>${[0, 1, 2].map(i => `<path d="M${-42 + i} ${24 + i * 13} Q0 ${10 + i * 13} ${42 - i} ${24 + i * 13}" stroke="#E8434F" stroke-width="6" fill="none"/>`).join('')}<path d="M30 10 q30 -10 40 14 q-14 6 -30 0z" fill="#fff" stroke="${INK}" stroke-width="4"/>`;
  return r + `</g></g>`;
}
const balanco = (t, forca = 1, vel = 9) => Math.sin(t * vel) * 24 * forca;
function ondasSom(x, y, t, forca = 1, cor = '#FFD166') { if (forca <= 0) return ''; let s = '';
  for (let i = 0; i < 3; i++) { const k = (t * 1.8 + i / 3) % 1, r = 30 + k * 90 * forca;
    s += `<path d="M${x - r} ${y - r * .3} Q${x - r * 1.15} ${y} ${x - r} ${y + r * .3}" stroke="${cor}" stroke-width="6" fill="none" opacity="${(1 - k) * forca}" stroke-linecap="round"/><path d="M${x + r} ${y - r * .3} Q${x + r * 1.15} ${y} ${x + r} ${y + r * .3}" stroke="${cor}" stroke-width="6" fill="none" opacity="${(1 - k) * forca}" stroke-linecap="round"/>`; }
  return s; }
function casaFrente(x, y, w, h, cor, o = {}) { // casa de frente com porta e sino; origem = chão no centro
  const n = o.noite; let s = `<g transform="translate(${x} ${y})">`;
  s += `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="${cor}" stroke="${INK}" stroke-width="5"/>`;
  s += `<path d="M${-w / 2 - 16} ${-h} L0 ${-h - w * .42} L${w / 2 + 16} ${-h}Z" fill="${o.telhado || (n ? '#3a2f5a' : '#E06B5A')}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
  for (const sx of [-1, 1]) s += `<rect x="${sx * w * .3 - 32}" y="${-h * .78}" width="64" height="72" rx="5" fill="${o.luz ? '#FFD97A' : n ? '#2a2f55' : '#E9F6FF'}" stroke="${INK}" stroke-width="4"/><path d="M${sx * w * .3} ${-h * .78} v72 M${sx * w * .3 - 32} ${-h * .78 + 36} h64" stroke="${INK}" stroke-width="3"/>`;
  s += `<rect x="-42" y="-150" width="84" height="150" rx="6" fill="${o.porta || '#8a5a3c'}" stroke="${INK}" stroke-width="5"/><circle cx="26" cy="-72" r="6" fill="#FFD166" stroke="${INK}" stroke-width="3"/>`;
  s += sino(0, -186, .8, o.swing || 0, o.meia, o.corSino);
  if (o.placa) s += `<rect x="-50" y="-232" width="100" height="26" rx="6" fill="#fff" stroke="${INK}" stroke-width="3"/><text x="0" y="-213" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="16" fill="${INK}">${o.placa}</text>`;
  if (o.ondas) s += ondasSom(0, -150, o.t || 0, o.ondas);
  return s + `</g>`;
}
function chuva(t, dens = 1, op = .55) { const R = rng(77); let s = ''; const n = Math.round(90 * dens);
  for (let i = 0; i < n; i++) { const x0 = R() * 900 - 160, v = 900 + R() * 500, y = ((R() * 1500 + t * v) % 1500) - 250, x = x0 - (y + 250) * .18; s += `<line x1="${x}" y1="${y}" x2="${x - 8}" y2="${y + 42}" stroke="#CFE3FF" stroke-width="3" stroke-linecap="round" opacity="${op}"/>`; }
  return s; }
const raio = (k) => k > 0 && k < .5 ? `<rect x="-400" y="-400" width="1400" height="1900" fill="#fff" opacity="${(1 - k / .5) * .85}"/><path d="M360 -40 L300 180 L350 180 L270 420 L400 150 L340 150 L410 -40Z" fill="#FFF6B0" stroke="#fff" stroke-width="4" opacity="${1 - k / .5}"/>` : '';
const feixe = (x, y, ang, k = 1, comp = 600) => `<g transform="translate(${x} ${y}) rotate(${ang})" opacity="${k}"><path d="M0 -14 L${comp} -150 L${comp} 150 L0 14Z" fill="#FFF3C4" opacity=".3"/><path d="M0 -8 L${comp * .6} -60 L${comp * .6} 60 L0 8Z" fill="#FFF3C4" opacity=".3"/></g>`;
function cama(x, y, s = 1, cor = '#5EC8F2') { return `<g ${T(x, y, s)}><rect x="-200" y="-260" width="40" height="300" rx="10" fill="#B8733F" stroke="${INK}" stroke-width="6"/><rect x="-200" y="-70" width="420" height="80" rx="10" fill="#B8733F" stroke="${INK}" stroke-width="6"/><rect x="-170" y="-110" width="380" height="60" rx="20" fill="#fff" stroke="${INK}" stroke-width="5"/></g>`; }
const cobertor = (x, y, s = 1, cor = '#5EC8F2', puxa = 0) => `<g ${T(x, y, s)}><path d="M-190 ${-150 - puxa} Q20 ${-180 - puxa} 230 ${-140 - puxa} L230 -30 L-190 -30Z" fill="${cor}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>${[0, 1, 2].map(i => `<circle cx="${-120 + i * 120}" cy="${-90 - puxa / 2}" r="14" fill="#fff" opacity=".5"/>`).join('')}</g>`;
const bola = (x, y, r, cor, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><circle r="${r}" fill="${cor}" stroke="${INK}" stroke-width="${Math.max(3, r * .12)}"/><path d="M${-r} 0 Q0 ${r * .5} ${r} 0" stroke="#fff" stroke-width="${r * .14}" fill="none" opacity=".8"/><circle cx="${-r * .35}" cy="${-r * .35}" r="${r * .2}" fill="#fff" opacity=".6"/></g>`;
function carneiro(x, y, s = 1, t = 0) { return `<g ${T(x, y, s)}>${[[-40, -10], [-15, -30], [15, -32], [40, -12], [0, 0], [-25, 10], [25, 10]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="30" fill="#fff" stroke="${INK}" stroke-width="5"/>`).join('')}<rect x="-34" y="20" width="12" height="40" fill="#333"/><rect x="22" y="20" width="12" height="40" fill="#333"/><ellipse cx="-62" cy="-14" rx="24" ry="30" fill="#333" stroke="${INK}" stroke-width="4"/><circle cx="-68" cy="-20" r="5" fill="#fff"/><path d="M-80 4 q8 6 16 0" stroke="#fff" stroke-width="3" fill="none"/></g>`; }
function sala(t, escura = true) { let s = `<rect x="-300" y="-300" width="1176" height="1300" fill="${escura ? '#2f2b4a' : '#E9D3A8'}"/>`;
  s += `<rect x="40" y="200" width="160" height="200" rx="6" fill="${escura ? '#1f1d3a' : '#BFE3F2'}" stroke="${INK}" stroke-width="5"/><path d="M120 200 v200 M40 300 h160" stroke="${INK}" stroke-width="4"/>`;
  s += `<rect x="330" y="230" width="120" height="90" fill="${escura ? '#4a4060' : '#C9A86A'}" stroke="${INK}" stroke-width="5"/><circle cx="390" cy="275" r="26" fill="${escura ? '#6a5a80' : '#F2D29B'}"/>`;
  s += `<path d="M380 520 h170 v-60 q0 -40 -40 -40 h-90 q-40 0 -40 40z" fill="${escura ? '#5a3a4a' : '#B85A5A'}" stroke="${INK}" stroke-width="6"/>`;
  s += `<rect x="-300" y="820" width="1176" height="600" fill="${escura ? '#3a2f3a' : '#B8733F'}" stroke="${INK}" stroke-width="4"/>`; return s; }
const bengala = (x, y, s = 1, rot = 0) => `<g ${T(x, y, s, `rotate(${rot})`)}><path d="M0 0 v-230 q0 -30 30 -30 q30 0 30 30" fill="none" stroke="${INK}" stroke-width="16" stroke-linecap="round"/><path d="M0 0 v-230 q0 -30 30 -30 q30 0 30 30" fill="none" stroke="#8a5a3c" stroke-width="9" stroke-linecap="round"/></g>`;
