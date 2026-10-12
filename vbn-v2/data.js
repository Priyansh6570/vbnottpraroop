(function(){
const V=window.VBN=window.VBN||{};
const QS=['अर्जुन का संशय','कर्म और फल','कर्तव्य','स्वधर्म','मन','क्रोध','मोह','भय','इच्छा','आसक्ति','सफलता-असफलता','समत्व','स्थितप्रज्ञता','आत्मा और शरीर','ज्ञान','भक्ति','अहंकार','त्याग','योग','जीवन का उद्देश्य','मृत्यु','कठिन समय में निर्णय'];
const JP=['अंग','मगध','काशी','कोशल','वत्स','अवंति','चेदि','कुरु','पांचाल','मत्स्य','शूरसेन','अश्मक','गांधार','कम्बोज','वज्जि','मल्ल'];
const JPXY=[[78,50],[72,54],[63,50],[60,40],[56,52],[34,62],[47,60],[38,28],[46,32],[32,40],[40,42],[38,82],[16,14],[10,24],[70,40],[66,36]];
const KD=['बालकाण्ड','अयोध्याकाण्ड','अरण्यकाण्ड','किष्किन्धाकाण्ड','सुन्दरकाण्ड','युद्धकाण्ड','उत्तरकाण्ड'];
const PE=[{id:'mahabharat',n:'महाभारत',img:'podcast-mahabharat'},{id:'sadanira-samagam',n:'सदानीरा समागम',img:'podcast-sadanira-samagam'},{id:'udant-martand',n:'उदन्त मार्तण्ड',img:'podcast-udant-martand'},{id:'yuva-samvad',n:'युवा संवाद',img:'podcast-yuva-samvad'}];
const GCH=['प्रश्न','गुरु-शिष्य संवाद','दृश्य','श्लोक, स्वर और संगीत','विद्वान','अमृत-सूत्र'];
const rng=n=>Array.from({length:n},(_,i)=>i);
const SR={
 'geeta-amrit':{n:'गीता अमृत',d:'श्रीमद्भगवद्गीता से आरंभ होकर गीता-संवादों की पूरी परंपरा तक। हर एपिसोड आज के जीवन के एक प्रश्न से शुरू होता है।',u:'जीवन के प्रश्न',unit:'प्रश्न',subj:'दर्शन',type:'श्रृंखला',parts:QS.map((n,i)=>({name:n,eps:i<3?1:0,st:i<3?'on':'soon'}))},
 'mahadev':{n:'महादेव',d:'84 महादेव और सृष्टि तथा प्रलय की कथा।',u:'84 महादेव',unit:'महादेव',subj:'पुराण',type:'श्रृंखला',numbered:true,parts:rng(84).map(i=>({name:'महादेव '+(i+1),eps:i<6?3:0,st:i<6?'on':'soon'}))},
 'mahakal':{n:'महाकाल : सृष्टि का समय',d:'काल का रहस्य, सृष्टि की उत्पत्ति, युग-चक्र और ब्रह्मांडीय व्यवस्था।',u:'प्रत्येक पात्र',unit:'पात्र',subj:'पुराण',type:'श्रृंखला',ex:true,parts:rng(6).map(i=>({name:'पात्र '+(i+1),eps:i<3?1:0,st:i<3?'on':'soon'}))},
 'mahagatha':{n:'महागाथा',d:'विष्णु पुराण और अन्य पुराणों की गाथाएँ, विष्णु के अवतारों के माध्यम से।',u:'विष्णु के अवतार',unit:'अवतार',subj:'पुराण',type:'श्रृंखला',ex:true,parts:rng(6).map(i=>({name:'अवतार '+(i+1),eps:i<2?2:0,st:i<2?'on':'soon'}))},
 'yugyugin-bharatvanshi':{n:'युगयुगीन भारतवंशी',d:'भारतीय समुदायों पर वृत्तचित्र।',u:'प्रत्येक समुदाय',unit:'समुदाय',subj:'इतिहास',type:'वृत्तचित्र',ex:true,parts:rng(6).map(i=>({name:'समुदाय '+(i+1),eps:i<4?1:0,st:i<4?'on':'soon'}))},
 'mahajanpad':{n:'महाजनपद',d:'प्राचीन भारत के सोलह महाजनपद। आरंभ अवंति से, फिर मगध।',u:'सोलह महाजनपद',unit:'जनपद',subj:'इतिहास',type:'श्रृंखला',world:'mahajanpad',start:5,parts:JP.map((n,i)=>({name:n,eps:i===5?12:0,st:i===5?'on':i===1?'soon':'wait'}))},
 'sadanira':{n:'सदानीरा',d:'भारत की पवित्र नदियों, तीर्थों और उनसे जुड़ी परंपराओं की यात्रा।',u:'प्रत्येक नदी',unit:'नदी',subj:'नदियाँ और तीर्थ',type:'श्रृंखला',ex:true,world:'sadanira',parts:rng(5).map(i=>({name:'नदी '+(i+1),eps:i<3?3:0,st:i<3?'on':'soon'}))},
 'purvaj-shri-ram-ke':{n:'पूर्वज श्री राम के',d:'इक्ष्वाकु वंश, जिसमें श्री राम का जन्म हुआ।',u:'प्रत्येक पीढ़ी',unit:'पीढ़ी',subj:'रामायण',type:'श्रृंखला',ex:true,world:'purvaj',parts:rng(8).map(i=>({name:'पीढ़ी '+(i+1),eps:i<4?2:0,st:i<4?'on':'soon'}))},
 'hamare-ram':{n:'हमारे राम',d:'अयोध्या से रामेश्वरम् तक, वनवास से रामराज्य तक।',u:'रामायण के काण्ड',unit:'काण्ड',subj:'रामायण',type:'श्रृंखला',parts:KD.map((n,i)=>({name:n,eps:i<2?3:0,st:i<2?'on':'soon'}))},
 'mahaganadhipati-ganesh':{n:'महागणाधिपति गणेश',d:'गणेश का दिव्य स्वरूप, उनका जन्म, लीलाएँ, रूप और प्रतीक।',u:'गणेश के स्वरूप',unit:'स्वरूप',subj:'पुराण',type:'श्रृंखला',ex:true,parts:rng(8).map(i=>({name:'स्वरूप '+(i+1),eps:i<4?1:0,st:i<4?'on':'soon'}))},
 'podcast':{n:'वीर भारत पॉडकास्ट',d:'संस्करण : महाभारत, सदानीरा समागम, उदन्त मार्तण्ड, युवा संवाद।',u:'प्रत्येक आयोजन का संस्करण',unit:'संस्करण',subj:'संवाद',type:'पॉडकास्ट',parts:PE.map(p=>({name:p.n,eps:3,st:'on'}))},
 'tapodhara':{n:'तपोधरा',d:'आगामी शृंखला।',u:'',unit:'',subj:'इतिहास',type:'श्रृंखला',upcoming:true,parts:[]}
};
const ORDER=['geeta-amrit','mahadev','mahakal','mahagatha','yugyugin-bharatvanshi','mahajanpad','sadanira','purvaj-shri-ram-ke','hamare-ram','mahaganadhipati-ganesh'];
const V9=['geeta-amrit','hamare-ram','mahaganadhipati-ganesh','mahajanpad','podcast','purvaj-shri-ram-ke','sadanira','yugyugin-bharatvanshi'];
const CAT=['ऋषि','संत','योद्धा','कवि','विचारक','वैज्ञानिक'];
const PEOPLE=[];CAT.forEach(c=>{for(let i=1;i<=3;i++)PEOPLE.push({id:'p'+PEOPLE.length,name:c+' '+i,cat:c})});
const GUESTS=rng(8).map(i=>({id:'g'+i,name:'अतिथि '+(i+1),role:['विद्वान','कलाकार','शोधकर्ता','रंगकर्मी'][i%4],ed:i%4}));
const BK=[
 {id:'amrit',n:'अमृत जलधारा',s:'मध्यप्रदेश की नदियों का भू-वैज्ञानिक एवं तकनीकि परिदृश्य',img:'amrit-jaldhara-2',img2:'amrit-jaldhara-1',ar:1.5,subj:'नदियाँ और जल',vols:[{v:'भाग- तृतीय',r:'गंगा नदी',img:'amrit-jaldhara-2'},{v:'भाग- चतुर्थ',r:'यमुना नदी',img:'amrit-jaldhara-1'}],rel:['sadanira']},
 {id:'shipra',n:'शिप्रा अमरता का आह्वान',img:'book-07',ar:1.5,subj:'नदियाँ और जल',rel:['sadanira']},
 {id:'prithvi',n:'पृथ्वी पानी का देश है',s:'जल केन्द्रित कविताओं का संचयन',img:'prithvi-pani-ka-desh-hai',ar:1,subj:'कविता',rel:[]},
 {id:'sadanira-b',n:'सदानीरा',s:'जल का उत्सव',img:'sadanira',ar:1.02,subj:'नदियाँ और जल',rel:['sadanira']},
 {id:'tapodhara-b',n:'तपोधरा मध्यप्रदेश',img:'tapodhara-madhyapradesh',ar:1,subj:'मध्यप्रदेश',rel:[]}];
const CH=[{id:'vbn',n:'वीर भारत न्यास',k:'अधिष्ठान, संस्कृति विभाग, मध्यप्रदेश शासन',type:'न्यास',vbn:true},
 {id:'ex1',n:'उदाहरण चैनल 1',k:'रचनाकार',type:'रचनाकार'},{id:'ex2',n:'उदाहरण संस्थान 1',k:'संस्थान',type:'संस्थान'},
 {id:'ex3',n:'उदाहरण चैनल 2',k:'न्यास फ़ेलो',type:'रचनाकार'},{id:'ex4',n:'उदाहरण संस्थान 2',k:'संस्थान',type:'संस्थान'},{id:'ex5',n:'उदाहरण चैनल 3',k:'रचनाकार',type:'रचनाकार'}];
const CSER=[{id:'cs1',n:'उदाहरण श्रृंखला 1',ch:'ex1',subj:'इतिहास',type:'श्रृंखला'},{id:'cs2',n:'उदाहरण श्रृंखला 2',ch:'ex2',subj:'पुराण',type:'वृत्तचित्र'},{id:'cs3',n:'उदाहरण श्रृंखला 3',ch:'ex4',subj:'नदियाँ और तीर्थ',type:'श्रृंखला'},{id:'cs4',n:'उदाहरण पॉडकास्ट 1',ch:'ex3',subj:'संवाद',type:'पॉडकास्ट'}];
const INTERESTS=[{l:'गीता और दर्शन',rows:['geeta']},{l:'पुराण',rows:['orig']},{l:'रामायण',rows:['collection']},{l:'इतिहास और जनपद',rows:['orig']},{l:'नदियाँ और तीर्थ',rows:['collection']},{l:'पॉडकास्ट',rows:['pod']},{l:'पुस्तकें',rows:['books']},{l:'आयोजन और लाइव',rows:['live']},{l:'शॉर्ट्स',rows:['shorts']},{l:'रचनाकार',rows:['channels']}];
const HOMEROWS=[['cont','जहाँ छोड़ा था'],['festival','आज का पर्व कार्यक्रम'],['geeta','गीता अमृत'],['orig','न्यास मूल श्रृंखलाएँ'],['new','नए एपिसोड'],['live','लाइव और आगामी आयोजन'],['shorts','शॉर्ट्स'],['pod','पॉडकास्ट'],['books','पुस्तकें'],['channels','रचनाकार और संस्थान'],['collection','संग्रह'],['sponsor','सौजन्य से']];
const FESTS=[['महाशिवरात्रि','mahadev'],['रामनवमी','hamare-ram'],['गणेश चतुर्थी','mahaganadhipati-ganesh'],['गंगा दशहरा','sadanira'],['गीता जयंती','geeta-amrit']];
const STATES=['मध्यप्रदेश','उत्तर प्रदेश','राजस्थान','महाराष्ट्र','गुजरात','बिहार','दिल्ली','अन्य राज्य','भारत से बाहर'];
V.D={QS,JP,JPXY,KD,PE,GCH,SR,ORDER,V9,CAT,PEOPLE,GUESTS,BK,CH,CSER,INTERESTS,HOMEROWS,FESTS,STATES,L:1200,
  EV:[{id:'sadanira-samagam',ed:1},{id:'mahabharat',ed:0},{id:'udant-martand',ed:2},{id:'yuva-samvad',ed:3}],
  SUTRA:rng(8).map(i=>({n:i+1,t:'अमृत-सूत्र '+(i+1)+' : नमूना सूत्र पाठ, जो एपिसोड के अंत में आता है।'})),
  SHLOKA:rng(6).map(i=>({n:i+1,lines:[['श्लोक',String(i+1),'की','पहली','पंक्ति'],['नमूना','पाठ','की','दूसरी','पंक्ति']],m:'श्लोक '+(i+1)+' का अर्थ यहाँ आएगा। यह नमूना पाठ है।'})),
  MALA:['श्रीमद्भगवद्गीता'].concat(rng(11).map(i=>'आगामी '+(i+1)))
};
V.newDB=()=>({
  signed:false,user:{name:'',email:'',mobile:'',region:'मध्यप्रदेश',lang:'हिन्दी',interests:[]},interests:[],
  saved:{},prog:{},hist:[],downloads:[],remind:{},follows:{},
  notifs:[{id:'n1',title:'नया एपिसोड : महादेव 1',text:'महादेव श्रृंखला में नया एपिसोड जुड़ा है।',path:'/watch/mahadev/0/0',read:false,kind:'नया एपिसोड',time:'नमूना'},
    {id:'n2',title:'प्रीमियर : गीता अमृत',text:'प्रीमियर की तिथि की घोषणा शीघ्र होगी।',path:'/premiere',read:false,kind:'प्रीमियर',time:'नमूना'},
    {id:'n3',title:'आयोजन : सदानीरा समागम',text:'आयोजन पृष्ठ पर पॉडकास्ट और चित्र देखें।',path:'/event/sadanira-samagam',read:true,kind:'आयोजन',time:'नमूना'}],
  homeRows:V.D.HOMEROWS.map(r=>({id:r[0],on:true})),festival:0,
  premiere:{sid:'geeta-amrit',date:''},
  live:{url:'',on:false,ad:false,ev:'sadanira-samagam',done:false},
  evDates:{},
  creator:{status:'none',type:'',name:'',email:'',mobile:'',org:'',orgRole:'',portfolio:'',agree:false,step:0},
  apps:[{id:'a1',name:'उदाहरण आवेदक 1',type:'रचनाकार',status:'pending'},{id:'a2',name:'उदाहरण संस्था 1',type:'संस्थान',status:'pending'}],
  subs:[{id:'s1',title:'उदाहरण वीडियो 1',desc:'नमूना विवरण',sid:'',ch:'ex1',status:'review',comment:'',kind:'वीडियो',people:[],chapters:['परिचय']},
        {id:'s2',title:'उदाहरण वीडियो 2',desc:'नमूना विवरण',sid:'',ch:'ex2',status:'approved',comment:'',kind:'वीडियो',people:[],chapters:['परिचय']},
        {id:'s3',title:'उदाहरण शॉर्ट 1',desc:'नमूना विवरण',sid:'',ch:'ex3',status:'review',comment:'',kind:'शॉर्ट',people:[],chapters:[]}],
  channel:{name:'',intro:'',links:'',banner:false},
  settings:{subs:'बंद',quality:'स्वतः',dataSaver:false,text:'सामान्य',notif:{ep:true,prem:true,live:true,fest:true}},
  consent:{analytics:true,pads:false,email:false},
  ads:{on:true,cap:3,pre:true,mid:true,display:true,camps:[{id:'c1',name:'उदाहरण अभियान 1',kind:'निजी विज्ञापन',where:'मुख्य पृष्ठ',on:true},{id:'c2',name:'उदाहरण प्रायोजन 1',kind:'श्रृंखला प्रायोजन',where:'महादेव',on:true}],
    spots:[{id:'sp1',n:'एपिसोड से पहले',on:true},{id:'sp2',n:'अध्याय विराम पर',on:true},{id:'sp3',n:'मुख्य पृष्ठ प्रदर्शन',on:true},{id:'sp4',n:'श्रृंखला पृष्ठ प्रदर्शन',on:true},{id:'sp5',n:'आयोजन पृष्ठ प्रदर्शन',on:true},{id:'sp6',n:'लाइव विराम',on:true}]},
  platform:{signups:true,creators:true,comments:false,maint:false},
  staff:[{n:'उदाहरण कर्मचारी 1',e:'staff1@example.in',r:'सुपर एडमिन'},{n:'उदाहरण कर्मचारी 2',e:'staff2@example.in',r:'सामग्री संपादक'},{n:'उदाहरण कर्मचारी 3',e:'staff3@example.in',r:'समीक्षक'}],
  admin:{signed:false},log:[],recentQ:[],seriesOrder:ORDER.slice(),titleEdit:{},customSeries:[],
  people:{},offline:false,errDemo:false,uploads:[],bulk:[],festSet:{}
});
})();
