const {chromium}=require('playwright');
(async()=>{const [,,src,out,w,h]=process.argv;const b=await chromium.launch();const p=await b.newPage({viewport:{width:+w,height:+h}});
p.on('pageerror',e=>console.log('ERR',e.message));await p.goto('file://'+src);await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:out});await b.close();})();
