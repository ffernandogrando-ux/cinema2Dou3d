"""Alinha o áudio da narração ao texto do roteiro.
Uso: python3 motor/alinhar.py <pasta_idioma>   (espera voz.wav e narracao.txt)
Gera palavras.json  -> [{w, s, e, linha}]  (texto do roteiro, tempos do áudio)
e imprime as diferenças entre o que foi falado e o roteiro."""
import sys, os, re, json, subprocess, difflib, unicodedata
import numpy as np
from faster_whisper import WhisperModel
d = sys.argv[1]
norm = lambda w: re.sub(r'[^a-z0-9]', '', unicodedata.normalize('NFD', w.lower()).encode('ascii','ignore').decode())
# roteiro
roteiro = []
for li, line in enumerate(l.strip() for l in open(os.path.join(d,'narracao.txt')) if l.strip()):
    for w in line.split(): roteiro.append({'w': w, 'linha': li})
# áudio -> palavras com tempo
raw = subprocess.run(['ffmpeg','-v','error','-i',os.path.join(d,'voz.wav'),'-ac','1','-ar','16000','-f','s16le','-'],capture_output=True).stdout
a = np.frombuffer(raw, np.int16).astype(np.float32)/32768
m = WhisperModel('small', device='cpu', compute_type='int8', cpu_threads=4)
prompt = ' '.join(x['w'] for x in roteiro)[:800]
segs,_ = m.transcribe(a, language='pt', word_timestamps=True, beam_size=5, initial_prompt=prompt)
fal = [{'w': w.word.strip(), 's': w.start, 'e': w.end} for s in segs for w in s.words]
A = [norm(x['w']) for x in roteiro]; B = [norm(x['w']) for x in fal]
sm = difflib.SequenceMatcher(None, A, B, autojunk=False)
difs = []
for op, i1, i2, j1, j2 in sm.get_opcodes():
    if op == 'equal':
        for k in range(i2-i1): roteiro[i1+k].update(s=fal[j1+k]['s'], e=fal[j1+k]['e'])
    else:
        t = fal[j1]['s'] if j1 < len(fal) else None
        difs.append((op, ' '.join(x['w'] for x in roteiro[i1:i2]), ' '.join(x['w'] for x in fal[j1:j2]), t))
        if i2 > i1 and j2 > j1:  # distribui o tempo do trecho falado
            s0, e0 = fal[j1]['s'], fal[j2-1]['e']; n = i2-i1
            for k in range(n): roteiro[i1+k].update(s=s0+(e0-s0)*k/n, e=s0+(e0-s0)*(k+1)/n)
# preenche palavras sem tempo (omitidas na fala) com o vizinho
for i, x in enumerate(roteiro):
    if 's' not in x:
        p = roteiro[i-1]['e'] if i else 0
        x.update(s=p, e=p+0.05)
json.dump(roteiro, open(os.path.join(d,'palavras.json'),'w'), ensure_ascii=False, indent=0)
print(f'palavras roteiro={len(roteiro)} falado={len(fal)} iguais={sum(b.size for b in sm.get_matching_blocks())}')
for op, r, f, t in difs:
    print(f'[{t:7.2f}s] {op:8s} roteiro: "{r}"  |  áudio: "{f}"' if t is not None else f'[  fim  ] {op} roteiro: "{r}" | áudio: "{f}"')
