# Storyboard v2 · EP02 A Arena, Parte 1 (gerado por `storyboard_planos.py`)

Voz: Little Dude II (ElevenLabs pelo GenMax) com pausas de 0,25 s, 2:03 (`palavras.json`) + 2 s de silêncio. Kits: `toon` (personagens), `toon3d` (plano 3: bairro de tijolo; janelas com luz de TV piscando = opção nova do `bairroToon`), galeria de efeitos. Cor chapada, **sem luz de cinema** (reprovada em 20/11). 9:16, legenda a ~82 %; todo texto de tela acima de 65 % da altura.

**Regras deste storyboard:**
- **Violência só sugerida** (público adulto, mas TikTok): ninguém apanha em quadro; as paredes que fecham são o perigo; os ricos caem em cima de sacos macios.
- **Geografia fixa (v2), mostrada no plano-mestre em CORTE LATERAL** (planos 1, 11, 18, 22–23, 63–64): o camarote fica em balanço sobre a areia. **Piso firme** (esquerda, encostado na arquibancada): a porta da escada de serviço (com o SEGURANÇA), as poltronas de veludo, o tapete vermelho do DONO na beira e, no pilar entre o piso firme e o vidro, a **alavanca "PRÊMIOS"** atrás de uma corda de veludo. **Frente de vidro** (direita, por cima da arena): os ricos de pé apostando e vaiando, o **pedestal do botão "MAIS EMOÇÃO"** e, no meio, o **alçapão com a pilha de prêmios**. Quando a alavanca abre tudo, cai só a frente de vidro: os prêmios primeiro, os ricos por cima, o botão junto. O dono nunca pisa no vidro, por isso não cai.
- A **escada de serviço** liga o corredor da arena à porta do camarote. É por ela que o Davi sobe e que o povo sobe no fim (já visível no plano 1).
- **Plantios antes da virada:** a geografia (1, 11), o vidro sobre a arena (18), a alavanca (20–21), o alçapão abrindo e os prêmios caindo (22–23), o dono recuando o pé da borda (24).
- **Arquibancada de pé, gritando** nos planos 1 e 39. No 47 ela senta em onda, de braços cruzados: é protesto.
- **Ninguém sem dono:** toda mão, pé ou objeto que se move pertence a um personagem inteiro no quadro (cintura para cima, no mínimo).
- **Arco de cor:** holofotes brancos até o botão; **vermelhos** do plano 41 (paredes) ao 61; **luz quente** a partir da alavanca (62). Fundos 2D em 2–3 camadas com paralaxe leve.
- **Invisível:** Davi fica em contorno pontilhado (`st.invisivel`, peça nova) do plano 55 ao 79. No 78, quando o dono sorri para ele, o contorno treme (foi visto). No 80 o segurança fecha a algema e ele volta a ser sólido.
- **Davi** sempre com o **balde amarelo** e o esfregão; boné virado.
- **Telão**: preto, letras de LED vermelhas, sempre o mesmo quadro e a mesma fonte; cada aparição tem um movimento diferente (push-in, tilt, tremor, visto da areia com a Lia na frente). Texto em até 3 linhas, acima de 65 % da altura.
- **Poses do kit toon**: tudo em 3/4; câmera variando a cada corte; **close de reação** depois de cada imagem absurda.

**Elenco (kit toon):** DAVI (20 e poucos, macacão de faxina azul-petróleo, boné virado, barba rala, balde amarelo); LIA (16, rabo de cavalo, camiseta laranja, tênis gasto); CAIO (18, magro, regata branca, cabelo raspado); O DONO (50 e poucos, terno branco, gravata dourada, bigode fino, anel grosso, dente de ouro); RICAÇO (gordo, smoking, taça); PREFEITO (faixa verde-amarela, coxinha na mão); SEGURANÇA (óculos escuros, ponto no ouvido); povo da arquibancada (silhuetas coloridas simples).

**Paletas:** bairro (tijolo laranja, céu fim de tarde); arena (areia ocre, concreto cinza, holofotes brancos); camarote (vinho, dourado, vidro azul-claro); padaria (creme e marrom); memória (sépia dessaturado); telão (preto e vermelho LED).


**Peças novas para o acervo:** arena (fosso, arquibancada em silhueta, parede móvel), camarote em corte, telão de LED, botão no pedestal, alavanca com corda, gongo, grade de portão, sacos de prêmio, balde e esfregão, taça e champanhe, plaquinha de aposta, padaria, sofá e TV; no `toon.js`, `st.invisivel` e `st.chao` (sentado no chão), corrente/algema de pulso toon. Peças do EP01 com 2º uso vão para o acervo: tela (base do telão), poltrona do dono, flash de memória, fundo chapado.

| # | Tempo | Âncora | Trecho da fala | Câmera / enquadramento | Imagem e ação | Cor do lugar | Efeitos |
|---|---|---|---|---|---|---|---|
| 1 | 0,00–2,34 (2,34 s) | 0:0 | Nesta cidade, todo domingo, os | PLANO-MESTRE em corte lateral, câmera desce devagar | dois lutadores grandes e legíveis em guarda na areia (pose de luta), a arquibancada de pé gritando, o camarote de vidro em balanço por cima; escada de serviço no canto | arena ocre/concreto | multidão gritando |
| 2 | 2,34–4,48 (2,14 s) | 0:5 | pobres lutam entre si na arena. | close a dois dos lutadores, câmera na mão | dois homens magros de roupa rasgada, sem armas, se encarando | arena ocre/concreto | respiração |
| 3 | 4,48–5,42 (0,94 s) | 1:0 | A cidade inteira | 3D bairro de tijolo (bairroToon), câmera desce até uma janela | casinhas de tijolo; em todas as janelas a mesma luz de TV piscando | bairro tijolo | vento, TV ao longe |
| 4 | 5,42–6,72 (1,30 s) | 1:3 | assiste pela TV. | sala de casa pobre, plano médio, push-in | família inteira no sofá rasgado olhando a TV (na tela, a arena em miniatura) | bairro tijolo | chiado de TV |
| 5 | 6,72–8,82 (2,10 s) | 1:6 | E os ricos apostam do camarote. | camarote, frente de vidro, travelling lateral | ricos de pé no vidro erguendo plaquinhas de aposta com cifrão | camarote vinho/dourado/vidro | risadas, tilintar de taça |
| 6 | 8,82–10,82 (2,00 s) | 2:0 | Quem ganha leva um mês de comida. | telão, push-in | "PRÊMIO: 1 MÊS DE COMIDA" com o desenho de um saco de arroz | telão preto/LED vermelho | plim de LED |
| 7 | 10,82–11,38 (0,56 s) | 3:0 | Quem reclama | rua do bairro, plano médio | um homem ergue um cartaz "PÃO CARO" | bairro tijolo | grito |
| 8 | 11,38–13,02 (1,64 s) | 3:2 | vira atração especial. | plano a dois | um guarda de colete laranja e quepe (não é o SEGURANÇA do camarote) cola no peito dele o adesivo "ATRAÇÃO ESPECIAL" | bairro tijolo | adesivo colando |
| 9 | 13,02–13,90 (0,88 s) | 4:0 | Quem faz rebelião | arena, contra-plongée | um lutador com correntes nos pulsos, de cabeça baixa | arena ocre/concreto | corrente arrastando |
| 10 | 13,90–15,34 (1,44 s) | 4:3 | luta acorrentado. | reação: close de um senhor na arquibancada | ele tapa a boca | arena ocre/concreto | — |
| 11 | 15,34–16,32 (0,98 s) | 5:0 | E no camarote? | PLANO-MESTRE do camarote em corte, pan da esquerda para a direita | piso firme (porta, segurança, poltronas, tapete do dono, pilar da alavanca) e frente de vidro sobre a arena (ricos, botão, pilha de prêmios) | camarote vinho/dourado/vidro | ar-condicionado zumbindo |
| 12 | 16,32–17,50 (1,18 s) | 5:3 | Ar-condicionado, | plano médio | uma rica de pele no ar-condicionado, cabelo esvoaçando, olhos fechados | camarote vinho/dourado/vidro | sopro |
| 13 | 17,50–18,42 (0,92 s) | 5:4 | champanhe e | plano médio | um rico estoura o champanhe, a rolha voa | camarote vinho/dourado/vidro | pop da rolha |
| 14 | 18,42–19,76 (1,34 s) | 5:6 | um botão vermelho: | close do pedestal na frente de vidro, push-in | botão vermelho gigante, placa "MAIS EMOÇÃO" | camarote vinho/dourado/vidro | zumbido elétrico |
| 15 | 19,76–20,77 (1,01 s) | 5:9 | "Mais emoção." | reação: close do ricaço | ele mexe o dedo por cima do botão, sorrindo | camarote vinho/dourado/vidro | — |
| 16 | 20,77–21,97 (1,20 s) | 6:0 | Meu nome é Davi. | close 3/4 do Davi, câmera na mão | Davi de boné virado acena com o esfregão | camarote vinho/dourado/vidro | — |
| 17 | 21,97–23,77 (1,80 s) | 6:4 | Eu sou faxineiro do camarote. | plano médio | ricos sentados nas poltronas, inteiros, e Davi agachado esfregando o chão aos pés deles; ninguém olha | camarote vinho/dourado/vidro | esfregão molhado |
| 18 | 23,77–25,31 (1,54 s) | 7:0 | Limpando o chão de vidro, | corte lateral, mais perto | Davi esfregando o vidro; através dele, a areia da arena lá embaixo | camarote vinho/dourado/vidro | rangido do vidro |
| 19 | 25,31–26,53 (1,22 s) | 7:5 | eu aprendi tudo. | close do Davi | olhos atentos, de rabo de olho | camarote vinho/dourado/vidro | — |
| 20 | 26,53–27,69 (1,16 s) | 8:0 | Inclusive onde fica a | pan para o pilar | a alavanca atrás da corda de veludo, entre o piso firme e o vidro | camarote vinho/dourado/vidro | tic |
| 21 | 27,69–29,05 (1,36 s) | 8:4 | alavanca dos prêmios. | insert com o Davi desfocado na frente | a placa "PRÊMIOS" na alavanca | camarote vinho/dourado/vidro | — |
| 22 | 29,05–30,23 (1,18 s) | 8:7 | Ela abre o chão de vidro, | corte lateral (demonstração) | um rico puxa a alavanca: o alçapão do meio do vidro abre | camarote vinho/dourado/vidro | trava abrindo |
| 23 | 30,23–32,27 (2,04 s) | 8:13 | e os prêmios caem lá embaixo. | corte lateral, câmera desce junto | os sacos de prêmio caem do alçapão na areia, perto de um vencedor que comemora | arena ocre/concreto | baque de saco |
| 24 | 32,27–34,53 (2,26 s) | 9:0 | E só o dono nunca pisava no vidro. | plano inteiro do dono, push-in até o rosto | terno branco no tapete vermelho; a ponta do sapato chega na borda do vidro e recua | camarote vinho/dourado/vidro | — |
| 25 | 34,53–35,89 (1,36 s) | 10:0 | Um ricaço me viu olhando e | plano a dois lateral | o ricaço se vira e pega o Davi olhando a alavanca | camarote vinho/dourado/vidro | — |
| 26 | 35,89–38,25 (2,36 s) | 10:6 | riu: "Faxineiro não precisa saber disso." | reação: close do ricaço, falante | ri com a taça na mão: "Faxineiro não precisa saber disso." | camarote vinho/dourado/vidro | risada gorda |
| 27 | 38,25–41,21 (2,96 s) | 11:0 | Esse mês, a minha irmã mais nova, a Lia, | padaria, plano médio, push-in | Lia no balcão; plaquinha "PÃO R$ 19" | padaria creme | sino da porta |
| 28 | 41,21–42,71 (1,50 s) | 11:9 | reclamou do preço do pão. | close da Lia, falante | ela aponta brava para o preço | padaria creme | — |
| 29 | 42,71–43,37 (0,66 s) | 12:0 | Virou atração | plano a dois | o guarda de colete laranja e quepe cola "ATRAÇÃO ESPECIAL" nas costas da Lia | padaria creme | adesivo colando |
| 30 | 43,37–44,25 (0,88 s) | 12:2 | especial. | reação: close do Davi | olhos arregalados, o esfregão escorrega | camarote vinho/dourado/vidro | esfregão caindo |
| 31 | 44,25–45,47 (1,22 s) | 13:0 | O adversário dela? | arena: Lia em primeiro plano, 3/4 de costas | no fundo, o portão de grade subindo | arena ocre/concreto | grade rangendo |
| 32 | 45,47–46,29 (0,82 s) | 13:3 | O Caio. | plano médio do Caio | Caio sai do escuro, magro, com medo | arena ocre/concreto | — |
| 33 | 46,29–48,01 (1,72 s) | 13:5 | A gente cresceu na mesma rua. | flash de memória | Davi, Lia e Caio crianças jogando bola na rua de tijolo | memória sépia | bola quicando |
| 34 | 48,01–49,77 (1,76 s) | 14:0 | No telão: "Chance da Lia: | telão visto da areia, Lia pequena na frente | "CHANCE DA LIA: 2%" | telão preto/LED vermelho | plim de LED |
| 35 | 49,77–50,41 (0,64 s) | 14:5 | dois por cento." | reação: close da Lia | ela engole seco | arena ocre/concreto | — |
| 36 | 50,41–53,07 (2,66 s) | 15:0 | Eu tava lá embaixo, só com um balde. | corredor de serviço, ao pé da escada | Davi com o balde, olhando a areia pela grade | arena ocre/concreto | — |
| 37 | 53,07–54,73 (1,66 s) | 15:8 | E precisava tirar ela de lá. | close do Davi na grade | rosto e mãos apertando as barras | arena ocre/concreto | grade rangendo |
| 38 | 54,73–55,75 (1,02 s) | 16:0 | O sino tocou. | plano médio | um juiz de arena de colete listrado bate o gongo com o martelo | arena ocre/concreto | gongo |
| 39 | 55,75–56,81 (1,06 s) | 16:3 | Ninguém se mexeu. | plano aberto da arena, deriva lenta | Lia e Caio parados, um de cada lado; a arquibancada de pé | arena ocre/concreto | silêncio |
| 40 | 56,81–59,05 (2,24 s) | 17:0 | Lá em cima, alguém apertou o botão. | frente de vidro, plano médio | o ricaço aperta o botão | camarote vinho/dourado/vidro | clique gordo |
| 41 | 59,05–60,23 (1,18 s) | 17:7 | "Mais emoção." | close do botão, os holofotes ficam vermelhos | o botão pisca "MAIS EMOÇÃO" | camarote vinho/dourado/vidro | sirene curta |
| 42 | 60,23–62,37 (2,14 s) | 18:0 | As paredes da arena começaram a fechar. | plongée em 3/4 | dois paredões de concreto vêm da esquerda e da direita, com poeira | arena ocre/concreto | motor pesado |
| 43 | 62,37–64,23 (1,86 s) | 18:7 | Pra esmagar quem não lutasse. | plano baixo, nível do chão | Lia e Caio no meio, os paredões chegando | arena ocre/concreto | concreto rangendo |
| 44 | 64,23–65,67 (1,44 s) | 19:0 | A Lia olhou pro Caio. | close da Lia | ela olha para o lado | arena ocre/concreto | — |
| 45 | 65,67–67,19 (1,52 s) | 19:5 | O Caio olhou pra Lia. | close do Caio | ele olha de volta | arena ocre/concreto | — |
| 46 | 67,19–68,87 (1,68 s) | 20:0 | E os dois sentaram no chão. | plano médio dos dois | os dois se sentam na areia, de pernas cruzadas (st.chao) | arena ocre/concreto | tum na areia |
| 47 | 68,87–70,83 (1,96 s) | 21:0 | A arena inteira sentou junto. | arquibancada, travelling | o povo, que estava de pé, senta em onda, de braços cruzados | arena ocre/concreto | onda de gente |
| 48 | 70,83–72,95 (2,12 s) | 22:0 | No telão: "Audiência caindo." | telão, tilt para baixo com tremor | "AUDIÊNCIA CAINDO" com seta para baixo | telão preto/LED vermelho | tom de queda |
| 49 | 72,95–74,15 (1,20 s) | 23:0 | Os ricos vaiaram. | frente de vidro, plano médio | ricos vaiando na beira do vidro, polegar para baixo | camarote vinho/dourado/vidro | vaia |
| 50 | 74,15–74,99 (0,84 s) | 23:3 | Jogaram taça. | plano médio | um rico atira a taça na arena | camarote vinho/dourado/vidro | vidro quebrando |
| 51 | 74,99–76,59 (1,60 s) | 23:5 | E apertaram o botão de novo. | plano médio | três ricos inteiros disputando o botão a cotoveladas | camarote vinho/dourado/vidro | clique × 3 |
| 52 | 76,59–77,71 (1,12 s) | 23:11 | E de novo. | plongée da arena | os paredões mais perto; Lia e Caio sentados, de mãos dadas | arena ocre/concreto | motor pesado |
| 53 | 77,71–79,75 (2,04 s) | 24:0 | Até que eu reparei numa coisa estranha. | close do Davi no corredor | testa franzida | arena ocre/concreto | — |
| 54 | 79,75–81,15 (1,40 s) | 25:0 | O segurança olhou bem pra mim. | ponto de vista do Davi, contra-plongée | o segurança na porta do camarote, no alto da escada, olha direto para baixo, para a câmera | arena ocre/concreto | — |
| 55 | 81,15–82,27 (1,12 s) | 25:6 | E não me viu. | plano a dois | o segurança olha através do Davi, que vira contorno pontilhado | arena ocre/concreto | som de fantasminha |
| 56 | 82,27–84,57 (2,30 s) | 25:10 | Pra eles, faxineiro é invisível. | close do Davi pontilhado | ele olha as próprias mãos transparentes; só o balde continua sólido | arena ocre/concreto | — |
| 57 | 84,57–86,62 (2,05 s) | 26:0 | Então eu fiz o que eu faço todo dia. | plano médio do Davi (pontilhado) | ele pega o balde e o esfregão e ajeita o boné, firme | arena ocre/concreto | alça do balde |
| 58 | 86,62–88,96 (2,34 s) | 27:0 | Peguei o balde e subi pro camarote. | escada de serviço, travelling subindo | Davi sobe a escada com o balde | arena ocre/concreto | passos |
| 59 | 88,96–90,30 (1,34 s) | 28:0 | Passei pelo segurança. | porta do camarote, travelling lateral | Davi passa pelo segurança, que nem vira | camarote vinho/dourado/vidro | passos |
| 60 | 90,30–91,60 (1,30 s) | 28:3 | Passei pelo prefeito. | travelling continua | passa pelo prefeito de faixa, sentado na poltrona comendo coxinha | camarote vinho/dourado/vidro | mastigada |
| 61 | 91,60–92,80 (1,20 s) | 28:6 | Passei pelo dono da arena. | travelling continua | passa pelo dono no tapete; ele olha a arena | camarote vinho/dourado/vidro | — |
| 62 | 92,80–95,22 (2,42 s) | 29:0 | E puxei a alavanca dos prêmios. | plano médio do Davi no pilar, push-in, luz quente | Davi passa por cima da corda de veludo, segura a alavanca e puxa com o corpo todo | camarote vinho/dourado/vidro | trava abrindo |
| 63 | 95,22–96,44 (1,22 s) | 30:0 | O chão de vidro abriu. | PLANO-MESTRE em corte lateral | a frente de vidro inteira destrava e abre em placas; primeiro a pilha de sacos de prêmio despenca na areia | camarote vinho/dourado/vidro | vidro destravando, baque de saco × 3 |
| 64 | 96,44–98,06 (1,62 s) | 31:0 | E os ricos caíram na arena, | corte lateral | os ricos caindo atrás, de terno, gravata voando; o botão cai junto | arena ocre/concreto | apito caindo |
| 65 | 98,06–100,14 (2,08 s) | 31:6 | em cima da pilha de prêmios. | plano médio na areia | eles aterrissam em cima da pilha de sacos | arena ocre/concreto | poof × 4 |
| 66 | 100,14–101,84 (1,70 s) | 31:12 | De terno e taça na mão. | reação: close de um rico | sentado num saco, a taça intacta na mão, piscando | arena ocre/concreto | gole |
| 67 | 101,84–103,10 (1,26 s) | 32:0 | Sem ninguém no botão, | plano médio na areia | o botão caído solta faísca e apaga | arena ocre/concreto | faísca |
| 68 | 103,10–104,38 (1,28 s) | 32:4 | as paredes pararam. | plongée da arena | os paredões param a um palmo de Lia e Caio | arena ocre/concreto | motor desligando |
| 69 | 104,38–105,90 (1,52 s) | 33:0 | Os pobres subiram a escada | escada de serviço | o povo da arquibancada subindo para o camarote | arena ocre/concreto | passos de multidão |
| 70 | 105,90–107,62 (1,72 s) | 33:5 | e sentaram nas poltronas. | camarote, plano médio | o povo nas poltronas de veludo; uma senhora com o ar-condicionado no rosto | camarote vinho/dourado/vidro | suspiro |
| 71 | 107,62–108,72 (1,10 s) | 33:9 | Agora quem assistia | corte lateral | o povo na beira do piso firme olhando para baixo, onde os ricos estão no fosso | camarote vinho/dourado/vidro | risada da plateia |
| 72 | 108,72–109,72 (1,00 s) | 33:12 | era a gente. | reação: close da senhora | ela ri, com a taça de um rico na mão | camarote vinho/dourado/vidro | — |
| 73 | 109,72–112,27 (2,55 s) | 34:0 | No telão: "Audiência: recorde." | telão, push-in com tremor | "AUDIÊNCIA: RECORDE" com seta para cima | telão preto/LED vermelho | fanfarra curta |
| 74 | 112,27–113,63 (1,36 s) | 35:0 | Só um não caiu. | camarote, plano aberto | o piso firme cheio de gente pobre; na beira do buraco, um só de terno: o dono, no tapete | camarote vinho/dourado/vidro | — |
| 75 | 113,63–114,45 (0,82 s) | 35:4 | O dono. | close do dono | ele ajeita a gravata dourada | camarote vinho/dourado/vidro | — |
| 76 | 114,45–115,73 (1,28 s) | 36:0 | A Lia subiu junto. | porta do camarote, plano médio | Lia chega pela escada, com o povo | camarote vinho/dourado/vidro | passos |
| 77 | 115,73–117,31 (1,58 s) | 36:4 | E ele pegou ela pelo braço. | plano a dois, cintura para cima | o dono agarra o braço da Lia; ela, assustada | camarote vinho/dourado/vidro | agarrão |
| 78 | 117,31–118,37 (1,06 s) | 37:0 | E sorriu pra mim. | plano a dois, push-in no dono | o dono sorri devagar para o Davi pontilhado (dente de ouro brilhando); o contorno do Davi treme: foi visto | camarote vinho/dourado/vidro | brilho, tremido |
| 79 | 118,37–120,71 (2,34 s) | 38:0 | No telão: "Final especial: o | telão, push-in lento | "FINAL ESPECIAL: / O FAXINEIRO ACORRENTADO / CONTRA O DONO" (3 linhas) | telão preto/LED vermelho | plim de LED |
| 80 | 120,71–124,91 (4,20 s) | 38:5 | faxineiro acorrentado contra o dono." | plano a dois | o segurança, de frente para o Davi, fecha a algema no pulso dele; o Davi volta a ser sólido; segura 2 s | camarote vinho/dourado/vidro | corrente fechando |

**80 planos · média 1.56 s · mais curto 0.56 s · mais longo 4.20 s · acima de 2,2 s: 12**
