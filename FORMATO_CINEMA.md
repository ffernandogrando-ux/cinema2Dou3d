# Formato do canal de cinema

**A ideia em uma frase:** parece um filme famoso, mas a virada mostra que era a vida real.
O público acha que está vendo um filme de assalto, de terror, de ficção científica ou de jogo mortal. A reviravolta revela a crítica social que estava escondida no gênero.

Este arquivo **manda sobre** o `GUIA_DE_ESTILO.md`. Material de apoio para o roteiro: `referencias/estrutura_zaylento.md` e as transcrições em `referencias/transcricoes_zaylento/`.

---

## 0. Emoção primeiro (regra do usuário, 20/11/2026)
Lição do EP01 v3: o roteiro misturou homenagem a filme, quebra-cabeça, crítica e drama, e terminou punindo o herói. O público sente a injustiça e fica sem saída: "no fim não tem nada de nada". Por isso, **antes de qualquer frase**:
1. **Motor do canal: raiva → justiça.** O pequeno sofre uma regra injusta do sistema (banco, patrão, aluguel, preço — crítica ao capitalismo como fábula), descobre a falha e **vira o jogo**; o poderoso prova do próprio veneno.
2. **Última sensação = "bem feito!"** (alívio e prazer de justiça), com no máximo uma emoção de apoio (riso ou ternura). O roteiro é escrito **de trás para frente**, a partir do último segundo.
3. **A virada de poder é plantada cedo**: o talento ou detalhe que o herói usa no fim aparece nos primeiros 30 s, parecendo inútil.
4. **Teste do espectador** ganha a pergunta "o que você sentiu no último segundo?". Se não for justiça/alívio, o roteiro volta.
5. Referência a filme é **tempero opcional**, não regra.

## 1. O que já está provado no TikTok
- **Imagem que se entende no 1º segundo:** a **cena-ícone do gênero**: quatro stickmen de macacão vermelho e máscara na porta de um banco dizem "assalto" sem uma palavra.
- **Narração desde o segundo zero**, em 1ª pessoa, com frases de 4 a 10 palavras, uma ação por frase e 310 a 360 palavras (cerca de 2:00).
- Causalidade com "então / mas / até que / foi aí que". Números na tela.
- **Até que eu reparei numa coisa estranha**: a exceção que acontece com o protagonista.
- **Tela ou objeto com 2 a 5 palavras** dando a virada. Nada de explicação.
- **Um final só**, com no máximo 2 frases depois da virada.
- Quem empurra o vídeo é a **visualização completa**, não o comentário (`referencias/desempenho_nossos.md`).
- **Clareza para quem ouve uma vez** (lição do EP01): mecanismo de golpe complicado derruba a nota do espectador. A virada tem que caber numa imagem e numa frase. Parte 1 pode terminar num gancho ("Final especial: …").

## 2. Regras do formato
- **1ª frase:** frase de trailer sobre a cena-ícone ("Eu tinha um macacão vermelho, uma máscara de porquinho e um plano.") ou a regra do mundo do gênero ("Nesta cidade, todo domingo, os pobres lutam entre si na arena.").
- **Mundo:** gênero de filme reconhecível; regra mágica é opcional.
- **Easter eggs:** as homenagens são as pistas da virada (seção 4).
- **Depois da virada:** flash de pistas (2 a 3 s), com os planos em que a pista já estava, revistos com o sentido novo.
- **Pedir comentário:** nunca. O público acha os easter eggs e comenta sozinho.

## 3. As batidas (~2:00)
| Batida | Tempo | O que acontece |
|---|---|---|
| A · Cena-ícone | 0–3 s | o gênero inteiro numa imagem + frase de trailer |
| B · O plano / o mundo | 3–20 s | as regras do gênero, rápidas (a equipe e as funções; as regras do jogo; o despertador das 6:00) |
| C · Eu e o que eu quero | 20–30 s | nome + o desejo concreto + quem eu amo |
| D · Execução com pistas | 30–65 s | o filme andando; **2 ou 3 pistas plantadas em close**, cada uma disfarçada de homenagem |
| E · Algo estranho | 65–80 s | "Até que eu reparei numa coisa estranha." A exceção acontece com ele |
| F · O lugar escondido | 80–95 s | a sala, o cofre, a sala de controle, o calendário |
| G · Virada | 95–105 s | tela ou objeto de 2 a 5 palavras + "Foi aí que eu entendi." + **flash de pistas** |
| H · Final | 105–120 s | uma batida: ironia em eco, ou corte no pico (Parte 1) |

**Teste da virada:** quem assistir de novo tem que achar todas as pistas no lugar. Se a virada precisa de uma informação que nunca apareceu, refazer.

## 4. Easter eggs: homenagem, não cópia
Três camadas por episódio:
1. **Óbvia** (todo mundo pega): o figurino ou o objeto-símbolo do gênero.
2. **De cinéfilo:** um enquadramento clássico, uma pose, uma frase parafraseada.
3. **Escondida:** um número numa porta, um nome numa placa ao fundo, um objeto na estante.

Pelo menos **uma camada 2 ou 3 é também pista da virada**.

**Pode:** pose, enquadramento, cor, número, objeto genérico do gênero (macacão, máscara com desenho nosso, agasalho numerado, marmota de pelúcia), paráfrase.
**Não pode:** nome de personagem, logotipo, música original do filme, fala literal, cena refeita quadro a quadro, a máscara ou o desenho oficial de uma série. O título do post nunca cita o filme.

## 5. Visual (decidido em 20/11/2026; refinado no EP02)
- **Desenho adulto de sitcom de ficção científica** (gramática do Sci-Fi Sitcom Toon, sem a linha tremendo): personagens de corpo inteiro do kit `motor/acervo/toon.js`:
  - cor chapada e sombra recortada;
  - olhos brancos grandes de pupila pequena, pálpebra pesada, olheira;
  - barba, boca com dentes;
  - animados a 12 qps, com vida (respiram, balançam, piscam).
- **Abertura:** a cena-ícone em 2D no 1º segundo (o gancho tem que dizer o gênero). O 3D (`toon3d.js`, `bairroToon`) entra logo depois, como plano de lugar.
- **Plano-mestre em corte lateral** quando a virada depende de geografia (camarote de vidro sobre a arena, cofre sob o banco). Desenhe-o uma vez e reuse-o nos plantios e na virada; personagens nele têm no mínimo ~15 % da altura.
- **Close de reação depois de toda imagem absurda** (`reacaoToon`): a piada mora na cara de quem viu.
- **Uma paleta por lugar** (3 a 5 cores); só a coisa mágica ou tecnológica brilha. Arco de cor por camada de luz (vermelho na tensão, quente na virada), sempre cobrindo além do quadro (x/y −400, 1400×2000), porque a câmera treme.
- **Opções do kit:**
  - `st.invisivel` (contorno tracejado claro; o que estiver em `class="tSol"` fica sólido);
  - `st.treme`;
  - `st.chao` (sentado no chão);
  - `st.sentado` (precisa de assento desenhado);
  - `st.mascara`;
  - `P.oculos`, `P.mao`.
- Sem luz de cinema, sem linha tremendo. Faixas de cinema e cartelas-relâmpago só como recurso pontual.

## 6. Voz e som (decidido no EP02, 21/11/2026)
- **Voz:** Little Dude II (ElevenLabs), gerada pelo GenMax (`motor/voz_genmax.py`). O alinhador corta as pausas para 0,25 s (pedido do usuário: "muito silêncio"). A voz do Gemini serve de reserva, mas fala "para" e "estava" no lugar de "pra" e "tava".
- **Som forte e com transição** (o usuário achou o som do EP02 v1 "fraco e baixo"):
  - `EFEITOS_DB = -15`: efeitos ~11 dB abaixo da voz na média, ~5 dB nos picos de multidão.
  - **Ambiente por lugar** (`AMBIENTE` no `cenas.js`), com loops gerados no ElevenLabs Sound Effects (`motor/sfx_eleven.py`): `arena_multidao`, `arena_tensa`, `camarote`, `bairro`. Use-os ou gere os do gênero novo (ex.: banco, hospital, escritório).
  - **Whoosh em toda troca de lugar** (lista `WH_EM` no fim do `cenas.js`, alternando `arena/whoosh_a|b|c`). Não em todo corte.
  - **Efeito grande nos momentos-chave**: urro da plateia, gongo, paredões, vaia, vidro abrindo, risada da plateia, algema + impacto no gancho (`sons/arena/`). Sons de desenho da `sons/galeria/` para os detalhes (FilmCow).
- Sem música: entregar `video_final` + `faixa_voz.wav` + `faixa_efeitos.wav`.

## 7. Banco de temas (pilotos)
1. **O Assalto** (EP01, entregue na v3.1; roteiro v5.2 aprovado, aguardando a voz): eu entro numa quadrilha de macacão vermelho para assaltar o banco que tomou a casa da minha mãe. O Mestre é o dono do banco e o assalto é para o seguro; o meu talento "inútil" de trocar etiqueta vira a arma.
2. **A Arena** (EP02, jogo mortal; Parte 1 entregue): os pobres lutam na arena para divertir os ricos; o faxineiro invisível puxa a alavanca dos prêmios e os ricos caem no fosso. Parte 2: o faxineiro acorrentado contra o dono.
3. **Segunda-feira** (gênero loop temporal · pele `backrooms`, com o REC e a data da câmera como prova): todo dia eu acordo às 6:00 e é segunda. Pistas: a data no canto da filmadora, a altura do filho no batente, a marmota de pelúcia cada vez mais gasta. Virada: a data pula, já se passaram 11 anos e o filho está de beca. Não era loop, era a escala 6x1.
4. **Processo Seletivo** (gênero jogo mortal · pele `text-flash-cuts`): 456 candidatos de agasalho numerado disputam uma vaga de estágio. Virada: "AUDIÊNCIA: 2 MILHÕES. VAGAS: 0". A seleção era o produto.
5. Para depois: investigação policial (pele `halftone-dossier`, as pistas viram "provas numeradas"); filme mudo (pele `silent-film`, cartela de intertítulo como virada).
