// ---------------------------------------------------------------- PEÇAS DO BLOCO D (dentro do cofre, escada, sala 719)
// dentro do cofre: prateleiras vazias de metal, poeira, uma mesa com as pastas; a câmera de segurança no canto
function cofreDentro(o = {}) { const t = o.t || 0;
  let r = paredeToon(COF.paredeS, '#5A6B7E', 800, { passo: 120 }) + chaoToon(COF.chao, COF.chaoS, 800);
  for (const y of [300, 460, 620]) r += tForma(tPoli([[20, y], [556, y], [556, y + 18], [20, y + 18]]), COF.metal) + sombraContato(288, y + 18, 400).replace('opacity=".2"', 'opacity=".12"');
  for (let i = 0; i < 14; i++) { const x = 40 + (i * 97) % 500, y = ((t * 40 + i * 70) % 700) + 100; r += `<circle cx="${x}" cy="${y}" r="3" fill="#E9EEF2" opacity=".5"/>`; }
  if (o.camera !== false) r += cameraSeg(o.camX ?? 500, o.camY ?? 110, o.camLuz ?? (Math.floor(t * 2) % 2 === 0), o.camS ?? 1, o.camRot ?? 30);
  return r; }
function cameraSeg(x, y, luz, s = 1, rot = 30) { return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${rot})">` + tTraco('M60 -40 L20 0', TLW * 2) + tForma(tPoli([[-70, -24], [30, -24], [30, 24], [-70, 24]]), '#E9EEF2', tPinta(tPoli([[-70, 8], [30, 8], [30, 24], [-70, 24]]), '#C9D1D9'))
  + tForma(tElip(-74, 0, 18, 20), '#2A2F38') + tForma(tElip(-76, 0, 9, 10), '#5A6B7E') + (luz ? `<circle cx="18" cy="-10" r="12" fill="#FF3B30" opacity=".35"/><circle cx="18" cy="-10" r="6" fill="#FF3B30"/>` : `<circle cx="18" cy="-10" r="6" fill="#7A2A26"/>`) + `</g>`; }
const mesaMetal = (y = 700) => tForma(tPoli([[80, y - 20], [500, y - 20], [500, y], [80, y]]), COF.metal) + tTraco(`M100 ${y} V800 M480 ${y} V800`, TLW * 2.2, COF.metalS) + sombraContato(290, 800, 420);
const pasta = (nome, aberta = 0) => `<g>${tForma(tPoli([[-90, -60], [90, -60], [90, 60], [-90, 60]]), '#C9A46A', tPinta(tPoli([[40, -60], [90, -60], [90, 60], [40, 60]]), '#B08A50'))}`
  + (aberta ? tForma(tPoli([[-90, -60], [90, -60], [70, -60 - 80 * aberta], [-70, -60 - 80 * aberta]]), '#D9B87E') : '') + `<g transform="translate(0 ${aberta ? 10 : -10}) scale(.5)">${etiquetaNome(nome)}</g></g>`;
const etiquetaProva = `<g transform="rotate(8)">${tTraco('M0 -60 L0 -10', TLW * .8, '#9A8A6A')}${tForma(tPoli([[-70, -10], [70, -10], [70, 50], [-70, 50]]), '#FBF3D0')}<text x="0" y="30" font-family="'Baloo 2'" font-weight="800" font-size="34" text-anchor="middle" fill="#C0392B">PROVA Nº 1</text></g>`;
// escada em caracol vista de baixo (contra-plongée)
function escadaCaracol(t) { let r = fundoChapado('#3E4756');
  for (let i = 0; i < 9; i++) { const y = 1000 - i * 120, a = i * .7 + t * .2, x = 288 + Math.cos(a) * 140, w = 180 - i * 8;
    r += tForma(tPoli([[x - w / 2, y], [x + w / 2, y], [x + w / 2 - 20, y + 24], [x - w / 2 + 20, y + 24]]), '#8A96A6', tPinta(tPoli([[x, y], [x + w / 2, y], [x + w / 2 - 20, y + 24], [x, y + 24]]), '#738093')); }
  return r + tTraco('M288 1200 V-100', TLW * 3, '#2A2F38'); }
// corredor vinho com porta dupla e a placa da sala
const VINHO = { parede: '#6E2A36', paredeS: '#58202B', chao: '#3A1E24', chaoS: '#2C161B', ouro: '#D4A93A' };
function corredor719(o = {}) { let r = paredeToon(VINHO.parede, VINHO.paredeS, 820, { passo: 220 }) + chaoToon(VINHO.chao, VINHO.chaoS, 820);
  r += tForma(tPoli([[150, 340], [426, 340], [426, 820], [150, 820]]), '#3A1E24') + tTraco('M288 340 V820', TLW) + tForma(tElip(270, 600, 10, 10), VINHO.ouro) + tForma(tElip(306, 600, 10, 10), VINHO.ouro);
  r += `<g transform="translate(288 290) scale(${o.placaS || 1})">` + tForma(tPoli([[-90, -34], [90, -34], [90, 34], [-90, 34]]), VINHO.ouro) + `<text x="0" y="16" font-family="'Baloo 2'" font-weight="800" font-size="40" text-anchor="middle" fill="${TINK}">SALA 719</text></g>`;
  return r; }
// sala do dono: parede vinho e ouro, retratos do dono, tela grande ao fundo, cadeira de couro
function salaDono(o = {}) { let r = paredeToon(VINHO.parede, VINHO.paredeS, 820, { passo: 180 }) + chaoToon(VINHO.chao, VINHO.chaoS, 820);
  r += retratoDono(80, 300, .75) + retratoDono(500, 300, .75);
  r += tForma(tPoli([[150, 160], [426, 160], [426, 380], [150, 380]]), '#0D1410') + (o.tela ? o.tela : '');
  r += tForma(tPoli([[120, 640], [460, 640], [460, 700], [120, 700]]), '#5A3A28') + tTraco('M150 700 V820 M430 700 V820', TLW * 2);
  return r; }
// cadeira de couro vista de trás (encosto alto) — gira: k 0 = de costas, 1 = de frente (encosto atrás da pessoa)
const encosto = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${tForma(tSpl([[-110, -40], [-100, -330], [0, -360], [100, -330], [110, -40]]), '#4A1E26', tPinta(tSpl([[40, -340], [110, -330], [110, -40], [50, -40]]), '#3A161D'))}${tTraco('M0 -40 V60', TLW * 3)}${tTraco('M-70 60 H70', TLW * 3)}</g>`;
