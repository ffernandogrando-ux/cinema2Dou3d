// ---------------------------------------------------------------- PEÇAS DO BLOCO B
const QUARTO = { parede: '#7E8FA3', paredeS: '#6A7A8E', chao: '#5A5148', chaoS: '#4A423A' };
// quarto de aluguel: parede azul-acinzentada, janela pequena com a noite, cama de solteiro (o assento fica em y 675 = quadril sentado de s .74)
function quartoMae() { return paredeToon(QUARTO.parede, QUARTO.paredeS, 800, { passo: 180 }) + chaoToon(QUARTO.chao, QUARTO.chaoS, 800, { tabuas: 1 })
  + tForma(tPoli([[380, 300], [520, 300], [520, 440], [380, 440]]), '#24305A') + `<circle cx="480" cy="340" r="16" fill="#F4EAD0"/>` + tTraco('M450 300 V440 M380 370 H520', TLW)
  + tForma(tPoli([[40, 600], [80, 600], [80, 800], [40, 800]]), '#8A6A4A') + sombraContato(200, 800, 330); }
// a frente da cama (colchão + pé), desenhada por cima das pernas da mãe sentada, para o corpo "encostar" no assento
const camaFrente = () => tForma(tPoli([[40, 690], [370, 690], [370, 740], [40, 740]]), '#D9D2C4', tPinta(tPoli([[40, 690], [370, 690], [370, 704], [40, 704]]), '#EEE8DC')) + tForma(tPoli([[50, 740], [360, 740], [360, 800], [50, 800]]), '#8A6A4A');
const giz = `<g transform="translate(14 -10) rotate(-30)">${tForma(tPoli([[-6, -24], [6, -24], [6, 10], [-6, 10]]), '#F4F1EA')}</g>`;
// planta do banco desenhada no quadro (k = progresso do desenho)
function plantaBanco(k) { const L = [['M350 520 H540 V350 H350Z', .2], ['M350 430 H430 V350', .45], ['M480 520 V460 A30 30 0 1 1 480.1 460', .7], ['M370 500 L410 470 L450 500', .9]];
  return L.filter(([, a]) => k > a - .2).map(([d]) => tTraco(d, TLW, '#F4F1EA')).join('') + (k > .85 ? `<text x="480" y="470" font-family="Caveat" font-size="22" text-anchor="middle" fill="#F4F1EA">cofre</text>` : ''); }
// horário escrito a giz no quadro
const horario = (h, v, k) => `<g opacity="${k > 0 ? 1 : 0}"><text x="288" y="440" font-family="Caveat" font-weight="700" font-size="130" text-anchor="middle" fill="#F4F1EA">${h}</text>`
  + `<text x="288" y="560" font-family="Caveat" font-weight="700" font-size="96" text-anchor="middle" fill="#F4F1EA">${v}</text>` + tTraco(`M140 590 H${140 + 300 * Math.min(1, k * 1.5)}`, TLW * 1.4, '#F4F1EA') + `</g>`;
