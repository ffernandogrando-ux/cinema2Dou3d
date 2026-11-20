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
const MAE = { pele: '#8D5A3B', peleS: '#704530', sobrancelha: '#8a8580', tronco: { tipo: 'moletom', cor: '#8E6FA8', corS: '#73578C', manga: '#7A5C94',
    detalhe: (omb, hip, st = {}) => tTraco(`M-22 ${omb - 2} Q-4 ${omb + 40} 14 ${omb + 62} M30 ${omb - 4} Q24 ${omb + 30} 14 ${omb + 62}`, TLW * .9, '#C9A64A') + (st.segura ? '' : `<g transform="translate(14 ${omb + 92})">${CHAVE(.32)}</g>`) }, calca: { cor: '#4A4F66', corS: '#3a3e52' }, sapato: '#C9B9A0', sapatoS: '#A8987F', cabeca: cocoque, ph: .4 };
const quepe = () => tForma(tSpl([[-90, -60], [-80, -120], [0, -146], [80, -126], [98, -70]]), '#24304F') + tForma(tSpl([[20, -66], [130, -60], [134, -44], [24, -50]]), '#1A2440') + tForma(tElip(10, -106, 14, 12), '#E8C34A');
const JAIRO = { pele: '#C98E66', peleS: '#AA744F', barriga: .95, sobrancelha: '#2a1a12', bigode: '#2a1a12', tronco: { tipo: 'camiseta', cor: '#2F3B5C', corS: '#232D47', detalhe: (omb) => tForma(tPoli([[20, omb + 40], [50, omb + 40], [50, omb + 64], [20, omb + 64]]), '#E8C34A') }, calca: { cor: '#232D47', corS: '#1A2238' }, sapato: '#141414', sapatoS: '#000', cabeca: quepe, ph: 2.9 };

// etiqueta de cidade no peito (depois do plano 10 todos usam)
const comEtiqueta = (P, nome) => ({ ...P, tronco: { ...P.tronco, detalhe: (omb, hip, st = {}) => `<g transform="translate(-6 ${omb + 82}) scale(${st.flip ? -.36 : .36} .36)">${etiquetaNome(nome)}</g>` } });
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
    + (on ? `<circle cx="0" cy="-30" r="${40 + 8 * Math.sin(t * 16)}" fill="#FF3B30" opacity=".28"/>` + [0, 1, 2, 3].map(i => { const b = a + i * Math.PI / 2; return `<path d="M${Math.cos(b) * 30} ${-30 + Math.sin(b) * 22} L${Math.cos(b) * 62} ${-30 + Math.sin(b) * 44}" stroke="#FF6B5E" stroke-width="5" stroke-linecap="round" opacity=".8"/>`; }).join('') : '') + tTraco('M0 60 V140', TLW * 1.2) + `</g>`; }
// casinha amarela da família (memória)
function casaFamilia(o = {}) { let r = fundoChapado('#9FC6E0') + `<rect x="-400" y="760" width="1400" height="800" fill="#7FA35A"/>` + tTraco('M-400 760 H1000');
  r += tForma(tPoli([[110, 420], [470, 420], [470, 760], [110, 760]]), '#F2C94C', tPinta(tPoli([[110, 420], [180, 420], [180, 760], [110, 760]]), '#D9AE36'));
  r += tForma(tPoli([[80, 430], [290, 270], [500, 430]]), '#B5533C') + tForma(tPoli([[250, 600], [330, 600], [330, 760], [250, 760]]), '#7A4A2A') + tForma(tPoli([[140, 520], [220, 520], [220, 590], [140, 590]]), '#BFE3F5');
  r += [150, 175, 200].map((x, i) => tForma(tElip(x, 600, 12, 10), ['#E86A5A', '#F7E3B0', '#E9A0C8'][i])).join('');
  if (o.carimbo) { const k = o.carimbo; r += `<g transform="translate(290 640) rotate(-12) scale(${1.6 - .6 * k})" opacity="${k}">` + tForma(tPoli([[-150, -50], [150, -50], [150, 50], [-150, 50]]), 'none') + `<rect x="-150" y="-50" width="300" height="100" fill="none" stroke="#C0392B" stroke-width="12"/><text x="0" y="28" font-family="'Baloo 2'" font-weight="800" font-size="78" text-anchor="middle" fill="#C0392B">TOMADO</text></g>`; }
  return r; }
const memoria = (svg) => `<g style="filter:saturate(.55) sepia(.18)">${svg}</g>`;
// etiqueta de nome no peito (close)
const etiquetaNome = (txt) => `<g transform="rotate(-4)">` + tForma(tPoli([[-120, -40], [120, -40], [120, 40], [-120, 40]]), '#FBF8EF') + `<text x="0" y="18" font-family="'Baloo 2'" font-weight="800" font-size="52" text-anchor="middle" fill="${TINK}">${txt}</text></g>`;
const cadeadoT = (aberto) => `<g>${tForma(`M-22 -10 V-40 Q-22 -66 0 -66 Q22 -66 22 -40 V${aberto ? -56 : -10}`, 'none')}${tTraco(`M-22 -10 V-40 Q-22 -66 0 -66 Q22 -66 22 -40 V${aberto ? -56 : -10}`, TLW * 2.4, '#9AA3AD')}${tForma(tPoli([[-34, -12], [34, -12], [34, 40], [-34, 40]]), '#E8B84A', tPinta(tPoli([[10, -12], [34, -12], [34, 40], [10, 40]]), '#C8962E'))}</g>`;
const alicate = `<g transform="rotate(-30)">${tForma(tPoli([[-6, -70], [6, -70], [10, 0], [-10, 0]]), '#9AA3AD')}${tForma(tMacarrao([-8, 0], [-26, 70], -6, 14, 12), '#D8312B')}${tForma(tMacarrao([8, 0], [26, 70], 6, 14, 12), '#D8312B')}</g>`;
const grampo = `<g transform="rotate(-20)">${tTraco('M0 0 V-46 Q0 -54 6 -50', TLW * 1.2, '#9AA3AD')}</g>`;

// ---------------------------------------------------------------- PEÇAS DO BLOCO B
const QUARTO = { parede: '#7E8FA3', paredeS: '#6A7A8E', chao: '#5A5148', chaoS: '#4A423A' };
// quarto de aluguel: parede azul-acinzentada, janela pequena com a noite, cama de solteiro (o assento fica em y 675 = quadril sentado de s .74)
function quartoMae() { return paredeToon(QUARTO.parede, QUARTO.paredeS, 800, { passo: 180 }) + chaoToon(QUARTO.chao, QUARTO.chaoS, 800, { tabuas: 1 })
  + tForma(tPoli([[380, 300], [520, 300], [520, 440], [380, 440]]), '#24305A') + `<circle cx="480" cy="340" r="16" fill="#F4EAD0"/>` + tTraco('M450 300 V440 M380 370 H520', TLW)
  + tForma(tPoli([[40, 600], [80, 600], [80, 800], [40, 800]]), '#8A6A4A') + sombraContato(200, 800, 330); }
// a frente da cama (colchão + pé), desenhada por cima das pernas da mãe sentada, para o corpo "encostar" no assento
const camaAtras = (y = 707) => tForma(tPoli([[20, y - 20], [400, y - 20], [400, y + 34], [20, y + 34]]), '#D9D2C4', tPinta(tPoli([[20, y - 20], [400, y - 20], [400, y - 6], [20, y - 6]]), '#EEE8DC')) + tForma(tPoli([[30, y + 34], [390, y + 34], [390, 800], [30, 800]]), '#8A6A4A') + tForma(tPoli([[20, y - 120], [60, y - 120], [60, y - 20], [20, y - 20]]), '#8A6A4A');
const giz = `<g transform="translate(14 -10) rotate(-30)">${tForma(tPoli([[-6, -24], [6, -24], [6, 10], [-6, 10]]), '#F4F1EA')}</g>`;
// planta do banco desenhada no quadro (k = progresso do desenho)
function plantaBanco(k) { const L = [['M350 520 H540 V350 H350Z', .2], ['M350 430 H430 V350', .45], ['M480 520 V460 A30 30 0 1 1 480.1 460', .7], ['M370 500 L410 470 L450 500', .9]];
  return L.filter(([, a]) => k > a - .2).map(([d]) => tTraco(d, TLW, '#F4F1EA')).join('') + (k > .85 ? `<text x="480" y="470" font-family="'Baloo 2'" font-weight="800" font-size="30" text-anchor="middle" fill="#F4F1EA">COFRE</text>` : ''); }
// horário escrito a giz no quadro
const horario = (h, v, k) => `<g opacity="${k > 0 ? 1 : 0}"><text x="288" y="440" font-family="'Baloo 2'" font-weight="800" font-size="130" text-anchor="middle" fill="#F4F1EA">${h}</text>`
  + `<text x="288" y="560" font-family="Caveat" font-weight="700" font-size="96" text-anchor="middle" fill="#F4F1EA">${v}</text>` + tTraco(`M140 590 H${140 + 300 * Math.min(1, k * 1.5)}`, TLW * 1.4, '#F4F1EA') + `</g>`;

// ---------------------------------------------------------------- PEÇAS DO BLOCO C (banco: saguão e cofre)
const SAG = { parede: '#E8DCC0', paredeS: '#D2C4A4', chao: '#CDBF9E', chaoS: '#B8A984', ouro: '#D4A93A' };
const COF = { parede: '#7C8FA3', paredeS: '#687A8E', chao: '#55606E', chaoS: '#464F5B', metal: '#A9B4BF', metalS: '#8693A0' };
// retrato do dono (o Mestre sem máscara, de terno vinho e óculos) num quadro dourado — PISTA plantada no saguão
function retratoDono(x, y, s = 1, t = 0) { const id = 'rt' + (_tN++);
  return `<g transform="translate(${x} ${y}) scale(${s})">` + tForma(tPoli([[-80, -110], [80, -110], [80, 110], [-80, 110]]), SAG.ouro, '')
    + `<defs><clipPath id="${id}"><rect x="-66" y="-96" width="132" height="192"/></clipPath></defs><rect x="-66" y="-96" width="132" height="192" fill="#5A2A34"/>`
    + `<g clip-path="url(#${id})">${toon({ ...MESTRE, tronco: { tipo: 'camiseta', cor: '#6E1E2E', corS: '#561624', detalhe: (omb) => tForma(`M-8 ${omb} L8 ${omb} L4 ${omb + 70} L-4 ${omb + 70}Z`, '#E8C34A') }, mao: MESTRE.pele }, { x: -20, y: 300, s: .5, t: 0, still: true, semPiscar: true, nocheck: true, semCorte: true, boca: { sm: .5 } })}</g>`
    + tTraco('M-66 -96 H66 V96 H-66Z', TLW) + `</g>`; }
function saguao(o = {}) { const y = o.chao ?? 800;
  let r = paredeToon(SAG.parede, SAG.paredeS, y, { passo: 200 }) + chaoToon(SAG.chao, SAG.chaoS, y) + `<rect x="-400" y="${y - 260}" width="1400" height="14" fill="${SAG.ouro}"/>`;
  for (let i = -2; i < 8; i++) r += tTraco(`M${i * 110} ${y} L${i * 110 - 160} ${y + 400}`, TLW * .6, SAG.chaoS);
  if (o.retrato !== false) r += retratoDono(o.rx ?? 300, o.ry ?? 420, o.rs ?? 1, o.t || 0);
  if (o.alarme) r += alarmeCaixa(o.ax ?? 500, o.ay ?? 430, o.alarmeOn ?? false, o.t || 0);
  if (o.relogio) r += relogioParede(o.rlx ?? 120, o.rly ?? 330, 9, 8, .7);
  return r; }
const relogioParede = (x, y, h, m, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${tForma(tElip(0, 0, 80, 80), '#FBF8EF', tPinta(tElip(-10, 6, 70, 70), '#EDE6D6'))}`
  + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => { const a = i * Math.PI / 6; return `<path d="M${Math.sin(a) * 62} ${-Math.cos(a) * 62} L${Math.sin(a) * 70} ${-Math.cos(a) * 70}" stroke="${TINK}" stroke-width="5"/>`; }).join('')
  + `<path d="M0 0 L${Math.sin((h + m / 60) * Math.PI / 6) * 36} ${-Math.cos((h + m / 60) * Math.PI / 6) * 36}" stroke="${TINK}" stroke-width="9" stroke-linecap="round"/>`
  + `<path d="M0 0 L${Math.sin(m * Math.PI / 30) * 56} ${-Math.cos(m * Math.PI / 30) * 56}" stroke="#C0392B" stroke-width="6" stroke-linecap="round"/><circle r="7" fill="${TINK}"/></g>`;
const copoCafe = `<g transform="translate(6 -26)">${tForma(tPoli([[-16, -26], [16, -26], [12, 26], [-12, 26]]), '#FBF8EF')}${tForma(tPoli([[-17, -8], [17, -8], [15, 8], [-15, 8]]), '#8A5A3A')}</g>`;
// porta redonda do cofre (aberta 0..1 = gira e afasta para o lado) + teclado ao lado
function cofrePorta(x, y, r, aberta = 0, giro = 0) { const ox = aberta * r * 1.7;
  let s = `<circle cx="${x}" cy="${y}" r="${r * 1.06}" fill="#1a1d24"/>`;
  if (aberta > 0) s += `<circle cx="${x}" cy="${y}" r="${r * 1.02}" fill="#E9EEF2" opacity="${aberta}"/>`;
  s += `<g transform="translate(${x + ox} ${y}) scale(${1 - aberta * .35} 1)">` + tForma(tElip(0, 0, r, r), COF.metal, tPinta(tElip(-r * .2, r * .1, r * .9, r * .95), COF.metalS));
  s += tForma(tElip(0, 0, r * .62, r * .62), COF.metalS) + `<g transform="rotate(${giro})">` + [0, 1, 2, 3, 4, 5].map(i => tTraco(`M0 0 L${Math.cos(i * Math.PI / 3) * r * .5} ${Math.sin(i * Math.PI / 3) * r * .5}`, TLW * 2.2, '#5A6370')).join('') + tForma(tElip(0, 0, r * .14, r * .14), '#5A6370') + `</g></g>`;
  return s; }
// teclado: dígitos acesos em verde (lista)
function teclado(x, y, s, acesos = []) { let r = `<g transform="translate(${x} ${y}) scale(${s})">` + tForma(tPoli([[-60, -90], [60, -90], [60, 90], [-60, 90]]), '#2A2F38') + tForma(tPoli([[-48, -78], [48, -78], [48, -50], [-48, -50]]), '#0F2A1A');
  r += `<text x="40" y="-56" font-family="VT323" font-size="26" text-anchor="end" fill="#7CFFB2">${acesos.join('')}</text>`;
  [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, ''].forEach((n, i) => { if (n === '') return; const cx = -32 + (i % 3) * 32, cy = -24 + Math.floor(i / 3) * 30, on = acesos[acesos.length - 1] === n;
    r += tForma(tPoli([[cx - 12, cy - 11], [cx + 12, cy - 11], [cx + 12, cy + 11], [cx - 12, cy + 11]]), on ? '#7CFFB2' : '#5A6370') + `<text x="${cx}" y="${cy + 7}" font-family="Poppins" font-weight="800" font-size="16" text-anchor="middle" fill="${on ? '#0F2A1A' : '#E9EEF2'}">${n}</text>`; });
  return r + `</g>`; }
function salaCofre(o = {}) { const y = o.chao ?? 800;
  let r = paredeToon(COF.parede, COF.paredeS, y, { passo: 170 }) + chaoToon(COF.chao, COF.chaoS, y, { tabuas: 1 });
  r += cofrePorta(o.cx ?? 300, o.cy ?? 470, o.cr ?? 190, o.aberta || 0, o.giro || 0) + teclado(o.tx ?? 530, o.ty ?? 470, o.ts ?? .8, o.acesos || []);
  if (o.escada !== false) r += tForma(tPoli([[-20, 300], [70, 300], [70, 800], [-20, 800]]), '#4A3A30', tPinta(tPoli([[40, 300], [70, 300], [70, 800], [40, 800]]), '#3A2C24')) + `<text x="26" y="290" font-family="Poppins" font-weight="800" font-size="20" text-anchor="middle" fill="${TINK}">ESCADA</text>`;
  return r; }
const caixaFerramentas = (aberta) => `<g>${tForma(tPoli([[-60, -40], [60, -40], [60, 30], [-60, 30]]), '#C0392B', tPinta(tPoli([[20, -40], [60, -40], [60, 30], [20, 30]]), '#9E2E22'))}`
  + (aberta ? [-40, -20, 0, 20, 40].map((x, i) => tForma(tPoli([[x - 5, -40 - 30 - i * 6], [x + 5, -40 - 30 - i * 6], [x + 5, -40], [x - 5, -40]]), ['#9AA3AD', '#E8B84A', '#9AA3AD', '#5A6370', '#E8B84A'][i])).join('') : tTraco('M-24 -40 Q0 -70 24 -40', TLW * 1.5)) + `</g>`;

// ================================================================ PLANOS
const pT = (P, x, y, s, t, o = {}) => pt(P, x, y, s, t, o);
const CENAS = [
  // ---------------------------------------------------------------- BLOCO A (1–15): cena-ícone e a quadrilha
  // 1 · rua do banco em 3D: os 4 de macacão e máscara baixada, de 3/4, na frente do banco; câmera já perto, desce os últimos metros
  { l: 0, mb: false, blur: false, sfx: [{ t: .02, s: 'galeria/slide_whistle_down_2', v: .4 }],
    g3d: (tl, d) => ({ set: 'bairroToon', opts: { banco: 1, ceu: '#9FC6E0', grama: '#6E8F55', luz: null, garagem: false }, ...MUNDO.trilha([[[1.5, 3.2, 14.5], [0, 2.4, 3.4]], [[.5, 1.3, 11.6], [0, 1.75, 3.6]]], tl / d), fov: 58 }),
    f: (tl, d, t) => { const q = MUNDO.proj(BANCO_LETREIRO); return (q.atras ? '' : `<text x="${q.x}" y="${q.y + q.ppm * .18}" font-family="'Baloo 2'" font-weight="800" font-size="${q.ppm * .62}" text-anchor="middle" fill="#E8C34A">BANCO $</text>`)
      + [[MESTRE, -1.2, 4.5], [MANAUS, -.4, 4.6], [RECIFE, .4, 4.6], [BELEM, 1.2, 4.5]].map(([P, x, z]) => p3T(P, [x, 0, z], t, { mascara: 'baixada', olhar: [.3, 0], agito: .6 })).join(''); } },
  // 2 · close 3/4 do Belém; no "plano" ele levanta a máscara para a testa
  { l: 0, w: 6, split: false, blur: false, sfx: [{ w: 11, l: 0, o: -.05, s: 'galeria/rubber_snapping_1', v: .5 }], cam: { s: [1, 1.08], c: [288, 470] },
    f: (tl, d, t) => { const levanta = t >= ws(0, 11) - .05; return fundoChapado('#9FC6E0') + tForma(tPoli([[420, -100], [520, -100], [520, 1200], [420, 1200]]), '#F4EEDD', tPinta(tPoli([[490, -100], [520, -100], [520, 1200], [490, 1200]]), '#E0D8C2')) + pT(BELEM, 250, 1180, 1.5, t, { mascara: levanta ? 'testa' : 'baixada', olhar: [.4, 0], palpebra: .35, boca: { sm: .2 }, agito: .6, semCorte: true }); } },
  // 3 · fachada do banco em contra-plongée, câmera sobe
  { l: 1, cam: { s: [1.12, 1.16], c: [288, 760], c1: [288, 420] },
    f: (tl, d, t) => fundoChapado('#9FC6E0') + tForma(tPoli([[-40, 240], [616, 240], [616, 1100], [-40, 1100]]), '#E8DCC0', tPinta(tPoli([[-40, 240], [60, 240], [60, 1100], [-40, 1100]]), '#D2C4A4'))
      + tForma(tPoli([[-60, 250], [288, 90], [636, 250]]), '#E8DCC0', tPinta(tPoli([[-60, 250], [288, 90], [288, 250]]), '#D2C4A4'))
      + [40, 170, 406, 536].map(x => tForma(tPoli([[x - 30, 330], [x + 30, 330], [x + 26, 1100], [x - 26, 1100]]), '#F4EEDD', tPinta(tPoli([[x + 6, 330], [x + 30, 330], [x + 26, 1100], [x + 6, 1100]]), '#E0D8C2'))).join('')
      + tForma(tPoli([[150, 262], [426, 262], [426, 320], [150, 320]]), '#2a2238') + `<text x="288" y="306" font-family="'Baloo 2'" font-weight="800" font-size="46" text-anchor="middle" fill="#E8C34A">BANCO $</text>`
      + tForma(tPoli([[230, 600], [346, 600], [346, 1100], [230, 1100]]), '#3a2a20') },
  // 4 · flash de memória: a casinha amarela da família (sem carimbo ainda)
  { l: 1, w: 4, split: false, blur: false, cam: { s: [1, 1.03], c: [288, 520] }, f: (tl, d, t) => memoria(casaFamilia({ carimbo: 1 })) },
  // 5 · esconderijo: o Mestre de 3/4 (máscara + óculos), ajeita os óculos
  { l: 2, sfx: [{ t: .05, s: 'rangido', v: .3 }], cam: { s: [1, 1.04], c: [288, 520], c1: [300, 516] },
    f: (tl, d, t) => esconderijo({ t }) + pT(MESTRE, 300, 800, .8, t, { mascara: 'baixada', olhar: [.2, 0], bD: tl > .4 && tl < 1.1 ? { h: [36, -150], bend: 30 } : null }) },
  // 6 · plano aberto: Manaus e Recife lado a lado, máscaras na testa; travelling lateral
  { l: 3, cam: { s: [1, 1.03], c: [250, 520], c1: [320, 520] },
    f: (tl, d, t) => esconderijo({ t }) + pT(MANAUS, 200, 800, .72, t, { mascara: 'testa', olhar: [.3, 0] }) + pT(RECIFE, 400, 800, .72, t, { mascara: 'testa', olhar: [-.2, 0] }) },
  // 7 · Belém entra no quadro e se junta aos dois
  { l: 3, w: 4, cam: { s: [1.05, 1.08], c: [288, 520] },
    f: (tl, d, t) => esconderijo({ t }) + pT(MANAUS, 110, 800, .58, t, { mascara: 'testa', olhar: [.6, 0] }) + pT(RECIFE, 265, 800, .58, t, { mascara: 'testa', olhar: [.8, 0] })
      + pT(BELEM, lerp(660, 440, ease(sobe(0, .6, tl))), 800, .58, t, { flip: true, mascara: 'testa', walk: tl < .6 ? tl * 2 : null, olhar: [.5, 0], semCorte: tl < .45 }) },
  // 8–10 · closes das etiquetas no peito (com queixo/máscara na testa visíveis)
  ...[[MANAUS, 'MANAUS', 3, 8], [RECIFE, 'RECIFE', 3, 11], [BELEM, 'BELÉM', 3, 13]].map(([P, nome, l, w]) => ({ l, w, split: false, blur: false, sfx: [{ t: .05, s: 'galeria/ding_1', v: .35 }], cam: { s: [1, 1.05], c: [288, 520] },
    f: (tl, d, t) => fundoChapado(ESC.parede) + pT(P, 230, 1330, 2.2, t, { mascara: 'testa', semCorte: true, nocheck: true, agito: .4 })
      + `<g transform="translate(290 ${lerp(760, 640, ease(sobe(0, .15, tl)))})">${etiquetaNome(nome)}</g>` })),
  // 11 · Manaus abre o cadeado com um grampo (câmera na mão)
  { l: 4, cam: { s: [1.1, 1.13], c: [288, 470] },
    f: (tl, d, t) => esconderijo({ t }) + pT(comEtiqueta(MANAUS, 'MANAUS'), 220, 900, 1.05, t, { mascara: 'testa', olhar: [.8, .4], bD: { h: [110, 90], bend: 20 }, segura: `<g transform="translate(30 -10) scale(1.2)">${cadeadoT(tl > .9)}<g transform="translate(-2 18) rotate(${tl > .9 ? 0 : Math.sin(t * 30) * 12})">${tTraco('M0 0 L-46 -40', TLW * 1.6, '#9AA3AD')}</g></g>`, semCorte: true }) },
  // 12 · insert: o cadeado cai aberto
  { l: 4, w: 4, split: false, sfx: [{ t: .05, s: 'galeria/thin_metal_bop_1', v: .5 }], cam: { s: [1.6, 1.7], c: [288, 512] },
    f: (tl, d, t) => fundoChapado(ESC.paredeS) + `<g transform="translate(288 ${lerp(470, 560, ease(sobe(0, .3, tl)))}) rotate(${lerp(0, 25, sobe(0, .3, tl))}) scale(2.2)">${cadeadoT(true)}</g>` },
  // 13 · Recife aponta o alicate para a caixa de alarme tocando (luz vermelha girando)
  { l: 4, w: 5, blur: false, sfx: [{ t: 0, s: 'galeria/siren_whistle_1', v: .3 }], cam: { s: [1.05, 1.09], c: [288, 500], c1: [270, 496] },
    f: (tl, d, t) => esconderijo({ t, ax: 120, ay: 430, alarmeOn: true }) + pT(comEtiqueta(RECIFE, 'RECIFE'), 380, 820, .85, t, { flip: true, mascara: 'testa', olhar: [.6, -.2], bD: { h: [100, 60], bend: 10 }, segura: `<g transform="translate(20 -10)">${alicate}</g>` }) },
  // 14 · insert: o alicate corta o fio; a luz apaga
  { l: 4, w: 7, split: false, sfx: [{ t: .25, s: 'galeria/rubber_snapping_2', v: .5 }], cam: { s: [1.7, 1.75], c: [150, 520] },
    f: (tl, d, t) => { const corta = tl >= .3, x = lerp(300, 200, sobe(0, .3, tl));
      return fundoChapado(ESC.parede) + alarmeCaixa(120, 430, !corta, t) + (corta ? tTraco('M120 570 V600', TLW * 1.2) + tTraco('M120 640 V700', TLW * 1.2) + tTraco('M120 600 l-8 6 M120 640 l8 -6', TLW, '#E8B84A') : '')
        + `<g transform="translate(${x} 620) rotate(-80)">${alicate}</g>` + `<g>${tForma(tMacarrao([x + 70, 660], [x + 300, 760], 10, 40, 46), VERM.cor)}${tMao(x + 50, 650, Math.PI, 26, LUVA, true)}</g>`; } },
  // 15 · reação: Belém aponta para a própria etiqueta, sem graça
  { l: 5, split: false, blur: false, cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => fundoChapado(ESC.parede) + pT(comEtiqueta(BELEM, 'BELÉM'), 230, 1130, 1.5, t, { mascara: 'testa', olhar: [-.1, .5], palpebra: .5, boca: { sm: -.1, skew: .5 }, bD: { h: [-8, 66], bend: 30 }, sobr: .4, semCorte: true, agito: .5 }) },
  // ---------------------------------------------------------------- BLOCO B (16–28): a casa, a mãe e o plano no quadro
  // 16 · a casinha amarela; no "tomou", o carimbo TOMADO desce na porta e a cor some
  { l: 6, sfx: [{ w: 2, l: 6, o: 0, s: 'galeria/drum_bonk_1', v: .5 }], cam: { s: [1, 1.04], c: [288, 520] },
    f: (tl, d, t) => { const k = sobe(ws(6, 2) - ws(6, 0), ws(6, 2) - ws(6, 0) + .15, tl); const c = casaFamilia({ carimbo: k }); return k > .5 ? memoria(c) : c; } },
  // 17 · rajada: boletos vermelhos 1 · 2 · 3 colando na porta (punch-in)
  { l: 6, w: 7, split: false, sfx: [{ t: .02, s: 'papel', v: .5 }, { t: .25, s: 'papel', v: .5 }, { t: .5, s: 'papel', v: .5 }], cam: { s: [1.25, 1.3], c: [290, 640] },
    f: (tl, d, t) => memoria(casaFamilia({ carimbo: 1 })) + [0, 1, 2].filter(i => tl > i * .25).map(i => `<g transform="translate(${180 + i * 110} ${700 + (i % 2) * 30}) rotate(${-8 + i * 9})">${tForma(tPoli([[-40, -54], [40, -54], [40, 54], [-40, 54]]), '#E8434F')}<text x="0" y="14" font-family="'Baloo 2'" font-weight="800" font-size="40" text-anchor="middle" fill="#fff">${i + 1}</text></g>`).join('') },
  // 18 · quarto de aluguel: a mãe sentada na cama, olhando a janela pequena (push-in lento)
  { l: 7, cam: { s: [1, 1.07], c: [288, 520], c1: [300, 512] },
    f: (tl, d, t) => quartoMae() + camaAtras() + pT(MAE, 160, 800, .74, t, { sentado: true, olhar: [.8, -.4], palpebra: .5, boca: { sm: -.4 }, agito: .5 }) },
  // 19 · close médio da mãe: a mão segura a chave do cordão
  { l: 8, split: false, blur: false, cam: { s: [1, 1.04], c: [288, 470] },
    f: (tl, d, t) => fundoChapado(QUARTO.parede) + pT(MAE, 230, 1080, 1.5, t, { olhar: [.2, .4], palpebra: .55, boca: { sm: -.3 }, semPiscar: true, bD: { h: [-40, 50], bend: 40, punho: true }, segura: `<g transform="translate(0 30)">${CHAVE(.5)}</g>`, semCorte: true, agito: .4 }) },
  // 20 · insert: a chave de cabeça de casinha gira no cordão
  { l: 8, w: 4, split: false, sfx: [{ t: .05, s: 'galeria/glockenspiel_magic_2', v: .3 }], cam: { s: [1, 1.05], c: [288, 500] },
    f: (tl, d, t) => fundoChapado(MAE.tronco.cor) + tTraco('M288 -100 V380', TLW * 1.5, '#C9A64A') + `<g transform="translate(288 520) scale(${Math.cos(t * 1.6) * .9 + .1 * Math.sign(Math.cos(t * 1.6))} 1)">${CHAVE(2.6)}</g>` },
  // 21 · plano médio: ela aperta a chave contra o peito, olhos fechados
  { l: 9, cam: { s: [1.1, 1.14], c: [260, 470] },
    f: (tl, d, t) => quartoMae() + camaAtras(688) + pT(MAE, 150, 800, .9, t, { sentado: true, olhos: 'fechados', boca: { sm: .1 }, bD: { h: [-40, 70], bend: 40, punho: true }, segura: CHAVE(.35), agito: .4 }) },
  // 22 · close fechado: "Um dia a gente volta." (fala)
  { l: 9, w: 8, split: false, blur: false, cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => reacaoToon(MAE, t, tl, { falante: true, olhar: [.3, -.2], palpebra: .45, boca: { sm: .25 }, agito: .4 }, { fundo: QUARTO.parede, forma: QUARTO.paredeS }) },
  // 23 · Belém na porta do quarto, em contraluz (corredor claro atrás); baixa a máscara no rosto
  { l: 10, sfx: [{ t: .9, s: 'galeria/rubber_snapping_1', v: .45 }], cam: { s: [1, 1.05], c: [288, 520] },
    f: (tl, d, t) => fundoChapado(QUARTO.parede) + tForma(tPoli([[150, 260], [430, 260], [430, 800], [150, 800]]), '#F4EAD0') + chaoToon(QUARTO.chao, QUARTO.chaoS, 800)
      + `<g style="filter:brightness(0)">${pT(BELEM, 300, 800, .8, t, { mascara: tl > .9 ? 'baixada' : 'testa', olhar: [-.6, 0], agito: .5 })}</g>`
      + camaAtras(760) + pT(MAE, -40, 900, 1.25, t, { sentado: true, olhar: [.8, -.2], palpebra: .6, semCorte: true, nocheck: true, agito: .3 }) },
  // 24 · esconderijo: o Mestre (máscara + óculos) desenha a planta do banco no quadro
  { l: 11, sfx: [{ t: .1, s: 'galeria/washboard_scrape_1', v: .3 }], cam: { s: [1, 1.04], c: [320, 520], c1: [340, 516] },
    f: (tl, d, t) => esconderijo({ t, ax: 170, quadro: plantaBanco(sobe(0, d, tl)) }) + pT(MESTRE, 240, 800, .76, t, { mascara: 'baixada', olhar: [.8, -.2], bD: { h: [110, -40], bend: 20, punho: true }, segura: giz }) },
  // 25–27 · closes no quadro: 9:00 ENTRAR / 9:10 COFRE / 9:12 SAIR
  ...[[12, 0, '9:00', 'ENTRAR', -3], [12, 3, '9:10', 'COFRE', 2], [12, 7, '9:12', 'SAIR', -2]].map(([l, w, h, v, rot], i) => ({ l, w, split: false, blur: false, sfx: [{ t: .02, s: 'galeria/washboard_scrape_2', v: .3 }, { t: .3, s: 'tic', v: .4 }],
    cam: [{ s: [1, 1], c: [200, 470], c1: [376, 470] }, { s: [1, 1], c: [288, 380], c1: [288, 540] }, { s: [1, 1.14], c: [288, 470] }][i],
    f: (tl, d, t) => fundoChapado('#7A5434') + tForma(tPoli([[40, 200], [536, 200], [536, 720], [40, 720]]), '#22302A') + horario(h, v, sobe(0, .5, tl))
      + (i === 2 ? `<g>${tForma(tMacarrao([620, 900], [480, 600], -20, 70, 60), VERM.cor)}${tMao(470, 590, Math.PI * 1.2, 34, LUVA, true)}<g transform="translate(450 570) rotate(-30)">${tForma(tPoli([[-8, -30], [8, -30], [8, 10], [-8, 10]]), '#F4F1EA')}</g></g>` : '') })),
  // 28 · close 3/4 do Mestre (máscara + óculos), falante: o focinho mexe; ajeita os óculos
  { l: 13, split: false, blur: false, cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => reacaoToon(MESTRE, t, tl, { mascara: 'baixada', falante: true, olhar: [.2, 0], bD: tl < .4 ? { h: [36, -170], bend: 30 } : null, agito: .5 }, { fundo: ESC.parede, forma: ESC.paredeS }) },
  // ---------------------------------------------------------------- BLOCO C (29–46): entrada no banco, pistas 1–3, senha
  // 29 · 3D: os 4 (máscara baixada) entram pela porta do banco — mesmo cenário do plano 1, outro trecho da trilha
  { l: 14, mb: false, semFala: true, sfx: [{ t: .1, s: 'galeria/slide_whistle_up_1', v: .3 }],
    g3d: (tl, d) => ({ set: 'bairroToon', opts: { banco: 1, ceu: '#9FC6E0', grama: '#6E8F55', luz: null, garagem: false }, ...MUNDO.trilha([[[-2.5, 1.4, 9.5], [0, 1.6, 3.2]], [[-1.4, 1.5, 8.6], [0, 1.4, 3]]], tl / d), fov: 56 }),
    f: (tl, d, t) => [[MESTRE, -.95], [MANAUS, -.32], [RECIFE, .32], [BELEM, .95]].map(([P, x], i) => p3T(i ? comEtiqueta(P, ['', 'MANAUS', 'RECIFE', 'BELÉM'][i]) : P, [x, 0, lerp(4.6, 3.7, ease(sobe(0, 1, tl / d))) + i * .05], t, { mascara: 'baixada', walk: tl * 1.8 + i * .3, olhar: [-.3, 0] })).join('') },
  // 30 · saguão (mármore bege e dourado): os 4 atravessam; ao fundo, o retrato do dono (PISTA plantada); travelling
  { l: 15, sfx: [{ t: .05, s: 'passo1', v: .3 }, { t: .35, s: 'passo2', v: .3 }], cam: { s: [1, 1.04], c: [250, 520], c1: [330, 520] },
    f: (tl, d, t) => saguao({ t, rx: 330, ry: 420 }) + [[MESTRE, 0, ''], [MANAUS, 1, 'MANAUS'], [RECIFE, 2, 'RECIFE'], [BELEM, 3, 'BELÉM']].map(([P, i, n]) => pT(n ? comEtiqueta(P, n) : P, lerp(-60, 260, ease(sobe(0, 1, tl / d))) + 110 * (3 - i) - 120, 800, .55, t, { mascara: 'baixada', walk: tl * 2 + i * .25, olhar: [.3, 0], semCorte: true })).join('') },
  // 31 · plano médio: o Mestre passa pelo Jairo (quepe, café); o retrato atrás
  { l: 15, w: 6, cam: { s: [1.05, 1.08], c: [300, 500] },
    f: (tl, d, t) => saguao({ t, rx: 410, ry: 400, rs: .9 }) + pT(JAIRO, 430, 800, .72, t, { flip: true, olhar: [.4, 0], palpebra: .65, bD: { h: [30, 90], bend: 30 }, segura: copoCafe }) + pT(MESTRE, lerp(120, 220, ease(sobe(0, 1, tl / d))), 800, .74, t, { mascara: 'baixada', walk: tl * 2, olhar: [.5, 0] }) },
  // 32 · close 3/4 do Mestre: "Bom dia, Jairo." — aceno (PISTA 1)
  { l: 15, w: 9, split: false, blur: false, cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => reacaoToon(MESTRE, t, tl, { mascara: 'baixada', falante: true, olhar: [.6, 0], bD: { h: [150, -40 + Math.sin(t * 14) * 14], bend: 40 }, agito: .6 }, { fundo: SAG.parede, forma: SAG.paredeS }) },
  // 33 · reação do Jairo: cara de nada, gole de café; o retrato do dono atrás dele
  { l: 16, split: false, blur: false, semFala: true, sfx: [{ t: .4, s: 'galeria/bite_apple_1', v: .2 }], cam: { s: [1, 1.04], c: [288, 470] },
    f: (tl, d, t) => fundoChapado(SAG.parede) + retratoDono(440, 260, .9, t) + pT(JAIRO, 230, 1240, 1.5, t, { olhar: [.1, 0], palpebra: .7, boca: { sm: -.1 }, bD: { h: [20, lerp(90, 10, sobe(.3, .6, tl))], bend: 60 }, segura: copoCafe, semCorte: true, agito: .4 }) },
  // 34 · Recife corre até a caixa de alarme do banco (câmera na mão)
  { l: 17, sfx: [{ t: .05, s: 'passo1', v: .4 }, { t: .2, s: 'passo2', v: .4 }, { t: .35, s: 'passo1', v: .4 }], cam: { s: [1.05, 1.1], c: [300, 500], c1: [330, 494] },
    f: (tl, d, t) => saguao({ t, rx: 160, ry: 400, rs: .8, alarme: 1, ax: 480, ay: 420 }) + pT(comEtiqueta(RECIFE, 'RECIFE'), lerp(100, 350, ease(sobe(0, 1, tl / d))), 800, .74, t, { mascara: 'baixada', walk: tl * 3, inclina: .15, bD: { h: [80, 60], bend: 10 }, segura: alicate }) },
  // 35 · close: o Recife para com o alicate no ar; a luz do alarme já está apagada (PISTA 2)
  { l: 17, w: 5, split: false, blur: false, cam: { s: [1.2, 1.24], c: [400, 460] },
    f: (tl, d, t) => saguao({ t, retrato: false, alarme: 1, ax: 480, ay: 420 }) + pT(comEtiqueta(RECIFE, 'RECIFE'), 330, 840, .9, t, { mascara: 'baixada', olhar: [.8, -.2], bD: { h: [100, 0], bend: 0 }, segura: alicate, semCorte: true }) },
  // 36 · reação: Recife de mãos vazias, confuso, olhando o alicate e a caixa
  { l: 17, w: 9, split: false, blur: false, cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => reacaoToon(comEtiqueta(RECIFE, 'RECIFE'), t, tl, { mascara: 'baixada', olhar: tl < .4 ? [.6, .5] : [.9, -.3], sobr: .8, boca: { o: .3, w: .5 }, bD: { h: [60, 40], bend: 30 }, segura: alicate, agito: .5 }, { fundo: SAG.parede, forma: SAG.paredeS }) },
  // 37 · close no relógio do saguão: 9:08
  { l: 18, split: false, sfx: [{ t: .05, s: 'tic', v: .5 }, { t: .55, s: 'tic', v: .5 }], cam: { s: [1, 1.05], c: [288, 480] },
    f: (tl, d, t) => fundoChapado(SAG.parede) + relogioParede(288, 470, 9, 8 + (tl > .5 ? 1 : 0) * 0, 2.6) },
  // 38 · reação do Belém (máscara baixada): vira a cabeça, desconfiado
  { l: 18, w: 3, split: false, blur: false, cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => reacaoToon(comEtiqueta(BELEM, 'BELÉM'), t, tl, { mascara: 'baixada', olhar: tl < .4 ? [-.8, 0] : [.8, 0], sobr: -.4, agito: .5 }, { fundo: SAG.parede, forma: SAG.paredeS }) },
  // 39 · frente do cofre (porta redonda), a porta da ESCADA ao lado; os 4 diante do cofre
  { l: 19, cam: { s: [.92, .95], c: [300, 520] },
    f: (tl, d, t) => salaCofre({ t }) + [[MESTRE, 520, ''], [MANAUS, 150, 'MANAUS'], [RECIFE, 260, 'RECIFE'], [BELEM, 380, 'BELÉM']].map(([P, x, n]) => pT(n ? comEtiqueta(P, n) : P, x, 830, .56, t, { mascara: 'baixada', flip: x > 450, olhar: [-.2, -.3] })).join('') },
  // 40 · close: a Manaus abre a caixa de ferramentas
  { l: 19, w: 4, split: false, sfx: [{ t: .1, s: 'galeria/metal_rattler_1', v: .4 }], cam: { s: [1, 1.05], c: [288, 520] },
    f: (tl, d, t) => fundoChapado(COF.parede) + pT(comEtiqueta(MANAUS, 'MANAUS'), 200, 1100, 1.3, t, { mascara: 'baixada', olhar: [.6, .6], bD: { h: [120, 110], bend: 20 }, semCorte: true }) + `<g transform="translate(420 760) scale(1.6)">${caixaFerramentas(tl > .2)}</g>` },
  // 41 · plano médio, push-in: o Mestre afasta a Manaus com a mão
  { l: 20, cam: { s: [1, 1.1], c: [330, 500] },
    f: (tl, d, t) => salaCofre({ t, cx: 230, cr: 160, tx: 470, ty: 450 }) + pT(comEtiqueta(MANAUS, 'MANAUS'), lerp(380, 300, ease(sobe(.2, .6, tl))), 820, .7, t, { mascara: 'baixada', olhar: [-.6, 0], flip: true })
      + pT(MESTRE, lerp(560, 470, ease(sobe(0, .4, tl))), 820, .74, t, { mascara: 'baixada', flip: true, olhar: [.3, 0], bD: { h: [110, 40], bend: 10 } }) },
  // 42 · close: o dedo de luva digitando sem papel (PISTA 3)
  { l: 20, w: 7, split: false, blur: false, cam: { s: [1, 1.04], c: [288, 500] },
    f: (tl, d, t) => fundoChapado(COF.parede) + teclado(300, 480, 2.6, []) + `<g>${tForma(tMacarrao([620, 900], [400, lerp(560, 600, Math.abs(Math.sin(t * 12)))], -20, 70, 60), VERM.cor)}${tMao(390, lerp(570, 610, Math.abs(Math.sin(t * 12))), Math.PI * 1.15, 34, LUVA, false)}</g>` },
  // 43–45 · close extremo: 7 · 1 · 9 acendem
  ...[[21, 0, [7]], [21, 1, [7, 1]], [21, 2, [7, 1, 9]]].map(([l, w, ac], i) => ({ l, w, split: false, blur: false, sfx: [{ t: .02, s: 'galeria/ding_2', v: .35 }], cam: { s: [1, 1.03], c: [288 + (i - 1) * 30, 500], rot: [(i - 1) * 3, (i - 1) * 3] },
    f: (tl, d, t) => fundoChapado('#2A2F38') + teclado(288, 500, 4.4, ac) })),
  // 46 · close na trava: gira — clec
  { l: 21, w: 3, split: false, blur: false, sfx: [{ t: .05, s: 'galeria/metal_beam_hit_1', v: .5 }], cam: { s: [1, 1.04], c: [288, 500], shake: 6 },
    f: (tl, d, t) => fundoChapado(COF.parede) + cofrePorta(288, 500, 300, 0, lerp(0, 90, ease(sobe(0, .4, tl)))) },
];
