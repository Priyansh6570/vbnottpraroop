(function(){
const V=window.VBN=window.VBN||{};
const d=()=>V.D,act=(...a)=>V.act(...a),IC=V.IC,it=V.it;
const SR=id=>d().SR[id];
const img=(id,k)=>`art/${k}/${id}.jpg`;
const epImg=(sid,p)=>sid==='podcast'?img(d().PE[p].img,'16x9'):img(sid,'16x9');
const L=()=>d().L;
const pct=v=>(Math.max(0,Math.min(1,v||0))*100).toFixed(1)+'%';
const firstEp=sid=>{const ps=SR(sid).parts;const i=ps.findIndex(p=>p.eps>0);return i<0?null:[i,0]};
const resume=(A,sid)=>()=>{const k=A.db.hist.find(h=>h.startsWith(sid+'|'));if(k){const [,p,e]=k.split('|');A.play(sid,+p,+e)}else{const f=firstEp(sid);if(f)A.play(sid,f[0],f[1]);else A.say('इस श्रृंखला के एपिसोड आगामी हैं')}};
const saveKey=(t,k)=>t+':'+k;
const toggleSave=(A,key,label)=>()=>A.need('सूची में सहेजने के लिए',()=>{const s=A.db.saved;if(s[key]){delete s[key];A.say('सूची से हटाया गया')}else{s[key]=Date.now();A.say((label||'')+' मेरी सूची में सहेजा गया')}A.up()});
const shareIt=(A,title,o)=>()=>{A.share=Object.assign({title},o||{});A.up()};
const remindIt=(A,key,label)=>()=>A.need('याद दिलाने के लिए',()=>{const r=A.db.remind;r[key]=!r[key];A.say(r[key]?label+' : याद दिलाया जाएगा':'याद दिलाना बंद');A.up()});
const evSt=(A,e)=>{const db=A.db;if(db.live.on&&db.live.ev===e.id)return'live';const dt=db.evDates[e.id];if(!dt)return'tba';return new Date(dt)>new Date()?'next':'past'};
const EVL={live:'लाइव',next:'आगामी',past:'संपन्न',tba:'तिथि शीघ्र'},EVB={live:'live',next:'warn',past:'n',tba:'n'};
const dfmt=s=>{if(!s)return'तिथि शीघ्र';const x=new Date(s);if(isNaN(x))return s;return x.getDate()+'/'+(x.getMonth()+1)+'/'+x.getFullYear()};
V.evSt=evSt;V.dfmt=dfmt;
// item builders
const I={
  sW:(A,id,sub)=>it.wide({go:()=>A.go('/series/'+id),img:img(id,'16x9'),name:SR(id).n,sub:sub===undefined?SR(id).d:sub,orig:true}),
  sP:(A,id)=>it.poster({go:()=>A.go('/series/'+id),img:img(id,'1x1'),name:SR(id).n,orig:true}),
  tapo:A=>it.poster({go:()=>A.go('/series/tapodhara'),upcoming:true,name:'तपोधरा',note:'आगामी शृंखला',orig:true}),
  cP:(A,cs)=>{const ch=V.channels(A).find(c=>c.id===cs.ch)||{};return it.poster({go:()=>A.go('/channel/'+cs.ch),ph:true,phLabel:cs.n+' (उदाहरण)',name:cs.n,creator:true,chName:ch.n})},
  ep:(A,sid,p,e,o)=>{const k=sid+'|'+p+'|'+e,pr=A.db.prog[k];return it.wide(Object.assign({go:()=>A.play(sid,p,e),img:epImg(sid,p),name:V.epTitle(sid,p,e),sub:SR(sid).n+' · '+SR(sid).parts[p].name,orig:true,pct:pr?pct(pr):undefined},o||{}))},
  ev:(A,e)=>{const ed=d().PE[e.ed],st=evSt(A,e),b=V.badge(EVB[st]);return it.wide({go:()=>A.go('/event/'+e.id),img:img(ed.img,'16x9'),name:ed.n,sub:'वीर भारत न्यास का आयोजन · '+dfmt(A.db.evDates[e.id]),badge:EVL[st],bBg:b[0],bCol:b[1],bBd:b[2]})},
  pod:(A,i)=>({go:()=>A.go('/podcast/'+d().PE[i].id),img:img(d().PE[i].img,'1x1'),name:d().PE[i].n,watch:()=>A.play('podcast',i,0),listen:()=>A.play('podcast',i,0,true)}),
  bk:(A,b)=>it.book({go:()=>A.go('/book/'+b.id),img:img(b.img,'books').replace('art/books/','art/books/'),set:!!b.vols,img2:b.vols?`art/books/${b.img2}.jpg`:'',name:b.n,sub:b.vols?'2 खंड':(b.s||'')}),
  sh:(A,id,i)=>({go:()=>A.go('/shorts/'+i),img:img(id,'9x16'),name:SR(id).n}),
  ch:(A,c)=>{const f=!!A.db.follows[c.id];return{go:()=>A.go('/channel/'+c.id),vbn:!!c.vbn,ex:!c.vbn,init:c.n[0],name:c.n,kind:c.k,hasFollow:true,follow:()=>A.need('फ़ॉलो करने के लिए',()=>{A.db.follows[c.id]=!f;A.say(f?'फ़ॉलो हटाया':c.n+' को फ़ॉलो किया');A.up()}),fLabel:f?'फ़ॉलो कर रहे हैं':'फ़ॉलो करें',fBg:f?'var(--gold)':'transparent',fCol:f?'var(--goldInk)':'var(--ink)',fBd:f?'var(--gold)':'var(--outline)'}},
  pr:(A,p)=>({go:()=>A.go('/person/'+p.id),init:p.name[0],name:p.name,sub:p.cat}),
  gu:(A,g)=>({go:()=>A.go('/guest/'+g.id),init:g.name[0],name:g.name,sub:g.role}),
  su:(A,s)=>({go:()=>{A.share={title:'अमृत-सूत्र '+s.n,card:true,text:s.t,sub:'गीता अमृत · वीर भारत न्यास'};A.up()},num:'अमृत-सूत्र '+s.n,text:s.t,sub:'गीता अमृत'}),
  gal:(A,label,i,list)=>({go:()=>{A.lb={items:list,i,n:list.length};A.up()},name:label,hasImg:false,img:''})
};
V.I=I;
const cards=(kind,title,items,o)=>Object.assign({t:'cards',kind,title,items,layout:'row'},o||{});
const sSlide=(A,id,o)=>{const s=SR(id),saved=!!A.db.saved[saveKey('s',id)],rem=!!A.db.remind[id];
  return Object.assign({mode:'poster',img:img(id,'16x9'),img9:d().V9.includes(id)?img(id,'9x16'):'',imgSq:img(id,'1x1'),alt:s.n,eyebrow:'वीर भारत न्यास मूल',orig:true,l1:s.n,meta:s.u,sub:s.d,
    b1L:'देखना शुरू करें',b1Go:resume(A,id),b2L:'श्रृंखला देखें',b2Go:()=>A.go('/series/'+id),
    icons:[{label:saved?'सूची में है':'सूची में जोड़ें',icon:saved?IC.check:IC.plus,go:toggleSave(A,saveKey('s',id),s.n),col:saved?'var(--gold)':'var(--ink)'},{label:'साझा करें',icon:IC.share,go:shareIt(A,s.n)},{label:rem?'याद दिलाना चालू':'नए एपिसोड की याद',icon:IC.bell,go:remindIt(A,id,s.n),col:rem?'var(--gold)':'var(--ink)'}]},o||{})};
const intro=o=>Object.assign({mode:'intro',img:'art/hero/placeholder-hero.jpg',alt:''},o);
const head=(o)=>Object.assign({t:'head',pad:'clamp(18px,2.4vw,40px)',fs:'clamp(30px,3vw,54px)',hasImg:false,img:'',imgW:'clamp(96px,10vw,150px)',imgAr:'1',hasInit:false,init:'',hasBack:false,hasEyebrow:false,eyebrow:'',orig:false,title:'',verified:false,hasTag:false,tag:'',hasSub:false,sub:'',hasActs:false,acts:[]},o,{hasImg:!!o.img,hasInit:!!o.init,hasEyebrow:!!o.eyebrow,hasSub:!!o.sub,hasActs:!!(o.acts&&o.acts.length),hasTag:!!o.tag,ptitle:o.title}),
  H=o=>{const h=head(o);h.title=o.title;h.hTitle=o.title;return Object.assign(h,{title:'',htitle:o.title})};
// head block uses b.title for h1, but block header also uses b.title; avoid duplication by using a separate field
const hd=o=>{const h=head(o);return h};
V.hd=hd;V.cards=cards;
const prose=secs=>({t:'prose',secs:secs.map(s=>({h:s[0]||'',hasH:!!s[0],ps:s.slice(1).map(t=>({t}))}))});
const notice=(t,text,acts,bd)=>({t:'notice',ntitle:t,text,acts:acts||[],bd:bd||'var(--line)'});
const tg=on=>({track:on?'var(--gold)':'var(--bg3)',knob:on?'25px':'3px'});
V.tg=tg;V.prose=prose;V.notice=notice;
const chipsB=(groups,o)=>Object.assign({t:'chips',groups:groups.map(g=>({label:g[0],hasLabel:!!g[0],items:g[1].map(c=>({label:c[0],go:c[2],bg:c[1]?'var(--gold)':'var(--bg2)',col:c[1]?'var(--goldInk)':'var(--ink)',bd:c[1]?'var(--gold)':'var(--line)'}))})),hasSearch:false,q:'',onQ:null,ph:'',hasSort:false,sortVal:'',onSort:null,sortOpts:[]},o||{});
V.chipsB=chipsB;
const filt=(A,k,def)=>A.f[k]===undefined?def:A.f[k];
const setF=(A,k,v)=>()=>{A.f[k]=v;A.up()};
const research=(sid,p,e)=>[['दस्तावेज़',IC.doc],['स्रोत',IC.src],['चित्र',IC.img],['मानचित्र',IC.map]].map((x,i)=>({kind:x[0],icon:x[1],title:'शोध सामग्री '+(i+1)}));
const openRes=(A,r,ctx)=>()=>{A.panel={kind:r.kind+' · '+ctx,title:r.title,img:r.kind==='चित्र'||r.kind==='मानचित्र',ar:r.kind==='मानचित्र'?'4/3':'16/9',imgLabel:'नमूना '+r.kind,ps:['यह '+r.kind+' का नमूना पाठ है। वास्तविक शोध सामग्री जुड़ने पर यहाँ पढ़ी जा सकेगी।','स्रोत, संदर्भ और टिप्पणियाँ इसी पैनल में खुलेंगी, बिना एपिसोड पृष्ठ छोड़े।','नमूना अनुच्छेद 3.']};A.up()};
const resList=(A,sid,p,e,ctx)=>({t:'list',title:'शोध सामग्री',tag:'नमूना',items:research(sid,p,e).map(r=>({go:openRes(A,r,ctx),hasImg:false,img:'',imgW:'0',imgAr:'1',hasIcon:true,icon:r.icon,title:r.title,hasSub:true,sub:r.kind,hasMeta:false,meta:'',unread:false,hasBadge:false,badge:'',bBg:'',bCol:'',bBd:'',acts:[act('पढ़ें',openRes(A,r,ctx))],hasPct:false,pct:'0%',hasNote:false,note:'',bg:'var(--bg2)',bd:'var(--line)'}))});
const li=o=>Object.assign({go:null,hasImg:false,img:'',imgW:'96px',imgAr:'16/9',hasIcon:false,icon:'',title:'',hasSub:false,sub:'',hasMeta:false,meta:'',unread:false,hasBadge:false,badge:'',bBg:'',bCol:'',bBd:'',acts:[],hasPct:false,pct:'0%',hasNote:false,note:'',bg:'var(--bg2)',bd:'var(--line)'},o,{hasImg:!!o.img,hasIcon:!!o.icon,hasSub:!!o.sub,hasMeta:!!o.meta,hasBadge:!!o.badge,hasPct:o.pct!==undefined,hasNote:!!o.note});
V.li=li;
const epPeople=(sid,p,e)=>{const si=d().ORDER.concat(['podcast']).indexOf(sid),P=d().PEOPLE,a=(si*7+p*3+e)%P.length,b=(a+5)%P.length,o=[{who:P[a],role:'व्यक्तित्व',at:.18},{who:P[b],role:'व्यक्तित्व',at:.52}];
  if(sid==='podcast'){d().GUESTS.filter(g=>g.ed===p).forEach((g,i)=>o.push({who:g,role:'अतिथि',at:.08+i*.3,guest:true}))}return o};
V.epPeople=epPeople;
const allEps=()=>{const o=[];d().ORDER.concat(['podcast']).forEach(sid=>SR(sid).parts.forEach((pt,p)=>{for(let e=0;e<pt.eps;e++)o.push([sid,p,e])}));return o};
const terms=sid=>[{w:'संस्कृत शब्द 1',m:'इस शब्द का अर्थ यहाँ आएगा। यह नमूना पाठ है।',a:.1,b:.3},{w:'स्थान का नाम 1',m:'इस स्थान की पृष्ठभूमि यहाँ आएगी। यह नमूना पाठ है।',a:.55,b:.72}];
const epsBlock=(A,sid,p,o)=>{const pt=SR(sid).parts[p];const cur=A.pl&&A.pl.sid===sid&&A.pl.p===p?A.pl.e:-1;
  return Object.assign({t:'eps',items:Array.from({length:pt.eps},(_,e)=>{const k=sid+'|'+p+'|'+e,pr=A.db.prog[k]||0;return{go:()=>A.play(sid,p,e),img:epImg(sid,p),name:V.epTitle(sid,p,e),sub:sid==='geeta-amrit'?'गीता अमृत':pt.name,hasTag:sid!=='geeta-amrit',tag:'नमूना एपिसोड',hasPct:pr>0,pct:pct(pr),bg:e===cur?'var(--bg3)':'var(--bg2)',bd:e===cur?'var(--gold)':'var(--line)'}}),emptyTitle:'इस भाग के एपिसोड आगामी हैं',emptyText:'नए एपिसोड आने पर सूचना पाने के लिए याद दिलाना चालू करें।',emptyAct:'याद दिलाएँ',emptyGo:remindIt(A,sid,SR(sid).n)},o||{})};
const partsNav=(A,sid,sel,onSel)=>{const s=SR(sid),ps=s.parts,db=A.db,avail=ps.filter(p=>p.eps).length;let tot=0,done=0;
  const items=ps.map((p,i)=>{let pp=0;for(let e=0;e<p.eps;e++){const v=db.prog[sid+'|'+i+'|'+e]||0;pp+=v;tot++;done+=v}const on=i===sel;
    return{i:String(i),optLabel:(i+1)+'. '+p.name,num:String(i+1),hasName:!s.numbered,name:p.name,status:p.st==='on'?p.eps+' एपिसोड':p.st==='soon'?'आगामी':'प्रतीक्षित',stCol:p.st==='on'?'var(--gold)':p.st==='soon'?'var(--ink2)':'var(--ink3)',
      pct:p.eps?pct(pp/p.eps):'0%',bg:on?'var(--bg3)':'var(--bg2)',bd:on?'var(--gold)':'var(--line)',sh:on?'0 0 0 1px var(--gold),var(--shadow)':'none',op:p.st==='wait'&&!on?.55:1,go:()=>onSel(i)}});
  const scrollTo=i=>setTimeout(()=>{const c=document.querySelector('[data-parts]');if(c&&c.children[i])c.scrollTo({left:c.children[i].offsetLeft-c.firstElementChild.offsetLeft,behavior:'smooth'})},40);
  const groups=ps.length>20?Array.from({length:Math.ceil(ps.length/12)},(_,g)=>{const a=g*12,b=Math.min(ps.length,a+12);const on=sel>=a&&sel<b;return{label:(a+1)+' से '+b,go:()=>{onSel(a);scrollTo(a)},bg:on?'var(--gold)':'var(--bg2)',col:on?'var(--goldInk)':'var(--ink)',bd:on?'var(--gold)':'var(--line)'}}):[];
  return{t:'parts',title:s.u,tag:s.ex?'नमूना नाम':'',summary:avail+' '+(s.unit||'भाग')+' में एपिसोड उपलब्ध · कुल '+ps.length,totPct:tot?pct(done/tot):'0%',totLabel:'आपकी प्रगति '+(tot?Math.round(done/tot*100):0)+'%',
    hasJump:ps.length>8,jumpVal:String(sel),jump:e=>{const i=+e.target.value;onSel(i);scrollTo(i)},hasGroups:groups.length>0,groups,hasWorld:!!(s.world||sid==='geeta-amrit'),worldLabel:sid==='geeta-amrit'?'गीता माला':'3D संसार',goWorld:()=>A.go(sid==='geeta-amrit'?'/geeta/mala':'/world/'+s.world),items}};
const peopleCards=(A,list,title)=>cards('person',title||'व्यक्तित्व',list.map(x=>I.pr(A,x)),{tag:'नमूना'});
const adB=(A,where)=>A.db.ads.on&&A.db.ads.display?{t:'ad',label:'विज्ञापन',text:'विज्ञापन स्थान'+(where?' · '+where:'')}:null;
const sponsorB=A=>A.db.ads.on?{t:'ad',label:'सौजन्य से',text:'प्रायोजक का नाम'}:null;
const shortsRow=(A,title)=>cards('short',title||'शॉर्ट्स',d().V9.map((id,i)=>I.sh(A,id,i)),{more:()=>A.go('/shorts')});
const sitems=A=>{const db=A.db;const ord=db.seriesOrder.filter(id=>SR(id));return ord};
const banner=o=>Object.assign({t:'banner',label:'',btitle:'',text:'',acts:[],hasBg:false,bg:'',hasImgs:false,imgs:[]},o,{hasBg:!!o.bg,hasImgs:!!(o.imgs&&o.imgs.length)});
V.banner=banner;
const cdUnits=dt=>{const ms=new Date(dt)-new Date();if(!(ms>0))return null;const s=Math.floor(ms/1000);return[{v:String(Math.floor(s/86400)),l:'दिन'},{v:String(Math.floor(s%86400/3600)).padStart(2,'0'),l:'घंटे'},{v:String(Math.floor(s%3600/60)).padStart(2,'0'),l:'मिनट'},{v:String(s%60).padStart(2,'0'),l:'सेकंड'}]};
const countdownB=(A,title)=>{const pm=A.db.premiere,u=pm.date?cdUnits(pm.date):null,rem=!!A.db.remind['premiere'];
  return{t:'countdown',title:title||'प्रीमियर',has:!!u,units:u||[],msg:u?SR(pm.sid).n+' का प्रीमियर':pm.date?SR(pm.sid).n+' का प्रीमियर हो चुका है':SR(pm.sid).n+' : प्रीमियर की तिथि की घोषणा शीघ्र',note:pm.date?'प्रीमियर तिथि : '+dfmt(pm.date):'तिथि एडमिन पैनल के प्रीमियर पृष्ठ से तय होती है।',acts:[act(rem?'याद दिलाना चालू':'याद दिलाएँ',remindIt(A,'premiere','प्रीमियर'),rem?'p':'o'),act('प्रीमियर पृष्ठ',()=>A.go('/premiere'))]}};
// ---- world
const worldB=(A,key,cfg)=>{const w=A.world[key]||(A.world[key]=Object.assign({},cfg.init));const mob=A.mob;
  const set=(k,v)=>{w[k]=v;A.up()};
  const base={t:'world',hint:'घुमाने के लिए खींचें, किसी बिंदु को चुनें',cy:cfg.cy||'52%',tr:A.drag?'none':'transform .6s cubic-bezier(.2,.7,.2,1)',hasPlane:false,hasRing:false,hasSvg:false,hasAxis:false,axisH:'0px',paths:[],pw:'0px',ph:'0px',rr:'0px',bb:'',
    pd:e=>{A.drag={x:e.clientX,y:e.clientY,w:Object.assign({},w)};},pm:e=>{if(!A.drag)return;const dx=e.clientX-A.drag.x,dy=e.clientY-A.drag.y;if(cfg.ring){w.ry=A.drag.w.ry+dx*.4}else{w.rz=A.drag.w.rz+dx*.3;w.rx=Math.max(22,Math.min(72,A.drag.w.rx-dy*.2))}A.up()},
    pu:()=>{if(A.drag){A.drag=null;A.up()}},stopPd:e=>e.stopPropagation(),
    rotL:()=>set(cfg.ring?'ry':'rz',(cfg.ring?w.ry:w.rz)-30),rotR:()=>set(cfg.ring?'ry':'rz',(cfg.ring?w.ry:w.rz)+30),reset:()=>{Object.assign(w,cfg.init);A.up()}};
  return Object.assign(base,cfg.build(w,mob))};
const nodeStyle=(st,on)=>st==='on'?{col:'#F2BC4F',glow:'rgba(242,188,79,.9)',bg:on?'#F8CB68':'#F2BC4F',tc:'#1A1107',bd:'#F8CB68'}:st==='soon'?{col:'rgba(242,188,79,.6)',glow:'rgba(242,188,79,.3)',bg:'var(--bg2)',tc:'var(--ink)',bd:on?'var(--gold)':'var(--outline)'}:{col:'rgba(244,231,207,.3)',glow:'rgba(0,0,0,0)',bg:'var(--bgA7)',tc:'var(--ink3)',bd:on?'var(--gold)':'var(--line)'};
const selPanel=(A,sid,i,kind)=>{const pt=SR(sid).parts[i];return{kind,title:pt.name,sub:pt.st==='on'?pt.eps+' एपिसोड उपलब्ध':pt.st==='soon'?'एपिसोड आगामी हैं':'यह भाग प्रतीक्षा में है, श्रृंखला बढ़ने के साथ जुड़ेगा।',
  eps:Array.from({length:Math.min(pt.eps,6)},(_,e)=>({label:V.epTitle(sid,i,e),go:()=>A.play(sid,i,e)})),acts:[act('भाग पृष्ठ',()=>A.go(`/series/${sid}/part/${i}`),'p'),act('श्रृंखला',()=>A.go('/series/'+sid))]}};

const P={};
V.onEnter=(A,r)=>{if(r.page==='series'){const s=SR(r.p.id);if(s&&A.nav[r.p.id]===undefined){const f=firstEp(r.p.id);A.nav[r.p.id]=s.start!==undefined?s.start:f?f[0]:0}}};
P.launch=(A)=>P.home(A);
P.welcome=A=>{const db=A.db,sel=db.interests;return{label:'स्वागत',blocks:[
  hd({pad:'clamp(28px,4vw,72px)',eyebrow:'वीर भारत न्यास',orig:true,title:'स्वागत है',fs:'clamp(36px,4vw,72px)',sub:'वीर भारत न्यास, संस्कृति विभाग, मध्यप्रदेश शासन का अधिष्ठान है। यह उसका अपना निःशुल्क मंच है, जिस पर न्यास की श्रृंखलाएँ, पॉडकास्ट, लाइव आयोजन और पुस्तकें हैं, और जो सत्यापित रचनाकारों तथा संस्थानों के लिए भी खुला है।'}),
  {t:'form',title:'आपकी रुचियाँ',lead:'चुनी गई रुचियों के अनुसार मुख्य पृष्ठ की पंक्तियों का क्रम बदलेगा। खाते की आवश्यकता नहीं है।',maxW:'860px',cols:'1fr',success:false,notSuccess:true,hasErrBanner:false,errBanner:'',hasSocial:false,social:[],hasPreview:false,pv:{},
    fields:[{label:'जो पसंद हो, चुनें',isChips:true,span:'1 / -1',options:d().INTERESTS.map(x=>{const on=sel.includes(x.l);return{l:x.l,go:()=>{db.interests=on?sel.filter(y=>y!==x.l):sel.concat([x.l]);A.up()},bg:on?'var(--gold)':'var(--bg)',col:on?'var(--goldInk)':'var(--ink)',bd:on?'var(--gold)':'var(--line)'}}),hasErr:false,hasHelp:true,help:sel.length?sel.length+' रुचियाँ चुनी गईं':'कोई रुचि नहीं चुनी'}].map(V.fld),
    submitLabel:'आगे बढ़ें',submit:()=>{A.log('स्वागत : रुचियाँ चुनी गईं');A.dir=1;A.go('/')},secondary:[act('अभी छोड़ें',()=>A.go('/'),'g'),act('खाता बनाएँ',()=>A.go('/signup'),'g')]}]}};
V.fld=f=>Object.assign({label:'',type:'text',value:'',onChange:null,ph:'',bd:'var(--line)',span:'auto',isInput:false,isArea:false,isSelect:false,isChips:false,isCards:false,isCheck:false,isFile:false,isRows:false,options:[],rows:[],toggle:null,checked:false,boxBg:'transparent',text:'',pick:null,fileLabel:'',addRow:null,hasErr:false,err:'',hasHelp:false,help:''},f,{hasErr:!!f.err,hasHelp:!!f.help,bd:f.err?'var(--red)':(f.bd||'var(--line)'),isInput:!(f.isArea||f.isSelect||f.isChips||f.isCards||f.isCheck||f.isFile||f.isRows)});
P.home=A=>{const db=A.db,D=d();
  const hero=[intro({eyebrow:'वीर भारत न्यास प्रस्तुत करता है',l1:'भारत की',l2:'अनंत गाथा',sub:'ऋषियों, विचारकों, वीरों और सृजनकर्ताओं',sub2:'की परंपरा, प्राचीन भारत से आधुनिक युग तक।',b1L:'देखना शुरू करें',b1Go:()=>{const el=document.getElementById('row-orig')||document.querySelector('main section + div section');el&&window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-(A.mob?70:100),behavior:'smooth'})},b2L:'सभी श्रृंखलाएँ देखें',b2Go:()=>A.go('/series')})]
    .concat(['mahadev','geeta-amrit','hamare-ram','sadanira','mahajanpad'].map(id=>sSlide(A,id)));
  const R={
    cont:()=>{if(!db.signed)return null;const ks=db.hist.filter(k=>(db.prog[k]||0)>0&&(db.prog[k]||0)<.98);if(!ks.length)return null;return cards('wide','जहाँ छोड़ा था',ks.map(k=>{const [s,p,e]=k.split('|');return I.ep(A,s,+p,+e)}),{id:'row-cont',more:()=>A.go('/history')})},
    festival:()=>{const f=D.FESTS[db.festival]||D.FESTS[0];return banner({id:'row-festival',title:'आज का पर्व कार्यक्रम',tag:'नमूना',label:'पर्व कार्यक्रम',btitle:f[0],text:SR(f[1]).n+' की विशेष प्रस्तुति। कार्यक्रम एडमिन पैनल से तय होता है।',bg:img(f[1],'16x9'),acts:[act('कार्यक्रम देखें',()=>A.go('/series/'+f[1]),'p')],imgs:[]})},
    geeta:()=>banner({id:'row-geeta',title:'गीता अमृत',label:'न्यास की प्रमुख परियोजना',btitle:'गीता अमृत',text:SR('geeta-amrit').d,bg:img('geeta-amrit','16x9'),acts:[act('जीवन के प्रश्न',()=>A.go('/geeta'),'p'),act('गीता माला',()=>A.go('/geeta/mala')),act('आज का अमृत-सूत्र',()=>A.go('/sutra'))]}),
    orig:()=>cards('poster','न्यास मूल श्रृंखलाएँ',sitems(A).map(id=>I.sP(A,id)).concat([I.tapo(A)]),{id:'row-orig',more:()=>A.go('/series')}),
    new:()=>{const l=['mahadev','mahajanpad','hamare-ram','sadanira','geeta-amrit','podcast'].map(id=>{const f=firstEp(id);return I.ep(A,id,f[0],f[1])});V.published(A).forEach(s=>l.unshift(it.wide({go:()=>A.go('/channel/'+s.ch),ph:true,phLabel:s.title,name:s.title,sub:s.kind,creator:true,chName:(V.channels(A).find(c=>c.id===s.ch)||{}).n||''})));return cards('wide','नए एपिसोड',l,{id:'row-new',tag:'नमूना एपिसोड'})},
    live:()=>cards('wide','लाइव और आगामी आयोजन',D.EV.map(e=>I.ev(A,e)),{id:'row-live',more:()=>A.go('/events')}),
    shorts:()=>Object.assign(shortsRow(A),{id:'row-shorts'}),
    pod:()=>cards('pod','वीर भारत पॉडकास्ट',D.PE.map((_,i)=>I.pod(A,i)),{id:'row-pod',more:()=>A.go('/podcast')}),
    books:()=>cards('book','न्यास के प्रकाशन',D.BK.map(b=>I.bk(A,b)),{id:'row-books',more:()=>A.go('/books')}),
    channels:()=>cards('channel','रचनाकार और संस्थान',V.channels(A).map(c=>I.ch(A,c)),{id:'row-channels',tag:'उदाहरण चैनल',more:()=>A.go('/creators')}),
    collection:()=>banner({id:'row-collection',title:'संग्रह',label:'संग्रह',btitle:'रामनवमी',text:'पूर्वज श्री राम के और हमारे राम',acts:[act('संग्रह देखें',()=>A.go('/series/purvaj-shri-ram-ke'),'p')],imgs:['purvaj-shri-ram-ke','hamare-ram'].map(id=>({img:img(id,'16x9'),alt:SR(id).n,ar:'16/9',go:()=>A.go('/series/'+id)}))}),
    sponsor:()=>sponsorB(A)};
  let order=db.homeRows.filter(r=>r.on).map(r=>r.id);
  const boost=[];db.interests.forEach(l=>{const x=D.INTERESTS.find(y=>y.l===l);x&&x.rows.forEach(id=>{if(!boost.includes(id))boost.push(id)})});
  if(boost.length){const rest=order.filter(id=>!boost.includes(id)&&id!=='cont');order=order.filter(id=>id==='cont').concat(boost.filter(id=>order.includes(id)),rest)}
  const blocks=[];order.forEach((id,i)=>{const b=R[id]&&R[id]();if(b){blocks.push(b);if(i===4)blocks.push(adB(A,'मुख्य पृष्ठ'))}});
  return{label:'मुख्य',hero,blocks}};
P.catalog=A=>{const D=d(),pub=filt(A,'pub','सभी'),sub=filt(A,'subj','सभी'),typ=filt(A,'type','सभी'),srt=filt(A,'sort','rec');
  let list=sitems(A).map(id=>({id,n:SR(id).n,pub:'न्यास मूल',subj:SR(id).subj,type:SR(id).type,vbn:true})).concat(D.CSER.map(c=>({cs:c,n:c.n,pub:(D.CH.find(x=>x.id===c.ch)||{}).type==='संस्थान'?'संस्थान':'रचनाकार',subj:c.subj,type:c.type})));
  list=list.filter(x=>(pub==='सभी'||x.pub===pub)&&(sub==='सभी'||x.subj===sub)&&(typ==='सभी'||x.type===typ));
  if(srt==='name')list.sort((a,b)=>a.n.localeCompare(b.n,'hi'));if(srt==='pub')list.sort((a,b)=>a.pub.localeCompare(b.pub,'hi'));
  const subjects=['सभी'].concat([...new Set(D.ORDER.map(id=>SR(id).subj))]);
  return{label:'श्रृंखलाएँ',hero:D.ORDER.map(id=>sSlide(A,id)),blocks:[
    chipsB([['प्रकाशक',['सभी','न्यास मूल','रचनाकार','संस्थान'].map(x=>[x,pub===x,setF(A,'pub',x)])],['विषय',subjects.map(x=>[x,sub===x,setF(A,'subj',x)])],['प्रकार',['सभी','श्रृंखला','वृत्तचित्र','पॉडकास्ट'].map(x=>[x,typ===x,setF(A,'type',x)])]],{title:'पूरी सूची',hasSort:true,sortVal:srt,sortOpts:[{v:'rec',l:'अनुशंसित क्रम'},{v:'name',l:'नाम के अनुसार'},{v:'pub',l:'प्रकाशक के अनुसार'}],onSort:e=>{A.f.sort=e.target.value;A.up()}}),
    cards('poster','',list.map(x=>x.vbn?I.sP(A,x.id):I.cP(A,x.cs)),{layout:'grid',emptyTitle:'इन फ़िल्टरों से कोई श्रृंखला नहीं मिली',emptyText:'फ़िल्टर बदलकर देखें।',emptyAct:'फ़िल्टर हटाएँ',emptyGo:()=>{A.f.pub=A.f.subj=A.f.type=undefined;A.up()}}),
    cards('poster','आगामी श्रृंखलाएँ',[I.tapo(A)],{noArrows:true}),countdownB(A,'प्रीमियर'),adB(A,'श्रृंखलाएँ')]}};
P.series=(A,p)=>{const id=p.id,s=SR(id);if(!s)return P.notfound(A);const db=A.db;
  if(s.upcoming){const rem=!!db.remind[id];return{label:s.n,canBack:true,hero:[intro({eyebrow:'आगामी शृंखला',orig:true,l1:s.n,sub:s.d,sub2:'इसकी योजना की जानकारी शीघ्र जुड़ेगी।',b1L:rem?'याद दिलाना चालू':'याद दिलाएँ',b1Icon:IC.bell,b1Go:remindIt(A,id,s.n),b2L:'सभी श्रृंखलाएँ',b2Go:()=>A.go('/series')})],blocks:[prose([['परिचय',s.d]])]}}
  const sel=A.nav[id]??0,pt=s.parts[sel];const pick=i=>{A.nav[id]=i;A.up()};
  const blocks=[partsNav(A,id,sel,pick),
    Object.assign(epsBlock(A,id,sel),{title:pt.name,more:()=>A.go(`/series/${id}/part/${sel}`),moreLabel:'भाग पृष्ठ खोलें',emptyTitle:pt.st==='wait'?'यह भाग प्रतीक्षा में है':'इस भाग के एपिसोड आगामी हैं',emptyText:pt.st==='wait'?'श्रृंखला बढ़ने के साथ इस भाग के एपिसोड जुड़ेंगे।':'नए एपिसोड आने पर सूचना पाने के लिए याद दिलाना चालू करें।'}),
    pt.eps?resList(A,id,sel,0,pt.name):null,pt.eps?peopleCards(A,epPeople(id,sel,0).filter(x=>!x.guest).map(x=>x.who)):null,
    id==='podcast'?cards('person','अतिथि',d().GUESTS.filter(g=>g.ed===sel).map(g=>I.gu(A,g)),{tag:'नमूना'}):null,
    sponsorB(A),cards('poster','संबंधित श्रृंखलाएँ',sitems(A).filter(x=>x!==id).slice(0,8).map(x=>I.sP(A,x))),adB(A,'श्रृंखला पृष्ठ')];
  return{label:s.n,canBack:true,hero:[sSlide(A,id)],blocks}};
P.part=(A,p)=>{const id=p.id,s=SR(id);if(!s||!s.parts[+p.p])return P.notfound(A);const i=+p.p,pt=s.parts[i],n=s.parts.length;
  return{label:pt.name,blocks:[hd({hasBack:true,img:img(id,'1x1'),eyebrow:s.n+' · '+(s.unit||'भाग')+' '+(i+1)+' / '+n,orig:true,title:pt.name,tag:s.ex?'नमूना नाम':'',sub:'इस भाग का परिचय यहाँ आएगा। यह नमूना पाठ है।',
      acts:[pt.eps?act('पहला एपिसोड',()=>A.play(id,i,0),'p'):act('याद दिलाएँ',remindIt(A,id,s.n),'p'),i>0?act('पिछला भाग',()=>A.go(`/series/${id}/part/${i-1}`)):null,i<n-1?act('अगला भाग',()=>A.go(`/series/${id}/part/${i+1}`)):null].filter(Boolean)}),
    Object.assign(epsBlock(A,id,i),{title:'एपिसोड'}),pt.eps?resList(A,id,i,0,pt.name):null,pt.eps?peopleCards(A,epPeople(id,i,0).filter(x=>!x.guest).map(x=>x.who)):null,
    {t:'links',title:'इस श्रृंखला के अन्य भाग',items:s.parts.map((x,j)=>({n:String(j+1),label:x.name,go:()=>A.go(`/series/${id}/part/${j}`)})).filter((_,j)=>Math.abs(j-i)<=6&&j!==i)}]}};
P.watch=(A,p)=>{const sid=p.sid,s=SR(sid);if(!s||!s.parts[+p.p])return P.notfound(A);A.ensurePl(sid,+p.p,+p.e);const pl=A.pl,db=A.db,Lx=L(),pi=+p.p,ei=+p.e,pt=s.parts[pi];
  const chs=A.chapters(sid),C=chs.length,pr=pl.t/Lx,tm=terms(sid).find(t=>pr>=t.a&&pr<=t.b),nx=A.nextOf(sid,pi,ei),key=pl.key,saved=!!db.saved[saveKey('e',key)],dl=db.downloads.includes(key);
  const stop=e=>e&&e.stopPropagation&&e.stopPropagation();
  const optG=(label,opts,cur,fn)=>({label,opts:opts.map(o=>({label:o,go:()=>{fn(o);A.up()},bg:o===cur?'#F2BC4F':'transparent',col:o===cur?'#1A1107':'#fff',bd:o===cur?'#F2BC4F':'rgba(255,255,255,.3)'}))});
  const people=epPeople(sid,pi,ei);
  return{label:V.epTitle(sid,pi,ei),noFooter:false,blocks:[
    {t:'player',img:epImg(sid,pi),sq:sid==='podcast'?img(d().PE[pi].img,'1x1'):img(sid,'1x1'),kb:pl.playing?'scale(1.04)':'scale(1)',listen:pl.listen,series:s.n,title:V.epTitle(sid,pi,ei),part:pt.name,
      hasTerm:!!tm&&!pl.ad,term:tm?tm.w:'',termMeaning:tm?tm.m:'',termOpen:!!tm&&pl.term,openTerm:e=>{stop(e);pl.term=true;pl.playing=false;A.up()},closeTerm:e=>{stop(e);pl.term=false;A.up()},stop,
      paused:!pl.playing&&!pl.ad&&pl.auto===null,toggle:e=>{stop(e);if(pl.ad)return;pl.playing=!pl.playing;pl.term=false;A.up()},seek:e=>{stop(e);const r=e.currentTarget.getBoundingClientRect();A.setT((e.clientX-r.left)/r.width*Lx);pl.lastCh=Math.floor(pl.t/Lx*C)},
      pct:pct(pr),ticks:chs.slice(1).map((c,i)=>({left:((i+1)/C*100).toFixed(2)+'%',label:c,col:'#F8CB68'})),ppIcon:pl.playing?IC.pause:IC.play,
      back10:e=>{stop(e);A.setT(pl.t-10)},fwd10:e=>{stop(e);A.setT(pl.t+10)},time:V.fmt(pl.t),toggleListen:e=>{stop(e);pl.listen=!pl.listen;A.up()},lCol:pl.listen?'#F2BC4F':'#fff',
      toggleMenu:e=>{stop(e);pl.menu=!pl.menu;A.up()},menu:pl.menu,menuGroups:[optG('गुणवत्ता',['स्वतः','1080p','720p','480p'],pl.quality,v=>pl.quality=v),optG('उपशीर्षक',['बंद','हिन्दी'],pl.subs,v=>pl.subs=v),optG('गति',['0.75x','1x','1.25x','1.5x','2x'],pl.speed+'x',v=>pl.speed=parseFloat(v))],
      fs:e=>{stop(e);const el=A.c.stageRef.current;if(document.fullscreenElement)document.exitFullscreen();else el&&el.requestFullscreen&&el.requestFullscreen()},
      hasSubs:pl.subs==='हिन्दी'&&pl.playing&&!pl.ad,subLine:'उपशीर्षक का नमूना पाठ',ad:!!pl.ad,adText:pl.ad?(pl.ad.kind==='pre'?'एपिसोड से पहले विज्ञापन':'अध्याय विराम पर विज्ञापन'):'',
      skipLabel:pl.ad&&pl.ad.left>0?Math.ceil(pl.ad.left)+' सेकंड में छोड़ें':'विज्ञापन छोड़ें',skipAd:e=>{stop(e);if(pl.ad&&pl.ad.left<=0){if(pl.ad.kind==='pre')A.adSeen[key]=1;pl.ad=null;pl.playing=true;A.up()}},
      auto:pl.auto!==null,autoN:String(Math.ceil(pl.auto||0)),nextTitle:nx?V.epTitle(sid,nx[0],nx[1]):'',next:e=>{stop(e);if(nx)A.play(sid,nx[0],nx[1])},cancelAuto:e=>{stop(e);pl.auto=null;A.up()},
      goSeries:()=>A.go('/series/'+sid),goPart:()=>A.go(`/series/${sid}/part/${pi}`),desc:'एपिसोड का परिचय यहाँ आएगा। यह नमूना पाठ है।',hasSponsor:db.ads.on,
      acts:[Object.assign(act(saved?'सहेजा गया':'सहेजें',toggleSave(A,saveKey('e',key),'एपिसोड'),saved?'p':'o'),{icon:saved?IC.check:IC.save}),Object.assign(act('साझा करें',shareIt(A,V.epTitle(sid,pi,ei))),{icon:IC.share}),
        Object.assign(act(dl?'डाउनलोड हुआ':'डाउनलोड',()=>A.need('डाउनलोड के लिए',()=>{if(!db.downloads.includes(key))db.downloads.unshift(key);A.say('डाउनलोड में जोड़ा गया (नमूना)');A.up()}),dl?'p':'o'),{icon:dl?IC.check:IC.down})]},
    {t:'list',title:'अध्याय',lead:'किसी अध्याय पर जाने के लिए चुनें। अध्यायों के बीच विज्ञापन विराम आते हैं, अध्याय के भीतर नहीं।',noState:true,items:chs.map((c,i)=>{const on=pr>=i/C&&pr<(i+1)/C;return li({go:()=>{A.setT(i/C*Lx+1);pl.lastCh=i;pl.playing=true;A.up()},icon:IC.play,title:(i+1)+'. '+c,meta:V.fmt(i/C*Lx),bg:on?'var(--bg3)':'var(--bg2)',bd:on?'var(--gold)':'var(--line)',badge:on?'चल रहा है':'',bBg:V.badge('warn')[0],bCol:V.badge('warn')[1],bBd:V.badge('warn')[2]})})},
    resList(A,sid,pi,ei,V.epTitle(sid,pi,ei)),
    {t:'list',title:'इस एपिसोड में',tag:'नमूना',lead:'व्यक्तित्व और अतिथि, और वे किस क्षण आते हैं।',items:people.map(x=>li({go:()=>A.go((x.guest?'/guest/':'/person/')+x.who.id),icon:IC.user,title:x.who.name,sub:x.guest?x.who.role:x.who.cat,meta:V.fmt(x.at*Lx)+' पर',badge:x.role,bBg:V.badge(x.guest?'warn':'n')[0],bCol:V.badge(x.guest?'warn':'n')[1],bBd:V.badge(x.guest?'warn':'n')[2],
      acts:[act('इस क्षण पर जाएँ',()=>{A.setT(x.at*Lx);pl.playing=true;window.scrollTo({top:0,behavior:'smooth'})}),act('पृष्ठ देखें',()=>A.go((x.guest?'/guest/':'/person/')+x.who.id))]}))},
    nx?cards('wide','अगला एपिसोड',[I.ep(A,sid,nx[0],nx[1])],{noArrows:true}):null,
    cards('poster','संबंधित',sitems(A).filter(x=>x!==sid).slice(0,8).map(x=>I.sP(A,x))),adB(A,'एपिसोड पृष्ठ')]}};
P.geeta=A=>{const D=d(),s=SR('geeta-amrit'),day=new Date().getDate()%D.SUTRA.length;
  return{label:'गीता अमृत',hero:[sSlide(A,'geeta-amrit',{b2L:'गीता माला',b2Go:()=>A.go('/geeta/mala')})],blocks:[
    countdownB(A,'प्रीमियर'),
    {t:'links',title:'जीवन के प्रश्न',lead:'आज के जीवन का कोई प्रश्न चुनें और सीधे उससे जुड़े एपिसोड और श्लोक तक पहुँचें।',items:D.QS.map((q,i)=>({n:String(i+1),label:q,go:()=>A.go('/geeta/q/'+i)}))},
    banner({title:'गीता माला',label:'3D संसार',btitle:'गीता माला',text:'परंपरा की गीताएँ एक माला के रूप में। पहला मनका, श्रीमद्भगवद्गीता, आरंभ से प्रकाशित है।',acts:[act('माला घुमाएँ',()=>A.go('/geeta/mala'),'p')],bg:img('geeta-amrit','16x9')}),
    cards('sutra','आज का अमृत-सूत्र',[I.su(A,D.SUTRA[day])],{noArrows:true,more:()=>A.go('/sutra'),moreLabel:'सभी अमृत-सूत्र'}),
    {t:'links',title:'श्लोक',tag:'नमूना',items:D.SHLOKA.map(x=>({n:String(x.n),label:'श्लोक '+x.n,go:()=>A.go('/shloka/'+(x.n-1))}))},
    Object.assign(epsBlock(A,'geeta-amrit',0),{title:'पहला प्रश्न : '+D.QS[0]})]}};
P.question=(A,p)=>{const i=+p.i,D=d(),q=D.QS[i];if(!q)return P.notfound(A);
  return{label:q,blocks:[hd({hasBack:true,eyebrow:'गीता अमृत · जीवन का प्रश्न '+(i+1),orig:true,title:q,sub:'इस प्रश्न का उत्तर देने वाले सभी एपिसोड और श्लोक।',acts:[i>0?act('पिछला प्रश्न',()=>A.go('/geeta/q/'+(i-1))):null,i<D.QS.length-1?act('अगला प्रश्न',()=>A.go('/geeta/q/'+(i+1))):null].filter(Boolean)}),
    Object.assign(epsBlock(A,'geeta-amrit',i),{title:'एपिसोड'}),{t:'links',title:'श्लोक',tag:'नमूना',items:D.SHLOKA.slice(0,3).map(x=>({n:String(x.n),label:'श्लोक '+x.n,go:()=>A.go('/shloka/'+(x.n-1))}))},
    {t:'links',title:'अन्य प्रश्न',items:D.QS.map((x,j)=>({n:String(j+1),label:x,go:()=>A.go('/geeta/q/'+j)})).filter((_,j)=>j!==i)}]}};
P.mala=A=>{const D=d(),M=D.MALA;const sel=A.sel.mala??0;
  return{label:'गीता माला',blocks:[hd({hasBack:true,eyebrow:'गीता अमृत · 3D संसार',orig:true,title:'गीता माला',sub:'परंपरा की गीताएँ एक माला के रूप में। श्रीमद्भगवद्गीता का पहला मनका प्रकाशित है, शेष मनके आने वाले हैं।'}),
    worldB(A,'mala',{ring:true,init:{ry:0},cy:'50%',build:(w,mob)=>{const R=mob?130:250;return{hasRing:true,rr:R+'px',tf:`rotateX(-14deg) rotateY(${w.ry}deg)`,
      nodes:M.map((m,i)=>{const a=i*360/M.length,lit=i===0,on=i===sel;return{tf:`rotateY(${a}deg) translateZ(${R}px)`,bb:`rotateY(${-a-w.ry}deg) rotateX(14deg)`,label:lit?m:'आगामी गीता',tc:lit?'#F8CB68':'var(--ink3)',fs:lit?'15px':'12px',size:lit?(mob?'44px':'60px'):(mob?'24px':'34px'),
        bead:lit?'radial-gradient(circle at 35% 30%,#FFF1C8,#F2BC4F 45%,#9A6414)':'radial-gradient(circle at 35% 30%,#5a4a36,#2a2017 60%)',glow:lit?'0 0 30px rgba(242,188,79,.8)':on?'0 0 0 2px var(--gold)':'none',go:()=>{A.sel.mala=i;A.up()}}}),
      sel:sel===0?{kind:'प्रकाशित मनका',title:M[0],sub:'गीता अमृत का आरंभ। इसके एपिसोड यहाँ से खुलते हैं।',eps:SR('geeta-amrit').parts.map((p,i)=>p.eps?{label:p.name,go:()=>A.play('geeta-amrit',i,0)}:null).filter(Boolean),acts:[act('गीता अमृत',()=>A.go('/geeta'),'p')]}:{kind:'आगामी मनका',title:'आगामी गीता',sub:'यह मनका श्रृंखला के बढ़ने के साथ प्रकाशित होगा।',eps:[],acts:[act('याद दिलाएँ',remindIt(A,'geeta-amrit','गीता अमृत'),'p')]}}}})]}};
P.shloka=(A,p)=>{const D=d(),i=+p.i,s=D.SHLOKA[i];if(!s)return P.notfound(A);const k=A.shk&&A.shk.i===i?A.shk:(A.shk={i,playing:false,w:-1,n:s.lines.flat().length});let c=0;
  return{label:'श्लोक '+s.n,blocks:[hd({hasBack:true,eyebrow:'गीता अमृत · श्लोक',orig:true,title:'श्लोक '+s.n,tag:'नमूना पाठ',sub:'पाठ सुनें, अर्थ पढ़ें और एपिसोड में उस क्षण पर जाएँ जहाँ इस पर चर्चा होती है।'}),
    {t:'shloka',lines:s.lines.map(l=>({words:l.map(w=>{const on=c++===k.w;return{w,bg:on?'var(--gold)':'transparent',col:on?'var(--goldInk)':'var(--ink)'}})})),meaning:s.m,playIcon:k.playing?IC.pause:IC.play,playLabel:k.playing?'पाठ रोकें':'पाठ सुनें',
      play:()=>{k.playing=!k.playing;if(k.playing&&k.w<0)k.w=0;A.up()},jump:()=>{A.ensurePl('geeta-amrit',0,0);A.pl.t=L()*(.4+i*.05);A.play('geeta-amrit',0,0)}},
    {t:'links',title:'अन्य श्लोक',items:D.SHLOKA.filter(x=>x!==s).map(x=>({n:String(x.n),label:'श्लोक '+x.n,go:()=>A.go('/shloka/'+(x.n-1))}))}]}};
P.sutra=A=>({label:'अमृत-सूत्र संग्रह',blocks:[hd({hasBack:true,eyebrow:'गीता अमृत',orig:true,title:'अमृत-सूत्र संग्रह',sub:'हर एपिसोड का अमृत-सूत्र। कोई भी सूत्र खोलें और उसे खड़े कार्ड के रूप में साझा करें।'}),cards('sutra','',d().SUTRA.map(s=>I.su(A,s)),{layout:'grid',tag:'नमूना'})]});
P.world=(A,p)=>{const w=p.w,D=d();
  if(w==='mahajanpad'){const sid='mahajanpad',ps=SR(sid).parts,sel=A.sel.jp??5;
    return{label:'महाजनपद संसार',blocks:[hd({hasBack:true,eyebrow:'महाजनपद · 3D संसार',orig:true,title:'महाजनपद संसार',sub:'प्राचीन भारत के सोलह महाजनपद। प्रकाशित जनपद अपने एपिसोड खोलते हैं, शेष प्रतीक्षा में हैं।',acts:[act('श्रृंखला पृष्ठ',()=>A.go('/series/'+sid))]}),
      worldB(A,'jp',{init:{rx:55,rz:-8},build:(st,mob)=>({hasPlane:true,pw:mob?'300px':'560px',ph:mob?'330px':'600px',tf:`rotateX(${st.rx}deg) rotateZ(${st.rz}deg)`,bb:`rotateZ(${-st.rz}deg) rotateX(${-st.rx}deg)`,
        nodes:ps.map((pt,i)=>{const ns=nodeStyle(pt.st,i===sel),h=pt.st==='on'?90:pt.st==='soon'?40:14;return Object.assign({x:D.JPXY[i][0]+'%',y:D.JPXY[i][1]+'%',h:h+'px',z:h+'px',label:pt.name,hasSub:true,sub:pt.st==='on'?pt.eps+' एपिसोड':pt.st==='soon'?'आगामी':'प्रतीक्षित',fs:pt.st==='on'?'15px':'13px',go:()=>{A.sel.jp=i;A.up()}},ns)}),sel:selPanel(A,sid,sel,'जनपद')})}),
      {t:'notice',ntitle:'मानचित्र के बारे में',text:'जनपदों की स्थितियाँ अनुमानित हैं और केवल दिशा बताने के लिए हैं।',acts:[],bd:'var(--line)'}]}}
  if(w==='sadanira'){const sid='sadanira',ps=SR(sid).parts,sel=A.sel.sd??0;const ry=k=>16+k*17;
    const nodes=[];ps.forEach((pt,k)=>{const y=ry(k);nodes.push(Object.assign({x:'6%',y:y+'%',h:'30px',z:'30px',label:pt.name,hasSub:true,sub:pt.st==='on'?pt.eps+' एपिसोड':'आगामी',fs:'14px',go:()=>{A.sel.sd=k;A.up()}},nodeStyle(pt.st,k===sel)));
      for(let e=0;e<pt.eps;e++){const x=34+e*24;nodes.push({x:x+'%',y:(y+Math.sin(x/12)*3)+'%',h:'14px',z:'14px',label:'एपिसोड '+(e+1),hasSub:false,sub:'',fs:'12px',col:'#7FC4E8',glow:'rgba(127,196,232,.8)',bg:'var(--bg2)',tc:'var(--ink)',bd:'rgba(127,196,232,.7)',go:()=>A.play(sid,k,e)})}});
    return{label:'सदानीरा संसार',blocks:[hd({hasBack:true,eyebrow:'सदानीरा · 3D संसार',orig:true,title:'सदानीरा संसार',tag:'नमूना नदियाँ',sub:'एक भू-दृश्य पर बहती नदियाँ। हर नदी के एपिसोड उसके मार्ग पर रखे गए हैं।',acts:[act('श्रृंखला पृष्ठ',()=>A.go('/series/'+sid))]}),
      worldB(A,'sd',{init:{rx:52,rz:0},build:(st,mob)=>({hasPlane:true,hasSvg:true,pw:mob?'320px':'620px',ph:mob?'320px':'560px',tf:`rotateX(${st.rx}deg) rotateZ(${st.rz}deg)`,bb:`rotateZ(${-st.rz}deg) rotateX(${-st.rx}deg)`,
        paths:ps.map((pt,k)=>{const y=ry(k);return{d:`M6 ${y} C 30 ${y-7}, 55 ${y+7}, 96 ${y+2}`,col:pt.st==='on'?'#5FA9D6':'rgba(95,169,214,.35)',w:pt.st==='on'?'2.2':'1.4',op:'1'}}),nodes,sel:selPanel(A,sid,sel,'नदी')})})]}}
  if(w==='purvaj'){const sid='purvaj-shri-ram-ke',ps=SR(sid).parts,sel=A.sel.pv??0;
    return{label:'पूर्वज श्री राम के संसार',blocks:[hd({hasBack:true,eyebrow:'पूर्वज श्री राम के · 3D संसार',orig:true,title:'इक्ष्वाकु वंश',tag:'नमूना पीढ़ियाँ',sub:'पीढ़ी दर पीढ़ी ऊपर उठता वंश, जो श्री राम तक पहुँचता है और हमारे राम में आगे बढ़ता है।',acts:[act('श्रृंखला पृष्ठ',()=>A.go('/series/'+sid)),act('हमारे राम',()=>A.go('/series/hamare-ram'),'p')]}),
      worldB(A,'pv',{ring:true,init:{ry:-20},cy:'62%',build:(st,mob)=>{const R=mob?110:220,step=mob?30:44;const nodes=ps.map((pt,i)=>{const a=i*50,y=-i*step,lit=pt.st==='on',on=i===sel;return{tf:`translateY(${y}px) rotateY(${a}deg) translateZ(${R}px)`,bb:`rotateY(${-a-st.ry}deg) rotateX(14deg)`,label:pt.name,tc:lit?'#F8CB68':'var(--ink3)',fs:'13px',size:mob?'22px':'30px',
          bead:lit?'radial-gradient(circle at 35% 30%,#FFF1C8,#F2BC4F 45%,#9A6414)':'radial-gradient(circle at 35% 30%,#5a4a36,#2a2017 60%)',glow:on?'0 0 0 3px var(--gold),0 0 20px rgba(242,188,79,.7)':lit?'0 0 18px rgba(242,188,79,.6)':'none',go:()=>{A.sel.pv=i;A.up()}}});
        const top=-ps.length*step-20;nodes.push({tf:`translateY(${top}px)`,bb:`rotateY(${-st.ry}deg) rotateX(14deg)`,label:'श्री राम : हमारे राम',tc:'#FFF1C8',fs:'15px',size:mob?'40px':'56px',bead:'radial-gradient(circle at 35% 30%,#FFF6DD,#F8CB68 40%,#C98A2A)',glow:'0 0 40px rgba(248,203,104,.9)',go:()=>A.go('/series/hamare-ram')});
        return{hasRing:true,hasAxis:true,axisH:(-top)+'px',rr:R+'px',tf:`rotateX(-14deg) rotateY(${st.ry}deg)`,nodes,sel:selPanel(A,sid,sel,'पीढ़ी')}}})]}}
  return P.notfound(A)};
P.shorts=(A,p)=>{const D=d(),st=+(p.i||0);const ids=D.V9.slice(st).concat(D.V9.slice(0,st));
  return{label:'शॉर्ट्स',noFooter:true,blocks:[hd({pad:'clamp(10px,1.4vw,24px)',fs:'clamp(26px,2.4vw,40px)',eyebrow:'स्वाइप या स्क्रॉल करें',title:'शॉर्ट्स'}),
    {t:'shorts',items:ids.map(id=>{const f=firstEp(id),k=saveKey('s',id),sv=!!A.db.saved[k];return{img:img(id,'9x16'),name:SR(id).n,sub:'वीर भारत न्यास मूल',go:()=>f?A.play(id,f[0],f[1]):A.go('/series/'+id),save:toggleSave(A,k,SR(id).n),saveCol:sv?'var(--gold)':'var(--ink)',share:shareIt(A,SR(id).n+' : शॉर्ट')}})}]}};
P.podcast=A=>{const D=d();return{label:'पॉडकास्ट',hero:[sSlide(A,'podcast',{b1L:'सुनें',b1Go:()=>A.play('podcast',0,0,true),b2L:'संस्करण देखें',b2Go:()=>A.go('/podcast/'+D.PE[0].id)})].concat(D.PE.map((x,i)=>({mode:'poster',img:img(x.img,'16x9'),img9:'',imgSq:img(x.img,'1x1'),alt:x.n,eyebrow:'वीर भारत पॉडकास्ट',orig:true,meta:'संस्करण',sub:x.n+' : आयोजन के अतिथियों से संवाद।',b1L:'सुनें',b1Go:()=>A.play('podcast',i,0,true),b2L:'संस्करण देखें',b2Go:()=>A.go('/podcast/'+x.id),icons:[]}))),
  blocks:[cards('pod','सभी संस्करण',D.PE.map((_,i)=>I.pod(A,i)),{layout:'grid'}),cards('person','अतिथि',D.GUESTS.map(g=>I.gu(A,g)),{tag:'नमूना'}),cards('wide','जिन आयोजनों से संस्करण बने',D.EV.map(e=>I.ev(A,e))),
    cards('poster','रचनाकारों के पॉडकास्ट',D.CSER.filter(c=>c.type==='पॉडकास्ट').map(c=>I.cP(A,c)),{tag:'उदाहरण'}),adB(A,'पॉडकास्ट')]}};
P.edition=(A,p)=>{const D=d(),i=D.PE.findIndex(x=>x.id===p.ed);if(i<0)return P.notfound(A);const x=D.PE[i],mode=filt(A,'edMode','वीडियो'),ev=D.EV.find(e=>e.ed===i);
  return{label:x.n,canBack:true,hero:[{mode:'poster',img:img(x.img,'16x9'),img9:'',imgSq:img(x.img,'1x1'),alt:x.n,eyebrow:'वीर भारत पॉडकास्ट · संस्करण',orig:true,meta:'आयोजन : '+x.n,sub:'आयोजन के अतिथियों से गहन संवाद, वीडियो और ऑडियो दोनों में।',b1L:mode==='ऑडियो'?'सुनें':'देखें',b1Go:()=>A.play('podcast',i,0,mode==='ऑडियो'),b2L:'आयोजन पृष्ठ',b2Go:()=>A.go('/event/'+ev.id),icons:[{label:'साझा करें',icon:IC.share,go:shareIt(A,x.n)}]}],
    blocks:[chipsB([['',['वीडियो','ऑडियो'].map(m=>[m,mode===m,setF(A,'edMode',m)])]],{title:'संवाद'}),
      Object.assign(epsBlock(A,'podcast',i),{items:epsBlock(A,'podcast',i).items.map((e,k)=>Object.assign(e,{go:()=>A.play('podcast',i,k,mode==='ऑडियो'),tag:mode==='ऑडियो'?'ऑडियो · नमूना':'वीडियो · नमूना'}))}),
      cards('person','अतिथि',D.GUESTS.filter(g=>g.ed===i).map(g=>I.gu(A,g)),{tag:'नमूना'}),
      cards('short','छोटी क्लिप',[1,2,3,4].map(n=>({go:()=>A.go('/shorts/4'),img:'art/9x16/podcast.jpg',name:'क्लिप '+n})),{tag:'नमूना'})]}};
P.guest=(A,p)=>{const D=d(),g=D.GUESTS.find(x=>x.id===p.id);if(!g)return P.notfound(A);
  return{label:g.name,blocks:[hd({hasBack:true,init:g.name[0],imgAr:'3/4',eyebrow:'अतिथि · '+g.role,title:g.name,tag:'नमूना',sub:'अतिथि का परिचय यहाँ आएगा। यह नमूना पाठ है।'}),
    {t:'list',title:'सभी संवाद',items:Array.from({length:SR('podcast').parts[g.ed].eps},(_,e)=>li({go:()=>A.play('podcast',g.ed,e),img:img(D.PE[g.ed].img,'16x9'),title:V.epTitle('podcast',g.ed,e),sub:'वीर भारत पॉडकास्ट · '+D.PE[g.ed].n,acts:[act('देखें',()=>A.play('podcast',g.ed,e),'p'),act('सुनें',()=>A.play('podcast',g.ed,e,true))]}))},
    cards('person','अन्य अतिथि',D.GUESTS.filter(x=>x!==g).map(x=>I.gu(A,x)))]}};
P.events=A=>{const D=d(),db=A.db,view=A.tl.view,f=A.tl.f;
  let evs=D.EV.map(e=>({e,st:evSt(A,e),dt:db.evDates[e.id]||''}));evs=evs.filter(x=>f==='all'||(f==='next'?(x.st==='next'||x.st==='live'||x.st==='tba'):x.st==='past'));
  evs.sort((a,b)=>(a.dt||'9999').localeCompare(b.dt||'9999'));
  const base=A.cal||(A.cal=(()=>{const t=new Date();return{y:t.getFullYear(),m:t.getMonth()}})());const M=['जनवरी','फ़रवरी','मार्च','अप्रैल','मई','जून','जुलाई','अगस्त','सितंबर','अक्टूबर','नवंबर','दिसंबर'];
  const first=new Date(base.y,base.m,1),start=(first.getDay()+6)%7,dim=new Date(base.y,base.m+1,0).getDate(),today=new Date();
  const days=Array.from({length:42},(_,k)=>{const n=k-start+1,inM=n>=1&&n<=dim;const ds=inM?`${base.y}-${String(base.m+1).padStart(2,'0')}-${String(n).padStart(2,'0')}`:'';const isT=inM&&today.getFullYear()===base.y&&today.getMonth()===base.m&&today.getDate()===n;
    return{n:inM?String(n):'',op:inM?1:.35,bg:isT?'var(--bg3)':'var(--bg)',bd:isT?'var(--gold)':'var(--line)',evs:inM?D.EV.filter(e=>(db.evDates[e.id]||'').slice(0,10)===ds).map(e=>({label:D.PE[e.ed].n,go:()=>A.go('/event/'+e.id)})):[]}});
  const b=k=>V.badge(EVB[k]);
  return{label:'आयोजन',blocks:[hd({eyebrow:'वीर भारत न्यास',orig:true,title:'आयोजन',sub:'न्यास के सभी आयोजन। हर आयोजन का स्थायी पृष्ठ, उसके चित्र, वीडियो, पॉडकास्ट और रिकॉर्डिंग के साथ। तिथियाँ एडमिन पैनल से जुड़ती हैं।'}),
    {t:'tabs',items:[['list','समयरेखा'],['cal','कैलेंडर']].map(x=>({label:x[1],go:()=>{A.tl.view=x[0];A.up()},col:view===x[0]?'var(--gold)':'var(--ink)',ul:view===x[0]?'var(--gold)':'transparent'}))},
    view==='list'?chipsB([['',[['all','सभी'],['next','आगामी'],['past','संपन्न']].map(x=>[x[1],f===x[0],()=>{A.tl.f=x[0];A.up()}])]]):null,
    view==='list'?(evs.length?{t:'timeline',items:evs.map(x=>({date:dfmt(x.dt),title:D.PE[x.e.ed].n,sub:'वीर भारत न्यास का आयोजन',img:img(D.PE[x.e.ed].img,'16x9'),dot:x.st==='live'?'#C8361F':x.st==='next'?'var(--gold)':'var(--ink3)',badge:EVL[x.st],bBg:b(x.st)[0],bCol:b(x.st)[1],bBd:b(x.st)[2],go:()=>A.go('/event/'+x.e.id)}))}:{t:'state',empty:true,loading:false,error:false,skel:[],skAr:'1',emptyTitle:'इस फ़िल्टर में कोई आयोजन नहीं',emptyText:'दूसरा फ़िल्टर चुनें।',hasEmptyAct:false,emptyAct:'',emptyGo:null,retry:null}):
    {t:'calendar',month:M[base.m]+' '+base.y,prev:()=>{base.m--;if(base.m<0){base.m=11;base.y--}A.up()},next:()=>{base.m++;if(base.m>11){base.m=0;base.y++}A.up()},wd:['सोम','मंगल','बुध','गुरु','शुक्र','शनि','रवि'].map(t=>({t})),days},
    view==='cal'&&D.EV.some(e=>!db.evDates[e.id])?notice('कुछ आयोजनों की तिथि अभी घोषित नहीं है',D.EV.filter(e=>!db.evDates[e.id]).map(e=>D.PE[e.ed].n).join(', ')+'। तिथि घोषित होते ही ये कैलेंडर पर दिखेंगे।',[act('एडमिन : आयोजन',()=>A.go('/admin/events'))]):null]}};
P.event=(A,p)=>{const D=d(),e=D.EV.find(x=>x.id===p.id);if(!e)return P.notfound(A);const ed=D.PE[e.ed],st=evSt(A,e),photos=[1,2,3,4,5,6].map(n=>'चित्र '+n);
  return{label:ed.n,canBack:true,hero:[{mode:'poster',img:img(ed.img,'16x9'),img9:'',imgSq:img(ed.img,'1x1'),alt:ed.n,eyebrow:'वीर भारत न्यास का आयोजन',orig:true,meta:EVL[st]+' · '+dfmt(A.db.evDates[e.id]),sub:'पोस्टर, चित्र, वीडियो, पॉडकास्ट और '+(st==='past'?'रिकॉर्डिंग':'लाइव प्रसारण')+' एक ही पृष्ठ पर।',
    b1L:st==='live'?'लाइव देखें':st==='past'?'रिकॉर्डिंग देखें':'पॉडकास्ट सुनें',b1Go:()=>st==='live'?A.go('/live'):st==='past'?A.play('podcast',e.ed,0):A.play('podcast',e.ed,0,true),b2L:'',icons:[{label:'साझा करें',icon:IC.share,go:shareIt(A,ed.n)},{label:'याद दिलाएँ',icon:IC.bell,go:remindIt(A,e.id,ed.n),col:A.db.remind[e.id]?'var(--gold)':'var(--ink)'}]}],
    blocks:[st==='live'?notice('यह आयोजन अभी लाइव है','लाइव पृष्ठ पर प्रसारण, कार्यक्रम सूची और विज्ञापन विराम देखें।',[act('लाइव देखें',()=>A.go('/live'),'p')],'#C8361F'):null,
      cards('wide','पोस्टर',[it.wide({go:()=>{A.panel={kind:'पोस्टर',title:ed.n,img:true,src:img(ed.img,'16x9'),ar:'16/9',ps:[]};A.up()},img:img(ed.img,'16x9'),name:ed.n})],{noArrows:true}),
      cards('gallery','चित्र दीर्घा',photos.map((x,i)=>I.gal(A,x,i,photos)),{tag:'नमूना'}),
      cards('wide','वीडियो',[1,2,3].map(n=>it.wide({go:()=>A.play('podcast',e.ed,Math.min(n-1,2)),ph:true,phLabel:'वीडियो '+n,name:'वीडियो '+n})),{tag:'नमूना'}),
      cards('pod','पॉडकास्ट',[I.pod(A,e.ed)],{noArrows:true}),
      st==='past'?cards('wide','रिकॉर्डिंग',[I.ep(A,'podcast',e.ed,0,{name:ed.n+' : पूर्ण रिकॉर्डिंग'})],{noArrows:true}):null,adB(A,'आयोजन पृष्ठ')]}};
const ytEmbed=u=>{if(!u)return'';const m=u.match(/(?:v=|youtu\.be\/|\/live\/|\/embed\/)([\w-]{6,})/);return m?`https://www.youtube.com/embed/${m[1]}?autoplay=1&mute=1`:''};
V.ytEmbed=ytEmbed;
P.live=A=>{const D=d(),db=A.db,lv=db.live,e=D.EV.find(x=>x.id===lv.ev)||D.EV[0],ed=D.PE[e.ed];const nextEv=D.EV.filter(x=>evSt(A,x)==='next').sort((a,b)=>db.evDates[a.id].localeCompare(db.evDates[b.id]))[0];
  const emb=lv.on?ytEmbed(lv.url):'';
  const stageTitle=lv.on?(emb?'':'प्रसारण का लिंक जोड़ा जाना शेष है'):lv.done?ed.n+' : रिकॉर्डिंग उपलब्ध':'अभी कोई लाइव प्रसारण नहीं';
  const stageText=lv.on?'एडमिन पैनल के लाइव नियंत्रण में YouTube Live लिंक जोड़ें।':lv.done?'प्रसारण समाप्त हुआ। रिकॉर्डिंग आयोजन पृष्ठ पर है।':nextEv?'अगला आयोजन : '+D.PE[nextEv.ed].n+', '+dfmt(db.evDates[nextEv.id]):'अगले आयोजन की तिथि घोषित होते ही यहाँ दिखेगी।';
  return{label:'लाइव',hero:[{mode:'poster',img:img(ed.img,'16x9'),img9:'',imgSq:img(ed.img,'1x1'),alt:ed.n,eyebrow:lv.on?'अभी लाइव':'वीर भारत न्यास लाइव',orig:true,meta:lv.on?ed.n:'',sub:lv.on?ed.n+' का सीधा प्रसारण।':'न्यास के अपने आयोजन यहाँ सीधे प्रसारित होते हैं, फिर स्थायी आयोजन पृष्ठ पर रहते हैं।',b1L:lv.on?'प्रसारण देखें':'आयोजन देखें',b1Go:()=>{if(lv.on){const el=document.getElementById('b0');el&&window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-90,behavior:'smooth'})}else A.go('/events')},b2L:'आयोजन पृष्ठ',b2Go:()=>A.go('/event/'+e.id),icons:[]}],
    blocks:[{t:'live',isOn:lv.on,hasEmbed:!!emb,embed:emb,noEmbed:!emb,img:img(ed.img,'16x9'),stageTitle,stageText,adBreak:lv.on&&lv.ad,sched:['सत्र 1','सत्र 2','सत्र 3','सत्र 4'].map((s,i)=>({t:'भाग '+(i+1),label:s,bg:lv.on&&i===1?'var(--bg3)':'transparent'}))},
      lv.done?cards('wide','रिकॉर्डिंग',[I.ep(A,'podcast',e.ed,0,{name:ed.n+' : पूर्ण रिकॉर्डिंग'})],{noArrows:true}):null,
      cards('wide','आयोजन',D.EV.map(x=>I.ev(A,x)),{more:()=>A.go('/events')}),cards('pod','आयोजनों के पॉडकास्ट',D.PE.map((_,i)=>I.pod(A,i)))]}};
P.premiere=A=>{const pm=A.db.premiere,s=SR(pm.sid);return{label:'प्रीमियर',blocks:[hd({hasBack:true,eyebrow:'प्रीमियर',orig:true,title:s.n,sub:s.d}),countdownB(A,'उलटी गिनती'),
  cards('wide','टीज़र',[it.wide({go:()=>{const f=firstEp(pm.sid);f&&A.play(pm.sid,f[0],f[1])},img:img(pm.sid,'16x9'),name:s.n+' : टीज़र',sub:'नमूना टीज़र',orig:true})],{noArrows:true})]}};
P.books=A=>{const D=d(),sub=filt(A,'bsub','सभी'),subs=['सभी'].concat([...new Set(D.BK.map(b=>b.subj))]);
  return{label:'पुस्तकें',hero:D.BK.map(b=>({mode:'cover',img:`art/books/${b.img}.jpg`,ar:b.ar,alt:b.n,eyebrow:'वीर भारत न्यास प्रकाशन',orig:true,l1:b.n,sub:b.s||'',meta:b.vols?b.vols.map(v=>v.v).join(', '):'',b1L:'पुस्तक देखें',b1Icon:IC.arrow,b1Go:()=>A.go('/book/'+b.id),b2L:'',icons:[]})),
    blocks:[chipsB([['विषय',subs.map(x=>[x,sub===x,setF(A,'bsub',x)])]],{title:'पुस्तकालय'}),cards('book','',D.BK.filter(b=>sub==='सभी'||b.subj===sub).map(b=>I.bk(A,b)),{layout:'grid'}),
      cards('book','संस्थानों के प्रकाशन',[1,2,3].map(n=>it.book({go:()=>A.go('/channel/ex2'),ph:true,phLabel:'उदाहरण',name:'उदाहरण प्रकाशन '+n,sub:'उदाहरण संस्थान 1'})),{tag:'उदाहरण'}),adB(A,'पुस्तकालय')]}};
P.book=(A,p)=>{const D=d(),b=D.BK.find(x=>x.id===p.id);if(!b)return P.notfound(A);
  const sample=()=>{A.panel={kind:'नमूना पठन',title:b.n,img:true,src:`art/books/${b.img}.jpg`,ar:String(b.ar),fs:'18px',ps:['पुस्तक का नमूना पाठ, पृष्ठ 1।','यह पठन दृश्य दिखाता है कि पुस्तक मंच के भीतर कैसे पढ़ी जा सकेगी। वास्तविक पाठ जुड़ने पर यहाँ आएगा।','नमूना पाठ, पृष्ठ 2।','नमूना पाठ, पृष्ठ 3।']};A.up()};
  return{label:b.n,canBack:true,hero:[{mode:'cover',img:`art/books/${b.img}.jpg`,ar:b.ar,alt:b.n,eyebrow:'वीर भारत न्यास प्रकाशन',orig:true,l1:b.n,sub:b.s||'',meta:b.vols?b.vols.map(v=>v.v).join(', '):'',b1L:'नमूना पढ़ें',b1Icon:IC.arrow,b1Go:sample,b2L:'प्रति प्राप्त करें',b2Go:()=>A.say('प्रति प्राप्त करने का तरीका अभी तय होना है'),icons:[{label:'साझा करें',icon:IC.share,go:shareIt(A,b.n)}]}],
    blocks:[prose([['परिचय','पुस्तक का विवरण यहाँ आएगा। यह नमूना पाठ है।']]),b.vols?cards('book','इस संग्रह के खंड',b.vols.map(v=>it.book({go:sample,img:`art/books/${v.img}.jpg`,name:b.n,sub:v.v+' · '+v.r})),{noArrows:true}):null,
      {t:'list',title:'सहयोगी संस्था',tag:'नमूना',noState:true,items:[li({icon:IC.src,title:'सहयोगी संस्था का नाम',sub:'सह-प्रकाशक संस्थाएँ यहाँ उनकी पुस्तकों के साथ दिखेंगी।'})]},
      b.rel.length?cards('poster','संबंधित श्रृंखलाएँ',b.rel.map(id=>I.sP(A,id)),{noArrows:true}):null,
      notice('नमूना पठन','पुस्तक के कुछ पृष्ठ पैनल में पढ़ें, पृष्ठ छोड़े बिना।',[act('नमूना पढ़ें',sample,'p')]),
      cards('book','अन्य पुस्तकें',D.BK.filter(x=>x!==b).map(x=>I.bk(A,x)))]}};
P.people=A=>{const D=d(),cat=filt(A,'pcat','सभी'),q=(A.f.pq||'').trim(),let_=filt(A,'plet','');
  const letters=[...new Set(D.PEOPLE.map(p=>p.name[0]))];
  const list=D.PEOPLE.filter(p=>(cat==='सभी'||p.cat===cat)&&(!q||p.name.includes(q))&&(!let_||p.name[0]===let_));
  return{label:'व्यक्तित्व',blocks:[hd({eyebrow:'वीर भारत न्यास',orig:true,title:'व्यक्तित्व',sub:'ऋषि, संत, योद्धा, कवि, विचारक और वैज्ञानिक। हर व्यक्तित्व का अपना पृष्ठ, चित्रों, लघु वीडियो, परिचय और उन एपिसोड के साथ जिनमें वे आते हैं।',tag:'नमूना नाम'}),
    chipsB([['श्रेणी',['सभी'].concat(D.CAT).map(x=>[x,cat===x,setF(A,'pcat',x)])],['अक्षर',[['सभी',!let_,setF(A,'plet','')]].concat(letters.map(l=>[l,let_===l,setF(A,'plet',l)]))]],{hasSearch:true,q:A.f.pq||'',onQ:e=>{A.f.pq=e.target.value;A.up()},ph:'नाम से खोजें'}),
    cards('person','',list.map(p=>I.pr(A,p)),{layout:'grid',emptyTitle:'कोई व्यक्तित्व नहीं मिला',emptyText:'खोज या फ़िल्टर बदलें।'})]}};
P.person=(A,p)=>{const D=d(),x=D.PEOPLE.find(y=>y.id===p.id);if(!x)return P.notfound(A);const imgs=['चित्र 1','चित्र 2','चित्र 3','चित्र 4'];
  const eps=allEps().map(([s,pp,e])=>({s,pp,e,m:epPeople(s,pp,e).find(z=>z.who===x)})).filter(z=>z.m).slice(0,8);
  return{label:x.name,blocks:[hd({hasBack:true,init:x.name[0],imgAr:'3/4',eyebrow:'व्यक्तित्व · '+x.cat,title:x.name,tag:'नमूना',sub:'व्यक्तित्व का संक्षिप्त परिचय यहाँ आएगा। यह नमूना पाठ है।',acts:[act('साझा करें',shareIt(A,x.name))]}),
    cards('gallery','चित्र',imgs.map((t,i)=>I.gal(A,t,i,imgs)),{tag:'नमूना'}),
    cards('short','लघु वीडियो',[1,2,3].map(n=>({go:()=>A.go('/shorts'),img:'art/9x16/'+D.V9[n]+'.jpg',name:'लघु वीडियो '+n})),{tag:'नमूना'}),
    {t:'list',title:'संबंधित एपिसोड',lead:'इन एपिसोड में यह व्यक्तित्व आता है, और किस क्षण।',items:eps.map(z=>li({go:()=>{A.ensurePl(z.s,z.pp,z.e);A.pl.t=z.m.at*L();A.play(z.s,z.pp,z.e)},img:epImg(z.s,z.pp),title:V.epTitle(z.s,z.pp,z.e),sub:SR(z.s).n+' · '+SR(z.s).parts[z.pp].name,meta:V.fmt(z.m.at*L())+' पर',acts:[act('इस क्षण से देखें',()=>{A.ensurePl(z.s,z.pp,z.e);A.pl.t=z.m.at*L();A.play(z.s,z.pp,z.e)},'p')]}))},
    cards('book','संबंधित पुस्तकें',[],{emptyTitle:'अभी कोई संबंधित पुस्तक नहीं',emptyText:'संबंधित पुस्तकें जुड़ने पर यहाँ दिखेंगी।'})]}};
P.creators=A=>{const ty=filt(A,'cty','सभी'),list=V.channels(A).filter(c=>ty==='सभी'||c.type===ty);
  return{label:'रचनाकार',blocks:[hd({eyebrow:'सत्यापित',title:'रचनाकार और संस्थान',sub:'सत्यापित रचनाकार, न्यास के फ़ेलो और संस्थान अपने चैनलों पर प्रकाशित करते हैं। हर रचना प्रकाशन से पहले न्यास की टीम द्वारा जाँची जाती है।',acts:[act('रचनाकार के रूप में जुड़ें',()=>A.go('/studio/register'),'p')]}),
    chipsB([['प्रकार',['सभी','न्यास','रचनाकार','संस्थान'].map(x=>[x,ty===x,setF(A,'cty',x)])]]),cards('channel','',list.map(c=>I.ch(A,c)),{layout:'grid'})]}};
P.channel=(A,p)=>{const D=d(),c=V.channels(A).find(x=>x.id===p.id);if(!c)return P.notfound(A);const f=!!A.db.follows[c.id],pubs=V.published(A).filter(s=>s.ch===c.id||(c.id==='me'&&s.ch==='me'));
  const fol=()=>A.need('फ़ॉलो करने के लिए',()=>{A.db.follows[c.id]=!f;A.say(f?'फ़ॉलो हटाया':c.n+' को फ़ॉलो किया');A.up()});
  return{label:c.n,blocks:[hd({hasBack:true,img:c.vbn?'assets/emblem-mark.png':'',init:c.vbn?'':c.n[0],eyebrow:c.k,title:c.n,verified:true,tag:c.vbn?'':'उदाहरण',sub:c.vbn?'वीर भारत न्यास, संस्कृति विभाग, मध्यप्रदेश शासन का अधिष्ठान है। यह उसका अपना निःशुल्क मंच है।':(c.id==='me'?(A.db.channel.intro||'चैनल का परिचय चैनल सेटिंग्स से जोड़ें।'):'चैनल का परिचय यहाँ आएगा। यह नमूना पाठ है।'),acts:[act(f?'फ़ॉलो कर रहे हैं':'फ़ॉलो करें',fol,f?'p':'o'),act('साझा करें',shareIt(A,c.n))]}),
    c.vbn?cards('poster','श्रृंखलाएँ',sitems(A).map(id=>I.sP(A,id))):cards('poster','श्रृंखलाएँ',D.CSER.filter(s=>s.ch===c.id).map(s=>I.cP(A,s)),{emptyTitle:'अभी कोई श्रृंखला नहीं'}),
    c.vbn?cards('pod','पॉडकास्ट',D.PE.map((_,i)=>I.pod(A,i))):cards('wide','वीडियो',pubs.map(s=>it.wide({go:()=>A.say('उदाहरण वीडियो'),ph:true,phLabel:s.title,name:s.title,sub:s.kind,creator:true,chName:c.n})).concat(c.id==='me'?[]:[1,2].map(n=>it.wide({go:()=>A.say('उदाहरण वीडियो'),ph:true,phLabel:'उदाहरण वीडियो '+n,name:'उदाहरण वीडियो '+n,creator:true,chName:c.n}))),{emptyTitle:'अभी कोई प्रकाशित वीडियो नहीं',emptyText:'स्वीकृत होने पर वीडियो यहाँ दिखेंगे।'}),
    prose([['परिचय',c.vbn?'न्यास भारत की लंबी परंपरा के शोध, अध्येतावृत्ति और अध्ययन को समर्पित है।':'चैनल के बारे में विस्तृत जानकारी यहाँ आएगी। यह नमूना पाठ है।'],['लिंक',c.id==='me'&&A.db.channel.links?A.db.channel.links:'वेबसाइट और सामाजिक माध्यम के लिंक यहाँ आएँगे।']])]}};
P.search=A=>{const db=A.db,q=A.q.trim(),ty=filt(A,'sty','सभी');const res=q?V.searchAll(A,q):[];
  const T=[['सभी','सभी'],['series','श्रृंखला'],['episode','एपिसोड'],['person','व्यक्तित्व'],['event','आयोजन'],['book','पुस्तक'],['channel','चैनल']];
  const grp=(k,title,kind)=>{const l=res.filter(x=>x.type===k);if(!l.length||(ty!=='सभी'&&ty!==k))return null;
    if(kind==='poster')return cards('poster',title,l.map(x=>it.poster({go:x.go,img:x.img,name:x.name,showName:true})));
    if(kind==='book')return cards('book',title,l.map(x=>it.book({go:x.go,img:x.img,name:x.name})));
    return{t:'list',title,items:l.map(x=>li({go:x.go,img:x.img,imgW:k==='episode'?'110px':'56px',imgAr:k==='episode'?'16/9':'1',title:x.name,sub:x.sub||x.kind}))}};
  const sugg=['महादेव','अवंति','गीता','सदानीरा','पॉडकास्ट','पुस्तक'];
  const blocks=[chipsB([['प्रकार',T.map(x=>[x[1],ty===x[0],setF(A,'sty',x[0])])]])];
  if(!q){blocks.push(chipsB([['हाल की खोज',(db.recentQ.length?db.recentQ:['अभी कोई नहीं']).map(x=>[x,false,()=>{if(x!=='अभी कोई नहीं'){A.q=x;A.up()}}])],['सुझाव',sugg.map(x=>[x,false,()=>{A.q=x;if(!db.recentQ.includes(x))db.recentQ=[x].concat(db.recentQ).slice(0,6);A.up()}])]],{title:'खोज शुरू करें'}))}
  else{const g=[grp('series','श्रृंखलाएँ','poster'),grp('episode','एपिसोड'),grp('person','व्यक्तित्व और अतिथि'),grp('event','आयोजन'),grp('book','पुस्तकें','book'),grp('channel','चैनल')].filter(Boolean);
    if(g.length)blocks.push(...g);else blocks.push({t:'state',empty:true,loading:false,error:false,skel:[],skAr:'1',title:'"'+q+'" के लिए',emptyTitle:'कोई परिणाम नहीं मिला',emptyText:'वर्तनी जाँचें या कोई सुझाव आज़माएँ।',hasEmptyAct:true,emptyAct:'खोज साफ़ करें',emptyGo:()=>{A.q='';A.up()},retry:null})}
  return{label:'खोज',hero:[intro({eyebrow:'वीर भारत न्यास',orig:true,l1:'खोजें',sub:'श्रृंखला, एपिसोड, व्यक्तित्व, आयोजन, पुस्तक और चैनल, सब एक साथ।',search:true,b1L:'',b2L:''})],blocks}};
P.about=A=>({label:'न्यास परिचय',blocks:[hd({eyebrow:'संस्कृति विभाग, मध्यप्रदेश शासन',orig:true,title:'वीर भारत न्यास'}),prose([
  ['न्यास','वीर भारत न्यास, संस्कृति विभाग, मध्यप्रदेश शासन का अधिष्ठान है। यह भारत की लंबी परंपरा के शोध, अध्येतावृत्ति और अध्ययन को समर्पित है: उसके नायक, विचारक, दार्शनिक, ऋषि, संत, कवि, लेखक, कलाकार, वैज्ञानिक और उद्यमी, प्रागैतिहासिक काल से विदेशी शासन के विरुद्ध संघर्ष तक।'],
  ['यह मंच','यह न्यास का अपना निःशुल्क मंच है। इस पर न्यास की अपनी श्रृंखलाएँ, पॉडकास्ट, लाइव आयोजन और पुस्तकें हैं, और यह सत्यापित रचनाकारों तथा संस्थानों के लिए भी खुला है, जो अपने चैनलों पर प्रकाशित करते हैं।'],
  ['संस्कृति विभाग','न्यास संस्कृति विभाग, मध्यप्रदेश शासन के अंतर्गत कार्य करता है।']]),notice('संपर्क','न्यास से संपर्क के लिए संपर्क पृष्ठ का उपयोग करें।',[act('संपर्क करें',()=>A.go('/contact'),'p')])]});
V.form=(A,id,init)=>A.forms[id]||(A.forms[id]=Object.assign({_err:{},_done:false,_step:0},init));
V.inp=(A,F,k,label,o)=>Object.assign({label,value:F[k]==null?'':F[k],onChange:e=>{F[k]=e.target.value;delete F._err[k];A.up()},err:F._err[k]||''},o||{});
const okEmail=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v||'');V.okEmail=okEmail;
const formB=(o)=>Object.assign({t:'form',maxW:'720px',cols:'repeat(auto-fit,minmax(min(100%,260px),1fr))',success:false,notSuccess:true,hasErrBanner:false,errBanner:'',hasSocial:false,social:[],hasPreview:false,pv:{ar:'16/9',imgLabel:'',title:'',sub:'',verified:false,lines:[]},secondary:[],sTitle:'',sText:'',sActs:[]},o,{notSuccess:!o.success,fields:(o.fields||[]).map(V.fld),hasErrBanner:!!o.errBanner,hasSocial:!!(o.social&&o.social.length),hasPreview:!!o.pv});
V.formB=formB;
P.contact=A=>{const F=V.form(A,'contact',{name:'',email:'',topic:'सामान्य प्रश्न',msg:''});
  return{label:'संपर्क',blocks:[hd({eyebrow:'वीर भारत न्यास',title:'संपर्क'}),formB({success:F._done,sTitle:'संदेश भेज दिया गया',sText:'धन्यवाद। न्यास की टीम आपसे संपर्क करेगी। यह डेमो है, कोई संदेश वास्तव में नहीं भेजा गया।',sActs:[act('नया संदेश',()=>{A.forms.contact=null;A.up()}),act('मुख्य पृष्ठ',()=>A.go('/'),'p')],
    fields:[V.inp(A,F,'name','नाम',{ph:'आपका नाम'}),V.inp(A,F,'email','ईमेल',{type:'email',ph:'name@example.in'}),V.inp(A,F,'topic','विषय',{isSelect:true,options:['सामान्य प्रश्न','रचनाकार और संस्थान','आयोजन','पुस्तकें','तकनीकी सहायता'].map(x=>({v:x,l:x}))}),V.inp(A,F,'msg','संदेश',{isArea:true,span:'1 / -1',ph:'अपना संदेश लिखें'})],
    submitLabel:'संदेश भेजें',submit:()=>{const e={};if(!F.name.trim())e.name='नाम लिखें';if(!okEmail(F.email))e.email='सही ईमेल लिखें';if(F.msg.trim().length<10)e.msg='संदेश कम से कम 10 अक्षरों का हो';F._err=e;if(!Object.keys(e).length){F._done=true;A.log('संपर्क संदेश भेजा गया')}A.up()}})]}};
P.signin=A=>{const F=V.form(A,'signin',{email:'',pw:''});
  return{label:'प्रवेश',blocks:[hd({eyebrow:'खाता',title:'प्रवेश करें',sub:'देखने के लिए खाते की आवश्यकता नहीं। खाता प्रगति, सूची, डाउनलोड और पसंद सहेजता है।'}),formB({maxW:'520px',cols:'1fr',success:A.db.signed,sTitle:'आप प्रवेश कर चुके हैं',sText:(A.db.user.name||'')+' के रूप में।',sActs:[act('मेरा खाता',()=>A.go('/account'),'p'),act('मुख्य पृष्ठ',()=>A.go('/'))],
    errBanner:F._bad?'ईमेल या पासवर्ड सही नहीं है। डेमो में कोई भी ईमेल और कम से कम 6 अक्षरों का पासवर्ड चलेगा।':'',social:[act('Google से जारी रखें',()=>A.signIn()),act('Apple से जारी रखें',()=>A.signIn())],
    fields:[V.inp(A,F,'email','ईमेल',{type:'email',ph:'name@example.in'}),V.inp(A,F,'pw','पासवर्ड',{type:'password',ph:'कम से कम 6 अक्षर'})],
    submitLabel:'प्रवेश करें',submit:()=>{const e={};if(!okEmail(F.email))e.email='सही ईमेल लिखें';if((F.pw||'').length<6)e.pw='पासवर्ड कम से कम 6 अक्षरों का हो';F._err=e;F._bad=!!Object.keys(e).length;if(!F._bad){A.db.user.email=F.email;A.signIn(F.email.split('@')[0])}A.up()},
    secondary:[act('पासवर्ड भूल गए?',()=>A.go('/reset'),'g'),act('नया खाता बनाएँ',()=>A.go('/signup'),'g')]})]}};
P.signup=A=>{const db=A.db,F=V.form(A,'signup',{name:'',email:'',mobile:'',region:'मध्यप्रदेश',lang:'हिन्दी',ints:[],agree:false});
  return{label:'खाता बनाएँ',blocks:[hd({eyebrow:'खाता',title:'खाता बनाएँ'}),formB({success:F._done,sTitle:'खाता बन गया',sText:'स्वागत है, '+F.name+'। आपकी रुचियों के अनुसार मुख्य पृष्ठ सजाया गया है।',sActs:[act('मुख्य पृष्ठ',()=>A.go('/'),'p'),act('प्रोफ़ाइल',()=>A.go('/profile'))],
    fields:[V.inp(A,F,'name','नाम'),V.inp(A,F,'email','ईमेल',{type:'email'}),V.inp(A,F,'mobile','मोबाइल',{type:'tel',ph:'10 अंक'}),V.inp(A,F,'region','राज्य या देश',{isSelect:true,options:d().STATES.map(x=>({v:x,l:x}))}),V.inp(A,F,'lang','पसंदीदा भाषा',{isSelect:true,options:['हिन्दी','English'].map(x=>({v:x,l:x}))}),
      {label:'रुचियाँ',isChips:true,span:'1 / -1',options:d().INTERESTS.map(x=>{const on=F.ints.includes(x.l);return{l:x.l,go:()=>{F.ints=on?F.ints.filter(y=>y!==x.l):F.ints.concat([x.l]);A.up()},bg:on?'var(--gold)':'var(--bg)',col:on?'var(--goldInk)':'var(--ink)',bd:on?'var(--gold)':'var(--line)'}})},
      {label:'',isCheck:true,span:'1 / -1',checked:F.agree,boxBg:F.agree?'var(--gold)':'transparent',bd:F._err.agree?'var(--red)':'var(--outline)',text:'मैं उपयोग की शर्तों और गोपनीयता नीति से सहमत हूँ।',toggle:()=>{F.agree=!F.agree;delete F._err.agree;A.up()},err:F._err.agree||''}],
    submitLabel:'खाता बनाएँ',submit:()=>{const e={};if(F.name.trim().length<2)e.name='नाम लिखें';if(!okEmail(F.email))e.email='सही ईमेल लिखें';if(!/^\d{10}$/.test(F.mobile))e.mobile='10 अंकों का मोबाइल नंबर लिखें';if(!F.agree)e.agree='आगे बढ़ने के लिए सहमति आवश्यक है';F._err=e;
      if(!Object.keys(e).length){Object.assign(db.user,{name:F.name,email:F.email,mobile:F.mobile,region:F.region,lang:F.lang,interests:F.ints});db.interests=F.ints.slice();F._done=true;A.signIn(F.name);A.log('नया खाता बना')}A.up()},secondary:[act('पहले से खाता है? प्रवेश करें',()=>A.go('/signin'),'g')]})]}};
P.reset=A=>{const F=V.form(A,'reset',{email:'',pw:'',pw2:''});
  if(F._step===0)return{label:'पासवर्ड रीसेट',blocks:[hd({eyebrow:'खाता',title:'पासवर्ड रीसेट',sub:'अपना ईमेल लिखें। हम पासवर्ड बदलने का लिंक भेजेंगे।'}),formB({maxW:'520px',cols:'1fr',fields:[V.inp(A,F,'email','ईमेल',{type:'email'})],submitLabel:'लिंक भेजें',submit:()=>{F._err=okEmail(F.email)?{}:{email:'सही ईमेल लिखें'};if(okEmail(F.email))F._step=1;A.up()}})]};
  if(F._step===1)return{label:'पासवर्ड रीसेट',blocks:[hd({eyebrow:'खाता',title:'लिंक भेज दिया गया'}),formB({maxW:'520px',success:true,sTitle:'ईमेल देखें',sText:F.email+' पर पासवर्ड बदलने का लिंक भेजा गया है। डेमो में आगे बढ़ने के लिए नीचे क्लिक करें।',sActs:[act('नया पासवर्ड सेट करें',()=>{F._step=2;A.up()},'p'),act('फिर से भेजें',()=>A.say('लिंक फिर से भेजा गया'))]})]};
  return{label:'पासवर्ड रीसेट',blocks:[hd({eyebrow:'खाता',title:'नया पासवर्ड'}),formB({maxW:'520px',cols:'1fr',success:F._step===3,sTitle:'पासवर्ड बदल गया',sText:'अब नए पासवर्ड से प्रवेश करें।',sActs:[act('प्रवेश करें',()=>{A.forms.reset=null;A.go('/signin')},'p')],
    fields:[V.inp(A,F,'pw','नया पासवर्ड',{type:'password',ph:'कम से कम 6 अक्षर'}),V.inp(A,F,'pw2','पासवर्ड दोबारा',{type:'password'})],submitLabel:'पासवर्ड सहेजें',submit:()=>{const e={};if(F.pw.length<6)e.pw='कम से कम 6 अक्षर';if(F.pw!==F.pw2)e.pw2='दोनों पासवर्ड एक जैसे हों';F._err=e;if(!Object.keys(e).length)F._step=3;A.up()}})]}};
const signGate=(A,label)=>[hd({eyebrow:'खाता',title:label}),notice('इसके लिए प्रवेश करें','देखने के लिए खाते की आवश्यकता नहीं है। '+label+' के लिए खाते में प्रवेश करें, डेमो में प्रवेश तुरंत होता है।',[act('प्रवेश करें',()=>A.signIn(),'p'),act('खाता बनाएँ',()=>A.go('/signup'))],'var(--outline)')];
P.account=A=>{const db=A.db;const links=[['प्रोफ़ाइल','/profile'],['मेरी सूची','/list'],['इतिहास','/history'],['डाउनलोड','/downloads'],['सूचनाएँ','/notifications'],['सेटिंग्स','/settings'],['गोपनीयता और सहमति','/privacy']];
  return{label:'खाता',hero:[intro({eyebrow:'वीर भारत न्यास',orig:true,l1:db.signed?'नमस्ते, '+(db.user.name||''):'आपका खाता',sub:db.signed?'आपकी प्रगति, सूची और पसंद सहेजी जा रही हैं।':'देखने के लिए प्रवेश आवश्यक नहीं। खाता केवल प्रगति, सूची, डाउनलोड और पसंद सहेजता है।',
    b1L:db.signed?'प्रोफ़ाइल':'प्रवेश करें',b1Icon:IC.arrow,b1Go:()=>db.signed?A.go('/profile'):A.go('/signin'),b2L:db.signed?'साइन आउट':'खाता बनाएँ',b2Go:()=>{if(db.signed){db.signed=false;A.say('साइन आउट हो गया');A.up()}else A.go('/signup')}})],
    blocks:[{t:'links',title:'खाता',items:links.map((x,i)=>({n:String(i+1),label:x[0],go:()=>A.go(x[1])}))},
      db.signed&&db.hist.length?cards('wide','जहाँ छोड़ा था',db.hist.slice(0,8).map(k=>{const [s,p,e]=k.split('|');return I.ep(A,s,+p,+e)})):null]}};
P.profile=A=>{const db=A.db;if(!db.signed)return{label:'प्रोफ़ाइल',blocks:signGate(A,'प्रोफ़ाइल')};const F=V.form(A,'profile',Object.assign({},db.user,{ints:db.interests.slice()}));
  return{label:'प्रोफ़ाइल',blocks:[hd({hasBack:true,init:(db.user.name||'द')[0],eyebrow:'प्रोफ़ाइल',title:db.user.name||'दर्शक',sub:db.user.email}),formB({title:'व्यक्तिगत विवरण और पसंद',
    fields:[V.inp(A,F,'name','नाम'),V.inp(A,F,'email','ईमेल',{type:'email'}),V.inp(A,F,'mobile','मोबाइल',{type:'tel'}),V.inp(A,F,'region','राज्य या देश',{isSelect:true,options:d().STATES.map(x=>({v:x,l:x}))}),V.inp(A,F,'lang','पसंदीदा भाषा',{isSelect:true,options:['हिन्दी','English'].map(x=>({v:x,l:x}))}),
      {label:'रुचियाँ',isChips:true,span:'1 / -1',options:d().INTERESTS.map(x=>{const on=F.ints.includes(x.l);return{l:x.l,go:()=>{F.ints=on?F.ints.filter(y=>y!==x.l):F.ints.concat([x.l]);A.up()},bg:on?'var(--gold)':'var(--bg)',col:on?'var(--goldInk)':'var(--ink)',bd:on?'var(--gold)':'var(--line)'}})}],
    submitLabel:'सहेजें',submit:()=>{const e={};if(!F.name.trim())e.name='नाम लिखें';if(!okEmail(F.email))e.email='सही ईमेल लिखें';if(F.mobile&&!/^\d{10}$/.test(F.mobile))e.mobile='10 अंक';F._err=e;if(!Object.keys(e).length){Object.assign(db.user,{name:F.name,email:F.email,mobile:F.mobile,region:F.region,lang:F.lang});db.interests=F.ints.slice();A.say('प्रोफ़ाइल सहेजी गई');A.log('प्रोफ़ाइल बदली गई')}A.up()}})]}};
P.list=A=>{const db=A.db;if(!db.signed)return{label:'मेरी सूची',blocks:signGate(A,'मेरी सूची')};const ks=Object.keys(db.saved).sort((a,b)=>db.saved[b]-db.saved[a]);const ss=ks.filter(k=>k.startsWith('s:')).map(k=>k.slice(2)),es=ks.filter(k=>k.startsWith('e:')).map(k=>k.slice(2));
  const rm=k=>()=>{delete db.saved[k];A.say('सूची से हटाया गया');A.up()};
  return{label:'मेरी सूची',blocks:[hd({hasBack:true,eyebrow:'खाता',title:'मेरी सूची'}),
    {t:'list',title:'श्रृंखलाएँ',items:ss.map(id=>li({go:()=>A.go('/series/'+id),img:SR(id)&&id!=='tapodhara'?img(id,'1x1'):'art/books/tapodhara-madhyapradesh.jpg',imgW:'64px',imgAr:'1',title:SR(id).n,sub:SR(id).u,acts:[act('देखें',resume(A,id),'p'),act('हटाएँ',rm('s:'+id),'d')]})),emptyTitle:'कोई श्रृंखला सहेजी नहीं गई',emptyText:'किसी श्रृंखला के पृष्ठ पर "सूची में जोड़ें" चुनें।',emptyAct:'श्रृंखलाएँ देखें',emptyGo:()=>A.go('/series')},
    {t:'list',title:'एपिसोड',items:es.map(k=>{const [s,p,e]=k.split('|');return li({go:()=>A.play(s,+p,+e),img:epImg(s,+p),title:V.epTitle(s,+p,+e),sub:SR(s).n,pct:db.prog[k]?pct(db.prog[k]):undefined,acts:[act('चलाएँ',()=>A.play(s,+p,+e),'p'),act('हटाएँ',rm('e:'+k),'d')]})}),emptyTitle:'कोई एपिसोड सहेजा नहीं गया',emptyText:'एपिसोड पृष्ठ पर "सहेजें" चुनें।'}]}};
P.history=A=>{const db=A.db;if(!db.signed)return{label:'इतिहास',blocks:signGate(A,'इतिहास')};
  return{label:'इतिहास',blocks:[hd({hasBack:true,eyebrow:'खाता',title:'इतिहास',acts:db.hist.length?[act('इतिहास साफ़ करें',()=>{db.hist=[];A.say('इतिहास साफ़ किया गया');A.log('इतिहास साफ़ किया');A.up()},'d')]:[]}),
    {t:'list',items:db.hist.map(k=>{const [s,p,e]=k.split('|'),v=db.prog[k]||0;return li({go:()=>A.play(s,+p,+e),img:epImg(s,+p),title:V.epTitle(s,+p,+e),sub:SR(s).n+' · '+SR(s).parts[+p].name,meta:v>=.98?'पूरा देखा':Math.round(v*100)+'% देखा',pct:pct(v),acts:[act(v>0&&v<.98?'जारी रखें':'फिर देखें',()=>A.play(s,+p,+e),'p'),act('हटाएँ',()=>{db.hist=db.hist.filter(x=>x!==k);A.up()},'d')]})}),emptyTitle:'अभी कुछ नहीं देखा गया',emptyText:'आप जो भी देखेंगे, उसकी प्रगति के साथ यहाँ दिखेगा।',emptyAct:'मुख्य पृष्ठ',emptyGo:()=>A.go('/')}]}};
P.downloads=A=>{const db=A.db;if(!db.signed&&!db.offline)return{label:'डाउनलोड',blocks:signGate(A,'डाउनलोड')};const used=db.downloads.length*0.4;
  return{label:'डाउनलोड',blocks:[hd({hasBack:true,eyebrow:'खाता',title:'डाउनलोड'}),notice('डाउनलोड ऐप में होते हैं','वेब पर एपिसोड डाउनलोड नहीं होते। Android और iOS ऐप में डाउनलोड किए गए एपिसोड यहाँ दिखते हैं और बिना इंटरनेट के चलते हैं। यह सूची डेमो के लिए है।',[],'var(--outline)'),
    {t:'stats',items:[{label:'डाउनलोड किए गए एपिसोड',value:String(db.downloads.length),hasSub:false,sub:'',go:null},{label:'उपयोग किया गया स्थान',value:used.toFixed(1)+' GB',hasSub:true,sub:'नमूना आँकड़ा',go:null}]},
    {t:'list',items:db.downloads.map(k=>{const [s,p,e]=k.split('|');return li({go:()=>A.play(s,+p,+e),img:epImg(s,+p),title:V.epTitle(s,+p,+e),sub:SR(s).n,meta:'0.4 GB · नमूना',acts:[act('चलाएँ',()=>A.play(s,+p,+e),'p'),act('मिटाएँ',()=>{db.downloads=db.downloads.filter(x=>x!==k);A.say('डाउनलोड मिटाया गया');A.up()},'d')]})}),emptyTitle:'कोई डाउनलोड नहीं',emptyText:'एपिसोड पृष्ठ पर "डाउनलोड" चुनें।'}]}};
P.notifications=A=>{const db=A.db;if(!db.signed)return{label:'सूचनाएँ',blocks:signGate(A,'सूचनाएँ')};
  return{label:'सूचनाएँ',blocks:[hd({hasBack:true,eyebrow:'खाता',title:'सूचनाएँ',acts:db.notifs.some(n=>!n.read)?[act('सभी पढ़ा हुआ करें',()=>{db.notifs.forEach(n=>n.read=true);A.up()})]:[]}),
    {t:'list',items:db.notifs.map(n=>li({go:()=>{n.read=true;A.go(n.path||'/')},unread:!n.read,icon:IC.bell,title:n.title,sub:n.text,meta:n.kind+' · '+n.time,bg:n.read?'var(--bg2)':'var(--bg3)',acts:n.read?[]:[act('पढ़ा हुआ',()=>{n.read=true;A.up()})]})),emptyTitle:'कोई सूचना नहीं',emptyText:'नए एपिसोड, प्रीमियर, लाइव आयोजन और पर्वों की सूचनाएँ यहाँ आएँगी।'}]}};
P.settings=A=>{const db=A.db,s=db.settings,th=A.theme||A.c.props.theme||'dark';const seg=(label,opts,cur,fn)=>({label,n:String(opts.length),opts:opts.map(o=>({label:o,go:()=>{fn(o);A.up()},bg:o===cur?'var(--gold)':'transparent',col:o===cur?'var(--goldInk)':'var(--ink)'}))});
  const sw=(label,sub,on,fn)=>Object.assign({label,sub,hasSub:!!sub,go:()=>{fn();A.up()},op:1},tg(on));
  return{label:'सेटिंग्स',blocks:[hd({hasBack:true,eyebrow:'खाता',title:'सेटिंग्स',sub:'बदलाव पूरे मंच पर तुरंत लागू होते हैं।'}),
    {t:'toggles',title:'देखना',segs:[seg('रंग',['गहरा','हल्का'],th==='light'?'हल्का':'गहरा',v=>A.theme=v==='हल्का'?'light':'dark'),seg('उपशीर्षक',['बंद','हिन्दी'],s.subs,v=>{s.subs=v;if(A.pl)A.pl.subs=v}),seg('वीडियो गुणवत्ता',['स्वतः','1080p','720p','480p'],s.quality,v=>{s.quality=v;if(A.pl)A.pl.quality=v}),seg('अक्षर आकार',['सामान्य','बड़ा','बहुत बड़ा'],s.text,v=>s.text=v)],
      items:[sw('डेटा सेवर','कम गुणवत्ता में चलाकर डेटा बचाएँ',s.dataSaver,()=>{s.dataSaver=!s.dataSaver;if(s.dataSaver){s.quality='480p';if(A.pl)A.pl.quality='480p'}})]},
    {t:'toggles',title:'सूचनाएँ',segs:[],items:[['ep','नए एपिसोड'],['prem','प्रीमियर'],['live','लाइव आयोजन'],['fest','पर्व कार्यक्रम']].map(x=>sw(x[1],'',s.notif[x[0]],()=>s.notif[x[0]]=!s.notif[x[0]]))},
    notice('गोपनीयता और सहमति','व्यक्तिगत विज्ञापन और विश्लेषण की सहमति अलग पृष्ठ पर है।',[act('खोलें',()=>A.go('/privacy'))])]}};
P.privacy=A=>{const c=A.db.consent;const sw=(label,sub,k)=>Object.assign({label,sub,hasSub:true,op:1,go:()=>{c[k]=!c[k];A.log('सहमति बदली : '+label);A.up()}},tg(c[k]));
  return{label:'गोपनीयता और सहमति',blocks:[hd({eyebrow:'नीतियाँ',title:'गोपनीयता और सहमति',sub:'भारत में व्यक्तिगत विज्ञापन के लिए डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम के अंतर्गत दर्शक की सहमति आवश्यक है, इसलिए सहमति आरंभ से ही मंच में है।'}),
    {t:'toggles',title:'आपकी सहमति',segs:[],items:[Object.assign({label:'आवश्यक',sub:'मंच चलाने के लिए आवश्यक, बंद नहीं किया जा सकता',hasSub:true,op:.6,go:()=>A.say('आवश्यक सहमति बंद नहीं की जा सकती')},tg(true)),sw('विश्लेषण','मंच सुधारने के लिए गुमनाम उपयोग आँकड़े','analytics'),sw('व्यक्तिगत विज्ञापन','आपकी रुचि के अनुसार विज्ञापन','pads'),sw('ईमेल','नई श्रृंखलाओं और आयोजनों की ईमेल','email')]},
    prose([['डेटा का उपयोग','नीति का विस्तृत पाठ यहाँ आएगा। यह नमूना पाठ है।'],['डेटा का भंडारण','भारत के भीतर डेटा भंडारण की पुष्टि संस्कृति विभाग के साथ की जानी है।']])]}};
P.terms=A=>({label:'उपयोग की शर्तें',blocks:[hd({eyebrow:'नीतियाँ',title:'उपयोग की शर्तें'}),prose([['परिचय','उपयोग की शर्तों का पाठ यहाँ आएगा। यह नमूना पाठ है।'],['निःशुल्क मंच','मंच सभी के लिए निःशुल्क है और विज्ञापन से चलता है। देखने के लिए खाते की आवश्यकता नहीं है।'],['रचनाकार','रचनाकार अपनी रचनाओं का स्वामित्व रखते हैं और न्यास को गैर-अनन्य लाइसेंस देते हैं।'],['अन्य शर्तें','नमूना पाठ।']])]});
P.accessibility=A=>({label:'सुलभता विवरण',blocks:[hd({eyebrow:'नीतियाँ',title:'सुलभता विवरण'}),prose([['हमारी प्रतिबद्धता','मंच उपशीर्षक, बदलने योग्य अक्षर आकार और ऐसे नेविगेशन के साथ बनाया गया है जो बुजुर्ग दर्शकों के लिए भी सरल हो।'],['सरकारी मानक','सरकारी वेबसाइटों के सुलभता मानकों (GIGW) की पुष्टि संस्कृति विभाग के साथ की जानी है।'],['सहायता','सुलभता से जुड़ी किसी कठिनाई के लिए संपर्क पृष्ठ का उपयोग करें।']]),notice('अक्षर आकार','सेटिंग्स में अक्षर आकार बड़ा करें।',[act('सेटिंग्स',()=>A.go('/settings'),'p')])]});
P.guidelines=A=>({label:'सामग्री दिशानिर्देश',blocks:[hd({eyebrow:'रचनाकार और संस्थान',title:'सामग्री दिशानिर्देश',sub:'प्रकाशन से पहले न्यास की आंतरिक टीम हर रचना को प्रकाशित दिशानिर्देशों पर जाँचती है।'}),prose([['सटीकता','तथ्य और स्रोत जाँचे जाने योग्य हों।'],['तकनीकी गुणवत्ता','वीडियो और ध्वनि की गुणवत्ता मंच के मानक पर हो।'],['कॉपीराइट','रचना में प्रयुक्त सामग्री के अधिकार रचनाकार के पास हों।'],['सामग्री मानक','विस्तृत मानक यहाँ आएँगे। यह नमूना पाठ है।']]),notice('रचनाकार बनें','पंजीकरण के लिए रचनाकार स्टूडियो खोलें।',[act('पंजीकरण',()=>A.go('/studio/register'),'p')])]});
P.notfound=A=>({label:'पृष्ठ नहीं मिला',blocks:[hd({pad:'clamp(40px,6vw,110px)',eyebrow:'404',title:'पृष्ठ नहीं मिला',sub:'यह पता मंच पर नहीं है। नीचे से किसी गंतव्य पर लौटें।',acts:[act('मुख्य पृष्ठ',()=>A.go('/'),'p'),act('खोजें',()=>A.go('/search'))]}),{t:'links',title:'गंतव्य',items:[['मुख्य','/'],['श्रृंखलाएँ','/series'],['पॉडकास्ट','/podcast'],['पुस्तकें','/books'],['लाइव','/live'],['सभी पृष्ठ','/pages']].map((x,i)=>({n:String(i+1),label:x[0],go:()=>A.go(x[1])}))}]});
P.offline=A=>{const db=A.db;return{label:'ऑफ़लाइन',noFooter:false,blocks:[hd({pad:'clamp(30px,5vw,90px)',eyebrow:'कनेक्शन नहीं है',title:'आप ऑफ़लाइन हैं',sub:'इंटरनेट लौटते ही मंच अपने आप चलने लगेगा। डाउनलोड किए गए एपिसोड अभी भी चलेंगे।',acts:[act('फिर से जाँचें',()=>{db.offline=false;A.say('कनेक्शन लौट आया');A.up()},'p')]}),
  {t:'list',title:'डाउनलोड किए गए एपिसोड',items:db.downloads.map(k=>{const [s,p,e]=k.split('|');return li({go:()=>A.play(s,+p,+e),img:epImg(s,+p),title:V.epTitle(s,+p,+e),sub:SR(s).n,acts:[act('चलाएँ',()=>A.play(s,+p,+e),'p')]})}),emptyTitle:'कोई डाउनलोड नहीं',emptyText:'ऐप में डाउनलोड किए गए एपिसोड ऑफ़लाइन चलते हैं।'}]}};
P.sitemap=A=>{const L=(arr,base)=>arr.map((x,i)=>({n:String(base+i+1),label:x[0],go:()=>A.go(x[1])}));
  const VV=[['लॉन्च स्क्रीन','/launch'],['स्वागत','/welcome'],['मुख्य','/'],['श्रृंखलाएँ','/series'],['श्रृंखला पृष्ठ : महादेव','/series/mahadev'],['भाग पृष्ठ : अवंति','/series/mahajanpad/part/5'],['एपिसोड पृष्ठ','/watch/mahadev/0/0'],['गीता अमृत मुख्य','/geeta'],['जीवन का प्रश्न','/geeta/q/0'],['गीता माला','/geeta/mala'],['श्लोक','/shloka/0'],['अमृत-सूत्र संग्रह','/sutra'],['महाजनपद संसार','/world/mahajanpad'],['सदानीरा संसार','/world/sadanira'],['पूर्वज श्री राम के संसार','/world/purvaj'],['शॉर्ट्स','/shorts'],['पॉडकास्ट मुख्य','/podcast'],['पॉडकास्ट संस्करण','/podcast/mahabharat'],['अतिथि','/guest/g0'],['आयोजन','/events'],['आयोजन पृष्ठ','/event/sadanira-samagam'],['लाइव','/live'],['प्रीमियर','/premiere'],['पुस्तकालय','/books'],['पुस्तक पृष्ठ','/book/amrit'],['व्यक्तित्व','/people'],['व्यक्तित्व पृष्ठ','/person/p0'],['रचनाकार','/creators'],['रचनाकार चैनल','/channel/ex1'],['खोज','/search'],['न्यास परिचय','/about'],['संपर्क','/contact'],['प्रवेश','/signin'],['खाता बनाएँ','/signup'],['पासवर्ड रीसेट','/reset'],['प्रोफ़ाइल','/profile'],['मेरी सूची','/list'],['इतिहास','/history'],['डाउनलोड','/downloads'],['सूचनाएँ','/notifications'],['सेटिंग्स','/settings'],['गोपनीयता और सहमति','/privacy'],['उपयोग की शर्तें','/terms'],['सुलभता विवरण','/accessibility'],['सामग्री दिशानिर्देश','/guidelines'],['पृष्ठ नहीं मिला','/404'],['ऑफ़लाइन','/offline']];
  const SS=[['रचनाकार पंजीकरण','/studio/register'],['सत्यापन स्थिति','/studio/status'],['डैशबोर्ड','/studio'],['अपलोड','/studio/upload'],['विवरण और टैगिंग','/studio/details/new'],['मेरी प्रस्तुतियाँ','/studio/submissions'],['मेरी सामग्री','/studio/content'],['चैनल सेटिंग्स','/studio/channel'],['दर्शक आँकड़े','/studio/analytics']];
  const AA=[['एडमिन प्रवेश','/admin/signin'],['डैशबोर्ड','/admin'],['श्रृंखलाएँ और भाग','/admin/series'],['एपिसोड और शॉर्ट्स','/admin/episodes'],['अपलोड','/admin/upload'],['मुख्य पृष्ठ और पर्व','/admin/home'],['प्रीमियर','/admin/premiere'],['आयोजन','/admin/events'],['लाइव नियंत्रण','/admin/live'],['पुस्तकें','/admin/books'],['व्यक्तित्व','/admin/people'],['रचनाकार सत्यापन','/admin/creators'],['समीक्षा कतार','/admin/review'],['विज्ञापन अभियान','/admin/campaigns'],['विज्ञापन स्थान','/admin/adspots'],['विज्ञापन रिपोर्ट','/admin/adreport'],['पुश सूचनाएँ','/admin/push'],['विश्लेषण','/admin/analytics'],['उपयोगकर्ता और भूमिकाएँ','/admin/users'],['गतिविधि लॉग','/admin/log'],['सेटिंग्स','/admin/settings']];
  return{label:'सभी पृष्ठ',blocks:[hd({eyebrow:'डेमो',title:'सभी 77 पृष्ठ',sub:'दर्शक के 47, रचनाकार स्टूडियो के 9 और एडमिन पैनल के 21 पृष्ठ। हर पृष्ठ का अपना पता है।'}),{t:'links',title:'दर्शक',items:L(VV,0)},{t:'links',title:'रचनाकार स्टूडियो',items:L(SS,47)},{t:'links',title:'एडमिन पैनल',items:L(AA,56)}]}};
V.viewer=P;
})();
