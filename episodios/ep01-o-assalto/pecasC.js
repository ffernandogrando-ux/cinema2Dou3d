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
