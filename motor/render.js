// Uso:
//   node motor/render.js <pasta_episodio> <idioma> video          -> vídeo final (MP4 com áudio)
//     (cache por plano em <idioma>/_render/cache: só renderiza de novo os planos que mudaram; REFAZER=40,52 força planos)
//   node motor/render.js <pasta_episodio> <idioma> previa [passo] -> folha de contato (1 quadro a cada <passo> s)
//   node motor/render.js <pasta_episodio> <idioma> quadros t1,t2  -> PNGs soltos nesses tempos
//   node motor/render.js <pasta_episodio> <idioma> checar         -> enquadramento (legenda, cortes, câmera atravessando)
//   node motor/render.js <pasta_episodio> <idioma> planos         -> revisão visual: início/meio/fim de cada plano + frase (pt/revisao/)
// Espera: <ep>/cenas.js, <ep>/<idioma>/palavras.json, <ep>/<idioma>/voz.wav
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const [ep, lang, modo = 'previa', arg] = process.argv.slice(2);
const EP = path.resolve(ep), L = path.join(EP, lang), MOTOR = __dirname;
const FPS = 30, ESC = 1.25; // 576x1024 * 1.25 = 720x1280
const html = fs.readFileSync(path.join(MOTOR, 'player.html'), 'utf8')
  .replace('/*THREE*/', () => { const f = path.join(MOTOR, '..', 'node_modules', 'three', 'build', 'three.min.js'); return fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : ''; })
  .replace('/*LIB*/', () => ['lib.js', 'stick.js', 'mundo3d.js'].map(f => fs.readFileSync(path.join(MOTOR, f), 'utf8')).join('\n'))
  .replace('/*PALAVRAS*/', () => fs.readFileSync(path.join(L, 'palavras.json'), 'utf8'))
  .replace('/*CENAS*/', () => comAcervo(fs.readFileSync(path.join(EP, 'cenas.js'), 'utf8')));
// Acervo: o cenas.js declara as peças prontas que usa numa linha "//@acervo base elenco objetos ..." e o motor
// carrega motor/acervo/<nome>.js antes do episódio, no mesmo escopo. As peças do acervo não entram na chave do cache
// (como as do cenas.js): a conferência por PSNR refaz só os planos que mudaram de verdade.
function comAcervo(src) {
  const m = /^\/\/\s*@acervo\s+(.+)$/m.exec(src); if (!m) return src;
  const nomes = m[1].trim().split(/[\s,]+/).filter(Boolean);
  return nomes.map(n => { const f = path.join(MOTOR, 'acervo', n + '.js'); if (!fs.existsSync(f)) throw new Error('acervo não encontrado: ' + f);
    return `// ===== acervo/${n}.js\n` + fs.readFileSync(f, 'utf8'); }).join('\n') + '\n// ===== cenas.js do episódio\n' + src;
}
const tmp = path.join(L, '_render'); fs.mkdirSync(tmp, { recursive: true });
fs.writeFileSync(path.join(tmp, 'build.html'), html);
async function pagina(b) {
  const p = await b.newPage({ viewport: { width: 576, height: 1024 }, deviceScaleFactor: ESC });
  p.on('pageerror', e => console.log('ERRO', e.message));
  await p.goto('file://' + path.join(tmp, 'build.html')); await p.evaluate(() => document.fonts.ready);
  return p;
}
// ---------------- mixagem: voz + efeitos (+ música com abaixamento automático sob a voz)
const SONS_DIR = path.join(MOTOR, '..', 'sons');
// Nível de cada efeito: os arquivos de som vêm com volumes muito diferentes (até 20 dB). Mede-se o pico de RMS
// (janelas de 50 ms) de cada um e todos são levados ao mesmo nível (SOM_ALVO_DB) antes do volume do plano (v) e
// do EFEITOS_DB do episódio. Assim v = 1 soa igual para qualquer efeito. Medidas guardadas em sons/_niveis.json.
const SOM_ALVO_DB = -12;
const _niveisF = path.join(MOTOR, '..', 'sons', '_niveis.json');
let _niveis = null;
function nivelSom(n) { if (!_niveis) _niveis = fs.existsSync(_niveisF) ? JSON.parse(fs.readFileSync(_niveisF, 'utf8')) : {};
  const f = arqSom(n), st = fs.statSync(f).mtimeMs, k = n + '|' + st; if (_niveis[k] != null) return _niveis[k];
  const raw = execFileSync('ffmpeg', ['-v', 'error', '-i', f, '-ac', '1', '-ar', '22050', '-f', 's16le', '-'], { maxBuffer: 1 << 28 });
  const N = raw.length >> 1, W = 1102; let pico = 0;
  for (let i = 0; i + W <= N; i += W >> 1) { let q = 0; for (let j = i; j < i + W; j++) { const v = raw.readInt16LE(j * 2) / 32768; q += v * v; } pico = Math.max(pico, Math.sqrt(q / W)); }
  const db = 20 * Math.log10(Math.max(pico, 1e-6)); _niveis[k] = +db.toFixed(2); fs.writeFileSync(_niveisF, JSON.stringify(_niveis, null, 1)); return _niveis[k]; }
function ganhoSom(n) { const g = Math.max(-12, Math.min(18, SOM_ALVO_DB - nivelSom(n))); return Math.pow(10, g / 20); }
function arqSom(n) { for (const e of ['.wav', '.ogg', '.mp3']) { const f = path.join(SONS_DIR, n + e); if (fs.existsSync(f)) return f; } throw new Error('som não encontrado: ' + n); }
function envelopeVoz() { // RMS da voz em janelas de 50 ms (dB); devolve t -> ganho linear para o efeito naquele instante
  const raw = execFileSync('ffmpeg', ['-v', 'error', '-i', path.join(L, 'voz.wav'), '-ac', '1', '-ar', '22050', '-f', 's16le', '-'], { maxBuffer: 1 << 29 });
  const N = raw.length >> 1, W = 1102, db = [];
  for (let i = 0; i + W <= N; i += W) { let q = 0; for (let j = i; j < i + W; j++) { const v = raw.readInt16LE(j * 2) / 32768; q += v * v; } db.push(10 * Math.log10(Math.max(q / W, 1e-12))); }
  const ativos = db.filter(x => x > -45).sort((a, b) => a - b); const ref = ativos.length ? ativos[Math.floor(ativos.length * .6)] : -20;
  return t => { const k = Math.round(t / .05); let loc = null;
    for (let r = 10; r <= 60 && loc == null; r += 10) { const v = db.slice(Math.max(0, k - r), k + r + 6).filter(x => x > -45); if (v.length) loc = v.sort((a, b) => a - b)[Math.floor(v.length * .6)]; }
    const g = Math.max(-9, Math.min(3, (loc == null ? ref : loc) - ref)); return Math.pow(10, g / 20); }; }
async function mixar(p, DUR) {
  const { cues, amb } = await p.evaluate(() => window.SONS());
  const fxDb = await p.evaluate(() => typeof EFEITOS_DB !== 'undefined' ? EFEITOS_DB : 0); // volume dos efeitos em dB (no cenas.js do episódio)
  fs.writeFileSync(path.join(L, 'sons.json'), JSON.stringify({ cues, amb }, null, 1));
  const musica = ['musica.mp3', 'musica.wav'].map(f => path.join(L, f)).concat(['musica.mp3', 'musica.wav'].map(f => path.join(EP, f))).find(f => fs.existsSync(f));
  const F = 'aformat=sample_rates=44100:channel_layouts=stereo', D = DUR.toFixed(2);
  // 1) faixa de EFEITOS (efeitos pontuais + ambientes), sem a voz
  // Voz com volume variável (narração com emoção, sem corte das pausas): com EFEITOS_SEGUEM_VOZ = true no cenas.js,
  // cada efeito acompanha o volume local da voz (de −9 a +3 dB em relação ao nível típico), para não tapar a voz
  // quando ela fica baixa (sussurro) nem sumir quando ela grita.
  const segue = await p.evaluate(() => typeof EFEITOS_SEGUEM_VOZ !== 'undefined' && EFEITOS_SEGUEM_VOZ);
  const ajVoz = segue ? envelopeVoz() : () => 1;
  const args = ['-v', 'error', '-y']; let fc = '', ins = [], n = 0;
  cues.forEach(c => { args.push('-i', arqSom(c.som)); const ms = Math.round(c.t * 1000); fc += `[${n}:a]${F},volume=${(c.v * ganhoSom(c.som) * ajVoz(c.t)).toFixed(4)},adelay=${ms}|${ms}[c${n}];`; ins.push(`[c${n}]`); n++; });
  amb.forEach(a => { args.push('-stream_loop', '-1', '-i', arqSom('amb_' + a.som)); const d = (a.fim - a.ini).toFixed(3), ms = Math.round(a.ini * 1000);
    fc += `[${n}:a]${F},atrim=0:${d},afade=t=in:d=0.25,afade=t=out:st=${Math.max(0, a.fim - a.ini - .3).toFixed(3)}:d=0.3,volume=${a.v},adelay=${ms}|${ms}[c${n}];`; ins.push(`[c${n}]`); n++; });
  fc += `${ins.join('')}amix=inputs=${ins.length}:normalize=0,apad=whole_dur=${D},atrim=0:${D}[out]`;
  const fxRaw = path.join(tmp, 'efeitos_raw.wav');
  execFileSync('ffmpeg', [...args, '-filter_complex', fc, '-map', '[out]', fxRaw]);
  // 2) mix bruto = voz + efeitos (+ música abaixando sob a voz)
  const mArgs = ['-v', 'error', '-y', '-i', path.join(L, 'voz.wav'), '-i', fxRaw]; if (musica) mArgs.push('-stream_loop', '-1', '-i', musica);
  let mfc = `[0:a]${F},apad=whole_dur=${D},atrim=0:${D},asplit=2[voz][vsc];[1:a]${F},volume=${fxDb}dB[fx];`;
  if (musica) mfc += `[2:a]${F},volume=0.22[mu];[mu][vsc]sidechaincompress=threshold=0.03:ratio=6:attack=40:release=400[mud];[voz][fx][mud]amix=inputs=3:normalize=0:duration=first[out]`;
  else mfc += `[vsc]anullsink;[voz][fx]amix=inputs=2:normalize=0:duration=first[out]`;
  const mixRaw = path.join(tmp, 'mix_raw.wav');
  execFileSync('ffmpeg', [...mArgs, '-filter_complex', mfc, '-map', '[out]', mixRaw]);
  // 3) mesmo ganho em tudo, para o mix ficar em -14 LUFS e as faixas somarem igual
  const r = require('child_process').spawnSync('ffmpeg', ['-i', mixRaw, '-af', 'ebur128', '-f', 'null', '-'], { encoding: 'utf8' });
  const mI = [...r.stderr.matchAll(/I:\s+(-?[0-9.]+) LUFS/g)]; const I = parseFloat(mI[mI.length - 1][1]);
  const g = (-14 - I).toFixed(2);
  const out = path.join(L, 'mix.wav');
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', mixRaw, '-af', `volume=${g}dB,alimiter=limit=0.89:level=false`, out]);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', fxRaw, '-af', `volume=${(+g + fxDb).toFixed(2)}dB,alimiter=limit=0.89:level=false`, path.join(L, 'faixa_efeitos.wav')]);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', path.join(L, 'voz.wav'), '-af', `aformat=sample_rates=44100:channel_layouts=stereo,apad=whole_dur=${D},atrim=0:${D},volume=${g}dB,alimiter=limit=0.89:level=false`, path.join(L, 'faixa_voz.wav')]);
  console.log(`mix: ${cues.length} efeitos + ${amb.length} trechos de ambiente${musica ? ' + música' : ''} (ganho ${g} dB)`);
  return out;
}
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p0 = await pagina(b); const DUR = await p0.evaluate(() => window.DUR);
  if (modo === 'checar') { const v = await p0.evaluate(() => CHECAR(.25)); const por = {};
    v.forEach(x => { const k = x.tipo + '|' + x.linha + ':' + x.palavra; (por[k] = por[k] || []).push(x); });
    const ks = Object.keys(por);
    console.log(ks.length ? `ATENÇÃO: ${ks.length} problema(s) de enquadramento:` : 'OK: nenhum rosto na zona da legenda, ninguém cortado, nenhum objeto marcado cortado.');
    ks.forEach(k => { const a = por[k], [tipo, pl] = k.split('|'); console.log(`  plano ${pl}  ~${a[0].t}–${a[a.length - 1].t}s  ${tipo === 'legenda' ? `rosto baixo (olhos a ${Math.max(...a.map(x => x.olho))}% da altura, perto da legenda)` : tipo}`); }); }
  else if (modo === 'planos') { // revisão visual: 3 quadros (início, meio, fim) de cada plano + a frase narrada, para um revisor conferir
    const dir = path.join(L, 'revisao'); fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir);
    const lista = await p0.evaluate(() => PLANOS.map((p, i) => { const ws = LINHAS[p.l].map(j => PALAVRAS[j].w); return { i, linha: p.l, palavra: p.w || 0, ini: +p.ini.toFixed(2), fim: +p.fim.toFixed(2), d3: !!p.g3d, frase: ws.join(' '), aPartirDe: ws.slice(p.w || 0).join(' ') }; }));
    for (const pl of lista) { const nome = String(pl.i).padStart(3, '0'); const fs3 = [];
      for (const k of [.12, .5, .88]) { const t = pl.ini + (pl.fim - pl.ini) * k; await p0.evaluate(t => render(t), t); const f = path.join(dir, `${nome}_${k}.png`); await p0.screenshot({ path: f }); fs3.push(f); }
      execFileSync('ffmpeg', ['-v', 'error', '-y', ...fs3.flatMap(f => ['-i', f]), '-filter_complex', '[0]scale=300:-1[a];[1]scale=300:-1[b];[2]scale=300:-1[c];[a][b][c]hstack=3', path.join(dir, `plano_${nome}.jpg`)]);
      fs3.forEach(f => fs.unlinkSync(f)); }
    fs.writeFileSync(path.join(dir, 'planos.json'), JSON.stringify(lista, null, 1));
    // folhas com 4 planos cada (uma linha por plano: início | meio | fim), para o revisor visual
    for (let a = 0; a < lista.length; a += 4) { const g = lista.slice(a, a + 4).map(pl => path.join(dir, `plano_${String(pl.i).padStart(3, '0')}.jpg`));
      execFileSync('ffmpeg', ['-v', 'error', '-y', ...g.flatMap(f => ['-i', f]), '-filter_complex', g.length > 1 ? `${g.map((_, k) => `[${k}]`).join('')}vstack=${g.length}` : 'null', path.join(dir, `folha_${String(a).padStart(3, '0')}-${String(a + g.length - 1).padStart(3, '0')}.jpg`)]); }
    console.log(`revisão: ${lista.length} planos em ${dir} (plano_NNN.jpg = início/meio/fim; planos.json = frase de cada plano)`); }
  else if (modo === 'audio') { console.log('mix:', await mixar(p0, DUR)); }
  else if (modo === 'quadros') {
    for (const t of arg.split(',').map(Number)) { await p0.evaluate(t => render(t), t); await p0.screenshot({ path: path.join(tmp, `q_${t}.png`) }); }
  } else if (modo === 'previa') {
    const passo = +(arg || 2), dir = path.join(tmp, 'previa'); fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir);
    let n = 0; for (let t = 0.3; t < DUR; t += passo) { await p0.evaluate(t => render(t), t); await p0.screenshot({ path: path.join(dir, String(n++).padStart(4, '0') + '.png') }); }
    const cols = 8, rows = Math.ceil(n / cols);
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', '1', '-i', path.join(dir, '%04d.png'), '-vf', `scale=180:-1,tile=${cols}x${rows}:padding=4:color=white`, '-frames:v', '1', path.join(L, 'previa.jpg')]);
    console.log('prévia:', path.join(L, 'previa.jpg'), n, 'quadros');
  } else {
    // 'video' = episódio inteiro; 'trecho' a-b = só esse pedaço (em segundos), para teste
    const [ta, tb] = modo === 'trecho' ? arg.split('-').map(Number) : [0, DUR];
    const F0 = Math.floor(ta * FPS), N = Math.ceil(Math.min(tb, DUR) * FPS), W = 4, dir = path.join(tmp, 'frames');
    // Cache por plano: cada quadro só depende do tempo e do seu plano. Um plano que não mudou reaproveita os quadros
    // já renderizados; só os planos alterados (ou todos, se o código comum mudou) são renderizados de novo.
    // O vídeo final é sempre codificado de uma vez a partir dos PNGs, então não há emenda nem perda de qualidade.
    const crypto = require('crypto'), h = x => crypto.createHash('sha1').update(x).digest('hex').slice(0, 16);
    // A chave do plano = motor + palavras + o que vale para todos (HUD, cor, gancho, legenda) + o código do próprio plano.
    // As peças do cenas.js (cenários, ajudantes) não entram na chave: em vez disso, cada plano guardado é CONFERIDO
    // renderizando 3 quadros dele de novo; se algum mudar, o plano inteiro é refeito. Assim, acrescentar o bloco C
    // não invalida os blocos A e B, e mexer num cenário refaz só os planos em que ele aparece.
    const global = await p0.evaluate(() => ['GANCHO', 'LEGENDA_PALAVRAS', 'CAUDA', 'CORTE_MAX_EP', 'AMBIENTE'].map(n => {
      try { const v = eval(n); return n + '=' + (typeof v === 'function' ? v.toString() : JSON.stringify(v)); } catch (e) { return n + '=-'; } }).join('\n'));
    const comum = h([global, ...['player.html', 'lib.js', 'stick.js', 'mundo3d.js'].map(f => fs.readFileSync(path.join(MOTOR, f), 'utf8')),
      fs.readFileSync(path.join(L, 'palavras.json'), 'utf8'), String(FPS), String(ESC)].join('\u0000'));
    // o HUD e a cor (SAT) entram na chave pelo que eles DESENHAM em cada quadro do plano: mudar um evento do HUD
    // lá no fim do episódio não invalida os planos do começo.
    const planos = await p0.evaluate(FPS => { let n = 0; return PLANOS.map(p => { let vis = '';
      for (let f = Math.ceil(p.ini * FPS - 1e-6); f / FPS < p.fim; f++) { const t = f / FPS;
        vis += (typeof HUD !== 'undefined' ? HUD(t, p) : '') + '|' + (typeof SAT !== 'undefined' ? SAT(t, p) : 1) + '\n'; }
      return { ini: p.ini, fim: p.fim, n: p.sub ? n : ++n, vis,
        src: JSON.stringify(p, (k, v) => k[0] === '_' ? undefined : typeof v === 'function' ? v.toString() : v) }; }); }, FPS);
    planos.forEach(p => { p.src += '|' + h(p.vis); delete p.vis; });
    planos.forEach(p => { p.key = h(comum + '|' + p.src); p.f0 = Math.ceil(p.ini * FPS - 1e-6); });
    const cache = path.join(tmp, 'cache'), man = path.join(cache, 'manifesto.json'); fs.mkdirSync(cache, { recursive: true });
    const refazer = new Set((process.env.REFAZER || '').split(',').filter(Boolean).map(Number)); // REFAZER=40,52 força esses planos
    for (const p of planos) if (refazer.has(p.n)) fs.rmSync(path.join(cache, p.key), { recursive: true, force: true });
    const vivas = new Set(planos.map(p => p.key));
    for (const d of fs.readdirSync(cache)) if (d !== 'manifesto.json' && !vivas.has(d)) fs.rmSync(path.join(cache, d), { recursive: true, force: true }); // libera o disco
    const planoDe = f => { let i = planos.length - 1; while (i > 0 && planos[i].f0 > f) i--; return planos[i]; };
    const arq = f => { const p = planoDe(f), d = path.join(cache, p.key); return path.join(d, String(f).padStart(5, '0') + '.png'); };
    // conferência dos planos guardados: 3 quadros de cada (início, meio, fim) renderizados de novo e comparados
    const psnr = (a, b2) => { const r = require('child_process').spawnSync('ffmpeg', ['-i', a, '-i', b2, '-lavfi', 'psnr', '-f', 'null', '-'], { encoding: 'utf8' });
      const m = /average:(\S+)/.exec(r.stderr || ''); return m ? (m[1] === 'inf' ? 99 : Number(m[1])) : 0; };
    const conf = path.join(tmp, 'conferencia.png'); let refeitos = 0;
    for (const p of planos) { const d = path.join(cache, p.key); if (!fs.existsSync(d)) continue;
      const fs_ = fs.readdirSync(d).filter(x => /^\d+\.png$/.test(x)).sort(); if (!fs_.length) continue;
      for (const x of [fs_[0], fs_[fs_.length >> 1], fs_[fs_.length - 1]]) { await p0.evaluate(t => render(t), Number(x.slice(0, 5)) / FPS); await p0.screenshot({ path: conf });
        if (psnr(conf, path.join(d, x)) < 45) { fs.rmSync(d, { recursive: true, force: true }); refeitos++; break; } } }
    if (refeitos) console.log(`conferência: ${refeitos} plano(s) guardado(s) mudaram (cenário ou peça alterada) e serão refeitos`);
    const usados = new Set(), novos = new Set(); for (let f = F0; f < N; f++) { const p = planoDe(f); usados.add(p.n); if (!fs.existsSync(arq(f))) novos.add(p.n); }
    console.log(`cache: ${usados.size - novos.size} planos reaproveitados, ${novos.size} a renderizar${novos.size && novos.size < 30 ? ' (' + [...novos].join(', ') + ')' : ''}`);
    fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
    const pages = [p0]; for (let i = 1; i < W; i++) pages.push(await pagina(b));
    let next = F0, feitos = 0; const t0 = Date.now();
    await Promise.all(pages.map(async p => { while (true) { const f = next++; if (f >= N) break; const out = arq(f);
      if (!fs.existsSync(out)) { fs.mkdirSync(path.dirname(out), { recursive: true }); await p.evaluate(t => render(t), f / FPS);
        const parc = out + '.parcial.png'; await p.screenshot({ path: parc }); fs.renameSync(parc, out); feitos++; // nunca deixa PNG pela metade no cache
        if (feitos % 300 === 0) console.log(`${feitos} quadros novos (${((Date.now() - t0) / 1000).toFixed(0)}s)`); }
      fs.symlinkSync(out, path.join(dir, String(f - F0).padStart(5, '0') + '.png')); } }));
    fs.writeFileSync(man, JSON.stringify({ comum, planos: planos.map(({ n, ini, fim, key }) => ({ n, ini, fim, key })) }, null, 1));
    console.log(`quadros: ${feitos} novos, ${N - F0 - feitos} do cache (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
    const mix = await mixar(p0, DUR);
    const outMp4 = path.join(L, modo === 'trecho' ? `trecho_${ta}-${tb}.mp4` : 'video_final.mp4');
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS), '-i', path.join(dir, '%05d.png'), '-ss', String(F0 / FPS), '-i', mix,
      '-filter_complex', '[1:a]apad[a]', '-map', '0:v', '-map', '[a]', '-t', String((N - F0) / FPS), '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', outMp4]);
    console.log('vídeo:', outMp4);
  }
  await b.close();
})();
