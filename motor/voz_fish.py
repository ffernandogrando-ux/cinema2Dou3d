"""Gera a narração com o clone da voz do canal (Ryan, referência tirada do EP03) no Fish Audio.
Uso: python3 -I motor/voz_fish.py <pasta_idioma> [palavras_por_segundo=3.4]
Lê narracao.txt, gera em blocos de ~8 linhas (prosódia estável), junta com pausas curtas,
ajusta o andamento para o ritmo alvo e grava voz.wav (44,1 kHz mono)."""
import sys, os, subprocess, urllib.request, msgpack, tempfile
d = sys.argv[1]; alvo = float(sys.argv[2]) if len(sys.argv) > 2 else 3.4
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'voz_ref')
ref = {'audio': open(os.path.join(R, 'ryan_ref.wav'), 'rb').read(), 'text': open(os.path.join(R, 'ryan_ref.txt')).read()}
linhas = [l.strip() for l in open(os.path.join(d, 'narracao.txt')) if l.strip()]
tmp = tempfile.mkdtemp(); partes = []
def tts(txt, out):
    body = {'text': txt, 'format': 'wav', 'references': [ref], 'normalize': True, 'latency': 'normal'}
    for k in range(4):
        try:
            r = urllib.request.Request('https://api.fish.audio/v1/tts', msgpack.packb(body), {'Content-Type': 'application/msgpack', 'Authorization': 'Bearer dummy', 'model': 's2.1-pro-free'})
            open(out, 'wb').write(urllib.request.urlopen(r, timeout=600).read()); return
        except Exception as e: print('tentativa', k + 1, e)
    raise SystemExit('falhou: ' + txt[:60])
B = 8
for i in range(0, len(linhas), B):
    o = os.path.join(tmp, f'{i:03d}.wav'); tts(' '.join(linhas[i:i + B]), o)
    t = os.path.join(tmp, f'{i:03d}t.wav')  # tira silêncio das pontas
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', o, '-af', 'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,aresample=44100', '-ac', '1', t], check=True)
    partes.append(t); print('bloco', i // B + 1, 'ok')
lst = os.path.join(tmp, 'l.txt')
sil = os.path.join(tmp, 'sil.wav'); subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono', '-t', '0.35', sil], check=True)
open(lst, 'w').write(''.join(f"file '{p}'\nfile '{sil}'\n" for p in partes))
bruto = os.path.join(tmp, 'bruto.wav'); subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst, bruto], check=True)
dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', bruto], capture_output=True, text=True).stdout)
n = sum(len(l.split()) for l in linhas); f = max(.85, min(1.3, n / dur / alvo and alvo / (n / dur)))
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', bruto, '-af', f'atempo={f:.3f},loudnorm=I=-24:TP=-2:LRA=11', '-ar', '44100', '-ac', '1', os.path.join(d, 'voz.wav')], check=True)
print(f'voz.wav: {n} palavras, {dur:.1f}s brutos -> {dur / f:.1f}s (andamento x{f:.2f})')
