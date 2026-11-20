//@acervo toon toon3d
// EP01 · O Assalto — storyboard em pt/storyboard.md (v2, 79 planos). Visual: kit toon, cor chapada (sem luz de cinema), abertura 3D.
const LEGENDA_PALAVRAS = 3, CORTE_MAX_EP = 99, EFEITOS_DB = -24, CAUDA = 2.0;
const AMBIENTE = { '0': null };
const SEM_VINHETA = true;
const ESTILO_CSS = `#sub{font-family:'Baloo 2';font-size:46px;letter-spacing:0}
#sub span{-webkit-text-stroke:11px #1b1422;text-shadow:none}
#sub span.on{color:#FFE14D}`;
document.body.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:-999px;font-family:'Baloo 2';font-weight:800">ÁÇÚ</span><span style="position:absolute;left:-999px;font-family:'VT323'">0800</span>`);

const sobe = (a, b, k) => clamp((k - a) / (b - a));
const ws = (l, w = 0) => PALAVRAS[LINHAS[l][w]].s;
const passo = (tl, p = .25) => Math.floor(tl / p) * p;   // movimento em degraus

// ================================================================ ELENCO
const VERM = { tipo: 'macacao', cor: '#D8312B', corS: '#AE211D' }, VERM_C = { cor: '#D8312B', corS: '#AE211D' };
const LUVA = '#231c2c', BOTA = '#2a2430';
const crespo = (cor = '#1e130c') => () => { let r = tForma(tSpl([[-88, -30], [-86, -96], [-40, -128], [26, -134], [82, -108], [98, -56], [70, -84], [30, -92], [-10, -86], [-50, -66]]), cor);
  for (let i = 0; i < 12; i++) { const a = Math.PI * (1.05 + i * .085), x = 6 + Math.cos(a) * 92, y = -14 + Math.sin(a) * 112; r += `<circle cx="${_p(x)}" cy="${_p(y)}" r="17" fill="${cor}"/>`; } return r; };
const curtoLiso = (cor) => () => tForma(tSpl([[-88, -20], [-84, -98], [-30, -130], [40, -128], [90, -96], [96, -60], [60, -86], [10, -96], [-40, -80], [-60, -40]]), cor) + tTraco('M20 -126 Q30 -104 18 -92', TLW, '#00000044');
const BELEM = { pele: '#8D5A3B', peleS: '#704530', sobrancelha: '#1e130c', tronco: VERM, calca: VERM_C, sapato: BOTA, sapatoS: '#15111a', mao: LUVA, cabeca: crespo(), ph: 0 };
const MESTRE = { pele: '#E6B996', peleS: '#C9967A', sobrancelha: '#3a2a20', nariz: 'reto', tronco: VERM, calca: VERM_C, sapato: BOTA, sapatoS: '#15111a', mao: LUVA, oculos: TINK, cabeca: curtoLiso('#3a2a20'), ph: .8 };
const MESTRE_DONO = { ...MESTRE, tronco: { ...VERM, aberto: 1, camisa: '#F4F1EA', gravata: '#6E1E2E' } };
const trancas = (cor = '#2a1810') => () => tForma(tSpl([[-90, -24], [-84, -98], [-30, -132], [40, -130], [92, -96], [96, -50], [50, -92], [-6, -98], [-50, -74]]), cor)
  + [0, 1, 2].map(i => tTraco(`M${-40 + i * 34} -120 Q${-30 + i * 34} -80 ${-36 + i * 34} -60`, TLW * .7, '#00000055')).join('');
const trancasAtras = (cor = '#2a1810') => () => [0, 1].map(i => tForma(tMacarrao([-60 - i * 14, -40], [-90 - i * 18, 120], -10, 22, 16), cor)).join('');
const MANAUS = { pele: '#B57A52', peleS: '#966141', sobrancelha: '#2a1810', tronco: VERM, calca: VERM_C, sapato: BOTA, sapatoS: '#15111a', mao: LUVA, cabeca: trancas(), atras: trancasAtras(), ph: 1.7 };
const RECIFE = { pele: '#E0A47E', peleS: '#C38862', sobrancelha: '#3a2a20', bigode: '#3a2a20', tronco: VERM, calca: VERM_C, sapato: BOTA, sapatoS: '#15111a', mao: LUVA, cabeca: curtoLiso('#4a3424'), ph: 2.4 };
const cocoque = () => tForma(tSpl([[-88, -10], [-86, -96], [-30, -130], [40, -128], [92, -92], [96, -40], [60, -80], [0, -90], [-50, -70]]), '#B9B4AE') + tForma(tElip(-70, -96, 34, 30), '#B9B4AE');
const MAE = { pele: '#8D5A3B', peleS: '#704530', sobrancelha: '#8a8580', tronco: { tipo: 'moletom', cor: '#8E6FA8', corS: '#73578C' }, calca: { cor: '#4A4F66', corS: '#3a3e52' }, sapato: '#C9B9A0', sapatoS: '#A8987F', cabeca: cocoque, ph: .4 };
const quepe = () => tForma(tSpl([[-90, -60], [-80, -120], [0, -146], [80, -126], [98, -70]]), '#24304F') + tForma(tSpl([[20, -66], [130, -60], [134, -44], [24, -50]]), '#1A2440') + tForma(tElip(10, -106, 14, 12), '#E8C34A');
const JAIRO = { pele: '#C98E66', peleS: '#AA744F', barriga: .95, sobrancelha: '#2a1a12', bigode: '#2a1a12', tronco: { tipo: 'camiseta', cor: '#2F3B5C', corS: '#232D47', detalhe: (omb) => tForma(tPoli([[20, omb + 40], [50, omb + 40], [50, omb + 64], [20, omb + 64]]), '#E8C34A') }, calca: { cor: '#232D47', corS: '#1A2238' }, sapato: '#141414', sapatoS: '#000', cabeca: quepe, ph: 2.9 };

// ================================================================ PEÇAS DO EPISÓDIO
const CHAVE = (s = 1, rot = 0) => `<g transform="scale(${s}) rotate(${rot})">${tForma(tPoli([[-26, -60], [0, -84], [26, -60], [26, -30], [-26, -30]]), '#E8B84A', tPinta(tPoli([[0, -84], [26, -60], [26, -30], [0, -30]]), '#C8962E'))}`
  + `${tForma(tElip(0, -52, 7, 7), '#5a3a10')}${tForma(tPoli([[-6, -30], [6, -30], [6, 40], [-6, 40]]), '#E8B84A')}${tForma(tPoli([[6, 14], [22, 14], [22, 22], [6, 22]]), '#E8B84A')}${tForma(tPoli([[6, 28], [18, 28], [18, 36], [6, 36]]), '#E8B84A')}</g>`;
const fundoChapado = (cor) => `<rect x="-400" y="-400" width="1400" height="2000" fill="${cor}"/>`;
// esconderijo: garagem velha verde-musgo com luminária pendurada e caixa de alarme na parede
const ESC = { parede: '#5E7A55', paredeS: '#4C6645', chao: '#3C4A36', chaoS: '#2F3B2A' };
function esconderijo(o = {}) { const y = o.chao ?? 800;
  let r = paredeToon(ESC.parede, ESC.paredeS, y, { passo: 160 }) + chaoToon(ESC.chao, ESC.chaoS, y, { tabuas: 1 });
  r += tTraco('M288 -400 V180', TLW) + tForma('M228 180 L348 180 L320 140 L256 140Z', '#2E3A2B') + `<ellipse cx="288" cy="184" rx="58" ry="10" fill="#FFF1B8"/>`;
  if (o.quadro) r += tForma(tPoli([[330, 330], [560, 330], [560, 560], [330, 560]]), '#22302A') + o.quadro;
  if (o.alarme !== false) r += alarmeCaixa(o.ax ?? 70, o.ay ?? 420, o.alarmeOn ?? false, o.t || 0);
  return r; }
// caixa de alarme com luz vermelha giratória (a mesma no esconderijo e no banco)
function alarmeCaixa(x, y, on, t, s = 1) { const a = (t * 8) % (Math.PI * 2);
  return `<g transform="translate(${x} ${y}) scale(${s})">` + tForma(tPoli([[-34, -10], [34, -10], [34, 60], [-34, 60]]), '#C9C4BA', tPinta(tPoli([[10, -10], [34, -10], [34, 60], [10, 60]]), '#ADA89E'))
    + tForma(`M-20 -10 Q-20 -48 0 -48 Q20 -48 20 -10Z`, on ? '#FF3B30' : '#7A2A26')
    + (on ? `<path d="M0 -30 L${Math.cos(a) * 160} ${-30 + Math.sin(a) * 50} L${Math.cos(a + .35) * 160} ${-30 + Math.sin(a + .35) * 50}Z" fill="#FF3B30" opacity=".35"/>` : '') + tTraco('M0 60 V140', TLW * 1.2) + `</g>`; }
// casinha amarela da família (memória)
function casaFamilia(o = {}) { let r = fundoChapado('#9FC6E0') + `<rect x="-400" y="760" width="1400" height="800" fill="#7FA35A"/>` + tTraco('M-400 760 H1000');
  r += tForma(tPoli([[110, 420], [470, 420], [470, 760], [110, 760]]), '#F2C94C', tPinta(tPoli([[110, 420], [180, 420], [180, 760], [110, 760]]), '#D9AE36'));
  r += tForma(tPoli([[80, 430], [290, 270], [500, 430]]), '#B5533C') + tForma(tPoli([[250, 600], [330, 600], [330, 760], [250, 760]]), '#7A4A2A') + tForma(tPoli([[140, 520], [220, 520], [220, 590], [140, 590]]), '#BFE3F5');
  r += [150, 175, 200].map((x, i) => tForma(tElip(x, 600, 12, 10), ['#E86A5A', '#F7E3B0', '#E9A0C8'][i])).join('');
  if (o.carimbo) { const k = o.carimbo; r += `<g transform="translate(290 560) rotate(-12) scale(${1.6 - .6 * k})" opacity="${k}">` + tForma(tPoli([[-150, -50], [150, -50], [150, 50], [-150, 50]]), 'none') + `<rect x="-150" y="-50" width="300" height="100" fill="none" stroke="#C0392B" stroke-width="12"/><text x="0" y="28" font-family="Baloo 2" font-weight="800" font-size="78" text-anchor="middle" fill="#C0392B">TOMADO</text></g>`; }
  return r; }
const memoria = (svg) => `<g style="filter:saturate(.35) sepia(.25)">${svg}</g>`;
// etiqueta de nome no peito (close)
const etiquetaNome = (txt) => `<g transform="rotate(-4)">` + tForma(tPoli([[-120, -40], [120, -40], [120, 40], [-120, 40]]), '#FBF8EF') + `<text x="0" y="18" font-family="Baloo 2" font-weight="800" font-size="52" text-anchor="middle" fill="${TINK}">${txt}</text></g>`;
const cadeadoT = (aberto) => `<g>${tForma(`M-22 -10 V-40 Q-22 -66 0 -66 Q22 -66 22 -40 V${aberto ? -56 : -10}`, 'none')}${tTraco(`M-22 -10 V-40 Q-22 -66 0 -66 Q22 -66 22 -40 V${aberto ? -56 : -10}`, TLW * 2.4, '#9AA3AD')}${tForma(tPoli([[-34, -12], [34, -12], [34, 40], [-34, 40]]), '#E8B84A', tPinta(tPoli([[10, -12], [34, -12], [34, 40], [10, 40]]), '#C8962E'))}</g>`;
const alicate = `<g transform="rotate(-30)">${tForma(tPoli([[-6, -70], [6, -70], [10, 0], [-10, 0]]), '#9AA3AD')}${tForma(tMacarrao([-8, 0], [-26, 70], -6, 14, 12), '#D8312B')}${tForma(tMacarrao([8, 0], [26, 70], 6, 14, 12), '#D8312B')}</g>`;
const grampo = `<g transform="rotate(-20)">${tTraco('M0 0 V-46 Q0 -54 6 -50', TLW * 1.2, '#9AA3AD')}</g>`;

// ================================================================ PLANOS
const pT = (P, x, y, s, t, o = {}) => pt(P, x, y, s, t, o);
const CENAS = [
  // ---------------------------------------------------------------- BLOCO A (1–15): cena-ícone e a quadrilha
  // 1 · rua do banco em 3D: os 4 de macacão e máscara baixada, de 3/4, na frente do banco; câmera já perto, desce os últimos metros
  { l: 0, mb: false, blur: false, sfx: [{ t: .02, s: 'galeria/slide_whistle_down_2', v: .4 }],
    g3d: (tl, d) => ({ set: 'bairroToon', opts: { banco: 1, ceu: '#9FC6E0', grama: '#6E8F55', luz: null, garagem: false }, ...MUNDO.trilha([[[1.5, 3.4, 13.5], [0, 1.9, 3.4]], [[.5, 1.6, 10.6], [0, 1.6, 3.6]]], tl / d), fov: 46 }),
    f: (tl, d, t) => { const q = MUNDO.proj(BANCO_LETREIRO); return (q.atras ? '' : `<text x="${q.x}" y="${q.y + q.ppm * .18}" font-family="Baloo 2" font-weight="800" font-size="${q.ppm * .62}" text-anchor="middle" fill="#E8C34A">BANCO $</text>`)
      + [[MESTRE, -1.2, 4.5], [MANAUS, -.4, 4.6], [RECIFE, .4, 4.6], [BELEM, 1.2, 4.5]].map(([P, x, z]) => p3T(P, [x, 0, z], t, { mascara: 'baixada', olhar: [.3, 0], agito: .6 })).join(''); } },
  // 2 · close 3/4 do Belém; no "plano" ele levanta a máscara para a testa
  { l: 0, w: 6, split: false, blur: false, sfx: [{ w: 11, l: 0, o: -.05, s: 'galeria/rubber_snapping_1', v: .5 }], cam: { s: [1, 1.08], c: [288, 470] },
    f: (tl, d, t) => { const levanta = t >= ws(0, 11) - .05; return reacaoToon(BELEM, t, tl, { mascara: levanta ? 'testa' : 'baixada', olhar: [.4, 0], palpebra: .35, boca: { sm: .2 }, agito: .6 }, { fundo: '#C9D9E6', forma: '#B3C6D6' }); } },
  // 3 · fachada do banco em contra-plongée, câmera sobe
  { l: 1, cam: { s: [1, 1.06], c: [288, 560], c1: [288, 500] },
    f: (tl, d, t) => fundoChapado('#9FC6E0') + tForma(tPoli([[-40, 240], [616, 240], [616, 1100], [-40, 1100]]), '#E8DCC0', tPinta(tPoli([[-40, 240], [60, 240], [60, 1100], [-40, 1100]]), '#D2C4A4'))
      + tForma(tPoli([[-60, 250], [288, 90], [636, 250]]), '#E8DCC0', tPinta(tPoli([[-60, 250], [288, 90], [288, 250]]), '#D2C4A4'))
      + [40, 170, 406, 536].map(x => tForma(tPoli([[x - 30, 330], [x + 30, 330], [x + 26, 1100], [x - 26, 1100]]), '#F4EEDD', tPinta(tPoli([[x + 6, 330], [x + 30, 330], [x + 26, 1100], [x + 6, 1100]]), '#E0D8C2'))).join('')
      + tForma(tPoli([[150, 262], [426, 262], [426, 320], [150, 320]]), '#2a2238') + `<text x="288" y="306" font-family="Baloo 2" font-weight="800" font-size="46" text-anchor="middle" fill="#E8C34A">BANCO $</text>`
      + tForma(tPoli([[230, 600], [346, 600], [346, 1100], [230, 1100]]), '#3a2a20') },
  // 4 · flash de memória: a casinha amarela da família (sem carimbo ainda)
  { l: 1, w: 4, split: false, blur: false, cam: { s: [1, 1.03], c: [288, 520] }, f: (tl, d, t) => memoria(casaFamilia()) },
  // 5 · esconderijo: o Mestre de 3/4 (máscara + óculos), ajeita os óculos
  { l: 2, sfx: [{ t: .05, s: 'rangido', v: .3 }], cam: { s: [1, 1.04], c: [288, 520], c1: [300, 516] },
    f: (tl, d, t) => esconderijo({ t }) + pT(MESTRE, 300, 800, .8, t, { mascara: 'baixada', olhar: [.2, 0], bD: tl > .4 && tl < 1.1 ? { h: [36, -150], bend: 30 } : null }) },
  // 6 · plano aberto: Manaus e Recife lado a lado, máscaras na testa; travelling lateral
  { l: 3, cam: { s: [1, 1.03], c: [250, 520], c1: [320, 520] },
    f: (tl, d, t) => esconderijo({ t }) + pT(MANAUS, 200, 800, .72, t, { mascara: 'testa', olhar: [.3, 0] }) + pT(RECIFE, 400, 800, .72, t, { mascara: 'testa', olhar: [-.2, 0] }) },
  // 7 · Belém entra no quadro e se junta aos dois
  { l: 3, w: 4, cam: { s: [1.05, 1.08], c: [288, 520] },
    f: (tl, d, t) => esconderijo({ t }) + pT(MANAUS, 100, 800, .66, t, { mascara: 'testa', olhar: [.6, 0] }) + pT(RECIFE, 270, 800, .66, t, { mascara: 'testa', olhar: [.8, 0] })
      + pT(BELEM, lerp(660, 470, ease(sobe(0, .6, tl))), 800, .66, t, { flip: true, mascara: 'testa', walk: tl < .6 ? tl * 2 : null, olhar: [.5, 0], semCorte: tl < .45 }) },
  // 8–10 · closes das etiquetas no peito (com queixo/máscara na testa visíveis)
  ...[[MANAUS, 'MANAUS', 3, 8], [RECIFE, 'RECIFE', 3, 11], [BELEM, 'BELÉM', 3, 13]].map(([P, nome, l, w]) => ({ l, w, split: false, blur: false, sfx: [{ t: .05, s: 'galeria/ding_1', v: .35 }], cam: { s: [1, 1.05], c: [288, 520] },
    f: (tl, d, t) => fundoChapado(ESC.parede) + pT(P, 230, 1330, 2.2, t, { mascara: 'testa', semCorte: true, nocheck: true, agito: .4 })
      + `<g transform="translate(290 ${lerp(760, 640, ease(sobe(0, .15, tl)))})">${etiquetaNome(nome)}</g>` })),
  // 11 · Manaus abre o cadeado com um grampo (câmera na mão)
  { l: 4, cam: { s: [1.1, 1.13], c: [288, 470] },
    f: (tl, d, t) => esconderijo({ t }) + pT(MANAUS, 220, 900, 1.05, t, { mascara: 'testa', olhar: [.6, .3], bD: { h: [90, 110], bend: 20 }, segura: `<g transform="translate(40 10)">${grampo}</g>`, semCorte: true })
      + `<g transform="translate(420 640)">${cadeadoT(tl > .9)}</g>` },
  // 12 · insert: o cadeado cai aberto
  { l: 4, w: 4, split: false, sfx: [{ t: .05, s: 'galeria/thin_metal_bop_1', v: .5 }], cam: { s: [1.6, 1.7], c: [288, 512] },
    f: (tl, d, t) => fundoChapado(ESC.paredeS) + `<g transform="translate(288 ${lerp(470, 560, ease(sobe(0, .3, tl)))}) rotate(${lerp(0, 25, sobe(0, .3, tl))}) scale(2.2)">${cadeadoT(true)}</g>` },
  // 13 · Recife aponta o alicate para a caixa de alarme tocando (luz vermelha girando)
  { l: 4, w: 5, sfx: [{ t: 0, s: 'galeria/siren_whistle_1', v: .3 }], cam: { s: [1.05, 1.09], c: [288, 500], c1: [270, 496] },
    f: (tl, d, t) => esconderijo({ t, ax: 120, ay: 430, alarmeOn: true }) + pT(RECIFE, 380, 820, .85, t, { flip: true, mascara: 'testa', olhar: [.6, -.2], bD: { h: [100, 60], bend: 10 }, segura: `<g transform="translate(20 -10)">${alicate}</g>` }) },
  // 14 · insert: o alicate corta o fio; a luz apaga
  { l: 4, w: 7, split: false, sfx: [{ t: .25, s: 'galeria/rubber_snapping_2', v: .5 }], cam: { s: [1.7, 1.75], c: [150, 520] },
    f: (tl, d, t) => fundoChapado(ESC.parede) + alarmeCaixa(120, 430, tl < .3, t) + `<g transform="translate(${lerp(260, 180, sobe(0, .3, tl))} 560) rotate(-60)">${alicate}</g>` },
  // 15 · reação: Belém aponta para a própria etiqueta, sem graça
  { l: 5, split: false, blur: false, cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => fundoChapado(ESC.parede) + pT(BELEM, 230, 1130, 1.5, t, { mascara: 'testa', olhar: [-.1, .5], palpebra: .5, boca: { sm: -.1, skew: .5 }, bD: { h: [-40, 120], bend: 50 }, semCorte: true, agito: .5 })
      + `<g transform="translate(270 670) scale(.6)">${etiquetaNome('BELÉM')}</g>` },
];
