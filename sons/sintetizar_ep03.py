"""Sons novos do EP03, sintetizados do zero (sem direitos de terceiros). Uso: python3 -I sons/sintetizar_ep03.py"""
import numpy as np, wave, os
SR = 44100; D = os.path.dirname(os.path.abspath(__file__)); rng = np.random.default_rng(3)
def save(n, a, peak=.9):
    a = np.asarray(a, float); a = a / (np.max(np.abs(a)) + 1e-9) * peak; a = np.stack([a, a], 1)
    w = wave.open(os.path.join(D, n), 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(a, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()
tt = lambda d: np.arange(int(SR * d)) / SR
def lp(x, a):
    y = np.zeros_like(x); v = 0.
    for i in range(len(x)): v += a * (x[i] - v); y[i] = v
    return y
def env(d, at=.005, dec=.2):
    t = tt(d); return np.minimum(1, t / at) * np.exp(-t / dec)
# gota: tom que sobe rápido + estalo
t = tt(.25); f = 700 + 1400 * (1 - np.exp(-t / .02)); g = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(.25, .002, .05)
save('gota.wav', g, .8)
# fervura: borbulhas aleatórias + chiado
d = 3.0; b = lp(rng.standard_normal(int(SR * d)), .25) * .15
for _ in range(90):
    at = rng.uniform(0, d - .1); fr = rng.uniform(180, 520); x = np.sin(2 * np.pi * fr * (1 + 2 * tt(.06)) * tt(.06)) * env(.06, .002, .02)
    i = int(at * SR); b[i:i + len(x)] += x * rng.uniform(.3, 1)
b *= np.minimum(1, tt(d) / .2) * np.minimum(1, (d - tt(d)) / .3); save('fervura.wav', b, .7)
# vapor: chiado suave (ruído filtrado) com fade
d = 1.6; v = rng.standard_normal(int(SR * d)); v = v - lp(v, .3); v = lp(v, .5) * np.sin(np.pi * tt(d) / d) ** 1.5; save('vapor.wav', v, .5)
# martelo de leilão: dois golpes de madeira
def golpe(): x = (np.sin(2 * np.pi * 220 * tt(.18)) * .6 + lp(rng.standard_normal(int(SR * .18)), .5)) * env(.18, .001, .03); return x
m = np.zeros(int(SR * .7)); m[:len(golpe())] += golpe(); i = int(.32 * SR); g2 = golpe(); m[i:i + len(g2)] += g2; save('martelo.wav', m, .9)
# moeda: dois parciais metálicos
d = .9; x = sum(np.sin(2 * np.pi * f * tt(d)) * a for f, a in [(2100, 1), (3170, .6), (4400, .3)]) * env(d, .001, .18); save('moeda.wav', x, .7)
# caminhão: ronco grave de motor
d = 4.0; tm = tt(d); f = 42 + 6 * np.sin(2 * np.pi * .4 * tm); mo = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * .5 + lp(rng.standard_normal(len(tm)), .05) * 3
mo = lp(mo, .08) * np.minimum(1, tm / .6) * np.minimum(1, (d - tm) / 1.2); save('caminhao.wav', mo, .8)
# rachado: estalo seco de terra rachando
x = np.zeros(int(SR * .5))
for k in range(5):
    at = .03 + k * .07 + rng.uniform(0, .03); n = lp(rng.standard_normal(int(SR * .05)), .6) * env(.05, .0005, .01); i = int(at * SR); x[i:i + len(n)] += n * (1 - k * .15)
save('racha.wav', x, .8)
# chuva_inicio: trovãozinho suave + começo de chuva (um tiro, 2.5 s)
d = 2.5; r = rng.standard_normal(int(SR * d)); r = lp(r - lp(r, .2), .6) * np.minimum(1, tt(d) / 1.0) * np.minimum(1, (d - tt(d)) / .5)
for _ in range(60):
    at = rng.uniform(.3, d - .1); i = int(at * SR); r[i:i + len(g)] += g[:len(r) - i] * rng.uniform(.05, .2)
save('chuva_inicio.wav', r, .6)
print('ok')
