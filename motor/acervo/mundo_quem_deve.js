// ACERVO · mundo_quem_deve
// Mundo da série 'Quem deve, afunda': céu/lama/rua/interior 2D, cenários 3D rua11, quarto11, oco11, sala11 (opções no MUNDO.registrar), luzes, bolhas, respingos.
// Carregado pelo motor/render.js quando o cenas.js do episódio declara: //@acervo mundo_quem_deve
// Não copie estas peças para o episódio: importe com //@acervo e, se precisar mudar, mude AQUI (todos os episódios ganham).

const LAMA = '#6f6357', LAMA_ESC = '#544a40', LAMA_LUZ = '#8c7f71', LAMA_NOITE = '#4a3f45';

// ---------------------------------------------------------------- 2D: fundos
function ceu2D(c1, c2, id) { return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect x="-400" y="-400" width="1400" height="1900" fill="url(#${id})"/>`; }
function lama2D(y, t, o = {}) { // superfície da lama do horizonte para baixo
  const R = rng(o.seed || 5); let s = `<rect x="-400" y="${y}" width="1400" height="1400" fill="${o.cor || LAMA}"/>`
    + `<rect x="-400" y="${y}" width="1400" height="40" fill="${LAMA_ESC}" opacity=".35"/>`;
  for (let i = 0; i < (o.liso ? 0 : 26); i++) { const x = -300 + R() * 1200, yy = y + 30 + R() * 560, w = 40 + R() * 140; s += `<ellipse cx="${x}" cy="${yy}" rx="${w}" ry="${w * .12 + (yy - y) * .02}" fill="${R() < .5 ? LAMA_LUZ : LAMA_ESC}" opacity=".35"/>`; }
  for (let i = 0; i < 5; i++) { const k = (t * .4 + i * .2) % 1, x = -100 + R() * 800, yy = y + 80 + R() * 400; s += `<ellipse cx="${x}" cy="${yy}" rx="${10 + k * 60}" ry="${(10 + k * 60) * .25}" fill="none" stroke="${LAMA_LUZ}" stroke-width="2" opacity="${.5 * (1 - k)}"/>`; }
  return s; }
function casasLonge2D(y, seed = 3, cor = '#9AA3A6') { const R = rng(seed); let s = '';
  for (let i = 0; i < 9; i++) { const x = -260 + i * 140 + R() * 40, w = 90 + R() * 50, h = 60 + R() * 70; s += `<rect x="${x}" y="${y - h}" width="${w}" height="${h + 4}" fill="${cor}" stroke="${STK_INK}" stroke-width="3" opacity=".9"/><path d="M${x - 8} ${y - h} l${w / 2 + 8} -${h * .35} l${w / 2 + 8} ${h * .35}z" fill="#7d6e66" stroke="${STK_INK}" stroke-width="3"/><rect x="${x + w * .3}" y="${y - h * .7}" width="${w * .4}" height="${h * .3}" fill="#5d6b78"/>`; }
  return s; }
function rua2D(t, o = {}) { const hz = o.hz ?? 600; return ceu2D('#AEB6BC', '#D7D4CC', 'ceuRua') + casasLonge2D(hz + 6) + lama2D(hz, t); }
function interior2D(t, o = {}) { const ch = o.chao ?? 720; // parede de casa, a lama é o piso
  return `<rect x="-400" y="-400" width="1400" height="1900" fill="#D9C7A8"/>` + `<rect x="-400" y="${ch - 300}" width="1400" height="10" fill="#B9A586"/>`
    + `<g opacity=".25">${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${-200 + i * 180} -200 v${ch + 200}" stroke="#a8916c" stroke-width="4"/>`).join('')}</g>` + lama2D(ch, t, { seed: 9 }); }

if (MUNDO) {
  MUNDO.registrar('rua11', (sc, o, K) => {
    const { THREE, malha, m, C, ceuTex, luzes, terreno } = K, n = !!o.noite;
    const cz = !!o.cinza; sc.background = o.azul ? ceuTex('#7FC0EE', '#CFE6F5', '#E9F2F7') : ceuTex(n ? '#0b1430' : cz ? '#9FA9B0' : '#E9C77E', n ? '#1d2a52' : cz ? '#C2C6C6' : '#E2DCCB', n ? '#2b3560' : '#C3C7C4');
    sc.fog = new THREE.Fog(n ? '#1d2a52' : '#C3C7C4', 30, 140);
    luzes(sc, n ? { dir: [-30, 60, 40], sol: 0x8fa4ff, forca: .9, hemi: 1.3, ceu: 0x8a90c0, chao: 0x5a4a52 } : cz ? { dir: [40, 60, 30], sol: 0xe8eef2, forca: 1.4, hemi: 1.15, ceu: 0xdde4ea, chao: 0x8a8278 } : { dir: [40, 60, 30], forca: 1.9, hemi: 1.05 });
    terreno(sc, n ? '#6a5a62' : LAMA);
    const box = (w, h, d, c, x, y, z, op = {}) => { const k = malha(new THREE.BoxGeometry(w, h, d), c, x, y, z, op); sc.add(k); return k; };
    // montinhos de lama (um piso só: discos achatados acima do terreno, alturas diferentes)
    const R = rng(21);
    for (let i = 0; i < 40; i++) { const g = new THREE.SphereGeometry(1, 16, 8); g.scale(1.5 + R() * 3, .06 + R() * .05, 1 + R() * 2); const k = malha(g, R() < .5 ? LAMA_LUZ : LAMA_ESC, -14 + R() * 28, -.02, -7 - R() * 63, { sombra: false }); k.material.color.multiplyScalar(n ? .6 : 1); sc.add(k); }
    // casas afundadas dos dois lados (porta enterrada, janela do 2º andar rente à lama)
    const cores = ['#E8D5B7', '#C9D6DF', '#E7C3B0', '#D6E2C3', '#F0E0A8'];
    const janelas = [];
    for (let i = 0; i < 14; i++) { const lado = i % 2 ? 1 : -1, z = 4 - Math.floor(i / 2) * 9 - (lado > 0 ? 3 : 0), x = lado * (8 + R() * 1.5), w = 6, d = 6, h = 6.4, af = 4.0 + R() * .3;
      const cs = new THREE.Group(); cs.position.set(x, 0, z); cs.rotation.z = (R() - .5) * .06; cs.rotation.x = (R() - .5) * .04; sc.add(cs);
      const pa = malha(new THREE.BoxGeometry(w, h, d), cz ? ['#B9B3AA', '#A9AEB2', '#B4AAA3', '#AFB3A6', '#BCB49C'][i % 5] : cores[i % 5], 0, h / 2 - af, 0); cs.add(pa);
      const tel = new THREE.Mesh(new THREE.ConeGeometry(w * .78, 2.4, 4), m(cz ? '#76675f' : '#8C5A4A')); tel.rotation.y = Math.PI / 4; tel.position.set(0, h - af + 1.2, 0); tel.castShadow = true; tel.receiveShadow = false; cs.add(tel);
      const vg = malha(new THREE.BoxGeometry(.1, .35, 1.3), '#6b4a3a', -lado * (w / 2 + .04), .1, -1.4, { sombra: false }); cs.add(vg);
      const mancha = malha(new THREE.BoxGeometry(.06, .5, d * .98), LAMA_ESC, -lado * (w / 2 + .02), .2, 0, { sombra: false }); cs.add(mancha);
      for (const jy of [h - af - 1.55]) { const jn = malha(new THREE.BoxGeometry(.08, 1.2, 1.6), n ? '#FFD98A' : '#5d6b78', -lado * (w / 2 + .05), jy, 1.2, { sombra: false }); cs.add(jn); janelas.push(jn); }
      const g = new THREE.SphereGeometry(1, 20, 8); g.scale(w * .62, .18, d * .62); sc.add(malha(g, LAMA_ESC, x, -.05, z, { sombra: false })); }
    // torre de vidro + nuvem do banco (ao longe; a nuvem não pega neblina)
    const TX = o.tx ?? 29, TZ = -230, NY = o.ny ?? 34;
    const vidro = new THREE.Mesh(new THREE.CylinderGeometry(o.torreFina ? .5 : 1.5, o.torreFina ? .5 : 1.5, NY - 4, 24, 1, true), new THREE.MeshStandardMaterial({ color: '#DCEFFA', transparent: true, opacity: o.torreFina ? .18 : .3, roughness: .1, metalness: .3, fog: false }));
    vidro.position.set(TX, (NY - 4) / 2, TZ); sc.add(vidro);
    for (let y = 4; y < NY - 6 && !o.torreFina; y += 4) { const a = new THREE.Mesh(new THREE.TorusGeometry(1.52, .07, 6, 24), new THREE.MeshStandardMaterial({ color: '#9fb3c2', fog: false })); a.rotation.x = Math.PI / 2; a.position.set(TX, y, TZ); sc.add(a); }
    const corda = new THREE.Mesh(new THREE.CylinderGeometry(.08, .08, NY + 6, 6), new THREE.MeshStandardMaterial({ color: '#3a2f28', fog: false })); corda.position.set(TX, (NY + 6) / 2, TZ); corda.visible = !!o.corda; sc.add(corda);
    if (o.revela) { const H = NY + 24; const vt = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, H, 24, 1, true), new THREE.MeshStandardMaterial({ color: '#DCEFFA', transparent: true, opacity: .25, fog: false })); vt.position.set(TX - 9, H / 2, TZ); sc.add(vt);
      const acesa = new THREE.MeshStandardMaterial({ color: '#FFD27A', emissive: C('#FFB43A'), emissiveIntensity: 2.2, fog: false });
      const ouroR = new THREE.MeshStandardMaterial({ color: '#C9A13A', metalness: .6, roughness: .3, fog: false });
      const rd = new THREE.Mesh(new THREE.TorusGeometry(4.5, .7, 12, 40), ouroR); rd.position.set(TX - 4.5, H, TZ); sc.add(rd);
      for (let i = 0; i < 4; i++) { const r = new THREE.Mesh(new THREE.BoxGeometry(9, .35, .35), ouroR); r.position.set(TX - 4.5, H, TZ); r.rotation.z = i * Math.PI / 4; sc.add(r); }
      const ex = new THREE.Mesh(new THREE.CylinderGeometry(.8, .8, 2.2, 16), ouroR); ex.rotation.x = Math.PI / 2; ex.position.set(TX - 4.5, H, TZ); sc.add(ex);
      const vidroF = new THREE.MeshStandardMaterial({ color: '#9fb3c2', metalness: .4, roughness: .4, fog: false });
      const vg = new THREE.Mesh(new THREE.BoxGeometry(6.5, .8, .8), vidroF); vg.position.set(TX - 7, H + 7, TZ); sc.add(vg);
      const vb = new THREE.Mesh(new THREE.BoxGeometry(.8, 7, .8), vidroF); vb.position.set(TX - 4.5, H + 3.5, TZ); sc.add(vb);
      const vt2 = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 7, 24, 1, true), vt.material); vt2.position.set(TX - 9, H + 3.5, TZ); sc.add(vt2);
      const c1 = new THREE.Mesh(new THREE.CylinderGeometry(.18, .18, H, 8), acesa); c1.position.set(TX - 9, H / 2, TZ); sc.add(c1);
      const c2 = new THREE.Mesh(new THREE.CylinderGeometry(.18, .18, H - (NY + 11), 8), acesa); c2.position.set(TX, (H + NY + 11) / 2, TZ); sc.add(c2);
      const pt = new THREE.PointLight('#FFC060', 30, 60, 1.2); pt.position.set(TX - 4.5, H - 2, TZ + 6); sc.add(pt); }
    const nuvem = new THREE.Group(); nuvem.position.set(TX, NY, TZ); sc.add(nuvem); if (o.semTorre) { nuvem.visible = false; vidro.visible = false; }
    if (o.caido) { vidro.visible = false; const ou = new THREE.MeshStandardMaterial({ color: '#F4C95D', emissive: C('#B8862B'), emissiveIntensity: .3, roughness: .8 }); const Rc = rng(5); for (let i = 0; i < 16; i++) { const a = Math.PI * (1.05 + Rc() * .9), r = 10 + Rc() * 8, g = new THREE.SphereGeometry(2 + Rc() * 2.5, 18, 10); g.scale(1, .28, 1); const k = new THREE.Mesh(g, ou); k.position.set(TX + Math.cos(a) * r, .1, TZ + Math.sin(a) * r * .7 - 2); k.receiveShadow = true; sc.add(k); } }
    const ouro = new THREE.MeshStandardMaterial({ color: '#F4C95D', emissive: C('#B8862B'), emissiveIntensity: n ? 1.4 : .35, roughness: .7, fog: false });
    [[0, -2.4, 0, 9], [-9, -2.7, 2, 7], [9, -2.7, 1, 7.5], [-4, -1.2, -3, 6.5], [5, -1.2, -2, 6.5], [0, -4.7, 4, 6], [-14, -4.2, 0, 5], [14, -4.2, -1, 5]].forEach(([x, y, z, r]) => { const k = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 16), ouro); k.position.set(x, y, z); k.scale.y = .55; nuvem.add(k); });
    const branco = new THREE.MeshStandardMaterial({ color: '#FFFFFF', emissive: C('#5a5650'), emissiveIntensity: .6, roughness: .5, fog: false });
    const pr = new THREE.Mesh(new THREE.BoxGeometry(14, 8.2, 9), branco); pr.position.set(0, 6.3, 0); nuvem.add(pr);
    for (let i = 0; i < (o.caido ? 0 : 6); i++) { const c = new THREE.Mesh(new THREE.CylinderGeometry(.4, .4, 3.4, 12), branco); c.position.set(-6 + i * 2.4, 5.1, 4.9); nuvem.add(c); }
    const tp = new THREE.Mesh(new THREE.BoxGeometry(15, 1.2, 10), branco); tp.position.set(0, 10.9, 0); nuvem.add(tp);
    const lg = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 1.2), new THREE.MeshBasicMaterial({ map: texPlaca(K, [['BANCO', 200, '#1d1f2b', .55]], { fundo: '#F4C95D' }), fog: false })); lg.position.set(-.3, 7.55, 4.62); nuvem.add(lg);
    if (o.casaFoco) { const cx = .9, cz = -9, w = 7, h = 6.4, af = 4.05; const cf = new THREE.Group(); cf.position.set(cx, 0, cz); cf.rotation.z = .035; sc.add(cf);
      cf.add(malha(new THREE.BoxGeometry(w, h, 6), '#E7C3B0', 0, h / 2 - af, 0));
      const tel = new THREE.Mesh(new THREE.ConeGeometry(w * .78, 2.6, 4), m('#8C5A4A')); tel.rotation.y = Math.PI / 4; tel.position.set(0, h - af + 1.3, 0); tel.castShadow = false; tel.receiveShadow = false; cf.add(tel);
      for (const [w2, x2] of [[2.2, -1.4], [1.4, 1.9]]) { const jw = malha(new THREE.BoxGeometry(w2, 1.3, .1), o.janelaAcesa && x2 < 0 ? '#FFD98A' : '#5d6b78', x2, .75, 3.04, { sombra: false }); if (o.janelaAcesa && x2 < 0) { jw.material.emissive = C('#FFB040'); jw.material.emissiveIntensity = .7; const lj = new THREE.PointLight('#FFC27A', 2.5, 4, 1.6); lj.position.set(x2, .9, 3.8); cf.add(lj); } cf.add(jw); }
      cf.add(malha(new THREE.BoxGeometry(w * .98, .5, .05), LAMA_ESC, 0, .2, 3.02, { sombra: false }));
      const g = new THREE.SphereGeometry(1, 20, 8); g.scale(w * .62, .18, 4); sc.add(malha(g, LAMA_ESC, cx, -.05, cz, { sombra: false })); }
    const va = new THREE.Mesh(new THREE.BoxGeometry(10, .4, 3.2), branco); va.position.set(0, 3.2, 6.2); nuvem.add(va);
    for (const sx of [-4.9, 4.9]) { for (let i = 0; i < 3; i++) { const b = new THREE.Mesh(new THREE.CylinderGeometry(.08, .08, 1.1, 6), branco); b.position.set(sx, 3.9, 5 + i * 1.1); nuvem.add(b); } const cr = new THREE.Mesh(new THREE.BoxGeometry(.14, .14, 3.2), branco); cr.position.set(sx, 4.45, 6.2); nuvem.add(cr); }
    const mesaV = new THREE.Mesh(new THREE.CylinderGeometry(.5, .5, .08, 16), branco); mesaV.position.set(1.3, 4.15, 6.4); nuvem.add(mesaV);
    const peM = new THREE.Mesh(new THREE.CylinderGeometry(.06, .06, .75, 6), branco); peM.position.set(1.3, 3.75, 6.4); nuvem.add(peM);
    if (o.ruaPerto) { for (const [x, z] of [[-3.4, -1], [3.2, -2.2], [-3.2, -4.5]]) { const g = new THREE.Group(); g.position.set(x, 0, z); sc.add(g); g.add(malha(new THREE.BoxGeometry(2.2, 2.4, 2.2), cores[(x > 0) + 2], 0, .4, 0));
        const tl2 = new THREE.Mesh(new THREE.ConeGeometry(1.7, 1.1, 4), m('#8C5A4A')); tl2.rotation.y = Math.PI / 4; tl2.position.y = 2.15; g.add(tl2); }
      sc.add(malha(new THREE.BoxGeometry(.25, .12, 14), '#8e8478', -2.1, .02, -2, { sombra: false })); sc.add(malha(new THREE.BoxGeometry(.25, .12, 14), '#8e8478', 2.1, .03, -2, { sombra: false })); }
    // portinha dourada na base da torre, painel verde e portinhola de entrega
    if (!o.caido) { box(4.2, 3.2, 1, '#7d7a76', TX, 1.6, TZ + 1.8); box(1.5, 2.3, .06, '#E3B341', TX, 1.15, TZ + 2.31); box(1.7, .12, .08, '#8a6420', TX, 2.34, TZ + 2.33); box(.12, .12, .1, '#8a6420', TX + .5, 1.1, TZ + 2.37);
    const pn = new THREE.Mesh(new THREE.PlaneGeometry(1.0, .5), new THREE.MeshBasicMaterial({ map: texPlaca(K, [['NUVEM', 120, '#9CF2B0', .32], [o.painel || '3.000 m', 210, '#9CF2B0', .72]], { fundo: '#0F2A1C', borda: '#1d1f2b', h: 520 }), fog: false }));
    pn.position.set(TX + 1.42, 2.35, TZ + 2.36); sc.add(pn); box(1.16, .66, .06, '#1d1f2b', TX + 1.42, 2.35, TZ + 2.32); }
    if (!o.caido) box(.95, .55, .06, '#1d1f2b', TX + 1.42, .55, TZ + 2.33); box(.82, .42, .05, '#2a1f14', TX + 1.42, .55, TZ + 2.36); if (o.marmita) { box(.5, .26, .3, '#F28C28', TX + 1.42, .5, TZ + 2.5); box(.54, .06, .32, '#F7A54A', TX + 1.42, .65, TZ + 2.5); }
    if (n) { for (let i = 0; i < 8; i++) { const z = 4 - i * 12, x = i % 2 ? 4.2 : -4.2; box(.16, 5, .16, '#3a3f5c', x, 2.5, z);
        const l = new THREE.Mesh(new THREE.SphereGeometry(.35, 12, 8), new THREE.MeshBasicMaterial({ color: '#FFE08A' })); l.position.set(x, 5.1, z); sc.add(l);
        const pl = new THREE.PointLight('#FFD27A', 6, 14, 1.6); pl.position.set(x, 4.8, z); sc.add(pl); }
      const pt = new THREE.PointLight('#FFD27A', 10, 18, 1.4); pt.position.set(TX, 4, TZ + 6); sc.add(pt);
      // bairro afundado em volta da torre, com postes (só de noite, visto de longe)
      const gl = new THREE.Mesh(new THREE.PlaneGeometry(260, 200), m(LAMA_NOITE)); gl.rotation.x = -Math.PI / 2; gl.position.set(TX, -.08, TZ + 40); sc.add(gl);
      const R2 = rng(77); for (let i = 0; i < 22; i++) { const lado = i % 2 ? 1 : -1, x = TX + lado * (9 + R2() * 22), z = TZ + 6 + Math.floor(i / 2) * 7 + R2() * 3, w = 5 + R2() * 2, h = 6.4, af = 4 + R2() * .4;
        const cs = new THREE.Group(); cs.position.set(x, 0, z); sc.add(cs); cs.add(malha(new THREE.BoxGeometry(w, h, 5), ['#5d5a6e', '#4f5568', '#625a66'][i % 3], 0, h / 2 - af, 0));
        const tl3 = new THREE.Mesh(new THREE.ConeGeometry(w * .78, 2.2, 4), m('#3e3644')); tl3.rotation.y = Math.PI / 4; tl3.position.set(0, h - af + 1.1, 0); cs.add(tl3);
        cs.add(malha(new THREE.BoxGeometry(1.2, .9, .08), '#FFD98A', 0, h - af - 1.4, 2.53, { sombra: false })); }
      for (let i = 0; i < 6; i++) { const x = TX + (i % 2 ? 6 : -6), z = TZ + 8 + i * 12; box(.16, 5, .16, '#3a3f5c', x, 2.5, z);
        const l = new THREE.Mesh(new THREE.SphereGeometry(.35, 12, 8), new THREE.MeshBasicMaterial({ color: '#FFE08A' })); l.position.set(x, 5.1, z); sc.add(l); } }
    return { nuvem, nuvemBase: [TX, NY, TZ], janelas };
  });
}
if (MUNDO) {
  MUNDO.registrar('quarto11', (sc, o, K) => { const { THREE, malha, m, C, luzes } = K; sc.background = new THREE.Color('#14100f'); sc.fog = new THREE.Fog('#14100f', 6, 18);
    luzes(sc, { dir: [3, 6, 4], sol: 0x6a78b8, forca: .35, hemi: .35, ceu: 0x3a4068, chao: 0x2a2018 });
    const box = (w, h, d, c, x, y, z, op = {}) => { const k = malha(new THREE.BoxGeometry(w, h, d), c, x, y, z, op); sc.add(k); return k; };
    const ch = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), new THREE.MeshStandardMaterial({ color: '#4a4038', roughness: .35 })); ch.rotation.x = -Math.PI / 2; ch.receiveShadow = true; sc.add(ch);
    box(12, 4, .2, '#5b4a3c', 0, 2, -2.7); box(.2, 4, 12, '#54443a', -3.2, 2, 0); box(.2, 4, 12, '#54443a', 3.4, 2, 0);
    const jan = box(1.2, 1, .05, '#3a4a78', 1.2, 2.0, -2.58, { sombra: false }); jan.material.emissive = C('#22305a'); jan.material.emissiveIntensity = .8;
    box(1.1, .3, 2.0, '#7a5236', -1.1, .15, -1.0); box(1.05, .16, 1.9, '#EFEBE2', -1.1, .38, -1.0); box(1.1, .5, .1, '#7a5236', -1.1, .55, -2.0);
    box(.55, .12, .4, '#FFFFFF', -1.1, .52, -1.75); const cob = box(1.08, .1, 1.2, '#6FA8DC', -1.1, .5, -.75); cob.castShadow = false;
    box(.45, .5, .45, '#7a5236', .25, .25, -2.2); const ab = new THREE.Mesh(new THREE.ConeGeometry(.2, .25, 16, 1, true), new THREE.MeshStandardMaterial({ color: '#FFE3A8', emissive: C('#FFC060'), emissiveIntensity: 1.6, side: THREE.DoubleSide })); ab.position.set(.25, .78, -2.2); sc.add(ab);
    const lz = new THREE.PointLight('#FFC27A', 6, 7, 1.4); lz.position.set(.25, .9, -2.0); lz.castShadow = true; sc.add(lz);
    return {}; });
  MUNDO.registrar('oco11', (sc, o, K) => { const { THREE, malha, m, C, luzes } = K; sc.background = new THREE.Color('#0d0907'); sc.fog = new THREE.Fog('#0d0907', 8, 34);
    if (o.cofre) { const pc = new THREE.PointLight('#ff6a4a', 25, 14, 1.3); pc.position.set(0, 2.2, -23); sc.add(pc); }
    luzes(sc, { dir: [2, 8, 3], sol: 0xffd8a8, forca: .6, hemi: .7, ceu: 0x7a5a40, chao: 0x3a2818 });
    const ch = new THREE.Mesh(new THREE.PlaneGeometry(10, 60), new THREE.MeshStandardMaterial({ color: '#3b2b20', roughness: 1 })); ch.rotation.x = -Math.PI / 2; ch.position.z = -15; ch.receiveShadow = true; sc.add(ch);
    const teto = new THREE.Mesh(new THREE.PlaneGeometry(10, 60), new THREE.MeshStandardMaterial({ color: '#2a2018', side: THREE.DoubleSide })); teto.rotation.x = Math.PI / 2; teto.position.set(0, 3.4, -15); sc.add(teto);
    for (const x of [-2.6, 2.6]) { const pw = new THREE.Mesh(new THREE.PlaneGeometry(60, 3.4), new THREE.MeshStandardMaterial({ color: '#33251b', side: THREE.DoubleSide })); pw.rotation.y = Math.PI / 2; pw.position.set(x, 1.7, -15); sc.add(pw); }
    const R = rng(77), luz = new THREE.MeshBasicMaterial({ color: '#FFE9C0', transparent: true, opacity: .14, depthWrite: false });
    for (let i = 0; i < (o.semLuz ? 0 : 7); i++) { const x = -1.8 + R() * 3.6, z = 2 - R() * 14; const fx = new THREE.Mesh(new THREE.CylinderGeometry(.08, .45, 3.4, 12, 1, true), luz); fx.position.set(x, 1.7, z); sc.add(fx);
      const fu = new THREE.Mesh(new THREE.CircleGeometry(.12, 12), new THREE.MeshBasicMaterial({ color: '#FFE9C0' })); fu.rotation.x = Math.PI / 2; fu.position.set(x, 3.39, z); sc.add(fu);
      const co = new THREE.Mesh(new THREE.CylinderGeometry(.025, .025, 3.4, 6), m('#6b5a4a')); co.position.set(x + .05, 1.7, z); sc.add(co); }
    for (let i = 0; i < 18; i++) { const g = new THREE.Mesh(new THREE.SphereGeometry(.03, 6, 4), new THREE.MeshBasicMaterial({ color: '#cfc2b0' })); g.position.set(-2 + R() * 4, .5 + R() * 2.8, 2 - R() * 20); sc.add(g); }
    // porta de cofre no fim do túnel
    const pg = new THREE.Group(); pg.position.set(-.2, 1.5, -24); sc.add(pg);
    const aro = new THREE.Mesh(new THREE.TorusGeometry(1.45, .18, 12, 40), m('#7d8792', { metalness: .6, roughness: .35 })); pg.add(aro);
    const fo = new THREE.Group(); pg.add(fo); const disco = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.35, .3, 40), m('#8e98a3', { metalness: .6, roughness: .4 })); disco.rotation.x = Math.PI / 2; disco.position.x = 1.35; fo.add(disco); fo.position.x = -1.35;
    for (let i = 0; i < 4; i++) { const r = new THREE.Mesh(new THREE.BoxGeometry(1.6, .12, .12), m('#5c646e')); r.position.set(1.35, 0, .2); r.rotation.z = i * Math.PI / 4; fo.add(r); }
    const lv = new THREE.PointLight('#FF3A3A', 0, 12, 1.2); lv.position.set(-.2, 1.5, -25); sc.add(lv);
    return { abrir: k => { fo.rotation.y = -1.9 * ease(k); lv.intensity = 14 * k; } }; });
  const RXg = 4;
  MUNDO.registrar('sala11', (sc, o, K) => { const { THREE, malha, m, C, luzes } = K; sc.background = new THREE.Color('#3a1214'); sc.fog = new THREE.Fog('#3a1214', 18, 75);
    luzes(sc, { dir: [6, 20, 10], sol: 0xff8a7a, forca: 1.6, hemi: 1.5, ceu: 0xc06060, chao: 0x5a2a2a });
    for (const [x, y, z, f] of [[RXg, 8, -1, 90], [RXg + 8, 4, -4, 40], [-6, 6, 4, 50]]) { const pl = new THREE.PointLight('#ff5a4a', f, 45, 1.2); pl.position.set(x, y, z); sc.add(pl); }
    const ch = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.MeshStandardMaterial({ color: '#6a2a2a', roughness: .9 })); ch.rotation.x = -Math.PI / 2; ch.receiveShadow = true; sc.add(ch);
    const teto = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.MeshStandardMaterial({ color: '#2e0e10', side: THREE.DoubleSide })); teto.rotation.x = Math.PI / 2; teto.position.y = 30; sc.add(teto);
    const pf = new THREE.Mesh(new THREE.PlaneGeometry(80, 30), new THREE.MeshStandardMaterial({ color: '#7a2a2a' })); pf.position.set(0, 15, -22); sc.add(pf);
    const pe = new THREE.Mesh(new THREE.PlaneGeometry(60, 30), new THREE.MeshStandardMaterial({ color: '#521b1d', side: THREE.DoubleSide })); pe.rotation.y = Math.PI / 2; pe.position.set(-14, 15, 0); sc.add(pe);
    // roldana: aro, raios, eixo, suportes
    const RX = RXg, RY = 12, RZ = -10, RR = 8, GY = o.gy ?? 1.3, aco = { metalness: .55, roughness: .4 };
    const aro = new THREE.Mesh(new THREE.TorusGeometry(RR, .9, 16, 64), m('#b09a80', aco)); aro.position.set(RX, RY, RZ); sc.add(aro); const roda = [];
    for (let i = 0; i < 8; i++) { const r = new THREE.Mesh(new THREE.BoxGeometry(RR * 2, .5, .5), m('#6a5a4a', aco)); r.position.set(RX, RY, RZ); r.rotation.z = i * Math.PI / 8; r.userData.z0 = r.rotation.z; sc.add(r); roda.push(r); }
    const ei = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 3, 24), m('#4a4038', aco)); ei.rotation.x = Math.PI / 2; ei.position.set(RX, RY, RZ); sc.add(ei);
    for (const sx of [-1, 1]) { const su = new THREE.Mesh(new THREE.BoxGeometry(1.2, RY, 1.2), m('#3a2a24', aco)); su.position.set(RX + sx * 3, RY / 2, RZ - 1.5); sc.add(su); }
    // corda: sobe pelo lado esquerdo até o teto (tubo da torre); desce pelo direito até o gancho
    const corda = m('#d8c39a', { emissive: C('#5a3a1a'), emissiveIntensity: .6 }); const c1 = new THREE.Mesh(new THREE.CylinderGeometry(.35, .35, 30 - RY, 10), corda); c1.position.set(RX - RR, (30 + RY) / 2, RZ); sc.add(c1);
    const tubo = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 2, 24, 1, true), m('#1a0a0a', { side: THREE.DoubleSide })); tubo.position.set(RX - RR, 29.2, RZ); sc.add(tubo);
    { const an = new THREE.Mesh(new THREE.RingGeometry(1.6, 2.4, 32), new THREE.MeshBasicMaterial({ color: '#FFD27A', side: THREE.DoubleSide, fog: false })); an.rotation.x = Math.PI / 2; an.position.set(RX - RR, 29.95, RZ); sc.add(an);
      const pl = new THREE.PointLight('#FFD27A', 40, 16, 1.2); pl.position.set(RX - RR, 27, RZ); sc.add(pl); }
    const c2 = new THREE.Mesh(new THREE.CylinderGeometry(.3, .3, RY - GY, 10), corda); c2.position.set(RX + RR, (RY + GY) / 2, RZ); sc.add(c2);
    const gancho = new THREE.Mesh(new THREE.TorusGeometry(.9, .3, 10, 24, Math.PI * 1.4), m('#5c646e', aco)); gancho.position.set(RX + RR, GY + .2, RZ);
    gancho.visible = false;
    if (!o.cortado) { const am = new THREE.MeshBasicMaterial({ color: '#F7C82E' }), ink = new THREE.MeshBasicMaterial({ color: '#2a2a2a' }); const la = new THREE.Mesh(new THREE.TorusGeometry(.38, .13, 12, 32), am); la.rotation.x = Math.PI / 2; la.position.set(RX + RR, GY, RZ); sc.add(la);  const tr = new THREE.Mesh(new THREE.BoxGeometry(.3, .36, .26), new THREE.MeshBasicMaterial({ color: '#C99A10' })); tr.position.set(RX + RR + .5, GY, RZ + .05); sc.add(tr); for (const dy of [-.08, 0, .08]) { const li = new THREE.Mesh(new THREE.BoxGeometry(.31, .025, .27), new THREE.MeshBasicMaterial({ color: '#7a5a00' })); li.position.set(RX + RR + .5, GY + dy, RZ + .05); sc.add(li); } }
    else { const am = new THREE.MeshStandardMaterial({ color: '#F2C230', roughness: .5 }); for (const [dx, dz, r] of []) { const la = new THREE.Mesh(new THREE.TorusGeometry(.32, .1, 12, 32, Math.PI * 1.1), am); la.rotation.set(Math.PI / 2, 0, r); la.position.set(RX + RR + dx, .16, RZ + dz); sc.add(la); } } sc.add(gancho);
    // feixe de correntes chegando de túneis
    const R = rng(55), cm = m(o.cortado ? '#6a6a72' : '#b8a080', aco);
    for (let i = 0; i < 150; i++) { const a = -1.3 + R() * 2.6, dist = 8 + R() * 34, x0 = RX + RR + Math.sin(a) * dist, z0 = RZ - Math.abs(Math.cos(a)) * dist - 2, y0 = .2 + R() * .4;
      const GYc = o.cortado ? .08 : GY, v = new THREE.Vector3(RX + RR - x0, GYc - y0, RZ - z0), L = v.length(); const c = new THREE.Mesh(new THREE.CylinderGeometry(.06, .06, L, 5), cm); c.position.set((x0 + RX + RR) / 2, (y0 + GYc) / 2, (z0 + RZ) / 2); c.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.normalize()); sc.add(c); }
    // tela na parede esquerda
    const tl = new THREE.Mesh(new THREE.PlaneGeometry(8, 4.5), new THREE.MeshBasicMaterial({ color: o.tela ? (o.telaFundo || '#C8202A') : '#1a0505' })); tl.rotation.y = Math.PI / 2; tl.position.set(-13.9, 5, -4); sc.add(tl);
    if (o.tela) { const tx = new THREE.Mesh(new THREE.PlaneGeometry(7.6, 4.1), new THREE.MeshBasicMaterial({ map: texPlaca(K, (o.telaLinhas || ['CONTRAPESO:', 'DUDU']).map((l, i) => [l, i ? (l.length > 7 ? 140 : 190) : 120, o.telaTinta || '#fff', i ? .74 : .38]), { fundo: o.telaFundo || '#C8202A', borda: o.telaFundo || '#C8202A', h: 580 }) })); tx.rotation.y = Math.PI / 2; tx.position.set(-13.85, 5, -4); sc.add(tx); }
    const giro = []; if (o.alarme) for (const [x, z] of [[-10, 6], [10, 4]]) { const g = new THREE.Group(); g.position.set(x, 9, z); sc.add(g);
      const sp = new THREE.SpotLight('#ff2a2a', 160, 40, .45, .5, 1); sp.position.set(0, 0, 0); g.add(sp); sp.target.position.set(6, -6, 0); g.add(sp.target);
      g.add(new THREE.Mesh(new THREE.SphereGeometry(.4, 12, 8), new THREE.MeshBasicMaterial({ color: '#ff3a3a' }))); giro.push(g); }
    return { roda, giro }; });
}
const animaSala = (S, tt, giro = 0, alarme = 0) => { if (S.roda) S.roda.forEach(r => r.rotation.z = r.userData.z0 + giro); if (S.giro) S.giro.forEach((g, i) => g.rotation.y = tt * 5 * (i ? -1 : 1)); };
const animaNuvem = (S, t) => { if (S.nuvem) { S.nuvem.position.y = S.nuvemBase[1] + Math.sin(t * .7) * .8; S.nuvem.rotation.z = Math.sin(t * .5) * .015; } };
function genteRua(t, o = {}) { const L = o.lista || [
    [FIG[0], [.6, 0, -4.5], 'queixo', 0], [FIG[1], [-1.4, 0, -7], 'peito', 1], [FIG[2], [1.9, 0, -11], 'joelho', 2], [FIG[3], [-1.0, 0, -15], 'olhos', 3],
    [FIG[0], [.7, 0, -20], 'cintura', 4], [FIG[2], [-2.4, 0, -24], 'queixo', 5], [FIG[1], [2.6, 0, -28], 'canela', 6]];
  const c = o.cam || [0, 0, 6], dist = q => Math.hypot(q[0] - c[0], q[2] - c[2]);
  return L.slice().sort((a, b) => dist(b[1]) - dist(a[1])).map(([p, pos, af, ph]) => P3(p, { t, ph, afundado: af, lama: LAMA, olhar: (ph % 2 ? -.2 : .2) }, pos)).join(''); }

function fundoBoleto(t) { return `<rect x="-400" y="-400" width="1400" height="1900" fill="#C9C2B8"/>` + `<g opacity=".18">${[0, 1, 2, 3, 4].map(i => `<circle cx="${(i * 173 + t * 30) % 700 - 60}" cy="${200 + i * 160}" r="${90 + i * 10}" fill="#fff"/>`).join('')}</g>`; }
function pontoOnibus(x, y) { return `<g transform="translate(${x} ${y})"><path d="M0 0 v-200" stroke="${STK_INK}" stroke-width="10"/><path d="M0 0 v-200" stroke="#9aa3ad" stroke-width="5"/><rect x="-46" y="-250" width="92" height="64" rx="10" fill="#2F5D9E" stroke="${STK_INK}" stroke-width="5"/><text x="0" y="-208" font-family="Poppins" font-weight="800" font-size="30" fill="#fff" text-anchor="middle">BUS</text></g>`; }
function bolha3D(t, tl, pos) { const q = MUNDO.proj(pos); if (q.atras) return ''; const k = cl(tl / .55), r = q.ppm * (.08 + .08 * k);
  return k < 1 ? `<path d="M${q.x - r} ${q.y} a${r} ${r * .85} 0 0 1 ${2 * r} 0z" fill="#d8cfc4" fill-opacity=".35" stroke="#efe8df" stroke-width="2" stroke-opacity=".8"/><ellipse cx="${q.x - r * .35}" cy="${q.y - r * .5}" rx="${r * .25}" ry="${r * .13}" fill="#fff" opacity=".85"/>` + marca('bolha', q.x, q.y - r * .4, r * 1.2)
    : `<g opacity="${1 - cl((tl - .55) / .35)}">${[0, 1, 2, 3, 4].map(i => { const a = -Math.PI / 2 + (i - 2) * .45, v = (tl - .55) * q.ppm * 1.4; return `<circle cx="${q.x + Math.cos(a) * v}" cy="${q.y + Math.sin(a) * v + (tl - .55) * (tl - .55) * 900}" r="${q.ppm * .02}" fill="${LAMA_LUZ}"/>`; }).join('')}</g>`; }
function nuvensBaixo(t) { const R = rng(31); let s = '<rect x="-400" y="640" width="1400" height="800" fill="#F7EEDC" opacity=".5"/>';
  for (let i = 0; i < 9; i++) s += `<rect x="${330 + i * 26}" y="${700 - (i % 3) * 6}" width="18" height="${10 + (i % 3) * 6}" fill="#9aa3a8" opacity=".7"/>`;
  for (let i = 0; i < 14; i++) { const x = 300 + R() * 320 + t * 6 * (i % 2 ? 1 : -1), y = 560 + R() * 150, k = .18 + R() * .16; s += `<g transform="translate(${x} ${y}) scale(${k})" opacity=".95">` + [0, 1, 2].map(j => `<ellipse cx="${j * 50}" cy="${j === 1 ? -16 : 0}" rx="58" ry="30" fill="#FFFFFF"/>`).join('') + `</g>`; } return s; }
function nuvemBorda(t) { const dy = Math.sin(t * .7) * 6, B = [[-80, 700, 160], [70, 660, 150], [210, 700, 140], [300, 800, 120], [250, 930, 140], [-60, 900, 200], [120, 960, 190]];
  return `<g transform="translate(0 ${dy})">` + B.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r + 6}" fill="${STK_INK}"/>`).join('') + `<rect x="-400" y="960" width="560" height="600" fill="${STK_INK}"/>`
    + B.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#F4C95D"/>`).join('') + `<rect x="-400" y="966" width="554" height="600" fill="#F4C95D"/>`
    + B.slice(0, 4).map(([x, y, r]) => `<ellipse cx="${x - r * .3}" cy="${y - r * .55}" rx="${r * .32}" ry="${r * .12}" fill="#fff" opacity=".35"/>`).join('') + `</g>`; }
function respingo3D(t, tl, pos) { const q = MUNDO.proj(pos); if (q.atras || tl > .3) return ''; const k = cl(tl / .3);
  return `<g opacity="${1 - k}">${[0, 1, 2, 3, 4, 5, 6].map(i => { const a = -Math.PI / 2 + (i - 3) * .38, v = (.12 + k * .28) * q.ppm * (i % 2 ? 1 : -1) * Math.sign(i - 3 || 1); return `<circle cx="${q.x + Math.cos(a) * Math.abs(v) * (i < 3 ? -1 : 1) + (i < 3 ? -1 : 1) * q.ppm * .34}" cy="${q.y + Math.sin(a) * v + k * k * q.ppm * .5}" r="${q.ppm * .02}" fill="#8a7464" stroke="#3f362e" stroke-width="1.5"/><circle cx="${q.x}" cy="${q.y}" r="0"/>`; }).join('')}</g>`; }

// ---------------------------------------------------------------- peças do bloco B
function noite2D() { return `<rect width="576" height="1024" fill="#1a2550" opacity=".2" style="mix-blend-mode:multiply"/>`; }
function luzQuente(x, y, r) { return `<defs><radialGradient id="lq${Math.round(x)}${Math.round(y)}"><stop offset="0" stop-color="#FFE3A8" stop-opacity=".75"/><stop offset="1" stop-color="#FFE3A8" stop-opacity="0"/></radialGradient></defs><circle cx="${x}" cy="${y}" r="${r}" fill="url(#lq${Math.round(x)}${Math.round(y)})"/>`; }
function brilho3D(pos, m) { const q = MUNDO.proj(pos); if (q.atras) return ''; return luzQuente(q.x, q.y, q.ppm * m); }
function sombraLonga(pos, alt) { const a = MUNDO.proj(pos), b = MUNDO.proj([pos[0] - 2.2, 0, pos[2] + 3.6]); if (a.atras) return '';
  const ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI, len = Math.hypot(b.x - a.x, b.y - a.y);
  return `<defs><filter id="sil36" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 .05  0 0 0 0 .05  0 0 0 0 .08  0 0 0 1 0"/><feGaussianBlur stdDeviation="1.5"/></filter></defs><g opacity=".7" filter="url(#sil36)" transform="translate(${a.x} ${a.y}) rotate(${ang + 90}) scale(${a.ppm * 1.6 / 380} ${len / 600})">${stick(SOFIA, { x: 0, y: 0, s: 1, sombra: false, nocheck: true, semCorte: true, still: true })}</g>`; }
function relogioRua(x, y, hora) { return `<g transform="translate(${x} ${y})"><path d="M0 0 v-330" stroke="${STK_INK}" stroke-width="14"/><path d="M0 0 v-330" stroke="#3a3f5c" stroke-width="7"/><rect x="-90" y="-440" width="180" height="110" rx="14" fill="#11151f" stroke="${STK_INK}" stroke-width="7"/><text x="0" y="-362" font-family="Poppins" font-weight="800" font-size="64" fill="#FF9A3C" text-anchor="middle">${hora}</text></g>` + marca('relogio', x, y - 385, 95); }
function painelVerde(x, y, val, s, pisca = 1) { return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-200" y="-120" width="400" height="240" rx="18" fill="#0F2A1C" stroke="${STK_INK}" stroke-width="10"/><rect x="-184" y="-104" width="368" height="208" rx="10" fill="#0B2015"/><text x="0" y="-38" font-family="Poppins" font-weight="800" font-size="46" fill="#9CF2B0" text-anchor="middle">NUVEM</text><text x="0" y="56" font-family="Poppins" font-weight="800" font-size="84" fill="#9CF2B0" opacity="${pisca}" text-anchor="middle">${val}</text></g>` + marca('painel', x, y, 210 * s); }
function telaDividida(t, tl) { const k = tl > .5 ? 1 : 0, pk = tl > .5 ? (.6 + .4 * Math.sin(tl * 20)) : 1;
  const cima = ceu2D('#0b1430', '#25305e', 'ceuNt4') + paredeTorre2D(430, false) + lama2D(430, t, { cor: LAMA_NOITE, liso: 1 }) + `<g>${(() => { let r = `<rect x="80" y="70" width="26" height="380" fill="#3a3f5c" stroke="${STK_INK}" stroke-width="3"/>`; for (let i = 0; i < 12; i++) r += `<rect x="80" y="${430 - (i + 1) * 30}" width="26" height="15" fill="${i % 2 ? '#fff' : '#E8434F'}"/>`; return r; })()}</g>`
    + stick(DUDU, { x: 300, y: 430, s: 1.55, t, lama: LAMA_NOITE, afundado: k ? 'semboca' : 'boca', bag: 'cabeca', olhar: .1, olhos: k ? 'arregalados' : null, boca: 'o' }) + (k && tl < .85 ? respingo2D(300, 430, tl - .5) : '');
  const baixo = fundoTela('#151c2e') + painelVerde(288, 640, k ? '3.001 m' : '3.000 m', .62, pk);
  return `<defs><clipPath id="tdC"><rect x="-400" y="-400" width="1400" height="910"/></clipPath><clipPath id="tdB"><rect x="-400" y="514" width="1400" height="1000"/></clipPath></defs><g clip-path="url(#tdC)">${cima}</g><g clip-path="url(#tdB)">${baixo}</g><rect x="-100" y="504" width="800" height="16" fill="${STK_INK}"/><rect x="-100" y="509" width="800" height="5" fill="#9aa3ad"/>`; }
function respingo2D(x, y, tl) { const k = cl(tl / .35); return `<g opacity="${1 - k}">${[0, 1, 2, 3, 4, 5].map(i => { const a = -Math.PI / 2 + (i - 2.5) * .45, v = k * 120; return `<circle cx="${x + Math.cos(a) * v}" cy="${y + Math.sin(a) * v + k * k * 90}" r="7" fill="${LAMA_LUZ}"/>`; }).join('')}</g>`; }
function reflexoPainel(t, tl) { const q = MUNDO.proj([30.42, 2.35, -227.63]); const w = q.ppm * 1.0, h = q.ppm * .5, on = Math.sin(tl * 14) > 0;
  return `<defs><clipPath id="rfP"><rect x="${q.x - w / 2}" y="${q.y - h / 2}" width="${w}" height="${h}"/></clipPath></defs><g clip-path="url(#rfP)" opacity=".28">${stick(DUDU, { x: q.x - w * .05, y: q.y + h * 1.05, s: w / 520, t, afundado: 'semboca', bag: 'cabeca', olhar: .3, anel: false, nocheck: true })}</g>`
    + (on ? '' : `<rect x="${q.x - w * .45}" y="${q.y}" width="${w * .9}" height="${h * .42}" fill="#0B2015" opacity=".75"/>`); }

function paredeTorre2D(y, painel = true) { return `<rect x="-60" y="${y - 520}" width="330" height="520" fill="#6b5f63"/><rect x="20" y="${y - 400}" width="120" height="400" fill="#E3B341" stroke="${STK_INK}" stroke-width="5"/>${painel ? `<rect x="150" y="${y - 480}" width="120" height="84" rx="8" fill="#0F2A1C" stroke="${STK_INK}" stroke-width="5"/><text x="210" y="${y - 450}" font-family="Poppins" font-weight="800" font-size="18" fill="#9CF2B0" text-anchor="middle">NUVEM</text><text x="210" y="${y - 416}" font-family="Poppins" font-weight="800" font-size="26" fill="#9CF2B0" text-anchor="middle">3.000 m</text>` : ''}`; }

function quarto2D(t) { return `<rect x="-400" y="-400" width="1400" height="1900" fill="#2b2119"/><rect x="380" y="180" width="150" height="130" fill="#2a3a68" stroke="${STK_INK}" stroke-width="6"/>` + luzQuente(90, 560, 260); }
function bolhas3D(t, tl, pos) { const q = MUNDO.proj(pos); if (q.atras) return ''; let s = ''; for (let i = 0; i < 6; i++) { const k = (tl * 1.6 + i * .17) % 1; s += `<circle cx="${q.x + Math.sin(i * 2.1) * q.ppm * .15}" cy="${q.y - k * q.ppm * .25}" r="${q.ppm * (.02 + .02 * (i % 3))}" fill="none" stroke="#d8cfc4" stroke-width="2" opacity="${1 - k}"/>`; } return s; }
function atravessaLama(t, tl, d) { const k = cl(tl / d), off = (tl * 420) % 120; let s = `<rect x="-400" y="-400" width="1400" height="1900" fill="#2a1d14"/>`;
  for (let i = -2; i < 12; i++) s += `<path d="M-300 ${i * 120 - off} q300 -40 1200 0" stroke="#3b2a1d" stroke-width="40" fill="none" opacity=".7"/>`;
  const yb = 1250 - k * 1000; s += `<rect x="-400" y="${yb}" width="1400" height="1900" fill="#0d0907"/><path d="M-400 ${yb} q250 30 500 0 t500 0 t500 0" stroke="#4a3828" stroke-width="22" fill="none"/>`;
  return s + stick(DUDU_C, { x: 288, y: 820, s: .8, t, bag: null, olhos: 'fechados', boca: 'neutra', pose: { bD: [120, 100], bE: [120, 100] }, segura: '' }) + `<g transform="translate(288 ${820 - 330})">${bagSolta(.6, 0)}</g>`
    + [0, 1, 2, 3].map(i => `<circle cx="${250 + i * 25}" cy="${300 - ((tl * 300 + i * 70) % 300)}" r="${6 + i * 2}" fill="none" stroke="#8c7f71" stroke-width="3"/>`).join(''); }
function feixe3D(de, ate, op) { const a = MUNDO.proj(de), b = MUNDO.proj(ate); if (a.atras || b.atras) return ''; const w = Math.max(20, b.ppm * .35);
  return `<path d="M${a.x} ${a.y} L${b.x - w} ${b.y} L${b.x + w} ${b.y}z" fill="#EAF6FF" opacity="${.22 * op}"/><ellipse cx="${b.x}" cy="${b.y}" rx="${w}" ry="${w * .35}" fill="#EAF6FF" opacity="${.35 * op}"/>`; }
function ocoFundo2D(t) { return `<rect x="-400" y="-400" width="1400" height="1900" fill="#1a120d"/><rect x="-400" y="900" width="1400" height="600" fill="#3b2b20"/>` + `<path d="M120 -400 L60 900 L200 900z" fill="#FFE9C0" opacity=".06"/>`; }
function sombraPe3D(pos, k) { const q = MUNDO.proj(pos); if (q.atras) return ''; return `<ellipse cx="${q.x}" cy="${q.y}" rx="${q.ppm * .3}" ry="${q.ppm * .07}" fill="#000" opacity="${.35 - .1 * k}"/>`; }
function poeira(t, tl) { let s = ''; const R = rng(31); for (let i = 0; i < 40; i++) { const x = R() * 576, v = 160 + R() * 260, y = ((R() * 1024 + tl * v) % 1100) - 40; s += `<circle cx="${x + Math.sin(tl * 3 + i) * 8}" cy="${y}" r="${1.5 + R() * 3}" fill="#f2d8c0" opacity="${.35 + R() * .4}"/>`; } return s; }
function luzQuente2D() { return `<defs><radialGradient id="lq87" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#FFD27A" stop-opacity=".5"/><stop offset="1" stop-color="#FFD27A" stop-opacity="0"/></radialGradient></defs><rect x="0" y="0" width="576" height="1024" fill="url(#lq87)" style="mix-blend-mode:screen"/>`; }
function alarme2D(t) { const a1 = (t * 220) % 360, a2 = (-t * 220 + 90) % 360, feixe = (x, y, a) => `<path d="M${x} ${y} L${x + Math.cos((a - 12) * Math.PI / 180) * 1400} ${y + Math.sin((a - 12) * Math.PI / 180) * 1400} L${x + Math.cos((a + 12) * Math.PI / 180) * 1400} ${y + Math.sin((a + 12) * Math.PI / 180) * 1400}z" fill="#ff4a3a" opacity=".28" style="mix-blend-mode:screen"/><circle cx="${x}" cy="${y}" r="22" fill="#ff5a4a"/>`;
  return feixe(40, 70, a1) + feixe(536, 70, a2) + `<rect x="0" y="0" width="576" height="1024" fill="#ff1a1a" opacity="${.12 + .12 * Math.max(0, Math.sin(t * 10))}" style="mix-blend-mode:screen"/>`; }
function bolhasLama(t, tl, pos) { const q = MUNDO.proj(pos); if (q.atras) return ''; let s = ''; for (let i = 0; i < 5; i++) { const k = (tl * 1.3 + i * .21) % 1, sx = (i % 2 ? 1 : -1) * (.2 + .05 * i);
  s += `<circle cx="${q.x + sx * q.ppm}" cy="${q.y - k * q.ppm * .05}" r="${q.ppm * .018 * (1 - k * .5)}" fill="#8a7f86" stroke="#d8cfc4" stroke-width="2" opacity="${1 - k}"/>`; } return s; }
function salaFundo2D(t) { return `<rect x="-400" y="-400" width="1400" height="1900" fill="#3a0d10"/><rect x="-400" y="960" width="1400" height="600" fill="#4a1a1c"/>`; }
function feixe2D(t, tl, fundo = false) { let s = ''; const R = rng(9), gx = 460, gy = 200; for (let i = 0; i < 26; i++) { if (fundo && i === 7) continue; const x0 = -60 + R() * 300, y0 = 940 + R() * 60, tr = i === 7 && tl > .3 && tl < .7 ? Math.sin((tl - .3) * 40) * 18 : 0;
    s += `<path d="M${x0} ${y0} Q${(x0 + gx) / 2 + tr} ${(y0 + gy) / 2 + 80} ${gx} ${gy}" stroke="${i === 7 ? '#d9c7a0' : '#7a6a5a'}" stroke-width="${i === 7 ? 6 : 3}" fill="none" opacity="${i === 7 ? 1 : .7}"/>`; }
  return s + `<path d="M${gx - 30} ${gy} a30 30 0 1 0 60 0" stroke="#9aa3ad" stroke-width="14" fill="none"/>`; }
function luzVermelha3D(pos, k) { const q = MUNDO.proj(pos); if (q.atras || k <= 0) return ''; return `<defs><radialGradient id="lv71"><stop offset="0" stop-color="#FF3A3A" stop-opacity=".7"/><stop offset="1" stop-color="#FF3A3A" stop-opacity="0"/></radialGradient></defs><circle cx="${q.x}" cy="${q.y}" r="${q.ppm * 3 * k}" fill="url(#lv71)" style="mix-blend-mode:screen"/>`; }
function corteTransversal(t, tl) { const k = ease(cl(tl / 1.2)), sv = (y) => 100 + y; // tudo entre ~10 % e 72 % da altura
  let s = `<rect x="-400" y="-400" width="1400" height="1900" fill="#F4EEE2"/><rect x="-400" y="500" width="1400" height="240" fill="#8a7563"/><rect x="-400" y="490" width="1400" height="14" fill="#5a4a3e"/>`;
  s += `<rect x="-400" y="-400" width="1400" height="890" fill="#C9D6E6"/><text x="60" y="${sv(30)}" font-family="Poppins" font-weight="800" font-size="26" fill="#5a6a7a">CÉU</text><text x="40" y="${sv(630)}" font-family="Poppins" font-weight="800" font-size="24" fill="#efe6da">DEBAIXO DA LAMA</text>`;
  // torre e roldana do topo
  s += `<rect x="452" y="${sv(30)}" width="36" height="${600}" fill="#DCEFFA" stroke="${STK_INK}" stroke-width="5"/><circle cx="430" cy="${sv(40)}" r="46" fill="#C9A13A" stroke="${STK_INK}" stroke-width="7"/>`;
  // corda acesa: da nuvem sobe até a roldana do topo, desce pela torre até a roldana da sala
  s += `<path d="M384 ${sv(150) - 30 * k - 100} V${sv(40)} A46 46 0 0 1 476 ${sv(40)} V${sv(560)}" stroke="#FFB43A" stroke-width="10" fill="none" stroke-dasharray="1200" stroke-dashoffset="${1200 * (1 - k)}"/>`;
  // nuvem pendurada como cabine
  s += `<g transform="translate(384 ${sv(190) - 30 * k})">${[[-70, 0, 60], [0, -14, 70], [70, 0, 60]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#F4C95D" stroke="${STK_INK}" stroke-width="6"/>`).join('')}<rect x="-50" y="-100" width="100" height="60" fill="#fff" stroke="${STK_INK}" stroke-width="5"/><text x="0" y="-62" font-family="Poppins" font-weight="800" font-size="22" text-anchor="middle">BANCO</text></g>`;
  s += `<path d="M200 ${sv(200)} v-70" stroke="#2FA86B" stroke-width="10" marker-end="url(#setaS)"/><text x="200" y="${sv(232)}" font-family="Poppins" font-weight="800" font-size="20" fill="#1d6b42" text-anchor="middle">SOBE</text>`;
  // roldana da sala e correntes até os tornozelos
  s += `<circle cx="430" cy="${sv(580)}" r="40" fill="#7a6a5a" stroke="${STK_INK}" stroke-width="7"/>`;
  const P = [[60, 440], [130, 452], [200, 440], [270, 456]];
  P.forEach(([x, y], i) => { s += `<path d="M390 ${sv(590)} Q${(x + 390) / 2} ${sv(620)} ${x} 520" stroke="${STK_INK}" stroke-width="8" fill="none"/><path d="M390 ${sv(590)} Q${(x + 390) / 2} ${sv(620)} ${x} 520" stroke="#c9b48c" stroke-width="4" fill="none" stroke-dasharray="10 6"/>`
    + stick([FIG[0], FIG[2], DUDU, FIG[3]][i], { x, y: 504, s: .2, t: t + i, nocheck: true, sombra: false, afundado: 'peito', lama: '#8a7563' })
    + `<path d="M${x} 530 v34" stroke="#D8352A" stroke-width="6" marker-end="url(#setaV)"/><text x="${x}" y="592" font-family="Poppins" font-weight="800" font-size="16" fill="#fff" text-anchor="middle">PESO</text>`; });
  return `<defs><marker id="seta" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto"><path d="M0 10 L5 0 L10 10z" fill="${STK_INK}"/></marker><marker id="setaS" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#2FA86B"/></marker><marker id="setaV" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#D8352A"/></marker></defs><g transform="translate(288 440) scale(.86) translate(-288 -440)">` + s + '</g>'; }

