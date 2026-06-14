import { chromium } from '@playwright/test';
const base = 'file://' + process.cwd() + '/.mockups/';
async function shot(b,file,out,w,h,s){const c=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:s});const p=await c.newPage();await p.goto(base+file,{waitUntil:'networkidle',timeout:60000});await p.waitForTimeout(1400);await p.screenshot({path:'.mockups/'+out,fullPage:file.includes('phone')?true:false});await c.close();console.log('wrote',out);}
let b;try{b=await chromium.launch();}catch{b=await chromium.launch({channel:'chrome'});}
await shot(b,'booking-editing-desktop.html','booking-editing-desktop.png',1280,900,2);
await shot(b,'booking-editing-phone.html','booking-editing-phone.png',390,844,3);
await b.close();
