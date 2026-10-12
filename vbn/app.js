(function(){
const V=window.VBN=window.VBN||{};
const D=()=>V.D;
V.IC={play:'M6 3.5v17L21 12z',pause:'M6.5 4h4v16h-4zM13.5 4h4v16h-4z',plus:'M12 5v14M5 12h14',check:'M5 12.5 10 17 19 7',share:'M12 15V3.5M7.5 8 12 3.5 16.5 8M5 12v8h14v-8',bell:'M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0',down:'M12 4v11M7.5 10.5 12 15l4.5-4.5M5 20h14',save:'M6 3.5h12v17l-6-4-6 4z',arrow:'M9 6l6 6-6 6',doc:'M7 3.5h7l4 4v13H7zM14 3.5v4h4M9.5 12h6M9.5 15.5h6',map:'M3.5 6.5l5.5-2 6 2 5.5-2v13l-5.5 2-6-2-5.5 2zM9 4.5v13M15 6.5v13',img:'M4 5h16v14H4zM4 15l4.5-4.5 4 4 2.5-2.5L20 17M15 9.5h.01',src:'M5 4.5h10a3 3 0 0 1 3 3v12H8a3 3 0 0 1-3-3zM5 16.5a3 3 0 0 1 3-3h10',user:'M12 12.3a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6zM4.8 20a7.2 7.2 0 0 1 14.4 0',live:'M12 13.4a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8zM8.6 8.6a4.8 4.8 0 0 0 0 6.8M15.4 8.6a4.8 4.8 0 0 1 0 6.8M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8',cal:'M4 6.5h16V20H4zM4 10.5h16M8.5 4v4M15.5 4v4',star:'M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8z'};
const TABIC={home:'M3.5 11 12 4l8.5 7v8.5a1 1 0 0 1-1 1H15v-6h-6v6H4.5a1 1 0 0 1-1-1z',series:'M7 4.6v14.8L19 12z',podcast:'M12 3.5a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0v-5a3 3 0 0 0-3-3zM5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3',books:'M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5zM12 6.5v13',live:V.IC.live};
const ROUTES=[
 ['/launch','v','launch'],['/welcome','v','welcome'],['/','v','home','home'],['/series','v','catalog','series'],['/series/:id','v','series','series'],['/series/:id/part/:p','v','part','series'],['/watch/:sid/:p/:e','v','watch','series'],
 ['/geeta','v','geeta','series'],['/geeta/q/:i','v','question','series'],['/geeta/mala','v','mala','series'],['/shloka/:i','v','shloka','series'],['/sutra','v','sutra','series'],['/world/:w','v','world','series'],
 ['/shorts','v','shorts','shorts'],['/shorts/:i','v','shorts','shorts'],['/podcast','v','podcast','podcast'],['/podcast/:ed','v','edition','podcast'],['/guest/:id','v','guest','podcast'],
 ['/events','v','events','live'],['/event/:id','v','event','live'],['/live','v','live','live'],['/premiere','v','premiere','series'],['/books','v','books','books'],['/book/:id','v','book','books'],
 ['/people','v','people','series'],['/person/:id','v','person','series'],['/creators','v','creators','creators'],['/channel/:id','v','channel','creators'],['/search','v','search','search'],
 ['/about','v','about','info'],['/contact','v','contact','info'],['/signin','v','signin','account'],['/signup','v','signup','account'],['/reset','v','reset','account'],['/account','v','account','account'],
 ['/profile','v','profile','account'],['/list','v','list','account'],['/history','v','history','account'],['/downloads','v','downloads','account'],['/notifications','v','notifications','account'],['/settings','v','settings','account'],
 ['/privacy','v','privacy','info'],['/terms','v','terms','info'],['/accessibility','v','accessibility','info'],['/guidelines','v','guidelines','info'],['/404','v','notfound','info'],['/offline','v','offline','info'],['/pages','v','sitemap','info'],
 ['/studio/register','s','register'],['/studio/status','s','status'],['/studio','s','dash'],['/studio/upload','s','upload'],['/studio/details/:id','s','details'],['/studio/submissions','s','subs'],['/studio/content','s','content'],['/studio/channel','s','chset'],['/studio/analytics','s','stats'],
 ['/admin/signin','a','signin'],['/admin','a','dash'],['/admin/series','a','series'],['/admin/episodes','a','episodes'],['/admin/upload','a','upload'],['/admin/home','a','home'],['/admin/premiere','a','premiere'],['/admin/events','a','events'],['/admin/live','a','live'],['/admin/books','a','books'],['/admin/people','a','people'],['/admin/creators','a','creators'],['/admin/review','a','review'],['/admin/campaigns','a','camps'],['/admin/adspots','a','spots'],['/admin/adreport','a','adrep'],['/admin/push','a','push'],['/admin/analytics','a','analytics'],['/admin/users','a','users'],['/admin/log','a','log'],['/admin/settings','a','settings']];
V.ROUTES=ROUTES;
function parse(path){path=(path||'/').split('?')[0];if(path.length>1&&path.endsWith('/'))path=path.slice(0,-1);const seg=path.split('/').filter(Boolean);
  for(const r of ROUTES){const ps=r[0].split('/').filter(Boolean);if(ps.length!==seg.length)continue;const p={};let ok=true;
    for(let i=0;i<ps.length;i++){if(ps[i][0]===':')p[ps[i].slice(1)]=decodeURIComponent(seg[i]);else if(ps[i]!==seg[i]){ok=false;break}}
    if(ok)return{path,side:r[1],page:r[2],dest:r[3]||r[1]+':'+r[2],p}}
  return{path:'/404',side:'v',page:'notfound',dest:'info',p:{}}}
const now=()=>{const d=new Date();return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')+':'+String(d.getSeconds()).padStart(2,'0')};
const fmt=s=>{s=Math.max(0,Math.floor(s));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')};
V.fmt=fmt;
V.act=(label,go,k)=>{k=k||'o';const m={p:['var(--gold)','var(--goldInk)','var(--gold)'],o:['transparent','var(--ink)','var(--outline)'],d:['transparent','var(--red)','var(--red)'],g:['var(--chip)','var(--ink)','var(--line)'],ok:['var(--ok)','#fff','var(--ok)']}[k];return{label,go,bg:m[0],col:m[1],bd:m[2]}};
V.badge=k=>({ok:['rgba(95,178,122,.16)','var(--ok)','var(--ok)'],warn:['rgba(242,188,79,.14)','var(--gold)','var(--gold)'],bad:['rgba(217,69,46,.14)','var(--red)','var(--red)'],live:['#C8361F','#fff','#C8361F'],n:['var(--chip)','var(--ink2)','var(--line)']})[k||'n'];
V.mount=function(c){
  const A={c,db:V.newDB(),r:parse('/'),hi:0,drawer:false,present:false,q:'',focus:false,sheet:null,panel:null,lb:null,share:null,toast:'',launch:false,pl:null,miniOn:true,
    world:{},forms:{},f:{},mob:window.innerWidth<860,scrolled:false,busy:false,loadingUntil:0,theme:null,shk:null,upl:null,bulk:[],adSeen:{},sel:{},cal:null,tl:{view:'list',f:'all'},nav:{}};
  c.app=A;V.A=A;
  A.up=()=>c.setState(s=>({tick:(s.tick||0)+1}));
  A.say=m=>{clearTimeout(A.tt);A.toast=m;A.up();A.tt=setTimeout(()=>{A.toast='';A.up()},2600)};
  A.log=t=>{A.db.log.unshift({who:A.r.side==='a'?'एडमिन (नमूना)':A.r.side==='s'?'रचनाकार (नमूना)':'दर्शक (नमूना)',when:now(),t});};
  A.go=(path)=>{if(('#'+path)===location.hash){A.apply(path,true);return}location.hash=path};
  A.back=()=>{if(history.length>1)history.back();else A.go('/')};
  A.need=(reason,after)=>{if(A.db.signed){after&&after();return}A.sheet={reason,after};A.up()};
  A.signIn=(name)=>{const db=A.db;db.signed=true;if(!db.user.name)db.user.name=name||'उदाहरण दर्शक';if(!db.user.email)db.user.email='darshak@example.in';A.log('दर्शक ने प्रवेश किया');const s=A.sheet;A.sheet=null;A.up();if(s&&s.after)setTimeout(s.after,50)};
  A.loading=()=>Date.now()<A.loadingUntil;
  A.apply=(path,force)=>{
    let r=parse(path);const db=A.db;
    if(r.side==='a'&&!db.admin.signed&&r.page!=='signin'){location.replace('#/admin/signin');return}
    const old=A.r,full=old.dest!==r.dest||old.side!==r.side;
    if(r.page==='watch')A.ensurePl(r.p.sid,+r.p.p,+r.p.e);
    if(r.page==='launch'){A.launch=true;setTimeout(()=>V.launchAnim(A),80)}
    const P=c.pageRef.current,commit=()=>{A.r=r;V.onEnter&&V.onEnter(A,r);A.hi=0;A.drawer=false;A.focus=false;A.panel=null;A.loadingUntil=Date.now()+520;setTimeout(A.up,560);A.heroPending=true;A.up();window.scrollTo(0,0)};
    if(!A.ready||A.busy||matchMedia('(prefers-reduced-motion: reduce)').matches||!P||!P.animate){commit();A.ready=true;return}
    if(full)A.curtain(A.dir||1,commit);
    else{commit();requestAnimationFrame(()=>{const p=c.pageRef.current;p&&p.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'none'}],{duration:420,easing:'cubic-bezier(.16,1,.3,1)'})})}
    A.dir=1;
  };
  A.curtain=(dir,mid)=>{const Ac=c.cA.current,B=c.cB.current,P=c.pageRef.current;if(!Ac||!B){mid();return}A.busy=true;
    const ease='cubic-bezier(.76,0,.24,1)',off=dir>0?'inset(100% 0 0 0)':'inset(0 0 100% 0)',on='inset(0 0 0 0)',gone=dir>0?'inset(0 0 100% 0)':'inset(100% 0 0 0)';const logos=[...B.querySelectorAll('img')];
    Ac.animate([{clipPath:off},{clipPath:on}],{duration:460,easing:ease,fill:'forwards'});
    const b=B.animate([{clipPath:off},{clipPath:on}],{duration:460,delay:80,easing:ease,fill:'forwards'});
    logos.forEach(l=>l.animate([{opacity:0,transform:'scale(.9)'},{opacity:1,transform:'scale(1)'}],{duration:360,delay:300,easing:'ease-out',fill:'forwards'}));
    if(P)P.animate([{transform:'none',opacity:1},{transform:`translateY(${-dir*6}vh) scale(.96)`,opacity:.35}],{duration:540,easing:ease,fill:'forwards'});
    b.onfinish=()=>{mid();setTimeout(()=>{const P2=c.pageRef.current;if(P2){P2.getAnimations().forEach(a=>a.cancel());P2.animate([{transform:`translateY(${dir*8}vh) scale(1.04)`,opacity:0},{transform:'none',opacity:1}],{duration:900,easing:'cubic-bezier(.16,1,.3,1)'})}
      logos.forEach(l=>l.animate([{opacity:1},{opacity:0}],{duration:200,fill:'forwards'}));
      B.animate([{clipPath:on},{clipPath:gone}],{duration:620,delay:40,easing:ease,fill:'forwards'});
      Ac.animate([{clipPath:on},{clipPath:gone}],{duration:620,delay:150,easing:ease,fill:'forwards'}).onfinish=()=>{A.busy=false}},120)}};
  A.heroIn=soft=>{const el=c.heroTxtRef.current;if(!el||!el.animate)return;[...el.children].forEach((ch,i)=>ch.animate([{opacity:0,transform:`translateY(${soft?12:26}px)`},{opacity:1,transform:'none'}],{duration:soft?600:820,delay:(soft?0:160)+i*(soft?40:70),easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'}))};
  // player
  A.epKey=(sid,p,e)=>sid+'|'+p+'|'+e;
  A.ensurePl=(sid,p,e)=>{const k=A.epKey(sid,p,e);if(A.pl&&A.pl.key===k)return;const db=A.db,pr=db.prog[k]||0;
    A.pl={sid,p,e,key:k,t:pr>=.98?0:pr*D().L,playing:true,listen:false,menu:false,term:false,speed:1,quality:db.settings.quality,subs:db.settings.subs,ad:null,auto:null,lastCh:0};
    if(db.ads.on&&db.ads.pre&&!A.adSeen[k])A.pl.ad={kind:'pre',left:5};A.miniOn=true;
    db.hist=[k].concat(db.hist.filter(x=>x!==k)).slice(0,40)};
  A.play=(sid,p,e,listen)=>{A.ensurePl(sid,p,e);if(listen)A.pl.listen=true;A.pl.playing=true;A.go(`/watch/${sid}/${p}/${e}`)};
  A.chapters=sid=>sid==='geeta-amrit'?D().GCH:['खंड 1','खंड 2','खंड 3','खंड 4'];
  A.setT=t=>{const pl=A.pl;if(!pl)return;pl.t=Math.max(0,Math.min(D().L,t));A.db.prog[pl.key]=pl.t/D().L;A.up()};
  A.nextOf=(sid,p,e)=>{const ps=D().SR[sid].parts;if(e+1<ps[p].eps)return[p,e+1];for(let i=p+1;i<ps.length;i++)if(ps[i].eps)return[i,0];return null};
  A.tickPl=()=>{const pl=A.pl,db=A.db;if(!pl||document.hidden)return;
    if(pl.ad){pl.ad.left=Math.max(0,pl.ad.left-.25);A.up();return}
    if(pl.auto!==null){pl.auto-=.25;if(pl.auto<=0){const n=A.nextOf(pl.sid,pl.p,pl.e);pl.auto=null;if(n)A.play(pl.sid,n[0],n[1])}A.up();return}
    if(!pl.playing)return;const L=D().L;pl.t+=pl.speed*4*.25;
    const C=A.chapters(pl.sid).length,ch=Math.floor(pl.t/L*C);
    if(ch>pl.lastCh&&ch<C){pl.lastCh=ch;if(db.ads.on&&db.ads.mid){pl.ad={kind:'mid',left:5}}}
    if(pl.t>=L){pl.t=L;pl.playing=false;if(A.nextOf(pl.sid,pl.p,pl.e))pl.auto=8}
    db.prog[pl.key]=pl.t/L;A.up()};
  // listeners
  A.onHash=()=>A.apply(location.hash.slice(1)||'/');
  A.onR=()=>{const m=window.innerWidth<860;if(m!==A.mob){A.mob=m;A.up()}};
  A.onS=()=>{const s=window.scrollY>40;if(s!==A.scrolled){A.scrolled=s;A.up()}};
  A.onK=e=>{if(e.key==='Escape'){if(A.share)A.share=null;else if(A.lb)A.lb=null;else if(A.panel)A.panel=null;else if(A.sheet)A.sheet=null;else if(A.drawer)A.drawer=false;else if(A.present)A.setPresent(false);A.up();return}
    const tg=e.target&&e.target.tagName;if(tg==='INPUT'||tg==='TEXTAREA'||tg==='SELECT')return;
    if(A.lb){if(e.key==='ArrowRight')A.lbStep(1);if(e.key==='ArrowLeft')A.lbStep(-1);return}
    if(A.present&&!A.drawer){if(['ArrowDown','ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();A.presStep(1)}if(['ArrowUp','ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();A.presStep(-1)}}};
  A.onW=e=>{if(!A.present||A.drawer)return;e.preventDefault();if(Math.abs(e.deltaY)<14)return;const t=Date.now();if(A.busy||t-(A.wl||0)<1100)return;A.wl=t;A.presStep(e.deltaY>0?1:-1)};
  A.PRES=['/','/series','/podcast','/books','/live','/search','/account'];
  A.presStep=n=>{const i=Math.max(0,A.PRES.indexOf(A.r.path));const j=i+n;if(j<0||j>=A.PRES.length)return;A.dir=n;A.go(A.PRES[j])};
  A.setPresent=on=>{A.present=on;A.drawer=false;document.documentElement.style.overflow=on?'hidden':'';if(on&&!A.PRES.includes(A.r.path))A.go('/');else window.scrollTo({top:0,behavior:'smooth'});A.up()};
  A.lbStep=n=>{if(!A.lb)return;A.lb.i=(A.lb.i+n+A.lb.n)%A.lb.n;A.up()};
  window.addEventListener('hashchange',A.onHash);window.addEventListener('resize',A.onR);window.addEventListener('scroll',A.onS,{passive:true});window.addEventListener('keydown',A.onK);window.addEventListener('wheel',A.onW,{passive:false});
  A.t1=setInterval(()=>{if((c.props.autoplay??true)&&A.nS>1&&!A.busy&&!A.drawer&&!document.hidden&&!A.hold){A.hi=(A.hi+1)%A.nS;A.up()}},7000);
  A.t2=setInterval(A.tickPl,250);
  A.t3=setInterval(()=>{if(A.shk&&A.shk.playing){A.shk.w++;if(A.shk.w>=A.shk.n){A.shk.playing=false;A.shk.w=-1}A.up()}if(A.r.page==='premiere'||(A.r.side==='v'&&A.r.page==='geeta'))A.up()},700);
  let first=false;try{first=!localStorage.getItem('vbn-demo-visited')}catch(e){}
  A.firstVisit=first;A.launch=true;
  A.apply(location.hash.slice(1)||'/');A.ready=true;
  V.mountX&&V.mountX(c);
  setTimeout(()=>V.launchAnim(A),60);
};
V.launchAnim=A=>{const el=A.c.launchRef.current;if(!el)return;const [e1,e2,e3]=['1','2','3'].map(k=>el.querySelector(`[data-l="${k}"]`));
  e1&&e1.animate([{opacity:0,transform:'scale(.6) rotate(-30deg)'},{opacity:1,transform:'none'}],{duration:900,easing:'cubic-bezier(.16,1,.3,1)',fill:'forwards'});
  e2&&e2.animate([{opacity:0,transform:'translateY(24px)',filter:'blur(8px)'},{opacity:1,transform:'none',filter:'blur(0)'}],{duration:900,delay:450,easing:'cubic-bezier(.16,1,.3,1)',fill:'forwards'});
  e3&&e3.animate([{opacity:0},{opacity:1}],{duration:700,delay:1100,fill:'forwards'});
  clearTimeout(A.lt);A.lt=setTimeout(()=>V.endLaunch(A),3200)};
V.endLaunch=A=>{if(!A.launch)return;clearTimeout(A.lt);const el=A.c.launchRef.current;const fin=()=>{A.launch=false;try{localStorage.setItem('vbn-demo-visited','1')}catch(e){}if(A.firstVisit){A.firstVisit=false;A.go('/welcome')}else if(A.r.page==='launch')A.go('/');A.up()};
  if(el&&el.animate)el.animate([{opacity:1},{opacity:0}],{duration:450,fill:'forwards'}).onfinish=fin;else fin()};
V.unmount=c=>{const A=c.app;if(!A)return;clearInterval(A.t1);clearInterval(A.t2);clearInterval(A.t3);window.removeEventListener('hashchange',A.onHash);window.removeEventListener('resize',A.onR);window.removeEventListener('scroll',A.onS);window.removeEventListener('keydown',A.onK);window.removeEventListener('wheel',A.onW);document.documentElement.style.overflow=''};
V.didUpdate=(c)=>{const A=c.app;if(!A)return;if(A.heroPending){A.heroPending=false;setTimeout(()=>A.heroIn(0),40)}if(A.lastHi!==A.hi){if(A.lastHi!==undefined&&A.lastPath===A.r.path)A.heroIn(1);A.lastHi=A.hi;A.lastPath=A.r.path}};

// ---------- block helpers
const TYPES=['head','state','cards','banner','ad','parts','eps','player','prose','form','toggles','list','table','stats','chart','steps','countdown','world','shorts','calendar','timeline','chips','tabs','reorder','upload','live','shloka','notice','links'];
const KINDS=['wide','poster','pod','book','short','channel','person','sutra','gallery'];
const FX={wide:['0 0 max(min(74vw,300px),calc((100% - 28px) / 3))',280],poster:['0 0 max(min(36vw,160px),calc((100% - 70px) / 6))',150],pod:['0 0 max(min(58vw,220px),calc((100% - 56px) / 5))',200],book:['none',180],short:['0 0 max(min(40vw,170px),calc((100% - 84px) / 7))',150],channel:['0 0 max(min(38vw,160px),calc((100% - 84px) / 7))',150],person:['0 0 max(min(38vw,160px),calc((100% - 84px) / 7))',150],sutra:['0 0 max(min(46vw,200px),calc((100% - 70px) / 6))',170],gallery:['0 0 max(min(70vw,280px),calc((100% - 42px) / 4))',220]};
const cap=s=>s[0].toUpperCase()+s.slice(1);
V.norm=(A,b,i)=>{
  if(b.t==='cards'){const st=b.state||(A.db.errDemo&&b.items&&b.items.length&&!b.noErr?'error':(A.loading()&&!b.noLoad?'loading':(!b.items||!b.items.length?'empty':'ok')));
    if(st!=='ok'){b=Object.assign({},b,{t:'state',loading:st==='loading',empty:st==='empty',error:st==='error',skel:[0,1,2,3],skAr:b.kind==='wide'?'16/9':b.kind==='short'||b.kind==='sutra'?'9/16':b.kind==='person'?'3/4':'1',
      emptyTitle:b.emptyTitle||'यहाँ अभी कुछ नहीं है',emptyText:b.emptyText||'सामग्री जुड़ते ही यहाँ दिखेगी।',hasEmptyAct:!!b.emptyAct,emptyAct:b.emptyAct||'',emptyGo:b.emptyGo||null,retry:()=>{A.db.errDemo=false;A.loadingUntil=Date.now()+520;setTimeout(A.up,560);A.up()},arrows:false})}}
  if((b.t==='list'||b.t==='table'||b.t==='eps')&&!b.noState){const n=(b.items||b.rows||[]).length;const st=A.db.errDemo&&n?'error':A.loading()?'loading':!n?'empty':'ok';
    if(st!=='ok')b=Object.assign({},b,{t:'state',loading:st==='loading',empty:st==='empty',error:st==='error',skel:[0,1,2],skAr:'16/5',emptyTitle:b.emptyTitle||'यहाँ अभी कुछ नहीं है',emptyText:b.emptyText||'',hasEmptyAct:!!b.emptyAct,emptyAct:b.emptyAct||'',emptyGo:b.emptyGo||null,retry:()=>{A.db.errDemo=false;A.up()}})}
  const o=Object.assign({id:'b'+i,title:'',tfs:'clamp(22px,2.1vw,38px)',tag:'',headActs:[],moreLabel:'सभी देखें',more:null,arrows:false,lead:''},b);
  o.hasTitle=!!o.title&&o.t!=='head'&&o.t!=='player';o.hasTag=!!o.tag;o.hasMore=!!o.more;o.hasLead=!!o.lead;
  TYPES.forEach(t=>o['is'+cap(t)]=o.t===t);
  if(o.t==='cards'){const k=o.kind,grid=o.layout==='grid';KINDS.forEach(x=>o['k'+cap(x)]=x===k);
    o.disp=grid?'grid':'flex';o.gtc=grid?`repeat(auto-fill,minmax(min(100%,${FX[k][1]}px),1fr))`:'none';o.ovx=grid?'visible':'auto';o.snap=grid?'none':'x mandatory';o.fx=grid?'none':FX[k][0];o.gap=k==='book'?'clamp(18px,2vw,30px)':'14px';
    if(!grid&&o.arrows===false&&!A.mob&&o.items.length>4&&o.noArrows!==true)o.arrows=true;if(A.mob)o.arrows=false}
  return V.normX?V.normX(A,o):o};
// items
V.it={
  wide:o=>Object.assign({go:null,hasImg:true,img:'',ph:false,phLabel:'',name:'',hasSub:false,sub:'',orig:false,creator:false,chName:'',hasBadge:false,badge:'',bBg:'',bCol:'',bBd:'',hasPct:false,pct:'0%',op:1},o,{hasSub:!!o.sub,hasPct:o.pct!==undefined,hasBadge:!!o.badge,hasImg:!!o.img&&!o.ph}),
  poster:o=>Object.assign({go:null,hasImg:true,img:'',upcoming:false,ph:false,phLabel:'',name:'',note:'',showName:false,orig:false,creator:false,chName:''},o,{hasImg:!!o.img&&!o.ph&&!o.upcoming}),
  book:o=>Object.assign({go:null,hasImg:true,img:'',set:false,img2:'',ph:false,phLabel:'',name:'',hasSub:false,sub:''},o,{hasSub:!!o.sub,hasImg:!!o.img&&!o.ph})
};
// ---------- render
V.render=c=>{const A=c.app,db=A.db,r=A.r,mob=A.mob,act=V.act;
  const theme=A.theme||c.props.theme||'dark';
  let pg;try{const fnm=(r.side==='v'?V.viewer:r.side==='s'?V.studio:V.admin)||{};pg=(fnm[r.page]||V.viewer.notfound)(A,r.p)}catch(err){console.error(err);pg={label:'त्रुटि',blocks:[{t:'notice',ntitle:'यह पृष्ठ अभी नहीं खुल सका',text:String(err&&err.message||err),bd:'var(--red)',acts:[act('मुख्य पृष्ठ',()=>A.go('/'),'p')]}]}}
  if(db.platform.maint&&r.side==='v')pg=Object.assign({},pg,{blocks:[{t:'notice',ntitle:'रखरखाव सूचना',text:'मंच पर रखरखाव चल रहा है। कुछ सुविधाएँ कुछ समय के लिए उपलब्ध नहीं हो सकतीं।',acts:[],bd:'var(--outline)'}].concat(pg.blocks||[])});
  if(db.offline&&r.side==='v'&&!['downloads','watch','offline','settings'].includes(r.page))pg=V.viewer.offline(A,r.p);
  const isV=r.side==='v',isSide=!isV;
  const slides0=(!A.present||isV)?(pg.hero||[]):[];
  const n=slides0.length;A.nS=n;const hi=Math.min(A.hi,Math.max(0,n-1));
  const slides=slides0.map((s,i)=>Object.assign({img:'',img9:'',imgSq:'',alt:'',ar:'1',isIntro:false,isPoster:false,isCover:false},s,{isIntro:s.mode==='intro',isPoster:s.mode==='poster',isCover:s.mode==='cover',
    m9:s.mode==='poster'&&!!s.img9,mSq:s.mode==='poster'&&!s.img9,op:i===hi?1:0,hidden:i===hi?'false':'true',kb:i===hi?'scale(1.05)':'scale(1)',ar:String(s.ar||1)}));
  const cs=slides[hi]||{};
  const hT=Object.assign({eyebrow:'',orig:false,l1:'',l2:'',sub:'',sub2:'',meta:'',b1L:'',b1Go:null,b1Icon:V.IC.play,b2L:'',b2Go:null,icons:[],search:false},cs);
  hT.band=cs.mode==='poster';hT.column=!hT.band;hT.hasL2=!!hT.l2;hT.hasMeta=!!hT.meta;hT.hasSub2=!!hT.sub2;hT.hasB1=!!hT.b1L;hT.hasB2=!!hT.b2L;hT.hasSearch=!!hT.search;
  hT.mw=cs.mode==='cover'?'min(46vw,680px)':'min(52vw,760px)';hT.fs=hT.l2?'clamp(56px,6.4vw,118px)':'clamp(42px,4.4vw,86px)';hT.fsm=hT.l2?'clamp(40px,11.6vw,54px)':'clamp(32px,9.4vw,44px)';
  hT.icons=(hT.icons||[]).map(x=>Object.assign({bd:'var(--outline)',col:'var(--ink)'},x));
  const hasHero=n>0;
  const blocks=A.present&&isV?[]:(pg.blocks||[]).filter(Boolean).map((b,i)=>V.norm(A,b,i));
  const unread=db.notifs.filter(x=>!x.read).length;
  const destOf=r.dest;
  const navs=[['series','श्रृंखलाएँ','/series'],['podcast','पॉडकास्ट','/podcast'],['books','पुस्तकें','/books'],['live','लाइव','/live']].map(x=>({label:x[1],go:()=>A.go(x[2]),col:destOf===x[0]?'var(--gold)':'var(--ink)',ul:destOf===x[0]?'var(--gold)':'transparent'}));
  const q=A.q.trim();const drop=q?V.searchAll(A,q).slice(0,6).map(x=>({name:x.name,kind:x.kind,img:x.img,go:x.go})):[];
  const sideNav=isSide?(r.side==='s'?V.studioNav(A):V.adminNav(A)):[];
  const pl=A.pl,showMini=!!pl&&A.miniOn&&r.page!=='watch'&&isV&&!A.present;
  const sideList=[['v','दर्शक','/'],['s','रचनाकार स्टूडियो',db.creator.status==='none'?'/studio/register':'/studio'],['a','एडमिन','/admin']];
  const dItems=isV?[['मुख्य','/'],['श्रृंखलाएँ','/series'],['पॉडकास्ट','/podcast'],['पुस्तकें','/books'],['लाइव','/live'],['आयोजन','/events'],['गीता अमृत','/geeta'],['शॉर्ट्स','/shorts'],['व्यक्तित्व','/people'],['रचनाकार','/creators'],['खोज','/search'],['खाता','/account'],['न्यास परिचय','/about']]:sideNav.map(x=>[x.label,x.path]);
  const tog=(on)=>({track:on?'var(--gold)':'var(--bg3)',knob:on?'23px':'3px'});
  const shObj=A.sheet?{title:'प्रवेश करें',text:A.sheet.reason+' इसके लिए खाते में प्रवेश करें। देखने के लिए खाते की आवश्यकता नहीं है।',acts:[act('ईमेल से प्रवेश करें',()=>A.signIn(),'p'),act('Google से जारी रखें',()=>A.signIn()),act('Apple से जारी रखें',()=>A.signIn()),act('नया खाता बनाएँ',()=>{A.sheet=null;A.go('/signup')},'g')]}:{title:'',text:'',acts:[]};
  const pn=A.panel||{};
  const lb=A.lb?{title:A.lb.items[A.lb.i],n:(A.lb.i+1)+' / '+A.lb.n,close:()=>{A.lb=null;A.up()},prev:()=>A.lbStep(-1),next:()=>A.lbStep(1)}:{};
  const shr=A.share||{};
  const ppath=A.PRES.indexOf(r.path);
  const OUT={ready:true,notReady:false,theme,zoom:db.settings.text==='बड़ा'?1.12:db.settings.text==='बहुत बड़ा'?1.24:1,
    isViewer:isV,isSide,sideBar:isSide&&!mob,sideLabel:r.side==='s'?'रचनाकार स्टूडियो':'एडमिन पैनल',sideNav,goSideHome:()=>A.go(r.side==='s'?'/studio':'/admin'),toViewer:()=>{A.dir=-1;A.go('/')},
    pxVar:isV?'clamp(16px,3.7vw,64px)':'clamp(16px,2.6vw,40px)',
    vHeadDesk:isV&&!mob,mHead:mob,mHeadBg:(A.scrolled||!hasHero)?'var(--bgA9)':'transparent',mHeadBlur:(A.scrolled||!hasHero)?'blur(14px)':'none',mSpacer:mob&&!hasHero,
    navs,q:A.q,onQ:e=>{A.q=e.target.value;A.up()},onQKey:e=>{if(e.key==='Enter'){const v=A.q.trim();if(v&&!db.recentQ.includes(v))db.recentQ=[v].concat(db.recentQ).slice(0,6);e.target.blur&&r.page!=='search'&&e.target.blur();if(r.page!=='search')A.go('/search');A.up()}},
    onFocus:()=>{A.focus=true;A.up()},onBlur:()=>setTimeout(()=>{A.focus=false;A.up()},150),showDrop:A.focus&&!!q&&r.page!=='search',drop,goSearch:()=>{A.go('/search');setTimeout(()=>c.heroQRef.current&&c.heroQRef.current.focus(),900)},
    goHome:()=>{A.dir=-1;A.go(isV?'/':r.side==='s'?'/studio':'/admin')},goNotif:()=>A.need('सूचनाएँ देखने के लिए',()=>A.go('/notifications')),goAccount:()=>A.go('/account'),openDrawer:()=>{A.drawer=true;A.up()},closeDrawer:()=>{A.drawer=false;A.up()},
    hasUnread:unread>0,unreadN:String(unread),signed:db.signed,notSigned:!db.signed,userInit:(db.user.name||'द')[0],
    pageRef:c.pageRef,heroTxtRef:c.heroTxtRef,heroQRef:c.heroQRef,stageRef:c.stageRef,cA:c.cA,cB:c.cB,launchRef:c.launchRef,screenLabel:pg.label||'',
    heroDesk:hasHero&&!mob,heroMob:hasHero&&mob,slides,hT,canBack:!!pg.canBack,back:A.back,hasDots:n>1,
    dots:slides.map((s,i)=>({go:()=>{A.hi=i;A.up()},label:s.alt||s.l1||'',size:i===hi?'9px':'7px',bg:i===hi?'var(--gold)':'var(--dot)'})),
    tStart:e=>{A.tx=e.touches[0].clientX;A.ty=e.touches[0].clientY;A.hold=true},tEnd:e=>{A.hold=false;const dx=e.changedTouches[0].clientX-(A.tx||0),dy=e.changedTouches[0].clientY-(A.ty||0);
      if(A.present&&Math.abs(dy)>50&&Math.abs(dy)>Math.abs(dx)){A.presStep(dy<0?1:-1);return}if(n>1&&Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)){A.hi=(hi+(dx<0?1:-1)+n)%n;A.up()}},
    blocks,blocksPad:blocks.length?(isSide?'clamp(18px,2vw,32px) 0 clamp(40px,4vw,72px)':(hasHero?'clamp(24px,2.4vw,40px)':'clamp(8px,1vw,16px)')+' 0 clamp(40px,4vw,72px)'):'0',rowScroll:e=>{const d=+e.currentTarget.dataset.dir;const sc=e.currentTarget.closest('section').querySelector('[data-scroller]');sc&&sc.scrollBy({left:d*sc.clientWidth*.85,behavior:'smooth'})},
    showFooter:isV&&!A.present&&!pg.noFooter,footPad:mob?'calc(96px + env(safe-area-inset-bottom))':'clamp(28px,3vw,48px)',
    footLinks:[['न्यास परिचय','/about'],['संपर्क','/contact'],['गोपनीयता और सहमति','/privacy'],['उपयोग की शर्तें','/terms'],['सुलभता विवरण','/accessibility'],['सामग्री दिशानिर्देश','/guidelines'],['सभी पृष्ठ','/pages']].map(x=>({label:x[0],go:()=>A.go(x[1])})),
    mTabs:mob&&isV,tabs:[['home','मुख्य','/'],['series','श्रृंखलाएँ','/series'],['podcast','पॉडकास्ट','/podcast'],['books','पुस्तकें','/books'],['live','लाइव','/live']].map(x=>{const a=destOf===x[0];return{label:x[1],icon:TABIC[x[0]],col:a?'var(--gold)':'var(--ink2)',fill:a&&(x[0]==='home'||x[0]==='series')?'currentColor':'none',go:()=>A.go(x[2])}}),
    hasMini:showMini,miniBottom:mob?'calc(76px + env(safe-area-inset-bottom))':'20px',
    mini:pl?{img:`art/16x9/${pl.sid==='podcast'?D().PE[pl.p].img:pl.sid}.jpg`,title:V.epTitle(pl.sid,pl.p,pl.e),sub:D().SR[pl.sid].n,icon:pl.playing?V.IC.pause:V.IC.play,pct:(pl.t/D().L*100).toFixed(1)+'%',
      open:()=>A.go(`/watch/${pl.sid}/${pl.p}/${pl.e}`),toggle:()=>{pl.playing=!pl.playing;A.up()},close:()=>{pl.playing=false;A.miniOn=false;A.up()}}:{},
    present:A.present,hudBottom:mob?'calc(78px + env(safe-area-inset-bottom))':'24px',exitPresent:()=>A.setPresent(false),
    pres:{num:(Math.max(ppath,0)+1)+' / '+A.PRES.length,label:pg.label||'',segs:A.PRES.map((p,i)=>({label:p,w:i===ppath?'34px':'14px',bg:i===ppath?'var(--gold)':'var(--dot)',go:()=>{A.dir=i>ppath?1:-1;A.go(p)}}))},
    drawer:A.drawer,sides:sideList.map(x=>({label:x[1],bg:r.side===x[0]?'var(--gold)':'transparent',col:r.side===x[0]?'var(--goldInk)':'var(--ink)',go:()=>{A.drawer=false;A.go(x[2])}})),
    togglePresent:()=>A.setPresent(!A.present),presTrack:A.present?'var(--gold)':'var(--bg3)',presKnob:A.present?'25px':'3px',
    dItems:dItems.map(x=>({label:x[0],go:()=>{A.drawer=false;A.go(x[1])},col:r.path===x[1]?'var(--gold)':'var(--ink)'})),
    thDk:{bg:theme==='dark'?'var(--gold)':'transparent',col:theme==='dark'?'var(--goldInk)':'var(--ink)'},thLt:{bg:theme==='light'?'var(--gold)':'transparent',col:theme==='light'?'var(--goldInk)':'var(--ink)'},
    setDark:()=>{A.theme='dark';A.up()},setLight:()=>{A.theme='light';A.up()},
    demoT:[['ऑफ़लाइन अवस्था',db.offline,()=>{db.offline=!db.offline;A.up()}],['सूचियों में त्रुटि अवस्था',db.errDemo,()=>{db.errDemo=!db.errDemo;A.up()}],['दर्शक : प्रवेश किया हुआ',db.signed,()=>{if(db.signed){db.signed=false}else A.signIn();A.up()}]].map(x=>Object.assign({label:x[0],go:x[2]},tog(x[1]))),
    goSitemap:()=>{A.drawer=false;A.go('/pages')},replayLaunch:()=>{A.drawer=false;A.launch=true;A.up();setTimeout(()=>V.launchAnim(A),60)},
    sheet:!!A.sheet,sh:shObj,closeSheet:()=>{A.sheet=null;A.up()},
    panel:!!A.panel,pn:{kind:pn.kind||'',title:pn.title||'',hasImg:!!pn.img,ar:pn.ar||'16/9',hasSrc:!!pn.src,noSrc:!pn.src,src:pn.src||'',imgLabel:pn.imgLabel||'नमूना चित्र',fs:pn.fs||'16px',ps:(pn.ps||[]).map(t=>({t}))},closePanel:()=>{A.panel=null;A.up()},
    lightbox:!!A.lb,lb,
    share:!!A.share,shr:{card:!!shr.card,text:shr.text||'',sub:shr.sub||'',title:shr.title||'',opts:[['WhatsApp पर भेजें','WhatsApp'],['Instagram पर साझा करें','Instagram'],['लिंक कॉपी करें','link']].map(o=>({label:o[0],go:()=>{if(o[1]==='link'){try{navigator.clipboard.writeText(location.href)}catch(e){}A.share=null;A.say('लिंक कॉपी हो गया')}else{A.share=null;A.say(o[1]+' के लिए साझा करने का नमूना')}}}))},closeShare:()=>{A.share=null;A.up()},
    hasToast:!!A.toast,toast:A.toast,toastBottom:mob?'calc(90px + env(safe-area-inset-bottom))':'90px',
    launch:A.launch,skipLaunch:()=>V.endLaunch(A)};
  return V.renderX?V.renderX(c,OUT):OUT;
};
V.epTitle=(sid,p,e)=>sid==='geeta-amrit'?D().QS[p]:sid==='podcast'?D().PE[p].n+' : एपिसोड '+(e+1):'एपिसोड '+(e+1);
V.searchAll=(A,q)=>{const d=D(),db=A.db,m=s=>s&&s.toLowerCase().includes(q.toLowerCase()),out=[];
  d.ORDER.concat(['podcast','tapodhara']).forEach(id=>{const s=d.SR[id];if(m(s.n)||m(s.subj))out.push({type:'series',name:s.n,kind:'श्रृंखला',img:id==='tapodhara'?'art/books/tapodhara-madhyapradesh.jpg':`art/1x1/${id}.jpg`,id,go:()=>A.go('/series/'+id)})});
  d.ORDER.concat(['podcast']).forEach(id=>d.SR[id].parts.forEach((p,i)=>{if(p.eps&&m(p.name))out.push({type:'episode',name:V.epTitle(id,i,0),sub:d.SR[id].n+' · '+p.name,kind:'एपिसोड',img:`art/16x9/${id==='podcast'?d.PE[i].img:id}.jpg`,go:()=>A.play(id,i,0)})}));
  if(/एपिसोड|\d/.test(q))d.ORDER.slice(0,4).forEach(id=>{const i=d.SR[id].parts.findIndex(p=>p.eps);if(i>=0&&m(V.epTitle(id,i,0)))out.push({type:'episode',name:V.epTitle(id,i,0),sub:d.SR[id].n,kind:'एपिसोड',img:`art/16x9/${id}.jpg`,go:()=>A.play(id,i,0)})});
  d.PEOPLE.forEach(p=>{if(m(p.name)||m(p.cat))out.push({type:'person',name:p.name,kind:'व्यक्तित्व',img:'art/hero/placeholder-hero.jpg',go:()=>A.go('/person/'+p.id)})});
  d.GUESTS.forEach(g=>{if(m(g.name))out.push({type:'person',name:g.name,kind:'अतिथि',img:'art/1x1/podcast.jpg',go:()=>A.go('/guest/'+g.id)})});
  d.EV.forEach(e=>{const ed=d.PE[e.ed];if(m(ed.n)||m('आयोजन'))out.push({type:'event',name:ed.n,kind:'आयोजन',img:`art/1x1/${ed.img}.jpg`,go:()=>A.go('/event/'+e.id)})});
  d.BK.forEach(b=>{if(m(b.n)||m(b.s)||m(b.subj))out.push({type:'book',name:b.n,kind:'पुस्तक',img:`art/books/${b.img}.jpg`,go:()=>A.go('/book/'+b.id)})});
  V.channels(A).forEach(c=>{if(m(c.n)||m(c.k))out.push({type:'channel',name:c.n,kind:'चैनल',img:'assets/emblem-mark.png',go:()=>A.go('/channel/'+c.id)})});
  return out};
V.channels=A=>{const d=D(),db=A.db,l=d.CH.slice();if(db.creator.status==='approved')l.push({id:'me',n:db.channel.name||db.creator.name||'आपका चैनल',k:db.creator.type==='संस्थान'?'संस्थान':'रचनाकार',type:db.creator.type==='संस्थान'?'संस्थान':'रचनाकार'});return l};
V.published=A=>A.db.subs.filter(s=>s.status==='approved');
})();
