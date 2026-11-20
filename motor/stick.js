// Stickman 2D (formato novo, EP03+). Cabeça redonda grande, membros finos tipo mangueira com contorno,
// rosto simples, roupa sugerida, luz suave (gradiente na cabeça, brilho nos membros, sombra no chão).
// Origem = entre os pés (y = 0); para cima é negativo. Altura de um adulto ≈ 560 unidades em s = 1.
// Ângulos em graus: 0 = membro para baixo; positivo = para fora do corpo (braço) / para a frente (perna).
const STK_INK = '#1d1f2b';
const rad = a => a * Math.PI / 180;
// falante: true = personagem que "fala" as falas entre aspas da narração (boca e mão mexem sozinhas só durante a fala)
const stkToon = () => typeof STK_TOON !== 'undefined' && !!STK_TOON;
const stkFalaAgora = st => !!(st.falante && typeof window !== 'undefined' && window.FALA_AGORA);

// tipos de corpo
const STK_TIPO = {
  adulto: { cab: 78, pesc: 18, tronco: 190, ombro: 22, quadril: 14, braco: [100, 96], perna: [130, 126], esp: 15 },
  alto:   { cab: 74, pesc: 20, tronco: 215, ombro: 22, quadril: 14, braco: [110, 104], perna: [145, 140], esp: 14 },
  crianca:{ cab: 74, pesc: 12, tronco: 120, ombro: 17, quadril: 11, braco: [66, 62], perna: [78, 74], esp: 13 },
};

let _stkN = 0;
// membro em 2 segmentos: devolve [pontos] e path
function stkMembro(x, y, l1, l2, a1, a2, lado) {
  const j = [x + Math.sin(rad(a1)) * l1 * lado, y + Math.cos(rad(a1)) * l1];
  const a = a1 + a2;
  const f = [j[0] + Math.sin(rad(a)) * l2 * lado, j[1] + Math.cos(rad(a)) * l2];
  // curva suave pelo cotovelo/joelho (mangueira)
  return { j, f, d: `M${x} ${y} Q${j[0]} ${j[1]} ${f[0]} ${f[1]}`, d2: `M${x} ${y} L${j[0]} ${j[1]} L${f[0]} ${f[1]}` };
}
function stkTubo(d, cor, esp, luz = true) {
  return `<path d="${d}" fill="none" stroke="${STK_INK}" stroke-width="${esp + 9}" stroke-linecap="round" stroke-linejoin="round"/>`
    + `<path d="${d}" fill="none" stroke="${cor}" stroke-width="${esp}" stroke-linecap="round" stroke-linejoin="round"/>`
    + (luz && !stkToon() ? `<path d="${d}" fill="none" stroke="#fff" stroke-width="${esp * .28}" stroke-linecap="round" opacity=".22" transform="translate(${-esp * .22} ${-esp * .1})"/>` : '');
}
const stkMao = (p, cor) => `<circle cx="${p[0]}" cy="${p[1]}" r="11" fill="${cor}" stroke="${STK_INK}" stroke-width="4.5"/>`;
const stkPe = (p, cor, lado) => `<path d="M${p[0] - 6 * lado} ${p[1] - 8} q${22 * lado} -6 ${30 * lado} 8 l0 4 h${-34 * lado}z" fill="${cor}" stroke="${STK_INK}" stroke-width="4.5" stroke-linejoin="round"/>`;

// pose padrão + respiração/vida
function stkPose(st) {
  const t = st.t || 0, ph = st.ph || 0, v = st.viv ?? 1;
  const P = {
    bE: [12, -10], bD: [12, -10], pE: [4, 0], pD: [4, 0], tronco: 0, cabeca: 0, ...(st.pose || {}),
  };
  if (st.walk != null) { const w = Math.sin(st.walk * Math.PI * 2);
    P.pE = [w * 24, Math.max(0, -w) * 30]; P.pD = [-w * 24, Math.max(0, w) * 30];
    P.bE = [P.bE[0] - w * 22, -18]; P.bD = [P.bD[0] + w * 22, -18]; }
  else if (!st.still) { P.bE = [P.bE[0] + Math.sin(t * 2.1 + ph) * 4 * v, P.bE[1] + Math.sin(t * 1.7 + ph) * 5 * v];
    P.bD = [P.bD[0] + Math.sin(t * 2.4 + ph + 1) * 4 * v, P.bD[1] + Math.sin(t * 1.9 + ph + 2) * 5 * v];
    if (st.fala || stkFalaAgora(st)) { P.bD[0] += Math.abs(Math.sin(t * 3.4 + ph)) * 16; P.bD[1] -= Math.abs(Math.sin(t * 3.4 + ph)) * 30; } }
  return P;
}

// ---------------------------------------------------------------- personagem
// ---------------------------------------------------------------- afundado (EP11): personagem enterrado na lama até um nível
// st.afundado = 'tornozelo' | 'canela' | 'joelho' | 'coxa' | 'cintura' | 'peito' | 'ombro' | 'queixo' | 'entre' (entre queixo e boca)
//   | 'boca' (encostando na boca) | 'semboca' (cobre a boca) | 'olhos' (só dos olhos para cima) | 'tudo' | número 0..1 (fração da altura, a partir dos pés)
// O ponto (x, y) passa a ser a LINHA DA LAMA: o corpo desce, o que fica abaixo some e um anel de lama fica em volta.
// st.lama = cor da lama; st.anel = false tira o anel. A checagem de corte usa a linha da lama como base.
function stkNivel(D, af) {
  const pernaL = D.perna[0] + D.perna[1], hipY = -pernaL, topo = hipY - D.tronco, cy = topo - D.pesc - D.cab + 6;
  if (typeof af === 'number') return -(D.cab - cy) * af;
  return { tornozelo: -18, canela: -D.perna[1] * .55, joelho: -D.perna[1], coxa: hipY * .72, cintura: hipY - 8, peito: topo + 98, ombro: topo + 12,
    queixo: cy + D.cab * 1.0, entre: cy + D.cab * .74, boca: cy + D.cab * .54, semboca: cy + D.cab * .3, olhos: cy + D.cab * .1, tudo: cy - D.cab * 1.5 }[af] ?? 0;
}
function stkLarguraNivel(D, yc) { // meia-largura do corpo na linha da lama (unidades do boneco)
  const pernaL = D.perna[0] + D.perna[1], hipY = -pernaL, topo = hipY - D.tronco, cy = topo - D.pesc - D.cab + 6;
  if (yc <= cy + D.cab * 1.05) return D.cab * 1.18;      // cabeça
  if (yc <= topo + 20) return D.ombro + D.esp + 26;      // ombros / pescoço
  if (yc <= hipY) return D.ombro + D.esp + 14;           // tronco
  return D.quadril + D.esp + 22;                         // pernas
}
function stkAnel(x, y, rx, t, cor, frente) { // metade de trás (frente=false) ou da frente (frente=true) do monte de lama em volta do corpo
  const ry = rx * .36, luz = '#a39584', esc = '#3f362e', ond = 1 + .04 * Math.sin(t * 3.1), sw = Math.max(2, rx * .035);
  if (!frente) return `<ellipse cx="${x}" cy="${y + ry * .15}" rx="${rx * 1.5 * ond}" ry="${ry * 1.4 * ond}" fill="${esc}" opacity=".22"/>`
    + `<ellipse cx="${x}" cy="${y}" rx="${rx * 1.12}" ry="${ry}" fill="${cor}"/>`
    + `<path d="M${x - rx * 1.12} ${y} A${rx * 1.12} ${ry} 0 0 1 ${x + rx * 1.12} ${y}" stroke="${esc}" stroke-width="${sw}" fill="none" opacity=".55"/>`;
  const k = (t * .55) % 1, r2 = rx * (1.2 + .45 * k);
  return `<path d="M${x - rx * 1.12} ${y} Q${x - rx * .7} ${y - ry * .5} ${x - rx * .45} ${y - ry * .05} Q${x} ${y + ry * .25} ${x + rx * .45} ${y - ry * .05} Q${x + rx * .7} ${y - ry * .5} ${x + rx * 1.12} ${y} A${rx * 1.12} ${ry} 0 0 1 ${x - rx * 1.12} ${y}z" fill="${cor}" stroke="${STK_INK}" stroke-width="${sw}" stroke-linejoin="round"/>`
    + `<path d="M${x - rx * .95} ${y - ry * .05} Q${x - rx * .65} ${y - ry * .42} ${x - rx * .42} ${y + ry * .05}" stroke="${luz}" stroke-width="${sw * 1.3}" fill="none" stroke-linecap="round" opacity=".8"/>`
    + `<path d="M${x + rx * .42} ${y + ry * .05} Q${x + rx * .65} ${y - ry * .42} ${x + rx * .95} ${y - ry * .05}" stroke="${luz}" stroke-width="${sw * 1.3}" fill="none" stroke-linecap="round" opacity=".55"/>`
    + `<path d="M${x - r2} ${y + ry * .35} A${r2} ${r2 * .32} 0 0 0 ${x + r2} ${y + ry * .35}" fill="none" stroke="${luz}" stroke-width="${sw}" opacity="${.45 * (1 - k)}"/>`; // só a metade da frente: não passa por cima do corpo
}
// mão saindo da lama ao lado do corpo afundado (2D): base na linha da lama em (x, y); alt = altura do antebraço; obj = svg na mão (origem na mão)
function stkMaoLama(p, x, y, s = 1, o = {}) {
  const D = STK_TIPO[p.tipo || 'adulto'], lado = o.lado ?? 1, alt = (o.alt ?? 120) * s, dx = (o.dx ?? 105) * s * lado, inc = (o.inc ?? 18) * lado * s, t = o.t || 0;
  const bx = x + dx, hx = bx + inc + Math.sin(t * 2.2) * 3 * s, hy = y - alt + Math.sin(t * 1.9) * 3 * s, esp = D.esp * s * .95, cor = o.lama || '#6b5e52';
  // antebraço na cor da pele (manga só se o.manga), objeto atrás e a mão por cima segurando
  return stkAnel(bx, y, esp * 2.2, t, cor, false)
    + stkTubo(`M${bx} ${y + 6 * s} Q${bx + inc * .3} ${(y + hy) / 2} ${hx} ${hy}`, o.manga ? p.manga : p.pele, esp)
    + (o.obj ? `<g transform="translate(${hx} ${hy}) scale(${s})">${o.obj}</g>` : '')
    + `<circle cx="${hx}" cy="${hy}" r="${15 * s}" fill="${p.pele}" stroke="${STK_INK}" stroke-width="${4.5 * s}"/>`
    + [-6, 0, 6].map(dx2 => `<path d="M${hx + dx2 * s - 3 * s} ${hy - 9 * s} q${3 * s} ${-4 * s} ${6 * s} 0" stroke="${STK_INK}" stroke-width="${2.6 * s}" fill="none" stroke-linecap="round" opacity=".7"/>`).join('')
    + stkAnel(bx, y, esp * 2.2, t, cor, true);
}
function stick(p, st = {}) {
  if (st.afundado != null && st.afundado !== 0 && !st._interno) {
    const D = STK_TIPO[p.tipo || 'adulto'], sc = st.s || 1, x0 = st.x || 0, y0 = st.y || 0, t = st.t || 0;
    const yc = stkNivel(D, st.afundado), desce = -yc * sc, cid = `aff${_stkN++}`, cor = st.lama || '#6b5e52';
    const rx = stkLarguraNivel(D, yc) * sc;
    const corpo = yc <= stkNivel(D, 'tudo') ? '' : stick(p, { ...st, _interno: true, y: y0 + desce, sombra: false, semCorte: true });
    let o = (st.anel === false ? '' : stkAnel(x0, y0, rx, t, cor, false))
      + `<defs><clipPath id="${cid}"><rect x="${x0 - 4000}" y="${y0 - 8000}" width="8000" height="8000"/></clipPath></defs><g clip-path="url(#${cid})">${corpo}</g>`
      + (st.anel === false ? '' : stkAnel(x0, y0, rx, t, cor, true));
    if (typeof window !== 'undefined' && window._corpos && !st.semCorte && corpo) {
      const pernaL = D.perna[0] + D.perna[1], cy = -pernaL - D.tronco - D.pesc - D.cab + 6;
      window._corpos.push({ x: x0, y: y0 + desce + cy * sc, r: D.cab * sc, pe: y0, afundado: 1 }); }
    return o;
  }
  const D = STK_TIPO[p.tipo || 'adulto'], t = st.t || 0, id = `stk${_stkN++}`;
  const P = stkPose(st), lado = st.flip ? -1 : 1;
  const resp = st.still ? 0 : Math.sin(t * 2.6 + (st.ph || 0)) * 3;
  const pernaL = D.perna[0] + D.perna[1];
  const hipY = -pernaL + (st.walk != null ? Math.abs(Math.sin(st.walk * Math.PI * 2)) * 6 : 0);
  let s = `<g transform="translate(${st.x || 0} ${st.y || 0}) scale(${(st.s || 1) * lado} ${st.s || 1})">`;
  if (st.sombra !== false) s += stkToon() ? `<ellipse cx="0" cy="5" rx="${D.cab * 1.1}" ry="11" fill="#000" opacity=".22"/>` : `<ellipse cx="0" cy="6" rx="${D.cab * 1.25}" ry="13" fill="#000" opacity=".16" filter="url(#stkBlur)"/>`;
  // pernas (atrás do tronco)
  const pe = [];
  for (const [sd, a] of [[-1, P.pE], [1, P.pD]]) {
    const m = stkMembro(sd * D.quadril, hipY, D.perna[0], D.perna[1], a[0] * sd, -a[1] * sd, 1);
    s += stkTubo(m.d, p.calca || p.pele, D.esp + 2) + stkPe(m.f, p.sapato || STK_INK, sd < 0 ? -1 : 1);
    pe.push(m);
  }
  if (p.saia) s += `<path d="M${-D.quadril - 26} ${hipY + 70} L${-D.quadril - 4} ${hipY - 30} h${2 * D.quadril + 8} L${D.quadril + 26} ${hipY + 70} q${-(D.quadril + 26)} 14 ${-2 * (D.quadril + 26)} 0z" fill="${p.saia}" stroke="${STK_INK}" stroke-width="5" stroke-linejoin="round"/>`;
  // tronco + braços + cabeça inclinam juntos
  const topo = hipY - D.tronco + resp;
  s += `<g transform="rotate(${P.tronco} 0 ${hipY})">`;
  const ombroY = topo + 14;
  const bracos = [];
  for (const [sd, a] of [[-1, P.bE], [1, P.bD]]) bracos.push({ sd, m: stkMembro(sd * D.ombro, ombroY, D.braco[0], D.braco[1], a[0] * sd, a[1] * sd, 1) });
  const corManga = p.manga || p.pele;
  // braço de trás
  const desenhaBraco = b => { let o = stkTubo(b.m.d, p.pele, D.esp);
    if (p.manga) { const a0 = b.sd < 0 ? P.bE : P.bD;
      if (p.mangaLonga) o += stkTubo(b.m.d, corManga, D.esp + 6, false);
      else { const fim = [b.sd * D.ombro + Math.sin(rad(a0[0] * b.sd)) * D.braco[0] * .45, ombroY + Math.cos(rad(a0[0] * b.sd)) * D.braco[0] * .45];
        o += stkTubo(`M${b.sd * D.ombro} ${ombroY} L${fim[0]} ${fim[1]}`, corManga, D.esp + 6, false); } }
    return o + stkMao(b.m.f, p.pele) + (st.segura && b.sd === 1 ? `<g transform="translate(${b.m.f[0]} ${b.m.f[1]})">${st.segura}</g>` : ''); };
  s += desenhaBraco(bracos[0]);
  // corpo: tubo + roupa
  s += stkTubo(`M0 ${hipY} L0 ${topo}`, p.camisa || p.pele, D.esp + 8);
  if (p.roupa) s += p.roupa(D, hipY, topo, id, st);
  s += desenhaBraco(bracos[1]);
  // pescoço + cabeça
  const cy = topo - D.pesc - D.cab + 6;
  s += stkTubo(`M0 ${topo} L0 ${topo - D.pesc}`, p.pele, D.esp, false);
  s += `<g transform="rotate(${P.cabeca + (st.still ? 0 : Math.sin(t * 1.3 + (st.ph || 0)) * 2)} 0 ${topo})">`;
  s += stkCabeca(p, st, D.cab, cy, id);
  s += `</g></g></g>`;
  if (typeof window !== 'undefined' && window._cab && !st.nocheck) window._cab.push({ x: st.x || 0, y: (st.y || 0) + cy * (st.s || 1), r: D.cab * (st.s || 1) });
  // para a checagem de corte: todo personagem (mesmo com nocheck), salvo semCorte: cabeça e pés na tela
  if (typeof window !== 'undefined' && window._corpos && !st.semCorte) window._corpos.push({ x: st.x || 0, y: (st.y || 0) + cy * (st.s || 1), r: D.cab * (st.s || 1), pe: st.y || 0 });
  return s;
}

function stkCabeca(p, st, r, cy, id) {
  const t = st.t || 0;
  let s = '';
  if (p.atras) s += p.atras(r, cy);
  if (stkToon()) return s + stkCabecaToon(p, st, r, cy, id);
  s += `<defs><radialGradient id="${id}g" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="${p.peleLuz || p.pele}"/><stop offset=".7" stop-color="${p.pele}"/><stop offset="1" stop-color="${p.peleSombra || p.pele}"/></radialGradient></defs>`;
  s += `<circle cx="0" cy="${cy}" r="${r}" fill="url(#${id}g)" stroke="${STK_INK}" stroke-width="5.5"/>`;
  s += `<ellipse cx="${-r * .38}" cy="${cy - r * .5}" rx="${r * .2}" ry="${r * .11}" fill="#fff" opacity=".28" transform="rotate(-30 ${-r * .38} ${cy - r * .5})"/>`;
  // rosto (olhando levemente para o lado do corpo: +x)
  const ox = (st.olhar ?? .18) * r, ey = cy - r * .02 - (st.olharCima ? r * .2 : 0); // olharCima: olhos no alto do rosto (olhando para cima)
  const pisca = st.olhos === 'fechados' || (!st.semPiscar && (t + (st.ph || 0)) % 3.7 > 3.58);
  for (const sd of [-1, 1]) {
    const ex = ox + sd * r * .3;
    if (pisca) s += `<path d="M${ex - 9} ${ey} q9 6 18 0" stroke="${STK_INK}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
    else s += `<ellipse cx="${ex}" cy="${ey}" rx="${r * (st.olhos === 'arregalados' ? .12 : .085)}" ry="${r * (st.olhos === 'arregalados' ? .15 : .12)}" fill="${STK_INK}"/><circle cx="${ex + r * .03}" cy="${ey - r * .045}" r="${r * .03}" fill="#fff"/>`;
    const bro = { bravo: sd * 8, triste: -sd * 10, surpreso: 0 }[st.sobrancelha] ?? 0, by = ey - r * (st.sobrancelha === 'surpreso' ? .36 : .27);
    s += `<path d="M${ex - r * .13} ${by + Math.max(0, bro * sd) * .5} L${ex + r * .13} ${by + Math.max(0, -bro * sd) * .5}" stroke="${p.sobrancelha || STK_INK}" stroke-width="${p.sobrancelhaGrossa ? 7 : 4.5}" stroke-linecap="round"/>`;
  }
  if (p.bochecha) for (const sd of [-1, 1]) s += `<ellipse cx="${ox + sd * r * .44}" cy="${ey + r * .22}" rx="${r * .12}" ry="${r * .07}" fill="${p.bochecha}" opacity=".5"/>`;
  const my = cy + r * .42, mx = ox;
  const falando = stkFalaAgora(st); if ((falando || st.fala) && typeof window !== 'undefined') window._falou = true;
  const b = falando ? 'fala' : st.boca || (st.fala ? 'fala' : 'neutra');
  if (b === 'fala') { const k = .3 + .7 * Math.abs(Math.sin(t * 13)) * (.6 + .4 * Math.sin(t * 5.3)); s += `<ellipse cx="${mx}" cy="${my}" rx="${r * .14}" ry="${r * .13 * k + 1}" fill="#5a1f2a" stroke="${STK_INK}" stroke-width="3.5"/>`; }
  else if (b === 'sorriso') s += `<path d="M${mx - r * .2} ${my - 4} q${r * .2} ${r * .2} ${r * .4} 0" stroke="${STK_INK}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
  else if (b === 'riso') s += `<path d="M${mx - r * .24} ${my - 8} q${r * .24} ${r * .34} ${r * .48} 0z" fill="#5a1f2a" stroke="${STK_INK}" stroke-width="4" stroke-linejoin="round"/>`;
  else if (b === 'triste') s += `<path d="M${mx - r * .16} ${my + 6} q${r * .16} ${-r * .14} ${r * .32} 0" stroke="${STK_INK}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
  else if (b === 'o') s += `<ellipse cx="${mx}" cy="${my}" rx="${r * .08}" ry="${r * .11}" fill="#5a1f2a" stroke="${STK_INK}" stroke-width="3.5"/>`;
  else s += `<path d="M${mx - r * .13} ${my} h${r * .26}" stroke="${STK_INK}" stroke-width="4.5" stroke-linecap="round"/>`;
  if (p.bigode) s += `<path d="M${mx - r * .28} ${my - r * .1} q${r * .14} ${-r * .14} ${r * .28} -${r * .02} q${r * .14} ${-r * .12} ${r * .28} ${r * .02}" stroke="${p.bigode}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  if (p.frente) s += p.frente(r, cy, st);
  return s;
}

// cabeça no modo toon: pele chapada + sombra recortada, olhos brancos grandes que se tocam, pupila pequena,
// pálpebra pesada (st.palpebra 0..1), olheira; bocas elásticas. st.olhar move as pupilas (-1..1), st.olharCima sobe.
function stkCabecaToon(p, st, r, cy, id) {
  const t = st.t || 0, ink = STK_INK;
  let s = `<defs><clipPath id="${id}c"><circle cx="0" cy="${cy}" r="${r}"/></clipPath></defs>`;
  s += `<circle cx="0" cy="${cy}" r="${r}" fill="${p.pele}"/>`;
  s += `<g clip-path="url(#${id}c)"><circle cx="${-r * .32}" cy="${cy - r * .28}" r="${r * 1.02}" fill="none" stroke="${p.peleSombra || p.pele}" stroke-width="${r * .5}"/></g>`;
  s += `<circle cx="0" cy="${cy}" r="${r}" fill="none" stroke="${ink}" stroke-width="6"/>`;
  const ox = (st.olhar ?? .18) * r * .55, ey = cy - r * .08, er = r * .27, pu = (st.olhar ?? .18) * er * .45, pv = st.olharCima ? -er * .45 : er * .08;
  const pisca = st.olhos === 'fechados' || (!st.semPiscar && (t + (st.ph || 0)) % 3.7 > 3.6);
  const lid = st.palpebra ?? .35;
  for (const sd of [-1, 1]) {
    const ex = ox + sd * er * .98, big = st.olhos === 'arregalados' ? 1.15 : 1;
    s += `<path d="M${ex - er * .8} ${ey + er * 1.15} q${er * .8} ${er * .45} ${er * 1.6} 0" stroke="${ink}" stroke-width="3" fill="none" opacity=".55" stroke-linecap="round"/>`; // olheira
    if (pisca) { s += `<path d="M${ex - er} ${ey} q${er} ${er * .5} ${er * 2} 0" stroke="${ink}" stroke-width="5" fill="none" stroke-linecap="round"/>`; continue; }
    s += `<ellipse cx="${ex}" cy="${ey}" rx="${er * big}" ry="${er * 1.08 * big}" fill="#fff" stroke="${ink}" stroke-width="5"/>`;
    s += `<circle cx="${ex + pu}" cy="${ey + pv}" r="${Math.max(3.2, r * .05)}" fill="${ink}"/>`;
    if (lid > 0) { const ry = er * 1.08 * big, yl = ey - ry + 2 * ry * lid, cid = `${id}p${sd < 0 ? 'e' : 'd'}`;
      s += `<defs><clipPath id="${cid}"><ellipse cx="${ex}" cy="${ey}" rx="${er * big}" ry="${ry}"/></clipPath></defs>`
        + `<rect x="${ex - er * big - 4}" y="${ey - ry - 4}" width="${er * big * 2 + 8}" height="${yl - (ey - ry) + 4}" fill="${p.pele}" clip-path="url(#${cid})"/>`
        + `<ellipse cx="${ex}" cy="${ey}" rx="${er * big}" ry="${ry}" fill="none" stroke="${ink}" stroke-width="5"/>`
        + `<path d="M${ex - Math.sqrt(Math.max(0, 1 - Math.pow((yl - ey) / ry, 2))) * er * big} ${yl} H${ex + Math.sqrt(Math.max(0, 1 - Math.pow((yl - ey) / ry, 2))) * er * big}" stroke="${ink}" stroke-width="5" stroke-linecap="round"/>`; }
    const bro = { bravo: sd * 9, triste: -sd * 10, surpreso: 0 }[st.sobrancelha] ?? 0, by = ey - er * (st.sobrancelha === 'surpreso' ? 1.55 : 1.3);
    s += `<path d="M${ex - er * .6} ${by + Math.max(0, bro * sd) * .5} L${ex + er * .6} ${by + Math.max(0, -bro * sd) * .5}" stroke="${p.sobrancelha || ink}" stroke-width="6" stroke-linecap="round"/>`;
  }
  const my = cy + r * .5, mx = ox * .8;
  const falando = stkFalaAgora(st); if ((falando || st.fala) && typeof window !== 'undefined') window._falou = true;
  const b = falando ? 'fala' : st.boca || (st.fala ? 'fala' : 'neutra');
  if (b === 'fala' || b === 'grito') { const k = b === 'grito' ? 1 : .3 + .7 * Math.abs(Math.sin(t * 13)) * (.6 + .4 * Math.sin(t * 5.3)), w = r * (b === 'grito' ? .34 : .24);
    s += `<path d="M${mx - w} ${my - 4} q${w} ${r * .42 * k + 4} ${w * 2} 0z" fill="#5a1f2a" stroke="${ink}" stroke-width="5" stroke-linejoin="round"/><path d="M${mx - w * .8} ${my - 2} h${w * 1.6}" stroke="#fff" stroke-width="4"/>`; }
  else if (b === 'sorriso') s += `<path d="M${mx - r * .26} ${my - 6} q${r * .26} ${r * .22} ${r * .52} -${r * .04}" stroke="${ink}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  else if (b === 'triste') s += `<path d="M${mx - r * .2} ${my + 6} q${r * .2} ${-r * .14} ${r * .4} 0" stroke="${ink}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  else if (b === 'o') s += `<ellipse cx="${mx}" cy="${my}" rx="${r * .1}" ry="${r * .14}" fill="#5a1f2a" stroke="${ink}" stroke-width="4.5"/>`;
  else s += `<path d="M${mx - r * .2} ${my} q${r * .1} ${r * .04} ${r * .2} 0 t${r * .2} 0" stroke="${ink}" stroke-width="5" fill="none" stroke-linecap="round"/>`; // reta torta (deadpan)
  if (p.frente) s += p.frente(r, cy, st);
  return s;
}

// defs globais do stickman (pôr uma vez no SVG)
const STK_DEFS = `<filter id="stkBlur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5"/></filter>`;

// ---------------------------------------------------------------- elenco EP03
const AURELIO = {
  tipo: 'alto', pele: '#F1D2B6', peleLuz: '#FCE7D4', peleSombra: '#D9B394', calca: '#2B2E3F', sapato: '#111',
  camisa: '#2B2E3F', manga: '#2B2E3F', mangaLonga: 1, bigode: '#3a2a22', sobrancelha: '#3a2a22',
  roupa: (D, hip, topo) => `<path d="M${-D.ombro - 12} ${topo + 4} q${D.ombro + 12} -10 ${2 * D.ombro + 24} 0 l-6 ${hip - topo + 14} h${-2 * D.ombro - 12}z" fill="#2B2E3F" stroke="${STK_INK}" stroke-width="5" stroke-linejoin="round"/>`
    + `<path d="M-14 ${topo + 2} l14 34 l14 -34z" fill="#fff" stroke="${STK_INK}" stroke-width="3.5" stroke-linejoin="round"/>`
    + `<path d="M0 ${topo + 14} l-7 10 l7 48 l7 -48z" fill="#C8102E" stroke="${STK_INK}" stroke-width="3" stroke-linejoin="round"/>`
    + `<path d="M${-D.ombro + 2} ${topo + 60} h14" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".9"/><path d="M${-D.ombro + 2} ${topo + 60} l7 -7 l7 7" fill="#fff"/>`
    + `<path d="M${-D.ombro - 6} ${topo + 8} q-4 40 4 ${hip - topo}" stroke="#fff" stroke-width="3" opacity=".15" fill="none"/>`,
  frente: (r, cy) => `<ellipse cx="0" cy="${cy - r * .72}" rx="${r * 1.12}" ry="${r * .16}" fill="#1f1f27" stroke="${STK_INK}" stroke-width="5"/>`
    + `<path d="M${-r * .78} ${cy - r * .74} q0 ${-r * .9} ${r * .78} ${-r * .9} q${r * .78} 0 ${r * .78} ${r * .9}z" fill="#2a2a33" stroke="${STK_INK}" stroke-width="5"/>`
    + `<path d="M${-r * .76} ${cy - r * .86} h${r * 1.52}" stroke="#7a1020" stroke-width="${r * .14}"/>`
    + `<path d="M${-r * .45} ${cy - r * 1.4} q${r * .2} -${r * .14} ${r * .4} -${r * .1}" stroke="#fff" stroke-width="5" opacity=".25" fill="none" stroke-linecap="round"/>`,
};

const SOCORRO = {
  tipo: 'adulto', pele: '#9A6343', peleLuz: '#B97E5A', peleSombra: '#7D4D32', calca: '#9A6343', sapato: '#C2894B',
  camisa: '#E2725B', manga: '#E2725B', saia: '#3E7CB1', bochecha: '#C2484D', sobrancelha: '#2a1a14',
  roupa: (D, hip, topo) => `<path d="M${-D.ombro - 8} ${topo + 6} q${D.ombro + 8} -8 ${2 * D.ombro + 16} 0 l2 ${hip - topo - 4} h${-2 * D.ombro - 20}z" fill="#E2725B" stroke="${STK_INK}" stroke-width="5" stroke-linejoin="round"/>`
    + `<path d="M-30 ${topo + 50} h60 l6 ${hip - topo + 10} q-36 10 -72 0z" fill="#F7F2E6" stroke="${STK_INK}" stroke-width="4.5" stroke-linejoin="round"/>`
    + `<rect x="-14" y="${topo + 80}" width="28" height="22" rx="4" fill="none" stroke="${STK_INK}" stroke-width="3" opacity=".6"/>`
    + `<path d="M-30 ${topo + 50} q30 -14 60 0" stroke="${STK_INK}" stroke-width="3" fill="none"/>`,
  atras: (r, cy) => `<path d="M${r * .7} ${cy - r * .2} q${r * .6} ${r * .2} ${r * .55} ${r * .75} q-${r * .3} -${r * .1} -${r * .5} -${r * .35}z" fill="#F2B33D" stroke="${STK_INK}" stroke-width="4.5" stroke-linejoin="round"/>`,
  frente: (r, cy) => `<path d="M${-r * 1.02} ${cy - r * .05} q0 ${-r * 1.05} ${r * 1.02} ${-r * 1.05} q${r * 1.02} 0 ${r * 1.02} ${r * 1.05} q-${r * .3} -${r * .42} -${r * 1.02} -${r * .5} q-${r * .72} ${r * .08} -${r * 1.02} ${r * .5}z" fill="#F2B33D" stroke="${STK_INK}" stroke-width="5" stroke-linejoin="round"/>`
    + [[-.55, -.62], [-.1, -.82], [.38, -.66], [.75, -.32], [-.82, -.28]].map(([x, y]) => `<circle cx="${x * r}" cy="${cy + y * r}" r="${r * .08}" fill="#E2725B"/>`).join('')
    + `<path d="M${-r * .5} ${cy - r * .9} q${r * .3} -${r * .12} ${r * .55} -${r * .05}" stroke="#fff" stroke-width="5" opacity=".3" fill="none" stroke-linecap="round"/>`,
};

const NINA = {
  tipo: 'crianca', pele: '#7A4B2E', peleLuz: '#9A6544', peleSombra: '#5F3820', calca: '#7A4B2E', sapato: '#E8434F',
  camisa: '#F6C344', manga: '#F6C344', saia: '#F6C344', bochecha: '#D0505A', sobrancelha: '#1a0f0a',
  roupa: (D, hip, topo) => `<path d="M${-D.ombro - 6} ${topo + 4} q${D.ombro + 6} -8 ${2 * D.ombro + 12} 0 l4 ${hip - topo} h${-2 * D.ombro - 20}z" fill="#F6C344" stroke="${STK_INK}" stroke-width="5" stroke-linejoin="round"/>`
    + [[-8, 30], [10, 52], [-6, 76], [12, 96]].map(([x, y]) => `<circle cx="${x}" cy="${topo + y}" r="5" fill="#fff" opacity=".8"/>`).join(''),
  atras: (r, cy) => [-1, 1].map(sd => `<circle cx="${sd * r * 1.02}" cy="${cy - r * .55}" r="${r * .42}" fill="#1a0f0a" stroke="${STK_INK}" stroke-width="5"/><circle cx="${sd * r * .78}" cy="${cy - r * .38}" r="${r * .13}" fill="#E8434F" stroke="${STK_INK}" stroke-width="3.5"/>`).join(''),
  frente: (r, cy) => `<path d="M${-r * .98} ${cy - r * .1} q0 ${-r} ${r * .98} ${-r} q${r * .98} 0 ${r * .98} ${r} q-${r * .25} -${r * .5} -${r * .6} -${r * .55} q-${r * .3} ${r * .12} -${r * .38} ${r * .02} q-${r * .3} -${r * .1} -${r * .55} ${r * .02} q-${r * .3} ${r * .1} -${r * .43} ${r * .53}z" fill="#1a0f0a" stroke="${STK_INK}" stroke-width="5" stroke-linejoin="round"/>`
    + `<path d="M${-r * .4} ${cy - r * .85} q${r * .25} -${r * .1} ${r * .5} -${r * .02}" stroke="#fff" stroke-width="4" opacity=".25" fill="none" stroke-linecap="round"/>`,
};

if (typeof module !== 'undefined') module.exports = { stick, stkMaoLama, stkNivel, STK_DEFS, AURELIO, SOCORRO, NINA, STK_INK };
