(function(){
const V=window.VBN=window.VBN||{};
const boot=()=>{if(!(V.D&&V.mount&&V.viewer&&V.studio&&V.sidesReady&&V.I&&V.render&&V.norm)){setTimeout(boot,30);return}apply();V.ready=true};
function apply(){
const d=()=>V.D,act=(...a)=>V.act(...a),IC=V.IC,P=V.viewer,I=V.I,it=V.it,hd=V.hd,cards=V.cards;
const SR=id=>d().SR[id],img=(id,k)=>`art/${k}/${id}.jpg`,pct=v=>(Math.max(0,Math.min(1,v||0))*100).toFixed(1)+'%';
const epImg=(sid,p)=>sid==='podcast'?img(d().PE[p].img,'16x9'):img(sid,'16x9');
const firstEp=sid=>{const ps=SR(sid).parts;const i=ps.findIndex(p=>p.eps>0);return i<0?null:[i,0]};
const sitems=A=>A.db.seriesOrder.filter(id=>SR(id));
const filt=(A,k,def)=>A.f[k]===undefined?def:A.f[k];
const resume=(A,sid)=>()=>{const k=A.db.hist.find(h=>h.startsWith(sid+'|'));if(k){const [,p,e]=k.split('|');A.play(sid,+p,+e)}else{const f=firstEp(sid);if(f)A.play(sid,f[0],f[1]);else A.go('/series/'+sid)}};
const tall=A=>A.mob?'auto':'calc(100svh - clamp(72px,5.4vw,90px))';
const MON=['जनवरी','फ़रवरी','मार्च','अप्रैल','मई','जून','जुलाई','अगस्त','सितंबर','अक्टूबर','नवंबर','दिसंबर'],WD=['रविवार','सोमवार','मंगलवार','बुधवार','गुरुवार','शुक्रवार','शनिवार'];
const X={mail:'M3.5 6.5h17v11h-17zM3.5 7l8.5 6.5L20.5 7',lock:'M6 10.5h12v10H6zM8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5',phone:'M8 3.5h8v17H8zM11 17.5h2',eye:'M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12zM12 14.8a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6z',eyeOff:'M3.5 3.5l17 17M10 5.8a9.6 9.6 0 0 1 2-.3c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-2.6 3.4M6.5 7.2C3.9 8.9 2.5 12 2.5 12s3.5 6.5 9.5 6.5a9 9 0 0 0 4.4-1.1',pin:'M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11zM12 12.3a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6z',user:IC.user,globe:'M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM3.5 12h17M12 3.5c2.5 2.6 3.5 5.4 3.5 8.5s-1 5.9-3.5 8.5c-2.5-2.6-3.5-5.4-3.5-8.5s1-5.9 3.5-8.5z',
  hist:'M4 12a8 8 0 1 0 2.4-5.7M4 4.5v4h4M12 8v4.5l3 2',list:'M8 6.5h12M8 12h12M8 17.5h12M4 6.5h.01M4 12h.01M4 17.5h.01',shield:'M12 3.5l7 3v5.5c0 4.2-3 7.5-7 8.5-4-1-7-4.3-7-8.5V6.5z',help:'M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM9.6 9.5a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2.2-2.4 3.6M12 17h.01',
  gear:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 13.5l1.6 1.2-2 3.4-1.9-.7a7 7 0 0 1-2 1.2l-.3 2h-4l-.3-2a7 7 0 0 1-2-1.2l-1.9.7-2-3.4 1.6-1.2a7 7 0 0 1 0-3L2.6 9.3l2-3.4 1.9.7a7 7 0 0 1 2-1.2l.3-2h4l.3 2a7 7 0 0 1 2 1.2l1.9-.7 2 3.4-1.6 1.2a7 7 0 0 1 0 3z',grid:'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',users:'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20a6.5 6.5 0 0 1 13 0M16 4.3a3.5 3.5 0 0 1 0 6.4M18 14a6.5 6.5 0 0 1 3.5 6',
  upload:'M12 16V4M7 9l5-5 5 5M4 16v4h16v-4',chart:'M5 20V11M11 20V5M17 20v-6M3 20.5h18',trend:'M3.5 17l5-5 4 4 8-8M15 8h5.5v5.5',checkc:'M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM8 12.3l2.7 2.7L16 9.5',mega:'M4 10v4h3l7 4V6L7 10zM17.5 9a4 4 0 0 1 0 6',tag:'M3.5 12.5V4h8.5l8.5 8.5-8 8zM8 8.5h.01',film:'M4 5h16v14H4zM10 9.5v5l4.5-2.5z',
  layout:'M4 5h16v14H4zM4 10h16M10 10v9',book:'M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5zM12 6.5v13',mic:'M12 3.5a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0v-5a3 3 0 0 0-3-3zM5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3',home:'M3.5 11 12 4l8.5 7v8.5a1 1 0 0 1-1 1H15v-6h-6v6H4.5a1 1 0 0 1-1-1z',
  ring:'M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',feather:'M20 4c-7 0-12 4.5-13 12l-2.5 4M7 16c5 0 9-3 10-8M10.5 12.5H15',award:'M12 14.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM8.5 13.5 7 20.5l5-2.5 5 2.5-1.5-7',free:'M20.5 12.5 12 21l-8.5-8.5V3.5h9z M8 8h.01',clock:'M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM12 7.5V12l3 2',lang:'M4 5h9M8.5 3v2M6 5c.5 3.5 3 6.5 6 8M11 5c-.5 4-3.5 7.5-7 9M13 20l4-9 4 9M14.5 17h5'};
V.X=X;
d().HOMEROWS.forEach(r=>{if(r[0]==='orig')r[1]='वीर भारत की प्रस्तुति'});
V.badge=k=>({ok:['var(--okBg)','var(--ok)','var(--ok)'],warn:['var(--wBg)','var(--wInk)','var(--wInk)'],bad:['var(--badBg)','var(--red)','var(--red)'],live:['#C8361F','#fff','#C8361F'],n:['var(--chip)','var(--ink2)','var(--line)']})[k||'n'];
const EVL={live:'लाइव',next:'आगामी',past:'संपन्न',tba:'तिथि शीघ्र'},EVB={live:'live',next:'warn',past:'n',tba:'n'};
const dparts=s=>{if(!s)return{day:'—',mon:'शीघ्र'};const x=new Date(s);return{day:String(x.getDate()),mon:MON[x.getMonth()]}};
const epsCount=id=>SR(id).parts.reduce((a,p)=>a+p.eps,0);

// ---------- norm / render / mount wrappers
const NEW=['spot','bento','evstrip','reel','tracks','shelf','bookD','sgrid','searchbar','tiles','acct','profile','doc','feat','split','geetaF','parv','research'];
V.normX=(A,o)=>{NEW.forEach(t=>o['is'+t[0].toUpperCase()+t.slice(1)]=o.t===t);
  o.minH=o.minH||'auto';o.jc=o.jc||'flex-start';o.secBg=o.secBg||'none';o.secPad=o.secPad||'0';
  if(o.t==='eps'){const mob=A.mob;o.showNum=!mob;o.epCols=mob?'128px minmax(0,1fr)':'40px clamp(170px,16vw,250px) minmax(0,1fr) 44px';
    o.items=(o.items||[]).map((e,k)=>Object.assign({num:String(k+1),dur:V.fmt(d().L),desc:'इस एपिसोड का संक्षिप्त परिचय यहाँ आएगा। यह नमूना पाठ है।',isNow:e.bd==='var(--gold)',numCol:e.bd==='var(--gold)'?'var(--gold)':'var(--ink3)'},e))}
  if(A.r.side!=='v'){o.tfs='19px';if(o.t==='head'){o.fs='26px';o.pad='4px'}}
  return o};
const STG={'/studio/upload':'सामग्री','/studio/channel':'चैनल'},ADG={'/admin/series':'सामग्री','/admin/creators':'रचनाकार और समीक्षा','/admin/campaigns':'विज्ञापन','/admin/push':'संचालन'};
const NI={'/studio':X.grid,'/studio/upload':X.upload,'/studio/details/new':X.tag,'/studio/submissions':X.clock,'/studio/content':X.film,'/studio/channel':X.user,'/studio/analytics':X.chart,'/studio/status':X.checkc,'/studio/register':X.shield,
  '/admin':X.grid,'/admin/series':X.film,'/admin/episodes':X.list,'/admin/upload':X.upload,'/admin/home':X.home,'/admin/premiere':IC.star,'/admin/events':IC.cal,'/admin/live':IC.live,'/admin/books':X.book,'/admin/people':X.users,'/admin/creators':X.shield,'/admin/review':X.checkc,'/admin/campaigns':X.mega,'/admin/adspots':X.layout,'/admin/adreport':X.chart,'/admin/push':IC.bell,'/admin/analytics':X.trend,'/admin/users':X.users,'/admin/log':X.hist,'/admin/settings':X.gear};
const HEADS=new Set(Object.values(STG).concat(Object.values(ADG)));
const dec=(list,G)=>{const out=[];list.forEach(x=>{if(G[x.path])out.push({isHead:true,isItem:false,label:G[x.path],go:null,hasBadge:false,badge:'',icon:'',bg:'',col:'',ic:'',fw:''});const on=x.bg==='var(--gold)';
  out.push(Object.assign({},x,{isHead:false,isItem:true,icon:NI[x.path]||X.grid,bg:on?'#EEF4FF':'transparent',col:on?'#1D4ED8':'#344054',ic:on?'#1D4ED8':'#667085',fw:on?'800':'600'}))});return out};
if(!V.studioNav.dec){const sn0=V.studioNav,an0=V.adminNav;V.studioNav=A=>dec(sn0(A),STG);V.adminNav=A=>dec(an0(A),ADG);V.studioNav.dec=1}
const newAuth=(mode,reason,after)=>({mode,reason:reason||'',after:after||null,done:false,pw:false,rem:true,agree:false,agErr:false,otp:false,sent:false,err:'',F:{email:'',pw:'',name:'',mobile:'',region:'मध्यप्रदेश',otp:''},E:{}});
V.newAuth=newAuth;
const auB=A=>{const a=A.auth,db=A.db,mob=A.mob,F=a.F,E=a.E,isIn=a.mode==='in';
  const onRoute=()=>A.r.page==='signin'||A.r.page==='signup';
  const finish=()=>{const af=a.after;A.auth=null;A.up();if(onRoute())A.go('/');af&&setTimeout(af,60)};
  const done=(isNew,name)=>{A.signIn(name);if(isNew){a.done=true;A.auth=a;A.up()}else{A.say('प्रवेश हो गया');finish()}};
  const inp=(k,label,icon,o)=>Object.assign({label,icon,value:F[k],onChange:e=>{F[k]=e.target.value;delete E[k];a.err='';A.up()},type:'text',ph:'',ac:'off',span:'auto',isInput:true,isSelect:false,hasPrefix:false,hasEye:false,eye:null,eyeIcon:'',pl:'44px',pr:'14px',options:[],err:E[k]||'',hasErr:!!E[k],bd:E[k]?'var(--red)':'var(--line)'},o||{});
  const pwF=()=>inp('pw','पासवर्ड',X.lock,{type:a.pw?'text':'password',ph:'कम से कम 6 अक्षर',ac:isIn?'current-password':'new-password',hasEye:true,eye:()=>{a.pw=!a.pw;A.up()},eyeIcon:a.pw?X.eyeOff:X.eye,pr:'48px',span:'1 / -1'});
  const mobF=o=>inp('mobile','मोबाइल नंबर',X.phone,Object.assign({type:'tel',ph:'10 अंक',ac:'tel',hasPrefix:true,pl:'82px'},o||{}));
  const google={label:'Google से',icon:X.globe,ic:'#4285F4',go:()=>done(false)};
  let fields,submitL,submit,social;
  if(isIn){social=[{label:a.otp?'ईमेल से':'मोबाइल OTP',icon:a.otp?X.mail:X.phone,ic:'var(--gold)',go:()=>{a.otp=!a.otp;a.sent=false;a.err='';a.E={};A.up()}},google];
    if(a.otp){fields=[mobF({span:'1 / -1'})].concat(a.sent?[inp('otp','OTP',X.lock,{type:'tel',ph:'6 अंकों का कोड',span:'1 / -1',ac:'one-time-code'})]:[]);submitL=a.sent?'प्रवेश करें':'OTP भेजें';
      submit=()=>{if(!/^\d{10}$/.test(F.mobile)){E.mobile='10 अंकों का मोबाइल नंबर लिखें';A.up();return}if(!a.sent){a.sent=true;A.say('OTP भेजा गया (डेमो : कोई भी 6 अंक चलेंगे)');A.up();return}if(!/^\d{6}$/.test(F.otp)){E.otp='6 अंकों का OTP लिखें';A.up();return}db.user.mobile=F.mobile;done(false)}}
    else{fields=[inp('email','ईमेल',X.mail,{type:'email',ph:'name@example.in',ac:'email',span:'1 / -1'}),pwF()];submitL='प्रवेश करें';
      submit=()=>{if(!V.okEmail(F.email))E.email='सही ईमेल लिखें';if((F.pw||'').length<6)E.pw='पासवर्ड कम से कम 6 अक्षरों का हो';if(Object.keys(E).length){a.err='ईमेल या पासवर्ड जाँचें। डेमो में कोई भी ईमेल और 6 अक्षरों का पासवर्ड चलेगा।';A.up();return}db.user.email=F.email;done(false,F.email.split('@')[0])}}}
  else{social=[google,{label:'मोबाइल OTP',icon:X.phone,ic:'var(--gold)',go:()=>{a.mode='in';a.otp=true;a.E={};A.up()}}];
    fields=[inp('name','पूरा नाम',X.user,{ph:'आपका नाम',ac:'name',span:'1 / -1'}),inp('email','ईमेल',X.mail,{type:'email',ph:'name@example.in',ac:'email',span:'1 / -1'}),mobF(),inp('region','राज्य या देश',X.pin,{isInput:false,isSelect:true,options:d().STATES.map(x=>({v:x,l:x}))}),pwF()];
    submitL='खाता बनाएँ';submit=()=>{if(F.name.trim().length<2)E.name='नाम लिखें';if(!V.okEmail(F.email))E.email='सही ईमेल लिखें';if(!/^\d{10}$/.test(F.mobile))E.mobile='10 अंकों का मोबाइल नंबर लिखें';if((F.pw||'').length<6)E.pw='कम से कम 6 अक्षर';a.agErr=!a.agree;A.up();
      if(Object.keys(E).length||!a.agree)return;Object.assign(db.user,{name:F.name.trim(),email:F.email,mobile:F.mobile,region:F.region});A.log&&A.log('नया खाता बना');done(true,F.name.trim())}}
  return{cols:mob?'1fr':'minmax(0,.92fr) minmax(0,1fr)',art:!mob,mobLogo:mob,r:mob?'0':'18px',pad:mob?'0':'24px',
    perks:['जहाँ छोड़ा था, वहीं से आगे देखें','मेरी सूची और डाउनलोड हर उपकरण पर','नए एपिसोड और आयोजनों की सूचना'].map(t=>({t})),
    tabs:[['in','प्रवेश करें'],['up','नया खाता']].map(([m,l])=>({label:l,go:()=>{a.mode=m;a.err='';a.E={};a.done=false;A.up()},bg:a.mode===m?'var(--gold)':'transparent',col:a.mode===m?'var(--goldInk)':'var(--ink2)'})),
    done:a.done,form:!a.done,doneT:'खाता बन गया',doneS:'स्वागत है, '+(db.user.name||'')+'। अब आपकी प्रगति, सूची और सूचनाएँ सहेजी जाएँगी।',finish,
    title:isIn?'फिर से स्वागत है':'नया खाता बनाएँ',sub:isIn?(a.reason?a.reason+' इसके लिए प्रवेश करें।':'अपनी प्रगति, सूची और सूचनाएँ हर उपकरण पर पाएँ।'):'एक मिनट में खाता बनाएँ। देखना हमेशा निःशुल्क है।',
    hasErr:!!a.err,err:a.err,social,or:'या',fields,fcols:mob?'1fr':'1fr 1fr',isIn,isUp:!isIn,
    rem:a.rem,remBg:a.rem?'var(--gold)':'transparent',remBd:a.rem?'var(--gold)':'var(--outline)',toggleRem:()=>{a.rem=!a.rem;A.up()},forgot:()=>{A.auth=null;A.go('/reset')},
    agree:a.agree,agBg:a.agree?'var(--gold)':'transparent',agBd:a.agErr&&!a.agree?'var(--red)':a.agree?'var(--gold)':'var(--outline)',hasAgErr:a.agErr&&!a.agree,toggleAgree:()=>{a.agree=!a.agree;A.up()},
    submit,submitL,altQ:isIn?'नया खाता नहीं है?':'पहले से खाता है?',altL:isIn?'खाता बनाएँ':'प्रवेश करें',alt:()=>{a.mode=isIn?'up':'in';a.err='';a.E={};A.up()}}};
V.renderX=(c,o)=>{const A=c.app;if(!A)return o;const isSide=A.r.side!=='v',db=A.db;
  if(isSide){o.theme='panel';o.dItems=o.dItems.filter(x=>!HEADS.has(x.label))}
  o.pTop=isSide&&!A.mob;o.pNotif=()=>A.say('पैनल सूचनाएँ (नमूना)');
  o.sideUser=A.r.side==='s'?{init:(db.creator.name||'र')[0],name:db.creator.name||'रचनाकार (नमूना)',role:'रचनाकार'}:{init:'ए',name:'एडमिन (नमूना)',role:'सुपर एडमिन'};
  o.auth=!!A.auth;o.au=A.auth?auB(A):{cols:'1fr',perks:[],tabs:[],social:[],fields:[]};
  o.closeAuth=()=>{const on=A.r.page==='signin'||A.r.page==='signup';A.auth=null;A.up();if(on)A.go('/')};
  return o};
V.mountX=c=>{const A=c.app;
  A.need=(reason,after)=>{if(A.db.signed){after&&after();return}A.auth=newAuth('in',reason,after);A.up()};
  A.openAuth=m=>{A.auth=newAuth(m||'in');A.up()};
  A.onK2=e=>{if(e.key==='Escape'&&A.auth){A.auth=null;A.up()}};window.addEventListener('keydown',A.onK2);
  if((A.r.page==='signin'||A.r.page==='signup')&&!A.db.signed){A.auth=newAuth(A.r.page==='signin'?'in':'up');A.up()}};
const oe=V.onEnter;V.onEnter=(A,r)=>{oe&&oe(A,r);if((r.page==='signin'||r.page==='signup')&&!A.db.signed)A.auth=newAuth(r.page==='signin'?'in':'up')};

// ---------- shared items
const sItem=(A,id)=>{const S=SR(id);if(S.upcoming)return{go:()=>A.go('/series/'+id),img:'art/books/tapodhara-madhyapradesh.jpg',hasImg:true,ph:false,phLabel:'',name:S.n,by:'वीर भारत न्यास',vbn:true,verified:false,hasMeta:true,meta:'आगामी शृंखला',hasBadge:true,badge:'आगामी'};
  return{go:()=>A.go('/series/'+id),img:img(id,'16x9'),hasImg:true,ph:false,phLabel:'',name:S.n,by:'वीर भारत न्यास',vbn:true,verified:false,hasMeta:true,meta:S.u+' · '+epsCount(id)+' एपिसोड',hasBadge:false,badge:''}};
const cItem=(A,c)=>{const ch=V.channels(A).find(x=>x.id===c.ch)||{};return{go:()=>A.go('/channel/'+c.ch),img:'',hasImg:false,ph:true,phLabel:'उदाहरण',name:c.n,by:ch.n||'',vbn:false,verified:true,hasMeta:true,meta:c.type+' · '+c.subj,hasBadge:false,badge:''}};
const sgridB=o=>Object.assign({t:'sgrid',minW:'300px',gpad:'clamp(6px,1vw,14px)',hasFilter:false,top:'0',pubs:[],sels:[],hasClear:false,clear:null,count:'',sort:{label:'',value:'',options:[],onChange:null,bd:'var(--line)'},emptyTitle:'',emptyText:''},o,{isEmpty:!(o.items&&o.items.length)});
const relatedB=(A,id)=>sgridB({title:'संबंधित श्रृंखलाएँ',more:()=>A.go('/series'),items:sitems(A).filter(x=>x!==id).slice(0,4).map(x=>sItem(A,x))});
const RT=[['दस्तावेज़',IC.doc,'#E0A23F','rgba(224,162,63,.15)','12 पृष्ठ','एपिसोड से जुड़ा शोध लेख, संदर्भ टिप्पणियों के साथ।'],['स्रोत',IC.src,'#6FA8DC','rgba(111,168,220,.15)','3 संदर्भ','मूल ग्रंथ और अभिलेख, जिन पर एपिसोड आधारित है।'],['चित्र',IC.img,'#6FB27A','rgba(111,178,122,.15)','8 चित्र','दृश्य संदर्भ : स्थल, शिल्प और पांडुलिपियाँ।'],['मानचित्र',IC.map,'#D9886A','rgba(217,136,106,.15)','1 मानचित्र','कथा से जुड़े स्थानों का मानचित्र।']];
const resItems=(A,ctx)=>RT.map((x,i)=>({kind:x[0],icon:x[1],col:x[2],tint:x[3],meta:x[4],title:'शोध सामग्री '+(i+1),desc:x[5],cta:'पढ़ें',
  go:()=>{A.panel={kind:x[0]+' · '+ctx,title:'शोध सामग्री '+(i+1),img:x[0]==='चित्र'||x[0]==='मानचित्र',ar:x[0]==='मानचित्र'?'4/3':'16/9',imgLabel:'नमूना '+x[0],ps:['यह '+x[0]+' का नमूना पाठ है। वास्तविक शोध सामग्री जुड़ने पर यहाँ पढ़ी जा सकेगी।','स्रोत, संदर्भ और टिप्पणियाँ इसी पैनल में खुलती हैं, पृष्ठ छोड़े बिना।']};A.up()}}));
const researchB=(A,ctx)=>({t:'research',title:'शोध सामग्री',tag:'नमूना',lead:'एपिसोड के पीछे का शोध। हर सामग्री पृष्ठ छोड़े बिना पैनल में खुलती है।',items:resItems(A,ctx)});
const SPINE=['linear-gradient(90deg,#3B2410,#7A5124 50%,#3B2410)','linear-gradient(90deg,#14304A,#2E5E86 50%,#14304A)','linear-gradient(90deg,#4A1410,#8A2E22 50%,#4A1410)','linear-gradient(90deg,#183A24,#2F6B44 50%,#183A24)','linear-gradient(90deg,#3A2A10,#86662A 50%,#3A2A10)'];
const bookIt=(A,b,i,big)=>{const land=b.ar>1.2;return{go:()=>A.go('/book/'+b.id),img:`art/books/${b.img}.jpg`,hasImg:true,ph:false,phLabel:'',ar:String(b.ar),name:b.n,hasSub:!!(b.vols||b.s),sub:b.vols?'2 खंड · '+(b.s||''):(b.s||''),spine:SPINE[i%SPINE.length],
  bh:big?(A.mob?(land?'220px':'300px'):(land?'clamp(260px,24vw,380px)':'clamp(340px,32vw,500px)')):(A.mob?(land?'130px':'170px'):(land?'clamp(150px,13vw,200px)':'clamp(200px,17vw,260px)'))}};
const shelfB=(A,items,o)=>Object.assign({t:'shelf',shH:A.mob?'170px':'clamp(200px,17vw,260px)',rot:'26deg',wall:'radial-gradient(70% 120% at 50% 0%,rgba(242,188,79,.09),rgba(242,188,79,0) 70%)',wallPad:'0',items},o||{});
const sampleRead=(A,b)=>()=>{A.panel={kind:'नमूना पठन',title:b.n,img:true,src:`art/books/${b.img}.jpg`,ar:String(b.ar),fs:'18px',ps:['पुस्तक का नमूना पाठ, पृष्ठ 1।','यह पठन दृश्य दिखाता है कि पुस्तक मंच के भीतर कैसे पढ़ी जा सकेगी। वास्तविक पाठ जुड़ने पर यहाँ आएगा।','नमूना पाठ, पृष्ठ 2।','नमूना पाठ, पृष्ठ 3।']};A.up()};
const bookD=(A,b,o)=>{const D=d(),i=D.BK.indexOf(b);return Object.assign({t:'bookD',rot:'24deg',cols:A.mob?'1fr':'minmax(0,1fr) minmax(0,1.05fr)',minH2:A.mob?'auto':'calc(100svh - clamp(72px,5.4vw,90px) - 60px)',hasBack:false,hasPick:false,pick:[],
  c:Object.assign(bookIt(A,b,i,true),{hasSub:!!b.s,sub:b.s||'',desc:'पुस्तक का विस्तृत परिचय यहाँ आएगा: विषय, लेखन की पृष्ठभूमि और यह किसके लिए है। यह नमूना पाठ है।',chips:[b.subj].concat(b.vols?b.vols.map(v=>v.v+' : '+v.r):[]).concat(['वीर भारत न्यास']).map(t=>({t}))}),
  acts:[act('नमूना पढ़ें',sampleRead(A,b),'p'),act('प्रति प्राप्त करें',()=>A.say('प्रति प्राप्त करने का तरीका अभी तय होना है'))]},o||{})};
const docB=(A,o)=>{const secs=(o.secs||[]).map((s,i)=>({id:'sec-'+i,n:String(i+1),h:s.h,ps:(s.p||[]).map(t=>({t})),hasList:!!(s.l&&s.l.length),list:(s.l||[]).map(t=>({t})),hasNote:!!s.note,note:s.note||''}));
  const toc=secs.length>2&&!A.mob&&o.toc!==false;
  return Object.assign({t:'doc',hasHead:true,crumb:'',dtitle:'',dsub:'',meta:[],bpad:'clamp(28px,3vw,48px)'},o,{secs,hasBody:secs.length>0,hasSub:!!o.dsub,hasMeta:!!(o.meta&&o.meta.length),meta:(o.meta||[]).map(t=>({t})),hasToc:toc,cols:toc?'240px minmax(0,1fr)':'minmax(0,1fr)',
    toc:secs.map(s=>({n:s.n,label:s.h,go:()=>{const el=document.getElementById(s.id);el&&window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-110,behavior:'smooth'})}}))})};
const splitB=(A,o)=>Object.assign({t:'split',spad:'0',cols:A.mob?'1fr':'minmax(0,1fr) minmax(0,1fr)',minH2:'auto',mOrder:'0',tOrder:'1',hasImg:false,img:'',ar:'4/3',imgBg:'var(--bg3)',imgW:'100%',fit:'cover',hasCollage:false,collage:[],hasEyebrow:false,eyebrow:'',h:'',hfs:'clamp(34px,3.6vw,62px)',ps:[],hasPoints:false,points:[],hasActs:false,acts:[]},o,{hasImg:!!o.img,hasCollage:!!(o.collage&&o.collage.length),hasEyebrow:!!o.eyebrow,hasPoints:!!(o.points&&o.points.length),hasActs:!!(o.acts&&o.acts.length),ps:(o.ps||[]).map(t=>({t}))},A.mob?{mOrder:'0',tOrder:'1'}:{});
const featB=(o)=>Object.assign({t:'feat',minW:'240px'},o,{items:o.items.map(x=>Object.assign({hasGo:!!x.go,goL:x.goL||'',go:x.go||null},x))});

// ---------- home
const spotB=A=>{const ids=sitems(A),mob=A.mob;let s=A.sel.spot??0;if(s>=ids.length)s=0;const pick=i=>{if(A.sel.spot!==i){A.sel.spot=i;A.up()}};
  const items=ids.map((id,i)=>{const on=i===s;return{name:SR(id).n,sub:SR(id).u,subCol:on?'var(--eyebrow)':'var(--ink3)',img:img(id,'1x1'),hasImg:true,ph:false,init:'',bd:on?'var(--gold)':'transparent',bg:on?'var(--bg3)':'transparent',dotBg:on?'var(--gold)':'var(--chip)',dotCol:on?'var(--goldInk)':'var(--ink3)',hover:mob?null:()=>pick(i),go:()=>{if(mob&&!on){pick(i);return}A.go('/series/'+id)}}});
  items.push({name:'तपोधरा',sub:'आगामी शृंखला',subCol:'var(--ink3)',img:'',hasImg:false,ph:true,init:'त',bd:'transparent',bg:'transparent',dotBg:'var(--chip)',dotCol:'var(--ink3)',hover:null,go:()=>A.go('/series/tapodhara')});
  const id=ids[s],S=SR(id);
  return{t:'spot',id:'row-orig',title:'वीर भारत की प्रस्तुति',more:()=>A.go('/series'),moreLabel:'सभी श्रृंखलाएँ',minH:tall(A),jc:'center',cols:mob?'1fr':'minmax(0,1.7fr) minmax(300px,1fr)',listMax:mob?'none':'clamp(340px,40vw,640px)',
    slides:ids.map((x,i)=>({img:img(x,'16x9'),op:i===s?1:0})),cur:{name:S.n,desc:S.d,meta:S.u,play:resume(A,id),go:()=>A.go('/series/'+id)},items}};
const bentoB=A=>{const mob=A.mob,L=d().L;const l=['mahadev','mahajanpad','hamare-ram','sadanira','geeta-amrit'].map(id=>{const f=firstEp(id);return{sid:id,p:f[0],e:f[1]}});
  return{t:'bento',id:'row-new',title:'नए एपिसोड',tag:'नमूना एपिसोड',minH:mob?'auto':'auto',cols:mob?'1fr 1fr':'repeat(4,minmax(0,1fr))',
    items:l.map((x,i)=>{const big=i===0;return{go:()=>A.play(x.sid,x.p,x.e),img:epImg(x.sid,x.p),badge:'नया',series:SR(x.sid).n,name:V.epTitle(x.sid,x.p,x.e)+' · '+SR(x.sid).parts[x.p].name,meta:V.fmt(L)+' मिनट · नमूना',
      span:big?(mob?'1 / -1':'span 2'):'auto',rspan:big&&!mob?'span 2':'auto',ar:big&&!mob?'auto':'16/9',pad:big?'clamp(16px,2vw,28px)':'10px 12px',pb:big?'56px':'34px',fs:big?'clamp(20px,1.8vw,28px)':'15px'}})}};
const evB=A=>{const D=d(),db=A.db,mob=A.mob;const rank={live:0,next:1,tba:2,past:3};const evs=D.EV.map(e=>({e,st:V.evSt(A,e),dt:db.evDates[e.id]||''})).sort((a,b)=>rank[a.st]-rank[b.st]||(a.dt||'9').localeCompare(b.dt||'9'));
  const f=evs[0],ed=D.PE[f.e.ed],fp=dparts(f.dt),fb=V.badge(EVB[f.st]),rem=!!db.remind[f.e.id];
  return{t:'evstrip',id:'row-live',title:'लाइव और आगामी आयोजन',minH:tall(A),jc:'center',cols:mob?'1fr':'minmax(0,1.5fr) minmax(320px,1fr)',allGo:()=>A.go('/events'),
    f:{img:img(ed.img,'16x9'),day:fp.day,mon:fp.mon,badge:EVL[f.st],bBg:fb[0],bCol:fb[1],bBd:fb[2],eyebrow:f.st==='live'?'अभी लाइव':f.st==='past'?'हाल का आयोजन':'अगला आयोजन',name:ed.n,sub:'वीर भारत न्यास का आयोजन · '+V.dfmt(f.dt),
      b1L:f.st==='live'?'लाइव देखें':rem?'याद दिलाना चालू':'याद दिलाएँ',b1Go:f.st==='live'?()=>A.go('/live'):()=>A.need('याद दिलाने के लिए',()=>{db.remind[f.e.id]=!db.remind[f.e.id];A.say(db.remind[f.e.id]?ed.n+' : याद दिलाया जाएगा':'याद दिलाना बंद');A.up()}),b2L:'आयोजन पृष्ठ',b2Go:()=>A.go('/event/'+f.e.id)},
    items:evs.slice(1).map(x=>{const p=dparts(x.dt),b=V.badge(EVB[x.st]);return{go:()=>A.go('/event/'+x.e.id),day:p.day,mon:p.mon,name:D.PE[x.e.ed].n,sub:'वीर भारत न्यास का आयोजन',badge:EVL[x.st],bBg:b[0],bCol:b[1],bBd:b[2]}})}};
const reelB=A=>{const D=d(),mob=A.mob;return{t:'reel',id:'row-shorts',minH:tall(A),jc:'center',cols:mob?'1fr':'minmax(240px,320px) minmax(0,1fr)',introPad:mob?'var(--px)':'0',h:mob?'400px':'min(64vh,600px)',eyebrow:'एक मिनट में',big:'शॉर्ट्स',text:'हर श्रृंखला के छोटे अंश, खड़े वीडियो में। पसंद आए तो पूरा एपिसोड एक क्लिक पर।',allGo:()=>A.go('/shorts'),
  items:D.V9.map((id,i)=>({go:()=>A.go('/shorts/'+i),img:img(id,'9x16'),name:SR(id).n,sub:'वीर भारत न्यास मूल'}))}};
const tracksB=A=>{const D=d(),mob=A.mob;let s=A.sel.pod??0;const e=D.PE[s],gs=i=>D.GUESTS.filter(g=>g.ed===i).length,eps=i=>SR('podcast').parts[i].eps;
  return{t:'tracks',id:'row-pod',title:'वीर भारत पॉडकास्ट',more:()=>A.go('/podcast'),minH:tall(A),jc:'center',cols:mob?'1fr':'minmax(0,1.15fr) minmax(320px,1fr)',
    f:{img:img(e.img,'1x1'),num:String(s+1),name:e.n,desc:e.n+' आयोजन के अतिथियों से गहन संवाद, वीडियो और ऑडियो दोनों में।',meta:eps(s)+' संवाद · '+gs(s)+' अतिथि · वीडियो और ऑडियो',listen:()=>A.play('podcast',s,0,true),watch:()=>A.play('podcast',s,0),go:()=>A.go('/podcast/'+e.id)},
    items:D.PE.map((x,i)=>{const on=i===s;return{n:String(i+1),img:img(x.img,'1x1'),name:x.n,sub:eps(i)+' संवाद · '+gs(i)+' अतिथि',bg:on?'var(--bg3)':'transparent',numCol:on?'var(--gold)':'var(--ink3)',sel:()=>{A.sel.pod=i;A.up()},listen:()=>A.play('podcast',i,0,true),watch:()=>A.play('podcast',i,0)}})}};
const geetaB=A=>{const D=d(),su=D.SUTRA[new Date().getDate()%D.SUTRA.length];return{t:'geetaF',id:'row-geeta',minH2:tall(A),bg:img('geeta-amrit','16x9'),desc:SR('geeta-amrit').d,
  qs:D.QS.slice(0,8).map((q,i)=>({label:q,go:()=>A.go('/geeta/q/'+i)})),
  tiles:[{icon:X.help,t:'जीवन के प्रश्न',s:D.QS.length+' प्रश्न। हर प्रश्न से जुड़े एपिसोड और श्लोक एक जगह।',cta:'प्रश्न चुनें',go:()=>A.go('/geeta')},{icon:X.ring,t:'गीता माला',s:'परंपरा की गीताएँ, एक 3D माला के मनकों के रूप में।',cta:'माला घुमाएँ',go:()=>A.go('/geeta/mala')},{icon:IC.star,t:'आज का अमृत-सूत्र',s:su.t,cta:'सभी अमृत-सूत्र',go:()=>A.go('/sutra')}]}};
const parvB=A=>{const D=d(),f=D.FESTS[A.db.festival]||D.FESTS[0],t=new Date();return{t:'parv',id:'row-festival',cols:A.mob?'auto minmax(0,1fr)':'auto minmax(0,1fr) auto',showImg:!A.mob,wd:WD[t.getDay()],day:String(t.getDate()),mon:MON[t.getMonth()],name:f[0],text:SR(f[1]).n+' की विशेष प्रस्तुति, पर्व के अवसर पर।',img:img(f[1],'16x9'),go:()=>A.go('/series/'+f[1])}};
const home0=P.home;
P.home=A=>{const h0=home0(A),db=A.db,D=d();const old={};(h0.blocks||[]).forEach(b=>{if(b&&b.id)old[b.id]=b});
  const R={cont:()=>old['row-cont']||null,festival:()=>parvB(A),geeta:()=>geetaB(A),orig:()=>spotB(A),new:()=>bentoB(A),live:()=>evB(A),shorts:()=>reelB(A),pod:()=>tracksB(A),
    books:()=>shelfB(A,D.BK.map((b,i)=>bookIt(A,b,i)),{id:'row-books',title:'न्यास के प्रकाशन',more:()=>A.go('/books'),moreLabel:'पुस्तकालय'}),
    channels:()=>old['row-channels']||null,collection:()=>old['row-collection']||null,sponsor:()=>(h0.blocks||[]).find(b=>b&&b.t==='ad'&&b.label==='सौजन्य से')||null};
  let order=db.homeRows.filter(r=>r.on).map(r=>r.id);
  const boost=[];db.interests.forEach(l=>{const x=D.INTERESTS.find(y=>y.l===l);x&&x.rows.forEach(id=>{if(!boost.includes(id))boost.push(id)})});
  if(boost.length){const rest=order.filter(id=>!boost.includes(id)&&id!=='cont');order=order.filter(id=>id==='cont').concat(boost.filter(id=>order.includes(id)),rest)}
  const ad=(h0.blocks||[]).find(b=>b&&b.t==='ad'&&b.label==='विज्ञापन');
  const blocks=[];order.forEach((id,i)=>{const b=R[id]&&R[id]();if(b){blocks.push(b);if(i===4&&ad)blocks.push(ad)}});
  return{label:'मुख्य',hero:h0.hero,blocks}};
P.launch=A=>P.home(A);
P.signin=A=>Object.assign(P.home(A),{label:'प्रवेश'});P.signup=A=>Object.assign(P.home(A),{label:'खाता बनाएँ'});

// ---------- catalog
P.catalog=A=>{const D=d(),pub=filt(A,'pub','सभी'),sub=filt(A,'subj','सभी'),typ=filt(A,'type','सभी'),srt=filt(A,'sort','rec');
  let list=sitems(A).concat(['tapodhara']).map(id=>({id,n:SR(id).n,pub:'न्यास मूल',subj:SR(id).subj,type:SR(id).type,vbn:true})).concat(D.CSER.map(c=>({cs:c,n:c.n,pub:(D.CH.find(x=>x.id===c.ch)||{}).type==='संस्थान'?'संस्थान':'रचनाकार',subj:c.subj,type:c.type})));
  list=list.filter(x=>(pub==='सभी'||x.pub===pub)&&(sub==='सभी'||x.subj===sub)&&(typ==='सभी'||x.type===typ));
  if(srt==='name')list.sort((a,b)=>a.n.localeCompare(b.n,'hi'));if(srt==='pub')list.sort((a,b)=>a.pub.localeCompare(b.pub,'hi'));
  const subjects=['सभी'].concat([...new Set(D.ORDER.map(id=>SR(id).subj).concat(D.CSER.map(c=>c.subj)))]);
  const clear=()=>{A.f.pub=A.f.subj=A.f.type=undefined;A.up()};
  return{label:'श्रृंखलाएँ',blocks:[hd({eyebrow:'वीर भारत न्यास',orig:true,title:'श्रृंखलाएँ',sub:'न्यास की मूल श्रृंखलाएँ, और सत्यापित रचनाकारों तथा संस्थानों की श्रृंखलाएँ, एक जगह।'}),
    sgridB({hasFilter:true,top:A.mob?'64px':'clamp(72px,5.4vw,90px)',gpad:'clamp(20px,2vw,32px)',
      pubs:['सभी','न्यास मूल','रचनाकार','संस्थान'].map(x=>({label:x,go:()=>{A.f.pub=x;A.up()},bg:pub===x?'var(--gold)':'transparent',col:pub===x?'var(--goldInk)':'var(--ink2)'})),
      sels:[{label:'विषय',value:sub,onChange:e=>{A.f.subj=e.target.value;A.up()},options:subjects.map(x=>({v:x,l:x})),bd:sub!=='सभी'?'var(--gold)':'var(--line)'},{label:'प्रकार',value:typ,onChange:e=>{A.f.type=e.target.value;A.up()},options:['सभी','श्रृंखला','वृत्तचित्र','पॉडकास्ट'].map(x=>({v:x,l:x})),bd:typ!=='सभी'?'var(--gold)':'var(--line)'}],
      sort:{label:'क्रम',value:srt,onChange:e=>{A.f.sort=e.target.value;A.up()},options:[{v:'rec',l:'अनुशंसित'},{v:'name',l:'नाम'},{v:'pub',l:'प्रकाशक'}],bd:'var(--line)'},
      hasClear:pub!=='सभी'||sub!=='सभी'||typ!=='सभी',clear,count:list.length+' श्रृंखलाएँ',emptyTitle:'इन फ़िल्टरों से कोई श्रृंखला नहीं मिली',emptyText:'कोई दूसरा विषय या प्रकार चुनें।',
      items:list.map(x=>x.vbn?sItem(A,x.id):cItem(A,x.cs))})]}};

// ---------- series / part / watch
const series0=P.series;
P.series=(A,p)=>{const r=series0(A,p),s=SR(p.id);if(!s||s.upcoming)return r;const sel=A.nav[p.id]??0;
  r.blocks=(r.blocks||[]).filter(Boolean).map(b=>b.t==='list'&&b.title==='शोध सामग्री'?researchB(A,s.parts[sel].name):b.t==='cards'&&b.title==='संबंधित श्रृंखलाएँ'?relatedB(A,p.id):b);return r};
const part0=P.part;
P.part=(A,p)=>{const r=part0(A,p),s=SR(p.id);if(!s)return r;r.blocks=(r.blocks||[]).filter(Boolean).map(b=>b.t==='list'&&b.title==='शोध सामग्री'?researchB(A,s.parts[+p.p].name):b);return r};
const watch0=P.watch;
P.watch=(A,p)=>{const r=watch0(A,p);const pb=r.blocks&&r.blocks[0];if(!pb||pb.t!=='player')return r;
  const sid=p.sid,pi=+p.p,ei=+p.e,s=SR(sid),pt=s.parts[pi],pl=A.pl,L=d().L,mob=A.mob,chs=A.chapters(sid),C=chs.length,pr=pl.t/L;
  const chaps=chs.map((c,i)=>{const on=pr>=i/C&&pr<(i+1)/C,cp=Math.max(0,Math.min(1,(pr-i/C)*C));return{n:String(i+1),title:c,time:V.fmt(i/C*L),on,ring:on?'var(--gold)':'transparent',img:pb.img,pos:(8+i*17)%100+'% 50%',filt:on?'none':'brightness(.78)',pct:pct(cp),go:()=>{A.setT(i/C*L+1);pl.lastCh=i;pl.playing=true;A.up()}}});
  const people=V.epPeople(sid,pi,ei).map(x=>({init:x.who.name[0],name:x.who.name,role:x.guest?'अतिथि · '+x.who.role:'व्यक्तित्व · '+x.who.cat,rCol:x.guest?'var(--eyebrow)':'var(--ink3)',time:V.fmt(x.at*L),go:()=>A.go((x.guest?'/guest/':'/person/')+x.who.id),jump:()=>{A.setT(x.at*L);pl.playing=true;window.scrollTo({top:0,behavior:'smooth'})}}));
  const ups=Array.from({length:pt.eps},(_,e)=>{const v=A.db.prog[sid+'|'+pi+'|'+e]||0,on=e===ei;return{img:epImg(sid,pi),title:V.epTitle(sid,pi,e),sub:pt.name,dur:V.fmt(L),label:on?'अभी चल रहा है':e===ei+1?'अगला':'',hasLabel:on||e===ei+1,bg:on?'var(--bg3)':'transparent',hasPct:v>0,pct:pct(v),go:()=>A.play(sid,pi,e)}});
  const nx=A.nextOf(sid,pi,ei);if(nx&&nx[0]!==pi){const np=s.parts[nx[0]];for(let e=0;e<Math.min(np.eps,3);e++)ups.push({img:epImg(sid,nx[0]),title:V.epTitle(sid,nx[0],e),sub:np.name,dur:V.fmt(L),label:e===0&&ei===pt.eps-1?'अगला भाग':'',hasLabel:e===0&&ei===pt.eps-1,bg:'transparent',hasPct:false,pct:'0%',go:()=>A.play(sid,nx[0],e)})}
  Object.assign(pb,{cols:mob?'minmax(0,1fr)':'minmax(0,1fr) clamp(320px,25vw,410px)',stR:mob?'8px':'12px',dur:V.fmt(L)+' मिनट',chapN:C+' अध्याय',chaps,people,res:resItems(A,V.epTitle(sid,pi,ei)),
    upTitle:pt.name,upSub:(s.unit||'भाग')+' '+(pi+1)+' / '+s.parts.length+' · '+pt.eps+' एपिसोड',ups,upMax:mob?'none':'calc(100svh - 300px)',asPos:mob?'static':'sticky',
    sImg:sid==='podcast'?img(d().PE[pi].img,'1x1'):img(sid,'1x1'),sName:s.n,sUnit:s.u,acts:(pb.acts||[]).map(a=>a.bg==='var(--gold)'?a:Object.assign({},a,{bd:'var(--line)',bg:'var(--bg2)'}))});
  r.blocks=[pb,relatedB(A,sid),(r.blocks||[]).find(b=>b&&b.t==='ad')||null];return r};

// ---------- books
P.books=A=>{const D=d(),s=Math.min(A.sel.bk??0,D.BK.length-1),b=D.BK[s];
  return{label:'पुस्तकें',blocks:[bookD(A,b,{acts:[act('पुस्तक देखें',()=>A.go('/book/'+b.id),'p'),act('नमूना पढ़ें',sampleRead(A,b))],hasPick:true,pick:D.BK.map((x,i)=>({img:`art/books/${x.img}.jpg`,name:x.n,ring:i===s?'var(--gold)':'transparent',op:i===s?1:.6,go:()=>{A.sel.bk=i;A.up()}}))}),
    shelfB(A,D.BK.map((x,i)=>bookIt(A,x,i)),{title:'पुस्तकालय',lead:'न्यास के सभी प्रकाशन। किसी पुस्तक को चुनें, विवरण और नमूना पठन खुलेगा।'}),
    shelfB(A,[1,2,3].map(n=>({go:()=>A.go('/channel/ex2'),img:'',hasImg:false,ph:true,phLabel:'उदाहरण प्रकाशन '+n,ar:'0.72',name:'उदाहरण प्रकाशन '+n,hasSub:true,sub:'उदाहरण संस्थान 1',spine:SPINE[n%5],bh:A.mob?'170px':'clamp(200px,17vw,260px)'})),{title:'संस्थानों के प्रकाशन',tag:'उदाहरण'})]}};
P.book=(A,p)=>{const D=d(),b=D.BK.find(x=>x.id===p.id);if(!b)return P.notfound(A);
  return{label:b.n,blocks:[bookD(A,b,{hasBack:true,acts:[act('नमूना पढ़ें',sampleRead(A,b),'p'),act('प्रति प्राप्त करें',()=>A.say('प्रति प्राप्त करने का तरीका अभी तय होना है')),act('साझा करें',()=>{A.share={title:b.n};A.up()})]}),
    b.vols?shelfB(A,b.vols.map((v,i)=>Object.assign(bookIt(A,Object.assign({},b,{img:v.img}),i),{name:v.v,sub:v.r,hasSub:true,go:sampleRead(A,b)})),{title:'इस संग्रह के खंड'}):null,
    b.rel.length?sgridB({title:'संबंधित श्रृंखलाएँ',items:b.rel.map(id=>sItem(A,id))}):null,
    shelfB(A,D.BK.filter(x=>x!==b).map(x=>bookIt(A,x,D.BK.indexOf(x))),{title:'अन्य पुस्तकें',more:()=>A.go('/books'),moreLabel:'पुस्तकालय'})]}};

// ---------- search
P.search=A=>{const db=A.db,q=A.q.trim(),ty=filt(A,'sty','सभी'),res=q?V.searchAll(A,q):[];
  const T=[['सभी','सभी'],['series','श्रृंखलाएँ'],['episode','एपिसोड'],['person','व्यक्तित्व'],['event','आयोजन'],['book','पुस्तकें'],['channel','चैनल']];
  const cnt=k=>k==='सभी'?res.length:res.filter(x=>x.type===k).length;
  const sb={t:'searchbar',ref:A.c.heroQRef,q:A.q,onQ:e=>{A.q=e.target.value;A.up()},onKey:e=>{if(e.key==='Enter'){const v=A.q.trim();if(v&&!db.recentQ.includes(v))db.recentQ=[v].concat(db.recentQ).slice(0,6);A.up()}},hasQ:!!q,clear:()=>{A.q='';A.up()},hasTabs:!!q,
    tabs:T.filter(x=>x[0]==='सभी'||cnt(x[0])).map(x=>({label:x[1],count:String(cnt(x[0])),go:()=>{A.f.sty=x[0];A.up()},col:ty===x[0]?'var(--gold)':'var(--ink2)',ul:ty===x[0]?'var(--gold)':'transparent'}))};
  const blocks=[sb];
  if(!q){const pick=x=>()=>{A.q=x;if(!db.recentQ.includes(x))db.recentQ=[x].concat(db.recentQ).slice(0,6);A.up()};
    if(db.recentQ.length)blocks.push(V.chipsB([['',db.recentQ.map(x=>[x,false,pick(x)])]],{title:'हाल की खोज',headActs:[act('साफ़ करें',()=>{db.recentQ=[];A.up()},'g')]}));
    blocks.push(V.chipsB([['',['महादेव','अवंति','गीता','सदानीरा','रामायण','पॉडकास्ट','पुस्तक'].map(x=>[x,false,pick(x)])]],{title:'लोकप्रिय खोजें'}));
    blocks.push({t:'tiles',title:'विषय के अनुसार देखें',minW:'240px',ar:'16/10',items:[['पुराण','mahadev'],['रामायण','hamare-ram'],['इतिहास','mahajanpad'],['नदियाँ और तीर्थ','sadanira'],['दर्शन','geeta-amrit'],['संवाद','podcast']].map(([s,id])=>{const n=d().ORDER.filter(x=>SR(x).subj===s).length;
      return{t:s,s:s==='संवाद'?'वीर भारत पॉडकास्ट':n+' श्रृंखलाएँ',img:img(id,'16x9'),go:()=>{if(s==='संवाद'){A.go('/podcast');return}A.f.subj=s;A.f.pub=undefined;A.f.type=undefined;A.go('/series')}}})})}
  else{const show=k=>(ty==='सभी'||ty===k)&&res.some(x=>x.type===k),of=k=>res.filter(x=>x.type===k);
    const g=[show('series')?sgridB({title:'श्रृंखलाएँ',minW:'260px',items:of('series').map(x=>sItem(A,x.id))}):null,
      show('episode')?cards('wide','एपिसोड',of('episode').map(x=>it.wide({go:x.go,img:x.img,name:x.name,sub:x.sub||'',orig:true})),{layout:'grid'}):null,
      show('person')?cards('person','व्यक्तित्व और अतिथि',of('person').map(x=>({go:x.go,init:x.name[0],name:x.name,sub:x.kind})),{layout:'grid'}):null,
      show('event')?cards('wide','आयोजन',of('event').map(x=>it.wide({go:x.go,img:x.img.replace('/1x1/','/16x9/'),name:x.name,sub:'वीर भारत न्यास का आयोजन'})),{layout:'grid'}):null,
      show('book')?shelfB(A,of('book').map(x=>{const b=d().BK.find(y=>y.n===x.name);return bookIt(A,b,d().BK.indexOf(b))}),{title:'पुस्तकें'}):null,
      show('channel')?cards('channel','चैनल',of('channel').map(x=>({go:x.go,vbn:x.name==='वीर भारत न्यास',ex:x.name!=='वीर भारत न्यास',init:x.name[0],name:x.name,kind:x.kind,hasFollow:false})),{layout:'grid'}):null].filter(Boolean);
    if(g.length)blocks.push(...g);else blocks.push({t:'state',empty:true,loading:false,error:false,skel:[],skAr:'1',emptyTitle:'"'+q+'" के लिए कोई परिणाम नहीं मिला',emptyText:'वर्तनी जाँचें, छोटा शब्द आज़माएँ, या नीचे के किसी विषय से शुरू करें।',hasEmptyAct:true,emptyAct:'खोज साफ़ करें',emptyGo:()=>{A.q='';A.up()},retry:null})}
  return{label:'खोज',blocks}};

// ---------- account / profile
const tileList=A=>{const db=A.db,lock=!db.signed,unread=db.notifs.filter(n=>!n.read).length,saved=Object.keys(db.saved).length;
  const T=[['मेरी सूची','सहेजी गई श्रृंखलाएँ और एपिसोड',X.list,'/list',saved,true],['इतिहास','जो देखा, प्रगति के साथ',X.hist,'/history',db.hist.length,true],['डाउनलोड','ऐप में डाउनलोड किए गए एपिसोड',IC.down,'/downloads',db.downloads.length,true],['सूचनाएँ','नए एपिसोड, प्रीमियर और आयोजन',IC.bell,'/notifications',unread,true],['सेटिंग्स','रंग, उपशीर्षक, गुणवत्ता और अक्षर आकार',X.gear,'/settings',0,false],['गोपनीयता और सहमति','विज्ञापन और विश्लेषण की सहमति',X.shield,'/privacy',0,false],['सहायता और संपर्क','प्रश्न, सुझाव या कोई कठिनाई',X.help,'/contact',0,false]];
  return T.map(x=>({t:x[0],s:x[1],icon:x[2],locked:lock&&x[5],hasCount:!lock&&x[4]>0,count:String(x[4]),go:lock&&x[5]?()=>A.need(x[0]+' देखने के लिए',()=>A.go(x[3])):()=>A.go(x[3])}))};
P.account=A=>{const db=A.db,u=db.user;
  return{label:'खाता',blocks:[{t:'acct',signed:db.signed,notSigned:!db.signed,init:(u.name||'द')[0],name:u.name||'दर्शक',email:u.email||'',goProfile:()=>A.go('/profile'),signOut:()=>{db.signed=false;A.say('साइन आउट हो गया');A.up()},signIn:()=>A.openAuth('in'),signUp:()=>A.openAuth('up'),tiles:tileList(A)},
    db.signed&&db.hist.length?cards('wide','जहाँ छोड़ा था',db.hist.slice(0,8).map(k=>{const [s,p,e]=k.split('|');return I.ep(A,s,+p,+e)}),{more:()=>A.go('/history')}):null]}};
P.profile=A=>{const db=A.db,u=db.user;if(!db.signed)return P.account(A);
  return{label:'प्रोफ़ाइल',blocks:[{t:'profile',back:()=>A.go('/account'),init:(u.name||'द')[0],name:u.name||'दर्शक',cols:A.mob?'1fr':'minmax(0,1.5fr) minmax(280px,1fr)',rowCols:A.mob?'1fr':'minmax(150px,200px) minmax(0,1fr)',
    stats:[[db.hist.length,'देखे गए एपिसोड'],[Object.keys(db.saved).length,'सूची में सहेजे गए'],[Object.values(db.follows).filter(Boolean).length,'फ़ॉलो किए चैनल']].map(x=>({v:String(x[0]),l:x[1]})),
    rows:[['नाम',u.name||'—',X.user],['ईमेल',u.email||'—',X.mail],['मोबाइल',u.mobile?'+91 '+u.mobile:'जोड़ा नहीं गया',X.phone],['राज्य या देश',u.region||'मध्यप्रदेश',X.pin],['खाते का प्रकार','दर्शक',X.shield]].map(x=>({label:x[0],value:x[1],icon:x[2]})),
    contact:()=>A.go('/contact'),sec:[['प्रवेश का तरीका',u.mobile&&!u.email?'मोबाइल OTP':'ईमेल और पासवर्ड'],['अंतिम प्रवेश','आज, इस उपकरण पर'],['सक्रिय सत्र','1 उपकरण']].map(x=>({l:x[0],v:x[1]})),
    links:[['सेटिंग्स',X.gear,'/settings'],['गोपनीयता और सहमति',X.shield,'/privacy'],['मेरी सूची',X.list,'/list']].map(x=>({t:x[0],icon:x[1],go:()=>A.go(x[2])}))}]}};

// ---------- info pages
const SAMPLE='नमूना पाठ · अंतिम पाठ विधिक समीक्षा के बाद';
P.about=A=>{const mob=A.mob;return{label:'न्यास परिचय',blocks:[
  splitB(A,{spad:'clamp(24px,4vw,64px)',minH2:mob?'auto':'calc(100svh - clamp(72px,5.4vw,90px) - 40px)',eyebrow:'संस्कृति विभाग, मध्यप्रदेश शासन का अधिष्ठान',h:'वीर भारत न्यास',hfs:'clamp(42px,5vw,88px)',mOrder:'1',tOrder:'0',img:img('mahajanpad','16x9'),ar:'4/3',
    ps:['भारत की लंबी परंपरा के शोध, अध्येतावृत्ति और अध्ययन को समर्पित: उसके नायक, विचारक, दार्शनिक, ऋषि, संत, कवि, लेखक, कलाकार, वैज्ञानिक और उद्यमी, प्रागैतिहासिक काल से विदेशी शासन के विरुद्ध संघर्ष तक।'],acts:[act('श्रृंखलाएँ देखें',()=>A.go('/series'),'p'),act('संपर्क करें',()=>A.go('/contact'))]}),
  featB({title:'न्यास क्या करता है',items:[{icon:X.book,t:'शोध',s:'भारत की परंपरा, उसके व्यक्तित्वों और स्थलों पर प्रमाण-आधारित शोध।'},{icon:X.award,t:'अध्येतावृत्ति',s:'विद्वानों और शोधार्थियों को अध्ययन के लिए फ़ेलोशिप और सहयोग।'},{icon:X.feather,t:'प्रकाशन',s:'शोध पर आधारित पुस्तकें और संग्रह, जैसे अमृत जलधारा और सदानीरा।'},{icon:IC.cal,t:'आयोजन',s:'समागम, संवाद और उत्सव, जिनसे वीर भारत पॉडकास्ट के संस्करण बनते हैं।'}]}),
  {t:'tiles',title:'इस मंच पर',lead:'न्यास का अपना निःशुल्क मंच। देखने के लिए खाते की आवश्यकता नहीं है।',minW:'230px',ar:'4/3',items:[['श्रृंखलाएँ','न्यास की मूल श्रृंखलाएँ','mahadev','/series'],['पॉडकास्ट','आयोजनों के संवाद','podcast','/podcast'],['पुस्तकें','न्यास के प्रकाशन','sadanira','/books'],['आयोजन और लाइव','सीधा प्रसारण और रिकॉर्डिंग','podcast-sadanira-samagam','/events'],['रचनाकार','सत्यापित रचनाकार और संस्थान','yugyugin-bharatvanshi','/creators']].map(x=>({t:x[0],s:x[1],img:img(x[2],'16x9'),go:()=>A.go(x[3])}))},
  splitB(A,{h:'संस्कृति विभाग के अंतर्गत',hfs:'clamp(28px,2.6vw,44px)',img:'assets/gov-mp.png',ar:'16/10',imgBg:'var(--bg2)',imgW:'46%',fit:'contain',ps:['न्यास संस्कृति विभाग, मध्यप्रदेश शासन के अंतर्गत कार्य करता है। मंच पर प्रकाशित हर रचना प्रकाशन से पहले न्यास की टीम द्वारा जाँची जाती है।'],acts:[act('सामग्री दिशानिर्देश',()=>A.go('/guidelines')),act('रचनाकार के रूप में जुड़ें',()=>A.go('/studio/register'),'p')]})]}};
P.contact=A=>{const F=V.form(A,'contact',{name:'',email:'',topic:'सामान्य प्रश्न',msg:''}),fb=V.formB;const ok=V.okEmail;
  return{label:'संपर्क',blocks:[docB(A,{crumb:'मुख्य  /  संपर्क',dtitle:'संपर्क करें',dsub:'प्रश्न, सुझाव, रचनाकार के रूप में जुड़ना या कोई तकनीकी कठिनाई। संदेश भेजें, न्यास की टीम उत्तर देगी।'}),
    Object.assign(fb({maxW:'680px',success:F._done,sTitle:'संदेश भेज दिया गया',sText:'धन्यवाद। न्यास की टीम आपसे संपर्क करेगी। यह डेमो है, कोई संदेश वास्तव में नहीं भेजा गया।',sActs:[act('नया संदेश',()=>{A.forms.contact=null;A.up()}),act('मुख्य पृष्ठ',()=>A.go('/'),'p')],
      fields:[V.inp(A,F,'name','नाम',{ph:'आपका नाम'}),V.inp(A,F,'email','ईमेल',{type:'email',ph:'name@example.in'}),V.inp(A,F,'topic','विषय',{isSelect:true,span:'1 / -1',options:['सामान्य प्रश्न','रचनाकार और संस्थान','आयोजन','पुस्तकें','तकनीकी सहायता','खाते की जानकारी में सुधार'].map(x=>({v:x,l:x}))}),V.inp(A,F,'msg','संदेश',{isArea:true,span:'1 / -1',ph:'अपना संदेश लिखें'})],
      submitLabel:'संदेश भेजें',submit:()=>{const e={};if(!F.name.trim())e.name='नाम लिखें';if(!ok(F.email))e.email='सही ईमेल लिखें';if(F.msg.trim().length<10)e.msg='संदेश कम से कम 10 अक्षरों का हो';F._err=e;if(!Object.keys(e).length){F._done=true;A.log('संपर्क संदेश भेजा गया')}A.up()}}),
      {title:'संदेश भेजें',hasAside:true,aside:[[X.mail,'ईमेल','contact@example.in','नमूना पता · उत्तर सामान्यतः 2 कार्यदिवस में'],[X.phone,'फ़ोन','+91 00000 00000','नमूना नंबर · सोमवार से शुक्रवार, 10:30 से 5:30'],[X.pin,'कार्यालय','पता यहाँ आएगा','संस्कृति विभाग, मध्यप्रदेश शासन']].map(x=>({icon:x[0],label:x[1],value:x[2],sub:x[3]}))}),
    featB({title:'शायद आपका प्रश्न यहाँ है',items:[{icon:X.user,t:'रचनाकार के रूप में जुड़ना',s:'पंजीकरण करें, सत्यापन के बाद अपने चैनल पर प्रकाशित करें।',go:()=>A.go('/studio/register'),goL:'पंजीकरण'},{icon:X.checkc,t:'सामग्री दिशानिर्देश',s:'प्रकाशन से पहले हर रचना किन मानकों पर जाँची जाती है।',go:()=>A.go('/guidelines'),goL:'दिशानिर्देश पढ़ें'},{icon:X.shield,t:'गोपनीयता और डेटा',s:'आपकी जानकारी का उपयोग और आपकी सहमति।',go:()=>A.go('/privacy'),goL:'नीति पढ़ें'}]})]}};
P.privacy=A=>{const c=A.db.consent,tg=V.tg;const sw=(label,sub,k)=>Object.assign({label,sub,hasSub:true,op:1,go:()=>{c[k]=!c[k];A.log('सहमति बदली : '+label);A.up()}},tg(c[k]));
  return{label:'गोपनीयता और सहमति',blocks:[docB(A,{crumb:'मुख्य  /  नीतियाँ  /  गोपनीयता',dtitle:'गोपनीयता और सहमति',dsub:'हम कौन-सी जानकारी लेते हैं, क्यों लेते हैं और उस पर आपका क्या नियंत्रण है। डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम के अनुरूप, व्यक्तिगत विज्ञापन केवल आपकी सहमति से।',meta:['अंतिम अद्यतन : तिथि शीघ्र',SAMPLE]}),
    {t:'toggles',title:'आपकी सहमति',lead:'ये विकल्प कभी भी बदले जा सकते हैं। बदलाव तुरंत लागू होते हैं।',segs:[],items:[Object.assign({label:'आवश्यक',sub:'मंच चलाने के लिए आवश्यक, बंद नहीं किया जा सकता',hasSub:true,op:.6,go:()=>A.say('आवश्यक सहमति बंद नहीं की जा सकती')},tg(true)),sw('विश्लेषण','मंच सुधारने के लिए गुमनाम उपयोग आँकड़े','analytics'),sw('व्यक्तिगत विज्ञापन','आपकी रुचि के अनुसार विज्ञापन','pads'),sw('ईमेल','नई श्रृंखलाओं और आयोजनों की ईमेल','email')]},
    docB(A,{hasHead:false,secs:[{h:'हम कौन हैं',p:['यह मंच वीर भारत न्यास, संस्कृति विभाग, मध्यप्रदेश शासन का है। यह नीति बताती है कि मंच पर आपकी जानकारी कैसे एकत्र, उपयोग और सुरक्षित की जाती है।']},
      {h:'हम कौन-सी जानकारी लेते हैं',l:['खाता जानकारी : नाम, ईमेल, मोबाइल और राज्य, केवल तब जब आप खाता बनाते हैं।','देखने की जानकारी : प्रगति, मेरी सूची, इतिहास और डाउनलोड।','तकनीकी जानकारी : ब्राउज़र या ऐप का संस्करण और उपकरण का प्रकार, मंच चलाने के लिए।','उपयोग आँकड़े : केवल विश्लेषण की सहमति होने पर, गुमनाम रूप में।'],note:'देखने के लिए खाते की आवश्यकता नहीं है। बिना खाते के कोई व्यक्तिगत जानकारी नहीं ली जाती।'},
      {h:'जानकारी का उपयोग',l:['आपकी प्रगति और सूची को हर उपकरण पर सहेजना।','नए एपिसोड, प्रीमियर और आयोजनों की सूचना भेजना, आपकी सेटिंग्स के अनुसार।','मंच की गुणवत्ता और सुलभता सुधारना।','व्यक्तिगत विज्ञापन दिखाना, केवल आपकी सहमति होने पर।']},
      {h:'डेटा का भंडारण और सुरक्षा',p:['जानकारी सुरक्षित सर्वरों पर, एन्क्रिप्शन के साथ रखी जाती है और केवल अधिकृत कर्मचारी ही उसे देख सकते हैं।'],note:'भारत के भीतर डेटा भंडारण की पुष्टि संस्कृति विभाग के साथ की जानी है।'},
      {h:'आपके अधिकार',l:['अपनी जानकारी देखने का अधिकार।','गलत जानकारी में सुधार का अनुरोध करने का अधिकार।','खाता और उससे जुड़ी जानकारी हटाने का अनुरोध करने का अधिकार।','किसी भी समय सहमति वापस लेने का अधिकार।']},
      {h:'शिकायत और संपर्क',p:['गोपनीयता से जुड़े किसी प्रश्न या शिकायत के लिए संपर्क पृष्ठ का उपयोग करें। शिकायत अधिकारी का विवरण यहाँ जोड़ा जाएगा।']}]})]}};
P.terms=A=>({label:'उपयोग की शर्तें',blocks:[docB(A,{crumb:'मुख्य  /  नीतियाँ  /  उपयोग की शर्तें',dtitle:'उपयोग की शर्तें',dsub:'मंच का उपयोग करते समय लागू होने वाली शर्तें, सरल भाषा में।',meta:['अंतिम अद्यतन : तिथि शीघ्र',SAMPLE],secs:[
  {h:'स्वीकृति',p:['मंच का उपयोग करके आप इन शर्तों से सहमत होते हैं। यदि आप सहमत नहीं हैं, तो कृपया मंच का उपयोग न करें।']},
  {h:'निःशुल्क मंच',p:['मंच सभी के लिए निःशुल्क है और विज्ञापन से चलता है। देखने के लिए खाते की आवश्यकता नहीं है। खाता केवल प्रगति, सूची, डाउनलोड और पसंद सहेजता है।']},
  {h:'आपका खाता',l:['खाता बनाते समय सही जानकारी दें।','अपना पासवर्ड और OTP किसी के साथ साझा न करें।','खाते से हुई गतिविधि की ज़िम्मेदारी खाताधारक की है।']},
  {h:'सामग्री का उपयोग',p:['मंच की सामग्री व्यक्तिगत, गैर-व्यावसायिक उपयोग के लिए है। अनुमति के बिना सामग्री को डाउनलोड करके फिर से प्रकाशित करना, बेचना या बदलना वर्जित है। साझा करने के बटन से लिंक साझा किया जा सकता है।']},
  {h:'रचनाकार और संस्थान',p:['सत्यापित रचनाकार और संस्थान अपनी रचनाओं का स्वामित्व रखते हैं और प्रकाशन के लिए न्यास को गैर-अनन्य लाइसेंस देते हैं। हर रचना प्रकाशन से पहले सामग्री दिशानिर्देशों पर जाँची जाती है।']},
  {h:'स्वीकार्य आचरण',l:['मंच की सुरक्षा या संचालन में बाधा न डालें।','किसी और की पहचान का उपयोग न करें।','स्वचालित साधनों से सामग्री एकत्र न करें।']},
  {h:'परिवर्तन',p:['इन शर्तों में समय-समय पर बदलाव हो सकते हैं। महत्वपूर्ण बदलावों की सूचना मंच पर दी जाएगी।']},
  {h:'संपर्क',p:['इन शर्तों से जुड़े किसी प्रश्न के लिए संपर्क पृष्ठ का उपयोग करें।']}]})]});
P.accessibility=A=>({label:'सुलभता विवरण',blocks:[docB(A,{crumb:'मुख्य  /  नीतियाँ  /  सुलभता',dtitle:'सुलभता विवरण',dsub:'मंच हर दर्शक के लिए, बुज़ुर्ग दर्शकों और सहायक तकनीक का उपयोग करने वालों के लिए भी, सरल बनाया गया है।',meta:['अंतिम अद्यतन : तिथि शीघ्र']}),
  featB({title:'मंच पर सुलभता सुविधाएँ',items:[{icon:X.lang,t:'हिन्दी उपशीर्षक',s:'हर एपिसोड पर उपशीर्षक, प्लेयर या सेटिंग्स से चालू करें।'},{icon:X.book,t:'अक्षर आकार',s:'सामान्य, बड़ा और बहुत बड़ा : तीन स्तर।',go:()=>A.go('/settings'),goL:'सेटिंग्स'},{icon:X.eye,t:'गहरा और हल्का रंग',s:'पढ़ने में आसानी के लिए दोनों रंग-रूप।'},{icon:IC.live,t:'सुनने का मोड',s:'हर एपिसोड केवल ऑडियो में भी।'}]}),
  docB(A,{hasHead:false,secs:[{h:'हमारी प्रतिबद्धता',p:['मंच को ऐसा बनाया गया है कि वह मोबाइल, टैबलेट और कंप्यूटर पर समान रूप से उपयोगी हो, और बड़े अक्षरों, स्पष्ट बटनों और सरल नेविगेशन के साथ।']},
    {h:'कीबोर्ड और स्क्रीन रीडर',l:['सभी बटन और लिंक कीबोर्ड से चुने जा सकते हैं।','प्रस्तुति में तीर कुंजियों से आगे और पीछे जाया जा सकता है।','चित्रों और बटनों पर स्क्रीन रीडर के लिए विवरण दिए गए हैं।']},
    {h:'मानक',p:['मंच का लक्ष्य WCAG 2.1 स्तर AA के अनुरूप होना है।'],note:'सरकारी वेबसाइटों के सुलभता मानकों (GIGW) की पुष्टि संस्कृति विभाग के साथ की जानी है।'},
    {h:'ज्ञात सीमाएँ',p:['3D संसार (महाजनपद, सदानीरा, गीता माला) माउस या स्पर्श से सबसे अच्छे चलते हैं। इनकी हर सामग्री श्रृंखला पृष्ठ की सूची में भी उपलब्ध है।']},
    {h:'सहायता और प्रतिक्रिया',p:['सुलभता से जुड़ी किसी कठिनाई के बारे में बताने के लिए संपर्क पृष्ठ का उपयोग करें। हर प्रतिक्रिया पर विचार किया जाता है।']}]})]});
P.guidelines=A=>({label:'सामग्री दिशानिर्देश',blocks:[docB(A,{crumb:'रचनाकार और संस्थान  /  दिशानिर्देश',dtitle:'सामग्री दिशानिर्देश',dsub:'प्रकाशन से पहले न्यास की टीम हर रचना को इन्हीं दिशानिर्देशों पर जाँचती है।',meta:['रचनाकारों और संस्थानों के लिए',SAMPLE]}),
  {t:'steps',title:'समीक्षा प्रक्रिया',items:[['1','अपलोड','स्टूडियो से वीडियो और विवरण जमा करें'],['2','जाँच','न्यास की टीम सटीकता और गुणवत्ता जाँचती है'],['3','प्रतिक्रिया','बदलाव हों तो टिप्पणी के साथ लौटाया जाता है'],['4','प्रकाशन','स्वीकृति के बाद आपके चैनल पर']].map(x=>({n:x[0],label:x[1],sub:x[2],bd:'var(--line)',bg:'var(--bg2)',cBg:'var(--gold)',cCol:'var(--goldInk)'}))},
  docB(A,{hasHead:false,secs:[{h:'विषय क्षेत्र',p:['मंच भारत की परंपरा पर केंद्रित है।'],l:['इतिहास, पुराण, रामायण और महाभारत।','दर्शन, संत परंपरा और साहित्य।','नदियाँ, तीर्थ, कला और विज्ञान की परंपरा।']},
    {h:'सटीकता और स्रोत',l:['तथ्य जाँचे जाने योग्य हों और प्रमुख स्रोतों का उल्लेख विवरण में हो।','मत और तथ्य में स्पष्ट अंतर रखें।','व्यक्तित्वों और स्थानों के नाम मानक वर्तनी में हों।']},
    {h:'तकनीकी गुणवत्ता',l:['वीडियो कम से कम 1080p, स्थिर और स्पष्ट।','ध्वनि साफ़, पृष्ठभूमि शोर के बिना।','हिन्दी उपशीर्षक की अनुशंसा की जाती है।']},
    {h:'कॉपीराइट',p:['रचना में प्रयुक्त हर चित्र, संगीत और फ़ुटेज के अधिकार रचनाकार के पास हों। अधिकार का प्रमाण माँगा जा सकता है।']},
    {h:'जो स्वीकार्य नहीं',l:['किसी समुदाय, धर्म या व्यक्ति के प्रति घृणा या अपमान।','भ्रामक शीर्षक या थंबनेल।','बिना अनुमति किसी और की सामग्री।','राजनीतिक प्रचार या व्यावसायिक विज्ञापन रचना के भीतर।']},
    {h:'लौटाई गई रचना',p:['लौटाई गई रचना पर समीक्षक की टिप्पणी स्टूडियो में मेरी प्रस्तुतियाँ पृष्ठ पर दिखती है। सुधार के बाद रचना फिर से जमा की जा सकती है।']}]}),
  V.notice('रचनाकार बनें','पंजीकरण के लिए रचनाकार स्टूडियो खोलें। सत्यापन के बाद आप अपने चैनल पर प्रकाशित कर सकेंगे।',[act('पंजीकरण',()=>A.go('/studio/register'),'p')])]});
P.welcome=A=>({label:'स्वागत',noFooter:true,blocks:[splitB(A,{spad:'clamp(20px,3vw,48px)',minH2:A.mob?'auto':'calc(100svh - clamp(72px,5.4vw,90px) - 30px)',eyebrow:'वीर भारत न्यास',h:'स्वागत है',hfs:'clamp(46px,5.4vw,96px)',
  collage:['mahadev','geeta-amrit','hamare-ram','sadanira','mahajanpad','mahaganadhipati-ganesh'].map((id,i)=>({img:img(id,'1x1'),dy:i%3===1?'28px':'0px'})),
  ps:['संस्कृति विभाग, मध्यप्रदेश शासन के अधिष्ठान, वीर भारत न्यास का अपना मंच। भारत की परंपरा की श्रृंखलाएँ, पॉडकास्ट, आयोजन और पुस्तकें, एक जगह।'],
  points:[{icon:X.free,t:'पूरी तरह निःशुल्क',s:'हर श्रृंखला और एपिसोड, बिना किसी शुल्क के।'},{icon:IC.play,t:'बिना खाते के देखें',s:'खाता केवल प्रगति और सूची सहेजने के लिए।'},{icon:X.shield,t:'जाँची-परखी सामग्री',s:'हर रचना प्रकाशन से पहले न्यास की टीम द्वारा जाँची जाती है।'}],
  acts:[act('देखना शुरू करें',()=>{A.dir=1;A.go('/')},'p'),act('खाता बनाएँ',()=>A.openAuth('up'))]})]});
const live0=P.live;
P.live=A=>{const r=live0(A),lv=A.db.live;delete r.hero;r.blocks=[hd({eyebrow:lv.on?'अभी लाइव':'वीर भारत न्यास',orig:true,title:'लाइव',sub:'न्यास के अपने आयोजन यहाँ सीधे प्रसारित होते हैं, फिर स्थायी आयोजन पृष्ठ पर रहते हैं।',acts:[act('आयोजन कैलेंडर',()=>A.go('/events'))]})].concat(r.blocks||[]);return r};
}
boot();
})();
