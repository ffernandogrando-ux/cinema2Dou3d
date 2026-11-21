# Projeto: canal de cinema (desenho toon, gênero de filme com reviravolta)

Este repositório é independente: não depende de nenhum outro projeto. Regras, motor, sons e guias estão todos aqui.

## Ao começar uma conversa (mesmo que seja só "oi")
1. Ler **ESTADO.md** (onde estamos e o próximo passo) e **FORMATO_CINEMA.md** (o formato do canal; ele manda sobre os outros guias).
2. Responder com um resumo curto: o que foi feito e o que vamos fazer agora.
3. Ao fim da sessão, atualizar **ESTADO.md** se algo mudou.

## Guias (ler antes de criar ou alterar um episódio)
- `FORMATO_CINEMA.md`: emoção (raiva → justiça), batidas A–H, homenagens, visual, voz e som.
- `GUIA_DE_ESTILO.md`: enquadramento, ritmo, câmera e as **armadilhas do kit toon** (erros que os revisores já pegaram).
- `motor/acervo/CATALOGO.md`: peças prontas (kit `toon`, `toon3d`).

## Fluxo de um episódio (`episodios/epXX-nome/`)
1. **Espinha e roteiro.** Batidas A–H do `FORMATO_CINEMA.md`, escritas de trás para frente. Espinha aprovada pelo usuário; depois `pt/roteiro.md` + `pt/narracao.txt` (texto exato da voz). Revisor de roteiro + teste do espectador (abaixo).
2. **Voz.** `python3 -I motor/voz_genmax.py episodios/epXX/pt [voice_id]` (padrão: Little Dude II) → `python3 -I motor/alinhar.py episodios/epXX/pt`. O alinhador corta as pausas para 0,25 s na 1ª vez e guarda `voz_original.wav` (`PAUSA=0` desliga). Alternativas: voz gravada pelo usuário em `pt/voz.wav`, ou Gemini (`motor/voz_gemini.py`).
3. **Storyboard** `pt/storyboard.md`, gerado por um `pt/storyboard_planos.py` (cabeçalho com geografia, elenco e paletas + uma linha por plano, nos tempos do `palavras.json`; regenere ao trocar a voz). Revisor visual ≥ 8.
4. **`cenas.js` por blocos** (~26 planos cada): `//@acervo toon toon3d`, planos amarrados a linha/palavra (sobrevivem a troca de voz), `sfx`, `AMBIENTE`, whooshes. Para cada bloco: `checar` → `planos` → olhar as folhas você mesmo → revisor → `trecho`.
5. **Revisor final** com o episódio inteiro → `video` → entregar `video_final.mp4` + `faixa_voz.wav` + `faixa_efeitos.wav` (sem música) + `pt/publicacao.md` (título = 1ª frase + emoji, legenda sem pedir comentário, hashtags).

Comandos do motor (`node motor/render.js episodios/epXX pt <modo>`):
- `checar`: confere legenda, cortes e fala, inclusive no 1º e no último quadro de cada plano.
- `planos`: gera as folhas de revisão em `pt/revisao/`.
- `quadros t1,t2`: renderiza PNGs soltos, para conferir um plano rápido.
- `trecho a-b`: renderiza um pedaço.
- `video`: renderiza o episódio inteiro.

O cache é por plano: só refaz o que mudou, e `REFAZER=N` força um plano. Mudar `player.html`, `lib.js`, `AMBIENTE` ou a legenda refaz tudo; mudar peça do `cenas.js` ou do acervo refaz só os planos afetados.

## Regras do usuário
- **Aprovação = a do revisor** (15/11/2026): roteiro ≥ 7,8 e clareza do espectador ≥ 8,5; visual ≥ 8 e sem bug técnico. Mandar ao usuário as notas e os trechos só para ele acompanhar, sem esperar resposta.
- **Nunca parar sem motivo** (16/11/2026): etapa aprovada → seguir direto para a próxima. Só parar quando faltar algo que só o usuário dá (decisão de tema, aprovação da espinha, escolha de voz) ou com o vídeo entregue.
- **Revisor de roteiro independente** (`.claude/agents/revisor-roteiro.md`) em toda versão de roteiro ou espinha. Ele recebe só o caminho dos arquivos, nunca a opinião do autor.
- **Teste do espectador** (20/11/2026: "para o público brasileiro a mensagem tem que ser clara"): um agente novo lê só o `narracao.txt`, uma vez, e responde: a história em 2 frases, quem ganhou e quem perdeu, o que sentiu no último segundo, a mensagem em 1 frase, onde travou e a nota de clareza.
- **Revisor visual independente** (`.claude/agents/revisor-visual.md`) no storyboard e em cada bloco de quadros. Como rodar:
  1. Um revisor por bloco, do começo ao fim: a 1ª rodada é completa; nas seguintes, continuar o mesmo agente (SendMessage) só com a lista do que mudou.
  2. No máximo 2 rodadas por bloco. A 3ª só se ainda houver bug técnico (corte, oclusão, rosto ou texto na legenda, gente no ar); o acabamento vai para uma lista "depois".
  3. **Antes de chamar o revisor, olhe você mesmo as folhas** (junte 8–14 planos numa imagem com ffmpeg). Metade dos defeitos dá para pegar e corrigir antes da 1ª rodada.
  4. **Bug repetido em 2 episódios vira conferência no `checar`** (`player.html`).
  5. Um revisor novo e completo no fim, uma vez, antes do vídeo final.
  6. Enquanto um revisor lê `pt/revisao/`, não rodar `planos` de novo, ou rodar só quando as mudanças não tocam os planos dele.
- **Sem luz de cinema** (`cine.js` foi reprovado), **sem linha tremendo**, **sem pedir comentário**.
- **Som forte** (21/11/2026: "efeitos fracos… nada de transição"):
  - multidão e ambientes por lugar;
  - whoosh em toda troca de lugar;
  - efeito grande nos momentos-chave;
  - `EFEITOS_DB = -15`.
  - Ver `FORMATO_CINEMA.md` §6.
- **Nada fica sem salvar.** Ao terminar cada etapa (e antes de responder), `git status` + commit + push para o `main`. Fora do git só o que está no `.gitignore` (`_render/`, `pt/revisao/`, `trecho_*.mp4`).

## Acervo: nada de copiar episódio
- Antes de desenhar, procurar no `motor/acervo/CATALOGO.md`. Se a peça existe, usar; se falta um detalhe, acrescentar uma **opção** (`o.novaOpcao`, `st.novaOpcao`) sem mudar o padrão de quem já usa.
- Peça nova e exclusiva do tema fica no fim do `cenas.js`. **No 2º uso, mover para o acervo** (ex.: as peças da arena do EP02 vão para `motor/acervo/arena.js` quando a Parte 2 precisar delas).
- Nunca colar no `cenas.js` peça que já existe no acervo ou no motor: dá erro "already declared". Nomes já usados pelo motor: `PAI`, `SENHORA`, `INK`, `cl`, `ws`, entre outros. Confira com:
  `grep -ohE "^(const|let|function) \w+" motor/*.js motor/acervo/toon*.js`
- Depois de mexer no acervo: `python3 -I motor/acervo/catalogo.py` e `render.js … quadros` nos episódios que usam a peça.

## Peles de gênero (`estilos/`)
Cada episódio pode seguir a gramática de um `STYLE.md` de `estilos/` (cartelas, cortes, textura), sempre com o nosso kit toon. Esses `STYLE.md` são do Lemo-Opuscar (CC BY-NC + permissão para fazer os nossos filmes): **nunca** tornar este repositório público com eles dentro.

Responder ao usuário em português.
