"""Mede os cortes (trocas de plano) de um vídeo e mostra a distribuição.
Uso: python3 -I motor/medir_cortes.py video.mp4 [limiar=0.1]
Limiar 0.1 conferido a olho em 2 vídeos do @historiasdertr (acertou cortes secos, flash e punch-in)."""
import re, subprocess, sys, statistics as st
v = sys.argv[1]; TH = float(sys.argv[2]) if len(sys.argv) > 2 else 0.1
out = subprocess.run(['ffmpeg', '-hide_banner', '-i', v, '-vf', 'scale=270:480,select=gte(scene\\,0),metadata=print:file=-',
                      '-an', '-f', 'null', '-'], capture_output=True, text=True).stdout
t, s, cur = [], [], None
for line in out.splitlines():
    m = re.search(r'pts_time:([\d.]+)', line)
    if m: cur = float(m.group(1))
    m = re.search(r'scene_score=([\d.]+)', line)
    if m: t.append(cur); s.append(float(m.group(1)))
cuts = []
for i, (ti, si) in enumerate(zip(t, s)):
    if si >= TH and all(si >= s[j] for j in range(max(0, i - 9), min(len(s), i + 10))) and (not cuts or ti - cuts[-1] > 0.25):
        cuts.append(ti)
dur = t[-1]; iv = [b - a for a, b in zip([0] + cuts, cuts + [dur])]
print(f'duração {dur:.1f}s · {len(iv)} planos · média {dur/len(iv):.2f}s · mediana {st.median(iv):.2f}s')
REF = {(0, .5): 8, (.5, .8): 20, (.8, 1.2): 27, (1.2, 1.6): 22, (1.6, 2.2): 14, (2.2, 3): 6, (3, 99): 3}
print('faixa        nosso  referência')
for (a, b), r in REF.items():
    print(f'{a:>4}-{b:<4}s  {100*sum(a <= x < b for x in iv)/len(iv):4.0f}%  {r:4d}%')
