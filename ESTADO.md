# Estado do projeto (memória entre conversas)

> Atualizar ao fim de toda sessão que mude o rumo. Última atualização: **2026-11-20**.

## Onde estamos
- **Canal novo de TikTok** (nome sugerido: **Plot Torto**, irmão do Regra Torta; ainda não decidido). Formato em `FORMATO_CINEMA.md`: gênero de filme reconhecível + reviravolta que revela a crítica social + easter eggs que são as pistas.
- **Motor:** cópia do motor do anima-ovitinho em 20/11/2026 (stickman 2D + 3D, acervo, sons, revisores). A partir daqui os dois motores andam separados; melhoria importante de um pode ser levada ao outro à mão.
- **Peles de gênero:** 6 estilos do Lemo-Opuscar em `estilos/` (ver `estilos/README.md`, inclusive a licença).
- **Próximo passo:** escolher o piloto (O Assalto, Segunda-feira ou Processo Seletivo) → espinha → revisor-roteiro (≥ 7,8) → narração → voz do usuário. Antes do 1º render: pôr no motor as faixas de cinema com a legenda dentro da faixa de baixo.

- **2026-11-20: teste de estilo `episodios/teste00-flash/`** (9 s, "Processo Seletivo"): pele `text-flash-cuts` em modo **híbrido** (stickman chapado em silhueta, tudo em código, sem gerar imagem; decisão do usuário). Opinião prévia de um agente independente; narração no Fish Audio (`motor/voz_fish.py`); revisor visual 7,0 → **8,5 ✅**; `pt/video_final.mp4` entregue. Motor ganhou: `MOLDURA(t, pl)` (faixas de cinema), `ESTILO_CSS` (legenda dentro da faixa), `SEM_VINHETA` (fundo chapado) e as serifadas de cartela (Shippori Mincho B1, Playfair Display). Lista "depois" do revisor: janelinhas cortadas pela diagonal no prédio, vão branco reto no plano da janela, fenda final parada. Próximo: opinião do usuário sobre o teste → estrutura de roteiro e o piloto.

## Decisões
- 2026-11-20: canal novo (não uma temporada dentro do Regra Torta), decisão do usuário.
- 2026-11-20: sem abertura pelo final (já falhou no EP10 do Regra Torta); o 1º segundo é a cena-ícone do gênero, com narração desde o início.
- 2026-11-20: nada de imagem gerada por IA; a pele de anime é feita em código (híbrido).
- 2026-11-20: não pedir comentário de forma direta; os easter eggs geram a conversa sozinhos.
