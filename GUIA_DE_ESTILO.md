# Guia de estilo do canal

Regras aprendidas com a referência (19 vídeos analisados em `referencias/`) e com o feedback do EP01.

## Roteiro (formato novo, a partir do EP03)
> **A partir do EP11, a estrutura do roteiro segue `ESTRUTURA_DO_ROTEIRO.md`** (espinha em 5 linhas, sinal mal lido, virada em 1 imagem + até 3 frases, no máximo 3 personagens com fala, um só final). Ela vale sobre o que estiver diferente abaixo.
Referência: `referencias/analise_historiasdertr.md` e `FORMATO_NOVO.md`. (EP01–EP02 seguiram o formato antigo, com Nico em 1ª pessoa e "Nesta cidade…".)
- **Narrador em 3ª pessoa.** Protagonista muda a cada episódio; nomes brasileiros (dona Cida, seu Otávio…).
- **1ª frase = regra do mundo, com abertura variada** ("Neste bairro…", "Nesse mundo…", cena no meio da ação, pergunta, final primeiro…). Nunca o mesmo tipo em dois episódios seguidos.
- 0–20 s: regra + 3 a 5 exemplos absurdos/engraçados e bem visuais.
- **Contador da regra na tela** (HUD no canto) que muda com o drama. **Desde o EP11 (pedido do usuário): o HUD não fica fixo.** Ele aparece só quando o número muda, com um pulinho, fica ~2 s e some.
- Escalada com números ("um real. Cinco. Vinte.").
- **Reviravolta plantada cedo** num detalhe que parece só enfeite; precisa ser surpreendente e justa.
- Final em eco (repete a regra com sentido novo) + **gancho de série** no último plano.
- **Crítica social como fábula:** criticar sistemas e comportamentos, nunca zombar de grupos; o narrador não explica a moral.
- 400–600 palavras para ~2:00. Frases curtas. Pergunta na tela entre 0:20 e 0:40.
- **Todo roteiro passa por revisão crítica independente antes de ir para o usuário.**

## Visual (formato novo)
- Stickman 2D desenhado: cabeça redonda grande, corpo e membros finos com contorno escuro, rosto simples.
- Profundidade por **luz, desfoque e cor**: brilho quente, sombra suave, desfoque de fundo, zoom com borrão de movimento, cenários em perspectiva.
- **Cor conta a história:** colorido no começo → dessatura para cinza quando piora → luz quente na virada.
- Close extremo (mão, olho, objeto) nos momentos-chave.
- **Cenários 3D nos planos de lugar e movimento** (`motor/mundo3d.js`, `g3d` no plano): blocos simples sem textura, sombra suave, neblina de fundo; stickmen 2D colados por cima (`MUNDO.pessoa`). Câmera sempre em trilha: voar por cima, descer até a rua, seguir o personagem, subir junto com algo (vapor, olhar).
- Planos 2D ficam para closes de emoção e gráficos (preço, placa, calendário); neles usar profundidade (`prof(z, …)`, objeto desfocado em primeiro plano, `rot` na câmera).
- Testar um trecho antes do episódio inteiro: `node motor/render.js <ep> pt trecho 0-11`.

## Câmera de cinema (sensação de animação 3D, a partir do EP07)
- **~40 % dos planos em 3D** (`g3d`), com câmera que se move como numa animação 3D:
  - `MUNDO.orbita(centro, raio, altura, ang0, ang1, k)` — gira em volta do personagem (raio/altura podem ser `[de, até]`).
  - `MUNDO.grua(centro, [raio, alt, ang], [raio, alt, ang], k)` — sobe/desce olhando o alvo.
  - `MUNDO.dolly(centro, direção, dist0, dist1, largura, k)` — efeito vertigem (fov compensa) na revelação.
  - `MUNDO.trilha([...], k)` — voos e travellings; `mao: 0.03–0.08` = câmera na mão nos momentos tensos.
  - `dof: 2–5` = desfoque do cenário quando um personagem 2D está nítido na frente. Borrão de movimento é automático em giros/voos rápidos (`mb: false` desliga).
- **Planos 2D em 2,5D:** `camadas([[z, svg, desfoque], ...])` com fundo longe e desfocado (z 2,5–4), meio (z 1) e objeto em primeiro plano desfocado (z 0,6–0,75), com deslocamento lateral real da câmera (c0→c1 ≥ 60 px) para dar paralaxe.
- Nenhum plano parado; variar o tipo de movimento a cada corte.

## Qualidade do 3D (feedback do usuário nos EP07–EP10 — obrigatório)
Problemas que apareceram e não podem se repetir:
- **Chão/calçada piscando ou "bugando"** (z-fighting e acne de sombra). O motor já corrige (terreno abaixo de 0, faixas de rua escalonadas, `logarithmicDepthBuffer`, `normalBias`). Nos cenários próprios: **nunca** pôr dois pisos na mesma altura (diferença ≥ 1 cm) e, em luz própria com sombra, usar `sol.shadow.normalBias = .04`.
- **Personagem atravessando objeto** (balcão, poste, porta). O motor tem **oclusão**: o 3D que está na frente do personagem é redesenhado por cima dele, pela silhueta. Personagem em cenário 3D sempre via `MUNDO.pessoa(...)` (oclusão automática). Se o episódio tiver helper próprio, chamar `MUNDO.ocluir(pos, altura, svgDoPersonagem)`. Para desligar num plano: `ocl: false`.
- **Personagem cortado** (só as pernas aparecendo, topo da cabeça fora, cabeça cortada na lateral) e **objeto importante cortado** (roda da bicicleta, placa). O `checar` agora acusa tudo isso. Marcar os objetos que não podem sair cortados com `marca('bicicleta', x, y, raio)` no 2D ou `MUNDO.marca('bicicleta', pos3d, raioMetros)` no 3D. Corte proposital (alguém entrando em quadro, plano por cima do ombro) só com `semCorte: true` no personagem.
- **Desproporção** (criança maior que a porta). No 3D a escala vem de `MUNDO.pessoa` (altura real). No 2D, conferir a altura do personagem contra porta (≈ 2,1 m), balcão (≈ 1,1 m) e bicicleta.
- **Câmera atravessando teto/parede** (cenário "some" e as pessoas flutuam no vazio — EP10). Câmera nunca acima do teto nem dentro de parede/objeto; em cenário com teto, a grua sobe no máximo até ~0,5 m abaixo dele. O `checar` acusa "câmera atravessando".
- **Gancho (1º plano) limpo e legível:** pose clara (nada de animação de andar torta), nada girando no ar sem motivo, ninguém cortado. É o quadro que decide se a pessoa fica.
- **Nunca membro solto:** braço/mão entrando sem o dono no quadro parece defeito. Se alguém puxa ou segura outro, os dois aparecem.
- **Objeto tem que ser entendível de cara:** nada de peça de adulto encolhida em cima de bebê, por exemplo. Se precisar explicar, refazer (bebê no bercinho, bracinho visível, carimbo descendo).
- **Sentado precisa de assento:** ninguém sentado no ar (fila de espera, sofá, cadeira). Pernas não atravessam o móvel; o corpo encosta no assento.
- **Objeto preso onde deve estar:** velas no bolo, chapéu na cabeça, nada flutuando sem motivo.
- **Nada de plano só de perna/pedaço do stickman:** perna sozinha de stickman parece dois postes. Detalhe só de mão com objeto, rosto ou objeto inteiro.
- **A imagem mostra o que a frase diz:** "o gato deitou em cima dele" = o gato EM CIMA dele. Conferir cada plano contra a frase.
- **Boca mexe nas falas:** quem fala recebe `falante: true` no plano; o motor mexe boca e mão só durante as palavras entre aspas. O `checar` acusa fala sem boca mexendo (título entre aspas, como nome de programa, pode usar `semFala: true`).
- **Revisão visual obrigatória:** `node motor/render.js <ep> pt planos` gera `pt/revisao/` (início/meio/fim de cada plano + frase, em folhas de 4 planos). Um revisor independente olha TODAS as folhas e lista os planos com: personagem cortado/voando/desproporcional/atravessando objeto, objeto solto ou incompreensível, membro sem dono, imagem que não bate com a frase, cenário vazio ou piscando. Corrigir tudo antes do `video`; só renderiza com nota de acabamento ≥ 8 (o EP07 tirou 5 na calibração — ver `episodios/ep07-falecido/pt/revisao_visual.md` como exemplo do que é cobrado).
- **Antes do render final:** `checar` tem que dar OK (ou só cortes propositais, listados na resposta) e é obrigatório OLHAR quadros soltos de todos os planos 3D em movimento (início, meio e fim de cada plano), não só a folha de contato.

## Roteiro: processo de revisão
- **Obrigatório em TODA versão** (espinha, rascunho, versão final): o revisor independente `.claude/agents/revisor-roteiro.md`. O usuário vê as notas junto com o roteiro.
- Rascunho → revisor independente (nota 0–10 em lógica, gancho, virada, emoção, eco, crítica, fala, repetição) → versão 2 → 2ª revisão → ajustes finais. Só vai para voz com nota geral ≥ 7,8.
- Evitar repetir no mesmo lote: tipo de abertura, idosa como chave emocional, "do outro lado da cidade" no fim, pai-que-falha. Gancho de série pode anunciar o mundo do próximo episódio.

## Enquadramento (regra obrigatória)
- **Legenda** fica em ~82% da altura da tela (centro). Ela só pode cobrir chão, pés ou pernas — **nunca rosto ou peito**.
- **Olhos dos personagens entre 25% e 55% da altura** (linha do olhar do espectador). Plano aberto: pés em ~75%, logo acima da legenda.
- O motor sobe a câmera sozinho quando um rosto fica baixo (`AUTO_ENQ`), mas **sempre rodar a checagem antes do render**:
  `node motor/render.js episodios/<ep> pt checar` → precisa dar "OK: nenhum rosto na zona da legenda."

## Ritmo e movimento (medido na referência, ver `referencias/analise_historiasdertr.md`)
- Plano médio ~1,3 s, mas **variado** (nada de metrônomo):
  - ~30 % rajadas de 0,4–0,8 s: contagens ("um real. Cinco. Vinte."), listas, susto, escalada.
  - ~50 % planos normais de 0,8–1,6 s.
  - ~10 % **seguradas de 2,2–4 s** nos momentos de emoção/revelação (`split: false` no plano).
- **Corte em cima da palavra que nomeia a nova imagem**, muitas vezes no meio da frase, não só no começo dela.
- Quase tudo corte seco; flash branco só em susto/revelação; punch-in e mudança de luz na mesma cena contam como corte.
- Conferir o vídeo pronto: `python3 -I motor/medir_cortes.py <video>` (compara com a distribuição da referência).
- Câmera sempre em movimento (zoom/deslocamento), desfoque rápido no corte.
- Personagens nunca parados: respiram, mexem braços, gesticulam ao falar.

## Som
- Voz gravada por nós; o motor confere a voz contra o roteiro (`motor/alinhar.py`).
- Efeitos pontuais **com sentido** (pedra, latido, passos, porta, interruptor, coração, impacto, brilho).
- **Nada de som contínuo de preenchimento** (passarinhos, grilos, zumbido, ruído de fundo). Efeito só quando algo **acontece na tela** (sino toca, bola quica, porta range, alguém anda). Única exceção: chuva/tempestade enquanto aparece chovendo. Onde não acontece nada, fica silêncio.
- Muitos efeitos, sim — mas sempre ligados a uma ação visível.
- Sem whoosh em todo corte (vira chiado); whoosh só em troca de cenário.
- Sem música: a música é colocada depois pelo editor/no app. Entregar vídeo + `faixa_voz.wav` + `faixa_efeitos.wav`.
- Volume final: -14 LUFS.
