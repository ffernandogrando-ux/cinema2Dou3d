"""Gera motor/acervo/CATALOGO.md: a lista de peças prontas de cada arquivo do acervo, com a 1ª linha de comentário.
Uso: python3 -I motor/acervo/catalogo.py   (rodar sempre que mexer no acervo)."""
import os, re

AQUI = os.path.dirname(os.path.abspath(__file__))
linhas = ['# Catálogo do acervo', '',
          'Gerado por `python3 -I motor/acervo/catalogo.py`. Não edite à mão.', '',
          'Para usar: na 3ª linha do `cenas.js`, `//@acervo base elenco ...` com os arquivos que o episódio precisa.',
          'Antes de desenhar qualquer peça, procure aqui. Se existir, use (passe opções). Se precisar mudar, mude no acervo.', '']
for arq in sorted(f for f in os.listdir(AQUI) if f.endswith('.js')):
    src = open(os.path.join(AQUI, arq), encoding='utf-8').read().split('\n')
    desc = src[1][3:].strip() if len(src) > 1 and src[1].startswith('//') else ''
    linhas += [f'## `{arq[:-3]}`', '', desc, '']
    for i, ln in enumerate(src):
        m = re.match(r'^(?:const|let|function)\s+([A-Za-z_$][\w$]*)\s*(\([^)]*\))?', ln)
        r = re.findall(r"MUNDO\.registrar\('([^']+)'", ln)
        if m:
            nota = re.search(r'//\s*(.+)$', ln)
            args = m.group(2) or ''
            linhas.append(f'- `{m.group(1)}{args}`' + (f': {nota.group(1)[:110]}' if nota else ''))
        for nome in r:
            fim = next((j for j in range(i + 1, len(src)) if 'MUNDO.registrar(' in src[j] or re.match(r'^\S', src[j])), len(src))
            opts = sorted(set(re.findall(r'\bo\.([a-zA-Z]\w*)', '\n'.join(src[i:fim]))))
            linhas.append(f'- cenário 3D `{nome}`' + (f' (opções: {", ".join(opts[:25])})' if opts else ''))
    linhas.append('')
open(os.path.join(AQUI, 'CATALOGO.md'), 'w', encoding='utf-8').write('\n'.join(linhas))
print('CATALOGO.md:', sum(1 for l in linhas if l.startswith('- ')), 'peças')
