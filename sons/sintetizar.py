"""Gera os sons sintetizados do projeto (ambientes e efeitos). Uso: python3 sons/sintetizar.py
Todos são criados aqui do zero — sem direitos de terceiros."""
import numpy as np, wave, os
SR = 44100
D = os.path.dirname(os.path.abspath(__file__))
rng = np.random.default_rng(7)
def save(n, a, peak=.9):
    a = np.asarray(a, dtype=np.float64); a = a / (np.max(np.abs(a)) + 1e-9) * peak
    if a.ndim == 1: a = np.stack([a, a], 1)
    w = wave.open(os.path.join(D, n), 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(a, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()
def tt(d): return np.arange(int(SR * d)) / SR
def lp(x, a):  # passa-baixa de 1 polo (a pequeno = mais grave)
    y = np.zeros_like(x); v = 0.
    for i in range(len(x)): v += a * (x[i] - v); y[i] = v
    return y
def brown(d, a=.02): return lp(rng.standard_normal(int(SR * d)), a)
def loopfade(x, f=.5):  # deixa o loop sem emenda (crossfade início/fim)
    n = int(SR * f); x = x.copy(); r = np.linspace(0, 1, n)
    x[:n] = x[:n] * r + x[-n:] * (1 - r); return x[:-n]
def chirp(f0, f1, d, amp=1.):
    t = tt(d); f = np.linspace(f0, f1, len(t)); ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.sin(np.pi * t / d) ** 2 * amp
def place(buf, x, at):
    i = int(at * SR); j = min(len(buf), i + len(x)); buf[i:j] += x[:j - i]
# ---------------------------------------------------------------- ambientes (loops de 12s)
L = 12.5
def passaros(dens=1.0, brilho=1.0):
    b = np.zeros(int(SR * L))
    for _ in range(int(14 * dens)):
        at = rng.uniform(0, L - 1); f = rng.uniform(2600, 4200) * brilho
        for k in range(rng.integers(2, 5)):
            place(b, chirp(f, f * rng.uniform(1.15, 1.5), rng.uniform(.05, .11), rng.uniform(.4, 1)), at + k * rng.uniform(.09, .15))
    return b
rua = passaros(.7) * .5  # só passarinhos, sem ruído de fundo
save('amb_rua.wav', loopfade(rua), .35)
manha = passaros(1.2, 1.1) * .6
save('amb_manha.wav', loopfade(manha), .35)
# casa: tom de sala + tique-taque
casa = np.zeros(int(SR * L))  # só o tique-taque
tic = np.exp(-tt(.03) * 300) * rng.standard_normal(int(SR * .03))
for k in range(int(L)): place(casa, lp(tic, .5) * (.9 if k % 2 else .6) * 1.5, k + .05)
save('amb_casa.wav', loopfade(casa), .3)
interior = passaros(.25) * .2
save('amb_interior.wav', loopfade(interior), .25)
# noite: grilos
noite = np.zeros(int(SR * L))
for c in range(3):
    f = 4300 + c * 350; ph = rng.uniform(0, 1)
    t = tt(L); env = (np.sin(2 * np.pi * (t * (1.6 + c * .3) + ph)) > .55).astype(float)
    env = lp(env, .02); noite += np.sin(2 * np.pi * f * t) * (0.5 + 0.5 * np.sin(2 * np.pi * 30 * t)) * env * .25
save('amb_noite.wav', loopfade(noite), .2)
# garagem: zumbido elétrico + grilos ao longe
t = tt(L); gar = np.zeros(int(SR * L))  # garagem: só grilos bem ao longe (sem zumbido)
for c in range(2):
    env = lp((np.sin(2 * np.pi * (t * (1.4 + c * .4) + c * .3)) > .6).astype(float), .02); gar += np.sin(2 * np.pi * (4500 + c * 300) * t) * (0.5 + 0.5 * np.sin(2 * np.pi * 30 * t)) * env * .2
save('amb_garagem.wav', loopfade(gar), .12)
# magia: drone grave com brilho
mag = sum(np.sin(2 * np.pi * f * t + rng.uniform(0, 6)) * a for f, a in [(55, 1), (55.6, .8), (82.4, .5), (110.3, .35), (164.8, .15)])
mag *= .8 + .2 * np.sin(2 * np.pi * .15 * t)
sh = np.zeros_like(t)
for _ in range(30): place(sh, np.sin(2 * np.pi * rng.uniform(1800, 3200) * tt(.6)) * np.exp(-tt(.6) * 7) * .15, rng.uniform(0, L - 1))
save('amb_magia.wav', loopfade(mag * .5 + sh), .22)
escola = passaros(.8) * .4
save('amb_escola.wav', loopfade(escola), .3)
# ---------------------------------------------------------------- efeitos
def whoosh(d, a0, a1, seed):
    r = np.random.default_rng(seed); n = r.standard_normal(int(SR * d)); y = np.zeros_like(n); v = 0.
    for i in range(len(n)): a = a0 + (a1 - a0) * i / len(n); v += a * (n[i] - v); y[i] = v
    return y * np.sin(np.pi * tt(d) / d) ** 2
save('whoosh2.wav', whoosh(.32, .05, .35, 3))
save('swish.wav', whoosh(.18, .15, .5, 4))
# passos (cartoon): baque grave + clique
for k, f in [(1, 95), (2, 80)]:
    d = .12; x = np.sin(2 * np.pi * f * tt(d)) * np.exp(-tt(d) * 45) + lp(rng.standard_normal(int(SR * d)), .3) * np.exp(-tt(d) * 90) * .6
    save(f'passo{k}.wav', x, .8)
# impacto: boom grave descendo
d = 1.6; f = np.linspace(110, 38, int(SR * d)); x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt(d) * 2.6)
x += lp(rng.standard_normal(int(SR * d)), .05) * np.exp(-tt(d) * 6) * 2
save('impacto.wav', x)
# riser: ruído + tom subindo (tensão antes da virada)
d = 2.2; t2 = tt(d); f = np.linspace(200, 900, len(t2))
x = np.sin(2 * np.pi * np.cumsum(f) / SR) * (t2 / d) ** 2 * .5 + whoosh(d, .01, .5, 9) * (t2 / d) * 2
save('riser.wav', x, .8)
# coração: tum-tum
d = .9; x = np.zeros(int(SR * d))
for at, a in [(0, 1), (.22, .7)]: place(x, np.sin(2 * np.pi * 55 * tt(.18)) * np.exp(-tt(.18) * 22) * a, at)
save('coracao.wav', x)
# ding suave (aparece etiqueta/ideia)
d = 1.0; x = sum(np.sin(2 * np.pi * f * tt(d)) * a for f, a in [(1760, 1), (2637, .4), (3520, .2)]) * np.exp(-tt(d) * 6)
save('ding.wav', x, .7)
# brilho2 (variação curta)
d = .7; x = np.zeros(int(SR * d))
for k, f in enumerate([2093, 2637, 3136]): place(x, np.sin(2 * np.pi * f * tt(.5)) * np.exp(-tt(.5) * 9), k * .06)
save('brilho2.wav', x, .7)
print('ok')
# ---------------------------------------------------------------- EP02: sinos, trovão, chuva
def sino(f0, d, decay, parciais=((1, 1), (2.0, .6), (2.4, .45), (3.0, .3), (4.2, .2), (5.4, .12))):
    t = tt(d); x = sum(np.sin(2 * np.pi * f0 * r * t + rng.uniform(0, 6)) * a * np.exp(-t * decay * (1 + r * .3)) for r, a in parciais)
    return x * np.minimum(1, t * 400)
save('sino_casa.wav', sino(880, 1.6, 2.2), .8)          # sino de porta
save('sino_pequeno.wav', sino(2093, .8, 5), .6)        # tlim
save('sino_igreja.wav', sino(196, 4.0, .7, ((1, 1), (2.0, .7), (2.4, .5), (3.0, .4), (4.0, .3), (5.2, .15), (.5, .5))), .9)  # BLÉM
ab = sino(660, 1.0, 6); save('sino_abafado.wav', lp(ab, .08), .5)                         # sino com meia
d = 3.5; t = tt(d); trov = brown(d, .004) * np.exp(-t * 1.1) * 6 + brown(d, .03) * np.exp(-t * 4) * 2
trov *= np.minimum(1, t * 30) * (1 + .5 * np.sin(2 * np.pi * 3 * t) * np.exp(-t))
save('trovao.wav', trov, .95)
# chuva: gotas (cliques curtos) sobre um chiado bem leve e grave — só nas cenas de chuva
L2 = 8.0; ch = lp(rng.standard_normal(int(SR * L2)), .25) * .25
for _ in range(1400): place(ch, lp(rng.standard_normal(200), .5) * np.exp(-np.arange(200) / 30) * rng.uniform(.3, 1), rng.uniform(0, L2 - .01))
save('amb_chuva.wav', loopfade(ch, .4), .3)
d = .25; x = np.sin(2 * np.pi * 180 * tt(d)) * np.exp(-tt(d) * 25); save('bola.wav', x, .7)      # bola quicando
d = .12; x = lp(rng.standard_normal(int(SR * d)), .6) * np.exp(-tt(d) * 60) + np.sin(2 * np.pi * 900 * tt(d)) * np.exp(-tt(d) * 80) * .5; save('bengala.wav', x, .6)
print('ep02 ok')
