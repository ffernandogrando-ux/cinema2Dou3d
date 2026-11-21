"""Efeitos e ambientes pelo ElevenLabs Sound Effects (chave "Music + Sound Effects" salva no ambiente).

Uso:  python3 -I motor/sfx_eleven.py lista.tsv
      cada linha do .tsv:  nome<TAB>segundos<TAB>descrição em inglês (ex.: "huge stadium crowd roaring, no music")

- nome começando com "amb_" vira ambiente em loop: sons/amb_<resto>.wav, com a emenda cruzada (2 s),
  e entra no AMBIENTE do cenas.js como ['<resto>', volume].
- os outros vão para sons/fx/<nome>.wav e entram no sfx do plano como s: 'fx/<nome>'.
- Não sobrescreve um som que já existe (apague o arquivo para gerar de novo).
- Descreva sempre "no music"; peça 3 a 22 s. Ambientes saem mais baixos que os efeitos: meça com
  ffmpeg -af volumedetect e ajuste o volume no AMBIENTE (multidão ~1, camarote ~3, rua ~4).
"""
import json, os, subprocess, sys, urllib.request
import numpy as np, wave

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'sons')


def gerar(texto, seg):
    r = urllib.request.Request('https://api.elevenlabs.io/v1/sound-generation',
                               data=json.dumps({'text': texto, 'duration_seconds': seg, 'prompt_influence': .5}).encode(),
                               headers={'Content-Type': 'application/json', 'xi-api-key': 'dummy'})
    with urllib.request.urlopen(r, timeout=180) as f:
        return f.read()


def para_wav(mp3, wav):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', mp3, '-ar', '44100', '-ac', '2', wav], check=True)


def loop_sem_emenda(wav):
    w = wave.open(wav); sr = w.getframerate(); a = np.frombuffer(w.readframes(w.getnframes()), np.int16).reshape(-1, 2).astype(np.float32); w.close()
    x = int(2 * sr); corpo = a[:-x].copy(); r = np.linspace(0, 1, x)[:, None]
    corpo[:x] = corpo[:x] * r + a[-x:] * (1 - r)
    o = wave.open(wav, 'wb'); o.setnchannels(2); o.setsampwidth(2); o.setframerate(sr); o.writeframes(corpo.clip(-32768, 32767).astype(np.int16).tobytes()); o.close()


def main():
    os.makedirs(os.path.join(RAIZ, 'fx'), exist_ok=True)
    for linha in open(sys.argv[1], encoding='utf-8'):
        if not linha.strip() or linha.startswith('#'):
            continue
        nome, seg, texto = linha.rstrip('\n').split('\t')
        amb = nome.startswith('amb_')
        wav = os.path.join(RAIZ, nome + '.wav') if amb else os.path.join(RAIZ, 'fx', nome + '.wav')
        if os.path.exists(wav):
            print('já existe:', wav); continue
        mp3 = wav[:-4] + '.mp3'
        open(mp3, 'wb').write(gerar(texto, float(seg)))
        para_wav(mp3, wav); os.remove(mp3)
        if amb:
            loop_sem_emenda(wav)
        print('ok:', wav)


if __name__ == '__main__':
    main()
