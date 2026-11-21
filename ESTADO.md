# Estado do projeto (memória entre conversas)

> Atualizar ao fim de toda sessão que mude o rumo. Última atualização: **2026-11-21**.

## Onde estamos
- **Canal de TikTok de cinema** (nome ainda não decidido; sugestão: Plot Torto). O formato está em `FORMATO_CINEMA.md`: gênero de filme reconhecível + crítica ao sistema como fábula, com o motor **raiva → justiça** e o último segundo "bem feito!".
- **Visual:** kit toon (`motor/acervo/toon.js`) de corpo inteiro, cor chapada, abertura 3D (`toon3d.js`). Sem luz de cinema e sem linha tremendo.
- **Voz:** Little Dude II (ElevenLabs) pelo GenMax (`motor/voz_genmax.py`), com pausas de 0,25 s.
- **Som:** `EFEITOS_DB −15`, ambiente por lugar, whoosh nas trocas de lugar e efeitos grandes gerados no ElevenLabs (`motor/sfx_eleven.py`, `sons/arena/`, `sons/amb_*`). Também há a galeria FilmCow (`sons/galeria/`).
- **Repositório independente** desde 21/11/2026: foram tirados o material do canal anterior (peças de stickman do acervo, busca diária de referências, guias antigos). As transcrições do @zaylento.yt ficaram em `referencias/`, como apoio ao revisor de roteiro.

## Episódios
- **EP01 "O Assalto"** (`episodios/ep01-o-assalto/`): o vídeo da v3.1 foi entregue (1:56, voz Monu N). O usuário achou que faltou emoção, e o roteiro **v5.2** (motor raiva → justiça: o talento de trocar etiqueta vira a arma; o banco devolve as casas; "A gente voltou.") foi **aprovado pelo usuário**. **Falta:** a voz v5.2 (GenMax) e refazer os planos do final no `cenas.js` (o plantio do talento, a etiqueta colada no contrato, a polícia, as casas e a mãe).
- **EP02 "A Arena", Parte 1** (`episodios/ep02-a-arena/`): **entregue** (`pt/video_final.mp4`, 2:05, + faixas e `pt/publicacao.md`).
  - Storyboard: 8,5. Blocos A, B e C: 8,0 cada. Revisão final: 8,0.
  - Depois da entrega, o som foi refeito (pedido do usuário) e o plano final passou a mostrar o dono (terno branco) fechando a algema.
  - **Lista "depois" do revisor final, para a Parte 2:**
    - rajadas (só ~4 %);
    - legenda no peito nos closes;
    - o lutador da abertura parecido com o Caio;
    - luz de TV nas janelas do 3D;
    - esfregão com franja;
    - variar o movimento de câmera.

## Próximo passo
1. **EP02 Parte 2** (o faxineiro acorrentado contra o dono): espinha → revisor + espectador → voz GenMax → storyboard → blocos. Mover as peças da arena (`arenaCorte`, `arenaM`, `camaroteM`, `telao`, `telaoQ`, `botaoPed`, `alavanca`, `pilhaPremios`, `paredoes`, `multidao` e o elenco do EP02) para `motor/acervo/arena.js` (2º uso).
2. **EP01 v5.2:** voz pelo GenMax e refazer o final.

## Decisões do usuário (permanentes)
- **20/11:** canal próprio. Nada de imagem gerada por IA. Não pedir comentário. Sem abertura pelo final; o 1º segundo é a cena-ícone do gênero.
- **20/11:** a mensagem tem que ser clara para o público brasileiro (teste do espectador ≥ 8,5). Emoção primeiro: raiva → justiça, com crítica ao capitalismo permitida.
- **20/11:** sem luz de cinema; sem linha tremendo; efeitos da galeria em vez de sons sintéticos.
- **21/11:** pausas curtas na voz como padrão. Voz Little Dude II pelo GenMax.
- **21/11:** som forte, com multidão, ambiente e transições; o som do EP02 v1 estava "fraco e baixo".
- **21/11:** o vilão faz a ação do gancho; figurante não pode parecer o vilão.

## Como usar as chaves (já salvas no ambiente; nunca pedir de novo)
- **GenMax** (`api.genmax.io`, cabeçalho `xi-api-key`): voz. O pedido é assíncrono: POST `/v1/text-to-speech/{voz}` com `language_code: "pt"`, depois GET `/v1/history/{id}` e baixar `result.audio_url`. Tudo isso está em `motor/voz_genmax.py`.
- **ElevenLabs** (`api.elevenlabs.io`): só Music + Sound Effects (texto para fala dá 401). Os efeitos estão em `motor/sfx_eleven.py`.
- **Gemini** (`generativelanguage.googleapis.com`): voz de reserva (`motor/voz_gemini.py`, modelo `gemini-3.8-flash-tts`; o 2.5-pro deu 429).
