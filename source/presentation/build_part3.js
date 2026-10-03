const B = require('./build_part2.js');
const { pres, HEX, C, SH, D, section, newSlide, icon, nm, shadow, iconCircle, card, text, chip, meter, source, title, divider } = B;

function box(s, x, y, w, h, fill, line, anim, lw){
  s.addShape(SH.roundRect, { x, y, w, h, rectRadius:0.1, fill:{ color:fill }, line:{ color:line, width:lw||2 }, objectName: nm(anim?'anim'+anim:'box') });
}
function arrow(s, x, y, w, h, color, anim, o){
  s.addShape(SH.line, Object.assign({ x, y, w, h, line:{ color:color||'4A5560', width:2.25, dashType:'dash', endArrowType:'triangle' }, objectName: nm(anim?'anim'+anim:'arr') }, o||{}));
}
function runs(L, color){ return L.map(([a,b],k)=> a ? [{ text:a, options:{ bold:true, bullet:true, color } }, { text:b, options:{ breakLine:k<L.length-1 } }] : [{ text:b, options:{ bullet:true, breakLine:k<L.length-1 } }]).flat(); }
function bullets(s, arr, o){ return text(s, arr.map((t,i)=> typeof t==='string' ? { text:t, options:{ bullet:true, breakLine:i<arr.length-1 } } : { text:t.text, options:Object.assign({ bullet:true, breakLine:i<arr.length-1 }, t.options) }), Object.assign({ paraSpaceAfter:5 }, o)); }
function head(s, t, x, y, w, color, anim, size){ text(s, t, { x, y, w, h:0.45, fontFace:'Cambria', fontSize:size||17, bold:true, color, valign:'middle', anim }); }

// ===== 19 DIVIDER 3 =====
section('3 Mechanisms');
divider('div3', 2, 'Mechanisms', 'Why might ultra-processed foods behave differently?');

// ===== 20 CONCEPTUAL MODEL =====
{ const s = newSlide('model','CONTENT'); title(s, 'An integrated conceptual model');
  const L = [['Product characteristics','Processing, fat + carbohydrate, glycemic load','industry',HEX.red,HEX.paleRed],
             ['Food environment','Availability, price, marketing','cart',HEX.amber,HEX.paleAmber],
             ['Individual vulnerability','Age, mental health, food insecurity','dna',HEX.purple,HEX.palePurple]];
  L.forEach(([h,d,ic,c,bg],i)=>{ const y=1.6+i*1.6;
    box(s, 0.6, y, 3.05, 1.3, bg, c, 1);
    iconCircle(s, ic, 0.78, y+0.33, 0.62, c, 1);
    text(s, h, { x:1.55, y:y+0.08, w:2.05, h:0.6, fontFace:'Cambria', fontSize:14, bold:true, color:c, valign:'middle', anim:1 });
    text(s, d, { x:1.55, y:y+0.72, w:2.05, h:0.52, fontSize:11.5, color:HEX.ink, anim:1 }); });
  arrow(s, 3.72, 2.25, 0.5, 0.45, null, 2); arrow(s, 3.72, 3.85, 0.5, 0, null, 2); arrow(s, 3.72, 5.0, 0.5, 0.45, null, 2, { flipV:true });
  box(s, 4.3, 1.5, 3.55, 4.8, HEX.paleNavy, HEX.navy, 2);
  text(s, 'Mediating mechanisms', { x:4.3, y:1.6, w:3.55, h:0.45, fontFace:'Cambria', fontSize:16, bold:true, color:HEX.navy, align:'center', valign:'middle', anim:2 });
  [['Physiological response','Rapid absorption, gut–brain signaling','bolt'],['Neural reward circuits','Reinforced reward, striatum','brain']].forEach(([h,d,ic],i)=>{ const y=2.2+i*2.0;
    box(s, 4.55, y, 3.05, 1.75, 'FFFFFF', HEX.teal, 3);
    iconCircle(s, ic, 5.72, y+0.15, 0.6, HEX.teal, 3);
    text(s, h, { x:4.65, y:y+0.8, w:2.85, h:0.4, fontSize:15, bold:true, color:HEX.teal, align:'center', anim:3 });
    text(s, d, { x:4.65, y:y+1.2, w:2.85, h:0.45, fontSize:12.5, align:'center', anim:3 }); });
  arrow(s, 7.92, 3.9, 0.5, 0, null, 4);
  box(s, 8.5, 2.95, 1.95, 1.9, HEX.paleGreen, HEX.green, 4);
  text(s, 'Behavioral phenotype', { x:8.6, y:3.1, w:1.75, h:0.8, fontSize:15, bold:true, color:HEX.green, align:'center', valign:'middle', anim:4 });
  text(s, 'Addictive-like eating', { x:8.6, y:3.95, w:1.75, h:0.7, fontSize:12.5, align:'center', anim:4 });
  arrow(s, 10.5, 3.9, 0.32, 0, null, 5);
  box(s, 10.88, 2.95, 1.82, 1.9, HEX.paleNavy, HEX.navy, 5);
  text(s, 'Related health outcomes', { x:10.95, y:3.15, w:1.68, h:1.5, fontSize:15, bold:true, color:HEX.navy, align:'center', valign:'middle', anim:5 });
  card(s, 8.5, 5.15, 4.2, 1.15, HEX.paleAmber, 6, 'F0DDBB');
  iconCircle(s, 'warn', 8.65, 5.33, 0.55, HEX.amber, 6);
  text(s, 'Dashed arrows are hypothesized pathways, not proven causality. Each arrow is a testable question.', { x:9.35, y:5.2, w:3.25, h:1.05, fontSize:12.5, color:'7A4A08', valign:'middle', anim:6 });
  text(s, 'Each box is a separate research target', { x:8.5, y:2.3, w:4.2, h:0.4, fontSize:12, italic:true, color:HEX.grey, align:'center', anim:6 });
  source(s, 'Model compiled by the author from Schulte and Gearhardt; DiFeliceantonio et al. 2018; Volkow et al. 2013; Gearhardt et al. 2023; LaFata et al. 2024.');
}

// ===== 21 SPEED + FAT/CARB =====
{ const s = newSlide('speed','CONTENT'); title(s, 'Delivery speed and the fat + carbohydrate combination');
  // left panel
  card(s, 0.6, 1.45, 5.95, 5.05, 'FFFFFF', 1);
  iconCircle(s, 'gauge', 0.82, 1.62, 0.62, HEX.teal, 1);
  head(s, 'Speed of delivery', 1.6, 1.7, 4.7, HEX.teal, 1, 18);
  text(s, 'In addiction science, faster delivery means stronger reinforcement. Processing may speed up refined-carbohydrate delivery — a hypothesis, not a proven mechanism.', { x:0.85, y:2.35, w:5.5, h:0.85, fontSize:13, anim:1 });
  text(s, 'Haber et al. 1977', { x:0.85, y:3.25, w:3, h:0.3, fontSize:12, bold:true, color:HEX.grey, anim:2 });
  [['apple','Whole apple',HEX.green,3.35],['bottle','Fiber-free juice',HEX.amber,5.3]].forEach(([ic,l,c,cx])=>{ iconCircle(s, ic, cx-0.275, 3.5, 0.55, c, 2); text(s, l, { x:cx-0.9, y:4.08, w:1.8, h:0.3, fontSize:12.5, bold:true, color:c, align:'center', anim:2 }); });
  [['Eating speed','slower','much faster'],['Insulin rise','smaller','greater'],['Glucose afterwards','steady','rebound fall']].forEach(([r,a,b],i)=>{ const y=4.5+i*0.42;
    s.addShape(SH.rect, { x:0.85, y, w:5.45, h:0.38, fill:{ color: i%2?'FFFFFF':HEX.light }, line:{ color: i%2?'FFFFFF':HEX.light }, objectName:nm('anim3') });
    text(s, r, { x:0.95, y, w:1.6, h:0.38, fontSize:12.5, bold:true, valign:'middle', anim:3 });
    text(s, a, { x:2.5, y, w:1.7, h:0.38, fontSize:12.5, color:HEX.green, align:'center', valign:'middle', anim:3 });
    text(s, b, { x:4.45, y, w:1.7, h:0.38, fontSize:12.5, bold:true, color:'B06A0A', align:'center', valign:'middle', anim:3 }); });
  text(s, 'Juice is not necessarily NOVA group 4: the lesson concerns food structure.', { x:0.85, y:5.85, w:5.5, h:0.55, fontSize:12, italic:true, color:HEX.grey, valign:'middle', anim:3 });
  // right panel
  card(s, 6.75, 1.45, 5.95, 5.05, 'FFFFFF', 4);
  iconCircle(s, 'burst', 6.97, 1.62, 0.62, HEX.red, 4);
  head(s, 'Fat + carbohydrate: supra-additive', 7.75, 1.7, 4.8, HEX.red, 4, 18);
  text(s, 'DiFeliceantonio et al. 2018', { x:7.0, y:2.35, w:4, h:0.3, fontSize:12, bold:true, color:HEX.grey, anim:4 });
  const cy=2.75;
  s.addText('Fat', { x:7.05, y:cy+0.2, w:0.95, h:0.95, shape:SH.ellipse, fill:{ color:HEX.amber }, line:{ color:'FFFFFF', width:2 }, fontSize:15, bold:true, color:'FFFFFF', align:'center', valign:'middle', margin:0, objectName:nm('anim5') });
  text(s, '+', { x:8.05, y:cy+0.35, w:0.4, h:0.6, fontSize:28, bold:true, color:HEX.grey, align:'center', valign:'middle', anim:5 });
  s.addText('Carb', { x:8.5, y:cy+0.2, w:0.95, h:0.95, shape:SH.ellipse, fill:{ color:HEX.teal }, line:{ color:'FFFFFF', width:2 }, fontSize:15, bold:true, color:'FFFFFF', align:'center', valign:'middle', margin:0, objectName:nm('anim5') });
  text(s, '<', { x:9.5, y:cy+0.3, w:0.5, h:0.7, fontFace:'Cambria', fontSize:34, bold:true, color:HEX.red, align:'center', valign:'middle', anim:5 });
  s.addText('Fat + carb', { x:10.1, y:cy, w:1.4, h:1.4, shape:SH.ellipse, fill:{ color:HEX.red }, line:{ color:'FFFFFF', width:2 }, shadow:shadow(), fontSize:15, bold:true, color:'FFFFFF', align:'center', valign:'middle', margin:0, objectName:nm('anim5') });
  text(s, 'more than the sum of its parts', { x:9.55, y:cy+1.4, w:2.5, h:0.3, fontSize:11.5, italic:true, color:HEX.red, align:'center', anim:5 });
  bullets(s, ['Higher willingness to pay','Greater response in reward-valuation regions, including the striatum','Foods matched for familiarity, reported liking and calories'], { x:7.0, y:4.55, w:5.5, h:1.05, fontSize:13, anim:6 });
  text(s, [{ text:'Evolutionary hypothesis: ', options:{ bold:true } }, { text:'such rich combinations were rare in natural foods (breast milk is the cited example). Untested in humans — and a supra-additive effect is not an addictive effect.' }], { x:7.0, y:5.62, w:5.5, h:0.8, fontSize:12, color:HEX.grey, anim:7 });
  source(s, 'Sources: Schulte and Gearhardt; Haber et al. 1977; DiFeliceantonio et al. 2018; Small and DiFeliceantonio 2019.');
}

// ===== 22 DOPAMINE MODELS =====
{ const s = newSlide('dopamine','CONTENT'); title(s, 'Dopamine: three competing models');
  const M = [['arrowDown',HEX.teal,'Reward deficiency','Reduced dopamine signaling drives eating more to reach the same reward.',
               [['Wang, Volkow et al. 2001: ','lower striatal D2 receptor availability in obesity (PET) — cross-sectional, so no causal direction'],['Johnson and Kenny 2010: ','cafeteria-diet rats lost D2 availability and kept eating despite punishment — an animal model']],'Predicts: blunted reward sensitivity'],
             ['magnet',HEX.purple,'Incentive sensitization','Repeated exposure sensitizes cue-triggered “wanting” — without more “liking”.',
               [['Robinson and Berridge: ','motivation to obtain a reward dissociates from the pleasure of consuming it'],['','A person may want a food more without enjoying it more']],'Predicts: heightened cue reactivity'],
             ['repeat',HEX.red,'Habit to compulsion','Control shifts from goal-directed action to habit; dorsal striatal circuits take over.',
               [['Everitt and Robbins: ','behavior persists even after the reward is devalued'],['','Compulsion need not mean “needing more reward”']],'Predicts: insensitivity to outcomes']];
  M.forEach(([ic,c,h,d,ev,pred],i)=>{ const x=0.6+i*4.1;
    card(s, x, 1.45, 3.9, 4.0, 'FFFFFF', i+1);
    iconCircle(s, ic, x+0.22, 1.65, 0.68, c, i+1);
    text(s, h, { x:x+1.05, y:1.68, w:2.7, h:0.62, fontFace:'Cambria', fontSize:17.5, bold:true, color:c, valign:'middle', anim:i+1 });
    text(s, d, { x:x+0.22, y:2.45, w:3.45, h:0.8, fontSize:13.5, bold:true, color:HEX.ink, anim:i+1 });
    text(s, runs(ev, c), { x:x+0.22, y:3.3, w:3.45, h:1.5, fontSize:12, paraSpaceAfter:4, anim:i+1 });
    s.addText(pred, { x:x+0.22, y:4.9, w:3.45, h:0.38, shape:SH.roundRect, rectRadius:0.19, fill:{ color:HEX.light }, line:{ color:c, width:1 }, fontSize:12, bold:true, color:c, align:'center', valign:'middle', margin:0, objectName:nm('anim'+(i+1)) }); });
  card(s, 0.6, 5.65, 12.1, 0.85, HEX.paleAmber, 4, 'F0DDBB');
  iconCircle(s, 'scaleU', 0.78, 5.77, 0.6, HEX.amber, 4);
  text(s, [{ text:'Different predictions, not one model. ', options:{ bold:true, color:'9A5E0B' } }, { text:'Citing only findings that fit a favored model artificially strengthens the construct (Ziauddeen, Farooqi and Fletcher 2012).' }], { x:1.55, y:5.68, w:11.0, h:0.8, fontSize:14, valign:'middle', anim:4 });
  source(s, 'Sources: Wang et al. 2001; Johnson and Kenny 2010; Robinson and Berridge 2008; Everitt and Robbins 2005; Ziauddeen et al. 2012; Volkow et al. 2013.');
}

// ===== 23 OTHER SYSTEMS =====
{ const s = newSlide('neuro_other','CONTENT'); title(s, 'Opioids, endocannabinoids, genes and GLP-1 drugs');
  const Q = [['heart',HEX.amber,'Opioids: “liking”',[['','Opioids carry hedonic “liking”; dopamine carries “wanting”'],['','OPRM1 A118G and DRD2 Taq1A variants studied in binge-eating disorder (Davis et al. 2009)'],['','Association is not causation']]],
             ['dna',HEX.slate,'Genetics: weak support',[['','Candidate-gene findings (e.g., DRD2 Taq1A) replicate poorly (Border et al. 2019)'],['','Genome-wide approaches now preferred (Hatoum et al. 2023)'],['','No robust genetic overlap established']]],
             ['pills',HEX.green,'Endocannabinoids: a cautionary tale',[['','CB1 activation boosts eating motivation and hedonics'],['Rimonabant ','(CB1 antagonist): weight loss, but depression and suicidal ideation — withdrawn from the EU market (Christensen et al. 2007)']]],
             ['syringe',HEX.purple,'GLP-1-based drugs',[['Semaglutide, n = 30, 12 weeks: ','less food craving, better eating control (Blundell 2017)'],['Alcohol use disorder, n = 48: ','fewer drinks per drinking day, less craving; drinking days unchanged (Hendershot 2025)'],['Animal dopamine data mixed; ','tirzepatide is a dual GIP/GLP-1 agonist']]]];
  Q.forEach(([ic,c,h,L],i)=>{ const x=0.6+(i%2)*6.15, y=1.45+Math.floor(i/2)*2.45;
    card(s, x, y, 5.95, 2.28, 'FFFFFF', i+1);
    iconCircle(s, ic, x+0.22, y+0.2, 0.6, c, i+1);
    text(s, h, { x:x+0.98, y:y+0.2, w:4.8, h:0.6, fontFace:'Cambria', fontSize:17, bold:true, color:c, valign:'middle', anim:i+1 });
    text(s, runs(L), { x:x+0.25, y:y+0.9, w:5.5, h:1.3, fontSize:12.5, paraSpaceAfter:3, anim:i+1 }); });
  chip(s, 'hyp', 0.6, 6.35, 2.3, 5);
  text(s, 'Less craving after a drug does not prove addiction: GLP-1 agonists also change appetite, satiety and intake.', { x:3.05, y:6.3, w:9.65, h:0.42, fontSize:13.5, italic:true, color:HEX.purple, valign:'middle', anim:5 });
}

// ===== 24 DIVIDER 4 =====
section('4 Human evidence');
divider('div4', 3, 'Human Evidence', 'What do trials and cohorts actually show?');

// ===== 25 HALL =====
{ const s = newSlide('hall','CONTENT'); title(s, 'Hall et al. 2019: the inpatient feeding trial');
  s.addChart(pres.charts.BAR, [{ name:'Difference', labels:['Total energy','Carbohydrate','Fat','Protein'], values:[508,280,230,-2] }], { x:0.5, y:1.4, w:6.3, h:4.75, barDir:'col', barGapWidthPct:55,
    chartColors:[HEX.red,HEX.amber,'C9A22B','9AA0A6'], invertIfNegative:false, showValue:true, dataLabelPosition:'outEnd', dataLabelFormatCode:'+0;−0;0', dataLabelFontSize:14, dataLabelFontBold:true, dataLabelColor:HEX.ink, dataLabelFontFace:'+mn-lt',
    catAxisLabelFontSize:13, catAxisLabelColor:HEX.ink, catAxisLabelFontFace:'+mn-lt', catAxisLabelPos:'low', valAxisLabelFontSize:11, valAxisLabelColor:'6B7682', valAxisLabelFontFace:'+mn-lt', valAxisMaxVal:600, valAxisMinVal:-100, valAxisMajorUnit:100,
    valGridLine:{ color:'E3E8EE', size:0.75 }, catGridLine:{ style:'none' }, showLegend:false, showTitle:true, title:'Extra ad libitum intake on the UPF diet (kcal/day)', titleFontSize:14, titleColor:HEX.navy, titleFontFace:'+mn-lt', objectName:'chartHall' });
  text(s, 'Protein intake unchanged — consistent with protein leverage, but the trial was not designed to test it.', { x:0.75, y:6.12, w:6.0, h:0.45, fontSize:12, italic:true, color:HEX.grey, anim:1 });
  card(s, 7.05, 1.45, 5.65, 1.25, HEX.paleNavy, 1, 'D3DDE8');
  iconCircle(s, 'bed', 7.25, 1.65, 0.62, HEX.navy, 1);
  text(s, [{ text:'n = 20 adults · 4 weeks inpatient · crossover', options:{ bold:true, color:HEX.navy, breakLine:true } }, { text:'2 weeks UPF + 2 weeks minimally processed; diets matched for presented energy, macronutrients, sugar, sodium and fiber; eat as much as wanted' }], { x:8.05, y:1.52, w:4.5, h:1.12, fontSize:12, valign:'middle', anim:1 });
  const T = [['+508','kcal/day more on the UPF diet',HEX.red],['+0.9 kg','vs −0.9 kg on the minimally processed diet (2 weeks)',HEX.red],['48 vs 31','kcal per minute: faster eating on UPF',HEX.amber]];
  T.forEach(([n,l,c],i)=>{ const x=7.05+i*1.92;
    card(s, x, 2.9, 1.81, 1.85, 'FFFFFF', 2+i);
    text(s, n, { x:x+0.08, y:3.0, w:1.65, h:0.65, fontFace:'Cambria', fontSize: n.length>5 ? 22 : 26, bold:true, color:c, align:'center', valign:'middle', anim:2+i });
    text(s, l, { x:x+0.12, y:3.68, w:1.57, h:1.0, fontSize:11.5, align:'center', anim:2+i }); });
  card(s, 7.05, 4.95, 5.65, 1.55, HEX.paleAmber, 5, 'F0DDBB');
  iconCircle(s, 'warn', 7.22, 5.1, 0.55, HEX.amber, 5);
  text(s, [{ text:'Limits: ', options:{ bold:true, color:'9A5E0B' } }, { text:'small, short, inpatient; diets also differed in non-beverage energy density, eating rate and texture. ' }, { text:'No measure of addictive-like eating.', options:{ bold:true } }], { x:7.9, y:5.0, w:4.65, h:1.45, fontSize:13, valign:'middle', anim:5 });
  source(s, 'Source: Hall et al. 2019 (Cell Metabolism). Values are mean differences; error bars omitted.');
}

// ===== 26 DICKEN =====
{ const s = newSlide('dicken','CONTENT'); title(s, 'Dicken et al. 2025: UPF within dietary guidelines');
  card(s, 0.6, 1.45, 6.85, 2.95, 'FFFFFF', 1);
  text(s, 'Randomized crossover trial, England', { x:0.85, y:1.58, w:6.4, h:0.4, fontFace:'Cambria', fontSize:17, bold:true, color:HEX.navy, anim:1 });
  text(s, '55 randomized · 50 in intention-to-treat · BMI 25 to <40 · habitual UPF ≥50% of energy', { x:0.85, y:2.0, w:6.4, h:0.35, fontSize:12.5, color:HEX.grey, anim:1 });
  [['Diet A · 8 weeks',2.3,HEX.green],['Washout · 4 weeks',1.55,'9AA0A6'],['Diet B · 8 weeks',2.3,HEX.red]].reduce((x,[l,w,c])=>{ s.addText(l, { x, y:2.55, w, h:0.55, shape:SH.roundRect, rectRadius:0.1, fill:{ color:c }, line:{ color:'FFFFFF', width:1.5 }, fontSize:13, bold:true, color:'FFFFFF', align:'center', valign:'middle', margin:0, objectName:nm('anim2') }); return x+w+0.08; }, 0.85);
  text(s, 'random order', { x:0.85, y:3.12, w:6.3, h:0.3, fontSize:11.5, italic:true, color:HEX.grey, align:'center', anim:2 });
  text(s, [{ text:'Both diets followed the UK Eatwell Guide, ', options:{ bold:true } }, { text:'ad libitum and delivered to participants: one mainly minimally processed, one mainly ultra-processed.' }], { x:0.85, y:3.45, w:6.4, h:0.85, fontSize:13, anim:2 });
  s.addChart(pres.charts.BAR, [{ name:'Weight change', labels:['Minimally processed','Ultra-processed'], values:[-2.06,-1.05] }], { x:7.6, y:1.4, w:5.1, h:3.05, barDir:'col', barGapWidthPct:70,
    chartColors:[HEX.green,HEX.red], invertIfNegative:false, showValue:true, dataLabelPosition:'outEnd', dataLabelFormatCode:'0.00"%"', dataLabelFontSize:14, dataLabelFontBold:true, dataLabelColor:HEX.ink, dataLabelFontFace:'+mn-lt',
    catAxisLabelFontSize:12.5, catAxisLabelColor:HEX.ink, catAxisLabelFontFace:'+mn-lt', catAxisLabelPos:'high', valAxisLabelFontSize:11, valAxisLabelColor:'6B7682', valAxisLabelFontFace:'+mn-lt', valAxisMaxVal:0, valAxisMinVal:-2.5, valAxisMajorUnit:0.5,
    valGridLine:{ color:'E3E8EE', size:0.75 }, catGridLine:{ style:'none' }, showLegend:false, showTitle:true, title:'Relative weight change over 8 weeks', titleFontSize:13.5, titleColor:HEX.navy, titleFontFace:'+mn-lt', objectName:'chartDicken' });
  card(s, 0.6, 4.6, 5.95, 1.9, HEX.paleGreen, 3, 'CFE3D6');
  iconCircle(s, 'check', 0.8, 4.78, 0.58, HEX.green, 3);
  text(s, 'Difference −1.01 percentage points', { x:1.55, y:4.75, w:4.9, h:0.4, fontFace:'Cambria', fontSize:17, bold:true, color:HEX.green, anim:3 });
  text(s, '95% CI −1.87 to −0.14; p = 0.024. Fat mass also fell more on the minimally processed diet, and some craving measures moved the same way.', { x:1.55, y:5.17, w:4.85, h:1.25, fontSize:13, anim:3 });
  card(s, 6.75, 4.6, 5.95, 1.9, HEX.paleAmber, 4, 'F0DDBB');
  iconCircle(s, 'layer', 6.95, 4.78, 0.58, HEX.amber, 4);
  text(s, 'Neither trial isolates “processing”', { x:7.7, y:4.75, w:4.9, h:0.4, fontFace:'Cambria', fontSize:17, bold:true, color:'9A5E0B', anim:4 });
  text(s, 'Diets were bundles: energy density, eating rate, sensory properties and palatability changed together. Of 106 national guidelines, most still give nutrient-based messages (Koios et al. 2022).', { x:7.7, y:5.17, w:4.85, h:1.25, fontSize:13, anim:4 });
  source(s, 'Sources: Dicken et al. 2025 (Nature Medicine); Hall et al. 2019; Koios, Machado and Lacy-Nichols 2022.');
}

// ===== 27 LANE UMBRELLA =====
{ const s = newSlide('lane','CONTENT'); title(s, 'Lane et al. 2024: umbrella review of 45 pooled analyses');
  const S = [['45','pooled analyses from 14 meta-analyses',HEX.navy],['9,888,373','participations — not unique individuals',HEX.navy],['32 / 45','(71%) direct associations with harm',HEX.red],['0 · 4 · 22 · 19','GRADE high · moderate · low · very low',HEX.amber]];
  S.forEach(([n,l,c],i)=>{ const x=0.6+i*3.06;
    card(s, x, 1.38, 2.9, 0.88, HEX.light, 1, 'DCE2E8');
    text(s, n, { x:x+0.12, y:1.42, w:2.66, h:0.45, fontFace:'Cambria', fontSize:20, bold:true, color:c, align:'center', valign:'middle', anim:1 });
    text(s, l, { x:x+0.12, y:1.86, w:2.66, h:0.32, fontSize:11, color:HEX.grey, align:'center', anim:1 }); });
  const R = [['h','Convincing evidence (Class I)',HEX.red],
    ['Cardiovascular disease mortality (RR)',1.50,1.37,1.63,'Very low'],['Type 2 diabetes, per +10% energy (RR)',1.12,1.11,1.13,'Moderate'],['Anxiety (OR)',1.48,1.37,1.59,'Low'],['Common mental disorders (OR)',1.53,1.43,1.63,'Low'],
    ['h','Highly suggestive evidence (Class II)',HEX.navy],
    ['All-cause mortality (RR)',1.21,1.15,1.27],['Heart disease mortality (HR)',1.66,1.51,1.84],['Type 2 diabetes, non-dose–response (OR)',1.40,1.23,1.59],['Depression (HR)',1.22,1.16,1.28],['Adverse sleep outcomes (OR)',1.41,1.24,1.61],['Wheezing (RR)',1.40,1.27,1.55],['Obesity (OR)',1.55,1.36,1.77]];
  const px=4.45, pw=4.55, lo=Math.log(0.9), hi=Math.log(2.0), X=v=>px+(Math.log(v)-lo)/(hi-lo)*pw;
  const y0=2.68, rh=0.282;
  text(s, 'OUTCOME', { x:0.6, y:2.36, w:3, h:0.28, fontSize:10.5, bold:true, color:'7A8591', charSpacing:1 });
  text(s, 'ESTIMATE (95% CI)', { x:9.15, y:2.36, w:2.1, h:0.28, fontSize:10.5, bold:true, color:'7A8591', charSpacing:1 });
  text(s, 'GRADE', { x:11.35, y:2.36, w:1.35, h:0.28, fontSize:10.5, bold:true, color:'7A8591', charSpacing:1, align:'center' });
  s.addShape(SH.line, { x:X(1), y:y0-0.05, w:0, h:R.length*rh+0.05, line:{ color:'8A96A3', width:1.25, dashType:'dash' }, objectName:'nullLine' });
  [1,1.25,1.5,1.75].forEach(v=> text(s, v.toFixed(2), { x:X(v)-0.3, y:y0+R.length*rh+0.02, w:0.6, h:0.22, fontSize:10, color:'7A8591', align:'center' }));
  let col=HEX.red, grp=2;
  R.forEach((r,i)=>{ const y=y0+i*rh;
    if (r[0]==='h'){ col=r[2]; grp = col===HEX.red?2:3; text(s, r[1], { x:0.6, y, w:3.8, h:rh, fontSize:12.5, bold:true, color:col, valign:'middle', anim:grp }); return; }
    const [lab,e,l,h,g]=r, cy=y+rh/2;
    if (i%2===0) s.addShape(SH.rect, { x:0.6, y, w:12.1, h:rh, fill:{ color:'F6F8FA' }, line:{ color:'F6F8FA' }, objectName:nm('anim'+grp) });
    text(s, lab, { x:0.75, y, w:3.65, h:rh, fontSize:11.5, valign:'middle', anim:grp });
    s.addShape(SH.line, { x:X(l), y:cy, w:X(h)-X(l), h:0, line:{ color:col, width:2.25 }, objectName:nm('anim'+grp) });
    s.addShape(SH.rect, { x:X(e)-0.075, y:cy-0.075, w:0.15, h:0.15, fill:{ color:col }, line:{ color:col }, objectName:nm('anim'+grp) });
    text(s, e.toFixed(2)+'  ('+l.toFixed(2)+'–'+h.toFixed(2)+')', { x:9.15, y, w:2.1, h:rh, fontSize:11.5, bold:true, color:col, valign:'middle', anim:grp });
    if (g){ const gc = { 'Very low':HEX.red, 'Low':HEX.amber, 'Moderate':HEX.teal }[g];
      s.addText(g, { x:11.5, y:y+0.035, w:1.05, h:rh-0.07, shape:SH.roundRect, rectRadius:0.1, fill:{ color:gc }, line:{ color:gc }, fontSize:10.5, bold:true, color:'FFFFFF', align:'center', valign:'middle', margin:0, objectName:nm('anim4') }); } });
  text(s, 'Class I is not high certainty', { x:11.25, y:y0+6*rh, w:1.45, h:0.8, fontSize:12, bold:true, italic:true, color:HEX.red, align:'center', valign:'middle', anim:4 });
  text(s, 'GRADE shown where reported in the seminar text', { x:11.25, y:y0+9*rh, w:1.45, h:0.8, fontSize:10, italic:true, color:HEX.grey, align:'center', valign:'middle', anim:4 });
  source(s, 'Source: Lane et al. 2024 (BMJ). Class = credibility of association; GRADE = certainty of evidence. Mainly observational data.');
}

// ===== 28 COHORTS =====
{ const s = newSlide('cohorts','CONTENT'); title(s, 'Large cohorts: consistent signals, heterogeneous outcomes');
  const K = [['NutriNet-Santé','France · n = 104,980','HR 1.12','overall cancer per +10% UPF energy (1.06–1.18)',['Breast cancer HR 1.11 (1.02–1.22)','Robust to diet-quality adjustment','Residual confounding still possible'],HEX.navy],
             ['EPIC','Europe · 25 cancer sites','Mixed','association pattern differs by cancer site',['Processed and ultra-processed foods examined','Not uniform across populations or sites','UK Biobank and Moli-sani: similar signals'],HEX.slate],
             ['TLGS','Tehran · median follow-up 7 years','HR 1.28','prediabetes, top vs bottom tertile (1.07–1.52)',['n = 1,954; 766 prediabetes cases','Per +10% energy: HR 1.12 (1.02–1.23)','Type 2 diabetes (n = 2,457): no significant link'],HEX.red]];
  K.forEach(([h,sub,n,nl,L,c],i)=>{ const x=0.6+i*4.1;
    card(s, x, 1.45, 3.9, 3.55, 'FFFFFF', i+1);
    s.addShape(SH.roundRect, { x:x+0.2, y:1.62, w:3.5, h:1.55, rectRadius:0.08, fill:{ color: i===2?HEX.paleRed:HEX.paleNavy }, line:{ color: i===2?HEX.paleRed:HEX.paleNavy }, objectName:nm('anim'+(i+1)) });
    text(s, h, { x:x+0.35, y:1.7, w:3.2, h:0.4, fontFace:'Cambria', fontSize:18, bold:true, color:c, anim:i+1 });
    text(s, sub, { x:x+0.35, y:2.08, w:3.2, h:0.3, fontSize:11.5, color:HEX.grey, anim:i+1 });
    text(s, n, { x:x+0.35, y:2.4, w:1.45, h:0.62, fontFace:'Cambria', fontSize:24, bold:true, color:c, valign:'middle', anim:i+1 });
    text(s, nl, { x:x+1.8, y:2.4, w:1.82, h:0.7, fontSize:11, color:HEX.ink, valign:'middle', anim:i+1 });
    bullets(s, L, { x:x+0.25, y:3.32, w:3.45, h:1.6, fontSize:12.5, anim:i+1 }); });
  card(s, 0.6, 5.2, 12.1, 1.3, HEX.paleRed, 4, 'EBCACB');
  iconCircle(s, 'search', 0.82, 5.38, 0.9, HEX.red, 4);
  text(s, 'The gap', { x:1.95, y:5.3, w:3, h:0.42, fontFace:'Cambria', fontSize:19, bold:true, color:HEX.red, anim:4 });
  text(s, 'None of the trials, the umbrella review or these cohorts measured addictive-like eating or YFAS scores. They answer claim (a) — energy intake, weight, health — not claim (b).', { x:1.95, y:5.7, w:10.6, h:0.75, fontSize:14, anim:4 });
  source(s, 'Sources: Fiolet et al. 2018; Kliemann et al. 2023; Moslehi et al. 2024; Lane et al. 2024; Schulte et al. 2015.');
}

// ===== 29 DIVIDER 5 =====
section('5 The debate');
divider('div5', 4, 'The Debate', 'Is “addictive” the right word?');

// ===== 30 DEBATE =====
{ const s = newSlide('debate','CONTENT'); title(s, 'Two competing narratives');
  card(s, 0.6, 1.45, 5.75, 4.6, HEX.palePurple, 1, 'DCD3EA');
  iconCircle(s, 'check', 0.8, 1.62, 0.62, HEX.purple, 1);
  text(s, [{ text:'The case for', options:{ breakLine:true } }, { text:'Gearhardt and DiFeliceantonio 2023', options:{ fontSize:12, bold:false, color:HEX.grey, fontFace:'Calibri' } }], { x:1.55, y:1.58, w:4.6, h:0.75, fontFace:'Cambria', fontSize:19, bold:true, color:HEX.purple, valign:'middle', anim:1 });
  text(s, 'Tobacco criteria (US Surgeon General, 1988) applied to highly processed foods:', { x:0.85, y:2.45, w:5.3, h:0.55, fontSize:13, anim:1 });
  [['Compulsive use','despite wanting to stop'],['Psychoactive effects','changes mood or mental state'],['Reinforcement','repeats consumption'],['Strong cravings','added later from addiction science']].forEach(([h,d],i)=>{ const x=0.85+(i%2)*2.6, y=3.1+Math.floor(i/2)*1.05;
    s.addShape(SH.roundRect, { x, y, w:2.45, h:0.92, rectRadius:0.08, fill:{ color:'FFFFFF' }, line:{ color:HEX.purple, width:1 }, objectName:nm('anim2') });
    text(s, h, { x:x+0.12, y:y+0.08, w:2.2, h:0.35, fontSize:13.5, bold:true, color:HEX.purple, anim:2 });
    text(s, d, { x:x+0.12, y:y+0.45, w:2.2, h:0.4, fontSize:11.5, color:HEX.grey, anim:2 }); });
  text(s, 'No single active ingredient needed: as with tobacco, delivery speed and product design matter.', { x:0.85, y:5.25, w:5.3, h:0.7, fontSize:13, italic:true, color:HEX.purple, anim:2 });
  s.addText('VS', { x:6.12, y:3.35, w:1.1, h:1.1, shape:SH.ellipse, fill:{ color:HEX.navy }, line:{ color:'FFFFFF', width:3 }, shadow:shadow(), fontFace:'Cambria', fontSize:24, bold:true, color:'FFFFFF', align:'center', valign:'middle', margin:0, objectName:nm('anim3') });
  card(s, 6.95, 1.45, 5.75, 4.6, HEX.paleRed, 3, 'EBCACB');
  iconCircle(s, 'xmark', 7.15, 1.62, 0.62, HEX.red, 3);
  text(s, [{ text:'The case against', options:{ breakLine:true } }, { text:'Ziauddeen, Fletcher, Hebebrand and colleagues', options:{ fontSize:12, bold:false, color:HEX.grey, fontFace:'Calibri' } }], { x:7.9, y:1.58, w:4.7, h:0.75, fontFace:'Cambria', fontSize:19, bold:true, color:HEX.red, valign:'middle', anim:3 });
  [['1','No addictive agent','Sugar? Fat? A combination? The agent is unspecified (Ziauddeen and Fletcher 2013).'],['2','Heterogeneous imaging','Human findings are inconsistent, sometimes contradictory (Ziauddeen et al. 2012).'],['3','Wrong term','“Eating addiction”: the behavior, not a substance, is addictive-like (Hebebrand et al. 2014).']].forEach(([n,h,d],i)=>{ const y=2.5+i*0.98;
    s.addText(n, { x:7.2, y, w:0.45, h:0.45, shape:SH.ellipse, fill:{ color:HEX.red }, line:{ color:HEX.red }, fontSize:14, bold:true, color:'FFFFFF', align:'center', valign:'middle', margin:0, objectName:nm('anim4') });
    text(s, h, { x:7.8, y:y-0.03, w:4.7, h:0.35, fontSize:14, bold:true, color:HEX.red, anim:4 });
    text(s, d, { x:7.8, y:y+0.32, w:4.7, h:0.68, fontSize:12.5, anim:4 }); });
  text(s, 'Sugar addiction: human evidence scant; animal data rely on intermittent access (Westwater et al. 2016).', { x:7.2, y:5.48, w:5.35, h:0.52, fontSize:11.5, italic:true, color:HEX.grey, anim:4 });
  card(s, 0.6, 6.15, 12.1, 0.45, HEX.light, 5, 'DCE2E8');
  text(s, [{ text:'Still live: ', options:{ bold:true, color:HEX.navy } }, { text:'Fletcher vs Kenny (2018) and the 2021 Gearhardt vs Hebebrand debate — about construct validity, interpretation and consequences, not just data.' }], { x:0.8, y:6.15, w:11.8, h:0.45, fontSize:12.5, valign:'middle', anim:5 });
}

// ===== 31 ALTERNATIVES =====
{ const s = newSlide('alternatives','CONTENT'); title(s, 'Simpler explanations — and methodological limits');
  text(s, 'Rule these out before invoking addiction', { x:0.6, y:1.4, w:7, h:0.42, fontFace:'Cambria', fontSize:18, bold:true, color:HEX.navy });
  const A = [['weight',HEX.teal,'Energy density','More energy per gram → more energy at the same volume (Rolls 2009)'],['egg',HEX.green,'Protein leverage','Diluted protein → eat more to hit a protein target (Simpson and Raubenheimer 2005)'],
             ['hourglass',HEX.amber,'Eating rate','Soft texture, less chewing → faster eating → more intake (Robinson et al. 2014)'],['repeat',HEX.purple,'Restraint–binge cycle','Dietary restriction followed by overeating (Fairburn et al. 2003)']];
  A.forEach(([ic,c,h,d],i)=>{ const x=0.6+(i%2)*3.65, y=1.95+Math.floor(i/2)*1.95;
    card(s, x, y, 3.45, 1.8, 'FFFFFF', i+1);
    iconCircle(s, ic, x+0.2, y+0.2, 0.58, c, i+1);
    text(s, h, { x:x+0.92, y:y+0.2, w:2.4, h:0.58, fontFace:'Cambria', fontSize:16, bold:true, color:c, valign:'middle', anim:i+1 });
    text(s, d, { x:x+0.2, y:y+0.88, w:3.1, h:0.85, fontSize:12.5, anim:i+1 }); });
  card(s, 0.6, 5.9, 7.1, 0.65, HEX.paleTeal, 5, 'CFE3E7');
  text(s, [{ text:'Not mutually exclusive: ', options:{ bold:true, color:HEX.teal } }, { text:'weights differ between people; addiction may fit a subgroup.' }], { x:0.8, y:5.9, w:6.8, h:0.65, fontSize:13.5, valign:'middle', anim:5 });
  card(s, 7.95, 1.45, 4.75, 5.1, HEX.light, 6, 'DCE2E8');
  text(s, 'Methodological limits', { x:8.2, y:1.6, w:4.3, h:0.45, fontFace:'Cambria', fontSize:18, bold:true, color:HEX.red, anim:6 });
  const M = [['clipboard','Dietary assessment','FFQs and recalls misclassify NOVA groups'],['users','Residual confounding','UPF intake tracks social and lifestyle factors'],['arrow','Reverse causation','Mental health ↔ UPF may run both ways'],['chart','Excess significance','Small-study effects in some pooled analyses'],['comments','Self-report','YFAS relies on what people say']];
  M.forEach(([ic,h,d],i)=>{ const y=2.2+i*0.85;
    iconCircle(s, ic, 8.2, y, 0.52, HEX.slate, 6+i);
    text(s, h, { x:8.9, y:y-0.06, w:3.65, h:0.32, fontSize:13.5, bold:true, anim:6+i });
    text(s, d, { x:8.9, y:y+0.26, w:3.65, h:0.4, fontSize:12, color:HEX.grey, anim:6+i }); });
  source(s, 'Sources: Rolls 2009; Simpson and Raubenheimer 2005; Robinson et al. 2014; Fairburn et al. 2003; LaFata et al. 2024; Lane et al. 2022, 2024.');
}

module.exports = B;
