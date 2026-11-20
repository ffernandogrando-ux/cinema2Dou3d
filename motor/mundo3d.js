// Cenários 3D (three.js) atrás do desenho 2D. Estilo: blocos simples, sombreado chapado, sem textura,
// céu em gradiente, neblina de distância, sol quente com sombra suave. Os stickmen continuam 2D (SVG)
// e são colados na tela com MUNDO.proj([x,y,z]) / MUNDO.pessoa(...).
// Uso num plano:  { l, w, g3d: (tl, d, t) => ({ set: 'bairro', p: [x,y,z], alvo: [x,y,z], fov }), f: (...) => overlays 2D }
const MUNDO = (() => {
  if (typeof THREE === 'undefined') return null;
  let R = null, cam = null; const SETS = {}; let atual = null;
  const C = c => new THREE.Color(c);
  const mat = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: .92, metalness: 0, flatShading: true, ...o });
  const MATS = {}; const m = (c, o) => { const k = c + JSON.stringify(o || {}); return MATS[k] || (MATS[k] = mat(c, o)); };
  function malha(geo, cor, x = 0, y = 0, z = 0, o = {}) { const k = new THREE.Mesh(geo, m(cor, o.mat)); k.position.set(x, y, z); k.castShadow = o.sombra !== false; k.receiveShadow = true; if (o.ry) k.rotation.y = o.ry; return k; }
  function iniciar() {
    if (R) return;
    const cv = document.getElementById('gl');
    R = new THREE.WebGLRenderer({ canvas: cv, antialias: true, preserveDrawingBuffer: true, logarithmicDepthBuffer: true }); // log depth: evita o chão piscando (z-fighting)
    R.setPixelRatio(window.devicePixelRatio || 1); R.setSize(576, 1024, false);
    R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap;
    R.toneMapping = THREE.ACESFilmicToneMapping; R.toneMappingExposure = 1.05; R.outputColorSpace = THREE.SRGBColorSpace;
    cam = new THREE.PerspectiveCamera(42, 576 / 1024, .15, 900);
  }
  // ------------------------------------------------------------ céu e luz
  function ceuTex(c1, c2, c3) { const cv = document.createElement('canvas'); cv.width = 4; cv.height = 256; const g = cv.getContext('2d'); const gr = g.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, c1); gr.addColorStop(.55, c2); gr.addColorStop(1, c3 || c2); g.fillStyle = gr; g.fillRect(0, 0, 4, 256); const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t; }
  function luzes(sc, o = {}) {
    sc.add(new THREE.HemisphereLight(o.ceu || 0xdff1ff, o.chao || 0xb08a6a, o.hemi ?? 1.15));
    const sol = new THREE.DirectionalLight(o.sol || 0xffe0b0, o.forca ?? 2.6); sol.position.set(...(o.dir || [60, 80, 40])); sol.castShadow = true;
    sol.shadow.mapSize.set(2048, 2048); sol.shadow.radius = 5; sol.shadow.bias = -.0005; sol.shadow.normalBias = .04; Object.assign(sol.shadow.camera, { left: -120, right: 120, top: 120, bottom: -120, near: 1, far: 400 }); sc.add(sol); sc.add(sol.target);
    return sol;
  }
  function placaSprite(txt, o = {}) {
    const cv = document.createElement('canvas'); cv.width = 512; cv.height = 160; const g = cv.getContext('2d');
    g.fillStyle = o.fundo || '#fff'; g.strokeStyle = '#1d1f2b'; g.lineWidth = 14; g.beginPath(); g.roundRect(10, 10, 492, 140, 28); g.fill(); g.stroke();
    g.fillStyle = o.cor || '#1d1f2b'; g.font = '800 64px Poppins, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(txt, 256, 84);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthWrite: false })); s.scale.set(o.l || 6, (o.l || 6) * 160 / 512, 1); return s;
  }
  // ------------------------------------------------------------ peças
  function casa(sc, x, z, o = {}) { // casinha da Baixada (telhado de duas águas)
    const w = o.w || 4.2, d = o.d || 5, h = o.h || 2.8, g = new THREE.Group();
    g.add(malha(new THREE.BoxGeometry(w, h, d), o.cor || '#F49AB0', 0, h / 2, 0));
    const sh = new THREE.Shape(); sh.moveTo(-w / 2 - .35, 0); sh.lineTo(w / 2 + .35, 0); sh.lineTo(0, w * .42); sh.closePath();
    const tel = new THREE.ExtrudeGeometry(sh, { depth: d + .5, bevelEnabled: false }); tel.translate(0, 0, -(d + .5) / 2);
    const t = malha(tel, o.tel || '#C2543A', 0, h, 0); g.add(t);
    const jan = m(o.luz ? '#FFE08A' : '#3b4252', o.luz ? { emissive: C('#FFC860'), emissiveIntensity: .9 } : undefined);
    for (const s of [-1, 1]) { const j = new THREE.Mesh(new THREE.BoxGeometry(.7, .8, .05), jan); j.position.set(s * w * .25, h * .58, d / 2 + .03); g.add(j); }
    const p = new THREE.Mesh(new THREE.BoxGeometry(.8, 1.5, .05), m('#7a4a2a')); p.position.set(0, .75, d / 2 + .03); if (o.porta !== false) g.add(p);
    g.position.set(x, o.y || 0, z); g.rotation.y = o.ry || 0; sc.add(g); return g;
  }
  function casaRica(sc, x, z, o = {}) { // casa branca do Alto (laje, vidro)
    const w = o.w || 7, d = o.d || 7, h = o.h || 4.5, g = new THREE.Group();
    g.add(malha(new THREE.BoxGeometry(w, h, d), '#F4F1EA', 0, h / 2, 0));
    g.add(malha(new THREE.BoxGeometry(w + .6, .4, d + .6), '#D6CDBD', 0, h + .2, 0));
    g.add(malha(new THREE.BoxGeometry(w * .5, h * .7, d * .6), '#ECE6DA', w * .2, h + h * .35, -d * .1));
    const vid = m('#9FCFE6', { roughness: .3 });
    for (let i = 0; i < 3; i++) { const j = new THREE.Mesh(new THREE.BoxGeometry(w * .2, h * .35, .05), vid); j.position.set(-w * .3 + i * w * .3, h * .62, d / 2 + .03); g.add(j); }
    g.add(malha(new THREE.BoxGeometry(1, 2, .05), '#2B2E3F', 0, 1, d / 2 + .04, { sombra: false }));
    if (o.garrafas) for (let i = 0; i < 4; i++) g.add(malha(new THREE.CylinderGeometry(.18, .22, .8, 8), '#BFE8FF', -w / 2 + .6 + i * .5, .4, d / 2 + .7, { mat: { roughness: .2 } }));
    g.position.set(x, o.y || 0, z); g.rotation.y = o.ry || 0; sc.add(g); return g;
  }
  function arvore(sc, x, z, o = {}) { const g = new THREE.Group(), s = o.s || 1; g.add(malha(new THREE.CylinderGeometry(.18 * s, .25 * s, 1.6 * s, 6), '#7a5236', 0, .8 * s, 0)); g.add(malha(new THREE.IcosahedronGeometry(1.2 * s, 0), o.cor || '#5DAE5B', 0, 2.2 * s, 0)); g.add(malha(new THREE.IcosahedronGeometry(.8 * s, 0), o.cor2 || '#6CC27A', .5 * s, 2.9 * s, .2 * s)); g.position.set(x, o.y || 0, z); sc.add(g); return g; }
  function poste(sc, x, z, h = 6) { sc.add(malha(new THREE.CylinderGeometry(.1, .14, h, 6), '#6b6f7a', x, h / 2, z)); sc.add(malha(new THREE.BoxGeometry(1.4, .12, .12), '#6b6f7a', x, h - .4, z)); return [x, h - .4, z]; }
  function fio(sc, a, b, cor = '#2a2a33', cai = .6) { const pts = []; for (let i = 0; i <= 12; i++) { const k = i / 12; pts.push(new THREE.Vector3(a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k - Math.sin(k * Math.PI) * cai, a[2] + (b[2] - a[2]) * k)); } const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: cor })); sc.add(l); return l; }
  function varal(sc, x, z, larg = 5, ry = 0) { const g = new THREE.Group(); for (const s of [-1, 1]) g.add(malha(new THREE.CylinderGeometry(.05, .05, 2.2, 5), '#8a6a4a', s * larg / 2, 1.1, 0)); fio(g, [-larg / 2, 2.1, 0], [larg / 2, 2.1, 0], '#fff', .25);
    ['#2B2E3F', '#fff', '#8E5BC2', '#F7F2E6', '#2F6D5A', '#E8434F'].slice(0, Math.floor(larg)).forEach((c, i) => g.add(malha(new THREE.BoxGeometry(.6, .8, .04), c, -larg / 2 + .7 + i * .8, 1.55, 0))); g.position.set(x, 0, z); g.rotation.y = ry; sc.add(g); return g; }
  function nuvem(sc, x, y, z, o = {}) {
    const g = new THREE.Group(), s = o.s || 1, cor = o.cor || '#FFFFFF', mt = m(cor, { roughness: 1, flatShading: false, emissive: C('#ffffff'), emissiveIntensity: o.brilho ?? .62 });
    [[0, 0, 0, 2.4], [-2.4, -.4, .3, 1.8], [2.3, -.3, -.2, 1.9], [-1, .9, -.4, 1.7], [1.1, .8, .5, 1.6], [0, -.6, 1.2, 1.5]].forEach(([a, b, c, r]) => { const k = new THREE.Mesh(new THREE.SphereGeometry(r * s, 24, 16), mt); k.position.set(a * s, b * s, c * s); k.castShadow = true; g.add(k); });
    if (o.cadeado) { const cad = new THREE.Group(); cad.add(malha(new THREE.BoxGeometry(1.1 * s, .9 * s, .4 * s), '#B5763A', 0, 0, 0)); const arco = new THREE.Mesh(new THREE.TorusGeometry(.38 * s, .1 * s, 6, 12, Math.PI), m('#8a8a8a')); arco.position.y = .45 * s; cad.add(arco); cad.position.set(0, -2.3 * s, 1.2 * s); g.add(cad); g.userData.cadeado = cad; }
    if (o.placa) { const p = placaSprite(o.placa, { l: 3.4 * s }); p.position.set(0, -2.6 * s, 1.5 * s); g.add(p); }
    if (o.coleira) { const c = new THREE.Mesh(new THREE.TorusGeometry(2.3 * s, .18 * s, 6, 20), m('#E8434F')); c.rotation.x = Math.PI / 2; c.position.y = -.9 * s; g.add(c); }
    g.position.set(x, y, z); g.userData.base = [x, y, z]; sc.add(g); return g;
  }
  function chuva(sc, x, y0, z, o = {}) { // gotas caindo sob uma nuvem (anima com MUNDO.chuva(g, t))
    const n = o.n || 160, r = o.r || 3, pos = new Float32Array(n * 6), h = y0;
    const g = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: o.cor || '#8FD0F5', transparent: true, opacity: .8 }));
    g.geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.userData = { n, r, h, x, z, sem: Array.from({ length: n }, (_, i) => [Math.sin(i * 12.9898) * .5 + .5, Math.sin(i * 78.233) * .5 + .5, Math.sin(i * 37.719) * .5 + .5]) }; sc.add(g); return g;
  }
  function chuvaAnda(g, t) { const { n, r, h, x, z, sem } = g.userData, p = g.geometry.attributes.position.array;
    for (let i = 0; i < n; i++) { const [a, b, c] = sem[i], yy = h * (1 - ((t * 1.4 + c) % 1)), xx = x + (a - .5) * 2 * r, zz = z + (b - .5) * 2 * r; p.set([xx, yy, zz, xx - .05, yy + .7, zz], i * 6); }
    g.geometry.attributes.position.needsUpdate = true; }
  // terreno um pouco abaixo de y=0 e empurrado para trás no depth: pisos e ruas em y=0 nunca brigam com ele (piscar)
  function terreno(sc, cor, tam = 600) { const k = new THREE.Mesh(new THREE.PlaneGeometry(tam, tam), mat(cor, { polygonOffset: true, polygonOffsetFactor: 2, polygonOffsetUnits: 8 })); k.position.y = -.04; k.receiveShadow = true; k.rotation.x = -Math.PI / 2; sc.add(k); return k; }
  function morro(sc, x, z, r, h, cor) { const g = new THREE.SphereGeometry(r, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2); g.scale(1, h / r, 1); const k = malha(g, cor, x, 0, z); sc.add(k); return k; }
  let _ruaN = 0; // cada faixa de rua/calçada um pouco acima da anterior: cruzamentos não piscam
  const rua = (sc, x, z, w, d, cor = '#8C8478', ry = 0) => { const h = .06 + (_ruaN++ % 12) * .006; const k = malha(new THREE.BoxGeometry(w, h, d), cor, x, h / 2, z, { sombra: false }); k.rotation.y = ry; sc.add(k); return k; };

  let _fum = null; function fumacaTex() { if (_fum) return _fum; const cv = document.createElement('canvas'); cv.width = cv.height = 128; const g = cv.getContext('2d'); const gr = g.createRadialGradient(64, 64, 4, 64, 64, 62); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.45, 'rgba(255,255,255,.75)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 128, 128); _fum = new THREE.CanvasTexture(cv); return _fum; }
  function vapor(sc, x, y, z, o = {}) { // coluna de vapor: bolas brancas translúcidas subindo (anima no quadro)
    const g = new THREE.Group(), n = o.n || 26; g.userData = { x, y, z, h: o.h || 12, larg: o.larg || 1, forca: o.forca ?? 1, bolas: [] };
    for (let i = 0; i < n; i++) { const b = new THREE.Sprite(new THREE.SpriteMaterial({ map: fumacaTex(), color: '#ffffff', transparent: true, opacity: .5, depthWrite: false, fog: true })); g.add(b); g.userData.bolas.push({ b, f: i / n, d: Math.sin(i * 7.7) }); }
    sc.add(g); return g; }
  function vaporAnda(g, t) { const u = g.userData;
    u.bolas.forEach(({ b, f, d }) => { const k = (t * .16 + f) % 1; b.position.set(u.x + Math.sin(k * 7 + d * 3) * .6 * u.larg * (1 + k * 2), u.y + k * u.h, u.z + Math.cos(k * 5 + d) * .4 * u.larg);
      b.scale.setScalar(u.larg * (.9 + k * 3.4)); b.material.opacity = u.forca * .7 * Math.sin(Math.min(1, k * 4) * Math.PI / 2) * (1 - k); b.visible = u.forca > 0; }); }
  function caminhao3d(sc) { const g = new THREE.Group();
    g.add(malha(new THREE.BoxGeometry(2.4, 2.4, 4.4), '#E9E2D0', 0, 1.9, -1)); g.add(malha(new THREE.BoxGeometry(2.3, 1.7, 1.8), '#E8434F', 0, 1.45, 2.2)); g.add(malha(new THREE.BoxGeometry(2.0, .8, .05), '#BFE3F2', 0, 1.9, 3.12, { mat: { roughness: .3 } }));
    for (const [x, z] of [[-1.15, -2.2], [1.15, -2.2], [-1.15, .4], [1.15, .4], [-1.15, 2.4], [1.15, 2.4]]) { const r = malha(new THREE.CylinderGeometry(.5, .5, .4, 14), '#2a2a2a', x, .5, z); r.rotation.z = Math.PI / 2; g.add(r); }
    const pl = placaSprite('MUDANÇAS', { l: 3 }); pl.position.set(1.4, 2.4, -1); g.add(pl);
    g.position.set(0, -50, 0); sc.add(g); return g; }
  const morroY = (x, z, cx = -40, cz = -60, r = 55, h = 22) => { const dx = x - cx, dz = z - cz; return h * Math.sqrt(Math.max(0, 1 - (dx * dx + dz * dz) / (r * r))); };
  const SOCORRO_CASA = [20, 0, 12];
  // ------------------------------------------------------------ cenários prontos
  const CONSTROI = {
    // bairro inteiro: Alto (morro com casas brancas e nuvens) atrás à esquerda, Baixada (casinhas coloridas) na frente
    bairro(sc, o = {}) {
      if (o.noite) { o.c1 = '#1E1C45'; o.c2 = '#3E3C7A'; o.c3 = '#5B4E8A'; }
      sc.background = ceuTex(o.c1 || '#7FBFEA', o.c2 || '#CFE9F7', o.c3 || '#FBE3C4'); sc.fog = new THREE.Fog(o.c2 || '#CFE9F7', 70, 260);
      const sol = luzes(sc, o.noite ? { dir: [-40, 60, 50], sol: 0x9fb4ff, forca: .9, hemi: .6, ceu: 0x8a8fd0, chao: 0x3a3060 } : { dir: [80, 70, 60] });
      terreno(sc, o.seco ? '#C49A68' : '#D6B07C');
      morro(sc, -40, -60, 55, 22, o.seco ? '#B9B29A' : '#8DBF6C');
      const ricas = [[-48, -62], [-32, -58], [-58, -48], [-38, -44], [-22, -66], [-50, -76], [-64, -64]];
      ricas.forEach(([x, z], i) => { const dx = x + 40, dz = z + 60; const y = Math.max(0, 22 * Math.sqrt(Math.max(0, 1 - (dx * dx + dz * dz) / 3025))) - .4; casaRica(sc, x, z, { y, ry: i * .4, garrafas: 1 }); });
      for (let i = 0; i < 6; i++) arvore(sc, -70 + i * 9, -40 + (i % 2) * 6, { y: 4, s: 1.3 });
      const cores = ['#F49AB0', '#7DB7E8', '#FFD166', '#A8DDB5', '#E2725B', '#C6A6E8', '#F7F2E6', '#5FB8A8'], tels = ['#C2543A', '#B5452F', '#D06A44'];
      let k = 0; for (let gx = 0; gx < 7; gx++) for (let gz = 0; gz < 6; gz++) { const x = 4 + gx * 8 + (gz % 2) * 1.2, z = -6 + gz * 9; if ((gx * 7 + gz) % 9 === 4) { varal(sc, x, z, 4, .3); continue; } casa(sc, x, z, { cor: cores[k % 8], tel: tels[k % 3], ry: (gz % 2) * .05, luz: o.noite }); k++; }
      for (let gx = 0; gx < 7; gx++) rua(sc, 4 + gx * 8 + 4, 18, 2.2, 70);
      for (let gz = 0; gz < 6; gz++) rua(sc, 28, -6 + gz * 9 + 4.5, 70, 1.6);
      const ps = []; for (let i = 0; i < 6; i++) ps.push(poste(sc, 8 + i * 9, 50)); for (let i = 0; i < 5; i++) fio(sc, ps[i], ps[i + 1]);
      for (let i = 0; i < 8; i++) arvore(sc, 2 + i * 8.3, 56 + (i % 2) * 3, { s: .9 });
      const nuvens = []; const NP = [[-50, 46, -60], [-30, 50, -70], [-62, 44, -42], [-40, 52, -48], [-20, 47, -56], [-48, 55, -80], [-8, 49, -66]];
      const NN = NP.slice(0, o.nNuvens ?? NP.length);
      NN.forEach(([x, y, z], i) => nuvens.push(nuvem(sc, x, y, z, { s: 1.6, cadeado: o.cadeado, placa: typeof o.placas === 'string' ? o.placas : o.placas ? 'DE A.' : null })));
      const chuvas = o.seco || o.noite ? [] : NN.slice(0, 5).map(([x, y, z]) => chuva(sc, x, y - 3, z, { r: 3.5, n: 220 }));
      if (o.chuvaBaixada) { for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) chuvas.push(chuva(sc, 10 + i * 14, 22, 2 + j * 16, { r: 8, n: 260, cor: o.noite ? '#C9DEFF' : '#8FD0F5' })); }
      if (o.nuvensBaixada) [[12, 20, 4], [30, 22, 12], [46, 19, 0], [22, 24, 30], [40, 21, 34]].forEach(([x, y, z]) => nuvens.push(nuvem(sc, x, y, z, { s: .9 })));
      const vapores = []; if (o.vapor) { const casas = [[SOCORRO_CASA[0] + 2, 0, SOCORRO_CASA[2] + 4], [12.2, 0, 7], [28.2, 0, 16], [36, 0, 7], [44.2, 0, 25], [28, 0, -2], [12, 0, 25], [52, 0, 16]];
        casas.slice(0, o.vapor === true ? 1 : o.vapor).forEach(([x, y, z], i) => vapores.push(vapor(sc, x, 1, z, { h: o.vaporAlto || 14, larg: i ? 1 : 1.3 }))); }
      if (o.pagante) { const np = nuvem(sc, 12, 13, 3, { s: 1.2 }); nuvens.push(np); chuvas.push(chuva(sc, 12, 11, 3, { r: 3, n: 400, cor: '#E8F6FF' })); }
      return { nuvens, chuvas, sol, vapores };
    },
    // rua do Alto: avenida reta com casas brancas dos dois lados, postes, árvores
    rua(sc, o = {}) {
      sc.background = ceuTex(o.c1 || '#86C6EE', o.c2 || '#DDF1FA', o.c3 || '#FFF1D8'); sc.fog = new THREE.Fog(o.c2 || '#DDF1FA', 40, 170);
      luzes(sc, { dir: [40, 60, 30] });
      terreno(sc, o.seco ? '#BDB6A6' : '#CFE3B0');
      rua(sc, 0, -40, 9, 220, o.seco ? '#9A948A' : '#8C8478'); for (const s of [-1, 1]) rua(sc, s * 6, -40, 3, 220, '#E3DCCB');
      for (let i = 0; i < 14; i++) for (const s of [-1, 1]) { casaRica(sc, s * 14, 10 - i * 13, { ry: s > 0 ? -Math.PI / 2 : Math.PI / 2, h: 4 + (i % 3), garrafas: 1 }); if (i % 2) arvore(sc, s * 8.2, 4 - i * 13, { s: .9, cor: o.seco ? '#9C9A72' : '#5DAE5B', cor2: o.seco ? '#A9A47A' : '#6CC27A' }); }
      const ps = []; for (let i = 0; i < 12; i++) ps.push(poste(sc, -7.6, 8 - i * 16, 6.5)); for (let i = 0; i < 11; i++) fio(sc, ps[i], ps[i + 1]);
      const nuvens = []; for (let i = 0; i < 8; i++) nuvens.push(nuvem(sc, (i % 2 ? 1 : -1) * (8 + (i % 3) * 5), 22 + (i % 3) * 4, -10 - i * 18, { s: 1.4, placa: typeof o.placas === 'string' ? o.placas : o.placas ? 'DE A.' : null, cadeado: o.cadeado }));
      const cao = nuvem(sc, 0, -50, 0, { s: .42, coleira: 1 });
      const caminhao = caminhao3d(sc); const extra = nuvem(sc, 0, -50, 0, { s: .9, chove: 0 });
      const chuvas = []; if (o.chuvaLocal) chuvas.push(chuva(sc, ...o.chuvaLocal, { r: 2.5, n: 260 }));
      return { nuvens, cao, caminhao, extra, chuvas };
    },
    // quintal da dona Socorro na Baixada: casa coral, muro, varal, bacia no fogo, vizinhos, o Alto lá no fundo
    quintal(sc, o = {}) {
      if (o.noite) { o.c1 = '#1E1C45'; o.c2 = '#3E3C7A'; o.c3 = '#5B4E8A'; }
      sc.background = ceuTex(o.c1 || (o.seco ? '#B9C6CF' : '#7FBFEA'), o.c2 || (o.seco ? '#E9DCC4' : '#F6D7AE'), o.c3 || '#F6B97A'); sc.fog = new THREE.Fog(o.c2 || (o.seco ? '#E9DCC4' : '#F6D7AE'), 40, 200);
      luzes(sc, o.noite ? { dir: [-30, 50, 40], sol: 0x9fb4ff, forca: .8, hemi: .6 } : { dir: [30, 40, 50], sol: 0xffc98a, forca: 2.8 });
      terreno(sc, o.seco ? '#B98A5A' : '#C9935F');
      casa(sc, 9, -2, { w: 6, d: 6, h: 3, cor: '#E2725B', tel: '#B5452F', luz: o.noite, ry: -Math.PI / 2 }); casa(sc, -11, -4, { cor: '#7DB7E8', luz: o.noite, ry: Math.PI / 2 }); [[-14, -26, '#FFD166'], [-4, -30, '#F49AB0'], [8, -27, '#A8DDB5'], [18, -24, '#C6A6E8'], [-22, -22, '#5FB8A8']].forEach(([x, z, c]) => casa(sc, x, z, { cor: c, luz: o.noite }));
      for (const [x, z, w, d] of [[-7, -1, .3, 16], [0, -9, 14, .3]]) sc.add(malha(new THREE.BoxGeometry(w, 1.2, d), '#D9C3A0', x, .6, z));
      if (!o.semVaral) { const v = varal(sc, -3, -2.5, 5); if (o.varalVazio) v.children.slice(3).forEach(c => c.visible = c.geometry.type !== 'BoxGeometry'); }
      const bac = new THREE.Group(); bac.add(malha(new THREE.CylinderGeometry(1.1, .8, .55, 18), '#C9D3DC', 0, .75, 0, { mat: { roughness: .45, metalness: .3 } })); const agua = malha(new THREE.CylinderGeometry(1.0, 1.0, .05, 18), '#BFE3F2', 0, .98, 0, { mat: { roughness: .2 } }); bac.add(agua);
      for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; bac.add(malha(new THREE.BoxGeometry(.5, .45, .3), '#9A5A3A', Math.cos(a) * .75, .22, Math.sin(a) * .75, { ry: -a })); } const fogo = new THREE.Group(); for (let i = 0; i < 5; i++) { const f = new THREE.Mesh(new THREE.ConeGeometry(.18, .6, 6), m('#FF8A3C', { emissive: C('#FF6A1C'), emissiveIntensity: 1.2 })); f.position.set(Math.cos(i * 1.3) * .5, .5, Math.sin(i * 1.3) * .5); fogo.add(f); } bac.add(fogo);
      bac.position.set(2.5, 0, 1); sc.add(bac); agua.visible = !o.seco; fogo.visible = !o.semFogo;
      arvore(sc, -5, -6, { s: 1.1 }); const p1 = poste(sc, 4, -10, 6.5), p2 = poste(sc, -8, -10, 6.5); fio(sc, p1, p2); fio(sc, p1, [16, 6, -10]);
      morro(sc, -40, -110, 60, 26, o.seco ? '#B9B29A' : '#8DBF6C'); [[-48, -104], [-30, -100], [-40, -88], [-56, -92]].forEach(([x, z], i) => casaRica(sc, x, z, { y: morroY(x, z, -40, -110, 60, 26) - .4, ry: i }));
      const nuvens = []; if (!o.semNuvensAlto) [[-46, 40, -110], [-28, 44, -104], [-58, 38, -96]].forEach(([x, y, z]) => nuvens.push(nuvem(sc, x, y, z, { s: 1.5, cadeado: o.cadeado })));
      const vapores = [vapor(sc, 2.5, 1.1, 1, { h: o.vaporAlto || 16, larg: .9, forca: o.vapor ?? 1 })];
      const nina = nuvem(sc, 0, -50, 0, { s: .35 }); const chuvas = []; if (o.chuvaLocal) chuvas.push(chuva(sc, ...o.chuvaLocal, { r: 1.6, n: 200, cor: '#DFF3FF' }));
      if (o.chuvaToda) for (let i = 0; i < 3; i++) chuvas.push(chuva(sc, -8 + i * 8, 14, 0, { r: 6, n: 260, cor: o.noite ? '#C9DEFF' : '#9FD8FF' }));
      return { nuvens, vapores, nina, chuvas, fogo, bacia: bac };
    },
  };
  function set(nome, o = {}) {
    iniciar(); const chave = nome + JSON.stringify(o);
    if (!SETS[chave]) { const sc = new THREE.Scene(); const extra = CONSTROI[nome](sc, o); SETS[chave] = { sc, ...extra }; }
    return (atual = SETS[chave]);
  }
  // desenha um quadro. spec: { set, opts, p:[x,y,z], alvo:[x,y,z], fov, rol (graus), anima(S, t) }
  function quadro(spec, t) {
    const S = set(spec.set, spec.opts || {});
    (S.nuvens || []).forEach((n, i) => { const b = n.userData.base; n.position.y = b[1] + Math.sin(t * .8 + i) * .4; n.position.x = b[0] + Math.sin(t * .3 + i * 2) * .6; });
    (S.chuvas || []).forEach(c => chuvaAnda(c, t)); (S.vapores || []).forEach(v => vaporAnda(v, t));
    if (S.fogo) S.fogo.children.forEach((f, i) => f.scale.y = .8 + Math.abs(Math.sin(t * 11 + i * 2)) * .6);
    if (spec.anima) spec.anima(S, t);
    let P = spec.p, A = spec.alvo;
    if (spec.mao) { const a = spec.mao, n = (f, ph) => Math.sin(t * f + ph) * .6 + Math.sin(t * f * 2.13 + ph * 1.7) * .4; // câmera na mão (ruído suave)
      P = [P[0] + n(1.3, 1) * a, P[1] + n(1.1, 2) * a * .7, P[2] + n(.9, 3) * a]; A = [A[0] + n(1.7, 4) * a * .5, A[1] + n(1.5, 5) * a * .5, A[2] + n(1.2, 6) * a * .5]; }
    cam.fov = spec.fov || 42; cam.position.set(...P); cam.up.set(0, 1, 0); cam.lookAt(...A);
    if (spec.rol) cam.rotateZ(spec.rol * Math.PI / 180);
    cam.updateProjectionMatrix(); cam.updateMatrixWorld();
    R.render(S.sc, cam); ULTIMO = S; ALVO = A;
  }
  let ULTIMO = null, ALVO = null; const ultimo = () => ULTIMO;
  // checagem: a câmera está vendo uma superfície POR TRÁS (invisível) entre ela e o alvo? = atravessou parede/teto/objeto
  function atravessa() { if (!ULTIMO || !ALVO) return null; const o = cam.position.clone(), al = new THREE.Vector3(...ALVO), dir = al.clone().sub(o), dist = dir.length(); dir.normalize();
    const rc = new THREE.Raycaster(o, dir, .02, dist * .5), ms = []; ULTIMO.sc.traverse(x => { if (x.isMesh && x.visible && x.material && !Array.isArray(x.material) && !x.material.transparent && x.material.colorWrite !== false && x.material.side === THREE.FrontSide) ms.push(x); });
    ms.forEach(x => x.material.side = THREE.DoubleSide); const hs = rc.intersectObjects(ms, false); ms.forEach(x => x.material.side = THREE.FrontSide);
    for (const h of hs) { if (!h.face) continue; const n = h.face.normal.clone().transformDirection(h.object.matrixWorld); if (n.dot(dir) > .05) return h.object.name || 'parede/teto'; if (n.dot(dir) < -.05) return null; } // 1ª superfície de frente = a câmera vê o objeto por fora (ex.: mirando no chão)
    return null; }
  // ponto 3D -> tela (576x1024) e pixels por metro naquela distância
  function proj(p) { const v = new THREE.Vector3(...p).project(cam); const d = cam.position.distanceTo(new THREE.Vector3(...p));
    const ppm = 1024 / (2 * d * Math.tan(cam.fov * Math.PI / 360)); return { x: (v.x + 1) / 2 * 576, y: (1 - v.y) / 2 * 1024, ppm, atras: v.z > 1 }; }
  // stickman 2D em pé num ponto do chão 3D (altura real ~1,75 m para adulto)
  function pessoa(p, st, pos, altura) { const D = STK_TIPO[p.tipo || 'adulto'], H = D.perna[0] + D.perna[1] + D.tronco + D.pesc + D.cab * 2, q = proj(pos);
    if (q.atras) return ''; const alt = altura || (p.tipo === 'crianca' ? 1.15 : p.tipo === 'alto' ? 1.85 : 1.7);
    // oclusão: guarda profundidade e retângulo na tela para redesenhar por cima o que estiver mais perto da câmera
    const out = stick(p, { ...st, x: q.x, y: q.y, s: q.ppm * alt / H }); if (st.ocl !== false) ocluir(pos, alt, out); return out; }
  // ------------------------------------------------------------ oclusão (personagem 2D atrás de objeto 3D)
  // Cada personagem 2D vira, no 3D, uma placa invisível em pé no lugar dele (só escreve profundidade). Para cada um, uma
  // 2ª passada desenha só o que está NA FRENTE dele (balcão, parede, poste, porta), recortado pela silhueta exata do
  // desenho e descontando quem está mais perto da câmera. Assim ninguém "atravessa" objeto.
  let PESSOAS = [], R2 = null, C2 = null, PLACA = null; const CV = {};
  const cv2 = (n, w, h) => { const c = CV[n] || (CV[n] = document.createElement('canvas')); if (c.width !== w || c.height !== h) { c.width = w; c.height = h; } const g = c.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'source-over'; g.clearRect(0, 0, w, h); return [c, g]; };
  // registra alguém em pé no ponto pos (pés), altura em metros; svg = o desenho dele (para a silhueta). Sem svg, usa um retângulo.
  function ocluir(pos, alt = 1.7, svg = null, larg = .32) { const q = proj(pos); if (q.atras) return; const v = new THREE.Vector3(...pos).applyMatrix4(cam.matrixWorldInverse), hp = q.ppm * alt;
    PESSOAS.push({ pos, alt, larg, svg, d: -v.z, x0: q.x - hp * .55, x1: q.x + hp * .55, y0: q.y - hp * 1.15, y1: q.y + hp * .05 }); }
  function imgSvg(svg, tr, w, h) { const im = new Image();
    im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 1024" width="${w}" height="${h}"><defs>${typeof STK_DEFS !== 'undefined' ? STK_DEFS : ''}</defs><g transform="${tr}">${svg}</g></svg>`);
    return im.decode().then(() => im, () => null); }
  async function frente(oc, ultimo, c2d) {
    const W = oc.width, H = oc.height, g = oc.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, W, H);
    const L = PESSOAS; PESSOAS = []; if (!L.length || !ultimo) return false;
    if (!R2) { C2 = document.createElement('canvas'); R2 = new THREE.WebGLRenderer({ canvas: C2, antialias: true, alpha: true, preserveDrawingBuffer: true, logarithmicDepthBuffer: true });
      R2.setPixelRatio(window.devicePixelRatio || 1); R2.setSize(576, 1024, false); R2.shadowMap.enabled = true; R2.shadowMap.type = THREE.PCFSoftShadowMap;
      R2.toneMapping = R.toneMapping; R2.toneMappingExposure = R.toneMappingExposure; R2.outputColorSpace = R.outputColorSpace; R2.setClearColor(0x000000, 0);
      const geo = new THREE.PlaneGeometry(1, 1); geo.translate(0, .5, 0); PLACA = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ colorWrite: false, side: THREE.DoubleSide })); PLACA.renderOrder = -100; }
    const c = c2d || { s: 1, cx: 288, cy: 512, rot: 0 }, k = W / 576, tr = `translate(288 512) rotate(${c.rot || 0}) scale(${c.s}) translate(${-c.cx} ${-c.cy})`;
    const X = v => ((v - c.cx) * c.s + 288) * k, Y = v => ((v - c.cy) * c.s + 512) * k;
    const imgs = await Promise.all(L.map(p => p.svg ? imgSvg(p.svg, tr, W, H) : null));
    const sc = ultimo.sc, bg = sc.background;
    const escondidos = []; sc.traverse(o => { const mt = o.material; if (o.visible && mt && !Array.isArray(mt) && mt.transparent && (mt.opacity ?? 1) < .95) { o.visible = false; escondidos.push(o); } });
    sc.background = null; sc.add(PLACA);
    const ord = L.map((p, i) => i).sort((a, b) => L[b].d - L[a].d); // do mais longe para o mais perto
    ord.forEach((i, n) => { const p = L[i];
      PLACA.position.set(p.pos[0], p.pos[1] + .03, p.pos[2]); PLACA.scale.set(p.alt * p.larg * 2, p.alt * 1.12, 1); PLACA.rotation.set(0, Math.atan2(cam.position.x - p.pos[0], cam.position.z - p.pos[2]), 0);
      R2.render(sc, cam);
      // máscara binária: silhueta dele alargada ~7 px (cobre o desfoque da borda) menos o corpo de quem está mais perto
      const [M, gm] = cv2('m', W, H);
      if (imgs[i]) { const e = 7 * k; for (let r = 0; r < 12; r++) { const a = r / 12 * Math.PI * 2; gm.drawImage(imgs[i], Math.cos(a) * e, Math.sin(a) * e, W, H); } gm.drawImage(imgs[i], 0, 0, W, H); }
      else { gm.fillStyle = '#fff'; gm.fillRect(X(p.x0), Y(p.y0), X(p.x1) - X(p.x0), Y(p.y1) - Y(p.y0)); }
      const md = gm.getImageData(0, 0, W, H), ma = md.data;
      const perto = ord.slice(n + 1).filter(j => imgs[j]).map(j => { const [, gb] = cv2('b' + j, W, H); gb.drawImage(imgs[j], 0, 0, W, H); return gb.getImageData(0, 0, W, H).data; });
      for (let q = 3; q < ma.length; q += 4) { let v = ma[q] > 10 ? 255 : 0; if (v) for (const pd of perto) if (pd[q] > 120) { v = 0; break; } ma[q] = v; }
      gm.putImageData(md, 0, 0);
      const [T, gt] = cv2('t', W, H); gt.drawImage(C2, 0, 0, W, H); gt.globalCompositeOperation = 'destination-in'; gt.drawImage(M, 0, 0);
      g.drawImage(T, 0, 0); });
    sc.remove(PLACA); sc.background = bg; escondidos.forEach(o => o.visible = true); return true; }
  // objeto importante que não pode sair cortado do quadro (bicicleta, placa, bolo...): centro 3D e raio em metros
  function marca(nome, pos, raio) { const q = proj(pos); if (q.atras) return ''; return window.marca ? window.marca(nome, q.x, q.y, raio * q.ppm) : ''; }
  function limpaPessoas() { PESSOAS = []; }
  const ease = k => k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
  const mix = (a, b, k) => a.map((v, i) => v + (b[i] - v) * k);
  // caminho de câmera: lista de [p, alvo] ao longo do plano (k de 0 a 1), com suavização
  function trilha(pts, k, suave = true) { k = suave ? ease(Math.max(0, Math.min(1, k))) : Math.max(0, Math.min(1, k));
    if (pts.length === 2) return { p: mix(pts[0][0], pts[1][0], k), alvo: mix(pts[0][1], pts[1][1], k) };
    const cp = new THREE.CatmullRomCurve3(pts.map(q => new THREE.Vector3(...q[0]))), ca = new THREE.CatmullRomCurve3(pts.map(q => new THREE.Vector3(...q[1])));
    return { p: cp.getPoint(k).toArray(), alvo: ca.getPoint(k).toArray() }; }
  // cenários próprios de cada episódio (no cenas.js): MUNDO.registrar('nome', (sc, o, K) => ({ ...extras }))
  // K = peças prontas para montar o cenário sem mexer neste arquivo
  const K = { THREE, malha, m, C, ceuTex, luzes, placaSprite, casa, casaRica, arvore, poste, fio, varal, nuvem, chuva, terreno, morro, vapor, rua: (...a) => rua(...a) };
  // ---- câmera de cinema (sensação de animação 3D)
  // órbita em volta de um ponto: ângulo em graus (0 = câmera em +z olhando para -z), de a0 a a1 ao longo de k
  function orbita(c, raio, alt, a0, a1, k, o = {}) { const kk = o.linear ? k : ease(Math.max(0, Math.min(1, k))), a = (a0 + (a1 - a0) * kk) * Math.PI / 180, r = Array.isArray(raio) ? raio[0] + (raio[1] - raio[0]) * kk : raio, h = Array.isArray(alt) ? alt[0] + (alt[1] - alt[0]) * kk : alt;
    return { p: [c[0] + Math.sin(a) * r, c[1] + h, c[2] + Math.cos(a) * r], alvo: o.alvo || c }; }
  // grua: sobe/desce e aproxima ao mesmo tempo, olhando sempre para o alvo
  function grua(c, de, ate, k) { const kk = ease(Math.max(0, Math.min(1, k))); const [r0, h0, a0] = de, [r1, h1, a1] = ate; return orbita(c, [r0, r1], [h0, h1], a0, a1, kk, { linear: true }); }
  // dolly-zoom (efeito vertigem): a câmera anda para trás/frente e o fov compensa, o alvo mantém o tamanho (larg em metros)
  function dolly(c, dir, d0, d1, larg, k) { const kk = ease(Math.max(0, Math.min(1, k))), d = d0 + (d1 - d0) * kk, n = Math.hypot(...dir), u = dir.map(v => v / n);
    return { p: c.map((v, i) => v + u[i] * d), alvo: c, fov: 2 * Math.atan(larg / 2 / d) * 180 / Math.PI }; }
  function registrar(nome, fn) { CONSTROI[nome] = (sc, o) => fn(sc, o, K); }
  return { set, quadro, proj, pessoa, ocluir, marca, atravessa, frente, limpaPessoas, ultimo, trilha, orbita, grua, dolly, ease, morroY, SOCORRO_CASA, registrar, K };
})();
