const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const AU=s=>new URL(s,document.baseURI).href;
const E=s=>String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
const WA="https://wa.me/573185023227?text=",wq=t=>WA+encodeURIComponent(t);
$("#y").textContent=new Date().getFullYear();
const fine=matchMedia("(hover:hover) and (pointer:fine)").matches,rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
/* ---- contenido ---- */
$("#mq").innerHTML=[...SV,...SV].map(s=>`<span>${s.n} <b>·</b></span>`).join("");
const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
$("#sv").innerHTML=SV.map((s,i)=>`<article class="sc2 rv"><button type="button" class="sz" data-i="${i}" data-cursor="Ampliar" aria-label="Ampliar imagen: ${E(s.n)}"><img loading="lazy" alt="${E(s.n)}" src="${s.i}"></button><div class="st"><span class="mono">0${i+1}</span><h3>${s.n}</h3><p>${s.d}</p><a class="cot" data-cursor="WhatsApp" target="_blank" rel="noopener" href="${wq("Hola PUBLICITY, quiero cotizar: "+s.n)}">Cotizar por WhatsApp →</a></div></article>`).join("");
$("#sv").addEventListener("click",e=>{const b=e.target.closest(".sz");if(b){const v=SV[+b.dataset.i];lbOpen(relSv(+b.dataset.i))}});
/* ---- galería de trabajos balanceada + tarjetas vectoriales ---- */
const VT=[{v:1,art:"img/vectores/v1.svg",r:1.2,c:"Tu proyecto",n:"Hagamos el siguiente.",cta:1,q:"Hola PUBLICITY, quiero cotizar un proyecto."},{v:1,art:"img/vectores/v2.svg",r:1.1,c:"Diseño · Impresión",n:"Del boceto a la realidad.",cta:1,q:"Hola PUBLICITY, quiero cotizar diseño e impresión."}];
const GF=[{art:"img/vectores/v3.svg",c:"Multimedia",n:"Y mucho más para tu marca."},{art:"img/vectores/v2.svg",c:"Publicidad",n:"Ideas que se notan."},{art:"img/vectores/v1.svg",c:"Impresión",n:"Listo para producir."}];
const ITEMS=WK.map(w=>({...w,r:Math.max(.3,w.r||.75)}));ITEMS.splice(5,0,VT[0]);ITEMS.splice(14,0,VT[1]);
const wnode=(w,i)=>{const bf=!w.v&&w.r>1.7,r=bf?1.7:w.r,a=document.createElement("a");a.className="mi ri"+(w.v?" mv":"")+(bf?" bf":"");a.dataset.s=[.07,-.05,.1][i%3];a.dataset.cursor=w.v?"Cotizar":"Ver más";a.dataset.r=r;if(w.v){a.target="_blank";a.rel="noopener";a.href=wq(w.q||"Hola PUBLICITY, quiero algo como: "+w.n)}else{a.href="#";a.dataset.n=w.n;a.setAttribute("role","button")}a.style.aspectRatio=(1/r).toFixed(4);
a.innerHTML=(bf?`<i class="bg" style="--b:url('${AU(w.i)}')"></i>`:"")+`<img loading="lazy" alt="${E(w.n)}" src="${w.v?w.art:w.i}"><div><span class="mono">${w.c}</span><h3>${w.n}</h3>${w.cta?'<span class="pill">Cotizar →</span>':""}</div>`;return a};
const WN=ITEMS.map(wnode),WKC=$("#works");let wcols=0;
function placeWorks(){const n=matchMedia("(max-width:900px)").matches?2:3;if(n===wcols)return;wcols=n;WKC.innerHTML="";
const cols=[...Array(n)].map(()=>{const el=document.createElement("div");el.className="mcol";WKC.appendChild(el);return{el,h:0}});
WN.forEach(el=>{const c=cols.reduce((a,b)=>b.h<a.h?b:a);c.el.appendChild(el);c.h+=+el.dataset.r+.045});
const H=Math.max(...cols.map(c=>c.h));
cols.forEach((c,k)=>{const g=H-c.h;let last=c.el.lastElementChild;
if(g>.3){const t=GF[k%GF.length],f=document.createElement("a");f.className="mi mv gf";f.target="_blank";f.rel="noopener";f.href=wq("Hola PUBLICITY, quiero cotizar un proyecto.");f.innerHTML=`<img alt="" src="${t.art}"><div><span class="mono">${t.c}</span><h3>${t.n}</h3><span class="pill">Cotizar →</span></div>`;c.el.appendChild(f);last=f}
last.classList.add("grow")})}
placeWorks();matchMedia("(max-width:900px)").addEventListener("change",placeWorks);
const cats=["Todos",...new Set(CAT.map(n=>n.c))];
$("#chips").innerHTML=cats.map((c,i)=>`<button class="chip${i?"":" on"}" data-c="${E(c)}">${E(c)}</button>`).join("");
const car=(p)=>`<div class="cr"><div class="tr">${p.i.map((s,j)=>`<button type="button" class="sl" style="--b:url('${AU(s)}')" data-o="${j}" aria-label="Ampliar ${E(p.n)}"><img${p.ph?' class="ph"':""} loading="lazy" alt="${E(p.n)}${p.i.length>1?", foto "+(j+1):""}" src="${s}"></button>`).join("")}</div>${p.i.length>1?`<button type="button" class="ar p" aria-label="Foto anterior">‹</button><button type="button" class="ar n" aria-label="Foto siguiente">›</button><div class="dt">${p.i.map((_,j)=>`<i${j?"":' class="on"'}></i>`).join("")}</div>`:""}</div>`;
$("#cat").innerHTML=CAT.map((p,i)=>`<article class="pc rv" data-k="${E(p.c)}" data-i="${i}">${car(p)}<h4>${E(p.n)}</h4><a class="cot" data-cursor="WhatsApp" target="_blank" rel="noopener" href="${wq("Hola PUBLICITY, quiero cotizar: "+p.n)}">Cotizar por WhatsApp →</a></article>`).join("");
$$("#chips .chip").forEach(b=>b.addEventListener("click",()=>{$$("#chips .chip").forEach(x=>x.classList.toggle("on",x===b));$$(".pc").forEach(c=>c.classList.toggle("h",b.dataset.c!=="Todos"&&c.dataset.k!==b.dataset.c))}));
$$(".sp").forEach((s,i)=>s.style.setProperty("--i",i));
/* ---- galería ampliada (solo catálogo) ---- */
const LB=$("#lb"),LI=$("#lb-i");let G={imgs:[],i:0},opener=null;
const lbShow=i=>{G.i=(i+G.imgs.length)%G.imgs.length;LI.src=G.imgs[G.i];$("#lb-s").style.setProperty("--b","url('"+AU(G.imgs[G.i])+"')");LI.alt=G.t+", foto "+(G.i+1);$("#lb-c").textContent=(G.i+1)+" / "+G.imgs.length;if(G.names){const n=G.names[G.i];$("#lb-t").textContent=n;LI.alt=n;$("#lb-w").href=wq("Hola PUBLICITY, quiero algo como: "+n)}$$("#lb-th button").forEach((b,j)=>{const on=j===G.i;b.classList.toggle("on",on);if(on)b.scrollIntoView({block:"nearest",inline:"center"})})};
const lbOpen=o=>{G={imgs:o.imgs,i:0,t:o.t,names:o.names};opener=document.activeElement;$("#lb-k").textContent=o.k;$("#lb-t").textContent=o.t;$("#lb-d").textContent=o.names?"Más referencias de este tipo. Lo personalizamos con tu diseño o tu marca.":"Lo personalizamos con tu diseño o tu marca.";$("#lb-w").href=wq("Hola PUBLICITY, quiero cotizar: "+o.t);$("#lb-w span").textContent="Cotizar por WhatsApp";
$$(".lb-b").forEach(b=>b.hidden=o.imgs.length<2);$("#lb-c").hidden=o.imgs.length<2;LI.style.setProperty("--mw","100%");LB.hidden=false;document.body.classList.add("lbo");buildTh(o);lbShow(o.i||0);$("#lb-x").focus()};
const lbClose=()=>{LB.hidden=true;document.body.classList.remove("lbo");if(opener)opener.focus()};
LB.addEventListener("click",e=>{if(e.target.closest("[data-x]"))lbClose();else if(e.target.closest("#lb-th button"))lbShow(+e.target.closest("#lb-th button").dataset.j);else if(e.target.closest(".lb-b"))lbShow(G.i+(e.target.closest(".lb-b").classList.contains("n")?1:-1))});
addEventListener("keydown",e=>{if(LB.hidden)return;if(e.key==="Escape")lbClose();else if(e.key==="ArrowRight"&&G.imgs.length>1)lbShow(G.i+1);else if(e.key==="ArrowLeft"&&G.imgs.length>1)lbShow(G.i-1)});
document.addEventListener("click",e=>{const a=e.target.closest(".ar");if(a){const t=a.parentNode.querySelector(".tr");t.scrollBy({left:(a.classList.contains("n")?1:-1)*t.clientWidth,behavior:rm?"auto":"smooth"});return}
const s=e.target.closest(".sl");if(s){const p=CAT[+s.closest(".pc").dataset.i];lbOpen(relCat(p,+s.dataset.o))}});
$$(".tr").forEach(t=>t.addEventListener("scroll",()=>{const k=Math.round(t.scrollLeft/t.clientWidth);t.parentNode.querySelectorAll(".dt i").forEach((d,j)=>d.classList.toggle("on",j===k))},{passive:true}));
/* ---- cursor ---- */
const cur=$(".cur"),ring=$(".ring"),lab=ring.firstChild;let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my,px=mx,py=my;
if(fine){document.documentElement.classList.add("has-cur");
addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;cur.style.transform=`translate(${mx}px,${my}px)`;const g=$(".grid-bg");g.style.setProperty("--mx",mx+"px");g.style.setProperty("--my",my+"px")});
addEventListener("mousedown",()=>ring.classList.add("down"));addEventListener("mouseup",()=>ring.classList.remove("down"));
$$("[data-cursor]").forEach(el=>{el.addEventListener("mouseenter",()=>{ring.classList.add("big");lab.textContent=el.dataset.cursor});el.addEventListener("mouseleave",()=>ring.classList.remove("big"))})}
$$(".w,.sp,.pc,.mi").forEach(el=>el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect();el.style.setProperty("--mx",e.clientX-r.left+"px");el.style.setProperty("--my",e.clientY-r.top+"px")}));
if(fine&&!rm)$$("[data-mag]").forEach(b=>{b.addEventListener("mousemove",e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`});b.addEventListener("mouseleave",()=>b.style.transform="")});
const nav=$("#nav");
/* ---- revelado al hacer scroll ---- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);const t=e.target;if(t.style.transitionDelay)setTimeout(()=>t.style.transitionDelay="",1600)}}),{threshold:.08,rootMargin:"0px 0px -6% 0px"});
$$(".rv,.ri,.head").forEach((el,i)=>{if(el.classList.contains("head"))el.classList.add("rv");io.observe(el)});
/* ---- v2: fotos que se adaptan, tilt 3D, decoraciones ---- */
const fitImg=i=>{const r=i.naturalWidth/i.naturalHeight;if(r)i.classList.toggle("cv",r>.8&&r<1.25)};
$$(".sl img").forEach(i=>i.complete?fitImg(i):i.addEventListener("load",()=>fitImg(i)));
$$(".sc2,.pc,.mi").forEach((el,i)=>el.style.transitionDelay=(i%4)*.08+"s");
if(fine&&!rm)$$(".sc2,.pc,.mi").forEach(el=>{el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.setProperty("--ty",(x*7)+"deg");el.style.setProperty("--tx",(-y*7)+"deg")});el.addEventListener("pointerleave",()=>{el.style.setProperty("--tx","0deg");el.style.setProperty("--ty","0deg")})});
const DEC={servicios:[["b","#00b4ee",460,"-10%","6%",.1],["r","#ec0e8f",90,"88%","12%",-.14],["d","#ffd21f",26,"6%","60%",.2]],
trabajos:[["b","#ec0e8f",420,"82%","10%",.12],["r","#00b4ee",110,"4%","30%",-.12],["d","#00b4ee",22,"92%","70%",.22]],
catalogo:[["b","#ffd21f",480,"-8%","20%",.1],["b","#00b4ee",380,"85%","60%",-.1],["r","#ec0e8f",70,"92%","8%",.18]],
personaliza:[["b","#7a4bff",420,"80%","10%",.1],["d","#ec0e8f",28,"5%","25%",.2]],
proceso:[["b","#ec0e8f",400,"-8%","10%",.12],["r","#ffd21f",100,"90%","50%",-.12]]};
Object.entries(DEC).forEach(([id,list])=>{const s=document.getElementById(id);if(!s)return;list.forEach(([k,c,z,l,t,sp])=>{const d=document.createElement("i");d.className="fp "+k;d.dataset.fp=sp;d.style.cssText=`width:${z}px;height:${z}px;left:${l};top:${t};`+(k==="r"?`border-color:${c}`:`background:${c}`);s.prepend(d)})});
const PIMG=$$(".sz img,.mi img"),FPS=$$(".fp");
/* ---- v3: tono por scroll, modo oscuro y vectores de fondo ---- */
const TONES={light:{inicio:["#e3f4ff","#fff1fa"],servicios:["#e4f3ff","#f6faff"],trabajos:["#ffe6f4","#fff8fc"],catalogo:["#fff6cf","#fffdf2"],personaliza:["#e6f0ff","#f7faff"],proceso:["#ece6ff","#f9f7ff"],contacto:["#dff3ff","#fde8f4"]},
dark:{inicio:["#07101f","#1a0d26"],servicios:["#0a1a2e","#0d1220"],trabajos:["#250f2b","#120d1e"],catalogo:["#271f0b","#14110a"],personaliza:["#0f1a35","#0c1020"],proceso:["#1a1236","#0d0b1f"],contacto:["#0a2236","#2a0f2a"]}};
const TS=["inicio","servicios","trabajos","catalogo","personaliza","proceso","contacto"].map(id=>document.getElementById(id));let curT="";
function toneStep(){if(window.__tone)return window.__tone();const y=innerHeight*.5,s=TS.find(s=>{const r=s.getBoundingClientRect();return r.top<=y&&r.bottom>y});if(!s)return;const th=document.documentElement.dataset.theme==="dark"?"dark":"light",key=s.id+th;if(key===curT)return;curT=key;const p=TONES[th][s.id],st=document.documentElement.style;st.setProperty("--t1",p[0]);st.setProperty("--t2",p[1])}
addEventListener("scroll",toneStep,{passive:true});
const root=document.documentElement,tg=$("#tg");
const setTheme=t=>{root.dataset.theme=t;tg.setAttribute("aria-label",t==="dark"?"Cambiar a modo claro":"Cambiar a modo oscuro");try{localStorage.setItem("pt",t)}catch(e){}toneStep()};
setTheme(root.dataset.theme==="dark"?"dark":"light");window.__setTheme=setTheme;
const dots='<g fill="currentColor">'+[18,50,82].flatMap(x=>[18,50,82].map(y=>`<circle cx="${x}" cy="${y}" r="6"/>`)).join("")+"</g>";
const SH={ring:'<circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="3.5"/>',tri:'<polygon points="50,10 92,86 8,86" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round"/>',plus:'<path d="M50 12v76M12 50h76" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',wave:'<path d="M2 50q12.5-34 24.5 0t24.5 0 24.5 0 24.5 0" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>',dots,reg:'<circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" stroke-width="3"/><path d="M50 6v88M6 50h88" stroke="currentColor" stroke-width="3"/>',half:'<path d="M6 70a44 44 0 0 1 88 0z" fill="currentColor" opacity=".4"/>',zig:'<polyline points="4,70 20,30 36,70 52,30 68,70 84,30 96,60" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>',blob:'<circle cx="50" cy="50" r="46" fill="currentColor" opacity=".3"/>'};
let VL=[["ring","c",120,6,.1,.12,.04],["tri","m",90,88,.2,.2,-.06],["plus","y",46,20,.35,.28,.1],["wave","c",170,70,.5,.16,0],["dots","m",90,92,.7,.24,0],["reg","c",80,4,.62,.1,.05],["half","m",130,48,.82,.14,0],["zig","y",120,30,.9,.22,0],["ring","m",60,60,.15,.3,-.05],["tri","c",70,14,.78,.18,.08],["plus","m",36,80,.42,.34,-.1],["blob","y",150,40,.3,.08,0],["wave","m",150,8,.45,.2,0],["dots","c",80,56,.6,.26,0],["ring","y",90,95,.88,.12,.03],["reg","m",64,34,.05,.15,-.04]];
if(innerWidth<700)VL=VL.slice(0,9);
const VE=VL.map(([k,c,z,l,t,s,r])=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 100 100");e.setAttribute("class","vs");e.style.cssText=`width:${z}px;height:${z}px;left:${l}%;color:var(--${c})`;e.innerHTML=SH[k];$("#vbg").appendChild(e);return{e,t,s,r}});
function vbgStep(y,vh){const L=vh+260;VE.forEach((o,i)=>{const t=(((o.t*vh-y*o.s)%L)+L)%L-130;o.e.style.translate=`${Math.sin(y*.002+i)*24}px ${t}px`;o.e.style.rotate=`${y*o.r}deg`})}
vbgStep(scrollY,innerHeight);toneStep();
/* ---- parallax + scroll dinámico ---- */
const md=$("#medal"),gl=$("#gl"),hc=$("#hc"),pb=$("#pb"),hero=$("#inicio"),mq=$("#mq"),bd=$("#bd1");
const P=$$("[data-p]"),X=$$("[data-x]"),MI=$$(".mi");let t0=performance.now(),vs=0,ly=scrollY;
(function loop(now){const y=scrollY,vh=innerHeight,dt=(now-t0)/1000;vs+=((y-ly)-vs)*.1;ly=y;
rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+"px";ring.style.top=ry+"px";
nav.classList.toggle("s",y>30);
pb.style.transform=`scaleX(${y/Math.max(1,document.documentElement.scrollHeight-vh)})`;
if(!rm){px+=(mx-px)*.06;py+=(my-py)*.06;const nx=px/innerWidth-.5,ny=py/innerHeight-.5;
if(y<vh*1.4){P.forEach(e=>e.style.translate=`0 ${y*e.dataset.p}px`);X.forEach(e=>e.style.translate=`${y*e.dataset.x}px 0`);
hc.style.translate=`0 ${y*.22}px`;hc.style.opacity=Math.max(0,1-y/(vh*.8));
md.style.transform=`rotateY(${nx*26}deg) rotateX(${-ny*26}deg) rotateZ(${y*.06}deg) scale(${1+y/vh*.18})`;
gl.style.setProperty("--gx",(50+nx*80)+"%");gl.style.setProperty("--gy",(40+ny*80)+"%")}
const h=mq.scrollWidth/2;mq.style.transform=`translateX(${-((y*.55+now*.035)%h)}px)`;mq.style.animation="none";
const r=bd.parentNode.getBoundingClientRect();bd.style.translate=`${(r.top-vh)*.55}px 0`;
MI.forEach(e=>{const r=e.getBoundingClientRect();if(r.bottom>-100&&r.top<vh+100)e.style.translate=`0 ${Math.max(-14,Math.min(14,(r.top+r.height/2-vh/2)*-e.dataset.s*.3))}px`})
PIMG.forEach(i=>{const r=i.parentNode.getBoundingClientRect();if(r.bottom<-50||r.top>vh+50)return;const p=Math.max(-1,Math.min(1,(r.top+r.height/2-vh/2)/(vh/2+r.height/2)));i.style.translate=`0 ${p*-3}%`});
FPS.forEach(e=>{const r=e.parentNode.getBoundingClientRect();if(r.bottom<-200||r.top>vh+200)return;e.style.translate=`0 ${(r.top+r.height/2-vh/2)*e.dataset.fp*-1}px`})
vbgStep(y,vh)}
requestAnimationFrame(loop)})(t0);

/* ---- v5: las fotos abren galería con más referencias del mismo tipo ---- */
const WG={"Gran formato":"Gran formato y ferias","Stand modular":"Gran formato y ferias","Eventos":"Gran formato y ferias","Avisos":"Avisos y exhibición","Mobiliario":"Avisos y exhibición","Diseño y fabricación":"Avisos y exhibición","Vinilos":"Vinilos y ambientación","Decoración":"Vinilos y ambientación","Empaques":"Empaques y papelería","Papelería":"Empaques y papelería","Diseño gráfico":"Empaques y papelería","Marcación":"Marcación y personalizados","Piezas personalizadas":"Marcación y personalizados"};
const SVG=["Empaques y papelería","Gran formato y ferias","Gran formato y ferias","Gran formato y ferias","Vinilos y ambientación","Avisos y exhibición","Empaques y papelería","Marcación y personalizados","Avisos y exhibición"];
const pack=(first,rest,k,t)=>({imgs:[...first.map(x=>x.i),...rest.map(x=>x.i)],names:[...first.map(x=>x.n),...rest.map(x=>x.n)],t,k,i:0});
function relSv(i){const s=SV[i],g=SVG[i],rest=WK.filter(w=>WG[w.c]===g);return pack([{i:s.i,n:s.n}],rest,"Servicio · "+g,s.n)}
function relCat(p,o){const first=p.i.map(s=>({i:s,n:p.n})),rest=CAT.filter(q=>q!==p&&q.c===p.c).map(q=>({i:q.i[0],n:q.n})),r=pack(first,rest,p.c+" · más referencias",p.n);r.i=o;return r}
function buildTh(o){const t=$("#lb-th");t.innerHTML=o.imgs.length>1?o.imgs.map((s,j)=>`<button type="button" data-j="${j}" aria-label="Ver foto ${j+1}"><img loading="lazy" alt="" src="${s}"></button>`).join(""):""}
WKC.addEventListener("click",e=>{const a=e.target.closest(".mi:not(.mv)");if(!a)return;e.preventDefault();const w=WK.find(x=>x.n===a.dataset.n);if(!w)return;const g=WG[w.c],rest=WK.filter(x=>x!==w&&WG[x.c]===g);lbOpen(pack([w],rest,g,w.n))});
