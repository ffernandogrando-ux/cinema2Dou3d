  // ---------------------------------------------------------------- BLOCO D (47–63): o cofre vazio, a prova, a escada, a sala 719
  // 47 · a porta redonda gira e abre (câmera recuando); luz branca de dentro
  { l: 22, sfx: [{ t: .05, s: 'galeria/metal_wobble_1', v: .4 }, { t: .3, s: 'rangido', v: .4 }], cam: { s: [1.15, 1], c: [300, 480] },
    f: (tl, d, t) => salaCofre({ t, aberta: ease(sobe(0, .8, tl)), giro: 90 }) + [[MANAUS, 110, 'MANAUS'], [RECIFE, 210, 'RECIFE'], [BELEM, 410, 'BELÉM'], [MESTRE, 520, '']].map(([P, x, n]) => pT(n ? comEtiqueta(P, n) : P, x, 840, .5, t, { mascara: 'baixada', flip: x > 300, olhar: [-.3, -.3] })).join('') },
  // 48 · dentro do cofre: prateleiras vazias, poeira; uma moeda gira no chão e para
  { l: 22, w: 3, split: false, sfx: [{ t: .1, s: 'galeria/coconut_hit_2', v: .25 }], cam: { s: [1, 1.04], c: [288, 520] },
    f: (tl, d, t) => { const k = sobe(0, d, tl); return cofreDentro({ t, camera: false }) + `<g transform="translate(300 790) scale(${Math.cos(t * 18 * (1 - k)) * (1 - k) + k} 1)">${tForma(tElip(0, 0, 22, 22), '#E8B84A')}</g>`; } },
  // 49 · a mesa de metal com 3 pastas pardas
  { l: 23, cam: { s: [1, 1.05], c: [288, 560], c1: [300, 556] },
    f: (tl, d, t) => cofreDentro({ t, camera: false }) + mesaMetal(700) + [130, 290, 450].map((x, i) => `<g transform="translate(${x} 640) scale(.8)">${pasta(['MANAUS', 'RECIFE', 'BELÉM'][i])}</g>`).join('') },
  // 50 · close nas etiquetas das pastas (rima com as do peito)
  { l: 23, w: 3, split: false, blur: false, cam: { s: [1, 1], c: [200, 520], c1: [380, 520] },
    f: (tl, d, t) => fundoChapado('#C9A46A') + [40, 288, 536].map((x, i) => `<g transform="translate(${x} 500) scale(1.3)">${pasta(['MANAUS', 'RECIFE', 'BELÉM'][i])}</g>`).join('') },
  // 51 · close nas mãos de luva abrindo a pasta BELÉM
  { l: 24, split: false, blur: false, sfx: [{ t: .05, s: 'papel', v: .5 }], cam: { s: [1, 1.05], c: [288, 520] },
    f: (tl, d, t) => fundoChapado(COF.metal) + `<g transform="translate(288 600) scale(2.4)">${pasta('BELÉM', ease(sobe(0, .4, tl)))}</g>` + tMao(140, lerp(520, 420, sobe(0, .4, tl)), -Math.PI / 2, 40, LUVA, false) + tMao(440, lerp(520, 420, sobe(0, .4, tl)), -Math.PI / 2, 40, LUVA, false) },
  // 52 · close extremo na chave (cabeça de casinha), push-in; o Belém levanta a máscara (reação ao fundo)
  { l: 25, split: false, blur: false, sfx: [{ t: .05, s: 'galeria/glockenspiel_magic_2', v: .3 }, { t: .9, s: 'galeria/rubber_snapping_1', v: .4 }], cam: { s: [1, 1.12], c: [288, 470] },
    f: (tl, d, t) => fundoChapado('#D9B87E') + pT(comEtiqueta(BELEM, 'BELÉM'), 420, 1240, 1.3, t, { mascara: tl > .9 ? 'testa' : 'baixada', olhar: [-.6, .5], olhos: tl > .9 ? 'arregalados' : null, semCorte: true, nocheck: true, agito: .4 }) + `<g transform="translate(200 470) rotate(-10)">${CHAVE(2.6)}</g>` },
  // 53 · flash 0,4 s: a chave da mãe no cordão, mesma posição (memória)
  { l: 25, w: 8, split: false, blur: false, cam: { s: [1, 1], c: [288, 470] },
    f: (tl, d, t) => memoria(fundoChapado(MAE.tronco.cor) + tTraco('M200 -100 V320', TLW * 1.4, '#C9A64A') + `<g transform="translate(200 470) rotate(-10)">${CHAVE(2.6)}</g>`) },
  // 54 · close na etiqueta amarrada na chave: PROVA Nº 1
  { l: 26, split: false, blur: false, cam: { s: [1, 1.08], c: [288, 470] },
    f: (tl, d, t) => fundoChapado('#D9B87E') + `<g transform="translate(180 430) rotate(-10)">${CHAVE(2.2)}</g>` + `<g transform="translate(360 ${lerp(470, 520, ease(sobe(0, .3, tl)))}) scale(2)">${etiquetaProva}</g>` },
  // 55 · canto do teto: a câmera de segurança, a luz vermelha pisca (PISTA 4)
  { l: 27, sfx: [{ t: .1, s: 'galeria/ding_3', v: .25 }], cam: { s: [1.3, 1.36], c: [430, 200] },
    f: (tl, d, t) => cofreDentro({ t, camLuz: Math.floor(t * 3) % 2 === 0 }) },
  // 56 · reação: Belém sem máscara (na testa), dutch; a lente gira e foca nele
  { l: 27, w: 10, split: false, blur: false, cam: { s: [1, 1.06], c: [288, 470], rot: [-6, -8] },
    f: (tl, d, t) => reacaoToon(comEtiqueta(BELEM, 'BELÉM'), t, tl, { mascara: 'testa', olhar: [.8, -.6], olhos: 'arregalados', sobr: .6, boca: { o: .3, w: .5 }, agito: .6 }, { fundo: COF.paredeS, forma: '#5A6B7E' }) + cameraSeg(520, 120, true, 1.4, 20 + Math.sin(t * 6) * 6) },
  // 57 · plano aberto: Manaus e Recife olhando as próprias pastas; a porta da ESCADA balançando, a sombra do Mestre subindo
  { l: 28, sfx: [{ t: .1, s: 'rangido', v: .35 }], cam: { s: [1, 1.04], c: [288, 520] },
    f: (tl, d, t) => cofreDentro({ t, camera: false }) + tForma(tPoli([[20, 320], [120, 320], [120, 800], [20, 800]]), '#4A3A30') + `<g transform="translate(120 560) scale(${.6 + .4 * Math.cos(t * 8)} 1)">${tForma(tPoli([[0, -240], [-100, -240], [-100, 240], [0, 240]]), '#6A5040')}</g>`
      + `<path d="M40 ${lerp(500, 300, sobe(0, d, tl))} q30 -60 60 0 v120 h-60z" fill="#000" opacity=".35"/>` + mesaMetal(700)
      + pT(comEtiqueta(MANAUS, 'MANAUS'), 300, 800, .6, t, { mascara: 'testa', olhar: [.3, .7], bD: { h: [60, 40], bend: 30 }, segura: `<g transform="scale(.5)">${pasta('MANAUS')}</g>` })
      + pT(comEtiqueta(RECIFE, 'RECIFE'), 460, 800, .6, t, { flip: true, mascara: 'testa', olhar: [.3, .7], bD: { h: [60, 40], bend: 30 }, segura: `<g transform="scale(-.5 .5)">${pasta('RECIFE')}</g>` }) },
  // 58 · escada em caracol (contra-plongée): Belém sobe correndo
  { l: 29, split: false, sfx: [{ t: .02, s: 'passo1', v: .4 }, { t: .2, s: 'passo2', v: .4 }, { t: .38, s: 'passo1', v: .4 }], cam: { s: [1, 1.08], c: [288, 560], c1: [288, 480] },
    f: (tl, d, t) => escadaCaracol(t) + pT(comEtiqueta(BELEM, 'BELÉM'), 300, lerp(900, 700, sobe(0, d, tl)), .6, t, { mascara: 'testa', walk: tl * 3, inclina: -.1, olhar: [.2, -.6] }) },
  // 59 · corredor vinho: a câmera avança até a porta dupla (placa ainda pequena)
  { l: 30, cam: { s: [1, 1.25], c: [288, 520], c1: [288, 380] }, f: (tl, d, t) => corredor719() },
  // 60 · close na placa SALA 719
  { l: 30, w: 9, split: false, blur: false, sfx: [{ t: .05, s: 'galeria/ding_2', v: .35 }], cam: { s: [1, 1.05], c: [288, 290] }, f: (tl, d, t) => corredor719({ placaS: 2.4 }) },
  // 61 · flash 0,4 s: o teclado 7-1-9 (memória)
  { l: 30, w: 12, split: false, blur: false, cam: { s: [1, 1], c: [288, 500] }, f: (tl, d, t) => memoria(fundoChapado('#2A2F38') + teclado(288, 500, 4.4, [7, 1, 9])) },
  // 62 · sala do dono: insert da luva soltando a máscara de porquinho em cima da mesa (o Mestre fora de quadro)
  { l: 31, split: false, sfx: [{ t: .3, s: 'galeria/rubber_snapping_2', v: .45 }], cam: { s: [1.4, 1.45], c: [288, 620] },
    f: (tl, d, t) => salaDono() + `<g transform="translate(300 ${lerp(480, 610, ease(sobe(.2, .6, tl)))}) rotate(${lerp(-20, 0, sobe(.2, .6, tl))}) scale(.55)">${tMascaraPorco('testa')}</g>` + (tl < .5 ? tMao(330, lerp(470, 560, sobe(0, .5, tl)), Math.PI / 2, 26, LUVA, false) : '') },
  // 63 · a cadeira gira: o Mestre de macacão aberto e gravata, o rosto dos retratos; sorriso de canto
  { l: 31, w: 7, split: false, sfx: [{ t: .05, s: 'rangido', v: .45 }], cam: { s: [1, 1.08], c: [288, 520] },
    f: (tl, d, t) => { const k = ease(sobe(0, .5, tl));
      return salaDono() + (k < .5 ? encosto(300, 820, 1.2 * (1 - k * 2) + .02) : encosto(300, 760, 1.1) + pT(MESTRE_DONO, 260, 820, .78, t, { sentado: true, olhar: [.3, 0], palpebra: .45, boca: { sm: .6, skew: .5 } })); } },
