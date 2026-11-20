"""Gera storyboard.md (tempos tirados do palavras.json). Uso: python3 -I storyboard_planos.py  (na pasta pt/)"""
import json, os
D = os.path.dirname(os.path.abspath(__file__))
P = json.load(open(os.path.join(D, 'palavras.json')))
L = {}
for i, w in enumerate(P): L.setdefault(w['linha'], []).append(i)
ini = lambda l, w: max(0, P[L[l][w]]['s'] - .08)
FIM = P[-1]['e'] + 2.0   # 2 s de silêncio no fim
# (linha, palavra, câmera, imagem/ação, luz, efeitos)
PL = [
 # A · cena-ícone
 (0, 0, '3D rua do banco (toon3d opção banco), câmera já perto, desce os últimos metros', '4 figuras de macacão vermelho e máscara de porquinho baixada, de 3/4 de frente para o banco, focinhos visíveis; luvas pretas', 'rua: céu claro, banco bege', 'apito descendo, passos'),
 (0, 6, 'close 3/4 do Belém, push-in em degraus', 'máscara de porquinho baixada; no "plano" ele a levanta para a testa (rosto aparece)', 'rua: céu claro, banco bege', 'estalo de borracha'),
 (1, 0, 'contra-plongée da fachada, câmera sobe', 'fachada do banco: colunas, letreiro "BANCO" com cifrão', 'rua: céu claro, banco bege', '—'),
 (1, 4, 'flash curto 0,6 s: a casinha amarela da família com o carimbo "TOMADO"', 'plano de memória (tom dessaturado)', 'dessaturado', 'carimbo'),
 # B · o plano
 (2, 0, 'esconderijo (garagem velha verde-musgo), plano médio, pan lento', 'o Mestre de 3/4, máscara baixada e óculos redondos por cima; ajeita os óculos', 'esconderijo verde-musgo', 'rangido da luminária'),
 (3, 0, 'plano aberto do esconderijo, travelling lateral', 'Manaus (tranças) e Recife (bigode) lado a lado, máscaras na testa', 'esconderijo verde-musgo', '—'),
 (3, 4, 'close médio do Belém entrando no quadro', 'Belém se junta aos dois, máscara na testa', 'esconderijo verde-musgo', '—'),
 (3, 8, 'close na mão do Mestre colando etiqueta no peito', 'etiqueta "MANAUS"', 'esconderijo verde-musgo', 'plim'),
 (3, 11, 'close etiqueta', 'etiqueta "RECIFE"', 'esconderijo verde-musgo', 'plim'),
 (3, 13, 'close etiqueta', 'etiqueta "BELÉM"', 'esconderijo verde-musgo', 'plim'),
 (4, 0, 'close médio da Manaus, câmera na mão', 'ela abre um cadeado com um grampo', 'esconderijo verde-musgo', 'clique de fechadura'),
 (4, 4, 'insert do cadeado aberto', 'cadeado cai aberto', 'esconderijo verde-musgo', 'cadeado'),
 (4, 5, 'close médio do Recife', 'caixa de alarme com luz vermelha giratória na parede do esconderijo; ele aponta o alicate', 'esconderijo + luz vermelha girando (desenhada)', 'alarme tocando'),
 (4, 7, 'insert: alicate corta o fio', 'a luz vermelha apaga, o alarme cala', 'esconderijo verde-musgo', 'corte seco'),
 (5, 0, 'reação: close 3/4 do Belém (reacaoToon)', 'ele aponta para a própria etiqueta, meio sem graça', 'fundo chapado do lugar', '—'),
 # C · eu e o que eu quero
 (6, 0, 'casinha amarela da família, plano médio com punch-in no "tomou"', 'a casa com flores na janela; no "tomou", carimbo gigante "TOMADO" desce na porta', 'casa amarela; dessatura no carimbo', 'carimbo'),
 (6, 7, 'rajada de 3 cortes', 'boletos vermelhos 1 · 2 · 3 colando na porta', 'dessaturado', 'papel × 3'),
 (7, 0, 'quarto de aluguel azul-acinzentado, plano aberto, push-in lento', 'a mãe sentada na cama (pose sentada, com assento), olhando a janela pequena', 'quarto azul-acinzentado', '—'),
 (8, 0, 'close médio da mãe', 'a mão dela segura a chave do cordão; o cordão sobe até o pescoço', 'quarto azul-acinzentado', '—'),
 (8, 4, 'insert da chave (cabeça em forma de casinha, dourada)', 'a chave gira devagar no cordão', 'quarto azul-acinzentado', 'tilintar'),
 (9, 0, 'plano médio da mãe', 'ela aperta a chave contra o peito, olhos fechados', 'quarto azul-acinzentado', '—'),
 (9, 8, 'close fechado da mãe, falante', '"Um dia a gente volta." — sorriso pequeno e triste', 'quarto azul-acinzentado', '—'),
 (10, 0, 'Belém na porta do quarto, contraluz do corredor', 'ele olha a mãe (acordada, sentada) e baixa a máscara no rosto', 'corredor claro', 'estalo da máscara'),
 # D · execução com pistas
 (11, 0, 'esconderijo, quadro-negro, plano médio', 'o Mestre (máscara + óculos) desenha a planta do banco com giz', 'esconderijo verde-musgo', 'giz'),
 (12, 0, 'close no quadro', '"9:00 ENTRAR" escrito', 'esconderijo verde-musgo', 'giz + tic'),
 (12, 3, 'close no quadro (outro ângulo)', '"9:10 COFRE"', 'esconderijo verde-musgo', 'giz + tic'),
 (12, 7, 'close no quadro', '"9:12 SAIR"', 'esconderijo verde-musgo', 'giz + tic'),
 (13, 0, 'close 3/4 do Mestre, falante (o focinho da máscara mexe)', '"Ninguém se machuca." — ajeita os óculos', 'fundo chapado do lugar', '—'),
 (14, 0, '3D rua do banco (mesmo cenário e movimento do plano 1, outro ponto da trilha)', 'os 4 entram pela porta do banco', 'rua: céu claro, banco bege', 'porta giratória'),
 (15, 0, 'saguão (mármore bege e dourado), plano aberto, travelling', 'os 4 atravessam o saguão; ao fundo, atrás do segurança, um retrato do dono de óculos redondos (camada 3)', 'saguão bege e dourado', 'passos no mármore'),
 (15, 6, 'plano médio: o Mestre passa pelo Jairo', 'Jairo (quepe, barrigudo) com copo de café', 'saguão bege e dourado', '—'),
 (15, 9, 'close 3/4 do Mestre, falante (PISTA 1)', '"Bom dia, Jairo." — aceno com a mão', 'saguão bege e dourado', '—'),
 (16, 0, 'reação: close do Jairo (reacaoToon), retrato do dono ao fundo', 'cara de nada, pisca devagar, toma um gole de café', 'saguão bege e dourado', 'gole'),
 (17, 0, 'plano médio, câmera na mão', 'Recife corre até a caixa de alarme do banco (a mesma do esconderijo) com o alicate', 'saguão bege e dourado', 'passos rápidos'),
 (17, 5, 'close: o Recife para com o alicate no ar', 'a luz vermelha da caixa já está apagada (PISTA 2)', 'saguão bege e dourado', '—'),
 (17, 9, 'reação: close do Recife de mãos vazias, confuso', 'ele olha o alicate e a caixa', 'saguão bege e dourado', '—'),
 (18, 0, 'close no relógio do saguão', 'ponteiro em 9:08', 'saguão bege e dourado', 'tic-tac'),
 (18, 3, 'reação: close do Belém (máscara baixada) virando a cabeça', 'desconfiado', 'saguão bege e dourado', '—'),
 (19, 0, 'frente do cofre (porta redonda cinza-azulado), plano aberto; ao lado, a porta da escada', 'os 4 diante do cofre', 'cofre cinza-azulado', '—'),
 (19, 4, 'close: Manaus abre a caixa de ferramentas', 'dezenas de ferramentas', 'cofre cinza-azulado', 'metal'),
 (20, 0, 'plano médio, push-in', 'o Mestre afasta a Manaus com a mão', 'cofre cinza-azulado', '—'),
 (20, 7, 'close no Mestre digitando sem papel (PISTA 3)', 'o dedo no teclado', 'cofre cinza-azulado', '—'),
 (21, 0, 'close extremo no teclado', '7 acende', 'cofre cinza-azulado', 'bipe'),
 (21, 1, 'close extremo', '1 acende', 'cofre cinza-azulado', 'bipe'),
 (21, 2, 'close extremo', '9 acende', 'cofre cinza-azulado', 'bipe'),
 (21, 3, 'close na trava', 'a trava gira: clec', 'cofre cinza-azulado', 'trava pesada'),
 # E · algo estranho, comigo
 (22, 0, 'a porta redonda gira e abre, câmera recuando', 'luz branca sai de dentro', 'cofre cinza-azulado', 'rangido pesado'),
 (22, 3, 'dentro do cofre: prateleiras vazias', 'poeira caindo; uma moeda gira no chão e para', 'cofre cinza-azulado', 'moeda'),
 (23, 0, 'close na mesa de metal', '3 pastas pardas', 'cofre cinza-azulado', '—'),
 (23, 3, 'close nas etiquetas das pastas (rima com as etiquetas do peito)', 'MANAUS · RECIFE · BELÉM', 'cofre cinza-azulado', '—'),
 (24, 0, 'close nas mãos de luva preta abrindo a pasta', '—', 'cofre cinza-azulado', 'papel'),
 (25, 0, 'close extremo na chave (cabeça de casinha), push-in; Belém levanta a máscara', 'a mesma chave da mãe', 'cofre cinza-azulado', 'tilintar (o mesmo do plano da mãe)'),
 (25, 8, 'flash 0,4 s: a chave da mãe no cordão, mesma posição', 'memória', 'dessaturado', '—'),
 (26, 0, 'close na etiqueta amarrada na chave', '"PROVA Nº 1" em letra de carimbo', 'cofre cinza-azulado', '—'),
 (27, 0, 'canto do teto do cofre', 'câmera de segurança, a luz vermelha pisca (PISTA 4)', 'cofre + luz vermelha da câmera (desenhada)', 'bipe agudo'),
 (27, 10, 'reação: close do Belém sem máscara (máscara na testa), dutch', 'a lente gira e foca nele', 'cofre cinza-azulado', 'zoom da lente'),
 (28, 0, 'plano aberto do cofre', 'Manaus e Recife parados olhando as próprias pastas; a porta da escada ao fundo ainda balançando, a sombra do Mestre subindo na parede', 'cofre cinza-azulado', 'porta batendo'),
 (29, 0, 'escada em caracol, contra-plongée', 'Belém sobe correndo', 'saguão bege e dourado', 'passos na escada'),
 # F · o lugar escondido
 (30, 0, 'corredor vinho, câmera avança até a porta dupla', 'a placa da porta ainda ilegível', 'corredor vinho', '—'),
 (30, 9, 'close na placa "SALA 719"', '—', 'corredor vinho', 'bipe (o mesmo do teclado)'),
 (30, 12, 'flash 0,4 s: o teclado 7-1-9', 'memória', 'cofre cinza-azulado', '—'),
 (31, 0, 'sala do dono (vinho e ouro, retratos do dono de óculos redondos), o Mestre de 3/4 de costas', 'ele tira a máscara de porquinho (vemos a nuca)', 'sala vinho e ouro', 'estalo da máscara'),
 (31, 7, 'a cadeira de couro gira', 'o Mestre de macacão aberto até o peito com gravata por baixo; o mesmo rosto dos retratos; sorriso de canto', 'sala vinho e ouro', 'rangido da cadeira'),
 # G · virada
 (32, 0, 'close na tela (fundo escuro, letras verdes de terminal), texto digitado', '"SEGURO DO ASSALTO:"', 'tela preta, letras verdes', 'teclado'),
 (32, 6, 'close na tela', '"R$ 2 BILHÕES"', 'tela preta, letras verdes', 'bipe de terminal'),
 (33, 0, 'a tela', '"CULPADOS:"', 'tela preta, letras verdes', '—'),
 (33, 3, 'a tela: 3 fotos de ficha aparecem uma a uma', 'Manaus · Recife · Belém + "3 DEVEDORES"', 'tela preta, letras verdes', 'carimbo × 3'),
 (34, 0, 'reação: close do Belém, push-in lento, dutch', 'os olhos arregalam devagar', 'sala vinho e ouro', 'silêncio (corta o som)'),
 (35, 0, 'o Mestre na cadeira, braços abertos, retratos dele na parede', 'sorriso de canto', 'tela preta, letras verdes', '—'),
 (36, 0, 'FLASH DE PISTAS (tom vermelho de memória, ~0,5 s cada)', '"Bom dia, Jairo" + o retrato do dono no saguão', 'memória em tom vermelho', 'bipe de rebobinar'),
 (36, 2, 'flash', 'o Recife de mãos vazias + a luz do alarme apagada', 'memória em tom vermelho', '—'),
 (36, 4, 'flash', 'as prateleiras vazias do cofre', 'memória em tom vermelho', '—'),
 (36, 5, 'flash', '7-1-9 + a placa 719', 'memória em tom vermelho', '—'),
 (36, 11, 'flash', 'a tela "R$ 2 BILHÕES"', 'memória em tom vermelho', '—'),
 (37, 0, 'a tela da câmera de segurança', 'o vídeo do cofre: Belém sem máscara com a chave na mão, legenda "SUSPEITO"', 'tela preta, letras verdes', '—'),
 # H · final
 (38, 0, 'flagrante: Belém de mãos para o alto, a chave numa delas, lanternas', 'polícia (silhuetas) na porta da sala', 'sala vinho + giroflex vermelho e azul (desenhado)', 'sirene'),
 (38, 6, 'ficha policial rápida', 'régua de altura; Belém com a placa; a chave num saquinho de prova ao lado', 'ficha policial cinza', 'flash de câmera'),
 (39, 0, 'quarto de aluguel, a mãe sentada na cama', 'ela aperta a chave e olha a janela; sirene longe', 'quarto azul-acinzentado', 'sirene longe'),
 (39, 10, 'fachada do prédio de aluguel à noite, uma janela acesa, afastamento lento', 'segura 2 s de silêncio depois da voz', 'fachada à noite (anil)', 'silêncio'),
]
def fmt(x): return f"{x:.2f}".replace('.', ',')
linhas = ['# Storyboard · EP01 O Assalto (v2, gerado por `storyboard_planos.py`)', '',
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
print(len(PL), 'planos; média', round(sum(d) / len(d), 2), '; > 2,2 s:', sum(1 for x in d if x > 2.2), '; mais curto', round(min(d), 2))
