# Voz pelo Gemini TTS (o proxy injeta a chave). Uso: python3 -I motor/voz_gemini.py gemini-3.8-flash-tts Puck saida.wav pt/narracao.txt
# Depois: ffmpeg -i saida.wav -ar 44100 -ac 1 pt/voz.wav  e  python3 -I motor/alinhar.py episodios/epXX/pt
import json,sys,base64,urllib.request,wave
model,voz,saida,arq=sys.argv[1:5]
texto=open(arq).read()
estilo=("Leia em português do Brasil, como narrador de história no TikTok: voz jovem, envolvente, "
 "com tom de suspense e um toque de humor ácido. Ritmo ágil, pausas curtas entre as frases, "
 "falas entre aspas interpretadas. Texto:\n\n")
body={"contents":[{"parts":[{"text":estilo+texto}]}],
 "generationConfig":{"responseModalities":["AUDIO"],
  "speechConfig":{"voiceConfig":{"prebuiltVoiceConfig":{"voiceName":voz}}}}}
req=urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
 data=json.dumps(body).encode(),headers={"Content-Type":"application/json"})
r=json.load(urllib.request.urlopen(req,timeout=600))
p=r["candidates"][0]["content"]["parts"][0]["inlineData"]
pcm=base64.b64decode(p["data"]);print(p.get("mimeType"),len(pcm))
if pcm[:4]==b"RIFF": open(saida,"wb").write(pcm)
else:
  w=wave.open(saida,"wb");w.setnchannels(1);w.setsampwidth(2);w.setframerate(24000);w.writeframes(pcm);w.close()
