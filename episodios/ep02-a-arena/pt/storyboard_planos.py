"""Gera storyboard.md (tempos tirados do palavras.json). Uso: python3 -I storyboard_planos.py  (na pasta pt/)"""
import json, os
D = os.path.dirname(os.path.abspath(__file__))
P = json.load(open(os.path.join(D, 'palavras.json')))
L = {}
for i, w in enumerate(P): L.setdefault(w['linha'], []).append(i)
ini = lambda l, w: max(0, P[L[l][w]]['s'] - .08)
FIM = P[-1]['e'] + 2.0
CAM, ARE, BAI, PAD, MEM, TEL = 'camarote vinho/dourado/vidro', 'arena ocre/concreto', 'bairro tijolo', 'padaria creme', 'memória sépia', 'telão preto/LED vermelho'
# (linha, palavra, câmera, imagem/ação, cor, efeitos)
PL = [
 # A · o mundo
 (0, 0, 'PLANO-MESTRE em corte lateral, câmera desce devagar', 'dois lutadores na areia, a arquibancada de pé gritando, o camarote de vidro em balanço por cima; escada de serviço no canto', ARE, 'multidão gritando'),
 (0, 5, 'close a dois dos lutadores, câmera na mão', 'dois homens magros de roupa rasgada, sem armas, se encarando', ARE, 'respiração'),
 (1, 0, '3D bairro de tijolo (bairroToon), câmera desce até uma janela', 'casinhas de tijolo; em todas as janelas a mesma luz de TV piscando', BAI, 'vento, TV ao longe'),
 (1, 3, 'sala de casa pobre, plano médio, push-in', 'família inteira no sofá rasgado olhando a TV (na tela, a arena em miniatura)', BAI, 'chiado de TV'),
 (1, 6, 'camarote, frente de vidro, travelling lateral', 'ricos de pé no vidro erguendo plaquinhas de aposta com cifrão', CAM, 'risadas, tilintar de taça'),
 (2, 0, 'telão, push-in', '"PRÊMIO: 1 MÊS DE COMIDA" com o desenho de um saco de arroz', TEL, 'plim de LED'),
 (3, 0, 'rua do bairro, plano médio', 'um homem ergue um cartaz "PÃO CARO"', BAI, 'grito'),
 (3, 2, 'plano a dois', 'um segurança inteiro cola no peito dele o adesivo "ATRAÇÃO ESPECIAL"', BAI, 'adesivo colando'),
 (4, 0, 'arena, contra-plongée', 'um lutador com correntes nos pulsos, de cabeça baixa', ARE, 'corrente arrastando'),
 (4, 3, 'reação: close de uma menina na arquibancada', 'ela tapa a boca', ARE, '—'),
 (5, 0, 'PLANO-MESTRE do camarote em corte, pan da esquerda para a direita', 'piso firme (porta, segurança, poltronas, tapete do dono, pilar da alavanca) e frente de vidro sobre a arena (ricos, botão, pilha de prêmios)', CAM, 'ar-condicionado zumbindo'),
 (5, 3, 'plano médio', 'uma rica de pele no ar-condicionado, cabelo esvoaçando, olhos fechados', CAM, 'sopro'),
 (5, 4, 'plano médio', 'um rico estoura o champanhe, a rolha voa', CAM, 'pop da rolha'),
 (5, 6, 'close do pedestal na frente de vidro, push-in', 'botão vermelho gigante, placa "MAIS EMOÇÃO"', CAM, 'zumbido elétrico'),
 (5, 9, 'reação: close do ricaço', 'ele mexe o dedo por cima do botão, sorrindo', CAM, '—'),
 # B · eu
 (6, 0, 'close 3/4 do Davi, câmera na mão', 'Davi de boné virado acena com o esfregão', CAM, '—'),
 (6, 4, 'plano médio', 'ricos sentados nas poltronas, inteiros, e Davi agachado esfregando o chão aos pés deles; ninguém olha', CAM, 'esfregão molhado'),
 (7, 0, 'corte lateral, mais perto', 'Davi esfregando o vidro; através dele, a areia da arena lá embaixo', CAM, 'rangido do vidro'),
 (7, 5, 'close do Davi', 'olhos atentos, de rabo de olho', CAM, '—'),
 (8, 0, 'pan para o pilar', 'a alavanca atrás da corda de veludo, entre o piso firme e o vidro', CAM, 'tic'),
 (8, 4, 'insert com o Davi desfocado na frente', 'a placa "PRÊMIOS" na alavanca', CAM, '—'),
 (8, 7, 'corte lateral (demonstração)', 'um rico puxa a alavanca: o alçapão do meio do vidro abre', CAM, 'trava abrindo'),
 (8, 13, 'corte lateral, câmera desce junto', 'os sacos de prêmio caem do alçapão na areia, perto de um vencedor que comemora', ARE, 'baque de saco'),
 (9, 0, 'plano inteiro do dono, push-in até o rosto', 'terno branco no tapete vermelho; a ponta do sapato chega na borda do vidro e recua', CAM, '—'),
 (10, 0, 'plano a dois lateral', 'o ricaço se vira e pega o Davi olhando a alavanca', CAM, '—'),
 (10, 6, 'reação: close do ricaço, falante', 'ri com a taça na mão: "Faxineiro não precisa saber disso."', CAM, 'risada gorda'),
 # C · o que eu quero
 (11, 0, 'padaria, plano médio, push-in', 'Lia no balcão; plaquinha "PÃO R$ 19"', PAD, 'sino da porta'),
 (11, 9, 'close da Lia, falante', 'ela aponta brava para o preço', PAD, '—'),
 (12, 0, 'plano a dois', 'um segurança inteiro cola "ATRAÇÃO ESPECIAL" nas costas da Lia', PAD, 'adesivo colando'),
 (12, 2, 'reação: close do Davi', 'olhos arregalados, o esfregão escorrega', CAM, 'esfregão caindo'),
 (13, 0, 'arena: Lia em primeiro plano, 3/4 de costas', 'no fundo, o portão de grade subindo', ARE, 'grade rangendo'),
 (13, 3, 'plano médio do Caio', 'Caio sai do escuro, magro, com medo', ARE, '—'),
 (13, 5, 'flash de memória', 'Davi, Lia e Caio crianças jogando bola na rua de tijolo', MEM, 'bola quicando'),
 (14, 0, 'telão visto da areia, Lia pequena na frente', '"CHANCE DA LIA: 2%"', TEL, 'plim de LED'),
 (14, 5, 'reação: close da Lia', 'ela engole seco', ARE, '—'),
 (15, 0, 'corredor de serviço, ao pé da escada', 'Davi com o balde, olhando a areia pela grade', ARE, '—'),
 (15, 8, 'close do Davi na grade', 'rosto e mãos apertando as barras', ARE, 'grade rangendo'),
 # D · o jogo
 (16, 0, 'plano médio', 'um segurança bate o gongo com o martelo', ARE, 'gongo'),
 (16, 3, 'plano aberto da arena, deriva lenta', 'Lia e Caio parados, um de cada lado; a arquibancada de pé', ARE, 'silêncio'),
 (17, 0, 'frente de vidro, plano médio', 'o ricaço aperta o botão', CAM, 'clique gordo'),
 (17, 7, 'close do botão, os holofotes ficam vermelhos', 'o botão pisca "MAIS EMOÇÃO"', CAM, 'sirene curta'),
 (18, 0, 'plongée em 3/4', 'dois paredões de concreto vêm da esquerda e da direita, com poeira', ARE, 'motor pesado'),
 (18, 7, 'plano baixo, nível do chão', 'Lia e Caio no meio, os paredões chegando', ARE, 'concreto rangendo'),
 (19, 0, 'close da Lia', 'ela olha para o lado', ARE, '—'),
 (19, 5, 'close do Caio', 'ele olha de volta', ARE, '—'),
 (20, 0, 'plano médio dos dois', 'os dois se sentam na areia, de pernas cruzadas (st.chao)', ARE, 'tum na areia'),
 (21, 0, 'arquibancada, travelling', 'o povo, que estava de pé, senta em onda, de braços cruzados', ARE, 'onda de gente'),
 (22, 0, 'telão, tilt para baixo com tremor', '"AUDIÊNCIA CAINDO" com seta para baixo', TEL, 'tom de queda'),
 (23, 0, 'frente de vidro, plano médio', 'ricos vaiando na beira do vidro, polegar para baixo', CAM, 'vaia'),
 (23, 3, 'plano médio', 'um rico atira a taça na arena', CAM, 'vidro quebrando'),
 (23, 5, 'plano médio', 'três ricos inteiros disputando o botão a cotoveladas', CAM, 'clique × 3'),
 (23, 11, 'plongée da arena', 'os paredões mais perto; Lia e Caio sentados, de mãos dadas', ARE, 'motor pesado'),
 # E · a descoberta
 (24, 0, 'close do Davi no corredor', 'testa franzida', ARE, '—'),
 (25, 0, 'ponto de vista do Davi, contra-plongée', 'o segurança na porta do camarote, no alto da escada, olha direto para baixo, para a câmera', ARE, '—'),
 (25, 6, 'plano a dois', 'o segurança olha através do Davi, que vira contorno pontilhado', ARE, 'som de fantasminha'),
 (25, 10, 'close do Davi pontilhado', 'ele olha as próprias mãos transparentes; só o balde continua sólido', ARE, '—'),
 # F · a virada
 (26, 0, 'plano médio do Davi (pontilhado)', 'ele pega o balde e o esfregão e ajeita o boné, firme', ARE, 'alça do balde'),
 (27, 0, 'escada de serviço, travelling subindo', 'Davi sobe a escada com o balde', ARE, 'passos'),
 (28, 0, 'porta do camarote, travelling lateral', 'Davi passa pelo segurança, que nem vira', CAM, 'passos'),
 (28, 3, 'travelling continua', 'passa pelo prefeito de faixa, sentado na poltrona comendo coxinha', CAM, 'mastigada'),
 (28, 6, 'travelling continua', 'passa pelo dono no tapete; ele olha a arena', CAM, '—'),
 (29, 0, 'plano médio do Davi no pilar, push-in, luz quente', 'Davi passa por cima da corda de veludo, segura a alavanca e puxa com o corpo todo', CAM, 'trava abrindo'),
 (30, 0, 'PLANO-MESTRE em corte lateral', 'a frente de vidro inteira destrava e abre em placas; primeiro a pilha de sacos de prêmio despenca na areia', CAM, 'vidro destravando, baque de saco × 3'),
 (31, 0, 'corte lateral', 'os ricos caindo atrás, de terno, gravata voando; o botão cai junto', ARE, 'apito caindo'),
 (31, 6, 'plano médio na areia', 'eles aterrissam em cima da pilha de sacos', ARE, 'poof × 4'),
 (31, 12, 'reação: close de um rico', 'sentado num saco, a taça intacta na mão, piscando', ARE, 'gole'),
 (32, 0, 'plano médio na areia', 'o botão caído solta faísca e apaga', ARE, 'faísca'),
 (32, 4, 'plongée da arena', 'os paredões param a um palmo de Lia e Caio', ARE, 'motor desligando'),
 # G · o mundo invertido
 (33, 0, 'escada de serviço', 'o povo da arquibancada subindo para o camarote', ARE, 'passos de multidão'),
 (33, 5, 'camarote, plano médio', 'o povo nas poltronas de veludo; uma senhora com o ar-condicionado no rosto', CAM, 'suspiro'),
 (33, 9, 'corte lateral', 'o povo na beira do piso firme olhando para baixo, onde os ricos estão no fosso', CAM, 'risada da plateia'),
 (33, 12, 'reação: close da senhora', 'ela ri, com a taça de um rico na mão', CAM, '—'),
 (34, 0, 'telão, push-in com tremor', '"AUDIÊNCIA: RECORDE" com seta para cima', TEL, 'fanfarra curta'),
 # H · o gancho
 (35, 0, 'camarote, plano aberto', 'o piso firme cheio de gente pobre; na beira do buraco, um só de terno: o dono, no tapete', CAM, '—'),
 (35, 4, 'close do dono', 'ele ajeita a gravata dourada', CAM, '—'),
 (36, 0, 'porta do camarote, plano médio', 'Lia chega pela escada, com o povo', CAM, 'passos'),
 (36, 4, 'plano a dois, cintura para cima', 'o dono agarra o braço da Lia; ela, assustada', CAM, 'agarrão'),
 (37, 0, 'plano a dois, push-in no dono', 'o dono sorri devagar para o Davi pontilhado (dente de ouro brilhando); o contorno do Davi treme: foi visto', CAM, 'brilho, tremido'),
 (38, 0, 'telão, push-in lento', '"FINAL ESPECIAL: / O FAXINEIRO ACORRENTADO / CONTRA O DONO" (3 linhas)', TEL, 'plim de LED'),
 (38, 5, 'plano a dois', 'o segurança, de frente para o Davi, fecha a algema no pulso dele; o Davi volta a ser sólido; segura 2 s', CAM, 'corrente fechando'),
]
def fmt(x): return f"{x:.2f}".replace('.', ',')
linhas = ['# Storyboard v2 · EP02 A Arena, Parte 1 (gerado por `storyboard_planos.py`)', '',
  open(os.path.join(D, 'storyboard_cabecalho.md')).read().strip(), '',
  '| # | Tempo | Âncora | Trecho da fala | Câmera / enquadramento | Imagem e ação | Cor do lugar | Efeitos |', '|---|---|---|---|---|---|---|---|']
T = [ini(l, w) for l, w, *_ in PL]; T[0] = 0
for k, (l, w, cam, img, luz, sfx) in enumerate(PL):
  t0, t1 = T[k], (T[k + 1] if k + 1 < len(PL) else FIM)
  idx0 = L[l][w]; idx1 = L[PL[k + 1][0]][PL[k + 1][1]] if k + 1 < len(PL) else len(P)
  fala = ' '.join(P[i]['w'] for i in range(idx0, idx1))
  linhas.append(f"| {k + 1} | {fmt(t0)}–{fmt(t1)} ({fmt(t1 - t0)} s) | {l}:{w} | {fala} | {cam} | {img} | {luz} | {sfx} |")
d = [T[k + 1] - T[k] for k in range(len(T) - 1)] + [FIM - T[-1]]
linhas += ['', f"**{len(PL)} planos · média {sum(d) / len(d):.2f} s · mais curto {min(d):.2f} s · mais longo {max(d):.2f} s · acima de 2,2 s: {sum(1 for x in d if x > 2.2)}**"]
open(os.path.join(D, 'storyboard.md'), 'w').write('\n'.join(linhas) + '\n')
print(len(PL), 'planos; média', round(sum(d) / len(d), 2), '; > 2,2 s:', sum(1 for x in d if x > 2.2), '; mais curto', round(min(d), 2), [ (k+1,round(x,2)) for k,x in enumerate(d) if x>2.2 or x<.7])
