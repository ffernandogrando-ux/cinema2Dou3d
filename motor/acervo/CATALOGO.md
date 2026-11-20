# Catálogo do acervo

Gerado por `python3 -I motor/acervo/catalogo.py`. Não edite à mão.

Para usar: na 3ª linha do `cenas.js`, `//@acervo base elenco ...` com os arquivos que o episódio precisa.
Antes de desenhar qualquer peça, procure aqui. Se existir, use (passe opções). Se precisar mudar, mude no acervo.

## `base`

Ajudantes comuns: tempos por palavra, P3 (stickman no 3D), HUD, câmera de segurança, mão, fundo de tela.

- `ws`
- `cl`
- `_hudEv`
- `texPlaca(K, linhas, o = {})`
- `P3`
- `fundoTela(c)`
- `maoD(p, st)`
- `STK_D`
- `nivelEntre`
- `FIM_FALA`
- `segCam(t, cam, hora)`
- `horaSeg(t)`

## `elenco`

Personagens prontos: Dudu (DUDU, DUDU_C), Sofia (SOFIA, SOFIA_PIJ), MULHER, FIG (figurantes), SENHORA11, RICO, CANUDO e poses/estados prontos.

- `cabeloCurto`
- `bagLaranja(r, cy, o = {})`: bag térmica em cima da cabeça (sobre o boné)
- `DUDU`
- `SOFIA`
- `MULHER`
- `FIG`
- `SENHORA11`
- `RICO`
- `canudoHomem(x, y, s, t, bandeira = false)`: homem afundado até os olhos; o canudinho sai da lama na frente do rosto e sobe ao lado da bochecha
- `CANUDO`
- `sapatoAfundando(x, y, s, k, t)`
- `polegar`
- `n11()`
- `DUDU_C`
- `deitado2D(p, x, y, s, t, o = {})`
- `sofiaDormindo2D(x, y, s, t)`
- `sofiaDormindo3D(t)`
- `lanternaRosto(x, y, t)`
- `agachadoCorrente(x, y, s, t)`
- `tornozeloArgola(t, tl, panico = false)`
- `SOFIA_PIJ`
- `rostoHorror(t)`

## `mundo_quem_deve`

Mundo da série 'Quem deve, afunda': céu/lama/rua/interior 2D, cenários 3D rua11, quarto11, oco11, sala11 (opções no MUNDO.registrar), luzes, bolhas, respingos.

- `LAMA`
- `ceu2D(c1, c2, id)`
- `lama2D(y, t, o = {})`: superfície da lama do horizonte para baixo
- `casasLonge2D(y, seed = 3, cor = '#9AA3A6')`
- `rua2D(t, o = {})`
- `interior2D(t, o = {})`: parede de casa, a lama é o piso
- cenário 3D `rua11` (opções: azul, caido, casaFoco, cinza, corda, janelaAcesa, marmita, noite, ny, painel, revela, ruaPerto, semTorre, torreFina, tx)
- cenário 3D `quarto11`
- cenário 3D `oco11` (opções: cofre, semLuz)
- cenário 3D `sala11` (opções: alarme, cortado, gy, tela, telaFundo, telaLinhas, telaTinta)
- `animaSala`
- `animaNuvem`
- `genteRua(t, o = {})`
- `fundoBoleto(t)`
- `pontoOnibus(x, y)`
- `bolha3D(t, tl, pos)`
- `nuvensBaixo(t)`
- `nuvemBorda(t)`
- `respingo3D(t, tl, pos)`
- `noite2D()`
- `luzQuente(x, y, r)`
- `brilho3D(pos, m)`
- `sombraLonga(pos, alt)`
- `relogioRua(x, y, hora)`
- `painelVerde(x, y, val, s, pisca = 1)`
- `telaDividida(t, tl)`
- `respingo2D(x, y, tl)`
- `reflexoPainel(t, tl)`
- `paredeTorre2D(y, painel = true)`
- `quarto2D(t)`
- `bolhas3D(t, tl, pos)`
- `atravessaLama(t, tl, d)`
- `feixe3D(de, ate, op)`
- `ocoFundo2D(t)`
- `sombraPe3D(pos, k)`
- `poeira(t, tl)`
- `luzQuente2D()`
- `alarme2D(t)`
- `bolhasLama(t, tl, pos)`
- `salaFundo2D(t)`
- `feixe2D(t, tl, fundo = false)`
- `luzVermelha3D(pos, k)`
- `corteTransversal(t, tl)`: tudo entre ~10 % e 72 % da altura

## `objetos`

Objetos: sacola, celular, alicate, boleto, calendário, carimbo, xícara, pasta, jornal, guarda-chuva, cronômetro, app de empréstimo etc.

- `sacola`
- `celularSvg`
- `ALICATE`
- `pisca55(tl)`
- `reflexo55(t)`
- `mesa11(x, y)`
- `cadeira11(x, y, l = 1, e = 1)`
- `bagSolta(s = 1, aberta = 0, cortada = false, tc = 0)`
- `xicara11`
- `pasta11`
- `guardaChuva`
- `jornal11`
- `boleto(x, y, s, val, rot = 0)`
- `boletoBolso(x, y, s)`
- `placaAltura(x, y)`
- `desenho7`
- `etiquetaZero(x, y, s)`
- `calendario(x, y)`
- `celularGrande(linhas, cor, vibra = false)`
- `carimbo(x, y, txt, tl)`
- `regua3D(pos, nv = 0)`
- `celularLuz`
- `bagSolta3D(pos)`
- `correnteChao(pts, brilho)`
- `card11(t)`
- `linhaElos(x1, y1, x2, y2, r = 12)`
- `etqQuitado(x, y)`
- `alicateCorrente(t, tl)`
- `corteAlicate(t, tl)`
- `chicote3D(tl, de, ate)`
- `correnteCobra(tl, pe)`
- `argolaVermelha(pe, k)`
- `monitorSofia(t)`
- `puxaCorrente(x, y, s, t, tl)`
- `telaSistema(linhas, foto, t)`
- `appEmprestimo(x, y, apertou)`
- `aprovado(x, y, tl)`
- `cronometro(x, y, v)`

## `toon`

Gramática do "Sci-Fi Sitcom Toon" (Lemo-Opuscar, MIT no código): contorno grosso escuro de largura constante na tela,

- `TINK`
- `TLW`: espessura do contorno, em px de tela (constante em qualquer enquadramento)
- `_tN`
- `_p`
- `tSpl(c, fechado = true)`
- `tPoli`
- `tElip`
- `tForma(d, cor, sombra = '', lw = TLW)`
- `tTraco`
- `tPinta`
- `tMacarrao(a, b, bend, w0, w1)`
- `tOlho(cx, cy, rx, ry, o = {})`
- `tBoca(cx, cy, mw, o = {})`
- `tMao(x, y, ang, r, cor, punho)`
- `T_ALT`
- `toon(P, st = {})`
- `tCabeca(P, st, t)`
- `paredeToon(cor, corS, yChao, o = {})`
- `chaoToon(cor, corS, yChao, o = {})`
- `sombraContato`
- `reacaoToon(P, t, tl, st = {}, o = {})`
- `BOCAS`
- `pt`

## `toon3d`

Cenário 'bairroToon': rua de casas 3D com cor chapada de 2 tons (MeshToonMaterial) e contorno preto grosso (casca invertida),

- cenário 3D `bairroToon` (opções: ceu, corCasa, cores, garagem, grama, luz, semente)
- `p3T`
