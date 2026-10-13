(function(){
const A='art/';
const r=n=>Array.from({length:n},(_,i)=>i);
const QS=['अर्जुन का संशय','कर्म और फल','कर्तव्य','स्वधर्म','मन','क्रोध','मोह','भय','इच्छा','आसक्ति','सफलता-असफलता','समत्व'];
const JP=['अवंति','मगध','काशी','कोशल','वत्स','अंग','चेदि','कुरु','पांचाल','मत्स्य','शूरसेन','अश्मक','गांधार','कम्बोज','वज्जि','मल्ल'];
const KD=['बालकाण्ड','अयोध्याकाण्ड','अरण्यकाण्ड','किष्किन्धाकाण्ड','सुन्दरकाण्ड','युद्धकाण्ड','उत्तरकाण्ड'];
const S=[
 {id:'geeta-amrit',n:'गीता अमृत',tag:'जीवन के प्रश्न, गीता के उत्तर',d:'श्रीमद्भगवद्गीता से आरंभ होकर गीता-संवादों की पूरी परंपरा तक। हर एपिसोड आज के जीवन के एक प्रश्न से शुरू होता है, गुरु-शिष्य संवाद, दृश्य, श्लोक और अमृत-सूत्र के साथ।',g:'Philosophy',parts:QS,rel:3,day:1,time:'7:00 PM',v:1,top:1},
 {id:'mahadev',n:'महादेव',tag:'84 महादेव, सृष्टि और प्रलय की कथा',d:'उज्जैन के चौरासी महादेव मंदिरों की कथाएँ, हर मंदिर, उसकी कथा और उससे जुड़ी परंपरा।',g:'Purana',parts:r(12).map(i=>'महादेव '+(i+1)),rel:6,day:3,time:'7:00 PM',top:2,pre:1},
 {id:'mahajanpad',n:'महाजनपद',tag:'प्राचीन भारत के सोलह महाजनपद',d:'सोलह महाजनपदों का इतिहास, भूगोल और संस्कृति। आरंभ अवंति से, फिर मगध।',g:'History',parts:JP,rel:1,day:5,time:'8:00 PM',v:1,top:3},
 {id:'hamare-ram',n:'हमारे राम',tag:'अयोध्या से रामेश्वरम् तक',d:'वनवास से रामराज्य तक, रामायण के सात काण्डों की यात्रा, उन स्थानों पर जहाँ कथा घटी।',g:'Ramayana',parts:KD,rel:2,day:0,time:'10:00 AM',v:1,top:4},
 {id:'sadanira',n:'सदानीरा',tag:'नदियाँ, तीर्थ और परंपराएँ',d:'भारत की पवित्र नदियों, तीर्थों और उनसे जुड़ी परंपराओं की यात्रा, नर्मदा, शिप्रा, गंगा और अन्य।',g:'Rivers',parts:['नर्मदा','शिप्रा','गंगा','यमुना','बेतवा'],rel:3,day:6,time:'6:00 PM',v:1,top:5,pre:1},
 {id:'mahakal',n:'महाकाल',tag:'सृष्टि का समय',d:'काल का रहस्य, सृष्टि की उत्पत्ति, युग-चक्र और ब्रह्मांडीय व्यवस्था।',g:'Purana',parts:r(6).map(i=>'पात्र '+(i+1)),rel:3,day:2,time:'7:30 PM',pre:1},
 {id:'purvaj-shri-ram-ke',n:'पूर्वज श्री राम के',tag:'इक्ष्वाकु वंश की गाथा',d:'इक्ष्वाकु वंश की पीढ़ियाँ, जिसमें श्री राम का जन्म हुआ।',g:'Ramayana',parts:r(8).map(i=>'पीढ़ी '+(i+1)),rel:4,day:4,time:'7:00 PM',v:1,top:6},
 {id:'mahaganadhipati-ganesh',n:'महागणाधिपति गणेश',tag:'स्वरूप, लीलाएँ और प्रतीक',d:'गणेश का दिव्य स्वरूप, उनका जन्म, लीलाएँ, रूप और प्रतीक।',g:'Purana',parts:r(8).map(i=>'स्वरूप '+(i+1)),rel:4,day:4,time:'8:30 PM',v:1,top:7},
 {id:'mahagatha',n:'महागाथा',tag:'विष्णु के अवतार',d:'विष्णु पुराण और अन्य पुराणों की गाथाएँ, विष्णु के अवतारों के माध्यम से।',g:'Purana',parts:r(10).map(i=>'अवतार '+(i+1)),rel:2,day:2,time:'9:00 PM',pre:1},
 {id:'yugyugin-bharatvanshi',n:'युगयुगीन भारतवंशी',tag:'भारतीय समुदायों पर वृत्तचित्र',d:'भारत और विश्व में बसे भारतीय समुदायों पर वृत्तचित्र, उनकी स्मृति, भाषा और परंपरा।',g:'Documentary',parts:r(6).map(i=>'समुदाय '+(i+1)),rel:4,day:6,time:'9:00 PM',v:1,top:8,pre:1}
];
S.forEach((s,i)=>{s.img16=A+'16x9/'+s.id+'.jpg';s.img1=A+'1x1/'+s.id+'.jpg';s.img9=s.v?A+'9x16/'+s.id+'.jpg':s.img1;s.eps=s.parts.map((p,k)=>({k,t:p,d:'एपिसोड '+(k+1)+' · '+s.n+' श्रृंखला का यह अध्याय '+p+' पर केंद्रित है।',m:18+((k*7+i*3)%17),on:k<s.rel}));s.total=s.parts.length});
const SH=[
 {id:'sh1',t:'कर्म करो, फल की चिंता नहीं, 60 सेकंड में',s:'geeta-amrit',img:A+'9x16/geeta-amrit.jpg',l:'12K'},
 {id:'sh2',t:'अवंति : उज्जयिनी की कहानी',s:'mahajanpad',img:A+'9x16/mahajanpad.jpg',l:'8.4K'},
 {id:'sh3',t:'नर्मदा क्यों कहलाती है सदानीरा?',s:'sadanira',img:A+'9x16/sadanira.jpg',l:'21K'},
 {id:'sh4',t:'राम सेतु, एक पंक्ति में इतिहास',s:'hamare-ram',img:A+'9x16/hamare-ram.jpg',l:'15K'},
 {id:'sh5',t:'गणेश के बारह नाम',s:'mahaganadhipati-ganesh',img:A+'9x16/mahaganadhipati-ganesh.jpg',l:'9.1K'},
 {id:'sh6',t:'इक्ष्वाकु वंश की पहली पीढ़ी',s:'purvaj-shri-ram-ke',img:A+'9x16/purvaj-shri-ram-ke.jpg',l:'6.2K'},
 {id:'sh7',t:'सात समंदर पार भारतवंशी',s:'yugyugin-bharatvanshi',img:A+'9x16/yugyugin-bharatvanshi.jpg',l:'4.8K'},
 {id:'sh8',t:'पॉडकास्ट से : हिंदी पत्रकारिता के 200 वर्ष',s:'podcast',img:A+'9x16/podcast.jpg',l:'3.9K'}];
const PODS=[
 {id:'mahabharat',n:'महाभारत',sub:'महाभारत समागम से संवाद',img:A+'1x1/podcast-mahabharat.jpg',img16:A+'16x9/podcast-mahabharat.jpg',ev:'mahabharat-samagam-2026',eps:['महाभारत : युद्ध नहीं, विवेक की कथा','सभ्यताएँ एक-दूसरे से कैसे सीखती हैं','कठपुतली और लोक-परंपरा में महाभारत','इंडोनेशिया और श्रीलंका की रामायण-महाभारत परंपरा']},
 {id:'sadanira-samagam',n:'सदानीरा समागम',sub:'जल, पंचमहाभूत और परंपरा',img:A+'1x1/podcast-sadanira-samagam.jpg',img16:A+'16x9/podcast-sadanira-samagam.jpg',ev:'sadanira-samagam-2026',eps:['पंचमहाभूत : जल से आरंभ','पारंपरिक जल-संरचनाएँ और आज का विज्ञान','लोक-कला में नदी','नदी को बचाना, संस्कृति को बचाना']},
 {id:'udant-martand',n:'उदन्त मार्तण्ड',sub:'हिंदी पत्रकारिता के 200 वर्ष',img:A+'1x1/podcast-udant-martand.jpg',img16:A+'16x9/podcast-udant-martand.jpg',ev:'udant-martand-2026',eps:['उदन्त मार्तण्ड : नाम का अर्थ','स्वाभिमानी भारत','2047 का भारत और पत्रकारिता','भाषाई पत्रकारिता की चुनौतियाँ']},
 {id:'yuva-samvad',n:'युवा संवाद',sub:'नई पीढ़ी और भारतीय ज्ञान परंपरा',img:A+'1x1/podcast-yuva-samvad.jpg',img16:A+'16x9/podcast-yuva-samvad.jpg',ev:null,eps:['युवा और गीता','शोध, करियर और संस्कृति','डिजिटल युग में परंपरा']}];
PODS.forEach((p,i)=>p.list=p.eps.map((t,k)=>({k,t,m:32+((k*11+i*5)%28)})));
const AB=[
 {id:'ab-amrit-3',n:'अमृत जलधारा, भाग तृतीय',sub:'गंगा नदी',img:A+'books/amrit-jaldhara-2.jpg',hrs:'4 घं 20 मि',ch:['गंगोत्री : उद्गम','हिमालय से हरिद्वार','मैदान की गंगा','संगम और प्रयाग','गंगा का भू-विज्ञान','घाट, तीर्थ और परंपरा'],book:'amrit'},
 {id:'ab-amrit-4',n:'अमृत जलधारा, भाग चतुर्थ',sub:'यमुना नदी',img:A+'books/amrit-jaldhara-1.jpg',hrs:'3 घं 55 मि',ch:['यमुनोत्री','यमुना और ब्रज','दिल्ली से आगरा','चम्बल का संगम','नदी का पर्यावरण'],book:'amrit'},
 {id:'ab-shipra',n:'शिप्रा : अमरता का आह्वान',sub:'उज्जैन की जल संरचनाओं का वैज्ञानिक विश्लेषण',img:A+'books/book-07.jpg',hrs:'3 घं 10 मि',ch:['शिप्रा का परिचय','उज्जैन की जल संरचनाएँ','कुंड, बावड़ियाँ और घाट','वैज्ञानिक दृष्टि','अमरता का आह्वान'],book:'shipra'},
 {id:'ab-prithvi',n:'पृथ्वी पानी का देश है',sub:'जल केन्द्रित कविताओं का संचयन',img:A+'books/prithvi-pani-ka-desh-hai.jpg',hrs:'2 घं 05 मि',ch:['खण्ड एक : बूँद','खण्ड दो : नदी','खण्ड तीन : सागर','खण्ड चार : मेघ'],book:'prithvi'},
 {id:'ab-sadanira',n:'सदानीरा',sub:'जल का उत्सव',img:A+'books/sadanira.jpg',hrs:'2 घं 40 मि',ch:['नदी का उत्सव','लोक में जल','जल और पर्व','सदानीरा की परंपरा'],book:'sadanira-b'}];
const BK=[
 {id:'amrit',n:'अमृत जलधारा',s:'मध्यप्रदेश की नदियों का भू-वैज्ञानिक एवं तकनीकी परिदृश्य',img:A+'books/amrit-jaldhara-2.jpg',subj:'Rivers & Water',pages:'312',ed:'भाग तृतीय (गंगा), भाग चतुर्थ (यमुना)',ab:'ab-amrit-3',toc:['प्रस्तावना','नदी-तंत्र का भू-विज्ञान','उद्गम और प्रवाह','तटीय सभ्यताएँ','जल-गुणवत्ता','संरक्षण की दिशा']},
 {id:'shipra',n:'शिप्रा अमरता का आह्वान',s:'वैज्ञानिक दृष्टिकोण से उज्जैन की जल संरचनाओं का विश्लेषण',by:'श्रीराम तिवारी, अनिल कोठारी',img:A+'books/book-07.jpg',subj:'Rivers & Water',pages:'184',ab:'ab-shipra',toc:['भूमिका','शिप्रा का भूगोल','उज्जैन की जल संरचनाएँ','कुंड और बावड़ियाँ','सिंहस्थ और जल','निष्कर्ष']},
 {id:'prithvi',n:'पृथ्वी पानी का देश है',s:'जल केन्द्रित कविताओं का संचयन',img:A+'books/prithvi-pani-ka-desh-hai.jpg',subj:'Poetry',pages:'228',ab:'ab-prithvi',toc:['संपादकीय','बूँद','नदी','सागर','मेघ','कवि परिचय']},
 {id:'sadanira-b',n:'सदानीरा',s:'जल का उत्सव',img:A+'books/sadanira.jpg',subj:'Rivers & Water',pages:'160',ab:'ab-sadanira',toc:['आमुख','नदी का उत्सव','लोक में जल','जल और पर्व','चित्र-वीथिका']},
 {id:'tapodhara-b',n:'तपोधरा मध्यप्रदेश',s:'मध्यप्रदेश की तपोभूमि',img:A+'books/tapodhara-madhyapradesh.jpg',subj:'Madhya Pradesh',pages:'240',toc:['भूमिका','नर्मदा तट','विंध्य और सतपुड़ा','मालवा','बुंदेलखंड','निमाड़']},
 {id:'sabhyata',n:'सभ्यताओं की साँस',s:'वैश्विक कविताओं का संकलन',subj:'Poetry',pages:'-',ev:'mahabharat-samagam-2026',c:['#3B1D12','#E9B54F'],toc:['संपादकीय','एशिया','यूरोप','अफ्रीका','अमेरिका']},
 {id:'bhooli',n:'भूली बिसरी सभ्यताएँ',s:'महाभारत समागम में लोकार्पित',subj:'History',pages:'-',ev:'mahabharat-samagam-2026',c:['#12263B','#E6C27A'],toc:['प्रस्तावना','सिंधु-सरस्वती','मेसोपोटामिया','माया','निष्कर्ष']},
 {id:'makhan',n:'माखन के लाल',s:'प्रणाम उदन्त मार्तण्ड में लोकार्पित',subj:'Journalism',pages:'-',ev:'udant-martand-2026',c:['#2B1B33','#F0C463'],toc:['आमुख','माखनलाल चतुर्वेदी','कर्मवीर','पत्रकारिता और राष्ट्र','स्मृतियाँ']},
 {id:'purovak',n:'पुरोवाक् युगयुगीन भारत का',s:'अंक 1, वर्ष 2024 (विक्रम संवत् 2081)',subj:'Journal',pages:'-',c:['#1B2E22','#E9B54F'],toc:['संपादकीय','शोध-लेख','पुरातत्व','संस्कृति','पुस्तक-समीक्षा']}];
const EV=[
 {id:'mahabharat-samagam-2026',n:'महाभारत समागम',yr:2026,dates:'16–24 Jan 2026',days:9,where:'भारत भवन, भोपाल',img:A+'16x9/podcast-mahabharat.jpg',img1:A+'1x1/podcast-mahabharat.jpg',
  sum:'महाभारत को केवल युद्ध-कथा नहीं, बल्कि मानवता, विवेक और करुणा की महागाथा के रूप में प्रस्तुत करने वाला देश का पहला महाभारत-केंद्रित सांस्कृतिक आयोजन।',
  high:['इमर्सिव 3D डोम थिएटर, चारों ओर और फ़र्श तक दृश्य','अस्त्र-शस्त्र, नेपथ्य, चक्रव्यूह और पताकाओं की प्रदर्शनी','भारत, इंडोनेशिया, श्रीलंका और जापान के रंग-समूह','नाटक, नृत्य-नाट्य, कठपुतली कार्यशालाएँ और फ़िल्म महोत्सव'],
  sched:[['16 Jan','शुभारंभ, मुख्यमंत्री डॉ. मोहन यादव','उद्घाटन'],['16–18 Jan','इमर्सिव डोम थिएटर : महाभारत आधारित फ़िल्म','प्रदर्शन'],['17 Jan, 6:30 PM','शिखंडी, भरतनाट्यम प्रस्तुति','नृत्य-नाट्य'],['18 Jan','भारत–श्रीलंका की सांस्कृतिक प्रस्तुतियाँ','अंतरराष्ट्रीय'],['16–24 Jan','चित्र-प्रदर्शनी एवं भारतीय कठपुतली','प्रदर्शनी']],
  pod:'mahabharat',books:['sabhyata','bhooli'],
  press:[['ETV Bharat','https://www.etvbharat.com/hi/state/mahabharata-samagam-bhopal-bharat-bhawan-9-day-cultural-fest-to-give-strong-message-madhya-pradesh-news-mps26010600637'],['Free Press Journal','https://www.freepressjournal.in/bhopal/bhopal-news-9-day-mahabharat-samagam-begins-at-bharat-bhavan-with-immersive-dome-musical-theatre-more-check-date-wise-event-schedule'],['Panchjanya','https://panchjanya.com/2026/01/16/454177/bharat/madhya-pradesh/the-country-first-mahabharata-gathering-in-bhopal-the-chief-minister-will-inaugurate-it-today/'],['Amar Ujala, photo gallery','https://www.amarujala.com/photo-gallery/madhya-pradesh/bhopal/mp-news-on-the-second-day-of-the-mahabharata-conclave-a-grand-confluence-of-the-cultural-heritage-of-india-a-2026-01-18']],
  social:[{pf:'Threads',who:'Artist post',txt:'शिखंडी, भरतनाट्यम प्रस्तुति, 17 जनवरी 2026, सायं 6:30, भारत भवन भोपाल। #mahabharat',url:'https://www.threads.com/@himanshusrivastavaa/post/DTjuZcRkgYU/shikhandi-blows-his-conch-again-veer-bharat-nyas-festival-bhopal-by-the',real:1},{pf:'Instagram',who:'वीर भारत न्यास',txt:'महाभारत समागम का शुभारंभ, नौ दिन, चार देश, एक संदेश : शांति।'},{pf:'X',who:'वीर भारत न्यास',txt:'इमर्सिव डोम थिएटर में महाभारत, एक बार में दस दर्शक, नौ मिनट का अनुभव।'}]},
 {id:'sadanira-samagam-2026',n:'सदानीरा समागम',yr:2026,dates:'27 May – 2 Jun 2026',days:7,where:'भारत भवन, भोपाल',img:A+'16x9/podcast-sadanira-samagam.jpg',img1:A+'1x1/podcast-sadanira-samagam.jpg',
  sum:'जल गंगा संवर्धन अभियान के अंतर्गत राष्ट्रीय संगोष्ठी एवं सांस्कृतिक उत्सव, जल संरक्षण, भारतीय ज्ञान परंपरा, पंचमहाभूत और सतत विकास पर केंद्रित।',
  high:['पंचमहाभूत, जल, पृथ्वी, वायु, आकाश और अग्नि पर वैचारिक सत्र','देशभर के 100 से अधिक कलाकार, मधुबनी, वारली, मंजूषा लोक-कला','देश-विदेश के वैज्ञानिक, पर्यावरण विशेषज्ञ और नीति-निर्माता','नृत्य, नाट्य और संगीत की संध्याएँ'],
  sched:[['27 May, 7:00 PM','शुभारंभ, मुख्यमंत्री डॉ. मोहन यादव','उद्घाटन'],['28–31 May','पंचमहाभूत पर राष्ट्रीय संगोष्ठी','संगोष्ठी'],['27 May – 2 Jun','लोक-कला प्रदर्शनी एवं शिविर','प्रदर्शनी'],['2 Jun','समापन संध्या','समापन']],
  pod:'sadanira-samagam',books:['sadanira-b','prithvi','amrit'],
  press:[['Tarun Mitra','https://www.tarunmitra.in/state/madhya-pradesh/national-discussion-on-water-conservation-and-indian-knowledge-tradition-will/article-144387'],['Mediasaheb','https://mediasaheb.com/chief-minister-dr-yadav-to-inaugurate-sadanira-samagam-at-bharat-bhavan-on-wednesday/'],['Swadesh News','https://swadeshlive.com/sadanira-samagam/']],
  social:[{pf:'Instagram',who:'वीर भारत न्यास',txt:'सदानीरा समागम, सात दिन, पाँच तत्व। जल से आरंभ।'},{pf:'Facebook',who:'वीर भारत न्यास',txt:'लोक-कला शिविर में देशभर के कलाकारों ने नदी को रंगों में उतारा।'},{pf:'YouTube',who:'वीर भारत न्यास',txt:'उद्घाटन सत्र, पूरा प्रसारण'}]},
 {id:'udant-martand-2026',n:'प्रणाम उदन्त मार्तण्ड',yr:2026,dates:'8–10 May 2026',days:3,where:'भारत भवन, भोपाल',img:A+'16x9/podcast-udant-martand.jpg',img1:A+'1x1/podcast-udant-martand.jpg',
  sum:'हिंदी पत्रकारिता के 200 वर्ष पूर्ण होने पर माखनलाल चतुर्वेदी राष्ट्रीय पत्रकारिता एवं संचार विश्वविद्यालय और वीर भारत न्यास की संयुक्त पहल पर तीन दिवसीय राष्ट्रीय संविमर्श।',
  high:['देशभर के 60 से अधिक पत्रकार और संपादक','मुख्य वक्ता, श्री हरिवंश, उपसभापति, राज्यसभा','‘स्वाभिमानी भारत’ सहित राष्ट्रीय महत्व के विषयों पर सत्र','‘माखन के लाल’ पुस्तक का लोकार्पण'],
  sched:[['8 May','शुभारंभ, हिंदी पत्रकारिता के 200 वर्ष','उद्घाटन'],['9 May','2047 का भारत, मुख्य वक्तव्य','संविमर्श'],['10 May','स्वाभिमानी भारत · समापन','समापन']],
  pod:'udant-martand',books:['makhan'],
  press:[['MCU, शुभारंभ','https://www.mcu.ac.in/2026/05/08/200-years-of-hindi-journalism/'],['MCU, समापन','https://www.mcu.ac.in/2026/05/10/um_concluded/'],['Amar Ujala','https://www.amarujala.com/madhya-pradesh/bhopal/200-years-of-hindi-journalism-3-day-national-discourse-pranam-udant-martand-begins-today-editors-from-acro-2026-05-08'],['Navabharat, पुस्तक विमोचन','https://navabharat.com/?p=464723']],
  social:[{pf:'X',who:'वीर भारत न्यास',txt:'उदन्त, समाचार, मार्तण्ड, सूर्य। 200 वर्ष बाद भी वही प्रकाश।'},{pf:'Instagram',who:'वीर भारत न्यास',txt:'तीन दिन, साठ से अधिक पत्रकार, भारत भवन में संविमर्श।'}]},
 {id:'bauddh-2026',n:'मध्यप्रदेश : वैश्विक बौद्ध धरोहर का केंद्र',yr:2026,dates:'June 2026',days:1,where:'गौरांजनी सभागार, रवीन्द्र भवन, भोपाल',img:A+'16x9/yugyugin-bharatvanshi.jpg',img1:A+'1x1/yugyugin-bharatvanshi.jpg',
  sum:'मध्यप्रदेश की बौद्ध विरासत, सांस्कृतिक धरोहर और पर्यटन संभावनाओं को वैश्विक पहचान दिलाने हेतु अंतरराष्ट्रीय सम्मेलन, दी बुद्धभूमि धम्मदूत संघ, भोपाल के साथ संयुक्त आयोजन।',
  high:['थाईलैंड, श्रीलंका, वियतनाम, कंबोडिया, लाओस और म्यांमार से प्रतिनिधि','बौद्ध भिक्षु, पुरातत्वविद्, शोधकर्ता और कुलपति','साँची सहित मध्यप्रदेश की बौद्ध विरासत पर विमर्श'],
  sched:[['सत्र 1','मध्यप्रदेश की बौद्ध विरासत','संगोष्ठी'],['सत्र 2','पुरातत्व और शोध','संगोष्ठी'],['सत्र 3','विरासत और पर्यटन','संगोष्ठी']],
  pod:null,books:[],press:[['Navabharat','https://navabharat.com/?p=487780']],social:[{pf:'Facebook',who:'वीर भारत न्यास',txt:'छह देशों के प्रतिनिधि, मध्यप्रदेश की बौद्ध विरासत पर एक मंच।'}]},
 {id:'sadanira-samagam-2025',n:'सदानीरा समागम',yr:2025,dates:'20–25 Jun 2025',days:6,where:'भारत भवन, भोपाल',img:A+'16x9/sadanira.jpg',img1:A+'1x1/sadanira.jpg',
  sum:'जल गंगा संवर्धन अभियान के अंतर्गत छह दिवसीय समागम, पुस्तकें, प्रदर्शनियाँ, वैचारिक गोष्ठियाँ और नृत्य, नाट्य तथा संगीत।',
  high:['‘सदानीरा’ और ‘अमृतस्य नर्मदा’ फ़िल्मों के प्रदर्शन से आरंभ','हमनवा नृत्य-नाटिका, तीस्ता और गोदावरी का संवाद','कविता पाठ, उपशास्त्रीय गायन और संवाद-सत्र','पुस्तकों और प्रदर्शनियों का समागम'],
  sched:[['20 Jun','शुभारंभ एवं फ़िल्म प्रदर्शन','उद्घाटन'],['21–24 Jun','संवाद, कविता पाठ, नृत्य-नाटिका','सांस्कृतिक'],['25 Jun, 6:30 PM','उपशास्त्रीय गायन · समापन','समापन']],
  pod:'sadanira-samagam',books:['sadanira-b','shipra'],
  press:[['ETV Bharat','https://www.etvbharat.com/hi/!state/bhopal-veer-bharat-nyas-jal-ganga-sanvardhan-abhiyan-sadanira-samagam-6-days-eminent-personalities-participate-madhya-pradesh-news-mps25061605334'],['Haribhoomi','https://www.magzter.com/stories/newspaper/Haribhoomi-Bhopal/1750301094347'],['Janta Se Rishta','https://jantaserishta.com/local/madhya-pradesh/cm-mohan-yadav-to-inaugurate-sadanira-samagam-in-bhopal-tomorrow-4093421']],
  social:[{pf:'Instagram',who:'वीर भारत न्यास',txt:'सदानीरा समागम, 20 से 25 जून, भारत भवन।'}]}];
const DAYS=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const FEST=[['Oct 2026','नवरात्रि एवं विजयादशमी','mahadev','शक्ति और विजय पर विशेष कथाएँ'],['Nov 2026','दीपावली','hamare-ram','अयोध्या-आगमन, हमारे राम विशेष'],['Dec 2026','गीता जयंती','geeta-amrit','गीता अमृत, विशेष संध्या'],['Early 2027','महाशिवरात्रि','mahadev','84 महादेव, विशेष प्रसारण'],['Spring 2027','रामनवमी','hamare-ram','बालकाण्ड, विशेष'],['Spring 2027','गंगा दशहरा','sadanira','सदानीरा, गंगा विशेष']];
const PREM=[
 {id:'p1',t:'महादेव, निर्देशक संस्करण',k:'Director’s Cut',s:'mahadev',img:A+'16x9/mahadev.jpg'},
 {id:'p2',t:'सदानीरा, 4K नदी यात्रा',k:'4K Documentary',s:'sadanira',img:A+'16x9/sadanira.jpg'},
 {id:'p3',t:'महाकाल, पर्दे के पीछे',k:'Behind the Scenes',s:'mahakal',img:A+'16x9/mahakal.jpg'},
 {id:'p4',t:'महागाथा, पहले देखें',k:'Early Access',s:'mahagatha',img:A+'16x9/mahagatha.jpg'},
 {id:'p5',t:'युगयुगीन भारतवंशी, पूर्ण वृत्तचित्र',k:'Full Feature',s:'yugyugin-bharatvanshi',img:A+'16x9/yugyugin-bharatvanshi.jpg'},
 {id:'p6',t:'महाभारत समागम, शिखंडी (पूर्ण प्रस्तुति)',k:'Event Recording',s:'podcast',img:A+'16x9/podcast-mahabharat.jpg',ev:'mahabharat-samagam-2026'}];
const QUIZ=[
 {q:'श्रीमद्भगवद्गीता में कितने अध्याय हैं?',o:['12','18','24','7'],a:1,s:'geeta-amrit'},
 {q:'महाजनपद अवंति की राजधानी कौन-सी थी?',o:['पाटलिपुत्र','काशी','उज्जयिनी','मथुरा'],a:2,s:'mahajanpad'},
 {q:'वाल्मीकि रामायण में कितने काण्ड हैं?',o:['5','7','9','18'],a:1,s:'hamare-ram'},
 {q:'हिंदी का पहला समाचार-पत्र कौन-सा था?',o:['कर्मवीर','सरस्वती','उदन्त मार्तण्ड','प्रताप'],a:2,s:'podcast'},
 {q:'शिप्रा नदी के तट पर कौन-सा नगर बसा है?',o:['उज्जैन','ओंकारेश्वर','जबलपुर','होशंगाबाद'],a:0,s:'sadanira'}];
const LIVE=[['06:00','प्रभात, गीता पाठ','geeta-amrit'],['08:00','सदानीरा, नर्मदा','sadanira'],['10:00','हमारे राम, बालकाण्ड','hamare-ram'],['12:00','पॉडकास्ट : उदन्त मार्तण्ड','podcast'],['14:00','महाजनपद, अवंति','mahajanpad'],['16:00','महादेव, कथा','mahadev'],['18:00','संध्या, महाभारत समागम की झलकियाँ','podcast'],['20:00','गीता अमृत, नया एपिसोड','geeta-amrit'],['22:00','महाकाल','mahakal']];
window.VBN3={S,SH,PODS,AB,BK,EV,DAYS,FEST,PREM,QUIZ,LIVE};
})();
