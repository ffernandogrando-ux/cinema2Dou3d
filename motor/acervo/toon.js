// ================================================================ KIT TOON (personagens de corpo inteiro, desenho adulto)
// Gramática do "Sci-Fi Sitcom Toon" (Lemo-Opuscar, MIT no código): contorno grosso escuro de largura constante na tela,
// cor chapada com sombra recortada (sem degradê), olhos brancos grandes de pupila pequena, pálpebra pesada, olheira,
// boca elástica com dentes e língua, membros em "macarrão" grosso. SEM linha tremendo.
// Uso: toon(P, st) — P = ficha do personagem; st = { x, y, s, t, flip, pose... }. Origem nos pés, y para cima negativo.
// Vista de 3/4 olhando para a direita (+x); flip espelha. Altura de um adulto ≈ 600 em s = 1.
const TINK = '#1b1422';
const TLW = 3.6;                       // espessura do contorno, em px de tela (constante em qualquer enquadramento)
let _tN = 0;
const _p = v => v.toFixed(1);
// curva Catmull-Rom → caminho SVG (fechado ou aberto)
function tSpl(c, fechado = true) {
  const n = c.length, P = i => fechado ? c[(i + n) % n] : c[Math.max(0, Math.min(n - 1, i))];
  let d = `M${_p(c[0][0])} ${_p(c[0][1])}`;
  const fim = fechado ? n : n - 1;
  for (let i = 0; i < fim; i++) { const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
    d += ` C${_p(p1[0] + (p2[0] - p0[0]) / 6)} ${_p(p1[1] + (p2[1] - p0[1]) / 6)} ${_p(p2[0] - (p3[0] - p1[0]) / 6)} ${_p(p2[1] - (p3[1] - p1[1]) / 6)} ${_p(p2[0])} ${_p(p2[1])}`; }
  return d + (fechado ? 'Z' : '');
}
const tPoli = c => 'M' + c.map(p => _p(p[0]) + ' ' + _p(p[1])).join(' L') + 'Z';
const tElip = (cx, cy, rx, ry) => `M${_p(cx - rx)} ${_p(cy)} a${_p(rx)} ${_p(ry)} 0 1 0 ${_p(2 * rx)} 0 a${_p(rx)} ${_p(ry)} 0 1 0 ${_p(-2 * rx)} 0Z`;
// forma: preenchimento chapado + sombra recortada dentro + contorno por cima
function tForma(d, cor, sombra = '', lw = TLW) {
  if (!sombra) return `<path d="${d}" fill="${cor}"/><path d="${d}" fill="none" stroke="${TINK}" stroke-width="${lw}" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`;
  const id = 'tc' + (_tN++);
  return `<defs><clipPath id="${id}"><path d="${d}"/></clipPath></defs><path d="${d}" fill="${cor}"/><g clip-path="url(#${id})">${sombra}</g>`
    + `<path d="${d}" fill="none" stroke="${TINK}" stroke-width="${lw}" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`;
}
const tTraco = (d, lw = TLW, cor = TINK) => `<path d="${d}" fill="none" stroke="${cor}" stroke-width="${lw}" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`;
const tPinta = (d, cor, op = 1) => `<path d="${d}" fill="${cor}"${op < 1 ? ` opacity="${op}"` : ''}/>`;
// "macarrão": tubo grosso e curvo de a até b, largura w0 → w1, curvatura bend (px para o lado)
function tMacarrao(a, b, bend, w0, w1) {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
  const m = [(a[0] + b[0]) / 2 + nx * bend, (a[1] + b[1]) / 2 + ny * bend], E = [], D = [];
  for (let i = 0; i <= 6; i++) { const u = i / 6, q = [(1 - u) * (1 - u) * a[0] + 2 * u * (1 - u) * m[0] + u * u * b[0], (1 - u) * (1 - u) * a[1] + 2 * u * (1 - u) * m[1] + u * u * b[1]];
    const tx = 2 * (1 - u) * (m[0] - a[0]) + 2 * u * (b[0] - m[0]), ty = 2 * (1 - u) * (m[1] - a[1]) + 2 * u * (b[1] - m[1]), tl = Math.hypot(tx, ty) || 1, w = (w0 + (w1 - w0) * u) / 2;
    E.push([q[0] - ty / tl * w, q[1] + tx / tl * w]); D.push([q[0] + ty / tl * w, q[1] - tx / tl * w]); }
  const ca = (p, dir, w) => [p[0] + dir[0] * w * .55, p[1] + dir[1] * w * .55];
  return tSpl([...E, ca(b, [dx / L, dy / L], w1), ...D.reverse(), ca(a, [-dx / L, -dy / L], w0)]);
}
// olho grande: lid = fração coberta pela pálpebra de cima; look = [-1..1, -1..1]
function tOlho(cx, cy, rx, ry, o = {}) {
  if (o.fechado) return tTraco(`M${cx - rx * .8} ${cy + ry * .1} Q${cx} ${cy + ry * .55} ${cx + rx * .8} ${cy + ry * .1}`, TLW);
  const lk = o.look || [0, 0], px = cx + lk[0] * rx * .55, py = cy + lk[1] * ry * .5, lid = Math.max(0, Math.min(1, o.lid || 0));
  let sh = `<circle cx="${_p(px)}" cy="${_p(py)}" r="${o.pupila || Math.max(3.2, rx * .15)}" fill="${TINK}"/>`;
  if (lid > 0) { const yl = cy - ry + lid * 2 * ry; sh += tPinta(tPoli([[cx - rx * 1.3, cy - ry * 1.4], [cx + rx * 1.3, cy - ry * 1.4], [cx + rx * 1.3, yl], [cx - rx * 1.3, yl + ry * .08]]), o.pele || '#f2c9a0') + tTraco(`M${cx - rx * 1.2} ${yl + ry * .08} L${cx + rx * 1.2} ${yl}`); }
  if (o.baixo) { const yb = cy + ry - o.baixo * 2 * ry; sh += tPinta(tPoli([[cx - rx * 1.3, yb], [cx + rx * 1.3, yb], [cx + rx * 1.3, cy + ry * 1.4], [cx - rx * 1.3, cy + ry * 1.4]]), o.pele || '#f2c9a0') + tTraco(`M${cx - rx * 1.2} ${yb} L${cx + rx * 1.2} ${yb}`); }
  return tForma(tElip(cx, cy, rx, ry), '#fff', sh);
}
// boca: o = abertura 0..1, sm = cantos (+ sorriso, − tristeza), skew = torta
function tBoca(cx, cy, mw, o = {}) {
  const ab = o.o || 0, sm = o.sm || 0, sk = o.skew || 0, hw = mw * (o.w ?? 1) / 2, k = mw * .22, lc = [cx - hw, cy - sm * k + sk * k], rc = [cx + hw, cy - sm * k - sk * k];
  if (ab < .07) return tTraco(`M${_p(lc[0])} ${_p(lc[1])} Q${cx} ${_p(cy + sm * k * 1.2)} ${_p(rc[0])} ${_p(rc[1])}`) + tTraco(`M${_p(lc[0] - 4)} ${_p(lc[1] - 5 * Math.sign(sm || 1))} L${_p(lc[0] + 3)} ${_p(lc[1] + 3)}`, TLW * .7);
  const h = ab * mw * .62, d = `M${_p(lc[0])} ${_p(lc[1])} Q${cx} ${_p(cy - h * .25 + sm * k * .4)} ${_p(rc[0])} ${_p(rc[1])} Q${cx} ${_p(cy + h + sm * k * .6)} ${_p(lc[0])} ${_p(lc[1])}Z`;
  let sh = '';
  if (ab > .22) sh += tPinta(tPoli([[cx - hw * 1.2, cy - h], [cx + hw * 1.2, cy - h], [cx + hw * 1.2, cy - h * .68 + 6], [cx - hw * 1.2, cy - h * .68 + 6]]), '#fff');
  sh += tPinta(tElip(cx + hw * .15, cy + h * .95, hw * .6, h * .45), '#e8637a');
  return tForma(d, '#4a1a2a', sh);
}
function tMao(x, y, ang, r, cor, punho) {
  const pts = punho ? [[-r * .6, -r * .8], [r * .7, -r * .9], [r * 1.1, -r * .1], [r * .8, r * .8], [-r * .5, r * .9], [-r * .9, 0]]
    : [[-r * .5, -r * .85], [r * .5, -r * 1.05], [r * 1.35, -r * .75], [r * 1.05, -r * .3], [r * 1.5, -r * .1], [r * 1.1, r * .3], [r * 1.35, r * .7], [r * .6, r * .95], [-r * .6, r * .8], [-r * .95, 0]];
  return `<g transform="translate(${_p(x)} ${_p(y)}) rotate(${_p(ang * 180 / Math.PI)})">${tForma(tSpl(pts), cor)}</g>`;
}
// ---------------------------------------------------------------- o personagem
// P: { pele, peleS, alt: 'adulto'|'baixo', barriga 0..1, tronco: {cor, corS, tipo:'regata'|'moletom'|'camiseta'}, calca: {cor, corS, curta}, sapato, sapatoS,
//      cabeca(c) → SVG extra por cima da cabeça (cabelo, chapéu), atras(c) → SVG atrás da cabeça, barba: {cor, corS} | null, sobrancelha: cor, nariz: 'bola'|'reto' }
// st: { x, y, s, t, flip, inclina (rad), cabInc (rad), olhar:[x,y], palpebra, olhos:'fechados'|'arregalados', boca:{o,sm,skew}, sobr (−1..1),
//       bE/bD: {h:[dx,dy], bend, punho}, pE/pD: [dx, dy], segura (SVG na mão da frente), seguraE, walk (fase), semCorte, nocheck }
const T_ALT = { adulto: { hip: -150, omb: -335, cab: -470, larg: 1 }, baixo: { hip: -96, omb: -215, cab: -320, larg: .9 } };
// st.invisivel: só o contorno, tracejado (gag do "faxineiro invisível"); o que estiver dentro de <g class="tSol"> (ex.: o balde em st.segura) fica sólido.
// st.treme: amplitude (px) de um tremido do corpo todo. st.chao: sentado no chão de pernas cruzadas.
const T_INV_CSS = `<style>.tInv path:not(.tSol path),.tInv circle:not(.tSol circle),.tInv ellipse:not(.tSol ellipse){fill:none!important}.tInv path[stroke]:not(.tSol path){stroke-dasharray:11 8;stroke-linecap:round;stroke:#F4F1EA!important;stroke-width:4.4px!important}</style>`;
function toon(P, st = {}) {
  if ((st.invisivel || st.treme) && !st._env) { const tt = Math.floor((st.t || 0) * 24), dx = st.treme ? Math.sin(tt * 2.7) * st.treme : 0, dy = st.treme ? Math.cos(tt * 3.9) * st.treme * .5 : 0;
    const dentro = toon(P, { ...st, _env: 1, sombra: st.invisivel ? false : st.sombra });
    return (st.invisivel ? T_INV_CSS : '') + `<g${st.invisivel ? ' class="tInv"' : ''} transform="translate(${_p(dx)} ${_p(dy)})">${dentro}</g>`; }
  const A0 = T_ALT[P.alt || 'adulto'], dz = A0.hip + (st.chao ? 62 : 125), A = (st.sentado || st.chao) ? { ...A0, hip: -(st.chao ? 62 : 125), omb: A0.omb - dz, cab: A0.cab - dz } : A0, t = st.liso ? (st.t || 0) : Math.floor((st.t || 0) * 12 + 1e-6) / 12, s = st.s || 1, f = st.flip ? -1 : 1, L = A.larg, bar = P.barriga || 0;
  const ag = st.still ? 0 : (st.agito ?? 1), ph = st.ph ?? P.ph ?? 0, resp = Math.sin(t * 2.4 + ph) * 4 * ag, peso = Math.sin(t * 1.1 + ph * 1.7) * 5 * ag;
  const w = st.walk != null ? Math.sin(st.walk * Math.PI * 2) : 0;
  let r = `<g transform="translate(${_p(st.x || 0)} ${_p(st.y || 0)}) scale(${s * f} ${s})">`;
  if (st.sombra !== false) r += `<ellipse cx="0" cy="4" rx="${90 * L}" ry="13" fill="#000" opacity=".18"/>`;
  // pernas
  for (const [sd, pe] of [[-1, st.pE || [0, 0]], [1, st.pD || [0, 0]]]) {
    const hip = [sd * 26 * L, A.hip], ank = st.sentado ? [sd * 16 + 100 + pe[0], -24 + pe[1]] : [sd * 30 * L + pe[0] + w * 26 * sd, -24 + pe[1] - Math.max(0, w * sd) * 14];
    const C = P.calca || { cor: '#3A3F5C', corS: '#2b2f45' };
    if (st.chao) { const jo = [sd * 34 + 92, A.hip - 26 + (sd < 0 ? -8 : 0)], an = [sd * -30 + 36, -16];
      r += tForma(tMacarrao(hip, jo, 0, 44 * L, 40 * L), sd < 0 ? (C.corS || C.cor) : C.cor) + tForma(tMacarrao(jo, an, 0, 38 * L, 34 * L), sd < 0 ? (C.corS || C.cor) : C.cor);
      r += tForma(tSpl([[an[0] - 30, an[1] + 18], [an[0] - 26, an[1] - 4], [an[0] + 4, an[1] - 8], [an[0] + 28, an[1] + 2], [an[0] + 24, an[1] + 18]]), P.sapato || '#3b6fd6'); continue; }
    if (st.sentado) { const jo = [sd * 16 + 96, A.hip + 4]; r += tForma(tMacarrao(hip, jo, 0, 44 * L, 40 * L), sd < 0 ? (C.corS || C.cor) : C.cor) + tForma(tMacarrao(jo, ank, 0, 38 * L, 34 * L), sd < 0 ? (C.corS || C.cor) : C.cor);
      r += tForma(tSpl([[ank[0] - 28, ank[1] + 26], [ank[0] - 24, ank[1] + 2], [ank[0] + 10, ank[1] - 2], [ank[0] + 46, ank[1] + 12], [ank[0] + 40, ank[1] + 28]]), P.sapato || '#3b6fd6'); continue; }
    if (C.curta) { const joelho = [(hip[0] + ank[0]) / 2, (hip[1] + ank[1]) / 2];
      r += tForma(tMacarrao(hip, ank, sd * -4, 30, 26), P.pele) + tForma(tMacarrao(hip, joelho, 0, 46 * L, 44 * L), C.cor, tPinta(`M-200 ${A.hip} h400 v400 h-400z`, C.corS, 0) ); }
    else r += tForma(tMacarrao(hip, ank, sd * -6, 42 * L, 36 * L), C.cor, tPinta(tPoli([[sd < 0 ? -200 : 0, -600], [sd < 0 ? hip[0] - 4 : 200, -600], [sd < 0 ? hip[0] - 4 : 200, 50], [sd < 0 ? -200 : 0, 50]]), C.corS || C.cor, sd < 0 ? 1 : 0));
    if (st.descalco === (sd > 0 ? 'D' : 'E')) { r += tForma(tSpl([[ank[0] - 18, ank[1] + 24], [ank[0] - 16, ank[1] + 4], [ank[0] + 10, ank[1] + 2], [ank[0] + 36, ank[1] + 14], [ank[0] + 32, ank[1] + 26]]), P.pele); continue; }
    r += tForma(tSpl([[ank[0] - 28, ank[1] + 26], [ank[0] - 24, ank[1] + 2], [ank[0] + 10, ank[1] - 2], [ank[0] + 46, ank[1] + 12], [ank[0] + 40, ank[1] + 28]]), P.sapato || '#3b6fd6',
      tPinta(tPoli([[ank[0] - 40, ank[1] + 18], [ank[0] + 60, ank[1] + 18], [ank[0] + 60, ank[1] + 40], [ank[0] - 40, ank[1] + 40]]), P.sapatoS || '#2a52a8'));
  }
  // tronco (inclina em torno do quadril)
  r += `<g transform="rotate(${_p((st.inclina || 0) * 180 / Math.PI + peso * .35)} 0 ${A.hip}) translate(${_p(peso)} ${_p(resp)})">`;
  const omb = A.omb, hip = A.hip, H = hip - omb, ws = 62 * L, ww = (60 + bar * 34) * L, wh = (66 + bar * 20) * L;
  const shB = [-ws + 6, omb + 8], shF = [ws - 8, omb + 10];
  const TR = P.tronco || { cor: '#4C7BD9', corS: '#3A62B8', tipo: 'moletom' };
  const braco = (sh, arm, segura, frente) => { const solto = !arm, bal = Math.sin(t * 2.1 + ph + (sh[0] < 0 ? 1.7 : 0)) * 10 * ag; arm = arm || { h: [sh[0] < 0 ? -44 - bar * 30 : 14, 160], bend: sh[0] < 0 ? -22 : 14 };
    if (solto || ag) arm = { ...arm, h: [arm.h[0] + bal, arm.h[1] - Math.abs(bal) * .3] };
    const hp = [sh[0] + arm.h[0], sh[1] + arm.h[1]], ang = Math.atan2(hp[1] - sh[1], hp[0] - sh[0]); let o = '';
    const manga = TR.tipo === 'moletom' || TR.tipo === 'macacao';
    if (manga) o += tForma(tMacarrao(sh, hp, arm.bend ?? 0, 44 * L, 38 * L), frente ? (TR.manga || TR.cor) : TR.corS);
    else { o += tForma(tMacarrao(sh, hp, arm.bend ?? 0, 30 * L, 26 * L), P.pele);
      if (TR.tipo === 'camiseta') o += tForma(tMacarrao(sh, [sh[0] + arm.h[0] * .3, sh[1] + arm.h[1] * .3], 0, 46 * L, 42 * L), frente ? TR.cor : TR.corS); }
    if (manga) o += tForma(tElip(hp[0] - Math.cos(ang) * 4, hp[1] - Math.sin(ang) * 4, 21 * L, 21 * L), TR.corS);
    o += tMao(hp[0], hp[1], ang, 19 * L, P.mao || P.pele, arm.punho || !!segura);
    if (segura) o += `<g transform="translate(${_p(hp[0])} ${_p(hp[1])})">${segura}</g>`;
    return o; };
  r += braco(shB, st.bE, st.seguraE, false);
  // corpo
  const corpo = tSpl([[-30, omb - 6], [-ws, omb + 10], [-ww - 4, omb + H * .45], [-wh, hip + 6], [0, hip + 16], [wh, hip + 6], [ww + 10 + bar * 22, omb + H * .55], [ws, omb + 12], [30, omb - 6]]);
  let somb = tPinta(tSpl([[-140, omb - 20], [-ws * .55, omb], [-ww * .7, omb + H * .5], [-wh * .6, hip + 30], [-160, hip + 30]]), TR.corS);
  if (TR.tipo === 'regata') somb += tPinta(tSpl([[-34, omb - 10], [-16, omb + 30], [16, omb + 30], [34, omb - 10]]), P.pele);
  if (TR.tipo === 'moletom') somb += tPinta(tSpl([[-36, omb - 4], [0, omb + 26], [36, omb - 4], [0, omb + 8]]), TR.corS) + tPinta(tPoli([[-40, hip - 64], [44, hip - 64], [40, hip - 22], [-36, hip - 22]]), TR.corS);
  if (P.manchas) somb += P.manchas(omb, hip);
  r += tForma(corpo, TR.cor, somb);
  if (TR.tipo === 'moletom' && !TR.semCordao) r += tTraco(`M-12 ${omb + 14} l-4 ${H * .3} M12 ${omb + 14} l4 ${H * .3}`, TLW * .8, '#f4f1ea') + tTraco(`M-40 ${hip - 64} H44 L40 ${hip - 22} H-36Z`, TLW * .8);
  if (TR.tipo === 'regata') r += tTraco(`M-34 ${omb - 8} Q0 ${omb + 40} 34 ${omb - 8}`);
  if (TR.tipo === 'macacao') { if (TR.aberto) r += tForma(`M-26 ${omb - 4} L0 ${omb + H * .45} L26 ${omb - 4}Z`, TR.camisa || '#F4F1EA') + (TR.gravata ? tForma(`M-7 ${omb + 4} L7 ${omb + 4} L10 ${omb + H * .38} L0 ${omb + H * .46} L-10 ${omb + H * .38}Z`, TR.gravata) : '') + tTraco(`M-26 ${omb - 4} L0 ${omb + H * .45} L26 ${omb - 4}`);
    else r += tTraco(`M0 ${omb + 6} V${hip - 6}`, TLW * .7) + tForma(`M-28 ${omb - 4} L-6 ${omb + 26} L-2 ${omb + 4}Z`, TR.corS) + tForma(`M28 ${omb - 4} L6 ${omb + 26} L2 ${omb + 4}Z`, TR.corS);
    r += tForma(tPoli([[16, omb + 46], [46, omb + 46], [46, omb + 76], [16, omb + 76]]), TR.corS); }
  if (TR.detalhe) r += TR.detalhe(omb, hip, st);   // st.flip: quem tem texto deve desvirar (scale(-1 1))
  // pescoço e cabeça
  r += tForma(tMacarrao([14, omb + 4], [24, omb - 34], 4, 30, 30), P.pele);
  const cx = 34, cy = A.cab - A.omb + omb;
  r += `<g transform="translate(${cx} ${_p(cy)}) rotate(${_p(((st.cabInc ?? .06) + Math.sin(t * 1.3 + ph) * .045 * ag + Math.sin(t * 3.1 + ph) * .012 * ag) * 180 / Math.PI)})">` + tCabeca(P, st, t) + `</g>`;
  r += braco(shF, st.bD, st.segura, true);
  r += `</g></g>`;
  if (typeof window !== 'undefined') { const X = st.x || 0, Y = (st.y || 0) + (A.cab - 10) * s;
    if (window._cab && !st.nocheck) window._cab.push({ x: X + cx * s * f, y: Y, r: 95 * s });
    if (window._corpos && !st.semCorte) window._corpos.push({ x: X + cx * s * f, y: Y, r: 95 * s, pe: st.y || 0 }); }
  return r;
}
function tCabeca(P, st, t) {
  const pele = P.pele, peleS = P.peleS || pele;
  let r = P.atras ? P.atras() : '';
  r += tForma(tElip(-70, 6, 17, 25), pele, tPinta(tElip(-66, 8, 7, 13), peleS));                 // orelha
  const HD = tSpl(P.formaCabeca || [[-10, -112], [55, -104], [86, -60], [92, 10], [86, 70], [55, 104], [5, 108], [-45, 90], [-78, 40], [-84, -30], [-58, -90]]);
  let sh = tPinta(tSpl([[-90, -20], [-60, -110], [-100, -120]]), peleS);
  if (P.barbaRala) { sh += tPinta(tSpl([[-40, 30], [20, 48], [92, 30], [96, 120], [-60, 120]]), P.barbaRala);
    for (let i = 0; i < 26; i++) { const a = (Math.sin(i * 12.9898) * 43758.5453) % 1, b = (Math.sin(i * 78.233) * 12543.53) % 1; sh += `<circle cx="${_p(-30 + Math.abs(a) * 120)}" cy="${_p(58 + Math.abs(b) * 44)}" r="1.8" fill="${TINK}" opacity=".35"/>`; } }
  r += tForma(HD, pele, sh);
  // olhos (o da frente maior: vista de 3/4)
  const fp = st.ph ?? P.ph ?? 0, ciclo = (t + fp) % 2.6, pisca = st.olhos === 'fechados' || (!st.semPiscar && (ciclo > 2.48 || (Math.floor((t + fp) / 2.6) % 3 === 1 && ciclo > 1.1 && ciclo < 1.2)));
  const arr = st.olhos === 'arregalados', lid = arr ? 0 : (st.palpebra ?? .4), lk = st.olhar || [0, 0], big = arr ? 1.12 : 1;
  r += tOlho(8, -10, 32 * big, 35 * big, { lid, look: lk, fechado: pisca, pele, pupila: arr ? 3.6 : 4.5 });
  r += tOlho(58, -12, 25 * big, 30 * big, { lid, look: lk, fechado: pisca, pele, pupila: arr ? 3.2 : 4 });
  for (const [ex, rx] of [[8, 26], [58, 20]]) r += tTraco(`M${ex - rx * .8} ${30} Q${ex} ${38} ${ex + rx * .8} ${30}`, TLW * .7);   // olheiras
  const br = st.sobr ?? 0, by = -48 - br * 10, bc = P.sobrancelha || '#3a3340';
  r += tForma(tSpl([[-24, by + 6 + br * 4], [10, by - 6], [40, by - 2 + br * 5], [90, by - 8], [94, by + 6], [40, by + 12 + br * 5], [8, by + 8], [-22, by + 16 + br * 4]]), bc);
  if (P.barba) r += tForma(tSpl([[-62, 36], [-30, 60], [10, 64], [50, 58], [90, 34], [96, 70], [70, 118], [20, 138], [-30, 124], [-60, 84]]), P.barba.cor, tPinta(tSpl([[-80, 40], [-40, 70], [-30, 140], [-90, 140]]), P.barba.corS || P.barba.cor));
  r += tForma(tSpl(P.nariz === 'reto' ? [[40, -10], [56, 22], [72, 36], [58, 44], [40, 40]] : [[34, -12], [46, 18], [70, 36], [64, 54], [40, 50], [30, 36]]), pele, tPinta(tElip(62, 48, 14, 8), peleS));
  const fala = typeof stkFalaAgora === 'function' && stkFalaAgora(st);
  const b = { ...(st.boca || {}) }; if (fala) { const vr = typeof VOZ_RMS !== 'undefined' ? VOZ_RMS[Math.floor(t * 24)] : null; b.o = vr != null ? (vr < .12 ? 0 : .15 + .8 * vr) : .25 + .5 * Math.abs(Math.sin(t * 13)); if (typeof window !== 'undefined') window._falou = true; }
  if (b.sm == null) b.sm = -.3;
  r += tBoca(40 + (b.skew || 0) * 6, 82, 60, b);
  if (P.bigode) r += tForma(tSpl([[6, 62], [40, 54], [76, 60], [70, 72], [40, 68], [12, 74]]), P.bigode);
  if (P.cabeca) r += P.cabeca(st);
  if (st.mascara) r += tMascaraPorco(st.mascara, fala ? (b.o || 0) : 0, { lid, lk, pisca, arr });
  if (P.oculos) r += tOculos(P.oculos);
  return r;
}

// ---------------------------------------------------------------- acabamento de cenário (cor chapada, sem degradê)
// parede com juntas verticais e rodapé de 2 linhas; chão com faixa clara junto ao rodapé. yChao = linha do chão
function paredeToon(cor, corS, yChao, o = {}) { const passo = o.passo || 140, x0 = o.x0 ?? -400, x1 = o.x1 ?? 1000; let r = `<rect x="${x0}" y="-400" width="${x1 - x0}" height="${yChao + 400}" fill="${cor}"/>`;
  for (let x = x0 + (o.fase || 60); x < x1; x += passo) r += `<path d="M${x} -400 V${yChao - 30}" stroke="${corS}" stroke-width="4"/>`;
  r += `<rect x="${x0}" y="${yChao - 30}" width="${x1 - x0}" height="30" fill="${corS}"/>` + tTraco(`M${x0} ${yChao - 30} H${x1}`, TLW) + tTraco(`M${x0} ${yChao - 18} H${x1}`, TLW * .6);
  return r; }
function chaoToon(cor, corS, yChao, o = {}) { const x0 = o.x0 ?? -400, x1 = o.x1 ?? 1000;
  return `<rect x="${x0}" y="${yChao}" width="${x1 - x0}" height="1200" fill="${cor}"/><rect x="${x0}" y="${yChao}" width="${x1 - x0}" height="22" fill="${o.faixa || '#ffffff'}" opacity=".18"/>`
    + tTraco(`M${x0} ${yChao} H${x1}`, TLW) + (o.tabuas ? [1, 2, 3].map(i => `<path d="M${x0} ${yChao + 40 * i * i} H${x1}" stroke="${corS}" stroke-width="3"/>`).join('') : ''); }
// sombra de contato chapada embaixo de móvel/objeto (x centro, y chão, largura)
const sombraContato = (x, y, w) => `<ellipse cx="${x}" cy="${y + 3}" rx="${w / 2}" ry="${Math.max(6, w * .07)}" fill="#000" opacity=".2"/>`;
// ---------------------------------------------------------------- close de reação (regra do estilo: depois de toda imagem absurda, a cara de quem viu)
// fundo chapado simplificado (2–3 formas da cor do lugar) + o personagem grande, rosto entre 30 % e 50 % da altura.
// o.fundo: cor da parede; o.forma: cor das formas do fundo; o.brilho: cor de um brilho em anéis lisos (ex.: o portal fora de quadro); o.lado: 1 = brilho à direita
function reacaoToon(P, t, tl, st = {}, o = {}) {
  let r = `<rect x="-200" y="-200" width="1000" height="1500" fill="${o.fundo || '#E3B04B'}"/>`;
  if (o.forma) r += `<rect x="-200" y="210" width="1000" height="16" fill="${o.forma}"/>`;
  if (o.brilho) { const bx = o.lado > 0 ? 640 : -60; r += `<circle cx="${bx}" cy="430" r="330" fill="${o.brilho}" opacity=".18"/><circle cx="${bx}" cy="430" r="210" fill="${o.brilho}" opacity=".22"/>`; }
  return r + toon(P, { x: 250, y: 1200, s: 1.5, t, semCorte: true, ...st, boca: typeof st.boca === 'string' ? BOCAS[st.boca] : st.boca }); }
// atalho: pt(P, x, y, s, t, st) — st.boca aceita nome: neutra, sorriso, riso, grito, o
const BOCAS = { neutra: { sm: -.3 }, sorriso: { sm: .7 }, riso: { o: .5, sm: .9 }, grito: { o: 1, w: 1.15 }, o: { o: .5, w: .5 } };
const pt = (P, x, y, s, t, o = {}) => toon(P, { x, y, s, t, ...o, boca: typeof o.boca === 'string' ? BOCAS[o.boca] : o.boca });

// ---------------------------------------------------------------- máscara de porquinho-cofre (nossa) e óculos
// modo 'baixada' (cobre o rosto; olhos pelos furos; o focinho mexe na fala, ab = abertura) ou 'testa' (levantada sobre a cabeça)
function tMascaraPorco(modo, ab = 0, o = {}) {
  const ROSA = '#F4A6B8', ROSA_S = '#E58CA2', FOC = '#EE8FA6';
  let m = tForma(tSpl([[-34, -86], [-62, -132], [-6, -100]]), ROSA, '') + tForma(tSpl([[40, -98], [74, -142], [88, -80]]), ROSA, '');
  m += tForma(tSpl([[-52, -72], [30, -88], [94, -62], [104, 0], [94, 66], [50, 98], [-12, 98], [-56, 62], [-66, 0]]), ROSA, tPinta(tSpl([[-90, -20], [-60, -90], [-30, 0], [-50, 110], [-100, 110]]), ROSA_S));
  m += tForma(tPoli([[4, -70], [36, -70], [36, -63], [4, -63]]), '#7a3a4a');                                  // fenda da moeda
  if (modo === 'baixada') {
    const ml = (o.lid ?? .3) * .4; m += tOlho(8, -10, 24, 27, { lid: ml, look: o.lk || [0, 0], fechado: o.pisca, pele: ROSA, pupila: 3.4 }) + tOlho(60, -12, 19, 23, { lid: ml, look: o.lk || [0, 0], fechado: o.pisca, pele: ROSA, pupila: 3 });
    const fy = 40 + ab * 6, fry = 22 + ab * 8;
    m += tForma(tElip(54, fy, 32, fry), FOC, tPinta(tElip(46, fy + 4, 28, fry * .7), ROSA_S)) + `<ellipse cx="44" cy="${fy}" rx="5" ry="8" fill="#7a3a4a"/><ellipse cx="66" cy="${fy}" rx="5" ry="8" fill="#7a3a4a"/>`;
    return tTraco('M-66 0 L-84 2', TLW * 1.2, '#7a3a4a') + m; }
  return `<g transform="translate(6 -112) rotate(-14) scale(.62)">${tForma(tElip(54, 40, 32, 22), FOC)}${m}${`<ellipse cx="44" cy="40" rx="5" ry="8" fill="#7a3a4a"/><ellipse cx="66" cy="40" rx="5" ry="8" fill="#7a3a4a"/>`}</g>`;
}
const tOculos = (cor = TINK) => `<circle cx="8" cy="-10" r="30" fill="#CFE8FF" fill-opacity=".22" stroke="${cor}" stroke-width="${TLW * 1.4}" vector-effect="non-scaling-stroke"/>`
  + `<circle cx="60" cy="-12" r="24" fill="#CFE8FF" fill-opacity=".22" stroke="${cor}" stroke-width="${TLW * 1.4}" vector-effect="non-scaling-stroke"/>` + tTraco('M38 -12 Q36 -18 36 -12', TLW * 1.2, cor) + tTraco('M-22 -10 L-70 -2', TLW * 1.2, cor);

// ---------------------------------------------------------------- ajudantes de plano (2º uso: EP01 e EP02)
const fundoChapado = (cor) => `<rect x="-400" y="-400" width="1400" height="2000" fill="${cor}"/>`;
const memoria = (svg) => `<g style="filter:saturate(.55) sepia(.18)">${svg}</g>`;
