// ---------------------------------------------------------------- PEÇAS DO BLOCO E (tela, flash, final)
// tela de terminal: linhas digitadas (k 0..1); grande = segunda linha maior
function telaTerminal(linhas, k = 1, grande = false) { let r = fundoChapado('#0D1410') + tForma(tPoli([[30, 170], [546, 170], [546, 760], [30, 760]]), '#0A1A10');
  let cont = Math.floor(k * linhas.join('').length * 1.2) + 1;
  linhas.forEach((ln, i) => { const n = Math.max(0, Math.min(ln.length, cont)); cont -= ln.length;
    r += `<text x="288" y="${300 + i * 150}" font-family="VT323" font-size="${grande && i === 1 ? 104 : 62}" text-anchor="middle" fill="#7CFFB2">${ln.slice(0, n)}${n < ln.length && n > 0 ? '▌' : ''}</text>`; });
  return r; }
// fichinha com foto (para a tela "CULPADOS")
function fichaMini(P, nome, x, y, t) { const id = 'fm' + (_tN++);
  return `<g transform="translate(${x} ${y})">` + tForma(tPoli([[-74, -96], [74, -96], [74, 96], [-74, 96]]), '#E9F2F7') + `<defs><clipPath id="${id}"><rect x="-64" y="-86" width="128" height="140"/></clipPath></defs><rect x="-64" y="-86" width="128" height="140" fill="#B9BEC4"/>`
    + `<g clip-path="url(#${id})">${toon(P, { x: -14, y: 330, s: .55, t, still: true, semPiscar: true, nocheck: true, semCorte: true, mascara: 'testa', palpebra: .5 })}</g>`
    + `<text x="0" y="84" font-family="'Baloo 2'" font-weight="800" font-size="24" text-anchor="middle" fill="${TINK}">${nome}</text></g>`; }
// lavagem vermelha de memória (flash de pistas)
const flashPista = (svg) => `<g style="filter:sepia(.6) saturate(2.2) hue-rotate(-28deg) contrast(1.1)">${svg}</g>` + `<rect x="-50" y="-50" width="676" height="1124" fill="#C0392B" opacity=".18"/>`;
// fachada do prédio de aluguel à noite, uma janela acesa
function fachadaNoite() { let r = fundoChapado('#1D2244') + `<circle cx="470" cy="160" r="40" fill="#F4EAD0"/>` + `<rect x="-400" y="900" width="1400" height="600" fill="#2A2A38"/>`;
  r += tForma(tPoli([[80, 220], [500, 220], [500, 900], [80, 900]]), '#4A4E6A', tPinta(tPoli([[80, 220], [160, 220], [160, 900], [80, 900]]), '#3E425C'));
  for (let i = 0; i < 4; i++) for (let j = 0; j < 5; j++) { const acesa = i === 2 && j === 3; r += tForma(tPoli([[120 + i * 95, 260 + j * 120], [180 + i * 95, 260 + j * 120], [180 + i * 95, 340 + j * 120], [120 + i * 95, 340 + j * 120]]), acesa ? '#FFE3A8' : '#2A2E48'); }
  return r; }
