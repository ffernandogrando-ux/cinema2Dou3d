// ACERVO · elenco
// Personagens prontos: Dudu (DUDU, DUDU_C), Sofia (SOFIA, SOFIA_PIJ), MULHER, FIG (figurantes), SENHORA11, RICO, CANUDO e poses/estados prontos.
// Carregado pelo motor/render.js quando o cenas.js do episódio declara: //@acervo elenco
// Não copie estas peças para o episódio: importe com //@acervo e, se precisar mudar, mude AQUI (todos os episódios ganham).

// ---------------------------------------------------------------- elenco
const cabeloCurto = (cor) => (r, cy) => `<path d="M${-r * .98} ${cy - r * .05} q0 ${-r * 1.02} ${r * .98} ${-r * 1.02} q${r * .98} 0 ${r * .98} ${r * 1.02} q-${r * .35} -${r * .5} -${r * .98} -${r * .52} q-${r * .62} ${r * .02} -${r * .98} ${r * .52}z" fill="${cor}" stroke="${STK_INK}" stroke-width="5" stroke-linejoin="round"/>`;
function bagLaranja(r, cy, o = {}) { // bag térmica em cima da cabeça (sobre o boné)
  const w = r * 2.15, h = r * 1.25, y = cy - r * 1.02 - h + r * .12;
  return `<g><rect x="${-w / 2}" y="${y}" width="${w}" height="${h}" rx="${r * .14}" fill="#F28C28" stroke="${STK_INK}" stroke-width="5.5"/>`
    + `<rect x="${-w / 2}" y="${y}" width="${w}" height="${h * .26}" rx="${r * .14}" fill="#F7A54A" stroke="${STK_INK}" stroke-width="5.5"/>`
    + `<rect x="${-w * .22}" y="${y + h * .45}" width="${w * .44}" height="${h * .32}" rx="6" fill="#FFF3E0" stroke="${STK_INK}" stroke-width="3.5"/>`
    + `<path d="M${-w * .14} ${y + h * .61} h${w * .28}" stroke="#F28C28" stroke-width="5" stroke-linecap="round"/>`
    + `<path d="M${-w / 2 + 10} ${y + 10} h${w * .3}" stroke="#fff" stroke-width="5" opacity=".35" stroke-linecap="round"/></g>`; }
const DUDU = {
  tipo: 'adulto', pele: '#A9714D', peleLuz: '#C58C66', peleSombra: '#8A5A3C', calca: '#3a3f5c', sapato: '#222',
  camisa: '#D8453B', manga: '#D8453B', sobrancelha: '#2a1a14',
  frente: (r, cy, st) => `<path d="M${-r * .95} ${cy - r * .32} q0 ${-r * .9} ${r * .95} ${-r * .9} q${r * .95} 0 ${r * .95} ${r * .9}z" fill="#2F5D9E" stroke="${STK_INK}" stroke-width="5" stroke-linejoin="round"/>`
    + `<path d="M${r * .2} ${cy - r * .34} q${r * .7} -${r * .05} ${r * 1.15} ${r * .1} l-${r * .05} ${r * .14} q-${r * .6} -${r * .1} -${r * 1.1} -${r * .1}z" fill="#24497d" stroke="${STK_INK}" stroke-width="4.5" stroke-linejoin="round"/>`
    + `<path d="M${-r * .5} ${cy - r * .95} q${r * .25} -${r * .12} ${r * .5} -${r * .05}" stroke="#fff" stroke-width="4" opacity=".3" fill="none" stroke-linecap="round"/>`
    + (st.bag === 'cabeca' ? bagLaranja(r, cy) : ''),
};
const SOFIA = {
  tipo: 'crianca', pele: '#A9714D', peleLuz: '#C58C66', peleSombra: '#8A5A3C', calca: '#A9714D', sapato: '#FFFFFF',
  camisa: '#7EC8E3', manga: '#7EC8E3', saia: '#7EC8E3', bochecha: '#D0505A', sobrancelha: '#1a0f0a',
  atras: (r, cy) => [-1, 1].map(sd => `<circle cx="${sd * r * 1.02}" cy="${cy - r * .5}" r="${r * .4}" fill="#1a0f0a" stroke="${STK_INK}" stroke-width="5"/><circle cx="${sd * r * .8}" cy="${cy - r * .36}" r="${r * .13}" fill="#FF6FA0" stroke="${STK_INK}" stroke-width="3.5"/>`).join(''),
  frente: cabeloCurto('#1a0f0a'),
};
const MULHER = { tipo: 'adulto', pele: '#E2B48C', peleLuz: '#F0C9A6', peleSombra: '#C99A72', calca: '#E2B48C', sapato: '#7a3b2a', camisa: '#F2C14E', manga: '#F2C14E', saia: '#B83A4B', bochecha: '#D0505A',
  roupa: (D, hip, topo) => `<path d="M${-D.ombro - 10} ${topo + 4} q${D.ombro + 10} -10 ${2 * D.ombro + 20} 0 l8 ${hip - topo - 6} q${-D.ombro - 18} 12 ${-2 * D.ombro - 36} 0z" fill="#F2C14E" stroke="${STK_INK}" stroke-width="5" stroke-linejoin="round"/><path d="M-12 ${topo + 2} q12 16 24 0" stroke="${STK_INK}" stroke-width="4" fill="none"/>`,
  frente: (r, cy) => cabeloCurto('#4a2c1c')(r, cy) + `<circle cx="0" cy="${cy - r * 1.05}" r="${r * .38}" fill="#4a2c1c" stroke="${STK_INK}" stroke-width="5"/>` };
const FIG = [
  { tipo: 'adulto', pele: '#E8B48E', camisa: '#4F78B8', manga: '#4F78B8', calca: '#333', frente: cabeloCurto('#2a2633') },
  { tipo: 'alto', pele: '#8A5A3C', camisa: '#EDEDED', manga: '#EDEDED', calca: '#2B2E3F', frente: (r, cy) => `<path d="M-14 ${cy + r * 1.2} l14 30 l14 -30z" fill="#C8102E"/>` },
  { tipo: 'adulto', pele: '#F0C9A8', camisa: '#7A9E7E', manga: '#7A9E7E', calca: '#6B5B4B', frente: cabeloCurto('#C9A15A') },
  { tipo: 'adulto', pele: '#C98E66', camisa: '#9C7CE0', manga: '#9C7CE0', calca: '#3E5C8C', saia: '#3E5C8C', frente: cabeloCurto('#1a1a1a') },
];
// ---------------------------------------------------------------- peças do bloco A
const SENHORA11 = { tipo: 'adulto', pele: '#C98E66', peleLuz: '#DBA27A', peleSombra: '#B57B55', calca: '#8A6FB8', sapato: '#4a2f1d', camisa: '#6FB3D9', manga: '#6FB3D9', bochecha: '#D0505A',
  frente: (r, cy) => cabeloCurto('#D9D9D9')(r, cy) + `<circle cx="0" cy="${cy - r * 1.05}" r="${r * .36}" fill="#D9D9D9" stroke="${STK_INK}" stroke-width="5"/>` };
const RICO = { tipo: 'alto', pele: '#F1D2B6', peleLuz: '#FCE7D4', peleSombra: '#D9B394', calca: '#2B2E3F', sapato: '#111', camisa: '#2B2E3F', manga: '#2B2E3F', mangaLonga: 1, sobrancelha: '#3a2a22', bigode: '#3a2a22',
  roupa: (D, hip, topo) => `<path d="M-14 ${topo + 2} l14 34 l14 -34z" fill="#fff" stroke="${STK_INK}" stroke-width="3.5" stroke-linejoin="round"/><path d="M0 ${topo + 14} l-7 10 l7 48 l7 -48z" fill="#F4C95D" stroke="${STK_INK}" stroke-width="3" stroke-linejoin="round"/>`,
  frente: cabeloCurto('#3a2a22') };
function canudoHomem(x, y, s, t, bandeira = false) { // homem afundado até os olhos; o canudinho sai da lama na frente do rosto e sobe ao lado da bochecha
  const r = 78 * s, sx = x + r * .55, top = y - r * 1.55, ond = Math.sin(t * 3.2) * 14;
  const canudo = `<path d="M${x + r * .2} ${y + 6} Q${sx} ${y - 6} ${sx} ${y - r * .3} L${sx} ${top + 30 * s} q0 -18 ${18 * s} -26" stroke="${STK_INK}" stroke-width="${16 * s}" fill="none" stroke-linecap="round"/><path d="M${x + r * .2} ${y + 6} Q${sx} ${y - 6} ${sx} ${y - r * .3} L${sx} ${top + 30 * s} q0 -18 ${18 * s} -26" stroke="#E8434F" stroke-width="${9 * s}" fill="none" stroke-linecap="round"/>`
    + `<path d="M${sx} ${y - r * .4} V${top + 34 * s}" stroke="#fff" stroke-width="${3 * s}" stroke-dasharray="${8 * s} ${10 * s}" opacity=".8"/>`;
  return stick(CANUDO, { x, y, s, t, afundado: 'olhos', lama: LAMA, olhar: -.15, sobrancelha: 'triste' }) + canudo
    + (bandeira ? `<g transform="translate(${sx + 18 * s} ${top + 4 * s})"><path d="M0 0 v-34" stroke="${STK_INK}" stroke-width="4"/><path d="M0 -34 q${18 + ond * .3} ${4 + ond * .4} ${30} ${10 + ond * .2} q-12 6 -30 6z" fill="#FFD43B" stroke="${STK_INK}" stroke-width="3.5" stroke-linejoin="round"/></g>` : ''); }
const CANUDO = { tipo: 'adulto', pele: '#F0C9A8', peleLuz: '#FADCC0', peleSombra: '#DDB08C', camisa: '#EDEDED', manga: '#EDEDED', calca: '#333', sobrancelha: '#3a2a22', frente: cabeloCurto('#3a2a22') };
// posição da mão direita (para objetos que caem na mão): mesma conta do stick(), sem respiração
function sapatoAfundando(x, y, s, k, t) { const af = 34 * s * k, id = 'spf' + Math.round(x);
  return `<defs><clipPath id="${id}"><rect x="${x - 200}" y="${y - 400}" width="400" height="400"/></clipPath></defs><g clip-path="url(#${id})"><g transform="translate(${x} ${y + af}) scale(${s})"><path d="M-22 -2 q-2 -22 18 -24 h16 q20 4 24 24z" fill="#E8434F" stroke="${STK_INK}" stroke-width="4.5" stroke-linejoin="round"/><path d="M-22 -2 h62" stroke="#fff" stroke-width="6"/><path d="M-6 -20 l14 0 M-4 -14 l14 0" stroke="#fff" stroke-width="3"/></g></g>`
    + (k > .55 ? `<path d="M${x} ${y - 2} q${8 * s} ${-26 * s} ${20 * s} ${-8 * s} q${-12 * s} ${4 * s} ${-6 * s} ${16 * s}" stroke="#fff" stroke-width="${6 * s}" fill="none" stroke-linecap="round"/><path d="M${x} ${y - 2} q${8 * s} ${-26 * s} ${20 * s} ${-8 * s} q${-12 * s} ${4 * s} ${-6 * s} ${16 * s}" stroke="${STK_INK}" stroke-width="${1.6 * s}" fill="none"/>` : '')
    + stkAnel(x + 8 * s, y, 30 * s, t, LAMA, true); }

const polegar = `<path d="M-30 104 q-8 -40 22 -52" stroke="${STK_INK}" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M-30 104 q-8 -40 22 -52" stroke="#A9714D" stroke-width="13" fill="none" stroke-linecap="round"/>`;
function n11() { return '#5a4a52'; }

// ---------------------------------------------------------------- peças do bloco C
const DUDU_C = { ...DUDU, frente: (r, cy, st) => DUDU.frente(r, cy, { ...st, bag: st.bag === 'costas' ? null : st.bag }),
  atras: (r, cy) => '', roupa: (D, hip, topo) => `<path d="M${-D.ombro + 2} ${topo + 6} L${D.ombro - 6} ${hip - 30} M${D.ombro - 2} ${topo + 6} L${-D.ombro + 6} ${hip - 30}" stroke="#F28C28" stroke-width="9" stroke-linecap="round"/>` };
function deitado2D(p, x, y, s, t, o = {}) { return `<g transform="translate(${x} ${y}) rotate(-90)">${stick(p, { x: 0, y: 0, s, t, olhos: 'fechados', boca: 'sorriso', sombra: false, nocheck: true, semCorte: true, ...o })}</g>`; }
function sofiaDormindo2D(x, y, s, t) { const L = 380 * s; return `<g transform="translate(${x} ${y})"><rect x="${-L * .55}" y="${-30 * s}" width="${L * 1.1}" height="${90 * s}" rx="${12 * s}" fill="#EFEBE2" stroke="${STK_INK}" stroke-width="5"/><ellipse cx="${-L * .38}" cy="${-34 * s}" rx="${70 * s}" ry="${34 * s}" fill="#fff" stroke="${STK_INK}" stroke-width="5"/>`
  + deitado2D(SOFIA, L * .5, -30 * s, s * .62, t) + `<path d="M${-L * .02} ${-40 * s} q${L * .2} ${-26 * s} ${L * .55} ${-6 * s} v${66 * s} h${-L * .55}z" fill="#6FA8DC" stroke="${STK_INK}" stroke-width="5" stroke-linejoin="round"/><text x="${-L * .52}" y="${-110 * s}" font-family="Poppins" font-weight="800" font-size="${34 * s}" fill="#BFE6FF" opacity="${.5 + .5 * Math.sin(t * 2)}">z z</text></g>`; }
function sofiaDormindo3D(t) { const a = MUNDO.proj([-1.1, .55, -1.82]), b = MUNDO.proj([-1.1, .5, -.4]); if (a.atras) return ''; const ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI, len = Math.hypot(b.x - a.x, b.y - a.y);
  const s = len / 380; return `<g transform="translate(${b.x} ${b.y}) rotate(${ang - 90})">${stick(SOFIA, { x: 0, y: 0, s, t, olhos: 'fechados', boca: 'sorriso', sombra: false, nocheck: true, semCorte: true })}</g>`
    + (() => { const c1 = MUNDO.proj([-1.62, .58, -1.35]), c2 = MUNDO.proj([-.58, .58, -1.35]), c3 = MUNDO.proj([-.58, .58, -.18]), c4 = MUNDO.proj([-1.62, .58, -.18]); return `<path d="M${c1.x} ${c1.y} L${c2.x} ${c2.y} L${c3.x} ${c3.y} L${c4.x} ${c4.y}z" fill="#6FA8DC" stroke="${STK_INK}" stroke-width="4" stroke-linejoin="round"/>`; })(); }
function lanternaRosto(x, y, t) { return `<defs><linearGradient id="lz66" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#EAF6FF" stop-opacity=".9"/><stop offset="1" stop-color="#EAF6FF" stop-opacity="0"/></linearGradient></defs><ellipse cx="${x + 40}" cy="${y + 120}" rx="230" ry="260" fill="url(#lz66)" opacity=".45"/>`
  + stick(DUDU_C, { x, y: y + 560, s: 1.3, t, bag: 'costas', olhos: 'arregalados', sobrancelha: 'surpreso', pose: { bD: [35, 95] }, segura: `<g transform="scale(2)">${celularLuz}</g>` }); }
function agachadoCorrente(x, y, s, t) { const pose = { pE: [62, 125], pD: [62, 125], bD: [95, 70], bE: [40, 40], tronco: 8 };
  const D = STK_TIPO.adulto, desce = (D.perna[0] + D.perna[1]) * s * .5; const pe = [x + 70 * s, y - 4];
  return `<path d="M${pe[0]} ${pe[1]} Q${x + 220 * s} ${y - 120 * s} ${x + 190 * s} ${y - 330 * s}" stroke="${STK_INK}" stroke-width="12" fill="none"/><path d="M${pe[0]} ${pe[1]} Q${x + 220 * s} ${y - 120 * s} ${x + 190 * s} ${y - 330 * s}" stroke="#d9c7a0" stroke-width="7" fill="none" stroke-dasharray="14 8"/>`
    + stick(DUDU_C, { x, y: y + desce, s, t, bag: 'costas', pose, olhar: .55, sobrancelha: 'triste' }) + `<ellipse cx="${pe[0]}" cy="${pe[1] - 8}" rx="${26 * s}" ry="${12 * s}" fill="none" stroke="#8a7a62" stroke-width="9"/>` + marca('argola', pe[0], pe[1] - 8, 30); }
function tornozeloArgola(t, tl, panico = false) { const ink = STK_INK, P = DUDU_C, s = 1.3, x = 230, y = 1000, k = Math.sin(tl * 9) * 4;
  const st = { x, y, s, t, bag: 'costas', olhar: .6, sobrancelha: panico ? 'surpreso' : 'triste', olhos: panico ? 'arregalados' : null, boca: panico ? 'o' : null, pose: { bD: [36, 4], bE: [18, -12], tronco: 6 } };
  const m = maoD(DUDU_C, st), an = [m[0] + 14, m[1] + 16 + k], hip = [x + 14 * s, y - 256 * s], jo = [hip[0] + 95, hip[1] - 40];
  const elo = (ex, ey, a) => `<ellipse cx="${ex}" cy="${ey}" rx="15" ry="9" transform="rotate(${a} ${ex} ${ey})" fill="none" stroke="${ink}" stroke-width="10"/><ellipse cx="${ex}" cy="${ey}" rx="15" ry="9" transform="rotate(${a} ${ex} ${ey})" fill="none" stroke="#c9b48c" stroke-width="4.5"/>`;
  let c = ''; for (let i = 0; i < 12; i++) c += elo(an[0] + 24 + i * 22, an[1] + 18 + i * 3 + Math.sin(i) * 3, i % 2 ? 0 : 90);
  const perna = `M${hip[0]} ${hip[1]} Q${jo[0]} ${jo[1]} ${an[0]} ${an[1]}`;
  return stick(DUDU_C, st)
    + `<path d="M-400 ${hip[1] + 20} Q100 ${hip[1] - 10} 300 ${hip[1] + 40} T900 ${hip[1] + 60} V1600 H-400z" fill="#4a1416" stroke="${ink}" stroke-width="6"/>`
    + `<path d="${perna}" stroke="${ink}" stroke-width="44" fill="none" stroke-linecap="round"/><path d="${perna}" stroke="${P.calca}" stroke-width="32" fill="none" stroke-linecap="round"/>`
    + `<path d="M${an[0] - 6} ${an[1] - 18} q46 -6 64 24 q-30 16 -66 8z" fill="${P.sapato}" stroke="${ink}" stroke-width="6"/>`
    + `<ellipse cx="${an[0] - 4}" cy="${an[1]}" rx="14" ry="26" fill="none" stroke="${ink}" stroke-width="12"/><ellipse cx="${an[0] - 4}" cy="${an[1]}" rx="14" ry="26" fill="none" stroke="#a89070" stroke-width="5"/>` + c
    + `<circle cx="${m[0]}" cy="${m[1]}" r="${12 * s}" fill="${P.pele}" stroke="${ink}" stroke-width="5"/>`
    + marca('argola', an[0], an[1], 30) + marca('mao', m[0], m[1], 20); }
const SOFIA_PIJ = { ...SOFIA, camisa: '#F2B8D0', manga: '#F2B8D0', saia: null, calca: '#F2B8D0',
  roupa: (D, hip, topo) => `<path d="M${-D.ombro - 8} ${topo + 4} q${D.ombro + 8} -10 ${2 * D.ombro + 16} 0 l10 ${hip - topo + 14} q${-D.ombro - 18} 10 ${-2 * D.ombro - 36} 0z" fill="#F2B8D0" stroke="${STK_INK}" stroke-width="5" stroke-linejoin="round"/><circle cx="0" cy="${topo + 30}" r="5" fill="#fff"/><circle cx="0" cy="${topo + 52}" r="5" fill="#fff"/>` };
function rostoHorror(t) { return fundoTela('#2a0608') + `<defs><radialGradient id="rv100"><stop offset="0" stop-color="#FF2A2A" stop-opacity=".6"/><stop offset="1" stop-color="#FF2A2A" stop-opacity="0"/></radialGradient></defs><rect x="-400" y="-400" width="1400" height="1900" fill="#C8202A" opacity="${.2 + .08 * Math.sin(t * 10)}"/>`
    + stick(DUDU_C, { x: 288, y: 1260, s: 1.45, t, bag: 'costas', olhos: 'arregalados', semPiscar: true, sobrancelha: 'triste', boca: 'o' }) + `<ellipse cx="288" cy="430" rx="320" ry="300" fill="url(#rv100)" style="mix-blend-mode:screen"/>`; }
