// TESTE 01 · pele "scifi-toon" (estilos: Sci-Fi Sitcom Toon do Lemo-Opuscar, só a gramática) no stickman do anima-ovitinho.
// Linha que treme (BOIL, 3 desenhos a 12 fps), cor chapada com sombra recortada, olhos brancos grandes de pupila pequena,
// uma paleta por mundo, o portal é a única coisa que brilha, etiqueta de terminal (VT323). Elenco e portal nossos.
const STK_TOON = true, BOIL = { amp: 4.8, freq: .02 };
const LEGENDA_PALAVRAS = 3, CORTE_MAX_EP = 99, EFEITOS_DB = -14, CAUDA = 1.0;
const AMBIENTE = { '0': null };
const SEM_VINHETA = true;
const ESTILO_CSS = `#sub{font-family:'Baloo 2';font-size:46px;letter-spacing:0}
#sub span{-webkit-text-stroke:11px #1b1422;text-shadow:none}
#sub span.on{color:#FFE14D}`;
document.body.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:-999px;font-family:'Baloo 2';font-weight:800">ÁÇÚ</span><span style="position:absolute;left:-999px;font-family:'VT323'">0800</span>`);
const INKT = STK_INK;

// ---------------------------------------------------------------- paletas (uma por mundo)
const GARAGEM = { parede: '#E3B04B', paredeS: '#C8952F', chao: '#3E8C84', chaoS: '#2F6F69', fundo: '#F2D27A' };
const NOITE = { parede: '#3B3A6B', paredeS: '#2C2B55', chao: '#24435A', chaoS: '#1A3346', fundo: '#4B4A80' };
const PRAIA = { ceu: '#FF8A3D', ceu2: '#FFB36B', mar: '#1FB5A8', areia: '#F6D7A0', areiaS: '#E3BC7E' };
const BRILHO = ['#C04BFF', '#F08CFF', '#FFF1FF'];   // só o portal usa

// ---------------------------------------------------------------- elenco (nosso)
const EU = { tipo: 'adulto', pele: '#E9B98F', peleSombra: '#CF9A70', calca: '#3A3F5C', sapato: '#EDEDED', camisa: '#4C7BD9', manga: '#4C7BD9', mangaLonga: 1, sobrancelha: '#3a2416',
  roupa: (D, hip, topo) => `<path d="M${-D.ombro - 14} ${topo + 4} q${D.ombro + 14} -12 ${2 * D.ombro + 28} 0 l4 ${hip - topo + 8} h${-2 * D.ombro - 36}z" fill="#4C7BD9" stroke="${INKT}" stroke-width="6" stroke-linejoin="round"/>`
    + `<path d="M${D.ombro + 2} ${topo + 10} l4 ${hip - topo - 4} h-14z" fill="#3A62B8"/><rect x="-24" y="${topo + 92}" width="48" height="26" rx="8" fill="#3A62B8" stroke="${INKT}" stroke-width="4"/>`
    + `<path d="M-8 ${topo + 6} l-3 30 M8 ${topo + 6} l3 30" stroke="#EDEDED" stroke-width="4" stroke-linecap="round"/>`,
  frente: (r, cy) => `<path d="M${-r * .98} ${cy - r * .15} q-${r * .1} -${r * .9} ${r * .4} -${r * .98} q${r * .2} -${r * .28} ${r * .45} -${r * .06} q${r * .25} -${r * .3} ${r * .45} ${r * .02} q${r * .45} ${r * .02} ${r * .66} ${r * .9} q-${r * .5} -${r * .3} -${r * 1.0} -${r * .28} q-${r * .3} ${r * .1} -${r * .96} ${r * .4}z" fill="#3a2416" stroke="${INKT}" stroke-width="6" stroke-linejoin="round"/>` };
const escorredor = (r, cy) => `<path d="M${-r * 1.08} ${cy - r * .35} q0 -${r * 1.1} ${r * 1.08} -${r * 1.1} q${r * 1.08} 0 ${r * 1.08} ${r * 1.1}z" fill="#B9C2CC" stroke="${INKT}" stroke-width="6" stroke-linejoin="round"/>`
  + `<path d="M${r * .2} ${cy - r * .5} q${r * .45} -${r * .1} ${r * .78} -${r * .55}" stroke="#8F99A4" stroke-width="${r * .22}" fill="none" stroke-linecap="round"/>`
  + [[-.6, -.6], [-.25, -.85], [.15, -.9], [.5, -.75], [-.45, -1.0], [-.05, -1.1]].map(([x, y]) => `<circle cx="${x * r}" cy="${cy + y * r * .78}" r="${r * .07}" fill="${INKT}"/>`).join('')
  + `<path d="M${-r * 1.3} ${cy - r * .38} h${r * .3} M${r * 1.0} ${cy - r * .38} h${r * .3}" stroke="${INKT}" stroke-width="7" stroke-linecap="round"/>`
  + `<path d="M${-r * .3} ${cy - r * 1.18} l-8 -22 M${r * .3} ${cy - r * 1.18} l8 -22" stroke="${INKT}" stroke-width="4"/><circle cx="${-r * .3 - 8}" cy="${cy - r * 1.18 - 24}" r="6" fill="#FF4F6D" stroke="${INKT}" stroke-width="3"/><circle cx="${r * .3 + 8}" cy="${cy - r * 1.18 - 24}" r="6" fill="#4FFFB0" stroke="${INKT}" stroke-width="3"/>`;
const VIZ = { tipo: 'adulto', pele: '#D49A72', peleSombra: '#B57B55', calca: '#8A7B66', sapato: '#2E9BD6', camisa: '#EFEBDD', sobrancelha: '#4a3a30', bigode: '#5a4636',
  roupa: (D, hip, topo) => `<path d="M${-D.ombro - 4} ${topo + 4} q${D.ombro + 4} 22 ${2 * D.ombro + 8} 0 q22 ${(hip - topo) * .55} 6 ${hip - topo + 6} h${-2 * D.ombro - 20} q-16 -${(hip - topo) * .5} 6 ${-(hip - topo) - 2}z" fill="#EFEBDD" stroke="${INKT}" stroke-width="6" stroke-linejoin="round"/>`
    + `<ellipse cx="10" cy="${topo + 92}" rx="12" ry="9" fill="#C9A15A" opacity=".8"/><path d="M${-D.ombro - 2} ${hip - 6} h${2 * D.ombro + 6}" stroke="${INKT}" stroke-width="4"/>`,
  frente: escorredor };

// ---------------------------------------------------------------- peças
const bandas = (cores, ys) => cores.map((c, i) => `<rect x="-400" y="${ys[i]}" width="1400" height="${(ys[i + 1] ?? 2000) - ys[i]}" fill="${c}"/>`).join('');
const CAIXA = `<rect x="452" y="620" width="18" height="180" fill="${INKT}"/><rect x="410" y="560" width="104" height="70" rx="12" fill="#D9534F" stroke="${INKT}" stroke-width="6"/><path d="M422 584 h80" stroke="${INKT}" stroke-width="5"/>`;
function garagem(P) { // parede, prateleira, bancada, porta de enrolar; chão em y 800
  return bandas([P.parede, P.chao], [-400, 800]) + `<rect x="-400" y="800" width="1400" height="14" fill="${P.chaoS}"/>`
    + `<rect x="300" y="230" width="330" height="420" fill="${P.paredeS}" stroke="${INKT}" stroke-width="6"/>` + [0, 1, 2, 3, 4, 5].map(i => `<path d="M300 ${290 + i * 60} h330" stroke="${INKT}" stroke-width="4"/>`).join('')
    + `<path d="M-60 330 h300" stroke="${INKT}" stroke-width="8"/><rect x="-20" y="270" width="44" height="60" fill="#D9534F" stroke="${INKT}" stroke-width="5"/><rect x="40" y="290" width="70" height="40" fill="#5BC0A0" stroke="${INKT}" stroke-width="5"/>`
    + `<circle cx="160" cy="300" r="26" fill="#FFF3D6" stroke="${INKT}" stroke-width="5"/><path d="M160 300 v-16 M160 300 l12 6" stroke="${INKT}" stroke-width="4" stroke-linecap="round"/>`
    + `<rect x="-40" y="600" width="250" height="26" fill="#9A6A42" stroke="${INKT}" stroke-width="6"/><path d="M-20 626 v174 M190 626 v174" stroke="${INKT}" stroke-width="10"/>`
    + CAIXA + `<rect x="20" y="560" width="54" height="40" rx="6" fill="#7E8A97" stroke="${INKT}" stroke-width="5"/><circle cx="36" cy="580" r="7" fill="#FF4F6D" stroke="${INKT}" stroke-width="3"/>`;
}
// o portal: aro irregular grosso, braços em espiral girando, miolo claro, faíscas em órbita e pingos. k = abertura (0..1, com overshoot)
function portal(x, y, r, k, t) {
  if (k <= .01) return '';
  const R = r * k, rr = a => R * (1 + .07 * Math.sin(a * 5 + t * 3) + .04 * Math.sin(a * 9 - t * 5));
  let aro = ''; for (let i = 0; i <= 40; i++) { const a = i / 40 * Math.PI * 2; aro += (i ? 'L' : 'M') + (x + Math.cos(a) * rr(a) * .78).toFixed(1) + ' ' + (y + Math.sin(a) * rr(a)).toFixed(1); }
  let s = `<ellipse cx="${x}" cy="${y}" rx="${R * 1.25}" ry="${R * 1.45}" fill="${BRILHO[0]}" opacity=".16"/><ellipse cx="${x}" cy="${y}" rx="${R * 1.0}" ry="${R * 1.2}" fill="${BRILHO[1]}" opacity=".14"/>`;
  s += `<path d="${aro}z" fill="${BRILHO[0]}" stroke="${INKT}" stroke-width="7" stroke-linejoin="round"/>`;
  for (let j = 0; j < 4; j++) { let d = ''; for (let i = 0; i <= 14; i++) { const u = i / 14, a = j * Math.PI / 2 + u * 3.2 + t * 2.4, q = R * (.12 + .78 * u); d += (i ? 'L' : 'M') + (x + Math.cos(a) * q * .78).toFixed(1) + ' ' + (y + Math.sin(a) * q).toFixed(1); }
    s += `<path d="${d}" stroke="${BRILHO[1]}" stroke-width="${R * .09}" fill="none" stroke-linecap="round"/>`; }
  s += `<ellipse cx="${x}" cy="${y}" rx="${R * .22}" ry="${R * .28}" fill="${BRILHO[2]}"/>`;
  for (let i = 0; i < 6; i++) { const a = t * 1.6 + i * 1.05, q = R * 1.12; s += `<circle cx="${x + Math.cos(a) * q * .8}" cy="${y + Math.sin(a) * q}" r="5" fill="${BRILHO[2]}"/>`; }
  for (let i = 0; i < 3; i++) { const dx = (i - 1) * R * .35, l = R * (.12 + .1 * ((t * 1.3 + i * .37) % 1)); s += `<path d="M${x + dx} ${y + R * .9} q4 ${l} 0 ${l * 1.4}" stroke="${BRILHO[0]}" stroke-width="10" stroke-linecap="round" fill="none"/>`; }
  return s;
}
const abre = (u) => u <= 0 ? 0 : u >= .3 ? 1 : (() => { const x = u / .3, c1 = 1.7, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); })(); // back-ease, ~12 %
const lavagem = (k) => k > 0 ? `<rect x="-400" y="-400" width="1400" height="2000" fill="${BRILHO[0]}" opacity="${.12 * Math.min(1, k)}"/>` : '';
// etiqueta de terminal digitada (VT323)
function tagTerminal(txt, u, cor = '#7CFFB2') { const n = Math.max(0, Math.min(txt.length, Math.floor(u * 22)));
  return `<g transform="translate(26 120)"><rect x="0" y="0" width="${24 + txt.length * 15}" height="44" rx="6" fill="#141020" stroke="${INKT}" stroke-width="5"/>`
    + `<text x="12" y="31" font-family="VT323" font-size="30" fill="${cor}">${txt.slice(0, n)}${Math.floor(u * 4) % 2 ? '▌' : ''}</text></g>`; }
// o boleto: papel com olhos, dentes e perninhas (nojento e fofo, sem fala)
function boleto(x, y, s, t, o = {}) {
  const pa = Math.sin(t * 16) * 10 * (o.anda ?? 1);
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${o.rot || 0})">`
    + `<path d="M-30 -8 l${-8 + pa * .5} 30 M30 -8 l${8 - pa * .5} 30 M-12 -4 l${-4 - pa * .4} 28 M12 -4 l${4 + pa * .4} 28" stroke="${INKT}" stroke-width="7" stroke-linecap="round"/>`
    + `<path d="M-46 -150 h76 l16 16 v134 h-92z" fill="#FBF8EF" stroke="${INKT}" stroke-width="6" stroke-linejoin="round"/><path d="M30 -150 v16 h16" fill="#E5DFCC" stroke="${INKT}" stroke-width="5" stroke-linejoin="round"/>`
    + [-60, -48, -36].map(yy => `<path d="M-34 ${yy} h56" stroke="#9C9686" stroke-width="4"/>`).join('')
    + `<rect x="-36" y="-26" width="70" height="14" fill="${INKT}"/>` + [-30, -22, -16, -8, 0, 6, 14, 20, 26].map(xx => `<path d="M${xx} -24 v10" stroke="#FBF8EF" stroke-width="2"/>`).join('')
    + `<ellipse cx="-16" cy="-112" rx="15" ry="17" fill="#fff" stroke="${INKT}" stroke-width="5"/><ellipse cx="16" cy="-112" rx="15" ry="17" fill="#fff" stroke="${INKT}" stroke-width="5"/>`
    + `<circle cx="${-13 + (o.olhar || 0) * 5}" cy="-110" r="4" fill="${INKT}"/><circle cx="${19 + (o.olhar || 0) * 5}" cy="-110" r="4" fill="${INKT}"/>`
    + `<path d="M-24 -84 q24 ${o.boca ? 26 : 12} 48 0z" fill="#5a1f2a" stroke="${INKT}" stroke-width="5" stroke-linejoin="round"/><path d="M-18 -83 l5 7 l5 -7 l5 7 l5 -7 l5 7 l5 -7" stroke="#fff" stroke-width="3" fill="none"/>`
    + `<text x="-10" y="-134" font-family="Poppins" font-weight="800" font-size="10" text-anchor="middle" fill="#D9534F">VENCE HOJE</text></g>`;
}
const fig = (P, x, y, s, t, o = {}) => stick(P, { x, y, s, t, ...o });

// ---------------------------------------------------------------- planos
const CONTROLE = `<rect x="-12" y="-20" width="24" height="36" rx="5" fill="#7E8A97" stroke="${INKT}" stroke-width="5"/><circle cx="0" cy="-8" r="5" fill="#FF4F6D"/>`;
const CHINELO = (x, y) => `<path d="M${x} ${y} q22 -6 30 8 l0 4 h-34z" fill="#2E9BD6" stroke="${INKT}" stroke-width="5"/>`;
const sobe = (a, b, k) => clamp((k - a) / (b - a)); // 0..1 entre a e b
const CENAS = [
  // 1 · "Meu vizinho inventou" — garagem (mostarda e verde-água): o vizinho de capacete de escorredor, controle na mão; eu ao lado, na mesma linha do chão
  { l: 0, cam: { s: [1, 1.04], c: [288, 548], c1: [288, 544] },
    f: (tl, d, t) => garagem(GARAGEM) + fig(VIZ, 350, 800, .74, t, { flip: true, olhar: -.6, boca: 'sorriso', palpebra: .2, pose: { bD: [35, 45] }, segura: CONTROLE })
      + fig(EU, 105, 800, .72, t, { olhar: .7, palpebra: .5 }) },
  // 2 · "um portal pra outras dimensões." — ele aperta o controle; o portal abre com overshoot; lavagem roxa; etiqueta de terminal
  { l: 0, w: 4, sfx: [{ t: .05, s: 'riser', v: .5 }, { t: .3, s: 'vapor', v: .4 }], cam: { s: [.92, .96], c: [288, 548], c1: [284, 546] },
    f: (tl, d, t) => { const k = abre(tl - .05); return garagem(GARAGEM) + lavagem(k) + portal(300, 520, 170, k, t)
      + fig(VIZ, 505, 800, .7, t, { flip: true, olhar: -.8, boca: 'riso', palpebra: .1, sobrancelha: 'surpreso', pose: { bD: [35, 45] }, segura: CONTROLE })
      + fig(EU, 90, 800, .7, t, { olhar: .9, olhos: 'arregalados', palpebra: 0, boca: 'o' }) + (tl > .5 ? tagTerminal('DIMENSAO 0800', (tl - .5) / 1.1) : ''); } },
  // 3 · "E usa pra quê?" — reação: close em mim, cara de nada (pálpebra pesada de verdade), o brilho roxo de lado
  { l: 1, split: false, blur: false, cam: { s: [1, 1.03], c: [288, 470] },
    f: (tl, d, t) => bandas([GARAGEM.parede], [-400]) + `<rect x="420" y="-400" width="600" height="2000" fill="${BRILHO[0]}" opacity=".18"/>`
      + fig(EU, 270, 1330, 1.55, t, { olhar: -.15, palpebra: .55, boca: 'neutra', semCorte: true, still: true, semPiscar: true }) },
  // 4 · "Pra fugir do boleto." — o boleto na caixa de correio olha para ele; ele foge e mergulha no portal (some dentro do aro); o chinelo fica no chão
  { l: 2, sfx: [{ t: .3, s: 'whoosh', v: .5 }, { t: .75, s: 'pop', v: .5 }], cam: { s: [1, 1.05], c: [288, 548], c1: [292, 544] },
    f: (tl, d, t) => { const u = clamp((tl - .2) / .6), x = lerp(450, 300, ease(u)), y = lerp(800, 610, ease(u)) - Math.sin(u * Math.PI) * 120, esc = .72 * (1 - sobe(.55, 1, u));
      return garagem(GARAGEM) + lavagem(1) + portal(300, 520, 170, 1, t)
        + boleto(462, 598, .8, t, { anda: 0, olhar: -1, boca: 1 })
        + (esc > .03 ? fig(VIZ, x, y, esc, t, { flip: true, olhar: -.8, olhos: 'arregalados', palpebra: 0, boca: 'grito', pose: { tronco: -75 * ease(u), bD: [165, 0], bE: [165, 0], pE: [-40, 30], pD: [-10, 20] }, semCorte: true, sombra: false }) : '')
        + (u > .1 ? CHINELO(372, 796) : ''); } },
  // 5 · "Mas ontem," — mundo novo de cor: a garagem à noite (anil), o portal sozinho; o boleto na caixa
  { l: 3, sfx: [{ t: .1, s: 'interruptor', v: .5 }], cam: { s: [.94, .98], c: [288, 548] },
    f: (tl, d, t) => garagem(NOITE) + lavagem(1.4) + portal(300, 520, 170, 1, t) + CHINELO(372, 796) + boleto(462, 598, .8, t, { anda: 0, olhar: -1 }) },
  // 6 · "o boleto atravessou" — o boleto pula da caixa, anda até o portal e salta para dentro (encolhe no aro, clarão roxo)
  { l: 3, w: 2, sfx: [{ t: .1, s: 'papel', v: .6 }, { t: .78, s: 'pop', v: .5 }], cam: { s: [1.05, 1.1], c: [330, 580], c1: [320, 576] },
    f: (tl, d, t) => { const a = sobe(0, .55, tl), b = sobe(.55, .95, tl);
      const x = b > 0 ? lerp(380, 300, b) : lerp(462, 380, a), y = b > 0 ? lerp(800, 560, b) - Math.sin(b * Math.PI) * 90 : lerp(598, 800, sobe(0, .15, tl)), esc = .85 * (1 - sobe(.5, 1, b));
      return garagem(NOITE) + lavagem(1.4 + (b > .9 ? 3 : 0)) + portal(300, 520, 170, 1, t) + CHINELO(372, 796)
        + (esc > .03 ? boleto(x, y, esc, t, { olhar: -1, boca: 1, rot: -25 * b, anda: b > 0 ? 0 : 1 }) : ''); } },
  // 7 · "o portal atrás dele." — do outro lado: praia (laranja e verde-água), ele relaxando com um coco; o boleto sai do portal atrás dele; o coco cai
  { l: 3, w: 5, sfx: [{ t: .15, s: 'pop', v: .55 }, { t: .55, s: 'impacto', v: .35 }, { t: 1.25, s: 'pedra_chao', v: .5 }], cam: { s: [1, 1.04], c: [288, 520], c1: [282, 516] },
    f: (tl, d, t) => { const u = sobe(.1, .55, tl), assusta = tl > .55, cai = sobe(1.0, 1.25, tl);
      const coco = `<circle cx="0" cy="-10" r="22" fill="#7A4E2D" stroke="${INKT}" stroke-width="5"/><path d="M2 -30 l10 -26" stroke="#FF4F6D" stroke-width="5"/>`;
      return bandas([PRAIA.ceu, PRAIA.ceu2, PRAIA.mar, PRAIA.areia], [-400, 300, 560, 700]) + `<circle cx="480" cy="190" r="56" fill="#FFF1C2" stroke="${INKT}" stroke-width="6"/>`
        + `<path d="M520 700 q-30 -200 10 -330" stroke="${INKT}" stroke-width="14" fill="none"/><path d="M530 370 q-90 -30 -150 30 M530 370 q-40 -80 -120 -80 M530 370 q70 -40 120 10" stroke="#2F9E5B" stroke-width="22" fill="none" stroke-linecap="round"/>`
        + portal(150, 380, 120, 1, t) + `<rect x="-400" y="-400" width="1400" height="2000" fill="${BRILHO[0]}" opacity=".08"/>`
        + boleto(lerp(150, 230, u), lerp(470, 720, ease(u)), .85, t, { olhar: 1, boca: 1, rot: lerp(-40, 0, u), anda: u >= 1 ? .3 : 1 })
        + (cai > 0 ? `<g transform="translate(${lerp(392, 400, cai)} ${lerp(640, 724, cai * cai)})">${coco}</g>` : '')
        + fig(VIZ, 400, 720, .66, t, { flip: true, segura: cai > 0 ? '' : coco, olhar: assusta ? -1 : -.2, olhos: assusta ? 'arregalados' : null, palpebra: assusta ? 0 : .7, boca: assusta ? 'o' : 'sorriso', sobrancelha: assusta ? 'surpreso' : null, pose: { tronco: assusta ? -6 : 4, bE: [14, 10], bD: assusta ? [40, 20] : [20, 60] } }); } },
];
