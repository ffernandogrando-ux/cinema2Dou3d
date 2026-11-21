# Encurta pausas longas da voz (TTS do Gemini deixa ~30% de silêncio). Uso: python3 -I motor/enxugar_pausas.py entrada.wav saida.wav 0.25
import sys,wave,numpy as np
ent,sai,maxp=sys.argv[1],sys.argv[2],float(sys.argv[3])
w=wave.open(ent);sr=w.getframerate();a=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)
j=int(.01*sr);db=20*np.log10(np.array([np.sqrt(np.mean(a[i:i+j]**2))+1 for i in range(0,len(a),j)])/32768)
sil=db<-40;out=[];i=0;n=len(sil)
while i<n:
  k=i
  while k<n and sil[k]==sil[i]: k+=1
  seg=a[i*j:k*j]
  if sil[i] and (k-i)*j>maxp*sr:
    m=int(maxp*sr);seg=np.concatenate([seg[:m//2],seg[-m//2:]])
  out.append(seg);i=k
b=np.concatenate(out).clip(-32768,32767).astype(np.int16)
o=wave.open(sai,'wb');o.setnchannels(1);o.setsampwidth(2);o.setframerate(sr);o.writeframes(b.tobytes());o.close()
print(sai,round(len(a)/sr,1),'->',round(len(b)/sr,1),'s')
