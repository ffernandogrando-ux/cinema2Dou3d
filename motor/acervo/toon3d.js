// ================================================================ ABERTURA 3D EM DESENHO (kit toon)
// Cenário 'bairroToon': rua de casas 3D com cor chapada de 2 tons (MeshToonMaterial) e contorno preto grosso (casca invertida),
// a casa do protagonista em x = 0 (garagem com luz colorida lá dentro). Personagens toon colados com p3T(P, [x, 0, z], t, st).
// Opções (g3d: { set: 'bairroToon', opts: {...} }): ceu, grama, cores[6], corCasa, luz (cor da garagem; null = apagada), garagem: false, semente.
// Câmera típica (2 s de abertura): MUNDO.trilha([[[-9, 9, 24], [0, 1.4, 2]], [[-3, 4.5, 15], [0, 1.4, 2.4]], [[.9, 1.8, 10.2], [0, 1.3, 2.8]]], tl / d), fov 50, mb: false.
MUNDO.registrar('bairroToon', (sc, o, K) => {
  const { THREE } = K;
  const ceu = o.ceu || '#F2C25B'; sc.background = new THREE.Color(ceu); sc.fog = new THREE.Fog(ceu, 40, 120);
  const grad = new THREE.DataTexture(new Uint8Array([90, 90, 90, 255, 255, 255, 255, 255]), 2, 1, THREE.RGBAFormat); grad.needsUpdate = true; grad.minFilter = grad.magFilter = THREE.NearestFilter;
  sc.add(new THREE.AmbientLight(0xffffff, .55)); const sol = new THREE.DirectionalLight(0xffffff, 1.6); sol.position.set(-20, 30, 18); sc.add(sol);
  const contorno = new THREE.MeshBasicMaterial({ color: '#1b1422', side: THREE.BackSide });
  const pe = (g, cor, x, y, z, borda = .06) => { const M = new THREE.Mesh(g, new THREE.MeshToonMaterial({ color: cor, gradientMap: grad })); M.position.set(x, y, z); sc.add(M);
    if (borda) { const H = new THREE.Mesh(g, contorno); H.position.copy(M.position); H.rotation.copy(M.rotation); g.computeBoundingBox(); const b = g.boundingBox, sz = new THREE.Vector3(); b.getSize(sz);
      H.scale.set(1 + borda * 2 / sz.x, 1 + borda * 2 / sz.y, 1 + borda * 2 / sz.z); sc.add(H); } return M; };
  pe(new THREE.BoxGeometry(400, .2, 400), o.grama || '#3E8C84', 0, -.1, 0, 0);                         // chão
  pe(new THREE.BoxGeometry(400, .22, 7), '#4B4A60', 0, -.08, 9, 0);                          // rua
  for (let i = -20; i < 20; i++) pe(new THREE.BoxGeometry(1.4, .24, .25), '#F4F1EA', i * 3.2, -.06, 9, 0);
  pe(new THREE.BoxGeometry(400, .3, 2.2), '#C9C2B0', 0, -.02, 4.6, 0);                         // calçada
  const cores = o.cores || ['#E86A5A', '#F7E3B0', '#7FB8E8', '#E9A0C8', '#9BD08A', '#F0B45A'], R = rng(o.semente || 8);
  const casa = (x, z, w, h, cor, garagem) => { pe(new THREE.BoxGeometry(w, h, 5), cor, x, h / 2, z);
    const tel = pe(new THREE.ConeGeometry(w * .78, 2.2, 4), '#8C4A3A', x, h + 1.1, z); tel.rotation.y = Math.PI / 4;
    if (garagem) { pe(new THREE.BoxGeometry(w * .62, h * .7, .2), '#2a1f3a', x, h * .35, z + 2.52, .03);
      const luz = new THREE.Mesh(new THREE.PlaneGeometry(w * .5, h * .55), new THREE.MeshBasicMaterial({ color: o.luz || '#C04BFF', transparent: true, opacity: o.luz === null ? 0 : .55 })); luz.position.set(x, h * .3, z + 2.64); sc.add(luz); }
    else { pe(new THREE.BoxGeometry(1, 2, .2), '#5a3a28', x - w * .2, 1, z + 2.52, .03); pe(new THREE.BoxGeometry(1.4, 1.1, .2), '#BFE3F5', x + w * .22, h * .6, z + 2.52, .03); } };
  for (let i = -6; i <= 6; i++) { const x = i * 7.4; casa(x, 0, 6, 3.6 + R() * 1.6, i === 0 ? (o.corCasa || '#E3B04B') : cores[(i + 12) % 6], i === 0 && o.garagem !== false);
    casa(x + 3.7, -14, 6, 3.6 + R() * 2, cores[(i + 15) % 6], false); }
  for (let i = -6; i <= 6; i++) { const tr = pe(new THREE.CylinderGeometry(.18, .22, 2.4, 8), '#7A4E2D', i * 7.4 + 3.7, 1.2, 5.6); pe(new THREE.SphereGeometry(1.1, 12, 8), '#2F9E5B', i * 7.4 + 3.7, 2.9, 5.6); }
  return {};
});
// personagem toon em pé no 3D (pés em pos, altura em metros)
const p3T = (P, pos, t, o = {}, alt = 1.75) => { const q = MUNDO.proj(pos); if (q.atras) return ''; return pt(P, q.x, q.y, q.ppm * alt / 600, t, o); };
