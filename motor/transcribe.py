import sys,os,subprocess,numpy as np
from faster_whisper import WhisperModel
m=WhisperModel('small',device='cpu',compute_type='int8',cpu_threads=4)
src,out=sys.argv[1],sys.argv[2]; os.makedirs(out,exist_ok=True)
for f in sorted(os.listdir(src)):
    o=os.path.join(out,f[:-4]+'.txt')
    if os.path.exists(o): continue
    raw=subprocess.run(['ffmpeg','-v','error','-i',os.path.join(src,f),'-ac','1','-ar','16000','-f','s16le','-'],capture_output=True).stdout
    a=np.frombuffer(raw,np.int16).astype(np.float32)/32768
    segs,_=m.transcribe(a,language='pt',beam_size=1,vad_filter=True)
    open(o,'w').write('\n'.join(f'[{s.start:6.1f}] {s.text.strip()}' for s in segs)); print('ok',f,flush=True)
