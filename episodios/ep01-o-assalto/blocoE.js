  // ---------------------------------------------------------------- BLOCO E (64–79): a tela, a virada, o flash de pistas, o final
  // 64–67 · a tela (fundo preto, letras verdes de terminal), texto digitado
  ...[[32, 0, ['SEGURO DO ASSALTO:'], 'galeria/ding_1'], [32, 6, ['SEGURO DO ASSALTO:', 'R$ 2 BILHÕES'], 'galeria/ding_2'], [33, 0, ['CULPADOS:'], 'galeria/ding_1']].map(([l, w, linhas, som], i) => ({ l, w, split: false, blur: false, sfx: [{ t: .02, s: som, v: .3 }],
    cam: [{ s: [1, 1.05], c: [288, 470] }, { s: [1.05, 1.12], c: [288, 500] }, { s: [1, 1.04], c: [288, 450] }][i],
    f: (tl, d, t) => telaTerminal(linhas, sobe(0, .5, tl), i === 1) })),
  { l: 33, w: 3, split: false, blur: false, sfx: [{ t: .05, s: 'galeria/drum_bonk_1', v: .4 }, { t: .3, s: 'galeria/drum_bonk_2', v: .4 }, { t: .55, s: 'galeria/drum_bonk_3', v: .4 }], cam: { s: [1, 1.04], c: [288, 470] },
    f: (tl, d, t) => telaTerminal(['CULPADOS:'], 1) + [[MANAUS, 'MANAUS'], [RECIFE, 'RECIFE'], [BELEM, 'BELÉM']].map(([P, n], i) => tl > i * .25 ? fichaMini(P, n, 120 + i * 168, 470, t) : '').join('')
      + (tl > .75 ? `<text x="288" y="690" font-family="VT323" font-size="64" text-anchor="middle" fill="#7CFFB2">3 DEVEDORES</text>` : '') },
  // 68 · reação do Belém (rosto descoberto), push-in lento, dutch; silêncio
  { l: 34, split: false, blur: false, cam: { s: [1, 1.12], c: [288, 470], rot: [0, -6] },
    f: (tl, d, t) => reacaoToon(comEtiqueta(BELEM, 'BELÉM'), t, tl, { y: 1130, mascara: 'testa', olhar: [.6, 0], olhos: tl > .4 ? 'arregalados' : null, palpebra: lerp(.4, 0, sobe(0, .4, tl)), boca: { o: .2 * sobe(.3, .8, tl), w: .5 }, sobr: sobe(0, .6, tl), agito: .3 }, { fundo: VINHO.parede, forma: VINHO.paredeS }) },
  // 69 · o Mestre na cadeira, braços abertos, retratos dele na parede; sorriso de canto
  { l: 35, cam: { s: [1, 1.05], c: [288, 520] },
    f: (tl, d, t) => salaDono({ tela: telaMini(['SEGURO: R$ 2 BI']) }) + encosto(300, 760, 1.1) + pT(MESTRE_DONO, 260, 820, .78, t, { sentado: true, olhar: [.3, 0], palpebra: .4, boca: { sm: .8, skew: .5 }, bD: { h: [130, -10], bend: 20 }, bE: { h: [-140, -10], bend: -20 } }) },
  // 70–74 · FLASH DE PISTAS (memória em tom vermelho, uma imagem por plano)
  { l: 36, split: false, blur: false, sfx: [{ t: .02, s: 'galeria/slide_whistle_down_1', v: .25 }], cam: { s: [1, 1.03], c: [288, 470] },
    f: (tl, d, t) => flashPista(fundoChapado(SAG.parede) + retratoDono(400, 250, .85, t) + pT(JAIRO, 230, 1240, 1.5, t, { olhar: [.1, 0], palpebra: .7, bD: { h: [20, 60], bend: 60 }, segura: copoCafe, semCorte: true, nocheck: true, still: true })) },
  { l: 36, w: 2, split: false, blur: false, cam: { s: [1.3, 1.3], c: [480, 430] }, f: (tl, d, t) => flashPista(saguao({ t, retrato: false, alarme: 1, ax: 480, ay: 420 })) },
  { l: 36, w: 4, split: false, blur: false, cam: { s: [1, 1.03], c: [288, 520] }, f: (tl, d, t) => flashPista(cofreDentro({ t, camera: false })) },
  { l: 36, w: 5, split: false, blur: false, cam: { s: [1, 1.03], c: [288, 420] }, f: (tl, d, t) => flashPista(fundoChapado('#2A2F38') + teclado(288, 420, 3.9, [7, 1, 9])) },
  { l: 36, w: 11, split: false, blur: false, cam: { s: [1, 1.04], c: [288, 290] }, f: (tl, d, t) => flashPista(corredor719({ placaS: 2.4 })) },
  // 75 · a tela da câmera de segurança: Belém sem máscara, com a chave na mão, "SUSPEITO"
  { l: 37, split: false, sfx: [{ t: .1, s: 'galeria/ding_3', v: .3 }], cam: { s: [1, 1.05], c: [288, 470] },
    f: (tl, d, t) => fundoChapado('#141018') + tForma(tPoli([[40, 200], [536, 200], [536, 700], [40, 700]]), '#1E2A22')
      + `<defs><clipPath id="telaCam"><rect x="40" y="200" width="496" height="500"/></clipPath></defs><g clip-path="url(#telaCam)"><g style="filter:grayscale(.85)">${fundoChapado(COF.paredeS)}${pT(comEtiqueta(BELEM, 'BELÉM'), 290, 900, .9, t, { mascara: 'testa', olhar: [.4, .6], bD: { h: [80, 30], bend: 30, punho: true }, segura: CHAVE(.4), nocheck: true, semCorte: true })}</g></g>`
      + tTraco('M40 200 H536 V700 H40Z', TLW * 1.4) + `<circle cx="80" cy="240" r="10" fill="#FF3B30"/><text x="100" y="250" font-family="VT323" font-size="34" fill="#FF3B30">REC</text>`
      + (tl > .3 ? `<rect x="150" y="600" width="276" height="64" fill="#C0392B"/><text x="288" y="646" font-family="'Baloo 2'" font-weight="800" font-size="46" text-anchor="middle" fill="#fff">SUSPEITO</text>` : '') },
  // 76 · flagrante: Belém de mãos para o alto, a chave numa delas; lanternas e giroflex desenhados; o Mestre sentado ao fundo
  { l: 38, sfx: [{ t: 0, s: 'galeria/siren_whistle_2', v: .35 }], cam: { s: [1.05, 1.1], c: [288, 500] },
    f: (tl, d, t) => { const az = Math.floor(t * 4) % 2;
      return salaDono() + encosto(470, 760, .8) + pT(MESTRE_DONO, 440, 820, .56, t, { sentado: true, olhar: [-.4, 0], boca: { sm: .7 }, nocheck: true })
        + pT(comEtiqueta(BELEM, 'BELÉM'), 230, 830, .78, t, { mascara: 'testa', olhos: 'arregalados', sobr: 1, boca: { o: .5, w: .6 }, bD: { h: [50, -190], bend: 30 }, bE: { h: [-50, -190], bend: -30 }, segura: CHAVE(.3) })
        + `<path d="M-40 300 L180 620 L60 700Z" fill="#FFF3B0" opacity=".35"/><path d="M620 260 L330 620 L460 700Z" fill="#FFF3B0" opacity=".3"/>`
        + `<rect x="-50" y="-50" width="676" height="1124" fill="${az ? '#2B5BFF' : '#FF2B3A'}" opacity=".14"/>`; } },
  // 77 · ficha policial rápida: régua de altura, Belém com a plaquinha; a chave num saquinho de prova ao lado
  { l: 38, w: 6, split: false, blur: false, sfx: [{ t: .05, s: 'galeria/ding_1', v: .4 }], cam: { s: [1, 1.03], c: [288, 470] },
    f: (tl, d, t) => fundoChapado('#B9BEC4') + [0, 1, 2, 3, 4, 5, 6].map(i => tTraco(`M0 ${200 + i * 90} H576`, TLW * .6, '#8A9098') + `<text x="20" y="${195 + i * 90}" font-family="'Baloo 2'" font-weight="800" font-size="22" fill="#5A6068">${190 - i * 10}</text>`).join('')
      + pT(BELEM, 250, 1150, 1.25, t, { mascara: 'testa', olhar: [0, 0], palpebra: .5, boca: { sm: -.4 }, semCorte: true, nocheck: true, agito: .2, bD: { h: [-30, 80], bend: 40 }, segura: `<g transform="translate(-20 10)">${tForma(tPoli([[-90, -30], [90, -30], [90, 30], [-90, 30]]), '#1b1422')}<text x="0" y="12" font-family="'Baloo 2'" font-weight="800" font-size="34" text-anchor="middle" fill="#fff">BELÉM</text></g>` })
      + `<g transform="translate(470 330) rotate(8)">${tForma(tPoli([[-60, -80], [60, -80], [60, 80], [-60, 80]]), '#E9F2F7')}${CHAVE(.8)}<text x="0" y="66" font-family="'Baloo 2'" font-weight="800" font-size="20" text-anchor="middle" fill="#C0392B">PROVA Nº 1</text></g>`
      + (tl < .12 ? `<rect x="-50" y="-50" width="676" height="1124" fill="#fff" opacity="${1 - tl / .12}"/>` : '') },
  // 78 · o quarto de aluguel: a mãe sentada na cama, aperta a chave e olha a janela; sirene longe
  { l: 39, cam: { s: [1, 1.06], c: [288, 520] },
    f: (tl, d, t) => quartoMae() + camaAtras() + pT(MAE, 160, 800, .74, t, { sentado: true, olhar: [.8, -.4], palpebra: .55, boca: { sm: -.4 }, bD: { h: [-40, 70], bend: 40, punho: true }, segura: CHAVE(.3), agito: .4 }) },
  // 79 · fachada do prédio de aluguel à noite, uma janela acesa, afastamento lento; 2 s de silêncio
  { l: 39, w: 10, split: false, sfx: [{ t: .2, s: 'galeria/siren_whistle_3', v: .12 }], cam: { s: [1.25, 1], c: [300, 470] },
    f: (tl, d, t) => fachadaNoite() },
