# EP07 — Revisão visual (calibração do revisor, 117 planos)

Gerado com `node motor/render.js episodios/ep07-falecido pt planos` + revisor independente olhando as 30 folhas.
Serve de **exemplo do nível de cobrança** para os próximos episódios. Nota de acabamento: **5/10** (mínimo para renderizar: 8).

O revisor encontrou sozinho todos os problemas que o usuário apontou (sofá, velas, moça sentada no ar/atravessando o balcão,
só as pernas, gato que não está em cima dele, fila voando, falas sem boca) e mais estes padrões:

## Padrões que se repetem
1. **Gente sentada no ar** (moça do cartório, fila, Benedita na cozinha, Benedito com o gato): faltam cadeiras e bancos nos planos 3D.
2. **Câmera 3D que avança demais:** entra em parede ou casa (planos 11, 62, 112) ou termina colada em objeto (71, 109); personagens minúsculos nos planos abertos (14, 23, 76, 86, 111).
3. **Personagem pela metade:** pernas sem corpo (30, 108), braços e mãos sem dono (19, 41, 78, 79, 85, 110) e cortes de borda nos fins de plano.
4. **Falas sem boca:** a fala acontece, mas a boca de quem fala não aparece (38, 67, 68, 85, 91, 96).
5. **Objetos flutuando:** velas (18), bebê (99), bolo na mão (110), gato (33), tábua (13).
6. **Momentos-chave ilegíveis:** "deitou em cima dele", "um palmo do chão", "atravessou a parede", "conseguiu pegar", "conheceu o bisneto".
7. **Acabamento:** legenda em cima de rótulo importante (2, 20, 21, 107), texto do HUD cobrindo documento (51, 73), objetos e placas cortados na borda, balão de pergunta com rabicho apontando para a cena.

## Gravidade alta (exemplos)
| Plano | Defeito | Correção |
|---|---|---|
| 11 | Câmera entra na casa; "acorda em outra rua" não aparece | Câmera aberta e parada, placa da rua mudando |
| 62 | Câmera dentro da parede; Benedito não aparece | Câmera fora, ele atravessando de lado |
| 18 | Velas flutuando acima do bolo | Base das velas dentro do bolo |
| 99 | Bebê flutua, ela não segura | Pose de colo |
| 110 | Bolo flutua ao lado da mão sem dono (é o clímax) | Bolo na mão, braço e corpo visíveis |
| 33–34 | Gato longe do Benedito; fantasma cortado | Benedito deitado inteiro, gato sobre o peito |
| 30, 108 | Só duas pernas ("postes") | Corpo inteiro com o vão até o chão |
| 23, 35, 39, 87 | Moça sentada no ar na frente do balcão | Cadeira atrás do balcão; pernas escondidas pelo balcão |
| 52–54 | Fila sentada no ar | Banco comprido |
| 66, 82 | Benedita sentada ao lado da cadeira, minúscula | Encaixar no assento, escala coerente |
| 22 | Coroa parece de Natal | Coroa de flores com faixa de luto |
