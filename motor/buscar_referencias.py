"""Vigia os canais de referência e transcreve os vídeos novos.

Uso:
  python3 -I motor/buscar_referencias.py          # checa todos, transcreve os novos
  python3 -I motor/buscar_referencias.py --base   # só marca o que existe hoje como visto (sem transcrever)
  python3 -I motor/buscar_referencias.py --sem-transcrever
  python3 -I motor/buscar_referencias.py --forcar  # checa de novo mesmo se já checou hoje

Canais e vídeos já vistos ficam em referencias/canais.json (com a data de cada post e a data da checagem).
Cada checagem acrescenta uma seção em referencias/novidades.md.
Transcrições novas: referencias/<pasta do canal>/<data do post>_<id>.txt
"""
import sys, os, json, subprocess, datetime, tempfile

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CANAIS = os.path.join(RAIZ, 'referencias', 'canais.json')
NOVIDADES = os.path.join(RAIZ, 'referencias', 'novidades.md')


def ytdlp():
    try:
        subprocess.run(['yt-dlp', '--version'], capture_output=True, check=True)
    except Exception:
        subprocess.run([sys.executable, '-m', 'pip', 'install', '-q', 'yt-dlp'], check=True)
    return 'yt-dlp'


def listar(url):
    r = subprocess.run([ytdlp(), '--flat-playlist', '-J', url], capture_output=True, text=True, timeout=600)
    if r.returncode != 0:
        raise RuntimeError(r.stderr.strip()[-400:])
    return json.loads(r.stdout).get('entries') or []


_modelo = None
def transcrever(url, idioma, destino, cabecalho):
    global _modelo
    import numpy as np
    from faster_whisper import WhisperModel
    if _modelo is None:
        _modelo = WhisperModel('small', device='cpu', compute_type='int8', cpu_threads=4)
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run([ytdlp(), '-q', '-x', '--audio-format', 'm4a', '-o', os.path.join(tmp, 'a.%(ext)s'), url],
                       check=True, capture_output=True)
        raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', os.path.join(tmp, 'a.m4a'), '-ac', '1', '-ar', '16000',
                              '-f', 's16le', '-'], capture_output=True).stdout
    a = np.frombuffer(raw, np.int16).astype(np.float32) / 32768
    segs = list(_modelo.transcribe(a, language=idioma, beam_size=5, vad_filter=True)[0])
    palavras = sum(len(s.text.split()) for s in segs)
    with open(destino, 'w') as f:
        f.write(cabecalho.replace('{palavras}', str(palavras)) + '\n\n')
        f.write('\n'.join(f'[{s.start:6.1f}] {s.text.strip()}' for s in segs) + '\n')


def main():
    base = '--base' in sys.argv
    sem_tr = base or '--sem-transcrever' in sys.argv
    hoje = datetime.date.today().isoformat()
    dados = json.load(open(CANAIS))
    if dados.get('ultima_busca') == hoje and '--forcar' not in sys.argv:  # 1 busca por dia basta (economiza o início das sessões)
        print(f'referências já checadas hoje ({hoje}); nada a fazer. Use --forcar para checar de novo.')
        return
    dados['ultima_busca'] = hoje
    relatorio = []
    for c in dados['canais']:
        if c.get('ativo') is False:
            continue
        vistos = c.setdefault('vistos', {})
        try:
            vids = listar(c['url'])
        except Exception as e:
            relatorio.append(f"- **{c['nome']}**: erro ao listar ({e})")
            print('ERRO', c['nome'], e)
            continue
        novos = []
        for v in vids:
            vid = v['id']
            data = datetime.date.fromtimestamp(v['timestamp']).isoformat() if v.get('timestamp') else '?'
            info = {'data_post': data, 'views': v.get('view_count'), 'titulo': (v.get('description') or v.get('title') or '').strip()[:160]}
            if vid in vistos:
                vistos[vid].update(views=info['views'])  # atualiza views
                continue
            info['visto_em'] = hoje
            vistos[vid] = info
            novos.append((vid, v, info))
        c['ultima_checagem'] = hoje
        if base:
            print(f"{c['nome']}: {len(vids)} vídeos marcados como vistos")
            continue
        relatorio.append(f"- **{c['nome']}**: {len(novos)} novo(s) de {len(vids)}")
        pasta = os.path.join(RAIZ, 'referencias', c['pasta_transcricoes'])
        os.makedirs(pasta, exist_ok=True)
        for vid, v, info in sorted(novos, key=lambda n: n[2]['data_post']):
            url = v.get('url') or v.get('webpage_url')
            linha = f"  - {info['data_post']} · {info['views'] or 0:,} views · {info['titulo']} · {url}"
            if not sem_tr:
                arq = os.path.join(pasta, f"{info['data_post']}_{vid}.txt")
                cab = (f"# {info['titulo']}\n# postado {info['data_post']} · {info['views'] or 0:,} views na checagem de {hoje}"
                       f" · {v.get('duration')}s · {{palavras}} palavras · {url}")
                try:
                    transcrever(url, c.get('idioma', 'pt'), arq, cab)
                    linha += f" → `{os.path.relpath(arq, os.path.join(RAIZ, 'referencias'))}`"
                except Exception as e:
                    linha += f" (falhou a transcrição: {e})"
            relatorio.append(linha)
            print(linha, flush=True)
    json.dump(dados, open(CANAIS, 'w'), ensure_ascii=False, indent=1)
    if not base:
        novo = not os.path.exists(NOVIDADES)
        with open(NOVIDADES, 'a') as f:
            if novo:
                f.write('# Novidades dos canais de referência\n\nCada checagem (`motor/buscar_referencias.py`) acrescenta uma seção.\n')
            f.write(f"\n## Checagem de {hoje}\n" + '\n'.join(relatorio) + '\n')
    print('\n'.join(relatorio))


if __name__ == '__main__':
    main()
