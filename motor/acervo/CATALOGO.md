# Catálogo do acervo

Gerado por `python3 -I motor/acervo/catalogo.py`. Não edite à mão.

Para usar: na 3ª linha do `cenas.js`, `//@acervo base elenco ...` com os arquivos que o episódio precisa.
Antes de desenhar qualquer peça, procure aqui. Se existir, use (passe opções). Se precisar mudar, mude no acervo.

## `cine`

Barato: tudo é uma camada SVG por cima do plano (use em `over: (tl, d, t) => ...` do plano, que fica sobre a cena e sob a legenda).

- `_cN`
- `cEscuro`
- `cLuzChave(x, y, r, o = {})`
- `cFacho`
- `cBrilho`
- `cLuzLateral(lado = 1, o = {})`
- `cSirene`
- `cVinheta`
- `cFaixas`
- `cGrao`
- `cSilhueta`
- `CINE`

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
- `T_INV_CSS`
- `toon(P, st = {})`
- `tCabeca(P, st, t)`
- `paredeToon(cor, corS, yChao, o = {})`
- `chaoToon(cor, corS, yChao, o = {})`
- `sombraContato`
- `reacaoToon(P, t, tl, st = {}, o = {})`
- `BOCAS`
- `pt`
- `tMascaraPorco(modo, ab = 0, o = {})`
- `tOculos`
- `fundoChapado`
- `memoria`

## `toon3d`

Cenário 'bairroToon': rua de casas 3D com cor chapada de 2 tons (MeshToonMaterial) e contorno preto grosso (casca invertida),

- cenário 3D `bairroToon` (opções: banco, ceu, corCasa, cores, garagem, grama, luz, semente)
- `BANCO_LETREIRO`
- `p3T`
