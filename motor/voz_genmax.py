"""Narração pelo GenMax (vozes do ElevenLabs), a voz padrão do canal desde o EP02.

Uso:  python3 -I motor/voz_genmax.py episodios/epXX-nome/pt [voice_id]
      (voice_id padrão: Little Dude II, fBD19tfE58bkETeiwUoC)

- Lê pt/narracao.txt, pede a voz ao GenMax (a chave já está salva no ambiente: o proxy injeta o
  cabeçalho xi-api-key em api.genmax.io; o valor "dummy" abaixo é trocado por ele).
- O GenMax é assíncrono: POST /v1/text-to-speech/{voz} devolve um id; GET /v1/history/{id} até
  status "completed"; baixa result.audio_url.
- Salva pt/voz.wav (44,1 kHz mono) e apaga pt/voz_original.wav, para o alinhar.py encurtar as
  pausas de novo. Depois rode:  python3 -I motor/alinhar.py episodios/epXX-nome/pt
"""
import json, os, subprocess, sys, time, urllib.request

API = 'https://api.genmax.io'
HDR = {'Content-Type': 'application/json', 'xi-api-key': 'dummy'}
VOZ_PADRAO = 'fBD19tfE58bkETeiwUoC'   # Little Dude II - Cartoon Character


def req(url, dados=None):
    r = urllib.request.Request(url, data=json.dumps(dados).encode() if dados else None, headers=HDR)
    with urllib.request.urlopen(r, timeout=120) as f:
        return f.read()


def main():
    pasta = sys.argv[1]
    voz = sys.argv[2] if len(sys.argv) > 2 else VOZ_PADRAO
    texto = open(os.path.join(pasta, 'narracao.txt'), encoding='utf-8').read()
    corpo = {'text': texto, 'model_id': 'eleven_multilingual_v2', 'language_code': 'pt'}
    job = json.loads(req(f'{API}/v1/text-to-speech/{voz}?output_format=mp3_44100_128', corpo))
    print('pedido:', job['id'], '(a fila do GenMax pode levar alguns minutos)')
    for _ in range(300):
        st = json.loads(req(f"{API}/v1/history/{job['id']}"))
        if st['status'] not in ('pending', 'processing'):
            break
        time.sleep(6)
    if st['status'] != 'completed':
        sys.exit(f"GenMax: {st['status']} {st.get('error')} {st.get('detail_error')}")
    mp3 = os.path.join(pasta, 'voz_genmax.mp3')
    open(mp3, 'wb').write(req(st['result']['audio_url']))
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', mp3, '-ar', '44100', '-ac', '1', os.path.join(pasta, 'voz.wav')], check=True)
    os.remove(mp3)
    orig = os.path.join(pasta, 'voz_original.wav')
    if os.path.exists(orig):
        os.remove(orig)
    print('voz salva em', os.path.join(pasta, 'voz.wav'), '— agora: python3 -I motor/alinhar.py', pasta)


if __name__ == '__main__':
    main()
