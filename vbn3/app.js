(function(){
const I={home:'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',live:'M3 7h18v12H3zM8 3l4 4 4-4',series:'M4 7h16v13H4zM7 4h10M10 11v5l4-2.5z',shorts:'M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM10.5 9.5v5l4-2.5z',crown:'M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z',mic:'M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3',head:'M4 15v-3a8 8 0 0 1 16 0v3M4 15h3v6H4zM17 15h3v6h-3z',book:'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M8 7h7',star:'M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z',cal:'M4 6h16v15H4zM4 10h16M8 3v4M16 3v4M8 14h3v3H8z',quiz:'M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14M12 17.5v.5M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18z',info:'M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zM12 11v6M12 7.5v.5',mark:'M6 3h12v18l-6-4-6 4z'};
const fmt=d=>d.getDate()+' '+['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()];
const MON=['January','February','March','April','May','June','July','August','September','October','November','December'];
const DOCS={
 contact:{t:'Contact us',sub:'Reach the Veer Bharat Nyas team for viewer support, creator partnerships and media enquiries.',sec:[['Viewer support','For playback, account and accessibility issues. Include your device and the title you were watching.'],['Creators & institutions','To publish on VBN OTT, apply through Creator Studio. Our editorial team reviews every application.'],['Media & events','For event coverage, accreditation and press material for Nyas events at Bharat Bhavan and elsewhere.'],['Office','Veer Bharat Nyas, Department of Culture, Government of Madhya Pradesh, Bhopal. Full address, phone and email to be confirmed.']]},
 privacy:{t:'Privacy policy',sub:'How VBN OTT collects, uses and protects your information. Draft for review, final text to be supplied by the Nyas.',sec:[['Information we collect','Account details you provide (name, email or mobile), viewing activity such as progress and saved titles, and basic device information needed to stream.'],['How we use it','To run your account, resume playback, send reminders you ask for, and improve the service. We do not sell personal data.'],['Advertising','Sponsorship messages may appear on free content. Premium content is free for signed-in users and is ad-free.'],['Your choices','You can download or delete your data from My Library → Settings, and turn off reminders at any time.'],['Retention','We keep account data while your account is active and delete it within 90 days of a deletion request.'],['Contact','Questions about privacy can be sent to the Nyas grievance officer (details to be confirmed).']]},
 terms:{t:'Terms of use',sub:'The rules for using VBN OTT. Draft for review, final text to be supplied by the Nyas.',sec:[['Using the service','VBN OTT is a public cultural service of Veer Bharat Nyas. It is free to use; some titles require signing in.'],['Content','All series, podcasts, audiobooks and books are © Veer Bharat Nyas or their respective creators and are for personal, non-commercial viewing.'],['Creators','Creators publishing through Creator Studio retain ownership and grant the Nyas a licence to stream their work on the platform.'],['Conduct','Do not attempt to copy, redistribute or tamper with the service.'],['Changes','We may update these terms; we will notify you of significant changes.']]},
 help:{t:'Help centre',sub:'Answers to the most common questions.',sec:[['Is VBN OTT free?','Yes. Everything is free. Premium titles only ask you to sign in.'],['Which devices are supported?','Any modern browser on phone, tablet or computer. TV apps are planned.'],['Can I download?','Signed-in users can save episodes and audiobooks for offline listening on mobile.'],['How do reminders work?','Tap Remind me on the Schedule page and we will notify you when a new episode is released.'],['Language','The interface is in English; series, podcasts and books are in Hindi.']]}};

function render(c){
 const D=window.VBN3,st=c.state,set=o=>c.setState(o);
 const w=st.w,mob=w<820,rail=!mob&&(st.rail||w<1240);
 const go=(page,p)=>()=>c.go(page,p||{});
 const sOf=id=>D.S.find(s=>s.id===id)||{id:'podcast',n:'वीर भारत पॉडकास्ट',tag:'संवाद',img16:'art/16x9/podcast.jpg',img1:'art/1x1/podcast.jpg',img9:'art/9x16/podcast.jpg',eps:[],parts:[],g:'Podcast',total:0,rel:0};
 const page=st.page,p=st.p||{};
 const act={seriesD:'series',watch:'series',event:'events',doc:'about'}[page]||page;
 const NAV=[['h','Watch'],['home','Home',I.home],['live','Live TV',I.live],['series','Series',I.series,'शृंखला'],['shorts','Shorts',I.shorts],['premium','Premium',I.crown],['h','Listen & Read'],['podcasts','Podcasts',I.mic],['audiobooks','Audiobooks',I.head],['books','Books',I.book],['h','Veer Bharat Nyas'],['events','Events',I.star,'आयोजन'],['schedule','Schedule',I.cal],['quiz','Quiz',I.quiz],['about','About the Nyas',I.info],['h','You'],['library','My Library',I.mark]];
 const nav=NAV.map((n,i)=>{if(n[0]==='h')return{key:i,isHead:true,isItem:false,label:n[1]};const on=act===n[0];return{key:i,isHead:false,isItem:true,label:n[1],sub:n[3]||'',ic:n[2],go:go(n[0]),bg:on?'rgba(242,188,79,.14)':'transparent',col:on?'#FFFFFF':'#D9CDB8',icol:n[0]==='premium'?'#F2BC4F':on?'#F2BC4F':'#A99C88',bar:on?'#F2BC4F':'transparent',live:n[0]==='live',fw:on?700:600}});
 const navRail=nav.filter(n=>n.isItem);
 const tabs=[['home','Home',I.home],['series','Series',I.series],['shorts','Shorts',I.shorts],['live','Live',I.live]].map(t=>({label:t[1],ic:t[2],go:go(t[0]),col:act===t[0]?'#F2BC4F':'#A99C88'}));
 const lib=st.list||{};
 const toggleList=id=>()=>{const l=Object.assign({},st.list);l[id]?delete l[id]:l[id]=1;set({list:l,toast:l[id]?'Added to My List':'Removed from My List'});c.toastOff()};
 // HERO
 const HS=['geeta-amrit','mahadev','sadanira','hamare-ram','mahajanpad','mahakal'].map(sOf);
 const hi=st.hero%HS.length;
 const slides=HS.map((s,i)=>({key:s.id,img:mob?s.img9:s.img16,op:i===hi?1:0,kb:i===hi?'scale(1.09)':'scale(1)',tr:i===hi?'opacity 1.2s ease, transform 9s linear':'opacity 1.2s ease, transform 0s linear 1.3s'}));
 const H=HS[hi];
 const hero={tag:H.tag,d:H.d,g:H.g,eps:H.rel+' of '+H.total+' episodes',day:'New every '+D.DAYS[H.day]+' · '+H.time,play:go('watch',{sid:H.id,ep:0}),info:go('seriesD',{id:H.id}),inList:!!lib[H.id],notInList:!lib[H.id],toggle:toggleList(H.id),num:String(hi+1).padStart(2,'0'),pre:!!H.pre};
 const heroThumbs=HS.map((s,i)=>({key:s.id,img:s.img16,n:s.n,go:()=>set({hero:i}),bw:i===hi?'100%':'0%',btr:i===hi?'width 8s linear':'none',op:i===hi?1:.62,bd:i===hi?'#F2BC4F':'rgba(255,255,255,.18)'}));
 const heroDots=HS.map((s,i)=>({key:s.id,go:()=>set({hero:i}),w:i===hi?'22px':'8px',bg:i===hi?'#F2BC4F':'rgba(255,255,255,.45)'}));
 const nowH=new Date().getHours();let li=0;D.LIVE.forEach((l,i)=>{if(parseInt(l[0])<=nowH)li=i});
 const liveNow=D.LIVE[li],liveNext=D.LIVE[(li+1)%D.LIVE.length];
 // ROWS
 const cont=[['geeta-amrit',1,62],['mahajanpad',0,35],['hamare-ram',1,18]].map(a=>{const s=sOf(a[0]);return{key:a[0],img:s.img16,n:s.n,ep:'E'+(a[1]+1)+' · '+s.parts[a[1]],pct:a[2]+'%',left:Math.round(s.eps[a[1]].m*(1-a[2]/100))+' min left',go:go('watch',{sid:s.id,ep:a[1]})}});
 const top=D.S.filter(s=>s.top).sort((a,b)=>a.top-b.top).map(s=>({key:s.id,num:s.top,img:s.img9,n:s.n,g:s.g,go:go('seriesD',{id:s.id})}));
 const card16=s=>({key:s.id,img:s.img16,n:s.n,tag:s.tag,g:s.g,meta:s.rel+'/'+s.total+' episodes',day:D.DAYS[s.day]+' '+s.time,go:go('seriesD',{id:s.id}),pre:!!s.pre,inList:!!lib[s.id]});
 const seriesRow=D.S.map(card16);
 const newEps=D.S.slice(0,8).map(s=>({key:s.id,img:s.img16,n:s.n,t:'E'+s.rel+' · '+s.parts[s.rel-1],m:s.eps[s.rel-1].m+' min',go:go('watch',{sid:s.id,ep:s.rel-1})}));
 const shortsRow=D.SH.map((x,i)=>({key:x.id,img:x.img,t:x.t,l:x.l,go:()=>{c.go('shorts');set({shortI:i})}}));
 const podsRow=D.PODS.map(x=>({key:x.id,img:x.img,n:x.n,sub:x.sub,cnt:x.list.length+' episodes',go:()=>{c.go('podcasts');set({pod:x.id})}}));
 const abRow=D.AB.map(x=>({key:x.id,img:x.img,n:x.n,sub:x.sub,hrs:x.hrs,go:()=>{c.go('audiobooks');set({ab:x.id,abCh:0})}}));
 const evCard=e=>({key:e.id,img:e.img,img1:e.img1,n:e.n,dates:e.dates,where:e.where,sum:e.sum,yr:e.yr,go:go('event',{id:e.id}),hasPod:!!e.pod,hasBooks:e.books.length>0,nb:e.books.length+' books',days:e.days+(e.days>1?' days':' day')});
 const evRow=D.EV.map(evCard);
 const bkCard=b=>({key:b.id,img:b.img||'',hasImg:!!b.img,noImg:!b.img,n:b.n,s:b.s,subj:b.subj,c0:b.c?b.c[0]:'#222',c1:b.c?b.c[1]:'#E9B54F',go:()=>set({bk:b.id}),hasAb:!!b.ab,fromEv:!!b.ev});
 const booksRow=D.BK.map(bkCard);
 const premRow=D.PREM.map(x=>({key:x.id,img:x.img,t:x.t,k:x.k,locked:!st.signed,open:!!st.signed,go:st.signed?(x.ev?go('event',{id:x.ev}):go('seriesD',{id:x.s})):()=>set({auth:true,authTab:'in'})}));
 // SCHEDULE
 const today=new Date();today.setHours(0,0,0,0);
 const epAt=(s,d)=>{const wk=Math.round((d-today)/(7*864e5)+(d.getDay()<today.getDay()?0:0));let n=s.rel+Math.ceil((d-today)/(7*864e5));if(d<=today)n=s.rel-Math.floor((today-d)/(7*864e5));return n};
 const relOn=(d)=>{const out=[];D.S.forEach(s=>{if(s.day!==d.getDay())return;if(st.ss!=='all'&&st.ss!==s.id)return;const n=epAt(s,d);if(n<1||n>s.total)return;const past=d<today,isT=+d===+today;const key=s.id+'-'+n;out.push({key,s:s.id,img:s.img16,n:s.n,time:s.time,ep:'E'+n+' · '+s.parts[n-1],st:past?'Released':isT?'Today':'Upcoming',stc:past?'#A99C88':isT?'#F2BC4F':'#7FC79A',rem:!!(st.remind||{})[key],notRem:!(st.remind||{})[key],canRem:!past,go:past||isT?go('watch',{sid:s.id,ep:Math.min(n,s.rel)-1}):go('seriesD',{id:s.id}),toggle:()=>{const r=Object.assign({},st.remind);r[key]?delete r[key]:r[key]=1;set({remind:r,toast:r[key]?'Reminder set, '+s.n:'Reminder removed'});c.toastOff()}})});if(d.getDay()===6&&(st.ss==='all'||st.ss==='podcast'))out.push({key:'pod'+(+d),s:'podcast',img:'art/16x9/podcast.jpg',n:'वीर भारत पॉडकास्ट',time:'11:00 AM',ep:'नया संवाद',st:d<today?'Released':'Upcoming',stc:d<today?'#A99C88':'#7FC79A',canRem:false,rem:false,notRem:true,go:go('podcasts'),toggle:()=>{}});return out.sort((a,b)=>a.time.localeCompare(b.time))};
 const ws=new Date(today);ws.setDate(ws.getDate()-((ws.getDay()+6)%7)+7*(st.wk||0));
 const week=[0,1,2,3,4,5,6].map(i=>{const d=new Date(ws);d.setDate(ws.getDate()+i);const isT=+d===+today;const items=relOn(d);return{key:i,dn:D.DAYS[d.getDay()],dd:d.getDate(),mo:fmt(d),isT,bg:isT?'rgba(242,188,79,.08)':'#140F0B',bd:isT?'rgba(242,188,79,.55)':'rgba(242,200,120,.12)',hc:isT?'#F2BC4F':'#FFFFFF',items,empty:items.length===0}});
 const we=new Date(ws);we.setDate(ws.getDate()+6);
 const weekLabel=fmt(ws)+' – '+fmt(we)+' '+we.getFullYear();
 const mb=new Date(today.getFullYear(),today.getMonth()+(st.mo||0),1);
 const ms=new Date(mb);ms.setDate(1-((mb.getDay()+6)%7));
 const month=Array.from({length:42},(_,i)=>{const d=new Date(ms);d.setDate(ms.getDate()+i);const inM=d.getMonth()===mb.getMonth();const items=inM?relOn(d):[];const isT=+d===+today;return{key:i,dd:d.getDate(),op:inM?1:.35,isT,bd:isT?'#F2BC4F':'rgba(242,200,120,.1)',dc:isT?'#1A1107':'#EADFCB',dbg:isT?'#F2BC4F':'transparent',items:items.slice(0,3),more:items.length>3?'+'+(items.length-3)+' more':'',hasMore:items.length>3}});
 const monthLabel=MON[mb.getMonth()]+' '+mb.getFullYear();
 const ssChips=[{id:'all',n:'All series'}].concat(D.S.map(s=>({id:s.id,n:s.n})),[{id:'podcast',n:'पॉडकास्ट'}]).map(x=>({key:x.id,n:x.n,go:()=>set({ss:x.id}),bg:st.ss===x.id?'#F2BC4F':'transparent',col:st.ss===x.id?'#1A1107':'#EADFCB',bd:st.ss===x.id?'#F2BC4F':'rgba(242,200,120,.22)'}));
 const svTabs=[['week','Weekly'],['month','Monthly'],['fest','Festival specials']].map(t=>({key:t[0],l:t[1],go:()=>set({sv:t[0]}),col:st.sv===t[0]?'#FFFFFF':'#A99C88',ul:st.sv===t[0]?'#F2BC4F':'transparent'}));
 const fest=D.FEST.map((f,i)=>{const s=sOf(f[2]);return{key:i,when:f[0],n:f[1],sub:f[3],img:s.img16,sn:s.n,go:go('seriesD',{id:s.id})}});
 const weekStrip=week.map(d=>({key:d.key,dn:d.dn,dd:d.dd,isT:d.isT,bd:d.bd,bg:d.bg,first:d.items[0]||null,has:d.items.length>0,none:d.items.length===0,cnt:d.items.length>1?'+'+(d.items.length-1):'',go:go('schedule')}));
 // SERIES LIST
 const genres=['All','Philosophy','Purana','Ramayana','History','Rivers','Documentary'];
 const sfChips=genres.map(g=>({key:g,l:g,go:()=>set({sf:g}),bg:st.sf===g?'#F2BC4F':'rgba(255,255,255,.04)',col:st.sf===g?'#1A1107':'#EADFCB',bd:st.sf===g?'#F2BC4F':'rgba(242,200,120,.18)'}));
 const seriesGrid=D.S.filter(s=>st.sf==='All'||s.g===st.sf).map(card16);
 // SERIES DETAIL
 let sd=null;if(page==='seriesD'){const s=sOf(p.id);sd={n:s.n,tag:s.tag,d:s.d,g:s.g,img:s.img16,rel:s.rel,total:s.total,day:'Every '+D.DAYS[s.day]+', '+s.time,play:go('watch',{sid:s.id,ep:0}),cont:go('watch',{sid:s.id,ep:Math.max(0,s.rel-1)}),inList:!!lib[s.id],notInList:!lib[s.id],toggle:toggleList(s.id),pre:!!s.pre,share:()=>{set({toast:'Link copied'});c.toastOff()},
  eps:s.eps.map(e=>({key:e.k,num:e.k+1,t:e.t,d:e.d,m:e.m+' min',img:s.img16,pos:(e.k*23)%100+'% 50%',on:e.on,off:!e.on,go:e.on?go('watch',{sid:s.id,ep:e.k}):()=>{},op:e.on?1:.55,when:e.on?'':'Releases '+fmt(new Date(today.getTime()+(((s.day-today.getDay()+7)%7)+7*(e.k-s.rel))*864e5)),cur:e.on?'pointer':'default'})),
  more:D.S.filter(x=>x.id!==s.id&&(x.g===s.g)).concat(D.S.filter(x=>x.id!==s.id&&x.g!==s.g)).slice(0,4).map(card16)}}
 // WATCH
 let wv=null;if(page==='watch'){const s=sOf(p.sid);const k=Math.min(p.ep||0,Math.max(0,s.eps.length-1));const e=s.eps[k]||{t:'',m:20,d:''};const dur=e.m*60,pos=st.playing?(st.tick*7)%dur:Math.round(dur*.18);const mm=x=>Math.floor(x/60)+':'+String(x%60).padStart(2,'0');
  wv={sn:s.n,t:'E'+(k+1)+' · '+e.t,d:e.d,img:s.img16,pct:(pos/dur*100).toFixed(1)+'%',pos:mm(pos),dur:mm(dur),playing:!!st.playing,paused:!st.playing,toggle:()=>set({playing:!st.playing}),series:go('seriesD',{id:s.id}),inList:!!lib[s.id],notInList:!lib[s.id],toggleList:toggleList(s.id),g:s.g,
   chapters:['परिचय','प्रश्न','संवाद','दृश्य','अमृत-सूत्र'].map((n,i)=>({key:i,n,img:s.img16,pos:(i*25)+'% 50%',t:mm(Math.round(dur*i/5)),on:i===Math.floor(pos/dur*5),bd:i===Math.floor(pos/dur*5)?'#F2BC4F':'transparent'})),
   queue:s.eps.map(q=>({key:q.k,img:s.img16,pos:(q.k*23)%100+'% 50%',t:'E'+(q.k+1)+' · '+q.t,m:q.m+' min',on:q.on,off:!q.on,cur:q.k===k,bg:q.k===k?'rgba(242,188,79,.12)':'transparent',go:q.on?go('watch',{sid:s.id,ep:q.k}):()=>{},op:q.on?1:.5})),
   next:s.eps[k+1]&&s.eps[k+1].on?go('watch',{sid:s.id,ep:k+1}):null,hasNext:!!(s.eps[k+1]&&s.eps[k+1].on)}}
 // SHORTS
 const si=st.shortI%D.SH.length,SHc=D.SH[si],shS=sOf(SHc.s);
 const short={img:SHc.img,t:SHc.t,l:SHc.l,sn:shS.n,stag:shS.tag,simg:shS.img16,sgo:SHc.s==='podcast'?go('podcasts'):go('seriesD',{id:shS.id}),pct:((st.tick%15)/15*100)+'%',idx:(si+1)+' / '+D.SH.length,liked:!!(st.liked||{})[SHc.id],notLiked:!(st.liked||{})[SHc.id],likeCol:(st.liked||{})[SHc.id]?'#E5372B':'#FFFFFF',like:()=>{const l=Object.assign({},st.liked);l[SHc.id]?delete l[SHc.id]:l[SHc.id]=1;set({liked:l})},prev:()=>c.nextShort(-1),next:()=>c.nextShort(1),share:()=>{set({toast:'Link copied'});c.toastOff()}};
 const shortList=D.SH.map((x,i)=>({key:x.id,img:x.img,t:x.t,on:i===si,bg:i===si?'rgba(242,188,79,.12)':'transparent',bd:i===si?'#F2BC4F':'transparent',go:()=>set({shortI:i,tick:0})}));
 // PODCASTS
 const P=D.PODS.find(x=>x.id===st.pod)||D.PODS[0];
 const pl=st.player;
 const podTabs=D.PODS.map(x=>({key:x.id,img:x.img,n:x.n,sub:x.sub,go:()=>set({pod:x.id}),bd:x.id===P.id?'#F2BC4F':'rgba(242,200,120,.14)',bg:x.id===P.id?'rgba(242,188,79,.08)':'#140F0B'}));
 const podEv=P.ev?D.EV.find(e=>e.id===P.ev):null;
 const pod={n:P.n,sub:P.sub,img:P.img,cnt:P.list.length+' episodes',hasEv:!!podEv,evN:podEv?podEv.n+' · '+podEv.dates:'',evGo:podEv?go('event',{id:podEv.id}):()=>{},playAll:()=>c.play('pod',P.id,0),
  list:P.list.map(e=>{const on=pl&&pl.kind==='pod'&&pl.id===P.id&&pl.k===e.k;return{key:e.k,num:String(e.k+1).padStart(2,'0'),t:e.t,m:e.m+' min',on,off:!on,bg:on?'rgba(242,188,79,.1)':'transparent',col:on?'#F2BC4F':'#FFFFFF',go:()=>c.play('pod',P.id,e.k)}})};
 // AUDIOBOOKS
 const AB=D.AB.find(x=>x.id===st.ab)||D.AB[0];
 const abOn=pl&&pl.kind==='ab'&&pl.id===AB.id;const abK=abOn?pl.k:(st.abCh||0);
 const abDur=[24,31,27,35,22,29];
 const ab={n:AB.n,sub:AB.sub,img:AB.img,hrs:AB.hrs,chN:'अध्याय '+(abK+1)+' · '+AB.ch[abK],playing:abOn&&pl.on,paused:!(abOn&&pl.on),toggle:()=>abOn?c.togglePlay():c.play('ab',AB.id,abK),pct:abOn&&pl.on?((st.tick*3)%100)+'%':'22%',pos:abOn&&pl.on?Math.floor((st.tick*3)%100*abDur[abK%6]/100)+':'+String((st.tick*7)%60).padStart(2,'0'):'5:'+'18',dur:abDur[abK%6]+':00',book:()=>set({bk:AB.book}),
  prev:()=>c.play('ab',AB.id,Math.max(0,abK-1)),next:()=>c.play('ab',AB.id,Math.min(AB.ch.length-1,abK+1)),
  speeds:['0.75x','1x','1.25x','1.5x','2x'].map(x=>({key:x,l:x,go:()=>set({speed:x}),bg:st.speed===x?'#F2BC4F':'transparent',col:st.speed===x?'#1A1107':'#EADFCB'})),
  sleeps:['Off','15 min','30 min','End of chapter'].map(x=>({key:x,l:x,go:()=>set({sleep:x}),bg:st.sleep===x?'rgba(242,188,79,.16)':'transparent',col:st.sleep===x?'#F2BC4F':'#A99C88',bd:st.sleep===x?'#F2BC4F':'rgba(242,200,120,.2)'})),
  chs:AB.ch.map((t,i)=>({key:i,num:i+1,t,m:abDur[i%6]+' min',on:i===abK,bg:i===abK?'rgba(242,188,79,.1)':'transparent',col:i===abK?'#F2BC4F':'#FFFFFF',done:i<abK,go:()=>c.play('ab',AB.id,i)})),
  shelf:D.AB.map(x=>({key:x.id,img:x.img,n:x.n,hrs:x.hrs,on:x.id===AB.id,bd:x.id===AB.id?'#F2BC4F':'transparent',go:()=>set({ab:x.id,abCh:0})}))};
 // BOOK modal
 let bk=null;if(st.bk){const b=D.BK.find(x=>x.id===st.bk);if(b){const e=b.ev?D.EV.find(x=>x.id===b.ev):null;bk=Object.assign(bkCard(b),{by:b.by||'वीर भारत न्यास',pages:b.pages,ed:b.ed||'',hasEd:!!b.ed,toc:b.toc.map((t,i)=>({key:i,t,pg:String(1+i*18+(i?6:0))})),evN:e?e.n+' · '+e.dates:'',evGo:e?go('event',{id:e.id}):()=>{},abGo:b.ab?()=>{c.go('audiobooks');set({ab:b.ab,abCh:0})}:()=>{},close:()=>set({bk:null})}); bk.lines=[92,100,96,88,100,94,70,100,97,90,100,84,98,62].map((x,i)=>({key:i,w:x+'%'}));}}
 const bookSubj=['All'].concat([...new Set(D.BK.map(b=>b.subj))]);
 const bkChips=bookSubj.map(g=>({key:g,l:g,go:()=>set({bf:g}),bg:(st.bf||'All')===g?'#F2BC4F':'rgba(255,255,255,.04)',col:(st.bf||'All')===g?'#1A1107':'#EADFCB',bd:(st.bf||'All')===g?'#F2BC4F':'rgba(242,200,120,.18)'}));
 const booksGrid=D.BK.filter(b=>(st.bf||'All')==='All'||b.subj===st.bf).map(bkCard);
 // EVENTS
 const evYears=['All','2026','2025'].map(y=>({key:y,l:y==='All'?'All years':y,go:()=>set({evYear:y}),bg:st.evYear===y?'#F2BC4F':'transparent',col:st.evYear===y?'#1A1107':'#EADFCB',bd:st.evYear===y?'#F2BC4F':'rgba(242,200,120,.2)'}));
 const evList=D.EV.filter(e=>st.evYear==='All'||String(e.yr)===st.evYear).map(evCard);
 const evFeat=evCard(D.EV[0]);
 let ev=null;if(page==='event'){const e=D.EV.find(x=>x.id===p.id)||D.EV[0];const P2=e.pod?D.PODS.find(x=>x.id===e.pod):null;
  const T=[['overview','Overview'],['schedule','Programme'],['gallery','Photos & videos']].concat(P2?[['podcast','Podcast']]:[],e.books.length?[['books','Books released']]:[],[['social','Social'],['press','Press coverage']]);
  ev=Object.assign(evCard(e),{high:e.high.map((h,i)=>({key:i,h})),
   tabs:T.map(t=>({key:t[0],l:t[1],go:()=>set({evTab:t[0]}),col:st.evTab===t[0]?'#FFFFFF':'#A99C88',ul:st.evTab===t[0]?'#F2BC4F':'transparent'})),
   tOverview:st.evTab==='overview',tSchedule:st.evTab==='schedule',tGallery:st.evTab==='gallery',tPodcast:st.evTab==='podcast',tBooks:st.evTab==='books',tSocial:st.evTab==='social',tPress:st.evTab==='press',
   sched:e.sched.map((x,i)=>({key:i,when:x[0],t:x[1],k:x[2]})),
   gallery:[0,1,2,3,4,5,6,7].map(i=>({key:i,id:'ev-'+e.id+'-ph'+i,ph:['Opening ceremony','Main stage','Exhibition','Performance','Audience','Workshop','Guests','Closing'][i]+', drop photo',span:i===0?'span 2':'span 1'})),
   videos:[['उद्घाटन सत्र, पूर्ण प्रसारण','1:42:10'],['झलकियाँ','4:12'],['प्रमुख प्रस्तुति','38:40']].map((v,i)=>({key:i,t:v[0],d:v[1],img:i===0?e.img:e.img1,pos:(i*40)+'% 40%'})),
   podN:P2?P2.n:'',podImg:P2?P2.img:'',podSub:P2?P2.sub:'',podList:P2?P2.list.map(x=>({key:x.k,num:String(x.k+1).padStart(2,'0'),t:x.t,m:x.m+' min',go:()=>c.play('pod',P2.id,x.k)})):[],podGo:P2?()=>{c.go('podcasts');set({pod:P2.id})}:()=>{},
   books:e.books.map(id=>bkCard(D.BK.find(b=>b.id===id))),
   social:e.social.map((x,i)=>({key:i,pf:x.pf,pfl:{Instagram:'IG',X:'X',Facebook:'f',YouTube:'▶',Threads:'@'}[x.pf]||'•',who:x.who,txt:x.txt,real:!!x.real,demo:!x.real,url:x.url||'',id:'ev-'+e.id+'-so'+i,isVbn:x.who==='वीर भारत न्यास'})),
   press:e.press.map((x,i)=>({key:i,o:x[0],url:x[1],host:x[1].replace(/^https?:\/\/(www\.)?/,'').split('/')[0]})),
   adId:'ev-'+e.id+'-ad'});}
 // PREMIUM
 const premPerks=[['Ad-free','No sponsorship breaks'],['4K & Dolby','Best picture and sound'],['Early access','New episodes before everyone'],['Downloads','Watch and listen offline'],['Event recordings','Full performances from Nyas events']].map((x,i)=>({key:i,t:x[0],s:x[1]}));
 // LIVE
 const epg=D.LIVE.map((l,i)=>{const s=sOf(l[2]);return{key:i,time:l[0],t:l[1],img:s.img16,now:i===li,past:i<li,bg:i===li?'rgba(229,55,43,.12)':'transparent',bd:i===li?'#E5372B':'rgba(242,200,120,.1)',op:i<li?.55:1,go:s.id==='podcast'?go('podcasts'):go('seriesD',{id:s.id})}});
 const liveS=sOf(liveNow[2]);
 // SEARCH
 const q=(st.q||'').trim();let res=[];
 if(q){const m=t=>t&&t.toLowerCase().includes(q.toLowerCase());
  D.S.forEach(s=>{if(m(s.n)||m(s.tag)||m(s.g))res.push({key:'s'+s.id,img:s.img16,t:s.n,k:'Series',sub:s.tag,go:go('seriesD',{id:s.id})});s.eps.forEach(e=>{if(e.on&&m(e.t))res.push({key:'e'+s.id+e.k,img:s.img16,t:'E'+(e.k+1)+' · '+e.t,k:'Episode',sub:s.n,go:go('watch',{sid:s.id,ep:e.k})})})});
  D.SH.forEach((x,i)=>{if(m(x.t))res.push({key:x.id,img:x.img,t:x.t,k:'Short',sub:'',go:()=>{c.go('shorts');set({shortI:i})}})});
  D.PODS.forEach(x=>{if(m(x.n)||m(x.sub))res.push({key:x.id,img:x.img,t:x.n,k:'Podcast',sub:x.sub,go:()=>{c.go('podcasts');set({pod:x.id})}})});
  D.AB.forEach(x=>{if(m(x.n)||m(x.sub))res.push({key:x.id,img:x.img,t:x.n,k:'Audiobook',sub:x.sub,go:()=>{c.go('audiobooks');set({ab:x.id})}})});
  D.BK.forEach(x=>{if(m(x.n)||m(x.s))res.push({key:x.id,img:x.img||'assets/emblem-mark.png',t:x.n,k:'Book',sub:x.s,go:()=>set({bk:x.id})})});
  D.EV.forEach(x=>{if(m(x.n)||m(x.where))res.push({key:x.id,img:x.img,t:x.n,k:'Event',sub:x.dates,go:go('event',{id:x.id})})});}
 const sugg=['गीता','महादेव','नर्मदा','राम','महाभारत','उज्जैन','पत्रकारिता'].map(x=>({key:x,l:x,go:()=>set({q:x})}));
 // QUIZ
 const QZ=D.QUIZ,qi=Math.min(st.qi||0,QZ.length),qDone=qi>=QZ.length,Q=QZ[qi]||QZ[0],qS=sOf(Q.s);
 const quiz={done:qDone,notDone:!qDone,n:'Question '+(qi+1)+' of '+QZ.length,q:Q.q,picked:st.qp!=null,notPicked:st.qp==null,right:st.qp===Q.a,wrong:st.qp!=null&&st.qp!==Q.a,ans:Q.o[Q.a],sn:qS.n,simg:qS.img16,sgo:Q.s==='podcast'?go('podcasts'):go('seriesD',{id:qS.id}),score:st.qs||0,total:QZ.length,pct:((qi)/QZ.length*100)+'%',
  opts:Q.o.map((o,i)=>{const pk=st.qp!=null;const bd=!pk?'rgba(242,200,120,.2)':i===Q.a?'#5FB27A':i===st.qp?'#E5372B':'rgba(242,200,120,.12)';return{key:i,o,l:'ABCD'[i],bd,bg:pk&&i===Q.a?'rgba(95,178,122,.12)':pk&&i===st.qp?'rgba(229,55,43,.1)':'#140F0B',go:()=>{if(st.qp!=null)return;set({qp:i,qs:(st.qs||0)+(i===Q.a?1:0)})}}}),
  next:()=>set({qi:qi+1,qp:null}),restart:()=>set({qi:0,qp:null,qs:0}),isLast:qi===QZ.length-1,notLast:qi<QZ.length-1,
  verdict:(st.qs||0)>=4?'उत्कृष्ट! Excellent.':(st.qs||0)>=2?'अच्छा प्रयास. Good effort.':'Keep exploring, the series have the answers.'};
 // LIBRARY
 const listItems=D.S.filter(s=>lib[s.id]).map(card16);
 const remItems=Object.keys(st.remind||{}).map(k=>{const id=k.replace(/-\d+$/,''),n=+k.split('-').pop();const s=sOf(id);return{key:k,img:s.img16,n:s.n,ep:'E'+n+' · '+(s.parts[n-1]||''),go:go('seriesD',{id})}});
 const libTabs=[['list','My List'],['cont','Continue watching'],['rem','Reminders'],['dl','Downloads']].map(t=>({key:t[0],l:t[1],go:()=>set({libTab:t[0]}),col:st.libTab===t[0]?'#FFFFFF':'#A99C88',ul:st.libTab===t[0]?'#F2BC4F':'transparent'}));
 // DOC
 const doc=page==='doc'?DOCS[p.id]||DOCS.help:null;
 const docNav=Object.keys(DOCS).map(k=>({key:k,l:DOCS[k].t,go:go('doc',{id:k}),col:p.id===k?'#F2BC4F':'#EADFCB',bg:p.id===k?'rgba(242,188,79,.1)':'transparent'}));
 // ABOUT
 const pillars=[['आयोजन','Events','Festivals, samagams and national discourses at Bharat Bhavan and across Madhya Pradesh.',I.star],['प्रकाशन','Publications','Research volumes, anthologies and journals on rivers, history and Indian knowledge traditions.',I.book],['शोध','Research','Documentation of heritage, water structures, Mahajanpadas, Buddhist sites and living traditions.',I.quiz],['डिजिटल','VBN OTT','Series, podcasts, audiobooks and shorts that carry this work to every screen, free.',I.series]].map((x,i)=>({key:i,hi:x[0],en:x[1],d:x[2],ic:x[3]}));
 const miles=[['Jun 2025','सदानीरा समागम','First six-day water samagam','sadanira-samagam-2025'],['Jan 2026','महाभारत समागम','Four nations, nine days','mahabharat-samagam-2026'],['May 2026','प्रणाम उदन्त मार्तण्ड','200 years of Hindi journalism','udant-martand-2026'],['May 2026','सदानीरा समागम','Seven days on the Panchamahabhuta','sadanira-samagam-2026'],['Jun 2026','बौद्ध धरोहर सम्मेलन','Delegates from six countries','bauddh-2026']].map((m,i)=>({key:i,when:m[0],n:m[1],s:m[2],go:go('event',{id:m[3]})}));
 const partners=['भारत भवन, भोपाल','संस्कृति विभाग, मध्यप्रदेश शासन','माखनलाल चतुर्वेदी राष्ट्रीय पत्रकारिता एवं संचार विश्वविद्यालय','दी बुद्धभूमि धम्मदूत संघ, भोपाल','श्रीकृष्ण पाथेय न्यास'].map((x,i)=>({key:i,n:x}));
 const PL=st.player;let mini=null;
 if(PL&&!(page==='audiobooks'&&PL.kind==='ab')){const src=PL.kind==='pod'?D.PODS.find(x=>x.id===PL.id):D.AB.find(x=>x.id===PL.id);if(src){mini={img:src.img,t:PL.kind==='pod'?src.list[PL.k].t:'अध्याय '+(PL.k+1)+' · '+src.ch[PL.k],s:src.n,k:PL.kind==='pod'?'Podcast':'Audiobook',on:!!PL.on,off:!PL.on,toggle:()=>c.togglePlay(),close:()=>set({player:null}),pct:PL.on?((st.tick*2)%100)+'%':'30%',open:PL.kind==='pod'?()=>{c.go('podcasts');set({pod:PL.id})}:()=>{c.go('audiobooks');set({ab:PL.id})}}}}
 const label={home:'Home',live:'Live TV',series:'Series',seriesD:'Series detail',watch:'Watch',shorts:'Shorts',premium:'Premium',podcasts:'Podcasts',audiobooks:'Audiobooks',books:'Books',events:'Events',event:'Event detail',schedule:'Schedule',quiz:'Quiz',about:'About',library:'My Library',search:'Search',doc:'Docs'}[page]||page;
 const solid=page!=='home'||st.sc;
 return {ready:true,notReady:false,mob,desk:!mob,rail,full:!mob&&!rail,sideW:rail?'88px':'248px',px:mob?'16px':'clamp(24px,3vw,52px)',screenLabel:label,
  nav,navRail,tabs,toggleRail:()=>set({rail:!st.rail}),openDrawer:()=>set({drawer:true}),closeDrawer:()=>set({drawer:false}),drawer:!!st.drawer,
  topBg:solid?'rgba(11,8,6,.94)':'linear-gradient(180deg,rgba(11,8,6,.75),rgba(11,8,6,0))',topBd:solid?'rgba(242,200,120,.12)':'transparent',topBlur:solid?'blur(14px)':'none',
  goHome:go('home'),goSearch:go('search'),goLive:go('live'),goPremium:go('premium'),goSeries:go('series'),goShorts:go('shorts'),goPods:go('podcasts'),goAB:go('audiobooks'),goBooks:go('books'),goEvents:go('events'),goSched:go('schedule'),goQuiz:go('quiz'),goAbout:go('about'),goLib:go('library'),
  goContact:go('doc',{id:'contact'}),goPrivacy:go('doc',{id:'privacy'}),goTerms:go('doc',{id:'terms'}),goHelp:go('doc',{id:'help'}),
  signed:!!st.signed,notSigned:!st.signed,openAuth:()=>set({auth:true,authTab:'in'}),openReg:()=>set({auth:true,authTab:'up'}),auth:!!st.auth,closeAuth:()=>set({auth:false}),
  authIn:st.authTab==='in',authUp:st.authTab==='up',tabIn:()=>set({authTab:'in'}),tabUp:()=>set({authTab:'up'}),
  tInCol:st.authTab==='in'?'#FFFFFF':'#A99C88',tInUl:st.authTab==='in'?'#F2BC4F':'transparent',tUpCol:st.authTab==='up'?'#FFFFFF':'#A99C88',tUpUl:st.authTab==='up'?'#F2BC4F':'transparent',
  doSign:()=>{set({signed:true,auth:false,toast:'Welcome, Premium is now unlocked'});c.toastOff()},signOut:()=>set({signed:false}),
  isHome:page==='home',isSeries:page==='series',isSeriesD:page==='seriesD'&&!!sd,isWatch:page==='watch'&&!!wv,isShorts:page==='shorts',isPods:page==='podcasts',isAB:page==='audiobooks',isBooks:page==='books',isEvents:page==='events',isEvent:page==='event'&&!!ev,isPremium:page==='premium',isSched:page==='schedule',isLive:page==='live',isAbout:page==='about',isSearch:page==='search',isLib:page==='library',isQuiz:page==='quiz',isDoc:page==='doc'&&!!doc,
  loading:!!st.loading,
  slides,hero,heroThumbs,heroDots,heroPrev:()=>set({hero:(hi+HS.length-1)%HS.length}),heroNext:()=>set({hero:(hi+1)%HS.length}),
  liveNowT:liveNow[1],liveNowTime:liveNow[0],liveNextT:liveNext[1],liveNextTime:liveNext[0],liveImg:liveS.img16,
  cont,top,seriesRow,newEps,shortsRow,podsRow,abRow,evRow,booksRow,premRow,weekStrip,rowScroll:e=>{const b=e.currentTarget,el=document.getElementById(b.getAttribute('data-row'));if(el)el.scrollBy({left:(+b.getAttribute('data-dir'))*el.clientWidth*.8,behavior:'smooth'})},
  sfChips,seriesGrid,seriesCount:seriesGrid.length+' series',sd:sd||{},wv:wv||{},short,shortList,podTabs,pod,ab,bk:bk||{},hasBk:!!bk,bkChips,booksGrid,
  evYears,evList,evFeat,ev:ev||{},premPerks,epg,
  q:st.q||'',onQ:e=>set({q:e.target.value}),res,hasRes:res.length>0,noRes:!!q&&res.length===0,noQ:!q,sugg,resCount:res.length+' results for “'+q+'”',
  quiz,libTabs,lList:st.libTab==='list',lCont:st.libTab==='cont',lRem:st.libTab==='rem',lDl:st.libTab==='dl',listItems,listEmpty:listItems.length===0,remItems,remEmpty:remItems.length===0,
  doc:doc||{sec:[]},docSecs:doc?doc.sec.map((s,i)=>({key:i,num:String(i+1).padStart(2,'0'),t:s[0],b:s[1],id:'sec-'+i})):[],docNav,isContact:p.id==='contact',
  pillars,miles,partners,
  week,weekLabel,month,monthLabel,ssChips,svTabs,fest,vWeek:st.sv==='week',vMonth:st.sv==='month',vFest:st.sv==='fest',wkPrev:()=>set({wk:(st.wk||0)-1}),wkNext:()=>set({wk:(st.wk||0)+1}),wkNow:()=>set({wk:0,mo:0}),moPrev:()=>set({mo:(st.mo||0)-1}),moNext:()=>set({mo:(st.mo||0)+1}),
  mini:mini||{},hasMini:!!mini,toast:st.toast||'',hasToast:!!st.toast,
  shGrid:mob?'1fr':w<1180?'minmax(0,1fr) 300px':'260px minmax(0,1fr) 320px',showShList:!mob&&w>=1180,
  cols2:mob||w<1000?'1fr':'minmax(0,1.1fr) minmax(340px,1fr)',colsW:mob||w<1100?'1fr':'minmax(0,1fr) 380px',colsAB:mob||w<1000?'1fr':'minmax(300px,420px) minmax(0,1fr)',colsAbout:mob?'1fr':'repeat(4,minmax(0,1fr))',colsDoc:mob?'1fr':'240px minmax(0,1fr)',colsAuth:mob?'1fr':'minmax(0,.9fr) minmax(0,1.1fr)',authSide:!mob,colsEvHead:mob||w<1000?'1fr':'minmax(0,1.1fr) minmax(0,1fr)',colsWeek:mob?'1fr':'repeat(7,minmax(150px,1fr))',heroH:mob?'78vh':'100vh',heroInfoB:mob?'64px':'clamp(150px,19vh,240px)',heroTitle:mob?'30px':'clamp(38px,3.6vw,60px)',
  epgCols:mob?'1fr':'minmax(0,1fr) 380px'};
}
window.VBN3APP={render,I};
})();
