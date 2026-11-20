// ACERVO · base
// Ajudantes comuns: tempos por palavra, P3 (stickman no 3D), HUD, câmera de segurança, mão, fundo de tela.
// Carregado pelo motor/render.js quando o cenas.js do episódio declara: //@acervo base
// Não copie estas peças para o episódio: importe com //@acervo e, se precisar mudar, mude AQUI (todos os episódios ganham).

const ws = (l, w = 0) => PALAVRAS[LINHAS[l][w]].s;
const cl = clamp;
try { document.fonts.load('800 64px Poppins'); } catch (e) {}
let _hudEv = null;
// ---------------------------------------------------------------- 3D: rua de lama
function texPlaca(K, linhas, o = {}) { const { THREE } = K, cv = document.createElement('canvas'); cv.width = o.w || 1024; cv.height = o.h || 300; const g = cv.getContext('2d');
  g.fillStyle = o.fundo || '#fff'; g.strokeStyle = o.borda || '#1d1f2b'; g.lineWidth = o.lw ?? 18; g.beginPath(); g.roundRect(10, 10, cv.width - 20, cv.height - 20, o.r ?? 40); g.fill(); if (o.lw !== 0) g.stroke();
  g.textAlign = 'center'; g.textBaseline = 'middle'; linhas.forEach(([t, fs, cor, y]) => { g.fillStyle = cor || '#1d1f2b'; g.font = `800 ${fs}px Poppins, sans-serif`; g.fillText(t, cv.width / 2, y * cv.height); });
  const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; return tx; }
const P3 = (p, st, pos, alt) => MUNDO.pessoa(p, { ocl: false, ...st }, pos, alt);
// figurantes afundados na rua (mesma disposição em todos os planos da rua)
function fundoTela(c) { return `<rect x="-400" y="-400" width="1400" height="1900" fill="${c}"/>`; }
function maoD(p, st) { const D = STK_TIPO[p.tipo || 'adulto'], s = st.s || 1, a = (st.pose && st.pose.bD) || [12, -10];
  const pernaL = D.perna[0] + D.perna[1], topo = -pernaL - D.tronco, m = stkMembro(D.ombro, topo + 14, D.braco[0], D.braco[1], a[0], a[1], 1);
  const desce = st.afundado ? -stkNivel(D, st.afundado) * s : 0; return [(st.x || 0) + m.f[0] * s, (st.y || 0) + desce + m.f[1] * s]; }

const STK_D = STK_TIPO.adulto, nivelFr = n => stkNivel(STK_D, n) / stkNivel(STK_D, 1);
const nivelEntre = (a, b, k) => lerp(nivelFr(a), nivelFr(b), k);
const FIM_FALA = () => PALAVRAS[PALAVRAS.length - 1].e;
function segCam(t, cam, hora) { const sd = Math.floor(t * 24) % 97;
  return `<defs><filter id="grao${sd}" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="1" seed="${sd}"/><feColorMatrix values="0 0 0 0 .6  0 0 0 0 .65  0 0 0 0 .6  0 0 0 .09 0"/></filter>`
    + `<pattern id="scan" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="2" fill="#000" opacity=".18"/></pattern></defs>`
    + `<rect x="0" y="0" width="576" height="1024" fill="#7f9a86" style="mix-blend-mode:color" opacity=".7"/><rect x="0" y="0" width="576" height="1024" fill="#0a120e" opacity=".18" style="mix-blend-mode:multiply"/><defs><radialGradient id="vin"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient></defs><rect x="0" y="0" width="576" height="1024" fill="url(#vin)"/>`
    + `<rect x="0" y="0" width="576" height="1024" filter="url(#grao${sd})"/><rect x="0" y="0" width="576" height="1024" fill="url(#scan)"/>`
    + `<rect x="${(t * 260) % 1300 - 150}" y="0" width="576" height="60" fill="#fff" opacity=".04" transform="rotate(90 288 512)"/>`
    + `<text x="28" y="128" font-family="monospace" font-weight="700" font-size="26" fill="#e8f2ea" opacity=".9">${cam}</text><text x="548" y="128" font-family="monospace" font-weight="700" font-size="26" fill="#e8f2ea" text-anchor="end" opacity=".9">${hora}</text>`
    + `<circle cx="38" cy="162" r="9" fill="#ff3a3a" opacity="${Math.floor(t * 2) % 2 ? .9 : .25}"/><text x="56" y="171" font-family="monospace" font-weight="700" font-size="24" fill="#e8f2ea" opacity=".85">REC</text>`; }
function horaSeg(t) { const s0 = 3 * 3600 + 47 * 60 + 12 + Math.floor(t - 99); const h = Math.floor(s0 / 3600), m = Math.floor(s0 / 60) % 60, sg = s0 % 60; return `0${h}:${String(m).padStart(2, '0')}:${String(sg).padStart(2, '0')}`; }
