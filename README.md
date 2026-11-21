# cinema2Dou3d

Canal de animação em desenho toon (2D, com abertura em 3D) com histórias de **gênero de filme** (assalto, jogo mortal, loop temporal, investigação), em que o pequeno descobre a falha do sistema e vira o jogo: raiva → justiça.

- Formato: `FORMATO_CINEMA.md`
- Regras de imagem, ritmo, som e armadilhas do kit: `GUIA_DE_ESTILO.md`
- Estado e próximo passo: `ESTADO.md`
- Regras de trabalho (para o Claude): `CLAUDE.md`
- Motor (render com Playwright + three.js): `motor/` (`npm install` antes do primeiro render)
  - voz: `motor/voz_genmax.py` (GenMax / ElevenLabs), `motor/alinhar.py`
  - efeitos: `motor/sfx_eleven.py`, `sons/`
  - peças prontas: `motor/acervo/` (`CATALOGO.md`)
- Peles de gênero (gramática de cartelas e cortes): `estilos/` (licença CC BY-NC: o repositório não pode ser público com elas dentro)
