# Projeto: canal de cinema (stickman, gênero de filme com reviravolta)

## Ao começar uma conversa (mesmo que seja só "oi")
1. Ler **ESTADO.md** (onde estamos e o próximo passo) e **FORMATO_CINEMA.md** (o formato do canal, que manda sobre os outros guias).
2. Responder com um resumo curto: o que foi feito e o que vamos fazer agora.
3. Ao fim da sessão, atualizar **ESTADO.md** se algo mudou.
4. **Levar tudo para o `main`.** Ao fim de cada etapa importante, abrir um PR do branch da conversa para o `main` e pedir ao usuário que dê Merge. Antes, conferir com `git fetch origin && git log origin/main..HEAD`.

## Peles de gênero (`estilos/`)
Cada episódio escolhe um estilo de `estilos/` (ver `estilos/README.md`) e segue a **gramática** do `STYLE.md` dele (cartelas, cortes, textura, cor), sempre com os nossos stickmen. Esses `STYLE.md` são do Lemo-Opuscar (CC BY-NC + permissão para fazer os nossos filmes): **nunca** tornar este repositório público com eles dentro.

## Acervo: nada de copiar episódio (regra de eficiência, 16/11/2026)
Cada episódio novo usa as peças prontas de `motor/acervo/` (personagens, cenários 2D e 3D, objetos, ajudantes) em vez de copiar o `cenas.js` de um episódio antigo. Até o EP13, cada episódio colava o anterior (o EP13 tinha 55% das linhas iguais ao EP11) e por isso o `cenas.js` cresceu de 130 para 800 linhas.
- **Antes de desenhar qualquer coisa**, procure no `motor/acervo/CATALOGO.md`. Se a peça existe, use; se falta um detalhe, acrescente uma **opção** à peça do acervo (`o.novaOpcao`), sem mudar o padrão de quem já usa.
- **Declarar no topo do `cenas.js`**: `//@acervo base elenco mundo_quem_deve objetos` (só os arquivos necessários). O `render.js` carrega esses arquivos antes do episódio.
- **Proibido** colar no `cenas.js` uma peça que já está no acervo (dá erro de "already declared") e proibido copiar peças de outro `cenas.js`: se um episódio precisa de uma peça que hoje só existe em outro episódio, **mova** a peça para o acervo (2º uso = vai para o acervo) e faça os dois episódios usarem de lá.
- **Depois de mexer no acervo**: `python3 -I motor/acervo/catalogo.py` (atualiza o catálogo) e confira os episódios que usam a peça com `render.js … quadros`.
- **Meta**: o `cenas.js` de um episódio novo tem a configuração, os atalhos do episódio e a lista `CENAS`; peças novas e exclusivas do tema ficam no fim. Alvo: até ~350 linhas.

## Regras
- **Aprovações do usuário dispensadas quando o revisor aprova** (regra do usuário, 15/11/2026): storyboard, blocos de quadros e roteiro seguem com a nota mínima do revisor (roteiro ≥ 7,8; visual ≥ 8 sem bug). Só mandar ao usuário a nota e as folhas, sem esperar resposta.
- **Nunca parar sem motivo** (regra do usuário, 16/11/2026): com a etapa aprovada pelo revisor, seguir direto para a próxima (storyboard → cenas.js → quadros → trecho → vídeo) na mesma resposta, sem esperar mensagem do usuário. Só parar quando faltar algo que só o usuário pode dar (voz, decisão de tema) ou quando o vídeo estiver entregue.
- **Revisor visual independente SEMPRE**, em duas etapas: o storyboard (antes do `cenas.js`) e os quadros de `render.js … planos` (antes de QUALQUER vídeo, inclusive de teste), com o agente `revisor-visual` (`.claude/agents/revisor-visual.md`), que caça bugs técnicos e confere qualidade. Nota ≥ 8 e nenhum bug. As folhas vão para o usuário **só para ele acompanhar**: a aprovação é a do revisor (regra do usuário, confirmada em 16/11/2026); não esperar resposta.
  **Como rodar (economia de tokens, regra do usuário desde o EP11):**
  1. **Um revisor por bloco, do começo ao fim.** A 1ª rodada é completa (todos os planos do bloco). Nas seguintes, continuar o **mesmo** agente (SendMessage) e pedir só a conferência dos defeitos que ele apontou, nos planos alterados. Ele continua independente: não é o autor e não recebe a opinião do autor, só a lista do que mudou.
  2. **Rodadas seguintes só sobre os planos alterados** (folhas e quadros desses planos), não o bloco inteiro. Ponto novo de acabamento que não é bug técnico vai para uma lista "depois", sem reprovar a rodada. **Limite: 2 rodadas por bloco.** Da 3ª em diante, só se ainda houver bug técnico (corte, oclusão, afundar no móvel, rosto na legenda); o resto vai para a lista "depois". (O bloco B do EP11 levou 10 rodadas.)
  2b. **Bug repetido vira checagem automática.** Se o revisor apontar o mesmo tipo de bug em 2 episódios, acrescente a conferência ao modo `checar` do `render.js`/`player.html` (como já é feito com rosto na legenda e personagem cortado), para ele ser pego antes do revisor.
  3. **Um revisor novo e completo no fim**, uma única vez, com o episódio inteiro, antes do vídeo final.
- **Renderizar em partes, sempre** (economiza tempo e tokens sem perder qualidade):
  - o episódio é feito **por blocos de cenas**: cada bloco passa pelo revisor e, aprovado, é renderizado com `trecho` (os quadros ficam no cache por plano);
  - **bug num plano → corrigir e renderizar só aquele plano** (`REFAZER=N`), nunca o vídeo inteiro;
  - o `video` final só junta o que já está no cache, renderiza o que faltar e codifica o MP4 inteiro de uma vez (sem emenda, mesma qualidade);
  - mudança no que é comum a todos os planos (legenda, HUD, cor, motor) refaz tudo automaticamente: evitar essas mudanças depois que os blocos já foram renderizados. Mexer num cenário ou numa peça do `cenas.js` refaz só os planos afetados (cada plano guardado é conferido com 3 quadros renderizados de novo).
- **Nada fica sem salvar.** Ao terminar cada etapa (e sempre antes de responder ao usuário), rodar `git status` e fazer commit + push de tudo que for do projeto, inclusive arquivos gerados que os outros episódios também guardam (`sons.json`, `palavras.json`, `storyboard.md`). Só fica fora o que está no `.gitignore` (`_render/` com o cache de quadros, `pt/revisao/`).
- **Revisor independente SEMPRE.** Toda versão de roteiro ou espinha passa pelo agente `revisor-roteiro` (`.claude/agents/revisor-roteiro.md`) antes de ir para o usuário. Se esse agente não estiver disponível, usar um agente genérico com as instruções desse arquivo. O revisor recebe só o caminho dos arquivos, nunca a opinião do autor. Mostrar as notas ao usuário junto com o roteiro. Só vai para a voz com nota geral ≥ 7,8; abaixo disso, corrigir e revisar de novo.
- **Teste do espectador SEMPRE, junto com o revisor de roteiro** (regra do usuário, 20/11/2026: "para o público brasileiro a mensagem tem que ser clara"). Um agente novo lê SÓ o `narracao.txt`, uma vez, como quem ouve no TikTok, e responde: a história em 2 frases, quem ganhou e perdeu no final, a mensagem em 1 frase, onde travou, nota de clareza. Só vai para a voz com **clareza ≥ 8,5** e revisor ≥ 7,8. (No EP01, o revisor deu 8,0 a um final que o usuário não entendeu: a nota do revisor não basta.)
Antes de criar ou alterar qualquer episódio, leia **FORMATO_CINEMA.md** e depois **GUIA_DE_ESTILO.md** e siga as regras (roteiro, enquadramento, ritmo, som). Onde os dois discordam, vale o FORMATO_CINEMA.md.

Fluxo de um episódio (`episodios/epXX-nome/`):
1. Preencher a espinha (batidas A–H do `FORMATO_CINEMA.md`, com as pistas e as homenagens listadas) e aprovar com o usuário. Depois, roteiro em `pt/roteiro.md` + `pt/narracao.txt` (texto exato da voz).
2. Voz do usuário em `pt/voz.wav` → `python3 -I motor/alinhar.py episodios/epXX/pt` (confere fala × roteiro e gera `palavras.json`).
3. **Storyboard** em `pt/storyboard.md` (plano a plano, nos tempos do `palavras.json`) → revisor visual independente `.claude/agents/revisor-visual.md` (nota ≥ 8, que já vale como aprovação). Só então: cenas em `cenas.js` (planos amarrados a linha/palavra; `sfx`, `foco`, `passos`, `AMBIENTE`).
4. `node motor/render.js episodios/epXX pt checar` (enquadramento: legenda, personagem cortado, objeto cortado) → `previa 2` (folha de contato) + quadros soltos de cada plano 3D → `video`. Ver "Qualidade do 3D" no guia (oclusão, chão sem piscar, sem cortes).
   O `video` (e o `trecho`) guarda os quadros **por plano** em `pt/_render/cache/`: na próxima vez, só renderiza de novo os planos que mudaram (código comum mudou → todos). Para forçar planos: `REFAZER=40,52 node motor/render.js … video`. O MP4 é sempre codificado inteiro de uma vez, sem emenda.
5. Entregar `video_final` + `faixa_voz.wav` + `faixa_efeitos.wav` (sem música).

Responder ao usuário em português.
