/* v4 · efectos: pluma, tono continuo, HUD, tema circular, botones */
(function(){
const NS="http://www.w3.org/2000/svg",root=document.documentElement,rmo=matchMedia("(prefers-reduced-motion:reduce)").matches;
const el=(t,a,p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);(p||pen).appendChild(e);return e};
/* ---------- tono continuo ---------- */
const hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)),mix=(a,b,t)=>{const A=hx(a),B=hx(b);return"rgb("+A.map((v,i)=>Math.round(v+(B[i]-v)*t)).join()+")"};
window.__tone=function(){const th=root.dataset.theme==="dark"?"dark":"light",T=TONES[th],y=scrollY+innerHeight*.5,tops=TS.map(s=>s.getBoundingClientRect().top+scrollY);
let i=0;while(i<tops.length-1&&tops[i+1]<=y)i++;const j=Math.min(i+1,TS.length-1),t=i===j?0:Math.min(1,Math.max(0,(y-tops[i])/(tops[j]-tops[i]))),s=t*t*(3-2*t),A=T[TS[i].id],B=T[TS[j].id];
const dk=th==="dark",k=dk?Math.min(1,scrollY/Math.max(1,root.scrollHeight-innerHeight))*.5:0,mc=(c,h,q)=>{const X=c.match(/\d+/g).map(Number),Y=hx(h);return"rgb("+X.map((v,i)=>Math.round(v+(Y[i]-v)*q)).join()+")"};
let c1=mix(A[0],B[0],s),c2=mix(A[1],B[1],s);
if(dk){c1=mc(c1,"#4a5f9e",k);c2=mc(c2,"#4a5f9e",k);root.style.setProperty("--card",mc("rgb(21,28,47)","#4a5f9e",k*.45));root.style.setProperty("--bg2",mc("rgb(22,29,48)","#4a5f9e",k*.45))}else{root.style.removeProperty("--card");root.style.removeProperty("--bg2")}
root.style.setProperty("--t1",c1);root.style.setProperty("--t2",c2);
document.querySelectorAll(".links a,.sd a").forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+(t>.6?TS[j]:TS[i]).id))};
/* ---------- pluma (Bézier con anclas) ---------- */
const pen=document.createElementNS(NS,"svg");pen.id="pen";pen.setAttribute("aria-hidden","true");document.body.prepend(pen);
let P1,P2,L1,L2,AN=[];
function build(){pen.innerHTML="";AN=[];const w=innerWidth,h=innerHeight;
const d=el("defs",{});const g=el("linearGradient",{id:"pg",x1:0,y1:0,x2:1,y2:1},d);[["0","#00b4ee"],[".5","#7a4bff"],["1","#ec0e8f"]].forEach(([o,c])=>el("stop",{offset:o,"stop-color":c},g));
const pts=[[-20,h*.14,w*.28,-h*.12],[w*.56,h*.46,w*.36,h*.52,w*.76,h*.4],[w*1.03,h*.78,w*.92,h*.14]];
const dd=`M${pts[0][0]} ${pts[0][1]}C${pts[0][2]} ${pts[0][3]} ${pts[1][2]} ${pts[1][3]} ${pts[1][0]} ${pts[1][1]}S${pts[2][2]} ${pts[2][3]} ${pts[2][0]} ${pts[2][1]}`;
P1=el("path",{class:"a",d:dd});P2=el("path",{class:"b",d:`M${w*.1} ${h*1.05}C${w*.2} ${h*.6} ${w*.5} ${h*.95} ${w*.62} ${h*.62}S${w*.95} ${h*.5} ${w*1.02} ${h*.2}`});
L1=P1.getTotalLength();L2=P2.getTotalLength();P1.style.strokeDasharray=L1;P2.style.strokeDasharray="2 12";
const H=(x1,y1,x2,y2)=>{el("path",{class:"hd",d:`M${x1} ${y1}L${x2} ${y2}`});};
[[pts[0][0],pts[0][1],pts[0][2],pts[0][3]],[pts[1][0],pts[1][1],pts[1][2],pts[1][3]],[pts[1][0],pts[1][1],pts[1][4],pts[1][5]],[pts[2][0],pts[2][1],pts[2][2],pts[2][3]]].forEach(a=>{H(...a);AN.push({e:el("circle",{class:"an",cx:a[2],cy:a[3],r:5}),t:a===0?0:.0})});
pts.forEach(p=>AN.push({e:el("rect",{class:"an",x:p[0]-6,y:p[1]-6,width:12,height:12}),t:0}));
AN.forEach((a,i)=>a.t=[.05,.3,.3,.8,.02,.3,.82][i])}
build();addEventListener("resize",build);
/* ---------- marcas de corte, regla, HUD ---------- */
["tl","tr","br","bl"].forEach(c=>{const d=document.createElement("i");d.className="cm "+c;document.body.appendChild(d)});
const rl=document.createElement("div");rl.className="rl";rl.innerHTML="<i></i>";document.body.appendChild(rl);
const hud=document.createElement("div");hud.className="hud";hud.innerHTML='<b style="--k:#00b4ee">C <span>0</span></b><b style="--k:#ec0e8f">M <span>0</span></b><b style="--k:#ffd21f">Y <span>0</span></b><b style="--k:#888">K <span>0</span></b><span id="hp"></span>';document.body.appendChild(hud);
const hs=[...hud.querySelectorAll("span")];
/* ---------- bucle de scroll ---------- */
let lastY=-1;
function frame(){const y=scrollY,max=Math.max(1,root.scrollHeight-innerHeight),p=Math.min(1,y/max);
if(y!==lastY){lastY=y;
root.style.setProperty("--sy",(-y*.15)+"px");
const dr=Math.min(1,p*2.2);P1.style.strokeDashoffset=L1*(1-dr);P2.style.strokeDashoffset=-(p*160);
AN.forEach(a=>a.e.classList.toggle("on",p>=a.t));
rl.firstChild.style.top=(p*(innerHeight-2))+"px";
hs[0].textContent=Math.round(100-p*100);hs[1].textContent=Math.round(Math.abs(Math.sin(p*3.4))*100);hs[2].textContent=Math.round(p*100);hs[3].textContent=Math.round(p*35);hs[4].textContent=Math.round(p*100)+"%"}
requestAnimationFrame(frame)}
frame();
/* ---------- tema con revelado circular ---------- */
const tg=document.getElementById("tg");
tg.addEventListener("click",()=>{const n=root.dataset.theme==="dark"?"light":"dark",r=tg.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
if(!document.startViewTransition||rmo){__setTheme(n);return}
const R=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y)),vt=document.startViewTransition(()=>__setTheme(n));
vt.ready.then(()=>root.animate({clipPath:[`circle(0 at ${x}px ${y}px)`,`circle(${R}px at ${x}px ${y}px)`]},{duration:900,easing:"cubic-bezier(.22,1,.36,1)",pseudoElement:"::view-transition-new(root)"}))});
/* ---------- ondas al hacer clic + confeti CMYK ---------- */
const COL=["#00b4ee","#ec0e8f","#ffd21f","#7a4bff"];
document.addEventListener("pointerdown",e=>{const b=e.target.closest(".btn");if(b){const r=b.getBoundingClientRect(),s=document.createElement("span");s.className="rp";s.style.left=e.clientX-r.left+"px";s.style.top=e.clientY-r.top+"px";b.appendChild(s);setTimeout(()=>s.remove(),700)}
if(rmo||!e.target.closest(".btn,.chip,.cot,.wa,.ig"))return;
for(let i=0;i<14;i++){const c=document.createElement("i"),k=i%3,z=6+Math.random()*8,a=Math.random()*Math.PI*2,v=50+Math.random()*90;c.className="cf";c.style.cssText=`width:${z}px;height:${z}px;background:${COL[i%4]};border-radius:${k===0?"50%":k===1?"2px":"0"};${k===2?"clip-path:polygon(50% 0,100% 100%,0 100%);":""}`;document.body.appendChild(c);
c.animate([{transform:`translate(${e.clientX}px,${e.clientY}px) rotate(0) scale(1)`,opacity:1},{transform:`translate(${e.clientX+Math.cos(a)*v}px,${e.clientY+Math.sin(a)*v+40}px) rotate(${Math.random()*540}deg) scale(.2)`,opacity:0}],{duration:700+Math.random()*400,easing:"cubic-bezier(.2,.7,.3,1)"}).onfinish=()=>c.remove()}});
/* luz que sigue al cursor en el contacto */
const cta=document.querySelector(".cta");if(cta)cta.addEventListener("pointermove",e=>{const r=cta.getBoundingClientRect();cta.style.setProperty("--mx",e.clientX-r.left+"px");cta.style.setProperty("--my",e.clientY-r.top+"px")});
/* ---------- botones laterales a las secciones ---------- */
const IC={"inicio": "<path d=\"M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6\"/>", "servicios": "<path d=\"M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5\"/>", "trabajos": "<rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"3\"/><circle cx=\"9\" cy=\"10\" r=\"1.8\"/><path d=\"M21 16l-5-5-8 9\"/>", "catalogo": "<path d=\"M5 8h14l-1 12H6L5 8zM9 8V6a3 3 0 0 1 6 0v2\"/>", "personaliza": "<path d=\"M4 20l1-5L16 4a2.2 2.2 0 0 1 4 4L9 19l-5 1zM14 6l4 4\"/>", "proceso": "<circle cx=\"6\" cy=\"18\" r=\"2.5\"/><circle cx=\"18\" cy=\"6\" r=\"2.5\"/><path d=\"M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5\"/>", "contacto": "<path d=\"M4 5h16v11H9l-5 4V5z\"/>"};
const SD=document.createElement("nav");SD.className="sd";SD.setAttribute("aria-label","Ir a una sección");
SD.innerHTML=[["inicio","Inicio"],["servicios","Servicios"],["trabajos","Trabajos"],["catalogo","Catálogo"],["personaliza","Personaliza"],["proceso","Proceso"],["contacto","Contacto"]].map(([id,n],i)=>`<a href="#${id}" aria-label="${n}"><i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${IC[id]}</svg></i><span>0${i+1} · ${n}</span></a>`).join("");
document.body.appendChild(SD);
/* ---------- formulario de contacto (Web3Forms -> tu correo) ---------- */
const cf=document.getElementById("cf"),fs=document.getElementById("fs");
const okMsg=()=>{fs.className="fs ok";fs.textContent="¡Mensaje enviado! Te responderemos muy pronto."},
erMsg=t=>{fs.className="fs er";fs.innerHTML='No pudimos enviarlo por correo. <a href="'+wq(t)+'" target="_blank" rel="noopener">Envíalo por WhatsApp con tu mensaje ya escrito</a>.'};
if(cf)cf.addEventListener("submit",async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(cf));if(d._honey)return;
const btn=cf.querySelector("button"),txt=btn.textContent,wa=`Hola PUBLICITY, soy ${d.nombre} (${d.correo}). Servicio: ${d.servicio}. ${d.mensaje}`;
btn.disabled=true;btn.textContent="Enviando…";fs.className="fs";fs.textContent="";
try{if(typeof W3K==="undefined"||W3K.startsWith("PEGA"))throw new Error("Falta la clave en js/contacto-config.js");
const r=await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({access_key:W3K,subject:"Nuevo mensaje web: "+d.nombre,from_name:"Web PUBLICITY",name:d.nombre,email:d.correo,servicio:d.servicio,message:d.mensaje,autorizacion_datos:"Aceptada el "+new Date().toISOString()+" (Política de Privacidad v"+((window.LEGAL&&LEGAL.version)||"1.0")+")"})}),j=await r.json();
if(!r.ok||!j.success)throw new Error(j.message||"error");cf.reset();okMsg()}
catch(err){console.warn("Formulario:",err);erMsg(wa)}
btn.disabled=false;btn.textContent=txt});
/* ---------- carga de imágenes: fundido suave y precarga ---------- */
document.querySelectorAll(".sz img,.mi img,.sl img").forEach(i=>{if(i.complete&&i.naturalWidth)return;const p=i.parentNode,d=()=>{i.classList.remove("pl");p.classList.remove("pl")};i.classList.add("pl");p.classList.add("pl");i.addEventListener("load",d,{once:true});i.addEventListener("error",d,{once:true})});
const LZ=[...document.querySelectorAll('img[loading="lazy"]')];let lk=0;
function warm(){for(let n=0;n<5&&lk<LZ.length;n++,lk++)LZ[lk].loading="eager";if(lk<LZ.length)setTimeout(warm,350)}
if(!(navigator.connection&&navigator.connection.saveData))addEventListener("load",()=>setTimeout(warm,500));
__tone();
})();
