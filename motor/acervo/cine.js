// ================================================================ KIT CINE (luz e cor de cinema por cima do desenho)
// Barato: tudo é uma camada SVG por cima do plano (use em `over: (tl, d, t) => ...` do plano, que fica sobre a cena e sob a legenda).
// Não mexe em personagem nem cenário. Ideia: escurecer o quadro, deixar a luz vir de uma fonte motivada (luminária, janela,
// portal, tela, sirene), recortar a cara com luz lateral, contraluz em silhueta nos momentos de tensão e faixas de cinema na abertura/virada.
let _cN = 0;
// escuro geral do plano (multiplica): cor fria e forte = noite/tensão; cor quente e leve = interior
const cEscuro = (cor = '#2a2140', op = .55) => `<rect x="-50" y="-50" width="676" height="1124" fill="${cor}" opacity="${op}" style="mix-blend-mode:multiply"/>`;
// luz-chave: escurece tudo MENOS um círculo de luz suave (x, y, raio) — o olho vai para onde a luz está
function cLuzChave(x, y, r, o = {}) { const id = 'ck' + (_cN++), esc = o.escuro ?? .72;
  return `<defs><radialGradient id="${id}" cx="${x}" cy="${y}" r="${r}" gradientUnits="userSpaceOnUse"><stop offset="${o.miolo ?? .35}" stop-color="${o.cor || '#120c1c'}" stop-opacity="0"/><stop offset="1" stop-color="${o.cor || '#120c1c'}" stop-opacity="${esc}"/></radialGradient></defs>`
    + `<rect x="-50" y="-50" width="676" height="1124" fill="url(#${id})" style="mix-blend-mode:multiply"/>`; }
// facho de luz (trapézio de luz clara, soma): de uma fonte (x1,y1, largura w1) até o chão (x2,y2, largura w2)
const cFacho = (x1, y1, w1, x2, y2, w2, cor = '#FFE3A8', op = .22) => `<path d="M${x1 - w1 / 2} ${y1} L${x1 + w1 / 2} ${y1} L${x2 + w2 / 2} ${y2} L${x2 - w2 / 2} ${y2}z" fill="${cor}" opacity="${op}" style="mix-blend-mode:screen"/>`;
// brilho de fonte de luz (soma): portal, tela, abajur
const cBrilho = (x, y, r, cor = '#C04BFF', op = .5) => { const id = 'cb' + (_cN++);
  return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${cor}" stop-opacity="${op}"/><stop offset="1" stop-color="${cor}" stop-opacity="0"/></radialGradient></defs><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id})" style="mix-blend-mode:screen"/>`; };
// luz lateral dura no close: metade do quadro (lado oposto à luz) cai na sombra, com borda suave
function cLuzLateral(lado = 1, o = {}) { const id = 'cl' + (_cN++), x0 = lado > 0 ? 0 : 1;
  return `<defs><linearGradient id="${id}" x1="${x0}" y1="0" x2="${1 - x0}" y2="0"><stop offset="${o.ini ?? .42}" stop-color="${o.cor || '#140e22'}" stop-opacity="${o.escuro ?? .62}"/><stop offset="${o.fim ?? .6}" stop-color="${o.cor || '#140e22'}" stop-opacity="0"/></linearGradient></defs>`
    + `<rect x="-50" y="-50" width="676" height="1124" fill="url(#${id})" style="mix-blend-mode:multiply"/>`; }
// sirene: lavagem vermelha e azul alternando (k = intensidade)
const cSirene = (t, k = 1) => `<rect x="-50" y="-50" width="676" height="1124" fill="${Math.floor(t * 4) % 2 ? '#2B5BFF' : '#FF2B3A'}" opacity="${.22 * k}" style="mix-blend-mode:screen"/>`;
// vinheta de cinema (bordas escuras)
const cVinheta = (op = .55) => { const id = 'cv' + (_cN++);
  return `<defs><radialGradient id="${id}" cx=".5" cy=".46" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${op}"/></radialGradient></defs><rect x="-50" y="-50" width="676" height="1124" fill="url(#${id})"/>`; };
// faixas de cinema (abertura, virada): k anima a entrada 0..1; h = altura de cada faixa
const cFaixas = (k = 1, h = 120) => `<rect x="0" y="${-h + h * k}" width="576" height="${h}" fill="#000"/><rect x="0" y="${1024 - h * k}" width="576" height="${h}" fill="#000"/>`;
// grão de filme leve (o motor já tem o padrão #grao)
const cGrao = (t, op = .1) => { const gx = Math.floor((t * 24 * 37) % 256), gy = Math.floor((t * 24 * 91) % 256);
  return `<rect x="${-gx}" y="${-gy}" width="832" height="1280" fill="url(#grao)" opacity="${op}" style="mix-blend-mode:overlay"/>`; };
// silhueta: envolve um personagem já desenhado e deixa ele todo preto (contraluz)
const cSilhueta = (svg, cor = '#0d0a12') => `<g style="filter:brightness(0)">${svg}</g>`;
// receitas prontas (uma linha por plano)
const CINE = {
  noite: (t, o = {}) => cEscuro('#1d1838', .5) + cLuzChave(o.x ?? 288, o.y ?? 520, o.r ?? 420, { escuro: .7 }) + cVinheta(.5) + cGrao(t),
  interior: (t, o = {}) => cEscuro('#3a2a20', .25) + cLuzChave(o.x ?? 288, o.y ?? 480, o.r ?? 520, { escuro: .5 }) + cVinheta(.45) + cGrao(t),
  close: (t, o = {}) => cLuzLateral(o.lado ?? 1, { escuro: .6 }) + cVinheta(.5) + cGrao(t),
  tensao: (t, o = {}) => cEscuro('#140e22', .35) + cLuzChave(o.x ?? 288, o.y ?? 400, o.r ?? 420, { escuro: .7, miolo: .4 }) + cVinheta(.6) + cGrao(t, .13),
};
