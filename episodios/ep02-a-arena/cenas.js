//@acervo toon toon3d
// EP02 · A Arena, Parte 1 — storyboard em pt/storyboard.md (v2, 80 planos). Visual: kit toon, cor chapada, abertura de bairro em 3D no plano 3.
const LEGENDA_PALAVRAS = 3, CORTE_MAX_EP = 99, EFEITOS_DB = -24, CAUDA = 2.0;
const AMBIENTE = { '0': null };
const SEM_VINHETA = true;
const ESTILO_CSS = `#sub{font-family:'Baloo 2';font-size:46px;letter-spacing:0}
#sub span{-webkit-text-stroke:11px #1b1422;text-shadow:none}
#sub span.on{color:#FFE14D}`;
document.body.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:-999px;font-family:'Baloo 2';font-weight:800">ÁÇÚ</span><span style="position:absolute;left:-999px;font-family:'VT323'">0800</span>`);

const sobe = (a, b, k) => clamp((k - a) / (b - a));
const ws = (l, w = 0) => PALAVRAS[LINHAS[l][w]].s;
const G = (n) => 'galeria/' + n;
const TXT = (x, y, tam, txt, cor = TINK, o = {}) => `<text x="${x}" y="${y}" font-family="${o.fonte || "'Baloo 2'"}" font-weight="800" font-size="${tam}" text-anchor="${o.ancora || 'middle'}" fill="${cor}"${o.rot ? ` transform="rotate(${o.rot} ${x} ${y})"` : ''}>${txt}</text>`;
const ret = (x, y, w, h, cor, corS) => tForma(tPoli([[x, y], [x + w, y], [x + w, y + h], [x, y + h]]), cor, corS ? tPinta(tPoli([[x + w * .72, y], [x + w, y], [x + w, y + h], [x + w * .72, y + h]]), corS) : '');

// ================================================================ ELENCO
const capa = (cor, pts) => () => tForma(tSpl(pts), cor);
const H_TOPO = [[-88, -36], [-84, -100], [-30, -132], [40, -130], [92, -96], [96, -54], [56, -86], [6, -94], [-44, -76]];
const boneVirado = (cor, corS) => () => tForma(tSpl([[-90, -44], [-86, -104], [-30, -138], [40, -136], [94, -100], [98, -58], [20, -70], [-50, -60]]), cor, tPinta(tSpl([[-100, -50], [-60, -120], [-20, -60]]), corS))
  + tForma(tPoli([[-84, -66], [-156, -60], [-152, -42], [-82, -48]]), corS) + tForma(tElip(10, -134, 10, 7), corS);
const rabo = (cor) => () => tForma(tMacarrao([-70, -80], [-128, 40], -30, 50, 26), cor) + tForma(tElip(-74, -82, 18, 16), '#E86A5A');
const penteado = (cor) => () => tForma(tSpl([[-90, -30], [-86, -104], [-20, -134], [60, -126], [96, -84], [94, -60], [40, -100], [-30, -100], [-60, -60]]), cor) + tTraco('M-40 -118 Q10 -132 70 -110 M-50 -100 Q0 -116 60 -96', TLW * .6, '#00000040');
const careca = (cor) => () => tForma(tSpl([[-90, -10], [-88, -60], [-70, -64], [-66, -6]]), cor);
const raspado = (cor) => capa(cor, [[-86, -40], [-82, -100], [-28, -128], [40, -126], [90, -94], [94, -60], [60, -96], [0, -108], [-50, -90]]);
const coque = (cor) => () => tForma(tSpl(H_TOPO), cor) + tForma(tElip(-66, -104, 32, 28), cor);
const loiro = (cor) => () => tForma(tSpl([[-110, 40], [-104, -90], [-40, -142], [50, -140], [104, -90], [100, -40], [60, -96], [0, -100], [-60, -60], [-80, 60]]), cor);
const oculosEscuros = (o) => `${tForma(tElip(8, -10, 34, 22), '#15121a')}${tForma(tElip(60, -12, 26, 20), '#15121a')}${tTraco('M42 -12 H34 M-26 -10 L-70 -2', TLW * 1.4)}`;
const terno = (cor, corS, camisa = '#F4F1EA', gravata = '#1b1422') => ({ tipo: 'macacao', aberto: 1, cor, corS, camisa, gravata });

const DAVI = { pele: '#A8704A', peleS: '#8A5A3A', sobrancelha: '#24160e', barbaRala: '#94603F', tronco: { tipo: 'macacao', cor: '#2E6E73', corS: '#225558' }, calca: { cor: '#2E6E73', corS: '#225558' }, sapato: '#E8E2D6', sapatoS: '#BDB5A6', cabeca: boneVirado('#E3B04B', '#C4922E'), ph: 0 };
const LIA = { pele: '#8D5A3B', peleS: '#704530', sobrancelha: '#1e130c', tronco: { tipo: 'camiseta', cor: '#F08A3C', corS: '#D06E26' }, calca: { cor: '#3E5C8A', corS: '#2F4870' }, sapato: '#D9D2C4', sapatoS: '#B5AC9C', cabeca: () => tForma(tSpl(H_TOPO), '#1e130c'), atras: rabo('#1e130c'), ph: 1.1 };
const CAIO = { pele: '#5E3A26', peleS: '#4A2C1C', sobrancelha: '#140c08', tronco: { tipo: 'regata', cor: '#F4F1EA', corS: '#D8D3C6' }, calca: { cor: '#5A6B4A', corS: '#46553A', curta: 1 }, sapato: '#3a3a44', sapatoS: '#26262e', cabeca: raspado('#140c08'), ph: 2.2 };
const DONO = { pele: '#F0C8A6', peleS: '#D4A888', barriga: .45, sobrancelha: '#7A746C', nariz: 'reto', bigode: '#3a2a20', tronco: terno('#F4F1EA', '#D9D3C4', '#F6E7C8', '#E3B04B'), calca: { cor: '#F4F1EA', corS: '#D9D3C4' }, sapato: '#F4F1EA', sapatoS: '#D0C9B8', cabeca: penteado('#9A938C'), ph: .6 };
const douro = `<rect x="40" y="80" width="15" height="13" fill="#F2C94C" stroke="${TINK}" stroke-width="2" vector-effect="non-scaling-stroke"/>`;
const DONO_OURO = { ...DONO, cabeca: (st) => penteado('#9A938C')() + douro };
const RICACO = { pele: '#F2C9A0', peleS: '#D6A982', barriga: 1, sobrancelha: '#6a5a4a', tronco: terno('#22202A', '#16141C'), calca: { cor: '#22202A', corS: '#16141C' }, sapato: '#15111a', sapatoS: '#000', cabeca: careca('#8a7a6a'), ph: 1.4 };
const RICA = { pele: '#E8B48E', peleS: '#CC9772', sobrancelha: '#8a6a3a', tronco: { tipo: 'moletom', cor: '#7A2E4A', corS: '#5E2238', manga: '#6E2842', semCordao: 1, detalhe: (omb) => tForma(tSpl([[-70, omb - 6], [0, omb + 30], [80, omb - 4], [70, omb + 26], [0, omb + 56], [-66, omb + 24]]), '#F4F1EA') }, calca: { cor: '#7A2E4A', corS: '#5E2238' }, sapato: '#D4A93A', sapatoS: '#B08A2A', cabeca: loiro('#F2D27A'), ph: 2.7 };
const RICO2 = { pele: '#F0C8A6', peleS: '#D4A888', barriga: .3, sobrancelha: '#2a2018', tronco: terno('#3A4A6E', '#2C3956', '#F4F1EA', '#C0392B'), calca: { cor: '#3A4A6E', corS: '#2C3956' }, sapato: '#15111a', sapatoS: '#000', cabeca: penteado('#2a2018'), ph: .3 };
const RICO3 = { pele: '#D9A57E', peleS: '#BC8A64', barriga: .6, sobrancelha: '#5a5048', bigode: '#5a5048', tronco: terno('#5C5A60', '#48464C', '#F4F1EA', '#2E6E73'), calca: { cor: '#5C5A60', corS: '#48464C' }, sapato: '#15111a', sapatoS: '#000', cabeca: careca('#5a5048'), ph: 1.9 };
const PREFEITO = { pele: '#E6B996', peleS: '#C9967A', barriga: .8, sobrancelha: '#8a8580', tronco: { ...terno('#6E5038', '#56402C'), detalhe: (omb, hip) => tForma(`M-50 ${omb + 6} L-30 ${omb - 6} L60 ${hip - 10} L40 ${hip + 4}Z`, '#2F9E5B') + tForma(`M-36 ${omb + 14} L-30 ${omb + 6} L52 ${hip - 6} L46 ${hip - 2}Z`, '#F2C94C') }, calca: { cor: '#6E5038', corS: '#56402C' }, sapato: '#15111a', sapatoS: '#000', cabeca: penteado('#C9C4BC'), ph: 2.5 };
const SEGURANCA = { pele: '#6B4430', peleS: '#553422', sobrancelha: '#140c08', tronco: terno('#1F1D26', '#15131a', '#F4F1EA', '#15131a'), calca: { cor: '#1F1D26', corS: '#15131a' }, sapato: '#000', sapatoS: '#000', cabeca: () => raspado('#140c08')() + oculosEscuros() + tTraco('M-70 10 Q-80 40 -60 70', TLW * .8, '#E8E2D6'), ph: 3.1 };
const quepeG = (cor) => () => tForma(tSpl([[-90, -60], [-80, -120], [0, -146], [80, -126], [98, -70]]), cor) + tForma(tSpl([[20, -66], [130, -60], [134, -44], [24, -50]]), '#3a3a44');
const GUARDA = { pele: '#C98E66', peleS: '#AA744F', barriga: .5, sobrancelha: '#2a1a12', tronco: { tipo: 'camiseta', cor: '#E8742C', corS: '#C45C1E', detalhe: (omb, hip) => tTraco(`M-50 ${omb + 90} H60 M-54 ${omb + 120} H62`, TLW * 1.6, '#F4F1EA') }, calca: { cor: '#3a3a44', corS: '#2a2a32' }, sapato: '#141414', sapatoS: '#000', cabeca: quepeG('#4A4E58'), ph: .9 };
const JUIZ = { pele: '#D9A57E', peleS: '#BC8A64', sobrancelha: '#2a2018', bigode: '#2a2018', tronco: { tipo: 'camiseta', cor: '#F4F1EA', corS: '#D8D3C6', detalhe: (omb, hip) => [0, 1, 2, 3, 4].map(i => tPinta(`M-70 ${omb + 20 + i * 36} H80 V${omb + 36 + i * 36} H-70Z`, '#1b1422')).join('') }, calca: { cor: '#1b1422', corS: '#000' }, sapato: '#141414', sapatoS: '#000', cabeca: careca('#2a2018'), ph: 1.6 };
const LUTA1 = { pele: '#8D5A3B', peleS: '#704530', sobrancelha: '#1e130c', barbaRala: '#7A4A30', tronco: { tipo: 'regata', cor: '#B9B4AE', corS: '#9A958F', detalhe: (omb, hip) => tTraco(`M20 ${hip - 40} l14 20 l10 -16 l12 18`, TLW * .8) }, calca: { cor: '#4A4F66', corS: '#3a3e52', curta: 1 }, sapato: '#5a4a3a', sapatoS: '#3a2a1a', cabeca: raspado('#1e130c'), ph: .2 };
const LUTA2 = { pele: '#E0A47E', peleS: '#C38862', sobrancelha: '#3a2a20', barba: { cor: '#4a3424', corS: '#3a2618' }, tronco: { tipo: 'camiseta', cor: '#8E6F4A', corS: '#73583A', detalhe: (omb, hip) => tTraco(`M-30 ${hip - 30} l12 -18 l10 16 l14 -14`, TLW * .8) }, calca: { cor: '#3a3e52', corS: '#2b2f45', curta: 1 }, sapato: '#5a4a3a', sapatoS: '#3a2a1a', cabeca: capa('#4a3424', H_TOPO), ph: 1.3 };
const SENHOR = { pele: '#C98E66', peleS: '#AA744F', sobrancelha: '#E8E2D6', bigode: '#E8E2D6', tronco: { tipo: 'camiseta', cor: '#5E7A55', corS: '#4C6645' }, calca: { cor: '#4A4F66', corS: '#3a3e52' }, sapato: '#3a2a20', sapatoS: '#2a1a10', cabeca: careca('#E8E2D6'), ph: 2.8 };
const SENHORA_T = { pele: '#8D5A3B', peleS: '#704530', sobrancelha: '#8a8580', tronco: { tipo: 'moletom', cor: '#C76B8A', corS: '#A8536F', manga: '#B85E7C', semCordao: 1, detalhe: (omb) => [[-30, 40], [20, 80], [-10, 130], [40, 150]].map(([x, y]) => tForma(tElip(x, omb + y, 9, 9), '#F7E3B0')).join('') }, calca: { cor: '#4A4F66', corS: '#3a3e52' }, sapato: '#C9B9A0', sapatoS: '#A8987F', cabeca: coque('#B9B4AE'), ph: .7 };
const PAI_T = { ...LUTA1, tronco: { tipo: 'camiseta', cor: '#7FB8E8', corS: '#5E98C8' }, calca: { cor: '#4A4F66', corS: '#3a3e52' }, cabeca: capa('#1e130c', H_TOPO), ph: 1.8 };
const FILHA = { ...LIA, alt: 'baixo', tronco: { tipo: 'camiseta', cor: '#E9A0C8', corS: '#C880A8' }, ph: .5 };
const ACORR = { ...LUTA2, barba: null, barbaRala: '#B08462', cabeca: raspado('#3a2a20'), ph: 2.0 };
const CARTAZ_H = { ...PAI_T, tronco: { tipo: 'camiseta', cor: '#9BD08A', corS: '#7BB06A' }, bigode: '#1e130c', ph: 2.4 };
const KID = (P) => ({ ...P, alt: 'baixo', barbaRala: null, barba: null });
const DAVI_K = { ...KID(DAVI), tronco: { tipo: 'camiseta', cor: '#2E6E73', corS: '#225558' }, calca: { cor: '#3E5C8A', corS: '#2F4870', curta: 1 } }, LIA_K = { ...KID(LIA), calca: { cor: '#3E5C8A', corS: '#2F4870', curta: 1 } }, CAIO_K = KID(CAIO);
const pT = (P, x, y, s, t, o = {}) => pt(P, x, y, s, t, o);

// ================================================================ OBJETOS
const balde = (s = 1) => `<g class="tSol" transform="scale(${s})">${tForma('M-34 0 L34 0 L26 70 L-26 70Z', '#F2C94C', tPinta('M10 0 L34 0 L26 70 L8 70Z', '#D9AE36'))}${tForma(tElip(0, 0, 34, 9), '#7FB8E8')}${tTraco('M-34 0 Q0 -50 34 0', TLW * 1.2)}</g>`;
const esfregao = (s = 1) => `<g transform="scale(${s})">${tTraco('M0 -40 L0 240', TLW * 2.6, '#8A6A4A')}${tForma('M-40 240 L40 240 L30 290 L-30 290Z', '#E8E2D6', tPinta('M10 240 L40 240 L30 290 L10 290Z', '#C9C2B0'))}</g>`;
const taca = (s = 1) => `<g transform="scale(${s})">${tForma('M-16 -40 L16 -40 Q14 -6 0 -2 Q-14 -6 -16 -40Z', '#F7E3B0')}${tTraco('M0 -2 V24 M-12 26 H12', TLW)}</g>`;
const garrafa = (s = 1) => `<g transform="scale(${s})">${tForma('M-14 40 L14 40 L14 -20 Q14 -36 6 -44 V-70 H-6 V-44 Q-14 -36 -14 -20Z', '#2F6B3A', tPinta('M4 40 L14 40 L14 -20 L4 -30Z', '#235229'))}${ret(-14, -6, 28, 22, '#F2C94C')}</g>`;
const placaAposta = (txt) => `<g>${tTraco('M0 0 V70', TLW * 1.6, '#8A6A4A')}${tForma(tPoli([[-40, -46], [40, -46], [40, 6], [-40, 6]]), '#F4F1EA')}${TXT(0, -6, 40, txt, '#2F9E5B')}</g>`;
const coxinha = `<g>${tForma('M0 -34 Q22 0 18 14 Q0 24 -18 14 Q-22 0 0 -34Z', '#D9852E', tPinta('M4 -30 Q22 0 18 14 L4 18Z', '#B86A1E'))}</g>`;
const saco = (x, y, s = 1, rot = 0, cor = '#E8DCC0') => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${tForma('M-46 0 Q-52 -50 -36 -78 L-20 -92 L20 -92 L36 -78 Q52 -50 46 0Z', cor, tPinta('M14 -92 L36 -78 Q52 -50 46 0 L16 0Z', '#C9BC9C'))}${tTraco('M-22 -92 Q0 -82 22 -92', TLW)}${TXT(0, -34, 26, 'ARROZ', '#C0392B')}</g>`;
const lata = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${tForma(tPoli([[-20, -50], [20, -50], [20, 0], [-20, 0]]), '#C0392B', tPinta(tPoli([[8, -50], [20, -50], [20, 0], [8, 0]]), '#9A2A20'))}${ret(-20, -36, 40, 18, '#F4F1EA')}</g>`;
const pilhaPremios = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${saco(-60, 0, 1, -6)}${saco(56, 0, 1, 5, '#E0D2B0')}${saco(0, -70, .95, 2)}${lata(-118, 0)}${lata(116, 0, .9)}${tForma('M-36 -150 L36 -150 L44 -110 L-44 -110Z', '#C49A5A')}${tTraco('M-30 -150 Q0 -196 30 -150', TLW * 1.2)}</g>`;
function botaoPed(x, y, s = 1, on = false, t = 0, semPlaca = false) { const pisca = on && Math.floor(t * 6) % 2;
  return `<g transform="translate(${x} ${y}) scale(${s})">${tForma('M-30 0 L30 0 L22 -150 L-22 -150Z', '#D4A93A', tPinta('M8 0 L30 0 L22 -150 L8 -150Z', '#B08A2A'))}${tForma(tPoli([[-60, -150], [60, -150], [60, -176], [-60, -176]]), '#3a2a20')}`
    + (on ? `<circle cx="0" cy="-200" r="70" fill="#FF3B30" opacity="${pisca ? .35 : .15}"/>` : '') + tForma(`M-46 -176 Q-46 -226 0 -226 Q46 -226 46 -176Z`, pisca ? '#FF6B5E' : '#E0302B', tPinta('M-30 -214 Q-10 -224 6 -222 L-6 -200 Z', '#ffffff66'))
    + (semPlaca ? '' : `<g transform="translate(0 -110)">${tForma(tPoli([[-72, -18], [72, -18], [72, 18], [-72, 18]]), '#F4F1EA')}${TXT(0, 7, 19, 'MAIS EMOÇÃO', '#C0392B')}</g>`) + `</g>`; }
function alavanca(x, y, s = 1, k = 0, corda = true) { const a = -40 + k * 80;
  return `<g transform="translate(${x} ${y}) scale(${s})">${tForma(tPoli([[-40, -60], [40, -60], [40, 60], [-40, 60]]), '#5C5A60', tPinta(tPoli([[16, -60], [40, -60], [40, 60], [16, 60]]), '#48464C'))}`
    + `<g transform="rotate(${a})">${tForma(tPoli([[-8, 0], [8, 0], [8, -150], [-8, -150]]), '#9AA3AD')}${tForma(tElip(0, -160, 22, 22), '#E0302B')}</g>`
    + `<g transform="translate(0 92)">${tForma(tPoli([[-60, -20], [60, -20], [60, 20], [-60, 20]]), '#F2C94C')}${TXT(0, 10, 26, 'PRÊMIOS', TINK)}</g>`
    + (corda ? `${tForma(tPoli([[-150, 40], [-140, 40], [-140, 200], [-150, 200]]), '#D4A93A')}${tTraco('M-145 70 Q-75 120 -40 70', TLW * 3.4, '#8E1E2E')}` : '') + `</g>`; }
const algema = (s = 1) => `<g transform="scale(${s})">${tTraco('M-14 0 A14 14 0 1 1 14 0 A14 14 0 1 1 -14 0', TLW * 2.2, '#9AA3AD')}${tTraco('M14 6 Q40 30 60 70', TLW * 1.8, '#9AA3AD')}</g>`;
const correntePulso = (x1, y1, x2, y2) => { const n = Math.max(3, Math.round(Math.hypot(x2 - x1, y2 - y1) / 18)), ang = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI; let r = '';
  for (let i = 0; i <= n; i++) { const u = i / n; r += `<g transform="translate(${_p(lerp(x1, x2, u))} ${_p(lerp(y1, y2, u))}) rotate(${_p(ang + (i % 2) * 90)})">${tForma(tElip(0, 0, 13, i % 2 ? 5 : 8), '#9AA3AD')}</g>`; } return r; };
const poltrona = (x, y, s = 1, flip = false) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">${tForma(tSpl([[-90, 0], [-96, -120], [-80, -280], [10, -300], [40, -170], [96, -150], [100, 0]]), '#8E1E2E', tPinta(tSpl([[30, -170], [100, -150], [100, 0], [30, 0]]), '#6E1E2E'))}${tForma(tPoli([[-80, -110], [100, -110], [100, -60], [-80, -60]]), '#A8283A')}${tTraco('M-70 0 V30 M80 0 V30', TLW * 2.4, '#D4A93A')}</g>`;

// ================================================================ CENÁRIOS
const ARE = { areia: '#D9A55B', areiaS: '#C08A43', conc: '#8E8A86', concS: '#74706C', fundo: '#3B3446' };
const CAMA = { parede: '#6E1E2E', paredeS: '#58172A', ouro: '#D4A93A', vidro: '#BFE3F5', piso: '#4A1E26' };
// multidão em silhueta colorida (barata): fileiras de cabeça + ombros; pe = de pé com braços para cima; senta 0..1 (onda da esquerda para a direita)
function multidao(x0, x1, y, fil, t, o = {}) { const R = rng(o.semente || 3), cores = o.cores || ['#5E4A6E', '#6E5A48', '#4A5E6E', '#7A5A5A', '#566A4E', '#6A5A7A'], passo = o.passo || 46; let r = '';
  for (let f = fil - 1; f >= 0; f--) for (let x = x0 + (f % 2) * passo / 2; x < x1; x += passo) { const k = o.senta == null ? 0 : clamp((o.senta * 1.6 - (x - x0) / (x1 - x0) * .6)), yy = y - f * (o.degrau || 60) + k * 26 - (o.pe ? (1 - k) * 22 : 0), ph = R() * 6, cor = cores[Math.floor(R() * cores.length)], bob = Math.sin(t * 7 + ph) * 4 * (1 - k);
    r += `<path d="M${x - 24} ${yy + 40 + (o.pe ? (1 - k) * 22 : 0)} Q${x - 24} ${yy + 6} ${x} ${yy + 4} Q${x + 24} ${yy + 6} ${x + 24} ${yy + 40 + (o.pe ? (1 - k) * 22 : 0)}Z" fill="${cor}"/><circle cx="${x}" cy="${yy - 14 + bob}" r="15" fill="${cor}"/>`;
    if (o.pe && k < .5 && R() > .45) r += `<path d="M${x - 16} ${yy + 10} L${x - 26} ${yy - 30 + bob}" stroke="${cor}" stroke-width="9" stroke-linecap="round"/>`;
    if (k > .5) r += `<path d="M${x - 20} ${yy + 18} L${x + 20} ${yy + 12} M${x - 20} ${yy + 12} L${x + 20} ${yy + 18}" stroke="#1b142288" stroke-width="8" stroke-linecap="round"/>`; }
  return r; }
// arena vista de dentro (plano médio): areia (y = chão), muro de concreto com grade, arquibancada acima do muro, holofotes; o.verm = holofotes vermelhos
function arenaM(t, o = {}) { const y = o.chao ?? 860, verm = o.verm;
  let r = fundoChapado(verm ? '#4A2A36' : ARE.fundo) + multidao(-40, 640, y - 330, 3, t, { pe: o.pe, senta: o.senta, semente: 5 });
  r += tForma(tPoli([[-60, y - 280], [640, y - 280], [640, y], [-60, y]]), ARE.conc, tPinta(tPoli([[-60, y - 280], [640, y - 280], [640, y - 250], [-60, y - 250]]), ARE.concS));
  for (let x = 20; x < 640; x += 150) r += `<path d="M${x} ${y - 250} V${y}" stroke="${ARE.concS}" stroke-width="4"/>`;
  if (o.grade) { const gx = o.grade, k = o.gradeK ?? 0; r += tForma(tPoli([[gx - 90, y - 220], [gx + 90, y - 220], [gx + 90, y], [gx - 90, y]]), '#15121a');
    const gy = y - 220 * k; for (let i = -3; i <= 3; i++) r += tTraco(`M${gx + i * 26} ${y - 220} V${gy}`, TLW * 1.4, '#9AA3AD'); r += tTraco(`M${gx - 90} ${gy} H${gx + 90}`, TLW * 1.6, '#9AA3AD'); }
  r += chaoToon(ARE.areia, ARE.areiaS, y) + [[60, y + 60], [300, y + 110], [480, y + 40]].map(([x, yy]) => `<ellipse cx="${x}" cy="${yy}" rx="40" ry="6" fill="${ARE.areiaS}"/>`).join('');
  r += [80, 500].map(x => `<path d="M${x} -60 L${x - 70} ${y} L${x + 70} ${y}Z" fill="${verm ? '#FF4B4B' : '#FFF6D8'}" opacity="${verm ? .14 : .1}"/>`).join('');
  return r; }
// camarote por dentro (plano médio): parede vinho com frisos dourados, janela grande para a arena, piso firme e/ou vidro; o.vidro = [x0, x1] faixa de vidro
function camaroteM(t, o = {}) { const y = o.chao ?? 800; let r = fundoChapado(CAMA.parede);
  for (let x = 40; x < 600; x += 180) r += tForma(tPoli([[x, 120], [x + 20, 120], [x + 20, y], [x, y]]), CAMA.ouro);
  if (o.janela !== false) { r += tForma(tPoli([[70, 200], [506, 200], [506, 600], [70, 600]]), ARE.fundo) + `<defs><clipPath id="janCam"><rect x="70" y="200" width="436" height="400"/></clipPath></defs><g clip-path="url(#janCam)"><g transform="translate(70 200) scale(.76)">${multidao(0, 580, 300, 2, t, { pe: o.pe, senta: o.senta, semente: 9 })}</g></g>`
    + `<rect x="70" y="470" width="436" height="130" fill="${ARE.areia}"/>` + tTraco('M70 200 H506 V600 H70Z M288 200 V600', TLW * 1.4, CAMA.ouro); }
  r += tForma(tPoli([[-60, y - 30], [640, y - 30], [640, y], [-60, y]]), CAMA.paredeS) + tTraco(`M-60 ${y - 30} H640`, TLW);
  r += `<rect x="-60" y="${y}" width="700" height="600" fill="${CAMA.piso}"/>` + tTraco(`M-60 ${y} H640`, TLW);
  if (o.vidro) { const [a, b] = o.vidro; r += `<rect x="${a}" y="${y}" width="${b - a}" height="600" fill="${ARE.areia}"/><rect x="${a}" y="${y}" width="${b - a}" height="600" fill="${CAMA.vidro}" opacity=".78"/>` + [0, 1, 2].map(i => `<path d="M${a + 30 + i * 90} ${y + 20} l60 -14" stroke="#fff" stroke-width="6" opacity=".8"/>`).join('')
    + [0, 1, 2, 3].map(i => `<path d="M${a} ${y + 40 + i * i * 30} H${b}" stroke="#ffffff" stroke-width="3" opacity=".5"/>`).join('') + tTraco(`M${a} ${y} V1200`, TLW * 1.2, CAMA.ouro); }
  if (o.buraco) { const [a, b] = o.buraco; r += `<rect x="${a}" y="${y}" width="${b - a}" height="600" fill="#2E2838"/><rect x="${a}" y="${y + 170}" width="${b - a}" height="600" fill="${ARE.areia}" opacity=".7"/>` + tTraco(`M${a} ${y} V1200`, TLW * 1.4) + multidao(a + 30, b, y + 160, 1, 0, { cores: ['#22202A', '#3A4A6E', '#7A2E4A', '#5C5A60'], passo: 70, semente: 2 }); }
  if (o.tapete) r += `<ellipse cx="${o.tapete}" cy="${y + 40}" rx="120" ry="26" fill="#C0392B" stroke="${TINK}" stroke-width="3"/>`;
  return r; }
// PLANO-MESTRE em corte lateral (frame 576×1024): estrutura com a escada à esquerda, camarote em balanço (piso firme 0–230, vidro 230–400), areia, arquibancada à direita, telão
const MC = { piso: 420, vid0: 230, vid1: 400, areia: 880, s: .2 };
function arenaCorte(t, o = {}) { const k = o.aberto || 0, verm = o.verm; let r = fundoChapado(verm ? '#3A2030' : '#2E2838');
  r += `<g transform="translate(380 0)">${multidao(60, 220, 600, 6, t, { pe: o.pe, senta: o.senta, semente: 4, passo: 40, degrau: 58 })}</g>`;
  for (let i = 0; i < 6; i++) r += `<path d="M450 ${640 - i * 58} H600" stroke="${ARE.concS}" stroke-width="6"/>`;
  r += tForma(tPoli([[460, 640], [640, 640], [640, MC.areia], [460, MC.areia]]), ARE.conc, tPinta(tPoli([[460, 640], [480, 640], [480, MC.areia], [460, MC.areia]]), ARE.concS));
  r += ret(430, 70, 146, 110, '#0D0A10') + (o.telao ? `<g transform="translate(503 130)">${o.telao}</g>` : '');
  r += [140, 330].map(x => `<path d="M${x} 180 L${x - 60} ${MC.areia} L${x + 60} ${MC.areia}Z" fill="${verm ? '#FF4B4B' : '#FFF6D8'}" opacity="${verm ? .16 : .08}"/>`).join('');
  r += `<rect x="-40" y="${MC.areia}" width="700" height="300" fill="${ARE.areia}"/>` + tTraco(`M-40 ${MC.areia} H640`, TLW) + `<rect x="-40" y="${MC.areia}" width="700" height="14" fill="#fff" opacity=".15"/>`;
  // estrutura com a escada de serviço em corte (do corredor ao pé, até a porta do camarote)
  r += tForma(tPoli([[-40, MC.piso], [110, MC.piso], [110, MC.areia], [-40, MC.areia]]), ARE.conc, tPinta(tPoli([[86, MC.piso], [110, MC.piso], [110, MC.areia], [86, MC.areia]]), ARE.concS));
  r += tForma(tPoli([[4, MC.piso + 10], [92, MC.piso + 10], [92, MC.areia - 8], [4, MC.areia - 8]]), '#5A5650');
  const deg = []; for (let i = 0; i <= 8; i++) deg.push([12 + i * 9, MC.areia - 8 - i * 26], [12 + (i + 1) * 9, MC.areia - 8 - i * 26]); for (let i = 0; i <= 8; i++) deg.push([84 - i * 9, MC.areia - 242 - i * 24], [84 - (i + 1) * 9, MC.areia - 242 - i * 24]);
  r += tTraco('M' + deg.map(p => p.join(' ')).join(' L'), TLW, '#C9C2B0');
  r += tForma(tPoli([[92, MC.areia - 120], [110, MC.areia - 120], [110, MC.areia], [92, MC.areia]]), '#15121a') + [0, 1, 2].map(i => tTraco(`M${96 + i * 6} ${MC.areia - 118} V${MC.areia}`, TLW * .8, '#9AA3AD')).join('');
  // camarote: caixa, teto, janela de frente; piso firme e vidro (o vidro abre em 2 folhas, k 0..1)
  r += tForma(tPoli([[-40, 150], [MC.vid1 + 10, 150], [MC.vid1 + 10, 176], [-40, 176]]), CAMA.paredeS) + `<rect x="-40" y="176" width="${MC.vid1 + 40}" height="${MC.piso - 176}" fill="${CAMA.parede}"/>`;
  for (let x = 20; x < MC.vid1; x += 90) r += `<rect x="${x}" y="176" width="8" height="${MC.piso - 176}" fill="${CAMA.ouro}" opacity=".7"/>`;
  r += `<rect x="${MC.vid1}" y="176" width="10" height="${MC.piso - 176}" fill="${CAMA.vidro}" opacity=".7"/>` + tTraco(`M${MC.vid1 + 10} 150 V${MC.piso}`, TLW);
  r += ret(-40, MC.piso, MC.vid0 + 40, 26, '#3A2A2E') + tTraco(`M-40 ${MC.piso + 26} H${MC.vid0}`, TLW);
  const meio = (MC.vid0 + MC.vid1) / 2, ang = k * 82;
  for (const [x0, sg] of [[MC.vid0, 1], [MC.vid1, -1]]) r += `<g transform="rotate(${sg * ang} ${x0} ${MC.piso + 6})"><rect x="${Math.min(x0, x0 + sg * (meio - MC.vid0))}" y="${MC.piso}" width="${meio - MC.vid0}" height="12" fill="${CAMA.vidro}" stroke="${TINK}" stroke-width="3" opacity=".9"/></g>`;
  if (o.alcapao) { const a2 = o.alcapao * 80; r += `<g transform="rotate(${a2} ${meio - 34} ${MC.piso + 6})"><rect x="${meio - 34}" y="${MC.piso - 1}" width="68" height="14" fill="#9FC6DA" stroke="${TINK}" stroke-width="3"/></g>`; }
  r += ret(MC.vid0 - 10, 176, 20, MC.piso - 176, '#5C5A60') + `<g transform="translate(${MC.vid0} ${MC.piso - 70}) scale(.22)">${alavanca(0, 0, 1, o.alavanca || 0, true)}</g>`;
  r += `<ellipse cx="190" cy="${MC.piso - 2}" rx="34" ry="6" fill="#C0392B"/>`;   // tapete do dono
  r += ret(-30, MC.piso - 116, 40, 116, '#2a1f24');                               // porta da escada
  r += `<g transform="translate(70 ${MC.piso})">${poltrona(0, 0, .22)}</g><g transform="translate(120 ${MC.piso})">${poltrona(0, 0, .22)}</g>`;
  return r; }
// telão de LED (tela cheia ou pequeno): texto vermelho com pontinhos
function telao(linhas, o = {}) { const tam = o.tam || 64, y0 = o.y ?? 380, n = linhas.length;
  const alt = o.altura || Math.max(300, n * tam * 1.25 + 120); let r = fundoChapado('#15121a') + ret(30, y0 - 170, 516, alt, '#0A080C') + tTraco(`M30 ${y0 - 170} h516 v${alt} h-516Z`, TLW * 1.6, '#3a3440');
  r += `<defs><pattern id="led" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#0A080C"/><circle cx="3" cy="3" r="2.2" fill="#fff"/></pattern><mask id="ledm"><rect x="0" y="0" width="576" height="1024" fill="url(#led)"/></mask></defs>`;
  r += `<g mask="url(#ledm)">` + linhas.map((l, i) => TXT(288, y0 - 30 + i * tam * 1.25, tam, l, '#FF3B30', { fonte: 'VT323' })).join('') + (o.seta ? `<path d="M${o.seta > 0 ? '438 ' + (y0 + n * tam) + ' l40 -50 l40 50z' : '438 ' + (y0 + n * tam - 50) + ' l40 50 l40 -50z'}" fill="${o.seta > 0 ? '#3BD16F' : '#FF3B30'}"/>` : '') + (o.extra || '') + `</g>`;
  return r; }
// telão em quadro (dentro de um cenário): x, y, largura, altura
const telaoQ = (x, y, w, h, linhas, tam) => ret(x, y, w, h, '#0A080C') + tTraco(`M${x} ${y} h${w} v${h} h${-w}Z`, TLW * 1.6, '#3a3440') + `<defs><pattern id="ledq" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="2.2" fill="#fff"/></pattern><mask id="ledqm"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#ledq)"/></mask></defs><g mask="url(#ledqm)">` + linhas.map((l, i) => TXT(x + w / 2, y + h / 2 - (linhas.length - 1) * tam * .6 + i * tam * 1.2 + tam * .3, tam, l, '#FF3B30', { fonte: 'VT323' })).join('') + `</g>`;
const telaoMini = (txt) => `<g mask="url(#ledm2)"><defs><pattern id="led2" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#fff"/></pattern><mask id="ledm2"><rect x="-80" y="-60" width="160" height="120" fill="url(#led2)"/></mask></defs>${TXT(0, 10, 30, txt, '#FF3B30', { fonte: 'VT323' })}</g>`;
// sala de casa pobre com sofá e TV (a TV mostra a arena)
function salaPobre(t) { let r = paredeToon('#C98E66', '#AA744F', 800, { passo: 170 }) + chaoToon('#6E5038', '#56402C', 800, { tabuas: 1 });
  r += ret(380, 560, 170, 140, '#2a2430') + ret(392, 572, 146, 110, ARE.areia) + `<g transform="translate(465 600) scale(.25)">${multidao(-200, 200, 0, 2, t, { pe: 1 })}</g>` + pt(LUTA1, 445, 672, .09, t, { nocheck: true, semCorte: true, sombra: false }) + pt(LUTA2, 490, 672, .09, t, { flip: true, nocheck: true, semCorte: true, sombra: false }) + `<rect x="392" y="572" width="146" height="110" fill="#BFE3F5" opacity="${.15 + .15 * Math.sin(t * 20)}"/>` + tTraco('M420 560 L450 520 M510 560 L480 520', TLW);
  r += ret(420, 700, 90, 100, '#8A6A4A');
  return r; }
const sofaAtras = (x, y) => tForma(tSpl([[x - 210, y - 60], [x - 214, y - 250], [x - 190, y - 280], [x + 130, y - 280], [x + 154, y - 250], [x + 150, y - 60]]), '#5E7A55', tPinta(tPoli([[x + 60, y - 290], [x + 160, y - 290], [x + 160, y - 60], [x + 60, y - 60]]), '#4C6645')) + tTraco(`M${x - 120} ${y - 240} l26 34 l-18 22`, TLW * .8, '#F7E3B0');
const sofaFrente = (x, y) => tForma(tPoli([[x - 214, y - 90], [x + 154, y - 90], [x + 154, y + 30], [x - 214, y + 30]]), '#5E7A55', tPinta(tPoli([[x + 70, y - 90], [x + 154, y - 90], [x + 154, y + 30], [x + 70, y + 30]]), '#4C6645'))
  + tForma(tSpl([[x - 240, y + 30], [x - 244, y - 150], [x - 200, y - 160], [x - 186, y + 30]]), '#6E8A64') + tForma(tSpl([[x + 130, y + 30], [x + 136, y - 150], [x + 176, y - 160], [x + 186, y + 30]]), '#4C6645') + tTraco(`M${x - 60} ${y - 60} l20 26 l-14 18`, TLW * .8, '#F7E3B0');
function padaria() { let r = paredeToon('#F2E2C0', '#D9C49C', 800, { passo: 200 }) + chaoToon('#8A6A4A', '#6E5038', 800, { tabuas: 1 });
  r += ret(-20, 560, 620, 240, '#8A5A3A', '#6E4428') + ret(-20, 540, 620, 30, '#C9A06A');
  r += [60, 170, 280].map(x => tForma(tElip(x, 520, 46, 22), '#D9852E', tPinta(tElip(x + 14, 526, 30, 14), '#B86A1E'))).join('');
  r += `<g transform="translate(470 470) rotate(6)">${tForma(tPoli([[-70, -44], [70, -44], [70, 44], [-70, 44]]), '#F4F1EA')}${TXT(0, -6, 30, 'PÃO', TINK)}${TXT(0, 30, 34, 'R$ 19', '#C0392B')}</g>`;
  return r; }
function ruaBairro2D() { let r = fundoChapado('#F2B36B') + `<circle cx="460" cy="200" r="70" fill="#FFE3A8"/>`;
  r += [[-40, 260, '#C7643C'], [200, 300, '#B5533C'], [420, 240, '#C7643C']].map(([x, y, c]) => ret(x, y, 240, 800 - y, c, '#A84A2E') + [0, 1].map(i => ret(x + 40 + i * 110, y + 60, 60, 60, '#2a2430') + `<rect x="${x + 40 + i * 110}" y="${y + 60}" width="60" height="60" fill="#BFE3F5" opacity=".4"/>`).join('')).join('');
  return r + chaoToon('#8C8478', '#74706C', 800); }
function gongo(x, y, s = 1, k = 0) { return `<g transform="translate(${x} ${y}) scale(${s})">${tTraco('M-130 0 V-300 H130 V0', TLW * 3, '#5a3a20')}<g transform="rotate(${Math.sin(k * 20) * 6 * (1 - k)} 0 -280)">${tTraco('M0 -300 V-260', TLW)}${tForma(tElip(0, -150, 110, 110), '#D4A93A', tPinta(tElip(30, -140, 80, 96), '#B08A2A'))}${tForma(tElip(0, -150, 30, 30), '#E8C34A')}</g></g>`; }
function paredoes(k, y, o = {}) { const gap = lerp(o.g0 ?? 300, o.g1 ?? 60, k), cx = 288; let r = '';
  for (const sd of [-1, 1]) { const xIn = cx + sd * gap; r += tForma(tPoli([[xIn, y - 420], [xIn + sd * 700, y - 420], [xIn + sd * 700, y + 6], [xIn, y + 6]]), '#9A9690', tPinta(tPoli([[xIn, y - 420], [xIn + sd * 30, y - 420], [xIn + sd * 30, y + 6], [xIn, y + 6]]), '#74706C'))
    + [1, 2, 3].map(i => `<path d="M${xIn + sd * i * 90} ${y - 420} V${y}" stroke="#74706C" stroke-width="4"/>`).join('');
    if (o.topo) r += tForma(tPoli([[xIn, y - 420], [xIn + sd * 700, y - 420], [xIn + sd * 700, y - 470], [xIn - sd * 20, y - 470]]), '#B9B4AE');
    if (o.poeira) r += [0, 1, 2].map(i => `<circle cx="${xIn - sd * (20 + i * 26)}" cy="${y - 10 - i * 14}" r="${18 + i * 8}" fill="#E8DCC0" opacity="${.5 - i * .12}"/>`).join(''); }
  return r; }

// ================================================================ PLANOS
const HOLO = (verm) => verm ? `<rect x="-400" y="-400" width="1400" height="2000" fill="#FF2B3A" opacity=".1"/>` : '';
const QUENTE = `<rect x="-400" y="-400" width="1400" height="2000" fill="#FFB347" opacity=".14"/>`;
const invA = (t) => t >= ws(25, 6) + .4;   // Davi invisível do plano 55 até a algema
// holofotes vermelhos do botão (plano 41) até a alavanca (62)
const vermA = (t) => t >= ws(17, 7) - .1 && t < ws(29, 0);
const CENAS = [
  // ---------------------------------------------------------------- BLOCO A (1–26): o mundo e o Davi
  // 1 · PLANO-MESTRE em corte: dois lutadores em guarda na areia, arquibancada de pé, camarote por cima
  { l: 0, blur: false, split: false, sfx: [{ t: .02, s: G('chatter_1'), v: .35 }], cam: { s: [1.04, 1], c: [288, 540], c1: [288, 520] },
    f: (tl, d, t) => arenaCorte(t, { pe: 1, telao: telaoMini('DOMINGO') }) + [[RICACO, 270], [RICA, 330], [RICO2, 372]].map(([P, x], i) => pT(P, x, MC.piso, MC.s, t, { olhar: [.2, .8], nocheck: true, semCorte: true, ph: i })).join('')
      + pT(LUTA1, 230, MC.areia, .32, t, { bD: { h: [80, -90], bend: 20, punho: true }, bE: { h: [50, -80], bend: 30, punho: true }, olhar: [1, 0], sobr: -.6 }) + pT(LUTA2, 390, MC.areia, .32, t, { flip: true, bD: { h: [80, -90], bend: 20, punho: true }, bE: { h: [50, -80], bend: 30, punho: true }, olhar: [1, 0], sobr: -.6 }) },
  // 2 · close a dois dos lutadores: magros, roupa rasgada, sem armas, se encarando
  { l: 0, w: 5, split: false, cam: { s: [1, 1.05], c: [288, 520], shake: 3 },
    f: (tl, d, t) => arenaM(t, { pe: 1 }) + pT(LUTA1, 130, 1100, .95, t, { olhar: [1, 0], sobr: -.8, boca: { sm: -.6 }, semCorte: true, bD: { h: [55, -40], bend: 30, punho: true }, bE: { h: [30, -30], bend: 30, punho: true } }) + pT(LUTA2, 460, 1100, .95, t, { flip: true, olhar: [1, 0], sobr: -.8, boca: { o: .3, sm: -.5 }, semCorte: true, bD: { h: [55, -40], bend: 30, punho: true }, bE: { h: [30, -30], bend: 30, punho: true } }) },
  // 3 · 3D: bairro de tijolo, câmera desce até uma janela com luz de TV
  { l: 1, mb: false, blur: false, sfx: [{ t: .05, s: G('slide_whistle_down_2'), v: .25 }],
    g3d: (tl, d) => ({ set: 'bairroToon', opts: { ceu: '#F2B36B', grama: '#8C7A5A', cores: ['#C7643C', '#B5533C', '#A84A2E', '#C7643C', '#B86A4A', '#A8583C'], corCasa: '#B5533C', luz: '#9FD8FF', garagem: true, semente: 11 }, ...MUNDO.trilha([[[-8, 10, 24], [0, 1.4, 2]], [[-2, 4, 14], [0, 1.6, 2.4]], [[0, 2.6, 12], [0, 1.8, 2.6]]], tl / d), fov: 52 }), f: () => '' },
  // 4 · sala: família inteira no sofá rasgado olhando a TV
  { l: 1, w: 3, split: false, sfx: [{ t: .05, s: G('chatter_3'), v: .15 }], cam: { s: [1, 1.07], c: [288, 560] },
    f: (tl, d, t) => salaPobre(t) + sofaAtras(220, 790) + pT(PAI_T, 110, 790, .66, t, { sentado: true, olhar: [.9, 0], palpebra: .55 }) + pT(SENHORA_T, 230, 790, .62, t, { sentado: true, olhar: [.9, 0], palpebra: .5 }) + pT(FILHA, 300, 790, .7, t, { sentado: true, olhar: [.9, -.2], olhos: 'arregalados' }) + sofaFrente(220, 790) },
  // 5 · frente de vidro: ricos de pé erguendo plaquinhas de aposta; travelling
  { l: 1, w: 6, split: false, sfx: [{ t: .1, s: G('voice_heh_heh_heh_heh_1'), v: .25 }, { t: .5, s: G('glass_bottle_hit_2'), v: .2 }], cam: { s: [1, 1.03], c: [276, 520], c1: [300, 520] },
    f: (tl, d, t) => camaroteM(t, { vidro: [-60, 640], pe: 1 }) + [[RICACO, 125, '$ 500'], [RICA, 300, '$ 1 MI'], [RICO3, 450, '$ 80']].map(([P, x, v], i) => pT(P, x, 900, .58, t, { flip: i === 2, olhar: [.2, -.2], boca: BOCAS.riso, bE: { h: [-50, -250], bend: -20, punho: true }, seguraE: `<g transform="translate(0 -70) scale(${i === 2 ? -1 : 1} 1)">${placaAposta(v)}</g>` })).join('') },
  // 6 · telão: "PRÊMIO: 1 MÊS DE COMIDA" com o saco de arroz; push-in
  { l: 2, split: false, blur: false, sfx: [{ t: .05, s: G('ding_2'), v: .3 }], cam: { s: [1, 1.08], c: [288, 420] },
    f: (tl, d, t) => telao(['PRÊMIO:', '1 MÊS', 'DE COMIDA'], { tam: 62, y: 300, altura: 580, extra: saco(288, 680, 1.3) }) },
  // 7 · rua: um homem ergue um cartaz "PÃO CARO"
  { l: 3, split: false, sfx: [{ t: .05, s: G('voice_raaaaaa_1'), v: .15 }], cam: { s: [1, 1.05], c: [288, 520] },
    f: (tl, d, t) => ruaBairro2D() + pT(CARTAZ_H, 260, 960, .9, t, { boca: BOCAS.grito, sobr: -.8, bE: { h: [-40, -280], bend: -20, punho: true }, seguraE: `<g transform="translate(-20 -120)">${tTraco('M0 0 V150', TLW * 2, '#8A6A4A')}${tForma(tPoli([[-110, -70], [110, -70], [110, 30], [-110, 30]]), '#F4F1EA')}${TXT(0, -6, 50, 'PÃO CARO', '#C0392B')}</g>` }) },
  // 8 · o guarda de colete laranja cola no peito dele "ATRAÇÃO ESPECIAL"
  { l: 3, w: 2, split: false, sfx: [{ w: 3, l: 3, s: G('slap_2'), v: .3 }], cam: { s: [1.02, 1.06], c: [288, 520] },
    f: (tl, d, t) => { const k = sobe(.15, .45, tl); return ruaBairro2D() + pT(CARTAZ_H, 170, 960, .8, t, { olhos: 'arregalados', boca: BOCAS.o, sobr: .6 })
      + pT(GUARDA, 410, 960, .8, t, { flip: true, olhar: [1, .3], palpebra: .6, bD: { h: [lerp(40, 200, k), lerp(40, 70, k)], bend: 10 } })
      + (k > .9 ? `<g transform="translate(204 772) rotate(-8)">${tForma(tPoli([[-62, -26], [62, -26], [62, 26], [-62, 26]]), '#F2C94C')}${TXT(0, -2, 18, 'ATRAÇÃO', TINK)}${TXT(0, 18, 18, 'ESPECIAL', TINK)}</g>` : ''); } },
  // 9 · arena, contra-plongée: lutador com correntes nos pulsos, de cabeça baixa
  { l: 4, split: false, sfx: [{ t: .1, s: G('metal_rattler_2'), v: .35 }], cam: { s: [1, 1.05], c: [288, 560], c1: [288, 520] },
    f: (tl, d, t) => arenaM(t, { pe: 1 }) + pT(ACORR, 288, 1060, 1.05, t, { cabInc: .3, olhar: [0, .8], palpebra: .7, boca: { sm: -.8 }, bD: { h: [20, 90], bend: 30, punho: true }, bE: { h: [-30, 100], bend: -30, punho: true }, semCorte: true })
      + correntePulso(366, 816, 430, 1030) + correntePulso(196, 824, 130, 1030) + [366, 196].map(x => `<g transform="translate(${x} 818)">${algema(.8)}</g>`).join('') },
  // 10 · reação: um senhor na arquibancada tapa a boca
  { l: 4, w: 3, split: false, cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => reacaoToon(SENHOR, t, tl, { olhos: 'arregalados', sobr: .8, bD: { h: [24, -64], bend: 40 }, olhar: [.6, .3] }, { fundo: ARE.fundo, forma: '#4A4258' }) },
  // 11 · PLANO-MESTRE do camarote em corte, pan da esquerda para a direita: piso firme e frente de vidro
  { l: 5, split: false, blur: false, sfx: [{ t: .05, s: G('balloon_deflate_1'), v: .15 }], cam: { s: [1.75, 1.75], c: [130, 330], c1: [250, 330], pop: false },
    f: (tl, d, t) => arenaCorte(t, { pe: 1 }) + pT(SEGURANCA, 10, MC.piso, MC.s, t, { nocheck: true, semCorte: true, still: true }) + pT(DONO, 190, MC.piso, MC.s, t, { olhar: [1, .5], nocheck: true, semCorte: true })
      + pT(PREFEITO, 120, MC.piso - 6, MC.s, t, { sentado: true, nocheck: true, semCorte: true }) + `<g transform="translate(300 ${MC.piso}) scale(.2)">${pilhaPremios(0, 0)}</g>` + `<g transform="translate(385 ${MC.piso}) scale(.2)">${botaoPed(0, 0)}</g>`
      + [[RICACO, 258], [RICA, 342]].map(([P, x], i) => pT(P, x, MC.piso, MC.s, t, { olhar: [.4, .6], nocheck: true, semCorte: true, ph: i })).join('') },
  // 12 · uma rica de pele no ar-condicionado, cabelo esvoaçando, olhos fechados
  { l: 5, w: 3, split: false, sfx: [{ t: 0, s: G('balloon_deflate_3'), v: .2 }], cam: { s: [1, 1.04], c: [288, 470] },
    f: (tl, d, t) => fundoChapado(CAMA.parede) + ret(330, 120, 220, 90, '#E8E2D6', '#C9C2B0') + [0, 1, 2, 3].map(i => tTraco(`M${350 + i * 50} 210 Q${330 + i * 50 + Math.sin(t * 18 + i) * 14} 260 ${340 + i * 50} 300`, TLW, '#7FB8E8')).join('')
      + pT(RICA, 220, 1150, 1.35, t, { olhos: 'fechados', boca: BOCAS.sorriso, cabInc: -.12, semCorte: true }) },
  // 13 · um rico estoura o champanhe, a rolha voa
  { l: 5, w: 4, split: false, sfx: [{ t: .08, s: G('mouth_pop_2'), v: .4 }], cam: { s: [1, 1.04], c: [288, 500] },
    f: (tl, d, t) => { const k = sobe(.1, .6, tl); return camaroteM(t, { pe: 1 }) + pT(RICO2, 260, 1080, 1, t, { boca: BOCAS.riso, olhar: [.5, -.6], bE: { h: [-30, -250], bend: -20, punho: true }, seguraE: `<g transform="translate(0 -40) rotate(30)">${garrafa(1.1)}</g>`, semCorte: true })
      + (k > 0 ? `<g transform="translate(${300 + k * 120} ${330 - k * 220})">${tForma(tElip(0, 0, 12, 16), '#C9A06A')}</g>` + [0, 1, 2, 3, 4].map(i => `<circle cx="${290 + i * 22 * k}" cy="${350 - i * 30 * k}" r="${10 - i}" fill="#F7F3E0"/>`).join('') : ''); } },
  // 14 · close do pedestal na frente de vidro, push-in: botão vermelho, "MAIS EMOÇÃO"
  { l: 5, w: 6, split: false, sfx: [{ t: .05, s: G('wind_up_toy_1'), v: .15 }], cam: { s: [1, 1.12], c: [288, 520], c1: [288, 470] },
    f: (tl, d, t) => camaroteM(t, { vidro: [-60, 640], pe: 1, chao: 860 }) + botaoPed(288, 860, 2.1) },
  // 15 · reação: o ricaço mexe o dedo por cima do botão, sorrindo
  { l: 5, w: 9, split: false, semFala: true, sfx: [{ t: .2, s: G('voice_heh_heh_heh_heh_1'), v: .25 }], cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => reacaoToon(RICACO, t, tl, { boca: BOCAS.sorriso, palpebra: .55, olhar: [.6, .6], bD: { h: [92, -78 + Math.sin(t * 14) * 6], bend: 30 } }, { fundo: CAMA.parede, forma: CAMA.ouro, brilho: '#FF3B30', lado: 1 }) + botaoPed(472, 810, .85, false, 0, true) },
  // 16 · close 3/4 do Davi: acena com o esfregão
  { l: 6, split: false, sfx: [{ t: .1, s: G('rubber_snapping_2'), v: .2 }], cam: { s: [1, 1.05], c: [288, 470], shake: 2 },
    f: (tl, d, t) => fundoChapado(CAMA.parede) + ret(60, 120, 20, 900, CAMA.ouro) + ret(460, 120, 20, 900, CAMA.ouro)
      + pT(DAVI, 250, 1170, 1.45, t, { olhar: [.4, 0], boca: BOCAS.sorriso, bE: { h: [-40, -240 + Math.sin(t * 10) * 14], bend: -30, punho: true }, seguraE: `<g transform="translate(0 -60) rotate(-10)">${esfregao(.9)}</g>`, semCorte: true }) },
  // 17 · ricos sentados nas poltronas e Davi agachado esfregando aos pés deles; ninguém olha
  { l: 6, w: 4, split: false, sfx: [{ t: .1, s: G('washboard_scrape_1'), v: .2 }], cam: { s: [1, 1.04], c: [288, 540] },
    f: (tl, d, t) => camaroteM(t, { pe: 1, chao: 840 }) + poltrona(120, 840, .9) + poltrona(450, 840, .9, true) + pT(RICO3, 120, 840, .7, t, { sentado: true, olhar: [.6, -.3], segura: taca(.9), bD: { h: [100, -30], bend: 30, punho: true } }) + pT(RICA, 450, 840, .7, t, { sentado: true, flip: true, olhar: [.5, -.3], palpebra: .6 })
      + pT(DAVI, 290, 870, .62, t, { chao: true, inclina: .35, olhar: [0, .8], bD: { h: [130, 60 + Math.sin(t * 9) * 20], bend: 20, punho: true }, segura: `<g transform="rotate(${-60 + Math.sin(t * 9) * 8})">${esfregao(.6)}</g>` }) + `<g transform="translate(380 846)">${balde(.7)}</g>` },
  // 18 · corte lateral de perto: Davi inteiro esfregando o vidro; por baixo do vidro, a arena lá embaixo
  { l: 7, split: false, sfx: [{ t: .1, s: G('washboard_scrape_3'), v: .2 }], cam: { s: [1, 1.04], c: [288, 512] },
    f: (tl, d, t) => fundoChapado(CAMA.parede) + [40, 220, 400].map(x => ret(x, 60, 16, 580, CAMA.ouro)).join('') + `<rect x="-40" y="716" width="700" height="400" fill="#2E2838"/>`
      + [160, 420].map(x => `<path d="M${x} 716 L${x - 70} 900 L${x + 70} 900Z" fill="#FFF6D8" opacity=".08"/>`).join('') + `<rect x="-40" y="900" width="700" height="300" fill="${ARE.areia}"/>` + tTraco('M-40 900 H640')
      + `<rect x="-40" y="700" width="700" height="16" fill="${CAMA.vidro}" opacity=".85"/>` + tTraco('M-40 700 H640') + tTraco('M-40 716 H640', TLW * .7) + [0, 1, 2, 3].map(i => `<path d="M${30 + i * 150} 720 l50 40" stroke="#BFE3F5" stroke-width="4" opacity=".35"/>`).join('')
      + pT(DAVI, 270, 700, .75, t, { inclina: .3, olhar: [.4, .8], bD: { h: [120, 80 + Math.sin(t * 9) * 16], bend: 20, punho: true }, segura: `<g transform="rotate(-40)">${esfregao(.7)}</g>` }) + `<g transform="translate(430 700)">${balde(.85)}</g>` },
  // 19 · close do Davi: olhos atentos, de rabo de olho
  { l: 7, w: 5, split: false, cam: { s: [1, 1.06], c: [288, 470] },
    f: (tl, d, t) => reacaoToon(DAVI, t, tl, { olhar: [-1, 0], palpebra: .55, boca: { sm: -.1, skew: .4 } }, { fundo: CAMA.parede, forma: CAMA.ouro }) },
  // 20 · pan para o pilar: a alavanca atrás da corda de veludo, entre o piso firme e o vidro
  { l: 8, split: false, sfx: [{ t: .3, s: G('tiny_hit_2'), v: .3 }], cam: { s: [1, 1.04], c: [200, 520], c1: [300, 520], pop: false },
    f: (tl, d, t) => camaroteM(t, { vidro: [360, 700], janela: false }) + ret(300, 120, 60, 680, '#5C5A60', '#48464C') + alavanca(330, 560, 1.3, 0, true) },
  // 21 · insert: a placa "PRÊMIOS" na alavanca, com o Davi desfocado na frente
  { l: 8, w: 4, split: false, cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => fundoChapado('#5C5A60') + alavanca(300, 330, 2.4, 0, false) + `<g style="filter:blur(6px)" opacity=".95">${pT(DAVI, -70, 1150, 1.5, t, { olhar: [1, -.3], nocheck: true, semCorte: true })}</g>` },
  // 22 · demonstração no corte: um rico puxa a alavanca e o alçapão do meio do vidro abre
  { l: 8, w: 7, split: false, sfx: [{ t: .25, s: G('metal_hit_2'), v: .3 }], cam: { s: [1.7, 1.75], c: [280, 430], pop: false },
    f: (tl, d, t) => { const k = sobe(.15, .5, tl), a = sobe(.4, .8, tl), q = sobe(.75, 1.4, tl);
      return arenaCorte(t, { pe: 1, alavanca: k, alcapao: a }) + pT(RICO2, 205, MC.piso, MC.s, t, { olhar: [1, 0], boca: BOCAS.sorriso, bE: { h: [lerp(-20, 160, k), -140], bend: -10, punho: true }, nocheck: true, semCorte: true })
        + `<g transform="translate(315 ${MC.piso + q * q * 440}) scale(.2)">${pilhaPremios(0, 0)}</g>` + [[RICA, 260], [RICACO, 370]].map(([P, x], i) => pT(P, x, MC.piso, MC.s, t, { olhar: [0, .8], nocheck: true, semCorte: true, ph: i })).join(''); } },
  // 23 · corte, câmera desce junto: os sacos caem na areia, perto de um vencedor que comemora
  { l: 8, w: 13, split: false, sfx: [{ t: .15, s: G('plastic_rice_bag_hit_1'), v: .4 }, { t: .35, s: G('plastic_rice_bag_hit_3'), v: .35 }], cam: { s: [1.6, 1.6], c: [300, 600], c1: [300, 740], pop: false },
    f: (tl, d, t) => { const q = sobe(0, .4, tl); return arenaCorte(t, { pe: 1, alcapao: 1 }) + `<g transform="translate(315 ${lerp(MC.piso + 200, MC.areia, q * q)}) scale(.24)">${pilhaPremios(0, 0)}</g>`
      + pT(LUTA1, 200, MC.areia, .32, t, { boca: BOCAS.riso, olhos: 'arregalados', bD: { h: [180, -200], bend: 20, punho: true }, bE: { h: [-40, -300], bend: -20, punho: true }, walk: q < 1 ? null : null }); } },
  // 24 · o dono inteiro no tapete vermelho; a ponta do sapato chega na borda do vidro e recua; push-in até o rosto
  { l: 9, split: false, cam: { s: [1, 1.25], c: [280, 640], c1: [270, 420] },
    f: (tl, d, t) => { const pe = Math.sin(clamp(tl / .9) * Math.PI) * 95; return camaroteM(t, { vidro: [330, 700], tapete: 250, pe: 1 }) + pT(DONO, 250, 830, .72, t, { olhar: [.7, .5], palpebra: .5, boca: { sm: .2 }, pD: [pe, -Math.max(0, pe - 10) * .4], bD: { h: [-30, 110], bend: -30, punho: true } }); } },
  // 25 · plano a dois lateral: o ricaço se vira e pega o Davi olhando a alavanca
  { l: 10, split: false, cam: { s: [1, 1.04], c: [288, 520] },
    f: (tl, d, t) => { const vira = tl > .5; return camaroteM(t, { pe: 1 }) + ret(440, 120, 60, 680, '#5C5A60', '#48464C') + alavanca(470, 560, .8, 0, false)
      + pT(DAVI, 300, 900, .68, t, { olhar: [1, -.2], palpebra: .35, segura: balde(.9), bD: { h: [30, 120], bend: 20, punho: true }, bE: { h: [-40, 60], bend: -10, punho: true }, seguraE: `<g transform="rotate(-10) translate(0 -150)">${esfregao(.7)}</g>` }) + pT(RICACO, 140, 900, .7, t, { flip: !vira, olhar: vira ? [1, 0] : [-1, 0], sobr: vira ? .4 : 0, segura: taca(.9), bD: { h: [100, -20], bend: 30, punho: true } }); } },
  // 26 · reação: o ricaço ri, falante: "Faxineiro não precisa saber disso."
  { l: 10, w: 6, split: false, sfx: [{ t: .05, s: G('voice_ha_ha_1'), v: .3 }], cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => reacaoToon(RICACO, t, tl, { falante: true, boca: { sm: 1 }, palpebra: .45, olhar: [-.4, .2], sobr: .5, bD: { h: [150, -50], bend: 30, punho: true }, segura: taca(1) }, { fundo: CAMA.parede, forma: CAMA.ouro }) },
  // ---------------------------------------------------------------- BLOCO B (27–52): a Lia e o jogo
  // 27 · padaria: Lia no balcão; plaquinha "PÃO R$ 19"; push-in
  { l: 11, split: false, sfx: [{ t: .05, s: G('bell_2'), v: .25 }], cam: { s: [1, 1.06], c: [288, 540] },
    f: (tl, d, t) => padaria() + pT(LIA, 230, 900, .78, t, { olhar: [1, -.3], palpebra: .45 }) },
  // 28 · close da Lia, falante: aponta brava para o preço
  { l: 11, w: 9, split: false, cam: { s: [1, 1.05], c: [288, 470], shake: 2 },
    f: (tl, d, t) => padaria() + pT(LIA, 200, 1200, 1.4, t, { falante: true, sobr: -.8, olhar: [1, -.4], bD: { h: [170, -60], bend: 10 }, semCorte: true }) },
  // 29 · o guarda de colete laranja cola "ATRAÇÃO ESPECIAL" nas costas da Lia
  { l: 12, split: false, sfx: [{ t: .3, s: G('slap_3'), v: .3 }], cam: { s: [1, 1.04], c: [288, 520] },
    f: (tl, d, t) => { const k = sobe(.1, .4, tl); return padaria() + pT(LIA, 330, 920, .76, t, { olhar: [1, -.3], olhos: k > .9 ? 'arregalados' : null, sobr: k > .9 ? .7 : -.6 })
      + pT(GUARDA, 120, 920, .78, t, { olhar: [1, .3], palpebra: .6, bD: { h: [lerp(40, 175, k), lerp(40, 80, k)], bend: 10 } })
      + (k > .9 ? `<g transform="translate(300 735) rotate(6)">${tForma(tPoli([[-62, -26], [62, -26], [62, 26], [-62, 26]]), '#F2C94C')}${TXT(0, -2, 18, 'ATRAÇÃO', TINK)}${TXT(0, 18, 18, 'ESPECIAL', TINK)}</g>` : ''); } },
  // 30 · reação: Davi arregala os olhos, o esfregão escorrega
  { l: 12, w: 2, split: false, sfx: [{ t: .15, s: G('wood_hit_1'), v: .3 }], cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => { const q = sobe(.15, .7, tl); return reacaoToon(DAVI, t, tl, { olhos: 'arregalados', sobr: 1, boca: BOCAS.o, bD: { h: [130, 20], bend: 30, punho: q === 0 }, segura: q === 0 ? `<g transform="rotate(-15) translate(0 -120)">${esfregao(1)}</g>` : '' }, { fundo: CAMA.parede, forma: CAMA.ouro }) + (q > 0 ? `<g transform="translate(${526 + q * 30} ${700 + q * q * 400}) rotate(${-15 + q * 60})"><g transform="translate(0 -120)">${esfregao(1.5)}</g></g>` : ''); } },
  // 31 · arena: Lia em primeiro plano, 3/4 de costas; no fundo, o portão de grade subindo
  { l: 13, split: false, sfx: [{ t: .1, s: G('metal_rattler_3'), v: .3 }], cam: { s: [1, 1.04], c: [288, 520] },
    f: (tl, d, t) => arenaM(t, { pe: 1, grade: 400, gradeK: sobe(0, 1, tl) }) + pT(LIA, 140, 1120, 1.15, t, { olhar: [1, -.3], palpebra: .2, sobr: .5, semCorte: true }) },
  // 32 · Caio sai do escuro da grade, magro, com medo
  { l: 13, w: 3, split: false, cam: { s: [1.04, 1.08], c: [288, 520] },
    f: (tl, d, t) => arenaM(t, { pe: 1, grade: 300, gradeK: 1 }) + pT(CAIO, lerp(300, 330, sobe(0, .6, tl)), 900, .82, t, { olhar: [-.5, -.2], sobr: .8, palpebra: .2, boca: { sm: -.6 }, walk: tl < .6 ? tl * 2 : null }) },
  // 33 · flash de memória: Davi, Lia e Caio crianças jogando bola na rua de tijolo
  { l: 13, w: 5, split: false, blur: false, sfx: [{ t: .1, s: G('drum_bonk_2'), v: .25 }], cam: { s: [1, 1.04], c: [288, 520] },
    f: (tl, d, t) => { const bx = 290 + Math.sin(tl * 3) * 110, by = 880 - Math.abs(Math.sin(tl * 9)) * 50; return memoria(ruaBairro2D() + pT(DAVI_K, 120, 900, .6, t, { olhar: [1, .4], boca: BOCAS.riso, pD: [40 + Math.sin(tl * 9) * 30, -20], bD: { h: [60, -40], bend: 20 }, bE: { h: [-60, -40], bend: -20 } }) + pT(LIA_K, 280, 900, .58, t, { olhar: [.2, .6], boca: BOCAS.riso, bE: { h: [-40, -200], bend: -20 } }) + pT(CAIO_K, 470, 900, .6, t, { flip: true, olhar: [1, .4], boca: BOCAS.riso, bD: { h: [40, 60], bend: 20 } })
      + tForma(tElip(bx, by, 26, 26), '#F4F1EA', tPinta(tElip(bx + 8, by + 6, 18, 18), '#D8D3C6'))); } },
  // 34 · telão visto da areia, Lia pequena na frente: "CHANCE DA LIA: 2%"
  { l: 14, split: false, semFala: true, sfx: [{ t: .1, s: G('ding_4'), v: .3 }], cam: { s: [1, 1.05], c: [288, 470], c1: [288, 440] },
    f: (tl, d, t) => arenaM(t, { pe: 1, chao: 880 }) + telaoQ(50, 90, 476, 420, ['CHANCE', 'DA LIA:', '2%'], 86) + pT(LIA, 290, 885, .5, t, { flip: true, olhar: [-.3, -1], nocheck: true }) },
  // 35 · reação: close da Lia, ela engole seco
  { l: 14, w: 5, split: false, semFala: true, sfx: [{ t: .15, s: G('bite_apple_1'), v: .15 }], cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => reacaoToon(LIA, t, tl, { olhar: [.6, -.6], sobr: .8, palpebra: .1, boca: { sm: -.7, w: .6 } }, { fundo: ARE.fundo, forma: '#4A4258' }) },
  // 36 · corredor de serviço, ao pé da escada: Davi com o balde, olhando a areia pela grade
  { l: 15, split: false, semFala: true, cam: { s: [1, 1.04], c: [288, 520] },
    f: (tl, d, t) => fundoChapado('#5A5650') + ret(-40, 120, 200, 680, '#4A4640') + [0, 1, 2, 3, 4].map(i => ret(-40 + i * 34, 700 - i * 110, 220 - i * 34, 26, '#C9C2B0')).join('')
      + ret(340, 180, 300, 620, ARE.areia) + `<rect x="340" y="180" width="300" height="260" fill="${ARE.fundo}"/>` + [0, 1, 2, 3, 4].map(i => tTraco(`M${360 + i * 50} 180 V800`, TLW * 2, '#9AA3AD')).join('') + tTraco('M340 180 V800', TLW * 2)
      + chaoToon('#4A4640', '#3a3630', 800) + pT(DAVI, 230, 880, .74, t, { olhar: [1, .2], palpebra: .45, boca: { sm: -.5 }, segura: balde(1.4), bD: { h: [30, 120], bend: 20, punho: true }, bE: { h: [-40, 60], bend: -10, punho: true }, seguraE: `<g transform="rotate(-10) translate(0 -150)">${esfregao(.8)}</g>` }) },
  // 37 · close do Davi na grade: rosto e mãos apertando as barras
  { l: 15, w: 8, split: false, sfx: [{ t: .1, s: G('metal_rattler_1'), v: .3 }], cam: { s: [1, 1.06], c: [288, 470], shake: 2 },
    f: (tl, d, t) => reacaoToon(DAVI, t, tl, { olhar: [.8, .2], sobr: -.9, boca: { sm: -.8, skew: .3 }, bD: { h: [120, -20], bend: 30, punho: true }, bE: { h: [-30, -20], bend: -30, punho: true } }, { fundo: ARE.fundo }) + [0, 1, 2, 3].map(i => tTraco(`M${60 + i * 160} -100 V1200`, TLW * 5, '#9AA3AD')).join('') },
  // 38 · o juiz de arena bate o gongo com o martelo
  { l: 16, split: false, sfx: [{ t: .25, s: G('resonating_metal_hit_2'), v: .5 }], cam: { s: [1, 1.05], c: [288, 520], shake: 4 },
    f: (tl, d, t) => { const bate = sobe(.15, .3, tl); return arenaM(t, { pe: 1 }) + gongo(380, 860, 1.1, tl > .3 ? clamp((tl - .3) / 1.2) : 0)
      + pT(JUIZ, 160, 900, .8, t, { olhar: [1, -.2], boca: { o: .4 }, bD: { h: [lerp(60, 160, bate), lerp(-200, -110, bate)], bend: 20, punho: true }, segura: `<g transform="rotate(${lerp(-70, 10, bate)})">${tTraco('M0 0 L0 -120', TLW * 2.4, '#8A6A4A')}${tForma(tElip(0, -130, 22, 22), '#C0392B')}</g>` }); } },
  // 39 · plano aberto da arena, deriva lenta: Lia e Caio parados, um de cada lado; arquibancada de pé
  { l: 16, w: 3, split: false, cam: { s: [1, 1.03], c: [270, 540], c1: [306, 530], pop: false },
    f: (tl, d, t) => arenaM(t, { pe: 1, chao: 860 }) + pT(LIA, 110, 930, .5, t, { olhar: [1, 0], palpebra: .3, still: true }) + pT(CAIO, 470, 930, .52, t, { flip: true, olhar: [1, 0], palpebra: .3, still: true }) },
  // 40 · frente de vidro: o ricaço aperta o botão
  { l: 17, split: false, sfx: [{ w: 4, l: 17, s: G('drum_bonk_1'), v: .35 }], cam: { s: [1, 1.04], c: [288, 520] },
    f: (tl, d, t) => { const ap = t >= ws(17, 4) - .05; return camaroteM(t, { vidro: [-60, 640], pe: 1, chao: 860 }) + botaoPed(380, 860, 1.05, ap, t)
      + pT(RICACO, 220, 900, .78, t, { olhar: [1, .4], boca: BOCAS.sorriso, palpebra: .5, bD: { h: [ap ? 150 : 110, ap ? -35 : -120], bend: 20 } }); } },
  // 41 · close do botão aceso; os holofotes ficam vermelhos
  { l: 17, w: 7, split: false, semFala: true, sfx: [{ t: 0, s: G('siren_whistle_1'), v: .3 }], cam: { s: [1, 1.08], c: [288, 500] },
    f: (tl, d, t) => camaroteM(t, { vidro: [-60, 640], pe: 1, chao: 860 }) + `<rect x="70" y="200" width="436" height="400" fill="#FF2B3A" opacity="${Math.floor(t * 6) % 2 ? .35 : .12}"/>` + botaoPed(288, 860, 2.1, true, t) + HOLO(true) },
  // 42 · plongée em 3/4: dois paredões vêm da esquerda e da direita, com poeira
  { l: 18, split: false, sfx: [{ t: 0, s: G('metal_beam_hit_2'), v: .35 }, { t: .4, s: G('ground_thump_1'), v: .3 }], cam: { s: [1, 1.05], c: [288, 520], shake: 3 },
    f: (tl, d, t) => { const k = sobe(0, d, tl) * .5; return fundoChapado(ARE.areia) + ret(-40, -40, 660, 300, '#4A2A36') + paredoes(k, 760, { poeira: 1, topo: 1, g0: 240, g1: 90 })
      + pT(LIA, 190, 780, .5, t, { olhar: [-1, -.2], sobr: .8, olhos: 'arregalados' }) + pT(CAIO, 390, 780, .52, t, { flip: true, olhar: [-1, -.2], sobr: .8, olhos: 'arregalados' }) + HOLO(true); } },
  // 43 · plano baixo, nível do chão: Lia e Caio no meio, os paredões chegando
  { l: 18, w: 7, split: false, sfx: [{ t: .1, s: G('metal_wobble_2'), v: .3 }], cam: { s: [1, 1.05], c: [288, 520], shake: 3 },
    f: (tl, d, t) => fundoChapado('#4A2A36') + multidao(-40, 640, 330, 3, t, { pe: 1 }) + chaoToon(ARE.areia, ARE.areiaS, 860) + pT(LIA, 170, 880, .5, t, { olhar: [-1, 0], olhos: 'arregalados', sobr: 1 }) + pT(CAIO, 410, 880, .52, t, { flip: true, olhar: [-1, 0], olhos: 'arregalados', sobr: 1 })
      + `<g transform="translate(288 1100) scale(1.5) translate(-288 -1100)">${paredoes(.5 + sobe(0, d, tl) * .2, 1100, { poeira: 1, g0: 200, g1: 70 })}</g>` + HOLO(true) },
  // 44 · close da Lia: ela olha para o lado
  { l: 19, split: false, cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => reacaoToon(LIA, t, tl, { olhar: [1, 0], palpebra: .3, boca: { sm: -.3 } }, { fundo: '#4A2A36', forma: '#9A9690' }) + HOLO(true) },
  // 45 · close do Caio: ele olha de volta
  { l: 19, w: 5, split: false, cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => reacaoToon(CAIO, t, tl, { flip: true, x: 330, olhar: [1, 0], palpebra: .3, boca: { sm: -.2 } }, { fundo: '#4A2A36', forma: '#9A9690' }) + HOLO(true) },
  // 46 · os dois se sentam na areia, de pernas cruzadas
  { l: 20, split: false, sfx: [{ t: .3, s: G('ground_thump_3'), v: .3 }], cam: { s: [1, 1.04], c: [288, 540] },
    f: (tl, d, t) => { const sen = tl > .3; return fundoChapado('#4A2A36') + multidao(-40, 640, 330, 3, t, { pe: 1 }) + chaoToon(ARE.areia, ARE.areiaS, 860) + paredoes(.4, 860, { g0: 200, g1: 70 })
      + pT(LIA, 185, 900, .6, t, { chao: sen, olhar: [1, 0], palpebra: .35, boca: { sm: .1 } }) + pT(CAIO, 385, 900, .62, t, { flip: true, chao: sen, olhar: [1, 0], palpebra: .35, boca: { sm: .1 } }) + HOLO(true); } },
  // 47 · arquibancada: o povo, que estava de pé, senta em onda, de braços cruzados
  { l: 21, split: false, sfx: [{ t: .05, s: G('chatter_2'), v: .3 }], cam: { s: [1, 1.04], c: [230, 520], c1: [340, 520], pop: false },
    f: (tl, d, t) => fundoChapado('#4A2A36') + multidao(-60, 700, 900, 9, t, { pe: 1, senta: sobe(0, d * .85, tl), passo: 60, degrau: 80, semente: 7 }) + HOLO(true) },
  // 48 · telão, tilt para baixo com tremor: "AUDIÊNCIA CAINDO"
  { l: 22, split: false, semFala: true, blur: false, sfx: [{ t: .1, s: G('trumpet_sad_1'), v: .3 }], cam: { s: [1, 1.04], c: [288, 420], c1: [288, 480], shake: 5 },
    f: (tl, d, t) => arenaM(t, { senta: 1, chao: 880 }) + `<rect x="-100" y="-400" width="800" height="470" fill="${ARE.fundo}"/>` + telaoQ(50, 90, 476, 420, ['AUDIÊNCIA', 'CAINDO'], 80) + `<path d="M420 400 l36 50 l36 -50z" fill="#FF3B30"/>` + HOLO(true) },
  // 49 · frente de vidro: ricos vaiando na beira do vidro, polegar para baixo
  { l: 23, split: false, sfx: [{ t: .05, s: G('voice_bah_1'), v: .3 }], cam: { s: [1, 1], c: [288, 520], c1: [288, 520] },
    f: (tl, d, t) => camaroteM(t, { vidro: [-60, 640], pe: 1, senta: 1, chao: 860 }) + [[RICO2, 115], [RICA, 290], [RICO3, 455]].map(([P, x], i) => { const f = i === 2 ? -1 : 1, hx = x + f * 194 * .58, hy = 940 - 265 * .58; return pT(P, x, 940, .58, t, { flip: i === 2, sobr: -1, boca: { o: .6, sm: -.9, w: .8 }, olhar: [.3, .5], bD: { h: [140, 60], bend: 10, punho: true }, ph: i }) + tTraco(`M${hx} ${hy} V${hy + 26}`, TLW * 2.6, P.pele) + tTraco(`M${hx} ${hy} V${hy + 26}`, TLW * .8); }).join('') + HOLO(true) },
  // 50 · um rico atira a taça na arena
  { l: 23, w: 3, split: false, sfx: [{ t: .35, s: G('glass_bottle_hit_4'), v: .35 }], cam: { s: [1, 1.04], c: [288, 520] },
    f: (tl, d, t) => { const k = sobe(.1, .5, tl); return camaroteM(t, { vidro: [-60, 640], pe: 1, senta: 1, chao: 860 }) + pT(RICACO, 200, 960, .8, t, { sobr: -1, boca: BOCAS.grito, olhar: [1, .4], bD: { h: [lerp(120, 200, k), lerp(-200, -40, k)], bend: 20, punho: k < .5 }, segura: k < .5 ? taca(1) : '' })
      + (k >= .5 ? (() => { const u = (k - .5) * 2; return `<g transform="translate(${lerp(400, 520, u)} ${lerp(600, 1060, u * u)}) rotate(${u * 300})">${taca(.9)}</g>`; })() : '') + HOLO(true); } },
  // 51 · três ricos inteiros disputando o botão a cotoveladas
  { l: 23, w: 5, split: false, sfx: [{ t: .05, s: G('drum_bonk_3'), v: .3 }, { t: .3, s: G('drum_bonk_4'), v: .3 }, { t: .6, s: G('drum_bonk_2'), v: .3 }], cam: { s: [1, 1.02], c: [288, 520], shake: 2 },
    f: (tl, d, t) => { const q = Math.floor(tl * 6) % 3; return camaroteM(t, { vidro: [-60, 640], pe: 1, senta: 1, chao: 900 }) + botaoPed(330, 900, .95, true, t)
      + [[RICACO, 100, 0, false], [RICO3, 225, 1, false], [RICA, 470, 2, true]].map(([P, x, i, fl]) => pT(P, x + (q === i ? (fl ? -30 : 30) : 0), 920, .6, t, { flip: fl, sobr: -.8, boca: q === i ? BOCAS.riso : BOCAS.grito, olhar: [1, .5], inclina: q === i ? .12 : 0, bD: { h: [q === i ? 170 : 60, q === i ? -60 : 40], bend: 20, punho: q !== i }, bE: { h: [q === i ? -20 : 110, q === i ? 60 : -60], bend: 30, punho: true } })).join('') + HOLO(true); } },
  // 52 · plongée da arena: os paredões mais perto; Lia e Caio sentados, de mãos dadas
  { l: 23, w: 11, split: false, sfx: [{ t: .05, s: G('metal_beam_hit_3'), v: .3 }], cam: { s: [1, 1.06], c: [288, 520], shake: 3 },
    f: (tl, d, t) => fundoChapado(ARE.areia) + ret(-40, -40, 660, 300, '#4A2A36') + paredoes(.62 + sobe(0, d, tl) * .1, 760, { poeira: 1, topo: 1, g0: 200, g1: 70 })
      + pT(LIA, 210, 780, .5, t, { chao: true, olhar: [1, 0], bD: { h: [90, 60], bend: 10 } }) + pT(CAIO, 370, 780, .51, t, { flip: true, chao: true, olhar: [1, 0], bD: { h: [90, 60], bend: 10 } }) + HOLO(true) },
  // ---------------------------------------------------------------- BLOCO C (53–80): a virada e o gancho
  // 53 · close do Davi no corredor: testa franzida
  { l: 24, split: false, cam: { s: [1, 1.06], c: [288, 470] },
    f: (tl, d, t) => reacaoToon(DAVI, t, tl, { sobr: -.9, olhar: [.5, -.4], palpebra: .5, boca: { sm: -.3, skew: .5 } }, { fundo: '#5A5650', forma: '#4A4640' }) + HOLO(true) },
  // 54 · ponto de vista do Davi, contra-plongée: o segurança na porta, no alto da escada, olha para baixo, para a câmera
  { l: 25, split: false, sfx: [{ t: .1, s: G('thin_metal_hit_2'), v: .2 }], cam: { s: [1, 1.05], c: [288, 520] },
    f: (tl, d, t) => fundoChapado('#4A4640') + ret(150, 120, 280, 560, '#2a1f24') + [0, 1, 2, 3, 4, 5].map(i => tForma(tPoli([[40 - i * 20, 640 + i * 70], [536 + i * 20, 640 + i * 70], [546 + i * 22, 700 + i * 70], [30 - i * 22, 700 + i * 70]]), '#C9C2B0', tPinta(tPoli([[-60, 680 + i * 70], [700, 680 + i * 70], [700, 700 + i * 70], [-60, 700 + i * 70]]), '#A8A090'))).join('')
      + pT(SEGURANCA, 290, 660, .95, t, { olhar: [-.1, .9], cabInc: .25, palpebra: .3, boca: { sm: -.4 }, still: true }) + HOLO(true) },
  // 55 · plano a dois: o segurança, no alto da escada, olha através do Davi, que vira contorno pontilhado
  { l: 25, w: 6, split: false, sfx: [{ t: .35, s: G('spring_tube_ghost_1'), v: .3 }], cam: { s: [1, 1.03], c: [288, 512] },
    f: (tl, d, t) => fundoChapado('#4A4640') + ret(450, 90, 140, 240, '#2a1f24') + tForma(tPoli([[290, 640], [600, 330], [700, 330], [700, 1100], [290, 1100]]), '#5A5650') + [0, 1, 2, 3, 4].map(i => ret(300 + i * 64, 610 - i * 64, 400, 26, '#C9C2B0')).join('') + chaoToon('#4A4640', '#3a3630', 900)
      + pT(SEGURANCA, 500, 330, .5, t, { flip: true, olhar: [1, .8], palpebra: .3, still: true }) + pT(DAVI, 150, 930, .7, t, { invisivel: tl > .35, olhar: [1, -.7], olhos: 'arregalados', segura: balde(.9), bD: { h: [30, 120], bend: 20, punho: true } }) + HOLO(true) },
  // 56 · close do Davi pontilhado: olha as próprias mãos transparentes; só o balde continua sólido
  { l: 25, w: 10, split: false, cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => reacaoToon(DAVI, t, tl, { invisivel: true, olhar: [.4, .8], olhos: 'arregalados', boca: BOCAS.o, bD: { h: [110, 30], bend: 30 }, bE: { h: [60, 40], bend: 20, punho: true }, seguraE: `<g transform="translate(0 10)">${balde(1)}</g>` }, { fundo: '#5A5650', forma: '#4A4640' }) + HOLO(true) },
  // 57 · plano médio do Davi pontilhado: ajeita o boné, pega o esfregão (balde e esfregão sólidos), firme
  { l: 26, split: false, sfx: [{ t: .3, s: G('fist_clenched_2'), v: .3 }], cam: { s: [1, 1.06], c: [288, 500] },
    f: (tl, d, t) => { const pega = tl > .8, esf = `<g class="tSol">${esfregao(.8)}</g>`; return fundoChapado('#5A5650') + chaoToon('#4A4640', '#3a3630', 860) + (pega ? '' : `<g transform="translate(400 690) rotate(12)">${esf}</g>`)
      + pT(DAVI, 270, 920, .95, t, { invisivel: true, olhar: [1, -.2], sobr: -.6, palpebra: .35, boca: { sm: .3 }, segura: balde(.9), bD: { h: [30, 120], bend: 20, punho: true },
        bE: pega ? { h: [-40, 60], bend: -10, punho: true } : { h: [40, -260], bend: -20, punho: true }, seguraE: pega ? `<g transform="rotate(-10) translate(0 -150)">${esf}</g>` : '' }) + HOLO(true); } },
  // 58 · escada de serviço, travelling subindo: Davi sobe com o balde
  { l: 27, split: false, sfx: [{ t: .1, s: G('tiny_hit_1'), v: .15 }, { t: .5, s: G('tiny_hit_3'), v: .15 }, { t: .9, s: G('tiny_hit_2'), v: .15 }], cam: { s: [1, 1.04], c: [288, 600], c1: [288, 420], pop: false },
    f: (tl, d, t) => { const k = sobe(0, d, tl); return fundoChapado('#4A4640') + [...Array(12).keys()].map(i => tForma(tPoli([[-40 + i * 60, 1000 - i * 70], [640, 1000 - i * 70], [640, 1030 - i * 70], [-40 + i * 60, 1030 - i * 70]]), '#C9C2B0')).join('')
      + pT(DAVI, lerp(130, 380, k), lerp(1000, 650, k), .62, t, { invisivel: true, walk: tl * 1.6, olhar: [.6, -.5], segura: balde(.9), bD: { h: [30, 120], bend: 20, punho: true } }) + HOLO(true); } },
  // 59 · porta do camarote: Davi passa pelo segurança, que nem vira
  { l: 28, split: false, cam: { s: [1, 1.03], c: [260, 520], c1: [320, 520], pop: false },
    f: (tl, d, t) => camaroteM(t, { pe: 1, senta: 1, janela: false }) + ret(30, 380, 160, 420, '#2a1f24') + pT(SEGURANCA, 140, 830, .74, t, { olhar: [1, .4], palpebra: .3, still: true })
      + pT(DAVI, lerp(80, 400, sobe(0, d, tl)), 840, .7, t, { invisivel: true, walk: tl * 1.6, olhar: [.5, 0], segura: balde(.9), bD: { h: [30, 120], bend: 20, punho: true } }) + HOLO(true) },
  // 60 · passa pelo prefeito de faixa, sentado na poltrona comendo coxinha
  { l: 28, w: 3, split: false, sfx: [{ t: .2, s: G('bite_apple_2'), v: .25 }], cam: { s: [1, 1.03], c: [260, 520], c1: [320, 520], pop: false },
    f: (tl, d, t) => camaroteM(t, { pe: 1, senta: 1 }) + poltrona(370, 840, .9) + pT(PREFEITO, 370, 840, .7, t, { sentado: true, olhar: [-.6, .3], palpebra: .5, boca: { o: Math.abs(Math.sin(t * 9)) * .5 }, bD: { h: [100, -60], bend: 30 }, segura: coxinha })
      + pT(DAVI, lerp(40, 330, sobe(0, d, tl)), 900, .72, t, { invisivel: true, walk: tl * 1.6, olhar: [.5, 0], segura: balde(.9), bD: { h: [30, 120], bend: 20, punho: true } }) + HOLO(true) },
  // 61 · passa pelo dono no tapete; ele olha a arena
  { l: 28, w: 6, split: false, cam: { s: [1, 1.03], c: [260, 520], c1: [320, 520], pop: false },
    f: (tl, d, t) => camaroteM(t, { pe: 1, senta: 1, vidro: [420, 700], tapete: 330 }) + pT(DONO, 330, 830, .7, t, { olhar: [1, .5], palpebra: .45, boca: { sm: .4 }, bD: { h: [-30, 110], bend: -30, punho: true } })
      + pT(DAVI, lerp(20, 210, sobe(0, d, tl)), 880, .72, t, { invisivel: true, walk: tl * 1.6, olhar: [.5, 0], segura: balde(.9), bD: { h: [30, 120], bend: 20, punho: true } }) + HOLO(true) },
  // 62 · Davi no pilar: passa a corda, segura a alavanca e empurra com o corpo todo; push-in, luz quente
  { l: 29, split: false, sfx: [{ w: 1, l: 29, s: G('metal_hit_3'), v: .4 }], cam: { s: [1, 1.1], c: [300, 560], c1: [320, 510] },
    f: (tl, d, t) => { const k = sobe(ws(29, 1) - ws(29, 0) - .1, ws(29, 1) - ws(29, 0) + .4, tl), a = (-40 + k * 80) * Math.PI / 180, bx = 410 + Math.sin(a) * 160, by = 560 - Math.cos(a) * 160, sx = 230 + 54 * .74, sy = 880 - 325 * .74;
      return camaroteM(t, { pe: 1, senta: 1, janela: false }) + ret(380, 120, 60, 680, '#5C5A60', '#48464C') + tForma(tPoli([[90, 640], [100, 640], [100, 800], [90, 800]]), '#D4A93A') + tTraco('M95 670 Q230 720 380 670', TLW * 3.4, '#8E1E2E')
        + alavanca(410, 560, 1, k, false) + pT(DAVI, 230, 880, .74, t, { invisivel: true, inclina: k * .18, olhar: [1, -.6], sobr: -.8, boca: { o: .3, sm: -.5 }, bD: { h: [(bx - sx) / .74, (by - sy) / .74], bend: 10, punho: true }, bE: { h: [(bx - sx) / .74 - 20, (by - sy) / .74 + 20], bend: 10, punho: true } })
        + `<g transform="translate(120 880)">${balde(.8)}</g>` + (k > .5 ? QUENTE : HOLO(true)); } },
  // 63 · PLANO-MESTRE: a frente de vidro destrava e abre em placas; primeiro a pilha de prêmios despenca
  { l: 30, split: false, blur: false, sfx: [{ t: .05, s: G('metal_beam_hit_1'), v: .4 }, { t: .5, s: G('plastic_rice_bag_hit_2'), v: .4 }], cam: { s: [1.3, 1.3], c: [260, 540], pop: false },
    f: (tl, d, t) => { const k = sobe(0, .4, tl), q = sobe(.25, .9, tl); return arenaCorte(t, { pe: 0, senta: 1, aberto: k, alavanca: 1 }) + `<g transform="translate(315 ${lerp(MC.piso, MC.areia, q * q)}) scale(.22)">${pilhaPremios(0, 0)}</g>`
      + [[RICACO, 258, 0], [RICA, 300, 1], [RICO2, 350, 2]].map(([P, x, i]) => pT(P, x, MC.piso + sobe(.45, 1, tl) ** 2 * 160, MC.s, t, { olhos: 'arregalados', sobr: 1, boca: BOCAS.o, olhar: [0, 1], treme: 2, nocheck: true, semCorte: true, ph: i })).join('')
      + pT(DONO, 160, MC.piso, MC.s, t, { olhar: [1, .6], nocheck: true, semCorte: true }) + pT(DAVI, 212, MC.piso, MC.s, t, { invisivel: true, bE: { h: [145, -160], bend: -10, punho: true }, nocheck: true, semCorte: true }) + `<g transform="translate(385 ${MC.piso + sobe(.45, 1, tl) ** 2 * 160}) scale(.2)">${botaoPed(0, 0)}</g>` + QUENTE; } },
  // 64 · corte: os ricos caindo atrás dos sacos, de terno, gravata voando; o botão cai junto
  { l: 31, split: false, blur: false, sfx: [{ t: 0, s: G('slide_whistle_down_1'), v: .4 }], cam: { s: [1.3, 1.3], c: [280, 620], c1: [280, 700], pop: false },
    f: (tl, d, t) => { const q = sobe(0, d, tl); return arenaCorte(t, { senta: 1, aberto: 1, alavanca: 1 }) + `<g transform="translate(315 ${MC.areia}) scale(.22)">${pilhaPremios(0, 0)}</g>`
      + [[RICACO, 258, 0], [RICA, 305, 1], [RICO2, 350, 2], [RICO3, 280, 3]].map(([P, x, i]) => `<g transform="rotate(${Math.sin(t * 6 + i) * 25} ${x} ${lerp(MC.piso + 40, MC.areia - 160, q) - 60})">${pT(P, x, lerp(MC.piso + 40 - i * 30, MC.areia - 170 + i * 10, q), MC.s * 1.1, t, { olhos: 'arregalados', boca: BOCAS.grito, bD: { h: [60, -240], bend: 20 }, bE: { h: [-60, -240], bend: -20 }, nocheck: true, semCorte: true, ph: i })}</g>`).join('')
      + `<g transform="translate(400 ${lerp(MC.piso + 60, MC.areia - 120, q)}) rotate(${q * 200}) scale(.2)">${botaoPed(0, 0)}</g>` + pT(DONO, 160, MC.piso, MC.s, t, { olhar: [1, .8], olhos: 'arregalados', nocheck: true, semCorte: true }) + pT(DAVI, 212, MC.piso, MC.s, t, { invisivel: true, olhar: [1, .8], bE: { h: [145, -160], bend: -10, punho: true }, nocheck: true, semCorte: true }) + QUENTE; } },
  // 65 · na areia: eles aterrissam sentados em cima da pilha de sacos
  { l: 31, w: 6, split: false, sfx: [{ t: .05, s: G('plastic_rice_bag_hit_1'), v: .4 }, { t: .25, s: G('plastic_rice_bag_hit_3'), v: .4 }, { t: .45, s: G('plastic_rice_bag_hit_4'), v: .4 }], cam: { s: [1, 1.03], c: [288, 512], shake: 4 },
    f: (tl, d, t) => arenaM(t, { senta: 1, chao: 800 }) + pilhaPremios(288, 780, 1.6) + [[RICACO, 190, 0], [RICA, 290, .2], [RICO2, 390, .4]].map(([P, x, a], i) => { const q = sobe(a, a + .25, tl), yf = 500 + (i === 1 ? -30 : 0);
      return pT(P, x, lerp(350, yf, q), .5, t, { chao: q >= 1, olhos: 'arregalados', boca: q >= 1 ? BOCAS.o : BOCAS.grito, bD: q < 1 ? { h: [60, -240], bend: 20 } : null, nocheck: true }) + (q >= 1 && tl < a + .5 ? `<circle cx="${x}" cy="${yf}" r="${60 * (tl - a)}" fill="#F4F1EA" opacity="${.6 - (tl - a)}"/>` : ''); }).join('') + QUENTE },
  // 66 · reação: um rico sentado num saco, a taça intacta na mão, piscando
  { l: 31, w: 12, split: false, sfx: [{ t: .3, s: G('voice_hmm_1'), v: .25 }], cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => reacaoToon(RICACO, t, tl, { y: 1120, olhos: Math.floor(tl * 3) % 2 ? 'fechados' : 'arregalados', boca: { sm: -.2, w: .5 }, bD: { h: [80, -60], bend: 30, punho: true }, segura: taca(1.1) }, { fundo: ARE.areia, forma: ARE.areiaS }) + QUENTE },
  // 67 · o botão caído na areia solta faísca e apaga
  { l: 32, split: false, sfx: [{ t: .1, s: G('balloon_deflate_2'), v: .3 }], cam: { s: [1, 1.04], c: [288, 512] },
    f: (tl, d, t) => arenaM(t, { senta: 1, chao: 700 }) + `<g transform="translate(340 690) rotate(-70)">${botaoPed(0, 0, .9, tl < .6 && Math.floor(t * 10) % 2, t)}</g>`
      + (tl < .7 ? [0, 1, 2, 3, 4, 5].map(i => `<path d="M171 628 l${Math.cos(i * 1.1 + t * 30) * 46} ${Math.sin(i * 1.1 + t * 30) * 46}" stroke="#FFE14D" stroke-width="5" stroke-linecap="round"/>`).join('') : `<path d="M171 610 q12 -40 -6 -80 q-18 -40 6 -80" stroke="#9A958F" stroke-width="10" fill="none" opacity=".6"/>`) + QUENTE },
  // 68 · plongée da arena: os paredões param a um palmo de Lia e Caio
  { l: 32, w: 4, split: false, sfx: [{ t: .2, s: G('metal_beam_hit_4'), v: .3 }], cam: { s: [1, 1.05], c: [288, 520], shake: 2 },
    f: (tl, d, t) => fundoChapado(ARE.areia) + ret(-40, -40, 660, 300, '#4A2A36') + paredoes(lerp(.72, .78, sobe(0, .4, tl)), 760, { topo: 1, g0: 200, g1: 70 })
      + pT(LIA, 210, 780, .5, t, { chao: true, olhar: [1, -.3], olhos: 'arregalados', bD: { h: [90, 60], bend: 10 } }) + pT(CAIO, 370, 780, .51, t, { flip: true, chao: true, olhar: [1, -.3], olhos: 'arregalados', bD: { h: [90, 60], bend: 10 } }) + QUENTE },
  // 69 · escada de serviço: o povo da arquibancada subindo para o camarote
  { l: 33, split: false, sfx: [{ t: .05, s: G('chatter_4'), v: .3 }], cam: { s: [1, 1.04], c: [288, 600], c1: [288, 480], pop: false },
    f: (tl, d, t) => fundoChapado('#4A4640') + [...Array(12).keys()].map(i => tForma(tPoli([[-40 + i * 60, 1000 - i * 70], [640, 1000 - i * 70], [640, 1030 - i * 70], [-40 + i * 60, 1030 - i * 70]]), '#C9C2B0')).join('')
      + [[SENHORA_T, 0], [SENHOR, 1], [PAI_T, 2], [CAIO, 3]].map(([P, i]) => { const k = clamp(sobe(0, d, tl) * .5 + .62 - i * .2); return pT(P, lerp(120, 460, k), lerp(900, 560, k), .55, t, { walk: tl * 1.6 + i * .3, olhar: [.6, -.5], boca: BOCAS.sorriso, nocheck: true }); }).join('') + QUENTE },
  // 70 · camarote: o povo nas poltronas de veludo; uma senhora com o ar-condicionado no rosto
  { l: 33, w: 5, split: false, sfx: [{ t: .1, s: G('balloon_deflate_4'), v: .25 }], cam: { s: [1, 1.04], c: [288, 540] },
    f: (tl, d, t) => camaroteM(t, { chao: 840, janela: false }) + ret(330, 120, 220, 90, '#E8E2D6', '#C9C2B0') + [0, 1, 2, 3].map(i => tTraco(`M${350 + i * 50} 210 Q${330 + i * 50 + Math.sin(t * 18 + i) * 14} 260 ${340 + i * 50} 300`, TLW, '#7FB8E8')).join('')
      + poltrona(120, 840, .9) + poltrona(420, 840, .9, true) + pT(PAI_T, 120, 840, .7, t, { sentado: true, olhar: [.5, -.3], boca: BOCAS.riso, bD: { h: [80, -120], bend: 30, punho: true }, segura: taca(.9) }) + pT(SENHORA_T, 420, 840, .7, t, { sentado: true, flip: true, olhos: 'fechados', boca: BOCAS.sorriso, cabInc: -.15 }) + QUENTE },
  // 71 · corte lateral: o povo na beira do piso firme olhando para baixo, onde os ricos estão no fosso; o dono no tapete
  { l: 33, w: 9, split: false, sfx: [{ t: .1, s: G('voice_ha_ha_1'), v: .3 }], cam: { s: [1.25, 1.25], c: [250, 680], pop: false },
    f: (tl, d, t) => arenaCorte(t, { senta: 1, aberto: 1, alavanca: 1 }) + `<g transform="translate(315 ${MC.areia}) scale(.3)">${pilhaPremios(0, 0)}</g>`
      + [[RICACO, 260], [RICA, 320], [RICO2, 375]].map(([P, x], i) => pT(P, x, MC.areia - 52, .28, t, { chao: true, olhar: [-.4, -.8], boca: BOCAS.o, nocheck: true, semCorte: true, ph: i })).join('')
      + [[SENHORA_T, 30], [SENHOR, 75], [PAI_T, 120]].map(([P, x], i) => pT(P, x, MC.piso, MC.s, t, { olhar: [.8, 1], boca: BOCAS.riso, nocheck: true, semCorte: true, ph: i })).join('') + pT(DONO, 180, MC.piso, MC.s, t, { olhar: [1, 1], nocheck: true, semCorte: true }) + QUENTE },
  // 72 · reação: a senhora ri, com a taça de um rico na mão
  { l: 33, w: 12, split: false, cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => reacaoToon(SENHORA_T, t, tl, { y: 1120, boca: BOCAS.riso, palpebra: .5, olhar: [.6, .6], bD: { h: [80, -60], bend: 30, punho: true }, segura: taca(1.1) }, { fundo: CAMA.parede, forma: CAMA.ouro }) + QUENTE },
  // 73 · telão, push-in com tremor: "AUDIÊNCIA: RECORDE"
  { l: 34, split: false, blur: false, semFala: true, sfx: [{ t: .1, s: G('party_honk_2'), v: .3 }], cam: { s: [1, 1.08], c: [288, 420], c1: [288, 420] },
    f: (tl, d, t) => telao(['AUDIÊNCIA:', 'RECORDE'], { tam: 72, y: 330, seta: 1 }) },
  // 74 · camarote, plano aberto: o piso firme cheio de gente pobre; na beira do buraco, um só de terno: o dono, no tapete
  { l: 35, split: false, semFala: true, cam: { s: [1, 1.04], c: [288, 540] },
    f: (tl, d, t) => camaroteM(t, { chao: 820, janela: false, buraco: [400, 700], tapete: 340 }) + [[SENHOR, 90], [PAI_T, 175], [SENHORA_T, 255]].map(([P, x], i) => pT(P, x, 860, .52, t, { olhar: [1, 0], sobr: .4, ph: i })).join('')
      + pT(DONO, 340, 840, .62, t, { flip: true, olhar: [1, 0], palpebra: .4, boca: { sm: .2 } }) + QUENTE },
  // 75 · close do dono: ajeita a gravata dourada
  { l: 35, w: 4, split: false, cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => reacaoToon(DONO, t, tl, { y: 1080, palpebra: .5, olhar: [-.4, 0], boca: { sm: .4, skew: .4 }, bD: { h: [-10, 60 + Math.sin(tl * 8) * 6], bend: 30, punho: true } }, { fundo: CAMA.parede, forma: CAMA.ouro }) + QUENTE },
  // 76 · porta do camarote: Lia chega pela escada, com o povo
  { l: 36, split: false, cam: { s: [1, 1.04], c: [288, 520] },
    f: (tl, d, t) => camaroteM(t, { janela: false }) + ret(60, 380, 200, 420, '#2a1f24') + multidao(60, 260, 790, 2, t, { passo: 50 })
      + pT(LIA, lerp(160, 300, sobe(0, d * .7, tl)), 860, .72, t, { walk: tl * 1.6, olhar: [1, 0], boca: BOCAS.sorriso }) + QUENTE },
  // 77 · plano a dois: o dono agarra o braço da Lia; ela, assustada
  { l: 36, w: 4, split: false, sfx: [{ t: .1, s: G('punch_clothes_1'), v: .35 }], cam: { s: [1, 1.06], c: [288, 500], shake: 2 },
    f: (tl, d, t) => camaroteM(t, { janela: false }) + pT(LIA, 210, 900, .8, t, { olhos: 'arregalados', sobr: 1, boca: BOCAS.grito, olhar: [1, 0], inclina: -.15, bD: { h: [30, 50], bend: 10 } })
      + pT(DONO, 430, 900, .82, t, { flip: true, olhar: [1, 0], palpebra: .45, boca: { sm: .6 }, bD: { h: [lerp(40, 132, sobe(0, .2, tl)), lerp(80, 56, sobe(0, .2, tl))], bend: 10, punho: true } }) + QUENTE },
  // 78 · plano a dois, push-in no dono: ele sorri devagar para o Davi pontilhado; o contorno do Davi treme
  { l: 37, split: false, sfx: [{ t: .4, s: G('glockenspiel_magic_1'), v: .25 }], cam: { s: [1, 1.1], c: [288, 520], c1: [300, 480] },
    f: (tl, d, t) => camaroteM(t, { janela: false }) + pT(DAVI, 175, 900, .74, t, { invisivel: true, treme: 5, olhos: 'arregalados', sobr: 1, olhar: [1, 0], segura: balde(.9), bD: { h: [30, 120], bend: 20, punho: true } })
      + pT(DONO_OURO, 430, 900, .8, t, { flip: true, olhar: [1, 0], palpebra: .5, boca: { sm: lerp(.2, 1, sobe(0, .8, tl)), o: lerp(.1, .4, sobe(0, .8, tl)) } }) + QUENTE },
  // 79 · telão, push-in lento: "FINAL ESPECIAL: O FAXINEIRO ACORRENTADO CONTRA O DONO"
  { l: 38, split: false, blur: false, semFala: true, sfx: [{ t: .1, s: G('ding_3'), v: .3 }], cam: { s: [1, 1.06], c: [288, 400], c1: [288, 400] },
    f: (tl, d, t) => telao(['FINAL ESPECIAL:', 'O FAXINEIRO', 'ACORRENTADO', 'CONTRA O DONO'], { tam: 56, y: 280 }) },
  // 80 · plano a dois: o segurança fecha a algema no pulso do Davi; o Davi volta a ser sólido; segura 2 s
  { l: 38, w: 5, split: false, semFala: true, sfx: [{ t: .4, s: G('metal_rattler_4'), v: .4 }], cam: { s: [1, 1.08], c: [288, 500] },
    f: (tl, d, t) => { const fecha = tl > .4; return camaroteM(t, { janela: false }) + pT(DAVI, 200, 900, .8, t, { invisivel: !fecha, olhar: [.4, .6], palpebra: fecha ? .3 : .1, sobr: fecha ? -.4 : .8, boca: { sm: -.4 }, bD: { h: [120, -20], bend: 10, punho: true } })
      + pT(SEGURANCA, 470, 900, .8, t, { flip: true, olhar: [1, .5], palpebra: .3, bD: { h: [150, -10], bend: 10, punho: true } })
      + `<g transform="translate(90 900)">${balde(.9)}</g>` + (fecha ? `<g transform="translate(339 624)">${algema(.9)}</g>` + correntePulso(352, 640, 410, 700) : ''); } },
];
