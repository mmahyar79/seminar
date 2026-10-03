const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
(async()=>{
 const svgs=JSON.parse(fs.readFileSync(__dirname+'/icons/svgs.json'));
 const COLORS={w:'#FFFFFF',n:'#1F3A5F',r:'#B3393C',t:'#2A7A8C',a:'#D88A1F',g:'#3B7D5A',p:'#6A4C93',s:'#5B6B8C'};
 const b=await chromium.launch(); const p=await b.newPage({viewport:{width:256,height:256}});
 for(const [k,svg] of Object.entries(svgs)){
  for(const [c,hex] of Object.entries(COLORS)){
   const s=svg.replace(/#FFFFFF/g,hex).replace(/fill="currentColor"/g,`fill="${hex}"`);
   await p.setContent(`<html><body style="margin:0;background:transparent">${s}</body></html>`);
   const el=await p.$('svg'); await el.screenshot({path:`${__dirname}/icons/${k}_${c}.png`,omitBackground:true});
  }
 }
 await b.close();
})();
