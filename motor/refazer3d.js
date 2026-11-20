// Apaga só os quadros dos planos 3D (g3d) de um episódio já renderizado, para refazê-los com
// RETOMAR=1 node motor/render.js <ep> <idioma> video  (os planos 2D são reaproveitados).
// Uso: node motor/refazer3d.js <pasta_episodio> <idioma>
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const [ep, lang] = process.argv.slice(2); const L = path.join(path.resolve(ep), lang), dir = path.join(L, '_render', 'frames');
(async () => { const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(L, '_render', 'build.html'));
  const faixas = await p.evaluate(() => PLANOS.filter(x => x.g3d).map(x => [x.ini, x.fim]));
  let n = 0; for (const [a, z] of faixas) for (let f = Math.floor(a * 30) - 1; f <= Math.ceil(z * 30) + 1; f++) { const q = path.join(dir, String(f).padStart(5, '0') + '.png'); if (fs.existsSync(q)) { fs.unlinkSync(q); n++; } }
  console.log(`${faixas.length} planos 3D, ${n} quadros apagados`); await b.close(); })();
