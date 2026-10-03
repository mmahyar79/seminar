const B = require('./build_part1.js');
const { pres, HEX, C, SH, D, section, newSlide, icon, nm, shadow, iconCircle, card, text, chip, meter, source, title } = B;
const DIV = { div1:7, div2:12, div3:19, div4:24, div5:29, div6:32, div7:38, concl:41 };
const SECTIONS = [
  ['01','Ultra-processed foods','industry',HEX.red,'div1'],['02','Food addiction','clipboard',HEX.purple,'div2'],['03','Mechanisms','brain',HEX.teal,'div3'],
  ['04','Human evidence','microscope',HEX.amber,'div4'],['05','The debate','scaleU',HEX.slate,'div5'],['06','Policy','landmark',HEX.green,'div6'],
  ['07','Vulnerable groups and clinic','child','3F7FB5','div7'],['08','Conclusions','bulb',HEX.red,'concl']];
B.DIV = DIV; B.SECTIONS = SECTIONS;

function divider(key, idx, ttl, question){
  const [num, , ic, col] = SECTIONS[idx];
  const s = newSlide(key, 'SECTION');
  text(s, num, { x:0.7, y:2.05, w:2.3, h:2.2, fontFace:'Cambria', fontSize:110, bold:true, color:col, valign:'middle', objectName:'secnum' });
  s.addText(ttl, { placeholder:'title' });
  s.addText(question, { placeholder:'body' });
  // progress tracker
  const x0=3.05, sp=1.18;
  s.addShape(SH.line, { x:x0+0.15, y:5.86, w:sp*7, h:0, line:{ color:'8FA4BC', width:1.25 }, objectName:'trackline' });
  SECTIONS.forEach(([n, lab, , c], i) => {
    const cur = i===idx; const d = cur?0.42:0.3;
    s.addShape(SH.ellipse, { x:x0+i*sp+0.15-d/2, y:5.86-d/2, w:d, h:d, fill:{ color: i<=idx ? c : '2E4A6B' }, line:{ color: cur?'FFFFFF':'8FA4BC', width: cur?2:1 }, objectName:'trk'+i });
    text(s, lab, { x:x0+i*sp+0.15-0.6, y:6.15, w:1.2, h:0.5, fontSize:10.5, color: cur?'FFFFFF':'9FB2C8', bold:cur, align:'center' });
  });
  text(s, [{ text:'Back to roadmap', options:{ hyperlink:{ slide:2, tooltip:'Roadmap' }, color:'CADCFC' } }], { x:10.9, y:0.45, w:1.9, h:0.35, fontSize:12, align:'right' });
  iconCircle(s, ic, 11.6, 2.45, 1.05, col);
  return s;
}
B.divider = divider;

// ===== 1 TITLE =====
section('Introduction');
{ const s = newSlide('title','TITLE');
  s.addShape(SH.roundRect, { x:0.75, y:0.6, w:1.05, h:1.05, rectRadius:0.12, fill:{ color:'FFFFFF' }, line:{ color:'FFFFFF' }, objectName:'logoframe' });
  s.addImage({ path:D+'/logo.png', x:0.85, y:0.7, w:0.85, h:0.85, altText:'Tehran University of Medical Sciences logo', objectName:'logo' });
  text(s, 'Tehran University of Medical Sciences', { x:2.0, y:0.74, w:6, h:0.38, fontSize:16, bold:true, color:'FFFFFF' });
  text(s, 'School of Nutritional Sciences and Dietetics  ·  Graduate Seminar', { x:2.0, y:1.12, w:6.5, h:0.35, fontSize:13, color:'CADCFC' });
  s.addText('Ultra-Processed Foods and Addictive-Like Eating Behaviors', { placeholder:'title' });
  s.addText('From Neurobiological Mechanisms to Community Nutrition Policy', { placeholder:'body' });
  text(s, 'Yasmin Ayatollahi', { x:0.75, y:5.25, w:6, h:0.42, fontSize:20, bold:true, color:'FFFFFF' });
  text(s, 'Course instructor: Dr. Pouraram   ·   Autumn 2026', { x:0.75, y:5.7, w:7, h:0.35, fontSize:14, color:'CADCFC' });
  const oc = [[9.05,1.35,1.95,HEX.red,'industry','Processing'],[10.85,2.85,1.95,HEX.purple,'brain','Behavior'],[9.05,4.35,1.95,HEX.green,'landmark','Policy']];
  oc.forEach(([x,y,d,c,ic,lab],i)=>{
    s.addShape(SH.octagon, { x, y, w:d, h:d, fill:{ color:c }, line:{ color:'FFFFFF', width:3 }, objectName:'oct'+i });
    s.addImage({ path:icon(ic,'w'), x:x+d*0.3, y:y+d*0.22, w:d*0.4, h:d*0.4, objectName:'octic'+i, altText:lab });
    text(s, lab.toUpperCase(), { x, y:y+d*0.66, w:d, h:0.3, fontSize:12, bold:true, color:'FFFFFF', align:'center', charSpacing:1.5 });
  });
}

// ===== 2 ROADMAP =====
{ const s = newSlide('agenda','CONTENT'); title(s, 'Roadmap');
  const x0=0.72, sp=1.555, y=2.1, d=1.0;
  s.addShape(SH.line, { x:x0+d/2, y:y+d/2, w:sp*7, h:0, line:{ color:HEX.line, width:2, dashType:'dash' }, objectName:'agline' });
  const Q = ['What are they and how much do we eat?','Valid construct? How measured?','Why might UPF act differently?','What do trials and cohorts show?','Is “addictive” the right word?','What works without settling the debate?','Children, eating disorders, stigma','Take-home messages for Iran'];
  SECTIONS.forEach(([n, lab, ic, col, key], i) => {
    const x = x0 + i*sp;
    s.addShape(SH.ellipse, { x, y, w:d, h:d, fill:{ color:col }, line:{ color:'FFFFFF', width:2 }, shadow:shadow(), objectName:nm('anim'+(i+1)), hyperlink:{ slide:DIV[key], tooltip:lab } });
    s.addImage({ path:icon(ic,'w'), x:x+0.27, y:y+0.27, w:0.46, h:0.46, objectName:nm('anim'+(i+1)), altText:lab, hyperlink:{ slide:DIV[key], tooltip:lab } });
    text(s, n, { x:x-0.2, y:y-0.5, w:d+0.4, h:0.35, fontSize:13, bold:true, color:col, align:'center', anim:i+1 });
    text(s, lab, { x:x-0.25, y:y+1.15, w:d+0.5, h:0.62, fontSize:13.5, bold:true, color:col, align:'center', anim:i+1 });
    text(s, Q[i], { x:x-0.25, y:y+1.8, w:d+0.5, h:0.85, fontSize:11.5, color:HEX.grey, align:'center', anim:i+1 });
  });
  card(s, 1.6, 5.15, 10.1, 1.1, HEX.paleNavy, 9, 'D3DDE8');
  iconCircle(s, 'question', 1.85, 5.3, 0.8, HEX.navy, 9);
  text(s, [{ text:'Guiding question: ', options:{ bold:true, color:HEX.navy } }, { text:'must we settle whether food is “addictive” before acting on ultra-processed foods?' }], { x:2.9, y:5.3, w:8.6, h:0.8, fontSize:17, valign:'middle', anim:9 });
  text(s, 'Click a circle to jump to that section; each divider links back here.', { x:0.6, y:6.62, w:6, h:0.3, fontSize:10, italic:true, color:'7A8591' });
}

// ===== 3 WHY =====
{ const s = newSlide('why','CONTENT'); title(s, 'Why this question, why now?');
  const stats = [['58%','of energy in US adults’ diets comes from NOVA group 4 (NHANES 2017–18)',HEX.red],
                 ['54%','of energy in UK adults; about 66% in adolescents aged 11–18',HEX.red],
                 ['13.4%','median UPF share of energy among Tehran adults (TLGS)',HEX.amber],
                 ['14%','of adults meet YFAS “food addiction” criteria in pooled estimates (12% of children)',HEX.purple]];
  stats.forEach(([n,l,c],i)=>{ const x=0.6+(i%2)*3.05, y=1.5+Math.floor(i/2)*2.5;
    card(s, x, y, 2.85, 2.3, 'FFFFFF', i+1);
    text(s, n, { x:x+0.25, y:y+0.2, w:2.4, h:0.95, fontFace:'Cambria', fontSize:46, bold:true, color:c, valign:'middle', anim:i+1 });
    text(s, l, { x:x+0.25, y:y+1.18, w:2.4, h:1.0, fontSize:13, color:HEX.ink, anim:i+1 }); });
  card(s, 6.95, 1.5, 5.75, 4.8, HEX.paleNavy, 5, 'D3DDE8');
  text(s, 'The puzzle', { x:7.3, y:1.72, w:5, h:0.45, fontFace:'Cambria', fontSize:20, bold:true, color:HEX.navy, anim:5 });
  const rows = [['earth',HEX.teal,'Obesity is rising simultaneously across very different populations — individual choice alone cannot explain it (GBD 2019; NCD-RisC).'],
                ['industry',HEX.red,'UPFs dominate food supplies in high-income countries and are expanding fast in middle-income countries.'],
                ['brain',HEX.purple,'Some products are engineered to be highly rewarding. Could an “addiction” lens explain compulsive overconsumption?']];
  rows.forEach(([ic,c,t],i)=>{ const y=2.35+i*1.3; iconCircle(s, ic, 7.3, y, 0.75, c, 6+i); text(s, t, { x:8.3, y:y-0.05, w:4.15, h:1.15, fontSize:14.5, valign:'middle', anim:6+i }); });
  source(s, 'Sources: Steele et al. 2023; Rauber et al. 2020; Moslehi et al. 2024; Gearhardt et al. 2023; GBD 2019 Risk Factors Collaborators 2020; NCD-RisC 2024; Monteiro et al. 2013; Baker et al. 2020.');
}

// ===== 4 THREE CLAIMS =====
{ const s = newSlide('claims','CONTENT'); title(s, 'Separating the claims: unequal evidence');
  const cols = [[1.4,3.55,'Claim'],[5.15,2.85,'Evidence needed'],[8.15,2.55,'What we have'],[10.9,1.85,'Status']];
  cols.forEach(([x,w,t])=> text(s, t.toUpperCase(), { x, y:1.38, w, h:0.3, fontSize:11, bold:true, color:'7A8591', charSpacing:1 }));
  const R = [
    ['a',HEX.green,'UPF intake ↔ higher energy intake and adverse health','Controlled feeding trials, large prospective cohorts, umbrella reviews','Hall 2019, Dicken 2025, Lane 2024, NutriNet-Santé, TLGS','strong',4],
    ['b',HEX.amber,'Some UPFs ↔ addictive-like eating','Validated psychometrics, behavioral experiments, longitudinal designs','Schulte 2015, YFAS surveys, LaFata 2024 — mostly cross-sectional','limited',2],
    ['c',HEX.red,'These behaviors are a valid “addiction”','Discriminant validity vs BED, predictive validity, stability, specific treatment response','Gearhardt vs Hebebrand and Ziauddeen; absent from DSM-5-TR and ICD-11','unresolved',1],
    ['d',HEX.teal,'Environmental policies change purchases and products','Quasi-experimental evaluations (interrupted time series, pre–post, purchase data)','Chile, Mexico, United Kingdom — intermediate outcomes','interm',4]];
  R.forEach(([L,c,cl,need,have,st,m],i)=>{ const y=1.75+i*1.05;
    card(s, 0.6, y, 12.1, 0.92, 'FFFFFF', i+1);
    s.addText(L, { x:0.78, y:y+0.18, w:0.56, h:0.56, shape:SH.ellipse, fill:{ color:c }, line:{ color:c }, fontFace:'Cambria', fontSize:20, bold:true, color:'FFFFFF', align:'center', valign:'middle', margin:0, objectName:nm('anim'+(i+1)) });
    text(s, cl, { x:1.5, y:y+0.08, w:3.5, h:0.76, fontSize:14.5, bold:true, color:HEX.ink, valign:'middle', anim:i+1 });
    text(s, need, { x:5.15, y:y+0.08, w:2.85, h:0.76, fontSize:12, color:HEX.grey, valign:'middle', anim:i+1 });
    text(s, have, { x:8.15, y:y+0.08, w:2.6, h:0.76, fontSize:12, color:HEX.ink, valign:'middle', anim:i+1 });
    chip(s, st, 10.85, y+0.17, 1.75, i+1); meter(s, m, 11.1, y+0.6, c, i+1); });
  card(s, 0.6, 6.0, 12.1, 0.62, HEX.paleTeal, 5, 'CFE3E7');
  s.addImage({ path:icon('bulb','t'), x:0.8, y:6.1, w:0.42, h:0.42, objectName:nm('anim5'), altText:'insight' });
  text(s, [{ text:'The rows are independent: ', options:{ bold:true, color:HEX.teal } }, { text:'rejecting (c) does not invalidate (a) or (d) — so policy need not wait for the addiction debate to end.' }], { x:1.4, y:6.05, w:11.1, h:0.52, fontSize:15, valign:'middle', anim:5 });
}

// ===== 5 METHOD =====
{ const s = newSlide('method','CONTENT'); title(s, 'How the evidence was assembled');
  const st = [['search','1  Search','PubMed/MEDLINE, Web of Science, Scopus, Google Scholar',HEX.navy],
              ['filter','2  Prioritize','Umbrella reviews, meta-analyses, RCTs, cohorts >10,000, Iranian studies',HEX.teal],
              ['scale','3  Weigh','Design, risk of bias, precision, directness, consistency — not recency',HEX.amber],
              ['book','4  Synthesize','117 cited sources: peer-reviewed papers, laws and official reports',HEX.green]];
  st.forEach(([ic,h,t,c],i)=>{ const x=0.6+i*3.1;
    card(s, x, 1.5, 2.8, 2.6, 'FFFFFF', i+1);
    iconCircle(s, ic, x+0.25, 1.72, 0.75, c, i+1);
    text(s, h, { x:x+0.25, y:2.6, w:2.4, h:0.4, fontFace:'Cambria', fontSize:18, bold:true, color:c, anim:i+1 });
    text(s, t, { x:x+0.25, y:3.02, w:2.35, h:1.0, fontSize:13, anim:i+1 });
    if (i<3) s.addImage({ path:icon('arrow','s'), x:x+2.86, y:2.65, w:0.2, h:0.2, objectName:nm('anim'+(i+1)), altText:'next' }); });
  text(s, 'SEARCH TERMS', { x:0.6, y:4.35, w:4, h:0.3, fontSize:11, bold:true, color:'7A8591', charSpacing:1 });
  const kw = ['ultra-processed food','NOVA classification','food addiction','Yale Food Addiction Scale','hyper-palatable food','addictive-like eating','front-of-pack labelling','sugar-sweetened beverage tax'];
  let x=0.6, y=4.7; kw.forEach(k=>{ const w=0.25+k.length*0.088; if (x+w>12.7){ x=0.6; y+=0.45; }
    s.addText(k, { x, y, w, h:0.34, shape:SH.roundRect, rectRadius:0.17, fill:{ color:HEX.light }, line:{ color:'D3DDE8', width:0.75 }, fontSize:12, color:HEX.navy, align:'center', valign:'middle', margin:0, objectName:nm('anim5') }); x+=w+0.15; });
  card(s, 0.6, 5.65, 12.1, 0.95, HEX.paleAmber, 6, 'F0DDBB');
  iconCircle(s, 'warn', 0.8, 5.8, 0.62, HEX.amber, 6);
  text(s, [{ text:'A narrative review, not a systematic one: ', options:{ bold:true, color:'9A5E0B' } }, { text:'no fully reproducible search, no pre-registered criteria, no dual screening, no PRISMA flow and no uniform risk-of-bias appraisal. Conclusions are a structured narrative synthesis.' }], { x:1.6, y:5.72, w:10.9, h:0.82, fontSize:14, valign:'middle', anim:6 });
}

// ===== 6 TIMELINE =====
{ const s = newSlide('timeline','CONTENT'); title(s, 'Two research lines converge');
  const ev = [['1956','Randolph coins “food addiction”',HEX.purple],['2001','PET: lower striatal D2 receptors in obesity',HEX.purple],['2008','Sugar-bingeing rats show addiction-like changes',HEX.purple],
    ['2009','YFAS introduced; NOVA takes shape',HEX.purple],['2010','Johnson and Kenny: compulsive eating in rats',HEX.purple],['2012','Ziauddeen et al.: how convincing is the addiction model?',HEX.purple],
    ['2014','Brazil’s guidelines target UPF; “eating addiction” proposed',HEX.green],['2016','Chile’s labeling and marketing law',HEX.green],['2018','UK Soft Drinks Industry Levy',HEX.green],
    ['2019','Hall et al. inpatient RCT: +508 kcal/day',HEX.red],['2021','Gearhardt and Schulte: “Is food addictive?”',HEX.purple]];
  const yA=3.95, x0=1.25, sp=1.08;
  s.addShape(SH.line, { x:0.7, y:yA, w:11.95, h:0, line:{ color:HEX.navy, width:3 }, objectName:'tlaxis' });
  ev.forEach(([yr,t,c],i)=>{ const x=x0+i*sp, up=i%2===0, a=i+1;
    s.addShape(SH.line, { x, y: up? yA-0.62 : yA, w:0, h:0.62, line:{ color:'AEB9C5', width:1.25 }, objectName:nm('anim'+a) });
    s.addShape(SH.ellipse, { x:x-0.14, y:yA-0.14, w:0.28, h:0.28, fill:{ color:c }, line:{ color:'FFFFFF', width:2 }, objectName:nm('anim'+a) });
    text(s, yr, { x:x-0.8, y: up? yA-1.02 : yA+0.62, w:1.6, h:0.38, fontFace:'Cambria', fontSize:18, bold:true, color:c, align:'center', anim:a });
    text(s, t, { x:x-1.02, y: up? 1.5 : yA+1.02, w:2.04, h: up? 1.4 : 1.4, fontSize:12.5, color:HEX.ink, align:'center', valign: up?'bottom':'top', anim:a }); });
  [['Addiction science',HEX.purple],['Policy',HEX.green],['Processing trials',HEX.red]].forEach(([l,c],i)=>{ const x=0.6+i*2.3;
    s.addShape(SH.ellipse, { x, y:6.68, w:0.18, h:0.18, fill:{ color:c }, line:{ color:c }, objectName:'leg'+i });
    text(s, l, { x:x+0.26, y:6.6, w:2, h:0.32, fontSize:11.5, color:HEX.grey, valign:'middle' }); });
  text(s, 'Sources: Randolph 1956; Wang 2001; Avena 2008; Gearhardt 2009; Johnson and Kenny 2010; Ziauddeen 2012; Hebebrand 2014; Brazil MoH 2014; Taillie 2020; Scarborough 2020; Hall 2019; Gearhardt and Schulte 2021.', { x:7.6, y:6.5, w:5.1, h:0.5, fontSize:9.5, italic:true, color:'7A8591', align:'right', valign:'bottom' });
}

// ===== 7 DIVIDER 1 =====
section('1 Ultra-processed foods');
divider('div1', 0, 'Ultra-Processed Foods', 'What are they — and how much of our diet do they make up?');

// ===== 8 NOVA =====
{ const s = newSlide('nova','CONTENT'); title(s, 'NOVA: four groups by extent and purpose of processing');
  const G = [['GROUP 1','Unprocessed or minimally processed','Fruit, vegetables, legumes, eggs, fresh meat, milk, whole grains','leaf',HEX.green,HEX.paleGreen],
             ['GROUP 2','Processed culinary ingredients','Oils, butter, salt, sugar, starch','oil',HEX.teal,HEX.paleTeal],
             ['GROUP 3','Processed foods','Fresh bread, cheese, canned vegetables, smoked fish, pickles','cheese',HEX.amber,HEX.paleAmber],
             ['GROUP 4','Ultra-processed foods (UPF)','Soft drinks, packaged snacks, confectionery, sausages, ready meals','burger',HEX.red,HEX.paleRed]];
  G.forEach(([g,n,e,ic,c,bg],i)=>{ const x=0.6+i*3.08;
    card(s, x, 1.45, 2.85, 3.55, bg, i+1, c);
    iconCircle(s, ic, x+1.0, 1.7, 0.85, c, i+1);
    text(s, g, { x:x+0.2, y:2.68, w:2.45, h:0.3, fontSize:12, bold:true, color:c, align:'center', charSpacing:1.5, anim:i+1 });
    text(s, n, { x:x+0.2, y:3.0, w:2.45, h:0.75, fontFace:'Cambria', fontSize:17, bold:true, color:c, align:'center', valign:'middle', anim:i+1 });
    text(s, e, { x:x+0.22, y:3.85, w:2.4, h:1.0, fontSize:13, color:HEX.ink, align:'center', anim:i+1 }); });
  s.addText('Increasing extent and purpose of industrial processing', { x:0.6, y:5.17, w:12.1, h:0.5, shape:SH.rightArrow, fill:{ color:'DCE3EA' }, line:{ color:'DCE3EA' }, fontSize:14, bold:true, color:HEX.navy, align:'center', valign:'middle', margin:0, objectName:nm('anim5') });
  iconCircle(s, 'search', 0.6, 5.85, 0.55, HEX.red, 6);
  text(s, [{ text:'Spotting group 4: ', options:{ bold:true, color:HEX.red } }, { text:'an ingredient rarely used in home kitchens (high-fructose corn syrup, hydrogenated or interesterified oils, maltodextrin, protein isolates) or a cosmetic additive (flavors, colors, emulsifiers, sweeteners, thickeners).' }], { x:1.35, y:5.8, w:11.35, h:0.68, fontSize:13.5, valign:'middle', anim:6 });
  source(s, 'Sources: Monteiro et al. 2018; Monteiro et al. 2019.');
}

// ===== 9 PROPERTIES =====
{ const s = newSlide('props','CONTENT'); title(s, 'What makes UPF different?');
  const T = [['bolt',HEX.red,'High energy density','More energy per gram — higher intake, weaker satiety'],
             ['cubes',HEX.teal,'Disrupted food matrix','Texture and particle size change chewing, eating rate and nutrient availability'],
             ['droplet',HEX.amber,'Fat + refined carbohydrate','Rare in whole foods; a supra-additive effect on reward'],
             ['wheat',HEX.green,'High glycemic load, low fiber','Rapid absorption; linked to hunger, craving and addiction-like behavior'],
             ['tooth',HEX.purple,'Soft texture, fast eating','Less chewing → faster eating → more energy consumed'],
             ['vial',HEX.slate,'Sensory and technological additives','Flavor enhancers serve appeal; others serve texture or shelf life'],
             ['list',HEX.navy,'Less favorable nutrient profile','At diet level: more free sugars, saturated fat and sodium; less fiber']];
  T.forEach(([ic,c,h,d],i)=>{ const x=0.6+(i%4)*3.07, y=1.45+Math.floor(i/4)*2.5;
    card(s, x, y, 2.9, 2.3, 'FFFFFF', i+1);
    iconCircle(s, ic, x+0.22, y+0.22, 0.68, c, i+1);
    text(s, h, { x:x+0.22, y:y+0.95, w:2.5, h:0.6, fontFace:'Cambria', fontSize:15, bold:true, color:c, valign:'middle', anim:i+1 });
    text(s, d, { x:x+0.22, y:y+1.58, w:2.5, h:0.68, fontSize:12, anim:i+1 }); });
  s.addShape(SH.roundRect, { x:9.81, y:3.95, w:2.9, h:2.3, rectRadius:0.08, fill:{ color:HEX.red }, line:{ color:HEX.red }, shadow:shadow(), objectName:nm('anim8') });
  text(s, '9.9% → 15.4%', { x:9.95, y:4.1, w:2.65, h:0.65, fontFace:'Calibri', fontSize:28, bold:true, color:'FFFFFF', align:'center', valign:'middle', anim:8 });
  text(s, 'energy from free sugars, lowest → highest UPF quintile (UK NDNS)', { x:10.0, y:4.78, w:2.55, h:0.75, fontSize:12.5, color:'FFFFFF', align:'center', anim:8 });
  text(s, 'Fiber: 8.4 → 6.9 g per 1000 kcal', { x:10.0, y:5.55, w:2.55, h:0.4, fontSize:12.5, bold:true, color:'FFFFFF', align:'center', anim:8 });
  source(s, 'Sources: Monteiro et al. 2019; Forde et al. 2020; Fardet 2024; Wang et al. 2026; Gearhardt and Schulte 2021; Robinson et al. 2014; Hall et al. 2019; Rauber et al. 2018.');
}

// ===== 10 CRITIQUE + TERMS =====
{ const s = newSlide('critique','CONTENT'); title(s, 'NOVA under fire — and terms not to confuse');
  text(s, 'Four critiques', { x:0.6, y:1.42, w:5.5, h:0.42, fontFace:'Cambria', fontSize:19, bold:true, color:HEX.navy });
  const K = [['question','Ambiguous operational criteria','Borderline foods are classified inconsistently'],
             ['scale','Processing ≠ nutritional quality','Group 4 members differ widely in nutrient profile'],
             ['layer','Roles of processing blurred','Policy must respect the group’s heterogeneity'],
             ['sitemap','Competing systems','NOVA, IARC-EPIC, IFPRI and UNC give different estimates for the same diet']];
  K.forEach(([ic,h,d],i)=>{ const y=1.98+i*1.12; iconCircle(s, ic, 0.6, y, 0.62, HEX.slate, i+1);
    text(s, h, { x:1.4, y:y-0.04, w:4.9, h:0.36, fontSize:15, bold:true, anim:i+1 });
    text(s, d, { x:1.4, y:y+0.33, w:4.9, h:0.6, fontSize:13, color:HEX.grey, anim:i+1 }); });
  // Venn
  const V = [[7.05,1.5,HEX.red,'Ultra-processed','(NOVA group 4)',7.35,2.45],[9.45,1.5,HEX.amber,'Hyper-palatable','(fat, sugar, carb, sodium combinations)',10.15,2.45],[8.25,3.15,HEX.slate,'Highly processed','(generic, no single system)',8.75,4.55]];
  V.forEach(([x,y,c],i)=> s.addShape(SH.ellipse, { x, y, w:3.0, h:3.0, fill:{ color:c, transparency:72 }, line:{ color:c, width:2 }, objectName:nm('anim'+(5+i)) }));
  V.forEach(([x,y,c,t,sub,tx,ty],i)=>{ text(s, t, { x:tx-0.2, y:ty-0.15, w:2.2, h:0.35, fontSize:14, bold:true, color:c, align:'center', anim:5+i }); text(s, sub, { x:tx-0.2, y:ty+0.2, w:2.2, h:0.55, fontSize:11, color:HEX.ink, align:'center', anim:5+i }); });
  card(s, 6.9, 6.12, 5.8, 0.5, HEX.light, 8, 'D3DDE8');
  text(s, [{ text:'Also distinct: ', options:{ bold:true, color:HEX.navy } }, { text:'food addiction ≠ addictive eating ≠ loss-of-control eating' }], { x:7.05, y:6.12, w:5.55, h:0.5, fontSize:13, valign:'middle', anim:8 });
  source(s, 'Sources: Petrus et al. 2021; Gibney 2019; Moubarac et al. 2014; Astrup and Monteiro 2022; Fazzino et al. 2019.');
}

// ===== 11 CONSUMPTION =====
{ const s = newSlide('consumption','CONTENT'); title(s, 'How much UPF do we eat?');
  const labels = ['Italy','Tehran (TLGS sample)','Brazil','UK adults','US adults','UK adolescents'];
  const vals = [10, 13.4, 20, 54.3, 58.2, 66];
  s.addChart(pres.charts.BAR, [{ name:'UPF share of energy', labels, values:vals }], { x:0.5, y:1.4, w:7.6, h:5.0, barDir:'bar', barGapWidthPct:45,
    chartColors:['7B98B8',HEX.red,'7B98B8','7B98B8','7B98B8','7B98B8'], showValue:true, dataLabelPosition:'outEnd', dataLabelFormatCode:'General"%"', dataLabelFontSize:13, dataLabelFontBold:true, dataLabelColor:HEX.ink, dataLabelFontFace:'+mn-lt',
    catAxisLabelFontSize:13, catAxisLabelColor:HEX.ink, catAxisLabelFontFace:'+mn-lt', valAxisLabelFontSize:11, valAxisLabelColor:'6B7682', valAxisLabelFontFace:'+mn-lt', valAxisMaxVal:75, valAxisMinVal:0, valAxisMajorUnit:10,
    valGridLine:{ color:'E3E8EE', size:0.75 }, catGridLine:{ style:'none' }, showLegend:false, showTitle:true, title:'Share of daily energy from UPF (%)', titleFontSize:14, titleColor:HEX.navy, titleFontFace:'+mn-lt', objectName:'chartUPF' });
  card(s, 8.4, 1.45, 4.3, 4.95, HEX.paleNavy, 1, 'D3DDE8');
  iconCircle(s, 'flag', 8.65, 1.65, 0.6, HEX.navy, 1);
  text(s, 'Iran: fragmentary data', { x:9.4, y:1.7, w:3.2, h:0.5, fontFace:'Cambria', fontSize:17, bold:true, color:HEX.navy, valign:'middle', anim:1 });
  const pts = ['TLGS (Tehran): median 13.4% of energy (~91 g/day)','Highest vs lowest intake: prediabetes HR 1.28 (1.07–1.52); +10% UPF → HR 1.12','No significant association with type 2 diabetes','Other estimates: 8.5% (five cities) to 20.2% (n = 1,459 adults)','Children aged 6 (n = 788): no link with overweight (OR 0.86)'];
  text(s, pts.map((t,i)=>({ text:t, options:{ bullet:true, breakLine:i<pts.length-1 } })), { x:8.65, y:2.4, w:3.85, h:3.0, fontSize:13, paraSpaceAfter:5, anim:2 });
  text(s, [{ text:'Gap: ', options:{ bold:true } }, { text:'no regular national monitoring of UPF intake' }], { x:8.65, y:5.6, w:3.85, h:0.6, fontSize:13.5, color:HEX.red, anim:3 });
  source(s, 'Descriptive comparison only (different years, ages, dietary methods, NOVA coding). Sources: Steele 2023; Rauber 2020; Marino 2021; Moslehi 2024; Haghighatdoost 2022, 2023; Asgari 2022.');
}

// ===== 12 DIVIDER 2 =====
section('2 Food addiction');
divider('div2', 1, 'Food Addiction', 'Is it a valid construct — and how do we measure it?');

// ===== 13 DEFINITION =====
{ const s = newSlide('fa_def','CONTENT'); title(s, 'What “food addiction” is — and is not');
  card(s, 0.6, 1.45, 12.1, 1.2, HEX.palePurple, 1, 'DCD3EA');
  iconCircle(s, 'brain', 0.85, 1.67, 0.75, HEX.purple, 1);
  text(s, [{ text:'Working definition: ', options:{ bold:true, color:HEX.purple } }, { text:'eating with features resembling substance use disorders — intense craving, repeated failed attempts to cut down, time spent obtaining or eating food, continued eating despite harm, and sometimes withdrawal-like symptoms.' }], { x:1.85, y:1.55, w:10.65, h:1.0, fontSize:15, valign:'middle', anim:1 });
  [['DSM-5-TR (2022)','Not a recognized diagnosis'],['ICD-11','Not a diagnosis — “disorders due to addictive behaviours” cover only gambling and gaming']].forEach(([h,d],i)=>{ const x=0.6+i*6.15;
    card(s, x, 2.85, 5.95, 0.95, 'FFFFFF', 2);
    s.addImage({ path:icon('xmark','r'), x:x+0.22, y:3.07, w:0.5, h:0.5, objectName:nm('anim2'), altText:'not recognized' });
    text(s, [{ text:h+':  ', options:{ bold:true, color:HEX.red } }, { text:d }], { x:x+0.9, y:2.9, w:4.9, h:0.85, fontSize:14, valign:'middle', anim:2 }); });
  const Cc = [['Binge-eating disorder','Official diagnosis','Recurrent binges with loss of control; no compensatory behavior','check',HEX.teal],
              ['Bulimia nervosa','Official diagnosis','Recurrent binges plus inappropriate compensatory behaviors','check',HEX.slate],
              ['Food addiction','Research construct','Dependence-like relationship with food; binge episodes not required','question',HEX.purple]];
  Cc.forEach(([h,tag,d,ic,c],i)=>{ const x=0.6+i*4.1;
    card(s, x, 4.0, 3.9, 2.4, 'FFFFFF', 3+i);
    iconCircle(s, ic, x+0.25, 4.22, 0.62, c, 3+i);
    text(s, h, { x:x+1.0, y:4.2, w:2.8, h:0.4, fontFace:'Cambria', fontSize:16.5, bold:true, color:c, anim:3+i });
    text(s, tag, { x:x+1.0, y:4.58, w:2.8, h:0.3, fontSize:12, bold:true, color:HEX.grey, anim:3+i });
    text(s, d, { x:x+0.25, y:5.05, w:3.45, h:1.2, fontSize:14, anim:3+i }); });
  source(s, 'Sources: Gearhardt and Schulte 2021; Meule and Gearhardt 2014; American Psychiatric Association 2022; World Health Organization 2022; Hebebrand et al. 2014.');
}

// ===== 14 DSM TABLE =====
{ const s = newSlide('dsm','CONTENT'); title(s, 'Translating DSM-5 substance-use criteria to eating');
  const rows = [['Larger amounts or longer than intended','Eating more, or for longer, than intended','E'],['Persistent desire or failed efforts to cut down','Failed attempts to cut down or control intake','E'],
    ['Much time obtaining, using, recovering','Time spent obtaining food, overeating, recovering','C'],['Craving','Intense craving for specific foods','E'],
    ['Failure to fulfil major roles','Overeating impairs work, school or home roles','C'],['Use despite social problems','Overeating despite interpersonal problems','C'],
    ['Activities given up','Activities reduced because of overeating','C'],['Hazardous use','Overeating in physically hazardous situations','C'],
    ['Use despite physical or psychological harm','Overeating despite known harm','E'],['Tolerance','More food needed for the same effect','C'],['Withdrawal','Irritability or restlessness when abstaining','W']];
  const ST = { E:['Empirical support',HEX.green], C:['Conceivable',HEX.amber], W:['Conceivable; confounded by energy deficit',HEX.red] };
  const hdr = ['DSM-5 criterion','Possible equivalent in eating','Evidence'].map(t=>({ text:t, options:{ bold:true, color:'FFFFFF', fill:{ color:HEX.navy }, fontSize:12.5, valign:'middle' } }));
  const body = rows.map(([a,b,c],i)=>[ { text:a, options:{ fontSize:12, fill:{ color: i%2? 'F6F8FA':'FFFFFF' } } }, { text:b, options:{ fontSize:12, fill:{ color: i%2? 'F6F8FA':'FFFFFF' } } }, { text:ST[c][0], options:{ fontSize:12, bold:true, color:ST[c][1], fill:{ color: i%2? 'F6F8FA':'FFFFFF' } } } ]);
  s.addTable([hdr, ...body], { x:0.6, y:1.42, w:8.55, colW:[3.1,3.35,2.1], rowH:0.39, fontFace:'Calibri', color:HEX.ink, border:{ type:'solid', color:'DCE2E8', pt:0.75 }, margin:[2,5,2,5], valign:'middle', objectName:'dsmTable' });
  const I = [['scaleU',HEX.purple,'An asymmetric standard','No drug meets every criterion: caffeine lacks several, and tobacco has no intoxication syndrome.'],
             ['arrowUp',HEX.red,'Lower thresholds, higher prevalence','DSM-IV needed ≥3 symptoms; DSM-5 “mild” needs ≥2. Direct transfer risks overestimating food addiction.']];
  I.forEach(([ic,c,h,d],i)=>{ const y=1.42+i*2.55; card(s, 9.45, y, 3.25, 2.35, 'FFFFFF', i+1);
    iconCircle(s, ic, 9.67, y+0.2, 0.6, c, i+1);
    text(s, h, { x:10.4, y:y+0.18, w:2.2, h:0.66, fontFace:'Cambria', fontSize:15, bold:true, color:c, valign:'middle', anim:i+1 });
    text(s, d, { x:9.67, y:y+0.95, w:2.85, h:1.35, fontSize:13, anim:i+1 }); });
  source(s, 'Sources: Meule and Gearhardt 2014; American Psychiatric Association 2013.');
}

// ===== 15 YFAS =====
{ const s = newSlide('yfas','CONTENT'); title(s, 'Measuring it: the Yale Food Addiction Scale');
  const V = [['2009','YFAS','DSM-IV based · 25 items · 7 symptoms + distress · cut-off ≥3 symptoms + distress'],['2013','YFAS-C','Adapted for children and adolescents'],
             ['2016','YFAS 2.0','DSM-5 based · 35 items · 11 symptoms · mild, moderate, severe'],['2017','mYFAS 2.0','Short form · 13 items · 11 symptoms']];
  s.addShape(SH.line, { x:0.9, y:1.72, w:11.5, h:0, line:{ color:HEX.line, width:2 }, objectName:'yline' });
  V.forEach(([y,n,d],i)=>{ const x=0.6+i*3.08;
    s.addText(y, { x:x+0.85, y:1.52, w:1.15, h:0.4, shape:SH.roundRect, rectRadius:0.2, fill:{ color:HEX.purple }, line:{ color:HEX.purple }, fontSize:13, bold:true, color:'FFFFFF', align:'center', valign:'middle', margin:0, objectName:nm('anim'+(i+1)) });
    card(s, x, 2.08, 2.85, 1.35, 'FFFFFF', i+1);
    text(s, n, { x:x+0.2, y:2.15, w:2.45, h:0.38, fontFace:'Cambria', fontSize:16, bold:true, color:HEX.purple, align:'center', anim:i+1 });
    text(s, d, { x:x+0.2, y:2.55, w:2.45, h:0.82, fontSize:12, align:'center', anim:i+1 }); });
  card(s, 0.6, 3.68, 6.3, 2.85, HEX.paleGreen, 5, 'CFE3D6');
  iconCircle(s, 'flag', 0.82, 3.86, 0.55, HEX.green, 5);
  text(s, 'Persian validations', { x:1.52, y:3.88, w:5, h:0.5, fontFace:'Cambria', fontSize:17, bold:true, color:HEX.green, valign:'middle', anim:5 });
  const P = [['Ghanbari 2022','YFAS 2.0, 451 students: single factor; r = 0.58–0.72 with food craving'],['Tajik-Esmaeeli 2024','Bariatric candidates: α = 0.89, ICC = 0.88'],['Niroumand Sarvandani 2024','mPYFAS 2.0, n = 9,606: α = 0.83; gender invariance']];
  text(s, P.flatMap(([a,b],i)=>[{ text:a+': ', options:{ bold:true, bullet:true } }, { text:b, options:{ breakLine:i<P.length-1 } }]), { x:0.85, y:4.5, w:5.85, h:1.95, fontSize:13.5, paraSpaceAfter:6, anim:5 });
  card(s, 7.15, 3.68, 5.55, 2.85, HEX.paleRed, 6, 'EBCACB');
  iconCircle(s, 'repeat', 7.37, 3.86, 0.55, HEX.red, 6);
  text(s, 'The circularity problem', { x:8.07, y:3.88, w:4.4, h:0.5, fontFace:'Cambria', fontSize:17, bold:true, color:HEX.red, valign:'middle', anim:6 });
  text(s, [{ text:'A tool built from substance-use criteria cannot, on its own, prove the construct exists. Does YFAS capture anything beyond binge eating, emotional eating, loss-of-control eating and restraint?' , options:{ breakLine:true } }, { text:'→ Read prevalence as “YFAS-defined food addiction”.', options:{ bold:true, color:HEX.red } }], { x:7.4, y:4.5, w:5.1, h:1.95, fontSize:13.5, anim:6 });
  source(s, 'Sources: Gearhardt et al. 2009, 2013, 2016; Schulte and Gearhardt 2017; Ghanbari et al. 2022; Tajik-Esmaeeli et al. 2024; Niroumand Sarvandani et al. 2024; Ziauddeen and Fletcher 2013.');
}

// ===== 16 PREVALENCE =====
{ const s = newSlide('prevalence','CONTENT'); title(s, 'How common is YFAS-defined food addiction?');
  const labels = ['Normal weight','Children','Adults','All samples','Overweight or obesity','Bariatric candidates','Binge-eating disorder'];
  s.addChart(pres.charts.BAR, [{ name:'Prevalence', labels, values:[11.1,12,14,19.9,24.9,32,50] }], { x:0.5, y:1.4, w:7.8, h:5.05, barDir:'col', barGapWidthPct:40,
    chartColors:[HEX.green,HEX.teal,HEX.teal,HEX.slate,HEX.amber,HEX.red,HEX.purple], showValue:true, dataLabelPosition:'outEnd', dataLabelFormatCode:'General"%"', dataLabelFontSize:13, dataLabelFontBold:true, dataLabelColor:HEX.ink, dataLabelFontFace:'+mn-lt',
    catAxisLabelFontSize:11.5, catAxisLabelColor:HEX.ink, catAxisLabelFontFace:'+mn-lt', valAxisLabelFontSize:11, valAxisLabelColor:'6B7682', valAxisLabelFontFace:'+mn-lt', valAxisMaxVal:60, valAxisMinVal:0, valAxisMajorUnit:10,
    valGridLine:{ color:'E3E8EE', size:0.75 }, catGridLine:{ style:'none' }, showLegend:false, showTitle:true, title:'Prevalence of YFAS-defined food addiction (%)', titleFontSize:14, titleColor:HEX.navy, titleFontFace:'+mn-lt', objectName:'chartFA' });
  const K = [['filter',HEX.slate,'Depends on who, which version, which cut-off','Pooled 19.9% (95% CI 16.3–24.0) across 25 studies; BED bar = “more than 50%”.'],
             ['warn',HEX.amber,'A corrected meta-analysis','Meule (2024): bulimia estimates in Praxedes et al. clashed with primary studies (often >80–95%); a correction confirmed subgroup underestimation.'],
             ['scaleU',HEX.red,'14% vs 13.9% is not equivalence','NESARC-III alcohol use disorder (13.9%) comes from diagnostic interviews; food addiction from self-report.']];
  K.forEach(([ic,c,h,d],i)=>{ const y=1.45+i*1.68; card(s, 8.6, y, 4.1, 1.53, 'FFFFFF', i+1);
    iconCircle(s, ic, 8.78, y+0.17, 0.5, c, i+1);
    text(s, h, { x:9.42, y:y+0.12, w:3.15, h:0.6, fontSize:14, bold:true, color:c, valign:'middle', anim:i+1 });
    text(s, d, { x:8.8, y:y+0.74, w:3.75, h:0.76, fontSize:11.5, anim:i+1 }); });
  source(s, 'Sources: Pursey et al. 2014; Gearhardt et al. 2023; Meule 2024; Praxedes et al. 2022; Grant et al. 2015, 2016.');
}

// ===== 17 FOODS =====
{ const s = newSlide('foods','CONTENT'); title(s, 'Which foods are most linked to addictive-like eating?');
  const L1 = ['Pizza','Chocolate','Potato chips','Cookies','Ice cream','French fries','Cheeseburger','Soda (non-diet)'], L2 = ['Cucumber','Carrots','Beans (no sauce)','Apple','Brown rice','Broccoli','Banana','Water'];
  [[L1,'Most associated','ultra-processed · high fat · high glycemic load',HEX.red,HEX.paleRed,0.6],[L2,'Least associated','unprocessed or minimally processed',HEX.green,HEX.paleGreen,4.65]].forEach(([L,h,sub,c,bg,x],k)=>{
    card(s, x, 1.45, 3.85, 5.0, bg, k+1, c);
    text(s, h, { x:x+0.25, y:1.58, w:3.4, h:0.42, fontFace:'Cambria', fontSize:18, bold:true, color:c, anim:k+1 });
    text(s, sub, { x:x+0.25, y:1.98, w:3.4, h:0.3, fontSize:11.5, italic:true, color:HEX.grey, anim:k+1 });
    L.forEach((f,i)=>{ const y=2.45+i*0.47;
      s.addText(String(i+1), { x:x+0.3, y, w:0.48, h:0.34, shape:SH.roundRect, rectRadius:0.17, fill:{ color:c }, line:{ color:c }, fontSize:12, bold:true, color:'FFFFFF', align:'center', valign:'middle', margin:0, objectName:nm('anim'+(k+1)) });
      text(s, f, { x:x+0.95, y:y-0.02, w:2.7, h:0.38, fontSize:15, valign:'middle', anim:k+1 }); }); });
  card(s, 8.75, 1.45, 3.95, 5.0, HEX.paleNavy, 3, 'D3DDE8');
  text(s, 'The abuse-potential analogy', { x:9.0, y:1.6, w:3.5, h:0.75, fontFace:'Cambria', fontSize:17, bold:true, color:HEX.navy, anim:3 });
  [['arrowUp',HEX.red,'Dose ↑','more fat and refined carbohydrate per bite'],['gauge',HEX.amber,'Speed ↑','faster absorption of refined carbohydrate']].forEach(([ic,c,h,d],i)=>{ const y=2.45+i*0.95;
    iconCircle(s, ic, 9.0, y, 0.55, c, 3); text(s, [{ text:h+'  ', options:{ bold:true, color:c } }, { text:d }], { x:9.7, y:y-0.08, w:2.85, h:0.75, fontSize:13.5, valign:'middle', anim:3 }); });
  text(s, 'An analogy, not pharmacokinetic equivalence: digesting a meal is not a drug reaching the brain.', { x:9.0, y:4.45, w:3.5, h:0.95, fontSize:13, italic:true, color:HEX.navy, anim:4 });
  text(s, 'Forced-choice ranking of 35 foods (2015); predates NOVA and the term UPF.', { x:9.0, y:5.5, w:3.5, h:0.8, fontSize:11.5, color:HEX.grey, anim:4 });
  source(s, 'Sources: Schulte, Avena and Gearhardt 2015; Gearhardt and Schulte 2021; Gearhardt and DiFeliceantonio 2023; Hebebrand et al. 2014; Westwater et al. 2016.');
}

// ===== 18 WITHDRAWAL =====
{ const s = newSlide('withdrawal','CONTENT'); title(s, 'Withdrawal: the weakest link');
  card(s, 0.6, 1.45, 3.9, 5.0, HEX.palePurple, 1, 'DCD3EA');
  text(s, 'What has been measured', { x:0.85, y:1.6, w:3.4, h:0.45, fontFace:'Cambria', fontSize:17, bold:true, color:HEX.purple, anim:1 });
  text(s, 'Highly Processed Food Withdrawal Scale (ProWS)', { x:0.85, y:2.08, w:3.4, h:0.6, fontSize:13.5, bold:true, anim:1 });
  ['Irritability','Fatigue','Restlessness','Craving'].forEach((t,i)=> s.addText(t, { x:0.85+(i%2)*1.7, y:2.82+Math.floor(i/2)*0.48, w:1.55, h:0.36, shape:SH.roundRect, rectRadius:0.18, fill:{ color:'FFFFFF' }, line:{ color:HEX.purple, width:1 }, fontSize:12.5, color:HEX.purple, align:'center', valign:'middle', margin:0, objectName:nm('anim1') }));
  text(s, [{ text:'Peak severity: ', options:{ bold:true } }, { text:'days 2–5 after cutting down', options:{ breakLine:true } }, { text:'Recent reviews still call this evidence preliminary.', options:{ italic:true, color:HEX.grey } }], { x:0.85, y:3.95, w:3.45, h:1.4, fontSize:13.5, anim:1 });
  s.addShape(SH.ellipse, { x:4.75, y:2.0, w:2.75, h:2.75, fill:{ color:HEX.purple, transparency:70 }, line:{ color:HEX.purple, width:2 }, objectName:nm('anim2') });
  s.addShape(SH.ellipse, { x:6.35, y:2.0, w:2.75, h:2.75, fill:{ color:HEX.amber, transparency:70 }, line:{ color:HEX.amber, width:2 }, objectName:nm('anim2') });
  text(s, 'Withdrawal from specific foods', { x:4.9, y:2.95, w:1.4, h:0.9, fontSize:12.5, bold:true, color:HEX.purple, align:'center', valign:'middle', anim:2 });
  text(s, 'General energy deficit', { x:7.55, y:2.95, w:1.4, h:0.9, fontSize:12.5, bold:true, color:'9A5E0B', align:'center', valign:'middle', anim:2 });
  text(s, '?', { x:6.45, y:2.7, w:0.95, h:0.9, fontFace:'Cambria', fontSize:44, bold:true, color:HEX.navy, align:'center', valign:'middle', anim:3 });
  text(s, 'irritability · fatigue · craving', { x:6.25, y:3.6, w:1.35, h:0.6, fontSize:10.5, color:HEX.ink, align:'center', anim:3 });
  text(s, 'If people cut sweets and calories together, irritability cannot be pinned on “sugar withdrawal”.', { x:4.75, y:5.0, w:4.35, h:0.95, fontSize:14, italic:true, color:HEX.navy, align:'center', anim:3 });
  card(s, 9.35, 1.45, 3.35, 5.0, 'FFFFFF', 4);
  text(s, 'Why the evidence is weak', { x:9.55, y:1.6, w:3.0, h:0.75, fontFace:'Cambria', fontSize:16, bold:true, color:HEX.red, anim:4 });
  const L = ['55% of patients with BED endorsed the YFAS withdrawal item — with no operational definition','Retrospective self-report','Expectancy in people who already believe they are “addicted”','No objective biomarker','Unclear time course; non-specific symptoms'];
  text(s, L.map((t,i)=>({ text:t, options:{ bullet:true, breakLine:i<L.length-1 } })), { x:9.55, y:2.4, w:3.0, h:3.95, fontSize:12.5, paraSpaceAfter:5, anim:4 });
  source(s, 'Sources: Schulte et al. 2018; LaFata et al. 2024; Gearhardt et al. 2012; Ziauddeen and Fletcher 2013; Meule and Kübler 2012; Westwater et al. 2016.');
}
module.exports = B;
