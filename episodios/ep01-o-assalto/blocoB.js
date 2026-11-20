  // ---------------------------------------------------------------- BLOCO B (16–28): a casa, a mãe e o plano no quadro
  // 16 · a casinha amarela; no "tomou", o carimbo TOMADO desce na porta e a cor some
  { l: 6, sfx: [{ w: 2, l: 6, o: 0, s: 'galeria/drum_bonk_1', v: .5 }], cam: { s: [1, 1.04], c: [288, 520] },
    f: (tl, d, t) => { const k = sobe(ws(6, 2) - ws(6, 0), ws(6, 2) - ws(6, 0) + .15, tl); const c = casaFamilia({ carimbo: k }); return k > .5 ? memoria(c) : c; } },
  // 17 · rajada: boletos vermelhos 1 · 2 · 3 colando na porta (punch-in)
  { l: 6, w: 7, split: false, sfx: [{ t: .02, s: 'papel', v: .5 }, { t: .25, s: 'papel', v: .5 }, { t: .5, s: 'papel', v: .5 }], cam: { s: [1.6, 1.65], c: [290, 640] },
    f: (tl, d, t) => memoria(casaFamilia({ carimbo: 1 })) + [0, 1, 2].filter(i => tl > i * .25).map(i => `<g transform="translate(${250 + i * 34} ${650 + i * 22}) rotate(${-8 + i * 9})">${tForma(tPoli([[-40, -54], [40, -54], [40, 54], [-40, 54]]), '#E8434F')}<text x="0" y="14" font-family="Baloo 2" font-weight="800" font-size="40" text-anchor="middle" fill="#fff">${i + 1}</text></g>`).join('') },
  // 18 · quarto de aluguel: a mãe sentada na cama, olhando a janela pequena (push-in lento)
  { l: 7, cam: { s: [1, 1.07], c: [288, 520], c1: [300, 512] },
    f: (tl, d, t) => quartoMae() + pT(MAE, 220, 800, .74, t, { sentado: true, olhar: [.8, -.4], palpebra: .5, boca: { sm: -.4 }, agito: .5 }) + camaFrente() },
  // 19 · close médio da mãe: a mão segura a chave do cordão
  { l: 8, split: false, blur: false, cam: { s: [1, 1.04], c: [288, 470] },
    f: (tl, d, t) => fundoChapado(QUARTO.parede) + pT(MAE, 230, 1240, 1.5, t, { olhar: [.2, .4], palpebra: .55, boca: { sm: -.3 }, bD: { h: [-20, 60], bend: 50, punho: true }, segura: `<g transform="translate(0 30)">${CHAVE(.5)}</g>`, semCorte: true, agito: .4 })
      + tTraco('M300 620 Q250 520 300 420', TLW * .8, '#C9A64A') },
  // 20 · insert: a chave de cabeça de casinha gira no cordão
  { l: 8, w: 4, split: false, sfx: [{ t: .05, s: 'galeria/glockenspiel_magic_2', v: .3 }], cam: { s: [1, 1.05], c: [288, 500] },
    f: (tl, d, t) => fundoChapado(MAE.tronco.cor) + tTraco('M288 -100 V380', TLW * 1.5, '#C9A64A') + `<g transform="translate(288 520) scale(${Math.cos(t * 1.6) * .9 + .1 * Math.sign(Math.cos(t * 1.6))} 1)">${CHAVE(2.6)}</g>` },
  // 21 · plano médio: ela aperta a chave contra o peito, olhos fechados
  { l: 9, cam: { s: [1.1, 1.14], c: [260, 470] },
    f: (tl, d, t) => quartoMae() + pT(MAE, 220, 800, .9, t, { sentado: true, olhos: 'fechados', boca: { sm: .1 }, bD: { h: [-10, 40], bend: 60, punho: true }, segura: CHAVE(.35), agito: .4 }) + camaFrente() },
  // 22 · close fechado: "Um dia a gente volta." (fala)
  { l: 9, w: 8, split: false, blur: false, cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => reacaoToon(MAE, t, tl, { falante: true, olhar: [.3, -.2], palpebra: .45, boca: { sm: .25 }, agito: .4 }, { fundo: QUARTO.parede, forma: QUARTO.paredeS }) },
  // 23 · Belém na porta do quarto, em contraluz (corredor claro atrás); baixa a máscara no rosto
  { l: 10, sfx: [{ t: .9, s: 'galeria/rubber_snapping_1', v: .45 }], cam: { s: [1, 1.05], c: [288, 520] },
    f: (tl, d, t) => fundoChapado(QUARTO.parede) + tForma(tPoli([[150, 260], [430, 260], [430, 800], [150, 800]]), '#F4EAD0') + chaoToon(QUARTO.chao, QUARTO.chaoS, 800)
      + `<g style="filter:brightness(.18)">${pT(BELEM, 300, 800, .8, t, { mascara: tl > .9 ? 'baixada' : 'testa', olhar: [-.6, 0], agito: .5 })}</g>` },
  // 24 · esconderijo: o Mestre (máscara + óculos) desenha a planta do banco no quadro
  { l: 11, sfx: [{ t: .1, s: 'galeria/washboard_scrape_1', v: .3 }], cam: { s: [1, 1.04], c: [320, 520], c1: [340, 516] },
    f: (tl, d, t) => esconderijo({ t, quadro: plantaBanco(sobe(0, d, tl)) }) + pT(MESTRE, 240, 800, .76, t, { mascara: 'baixada', olhar: [.8, -.2], bD: { h: [110, -40], bend: 20, punho: true }, segura: giz }) },
  // 25–27 · closes no quadro: 9:00 ENTRAR / 9:10 COFRE / 9:12 SAIR
  ...[[12, 0, '9:00', 'ENTRAR', -3], [12, 3, '9:10', 'COFRE', 2], [12, 7, '9:12', 'SAIR', -2]].map(([l, w, h, v, rot], i) => ({ l, w, split: false, blur: false, sfx: [{ t: .02, s: 'galeria/washboard_scrape_2', v: .3 }, { t: .3, s: 'tic', v: .4 }],
    cam: { s: [1, 1.05], c: [288 + (i - 1) * 20, 470], rot: [rot, rot] },
    f: (tl, d, t) => fundoChapado('#22302A') + horario(h, v, sobe(0, .5, tl)) })),
  // 28 · close 3/4 do Mestre (máscara + óculos), falante: o focinho mexe; ajeita os óculos
  { l: 13, split: false, blur: false, cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => reacaoToon(MESTRE, t, tl, { mascara: 'baixada', falante: true, olhar: [.2, 0], bD: tl < .4 ? { h: [36, -170], bend: 30 } : null, agito: .5 }, { fundo: ESC.parede, forma: ESC.paredeS }) },
