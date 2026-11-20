// TESTE 00 · pele "text-flash-cuts" (estilos/text-flash-cuts/STYLE.md) em stickman chapado, tudo em código.
// ~10 s: "Processo Seletivo" (456 candidatos, uma vaga). Vermelho-preto-branco, cartelas-relâmpago com slam,
// avanço da câmera em degraus (sem tween), faixas de cinema com a legenda dentro da faixa de baixo.
const VERM = '#d4162b', TINTA = '#111114', PAPEL = '#eeeae2';
const SERIF = 'Shippori Mincho B1, Playfair Display';
const LEGENDA_PALAVRAS = 3, CORTE_MAX_EP = 99, EFEITOS_DB = -14, CAUDA = .9, AUTO_ENQ_EP = false;
const AMBIENTE = { '0': null };
const SEM_VINHETA = true; // pele chapada: sem vinheta e sem grão
// área de imagem entre as faixas
const F_TOP = 150, F_BOT = 860;
const ESTILO_CSS = `
#sub{top:${F_BOT + 34}px;font-size:31px;letter-spacing:0}
#sub span{color:${PAPEL};-webkit-text-stroke:0;text-shadow:none;margin:0 4px}
#sub span.on{color:#ff2a3f}`;
// carrega a serifada antes do 1º quadro
document.body.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:-999px;font-family:'Shippori Mincho B1';font-weight:800">ÁÇÚ456</span><span style="position:absolute;left:-999px;font-family:'Playfair Display';font-weight:900">ÁÇÚ</span>`);
function MOLDURA(t, pl) { return `<rect x="0" y="0" width="576" height="${F_TOP}" fill="#000"/><rect x="0" y="${F_BOT}" width="576" height="${1024 - F_BOT}" fill="#000"/>`
  + `<text x="22" y="${F_TOP - 18}" font-family="Poppins" font-weight="600" font-size="15" fill="#8d8a84" letter-spacing="3">PROCESSO SELETIVO</text>`
  + `<text x="554" y="${F_TOP - 18}" font-family="Poppins" font-weight="600" font-size="15" fill="${VERM}" text-anchor="end" letter-spacing="3">#456</text>`; }

// ---------------------------------------------------------------- utilidades do estilo
const Q = (tl, passo = .2) => Math.floor(tl / passo) * passo;            // tempo em degraus (6 quadros)
const quadro = tl => Math.floor(tl * 30 + 1e-6);
const jit = (fi, a) => { const r = rng(fi * 7919 + 13); return [Math.round((r() * 2 - 1) * a), Math.round((r() * 2 - 1) * a)]; };
// cartela-relâmpago: tela cheia na área entre as faixas; slam 1,08 → 1,02 → 1, tremida 12 px nos 2 primeiros quadros
function cartela(tl, txt, o = {}) {
  const fi = quadro(tl), sc = fi === 0 ? 1.08 : fi === 1 ? 1.02 : 1, [jx, jy] = jit(fi, fi < 2 ? 12 : 2);
  const fs = o.fs || 330, x = o.x ?? 288, y = o.y ?? 640, anc = o.anc || 'middle';
  return `<rect x="-50" y="-50" width="676" height="1124" fill="${o.bg || VERM}"/>`
    + `<g transform="translate(${288 + jx} ${505 + jy}) scale(${sc}) translate(-288 -505)">`
    + `<text x="${x}" y="${y}" font-family="${SERIF}" font-weight="800" font-size="${fs}" text-anchor="${anc}" fill="${o.fg || TINTA}" letter-spacing="${o.ls ?? -8}"${o.vert ? ` writing-mode="tb"` : ''}>${txt}</text>`
    + (o.sub ? `<text x="${o.subx ?? 40}" y="${o.suby ?? 820}" font-family="Poppins" font-weight="600" font-size="20" fill="${o.fg || TINTA}" letter-spacing="4">${o.sub}</text>` : '') + `</g>`;
}
// barra vermelha que corta o preto (transição "fenda")
const fenda = (k) => `<rect x="-50" y="-50" width="676" height="1124" fill="#000"/><rect x="-50" y="${505 - 4 - k * 360}" width="676" height="${8 + k * 720}" fill="${VERM}"/>`;
// inversão de 1–2 quadros (só no impacto)
const inverte = (svg) => `<g style="filter:invert(1)">${svg}</g>`;

// ---------------------------------------------------------------- stickman chapado (silhueta)
// origem entre os pés; altura ≈ 100 em s = 1. o.num: número nas costas/peito; o.cor: cor do número; o.perfil: vira de lado com o olho vermelho
function sil(x, y, s, o = {}) {
  const c = o.tinta || TINTA, a = o.braco ?? 8, inc = o.cabeca || 0;
  let r = `<g transform="translate(${x} ${y}) scale(${s})">`;
  r += `<path d="M-7 0 L-4 -40 M7 0 L4 -40" stroke="${c}" stroke-width="9" stroke-linecap="round"/>`;                 // pernas
  r += `<path d="M0 -40 L0 -74" stroke="${c}" stroke-width="15" stroke-linecap="round"/>`;                            // tronco (agasalho)
  r += `<path d="M-3 -70 l${-8 - a * .4} ${30 - a * .2} M3 -70 l${8 + a * .4} ${30 - a * .2}" stroke="${c}" stroke-width="8" stroke-linecap="round"/>`;
  if (o.num) r += `<text x="0" y="-52" font-family="Poppins" font-weight="800" font-size="11" text-anchor="middle" fill="${o.cor || PAPEL}">${o.num}</text>`;
  // cabeça gira em torno do pescoço (y = -78)
  r += `<g transform="rotate(${inc} 0 -86)"><circle cx="0" cy="-91" r="13" fill="${c}"/>`
    + (o.perfil ? `<circle cx="${o.perfil * 8}" cy="-94" r="3.4" fill="${o.olho || PAPEL}"/><circle cx="${o.perfil * 9.2}" cy="-94" r="1.9" fill="${o.pupila || VERM}"/>` : '') + `</g>`;
  return r + `</g>`;
}
// grade dos 456 candidatos (19 × 24), em coordenadas de mundo; célula 60; o último (456) no canto de baixo à direita
const G_COL = 19, G_LIN = 24, G_CEL = 60, G_X0 = 288 - (G_COL - 1) * G_CEL / 2, G_Y0 = 140;
function grade(cam, comNumero) {
  let r = `<rect x="-3000" y="-3000" width="7000" height="7000" fill="${PAPEL}"/>`;
  for (let i = 0; i < G_LIN; i++) for (let j = 0; j < G_COL; j++) {
    const n = i * G_COL + j + 1, x = G_X0 + j * G_CEL, y = G_Y0 + i * G_CEL + 50;
    const sx = (x - cam.cx) * cam.s + 288, sy = (y - cam.cy) * cam.s + 505;
    if (sx < -80 || sx > 656 || sy < -60 || sy > 1150) continue;          // fora do quadro
    const ult = n === 456;
    r += `<path d="M${x - 22} ${y + 1} h44" stroke="${TINTA}" stroke-width="1" opacity=".25"/>`;
    r += sil(x, y, .5, { num: comNumero ? n : null, cor: PAPEL, tinta: ult ? VERM : TINTA, braco: ult ? 2 : 8 });
  }
  return r;
}
const mundo = (cam, svg) => `<g transform="translate(288 505) scale(${cam.s}) translate(${-cam.cx} ${-cam.cy})">${svg}</g>`;
const ULT = { x: G_X0 + (G_COL - 1) * G_CEL, y: G_Y0 + (G_LIN - 1) * G_CEL + 50 };

// ---------------------------------------------------------------- cenários chapados
// corredor de um ponto só, simétrico, porta branca pequena no fim; k = avanço (0..1)
function corredor(k) {
  const vx = 288, vy = 470, sc = 1 + k * 1.6;
  let r = `<rect x="-50" y="-50" width="676" height="1124" fill="${TINTA}"/>`;
  r += `<g transform="translate(${vx} ${vy}) scale(${sc}) translate(${-vx} ${-vy})">`;
  r += `<path d="M-200 1100 L${vx - 26} ${vy + 38} L${vx + 26} ${vy + 38} L776 1100z" fill="${PAPEL}"/>`;             // chão
  r += `<path d="M-200 -200 L${vx - 26} ${vy - 52} L${vx + 26} ${vy - 52} L776 -200z" fill="#1d1d22"/>`;              // teto
  for (let i = 1; i < 9; i++) { const f = Math.pow(.72, i), y1 = vy + 38 + (1100 - vy - 38) * f, x1 = vx - (vx + 200 - 26) * f - 26, x2 = vx + (776 - vx - 26) * f + 26;
    r += `<path d="M${x1} ${y1} H${x2}" stroke="${TINTA}" stroke-width="${3 * f + 1}"/>`;                               // juntas do chão
    const yt = vy - 52 - (vy - 52 + 200) * f; r += `<rect x="${(x1 + vx) / 2 - 2}" y="${yt}" width="${(x2 - x1) / 2 + 4}" height="${6 * f + 1}" fill="${PAPEL}" opacity=".85"/>`; } // luminárias
  r += `<path d="M-200 -200 L${vx - 26} ${vy - 52} L${vx - 26} ${vy + 38} L-200 1100z" fill="#26262a"/><path d="M776 -200 L${vx + 26} ${vy - 52} L${vx + 26} ${vy + 38} L776 1100z" fill="#26262a"/>`;
  for (let i = 1; i < 7; i++) { const f = Math.pow(.7, i), xl = vx - 26 - (vx + 200 - 26) * f, xr = vx + 26 + (776 - vx - 26) * f, yt = vy - 52 - (vy - 52 + 200) * f, yb = vy + 38 + (1100 - vy - 38) * f;
    r += `<path d="M${xl} ${yt} V${yb} M${xr} ${yt} V${yb}" stroke="${TINTA}" stroke-width="${4 * f + 1}"/>`; }
  r += `<rect x="${vx - 13}" y="${vy - 6}" width="26" height="44" fill="#fff" stroke="${VERM}" stroke-width="2"/>`;   // a porta
  r += `<text x="${vx}" y="${vy - 14}" font-family="Poppins" font-weight="800" font-size="14" text-anchor="middle" fill="${VERM}">VAGA</text>`;
  return r + `</g>`;
}
// crachá chapado
function cracha(tl) {
  const [jx, jy] = jit(quadro(tl), quadro(tl) < 2 ? 10 : 0);
  const z = tl > .3 ? 1.22 : 1;
  return `<rect x="-50" y="-50" width="676" height="1124" fill="${TINTA}"/><rect x="-50" y="560" width="676" height="400" fill="${VERM}"/>`
    + `<g transform="translate(${288 + jx} ${520 + jy}) scale(${z}) rotate(-6)">`
    + `<path d="M0 -330 V-170" stroke="${PAPEL}" stroke-width="10"/>`
    + `<rect x="-170" y="-180" width="340" height="230" fill="${PAPEL}" stroke="#000" stroke-width="6"/>`
    + `<rect x="-30" y="-196" width="60" height="26" fill="${TINTA}"/>`
    + `<text x="0" y="-108" font-family="${SERIF}" font-weight="800" font-size="40" text-anchor="middle" fill="${TINTA}">ESTAGIÁRIO</text>`
    + `<path d="M-140 -88 h280" stroke="${TINTA}" stroke-width="3"/>`
    + `<text x="0" y="12" font-family="${SERIF}" font-weight="800" font-size="76" text-anchor="middle" fill="${VERM}">R$ 0,00</text></g>`;
}
// contra-plongée: dois prédios convergindo para o alto; lá em cima, uma janela com alguém (cabeça e ombros) e um olho vermelho
// k = degrau de avanço até a janela (0..3)
function alto(tl, k) {
  const sc = [1, 1.6, 2.6, 4.2][k], fy = 300;          // foco: a janela
  let r = `<rect x="-50" y="-50" width="676" height="1124" fill="${PAPEL}"/>`;
  r += `<g transform="translate(288 ${lerp(500, 470, k / 3)}) scale(${sc}) translate(-288 ${-fy})">`;
  r += `<path d="M-120 1100 L200 330 L262 330 L274 1100z" fill="${TINTA}"/><path d="M696 1100 L376 330 L314 330 L302 1100z" fill="${TINTA}"/>`;
  for (let i = 0; i < 6; i++) { const f = 1 - i / 6, y = 1000 - i * 110, w = 12 + 22 * f;
    r += `<rect x="${lerp(170, 30, f)}" y="${y}" width="${w}" height="${w * .6}" fill="${PAPEL}"/><rect x="${lerp(406, 546, f) - w}" y="${y}" width="${w}" height="${w * .6}" fill="${PAPEL}"/>`; }
  r += `<path d="M262 330 L314 330 L306 250 L270 250z" fill="${TINTA}"/>`;                                    // a torre
  r += `<rect x="272" y="274" width="32" height="36" fill="${VERM}"/>`;                                       // a janela acesa
  r += `<path d="M276 310 q12 -14 24 0z" fill="#000"/><circle cx="288" cy="290" r="7" fill="#000"/>`;        // alguém
  r += `<circle cx="291" cy="289" r="2.2" fill="${VERM}"/>`;                                                  // o olho
  return r + `</g>`;
}
// ele de perfil, olhando para cima com o head tilt (mola) e 3 cabeças-fantasma; inv = troca vermelho↔preto (2 quadros no impacto)
function tilt(tl, t0, inv) {
  const dt = tl - t0, alvo = -55, mola = d => d < 0 ? 4 : d < .06 ? 4 + 6 * (d / .06) : alvo + (10 - alvo) * Math.exp(-9 * (d - .06)) * Math.cos(26 * (d - .06));
  const fundo = inv ? TINTA : PAPEL, chao = inv ? VERM : TINTA, fig = inv ? VERM : TINTA, num = inv ? TINTA : VERM;
  let r = `<rect x="-50" y="-50" width="676" height="1124" fill="${fundo}"/><rect x="-50" y="700" width="676" height="400" fill="${chao}"/>`;
  r += `<path d="M-50 700 H626" stroke="${inv ? PAPEL : VERM}" stroke-width="4"/>`;
  if (dt > .06 && dt < .5) [.08, .16, .24].forEach(d => { r += `<g opacity=".28">${sil(200, 700, 4.6, { num: '', braco: 2, cabeca: mola(dt - d), perfil: 1, tinta: fig })}</g>`; });
  r += sil(200, 700, 4.6, { num: '456', cor: num, braco: 2, cabeca: mola(dt), perfil: 1, tinta: fig, pupila: num });
  return r;
}

// ---------------------------------------------------------------- planos
const P0 = { blur: false, split: false, enq: false, cam: { s: [1, 1], c: [288, 512], c1: [288, 512], pop: false } };
const CENAS = [
  // 1 · "Quatrocentos e cinquenta e seis candidatos." — cartela 456 sangrando pela direita → a grade inteira; avanço em 3 degraus
  { ...P0, l: 0, sfx: [{ t: 0, s: 'impacto', v: .5 }, { t: .7, s: 'tic', v: .5 }, { t: 1.1, s: 'tic', v: .5 }, { t: 1.5, s: 'tic', v: .5 }],
    f: (tl) => { if (tl < .3) return cartela(tl, '456', { fs: 400, x: 700, anc: 'end', sub: 'CANDIDATOS', suby: 760 });
      const passo = Math.min(3, Math.floor((tl - .3) / .4)), s = [.62, .8, 1.05, 1.4][passo];
      const cam = { s, cx: lerp(288, ULT.x - 120, passo / 3 * .6), cy: lerp(G_Y0 + G_LIN * G_CEL / 2, ULT.y - 200, passo / 3 * .6) };
      return mundo(cam, grade(cam, s > .9)); } },
  // 2 · "Uma vaga de estágio." — cartelas UMA / VAGA → corredor com a porta pequena, avanço em degraus
  { ...P0, l: 1, sfx: [{ t: 0, s: 'impacto', v: .4 }, { t: .2, s: 'impacto', v: .45 }],
    f: (tl) => tl < .16 ? cartela(tl, 'UMA', { bg: TINTA, fg: PAPEL, fs: 230, x: 40, anc: 'start', y: 560 })
      : tl < .36 ? cartela(tl - .16, 'VAGA', { fs: 250, y: 600 })
      : corredor(Q(tl - .36, .2) * .9) },
  // 3 · "Sem salário." — cartela SEM → o crachá ESTAGIÁRIO · R$ 0,00
  { ...P0, l: 2, sfx: [{ t: 0, s: 'impacto', v: .45 }, { t: .2, s: 'papel', v: .6 }],
    f: (tl) => tl < .18 ? cartela(tl, 'SEM', { bg: TINTA, fg: VERM, fs: 300, y: 620 }) : cracha(tl - .18) },
  // 4 · "Eu era o último número." — de volta à grade: avanço seco até o 456 vermelho; termina descentrado (ele na borda)
  { ...P0, l: 3, sfx: [{ t: .25, s: 'tic', v: .5 }, { t: .5, s: 'tic', v: .5 }, { t: .75, s: 'impacto', v: .35 }],
    f: (tl) => { const passo = Math.min(3, Math.floor(tl / .25)), s = [1.4, 2.2, 3.4, 5.5][passo];
      const cam = { s, cx: lerp(ULT.x - 120, ULT.x - 20, passo / 3), cy: lerp(ULT.y - 200, ULT.y - 50, passo / 3) };
      return mundo(cam, grade(cam, true)); } },
  // 5 · "E, lá em cima," — ele de perfil, silêncio; no "lá em cima" a cabeça chicoteia para cima + 2 quadros de troca vermelho↔preto
  { ...P0, l: 4, sfx: [{ t: .44, s: 'swish', v: .5 }, { t: .56, s: 'impacto', v: .4 }],
    f: (tl) => tilt(tl, .38, tl > .56 && tl < .56 + 2 / 30) },
  // 6 · "alguém já estava assistindo." — contra-plongée: alguém na janela lá no alto; avanço em degraus até o olho;
  //     no "assistindo", cartela ASSISTINDO (9 quadros, sangrando) e fecha na fenda vermelha
  { ...P0, l: 4, w: 4, sfx: [{ t: .3, s: 'tic', v: .5 }, { t: .55, s: 'tic', v: .5 }, { t: .78, s: 'impacto', v: .5 }],
    f: (tl) => tl < .3 ? alto(tl, 0) : tl < .55 ? alto(tl, 1) : tl < .78 ? alto(tl, 2) : tl < 1.08 ? cartela(tl - .78, 'ASSISTINDO', { fs: 190, x: -30, anc: 'start', y: 590, ls: -6, sub: '● REC', subx: 46, suby: 330 })
      : tl < 1.4 ? alto(tl, 3) : fenda(1 - Math.min(1, (tl - 1.4) / .25)) },
];
