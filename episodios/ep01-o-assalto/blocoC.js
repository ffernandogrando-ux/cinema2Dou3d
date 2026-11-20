  // ---------------------------------------------------------------- BLOCO C (29–46): entrada no banco, pistas 1–3, senha
  // 29 · 3D: os 4 (máscara baixada) entram pela porta do banco — mesmo cenário do plano 1, outro trecho da trilha
  { l: 14, mb: false, sfx: [{ t: .1, s: 'galeria/slide_whistle_up_1', v: .3 }],
    g3d: (tl, d) => ({ set: 'bairroToon', opts: { banco: 1, ceu: '#9FC6E0', grama: '#6E8F55', luz: null, garagem: false }, ...MUNDO.trilha([[[-2.5, 1.4, 9], [0, 1.6, 3.2]], [[-1.5, 1.5, 7.5], [0, 1.4, 3]]], tl / d), fov: 54 }),
    f: (tl, d, t) => [[MESTRE, -.6], [MANAUS, -.2], [RECIFE, .2], [BELEM, .6]].map(([P, x], i) => p3T(i ? comEtiqueta(P, ['', 'MANAUS', 'RECIFE', 'BELÉM'][i]) : P, [x * 1.2, 0, lerp(4.6, 3.7, ease(sobe(0, 1, tl / d))) + i * .05], t, { mascara: 'baixada', walk: tl * 1.8 + i * .3, olhar: [-.3, 0] })).join('') },
  // 30 · saguão (mármore bege e dourado): os 4 atravessam; ao fundo, o retrato do dono (PISTA plantada); travelling
  { l: 15, sfx: [{ t: .05, s: 'passo1', v: .3 }, { t: .35, s: 'passo2', v: .3 }], cam: { s: [1, 1.04], c: [250, 520], c1: [330, 520] },
    f: (tl, d, t) => saguao({ t, rx: 330, ry: 420 }) + [[MESTRE, 0, ''], [MANAUS, 1, 'MANAUS'], [RECIFE, 2, 'RECIFE'], [BELEM, 3, 'BELÉM']].map(([P, i, n]) => pT(n ? comEtiqueta(P, n) : P, lerp(-60, 260, ease(sobe(0, 1, tl / d))) + 110 * (3 - i) - 120, 800, .55, t, { mascara: 'baixada', walk: tl * 2 + i * .25, olhar: [.3, 0], semCorte: true })).join('') },
  // 31 · plano médio: o Mestre passa pelo Jairo (quepe, café); o retrato atrás
  { l: 15, w: 6, cam: { s: [1.05, 1.08], c: [300, 500] },
    f: (tl, d, t) => saguao({ t, rx: 410, ry: 400, rs: .9 }) + pT(JAIRO, 430, 800, .72, t, { flip: true, olhar: [.4, 0], palpebra: .65, bD: { h: [30, 90], bend: 30 }, segura: copoCafe }) + pT(MESTRE, lerp(120, 220, ease(sobe(0, 1, tl / d))), 800, .74, t, { mascara: 'baixada', walk: tl * 2, olhar: [.5, 0] }) },
  // 32 · close 3/4 do Mestre: "Bom dia, Jairo." — aceno (PISTA 1)
  { l: 15, w: 9, split: false, blur: false, cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => reacaoToon(MESTRE, t, tl, { mascara: 'baixada', falante: true, olhar: [.6, 0], bD: { h: [60, -120], bend: 40 }, agito: .6 }, { fundo: SAG.parede, forma: SAG.paredeS }) },
  // 33 · reação do Jairo: cara de nada, gole de café; o retrato do dono atrás dele
  { l: 16, split: false, blur: false, sfx: [{ t: .4, s: 'galeria/bite_apple_1', v: .2 }], cam: { s: [1, 1.04], c: [288, 470] },
    f: (tl, d, t) => fundoChapado(SAG.parede) + retratoDono(440, 260, .9, t) + pT(JAIRO, 230, 1240, 1.5, t, { olhar: [.1, 0], palpebra: .7, boca: { sm: -.1 }, bD: { h: [20, lerp(90, 10, sobe(.3, .6, tl))], bend: 60 }, segura: copoCafe, semCorte: true, agito: .4 }) },
  // 34 · Recife corre até a caixa de alarme do banco (câmera na mão)
  { l: 17, sfx: [{ t: .05, s: 'passo1', v: .4 }, { t: .2, s: 'passo2', v: .4 }, { t: .35, s: 'passo1', v: .4 }], cam: { s: [1.05, 1.1], c: [300, 500], c1: [330, 494] },
    f: (tl, d, t) => saguao({ t, rx: 160, ry: 400, rs: .8, alarme: 1, ax: 480, ay: 420 }) + pT(comEtiqueta(RECIFE, 'RECIFE'), lerp(100, 350, ease(sobe(0, 1, tl / d))), 800, .74, t, { mascara: 'baixada', walk: tl * 3, inclina: .15, bD: { h: [80, 60], bend: 10 }, segura: alicate }) },
  // 35 · close: o Recife para com o alicate no ar; a luz do alarme já está apagada (PISTA 2)
  { l: 17, w: 5, split: false, blur: false, cam: { s: [1.2, 1.24], c: [400, 460] },
    f: (tl, d, t) => saguao({ t, retrato: false, alarme: 1, ax: 480, ay: 420 }) + pT(comEtiqueta(RECIFE, 'RECIFE'), 330, 840, .9, t, { mascara: 'baixada', olhar: [.8, -.2], bD: { h: [100, 0], bend: 0 }, segura: alicate, semCorte: true }) },
  // 36 · reação: Recife de mãos vazias, confuso, olhando o alicate e a caixa
  { l: 17, w: 9, split: false, blur: false, cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => reacaoToon(comEtiqueta(RECIFE, 'RECIFE'), t, tl, { mascara: 'testa', olhar: tl < .4 ? [.6, .5] : [.9, -.3], sobr: .8, boca: { o: .3, w: .5 }, bD: { h: [60, 40], bend: 30 }, segura: alicate, agito: .5 }, { fundo: SAG.parede, forma: SAG.paredeS }) },
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
