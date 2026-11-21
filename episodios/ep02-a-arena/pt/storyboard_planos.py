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
 (0, 0, '3D bairro de tijolo (bairroToon, fim de tarde), câmera desce sobre os telhados', 'casinhas de tijolo com antena; em todas as janelas a mesma luz de TV piscando', BAI, 'vento, TV ao longe'),
 (0, 5, 'plano geral alto da arena, câmera desce', 'fosso redondo de areia, arquibancada lotada; no alto, o camarote de vidro brilhando', ARE, 'multidão abafada'),
 (1, 0, 'sala de casa pobre, plano médio', 'família no sofá rasgado olhando a TV (na tela, a arena em miniatura)', BAI, 'chiado de TV'),
 (1, 6, 'camarote, travelling lateral', 'ricos de terno erguendo plaquinhas de aposta com cifrão', CAM, 'risadas, tilintar de taça'),
 (2, 0, 'telão em close', '"PRÊMIO: 1 MÊS DE COMIDA" com o desenho de um saco de arroz', TEL, 'plim de LED'),
 (3, 0, 'rua do bairro, plano médio', 'um homem com cartaz "PÃO CARO"; dois seguranças colam no peito dele um adesivo "ATRAÇÃO ESPECIAL"', BAI, 'adesivo colando'),
 (4, 0, 'arena, contra-plongée', 'um lutador com correntes nos pulsos, de cabeça baixa', ARE, 'corrente arrastando'),
 (5, 0, 'camarote, plano aberto', 'chão de vidro, poltronas de veludo, ricos à vontade', CAM, 'ar-condicionado zumbindo'),
 (5, 3, 'insert: saída do ar-condicionado', 'fitinhas balançando no vento gelado', CAM, 'sopro'),
 (5, 4, 'insert: garrafa de champanhe', 'rolha voa, espuma', CAM, 'pop da rolha'),
 (5, 6, 'close do pedestal, push-in', 'botão vermelho gigante com a placa "MAIS EMOÇÃO"', CAM, 'zumbido elétrico'),
 # B · eu
 (6, 0, 'close 3/4 do Davi que abre para plano médio (pull-back)', 'Davi de boné virado acena com o esfregão; a câmera abre e mostra ele esfregando o chão entre as pernas dos ricos, que nem olham; balde amarelo no pé', CAM, 'esfregão molhado'),
 (7, 0, 'de BAIXO, da arena, olhando para cima através do vidro', 'a sola dos sapatos dos ricos e o esfregão do Davi passando no vidro', ARE, 'rangido do vidro'),
 (7, 5, 'close do Davi, olhos atentos', 'ele observa tudo de rabo de olho', CAM, '—'),
 (8, 0, 'pan para a parede do fundo', 'a alavanca "PRÊMIOS" atrás de uma corda de veludo', CAM, 'tic'),
 (8, 7, 'plano aberto do camarote (demonstração)', 'um rico puxa a alavanca: um pedaço do chão de vidro abre como alçapão', CAM, 'trava abrindo'),
 (8, 13, 'de baixo, da arena', 'os sacos de prêmio caem do alçapão na areia, perto de um vencedor que comemora', ARE, 'baque de saco'),
 (9, 0, 'close dos pés, tilt para cima até o rosto', 'os sapatos brancos do dono param na borda do tapete vermelho, sem pisar no vidro; sobe até o terno branco e o bigode fino', CAM, '—'),
 (10, 0, 'over-shoulder do Davi', 'o ricaço gordo se vira e pega Davi olhando a alavanca', CAM, '—'),
 (10, 6, 'reação: close do ricaço (falante)', 'ri com a taça na mão: "Faxineiro não precisa saber disso."', CAM, 'risada gorda'),
 # C · o que eu quero
 (11, 0, 'padaria, plano médio', 'Lia no balcão; plaquinha "PÃO R$ 19"', PAD, 'sino da porta'),
 (11, 9, 'plano médio da Lia, falante, câmera na mão', 'ela aponta brava para o preço; uma mão de segurança entra no quadro e cola "ATRAÇÃO ESPECIAL" nas costas dela', PAD, 'adesivo colando'),
 (12, 0, 'reação: close do Davi', 'olhos arregalados, o esfregão escorrega da mão', CAM, 'esfregão caindo'),
 (13, 0, 'arena, portão de grade subindo, push-in', 'a grade sobe e Caio sai do escuro, magro, com medo', ARE, 'grade rangendo'),
 (13, 5, 'flash de memória', 'Davi, Lia e Caio crianças jogando bola na rua de tijolo', MEM, 'bola quicando'),
 (14, 0, 'telão em close', '"CHANCE DA LIA: 2%"', TEL, 'plim de LED'),
 (15, 0, 'corredor de serviço atrás da grade da arena', 'Davi de pé com o balde, olhando a areia pela grade', ARE, '—'),
 (15, 8, 'close das mãos do Davi', 'ele aperta a grade', ARE, 'grade rangendo'),
 # D · o jogo
 (16, 0, 'insert: gongo da arena', 'o martelo bate', ARE, 'gongo'),
 (16, 3, 'plano aberto da arena, câmera parada', 'Lia e Caio parados, um de cada lado', ARE, 'silêncio'),
 (17, 0, 'camarote, close da mão', 'um dedo com anel aperta o botão', CAM, 'clique gordo'),
 (17, 7, 'close do botão', 'o botão acende e pisca "MAIS EMOÇÃO"', CAM, 'sirene curta'),
 (18, 0, 'plongée sobre a arena', 'as paredes de concreto deslizam para dentro, o círculo encolhe', ARE, 'motor pesado'),
 (18, 7, 'plano baixo, nível do chão', 'poeira e parede vindo na direção de Lia e Caio', ARE, 'concreto rangendo'),
 (19, 0, 'close da Lia', 'ela olha para o lado', ARE, '—'),
 (19, 5, 'close do Caio', 'ele olha de volta', ARE, '—'),
 (20, 0, 'plano médio dos dois', 'os dois se sentam na areia, de pernas cruzadas', ARE, 'tum de bunda na areia'),
 (21, 0, 'arquibancada, travelling', 'o povo se senta em onda, fileira por fileira', ARE, 'onda de gente'),
 (22, 0, 'telão em close', '"AUDIÊNCIA CAINDO" com seta para baixo', TEL, 'tom de queda'),
 (23, 0, 'camarote, plano médio', 'ricos vaiando de pé, polegar para baixo', CAM, 'vaia'),
 (23, 3, 'insert', 'uma taça voa e se espatifa', CAM, 'vidro quebrando'),
 (23, 5, 'close do botão', 'três dedos apertando sem parar', CAM, 'clique × 3'),
 (23, 11, 'plongée da arena', 'as paredes chegam mais perto; Lia e Caio de mãos dadas', ARE, 'motor pesado'),
 # E · a descoberta
 (24, 0, 'close do Davi', 'testa franzida', ARE, '—'),
 (25, 0, 'ponto de vista do Davi', 'o segurança olha direto para a câmera', ARE, '—'),
 (25, 6, 'plano médio, os dois', 'o segurança olha através do Davi, que vira contorno pontilhado', ARE, 'som de fantasminha'),
 (25, 10, 'close do Davi pontilhado', 'ele olha as próprias mãos transparentes; só o balde continua sólido', ARE, '—'),
 # F · a virada
 (26, 0, 'close das mãos', 'Davi pega o balde e o esfregão, firme', ARE, 'alça do balde'),
 (27, 0, 'escada de serviço, travelling subindo', 'Davi sobe a escada com o balde, determinado', ARE, 'passos'),
 (28, 0, 'camarote, travelling lateral', 'Davi passa pelo segurança, que nem vira', CAM, 'passos'),
 (28, 3, 'travelling continua', 'passa pelo prefeito de faixa, comendo coxinha', CAM, 'mastigada'),
 (28, 6, 'travelling continua', 'passa pelo dono no tapete; ele olha a arena', CAM, '—'),
 (29, 0, 'plano médio do Davi na alavanca, push-in', 'Davi passa por cima da corda de veludo, segura a alavanca e puxa com o corpo todo', CAM, 'trava abrindo'),
 (30, 0, 'de baixo, da arena', 'o chão de vidro inteiro abre em placas', ARE, 'vidro destravando'),
 (31, 0, 'plano aberto', 'os ricos caindo de terno, braços para cima', ARE, 'apito caindo'),
 (31, 6, 'plano médio', 'eles aterrissam na pilha de sacos de arroz', ARE, 'poof × 4'),
 (31, 12, 'reação: close de um rico', 'sentado num saco, a taça intacta na mão, piscando', ARE, 'gole'),
 (32, 0, 'close do botão', 'o botão sozinho, apaga; as paredes param', CAM, 'motor desligando'),
 # G · o mundo invertido
 (33, 0, 'escada da arquibancada', 'o povo subindo a escada para o camarote', ARE, 'passos de multidão'),
 (33, 5, 'camarote, plano médio', 'o povo sentado nas poltronas de veludo, uma mulher com o ar-condicionado no rosto', CAM, 'suspiro'),
 (33, 9, 'plongée do camarote para a arena', 'o povo na borda olhando para baixo, onde os ricos estão no fosso', CAM, 'risada da plateia'),
 (34, 0, 'telão em close', '"AUDIÊNCIA: RECORDE" com seta para cima', TEL, 'fanfarra curta'),
 # H · o gancho
 (35, 0, 'camarote, plano aberto', 'só o tapete vermelho continua de pé, ilha no meio do buraco; o dono em cima', CAM, '—'),
 (35, 4, 'close do dono', 'ele ajeita a gravata dourada', CAM, '—'),
 (36, 0, 'plano médio', 'Lia chega ao camarote junto com o povo', CAM, 'passos'),
 (36, 4, 'close das mãos', 'a mão do dono, de anel grosso, agarra o braço da Lia', CAM, 'agarrão'),
 (37, 0, 'close do dono', 'sorriso lento, dente de ouro brilhando', CAM, 'brilho'),
 (38, 0, 'telão em close', '"FINAL ESPECIAL: O FAXINEIRO ACORRENTADO CONTRA O DONO"', TEL, 'plim de LED'),
 (38, 5, 'close do Davi', 'uma corrente fecha no pulso dele; segura 2 s', CAM, 'corrente fechando'),
]
def fmt(x): return f"{x:.2f}".replace('.', ',')
linhas = ['# Storyboard · EP02 A Arena, Parte 1 (gerado por `storyboard_planos.py`)', '',
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
