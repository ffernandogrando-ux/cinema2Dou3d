# Guia de estilo do canal

O `FORMATO_CINEMA.md` manda sobre este guia. Aqui ficam as regras de imagem, câmera, ritmo e som, e os erros que os revisores já pegaram (EP01 e EP02), para não se repetirem.

## Roteiro (o resumo; o molde está no FORMATO_CINEMA.md)
- Narrador em 1ª pessoa, frases de 4 a 10 palavras, uma ação por frase, 310 a 360 palavras (cerca de 2:00).
- Causalidade com "mas / então / até que / foi aí que", nunca "e então".
- Números na tela. A virada fica numa tela ou objeto de 2 a 5 palavras. Nenhuma moral dita.
- Crítica ao sistema (banco, patrão, preço, aluguel) como fábula, nunca zombaria de um grupo de pessoas.
- Público adulto pode ter violência **sugerida**: ninguém apanha em quadro; o perigo é a máquina (paredões, alçapão).

## Enquadramento (obrigatório)
- A **legenda** fica a ~82 % da altura. Ela só pode cobrir chão, pés ou pernas: **nunca rosto, peito, texto de tela ou o objeto-chave do plano** (botão, balde, pilha).
- Todo texto de tela fica **acima de 65 %** da altura, em até 3 linhas.
- **Olhos entre 25 % e 55 %** da altura. Em `reacaoToon`, use `st.y` (1080–1120) para subir o rosto quando a legenda cair no peito.
- `node motor/render.js <ep> pt checar` tem que dar OK. Ele confere:
  - rosto na legenda;
  - cabeça cortada;
  - "só pernas";
  - fala sem boca;
  - o 1º e o último quadro de cada plano.

## Armadilhas do kit toon (já reprovaram planos)
1. **Braço da frente erguido cobre o rosto.** O braço da frente (`bD`) sai do ombro da frente e passa na frente da cara. Mão erguida, aceno, placa ou garrafa no alto vão no **braço de trás** (`bE` + `seguraE`). Taça, dedo e punho de guarda ficam baixos: `bD.h` com y entre −60 e +60.
2. **Gente sobreposta.** Dois personagens a menos de uma largura de cabeça se fundem, e um rosto tapa o outro. Em `s = .5`, separe pelo menos ~180 px; em `s = .8`, ~240 px.
3. **Membro ou objeto sem dono.** Mão entrando sozinha, corrente que fecha sozinha, "três dedos" no botão: quem age aparece inteiro, da cintura para cima no mínimo. Quem segura outro: os dois no quadro.
4. **A ação da frase tem que se completar na imagem.** O dedo encosta no botão, o martelo bate no gongo, a taça cai na arena, a vaia tem polegar para baixo e boca em U (punho erguido parece comemoração). Plantio de geografia (o pé que recua da borda do vidro) tem que ser visível.
5. **Apoio de verdade.** Quem cai "em cima da pilha" pousa dentro dela, com um saco na frente das pernas. Quem senta precisa de assento (`st.sentado` + poltrona; `st.chao` no chão). Nada de gente de pé sobre um vão aberto sem reagir.
6. **Borda no fim do movimento.** Push-in e travelling levam o personagem ou o objeto para fora no último quadro. Termine o movimento com tudo dentro (o `checar` agora confere o último quadro).
7. **Continuidade de elenco.** A mesma pessoa tem a mesma roupa em todos os planos, e figurantes **não** usam a roupa do protagonista ou do vilão: no EP02, o segurança de terno preto pareceu o dono no plano final. O vilão faz as ações do gancho.
8. **Escala de objetos entre planos.** A pilha de prêmios, o balde e o botão têm o mesmo tamanho relativo no plano-mestre e no close.
9. **Plano-mestre miúdo não substitui close.** No corte lateral, os personagens ficam pequenos: use-o para geografia e faça o close separado para a ação.
10. **Camadas de cor e de fundo além do quadro.** `fundoChapado` e as camadas de luz (HOLO, QUENTE) cobrem x/y −400 a 1400×2000; senão aparece uma faixa na borda quando a câmera treme.
11. **Texto em personagem espelhado** (`flip`) precisa ser desvirado. Fontes com número no nome vão entre aspas: `font-family="'Baloo 2'"`.
12. **Contorno invisível** (`st.invisivel`): ele é claro e tracejado para ler no vinho e no escuro. O que deve ficar sólido vai em `<g class="tSol">`.

## Câmera e ritmo
- Nenhum plano parado: push-in, pan, travelling, tilt, câmera na mão (`shake`), contra-plongée. **Varie o tipo de movimento a cada corte.** O EP02 abusou do push-in lento.
- Plano médio de ~1,3 a 1,5 s, com variação:
  - ~30 % de rajadas de 0,4–0,8 s (contagens, "Passei pelo…", "E de novo", quedas);
  - ~10 % de planos segurados de 2,2–4 s (revelação, gancho).
- Corte na palavra que nomeia a nova imagem.
- Close de reação depois de toda imagem absurda.
- O 1º plano (gancho) diz o gênero sem som: pose clara, ninguém cortado, nada ambíguo.
- No 3D (`bairroToon`): câmera nunca atravessa parede ou teto; termine a trilha antes de encostar na fachada.

## Som
- Voz pelo GenMax (Little Dude II), com pausas de 0,25 s.
- `EFEITOS_DB = -15`.
- Ambiente por lugar (`AMBIENTE`).
- Whoosh nas trocas de lugar (`WH_EM`).
- Efeito grande nos momentos-chave.
- Efeito pontual quando algo acontece na tela.
- Sem música. Volume final de −14 LUFS (o motor faz).
- Para gerar sons novos: `motor/sfx_eleven.py` (descrever em inglês, sempre "no music").

## Revisão visual (como trabalhar com os revisores)
1. `planos` gera `pt/revisao/`. **Olhe você mesmo** juntando 8 a 14 planos numa imagem:
   `ffmpeg -i plano_000.jpg -i … -filter_complex "[0][1][2][3]vstack=4[a];…hstack=2"`
   Corrija o óbvio antes de chamar o revisor.
2. Ao mandar a lista de mudanças para o revisor, cite os planos pelo número do storyboard e o arquivo (`plano_(N-1).jpg`).
3. O que não é bug técnico vai para a lista "depois". Aplique os itens baratos dela antes do vídeo final.
