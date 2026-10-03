const B = require('./build_part3.js');
const { pres, HEX, C, SH, D, section, newSlide, icon, nm, shadow, iconCircle, card, text, chip, meter, source, title, divider } = B;
function runs(L, color){ return L.map(([a,b],k)=> a ? [{ text:a, options:{ bold:true, bullet:true, color } }, { text:b, options:{ breakLine:k<L.length-1 } }] : [{ text:b, options:{ bullet:true, breakLine:k<L.length-1 } }]).flat(); }
function bullets(s, arr, o){ return text(s, arr.map((t,i)=> typeof t==='string' ? { text:t, options:{ bullet:true, breakLine:i<arr.length-1 } } : { text:t.text, options:Object.assign({ bullet:true, breakLine:i<arr.length-1 }, t.options) }), Object.assign({ paraSpaceAfter:5 }, o)); }
function head(s, t, x, y, w, color, anim, size){ text(s, t, { x, y, w, h:0.45, fontFace:'Cambria', fontSize:size||17, bold:true, color, valign:'middle', anim }); }

// ===== 32 DIVIDER 6 =====
section('6 Policy');
divider('div6', 5, 'Policy', 'What can be done without settling the debate?');

// ===== 33 PYRAMID =====
{ const s = newSlide('pyramid','CONTENT'); title(s, 'Why individual education is not enough');
  const P = [['Counseling and education',HEX.ice,HEX.navy],['Clinical interventions','9DBBD3',HEX.navy],['Long-lasting protective interventions','5E8DB5','FFFFFF'],['Changing the context: healthy default choices',HEX.teal,'FFFFFF'],['Socioeconomic factors',HEX.navy,'FFFFFF']];
  const cx=3.95, top=1.55, rh=0.86;
  P.forEach(([t,f,tc],i)=>{ const w=2.3+i*1.0, y=top+i*(rh+0.06);
    s.addText(t, { x:cx-w/2, y, w, h:rh, shape:SH.rect, fill:{ color:f }, line:{ color:'FFFFFF', width:1.5 }, fontSize:13.5, bold:true, color:tc, align:'center', valign:'middle', margin:4, objectName:nm('anim'+(5-i)) }); });
  s.addShape(SH.line, { x:0.55, y:1.55, w:0, h:4.4, line:{ color:HEX.grey, width:2, beginArrowType:'triangle' }, objectName:nm('anim6') });
  text(s, 'More individual effort needed', { x:0.1, y:1.4, w:0.4, h:2.2, fontSize:11, color:HEX.grey, vert:'vert270', align:'center', valign:'middle', anim:6 });
  s.addShape(SH.line, { x:7.35, y:1.55, w:0, h:4.4, line:{ color:HEX.teal, width:2, endArrowType:'triangle' }, objectName:nm('anim6') });
  text(s, 'Greater population impact', { x:7.4, y:3.75, w:0.35, h:2.2, fontSize:11, bold:true, color:HEX.teal, vert:'vert270', align:'center', valign:'middle', anim:6 });
  card(s, 7.85, 1.45, 4.85, 1.75, 'FFFFFF', 7);
  iconCircle(s, 'utensils', 8.0, 1.62, 0.58, HEX.teal, 7);
  text(s, [{ text:'Environment over willpower. ', options:{ bold:true, color:HEX.teal } }, { text:'If products and settings drive intake beyond need, education alone shifts the burden onto individuals; environmental measures work without constant self-control.' }], { x:8.72, y:1.55, w:3.85, h:1.55, fontSize:12.5, valign:'middle', anim:7 });
  card(s, 7.85, 3.35, 4.85, 1.55, 'FFFFFF', 8);
  iconCircle(s, 'people', 8.0, 3.52, 0.58, HEX.green, 8);
  text(s, [{ text:'Equity. ', options:{ bold:true, color:HEX.green } }, { text:'Downstream campaigns may favor advantaged groups; structural and fiscal measures can narrow gaps. Mexico: largest drop in lowest-SES households.' }], { x:8.72, y:3.42, w:3.85, h:1.4, fontSize:12.5, valign:'middle', anim:8 });
  card(s, 7.85, 5.05, 4.85, 1.45, HEX.paleAmber, 9, 'F0DDBB');
  iconCircle(s, 'warn', 8.0, 5.22, 0.58, HEX.amber, 9);
  text(s, [{ text:'Read outcomes carefully. ', options:{ bold:true, color:'9A5E0B' } }, { text:'Most evaluations measure purchases, reformulation or ad exposure — not intake or disease.' }], { x:8.72, y:5.1, w:3.85, h:1.35, fontSize:12.5, valign:'middle', anim:9 });
  source(s, 'Sources: Frieden 2010; Swinburn et al. 2011; Lorenc et al. 2013; Colchero et al. 2017.');
}

// ===== 34 CHILE =====
{ const s = newSlide('chile','CONTENT'); title(s, 'Chile’s Law 20,606: warning labels as a policy package');
  const O = ['SUGARS','SODIUM','SATURATED FAT','CALORIES'];
  O.forEach((t,i)=>{ const x=0.75+(i%2)*1.75, y=1.5+Math.floor(i/2)*1.75, d=1.55;
    s.addShape(SH.octagon, { x, y, w:d, h:d, fill:{ color:'111111' }, line:{ color:'FFFFFF', width:2.5 }, shadow:shadow(), objectName:nm('anim1') });
    s.addShape(SH.octagon, { x:x+0.07, y:y+0.07, w:d-0.14, h:d-0.14, fill:{ color:'111111' }, line:{ color:'FFFFFF', width:1.25 }, objectName:nm('anim1') });
    text(s, [{ text:'HIGH IN', options:{ breakLine:true, fontSize:11 } }, { text:t, options:{ fontSize: t.length>8 ? 11.5 : 14 } }], { x:x+0.12, y:y+0.35, w:d-0.24, h:0.85, bold:true, color:'FFFFFF', align:'center', valign:'middle', anim:1 }); });
  text(s, 'Three components, implemented in phases from 2016', { x:0.6, y:5.08, w:3.8, h:0.3, fontSize:11.5, bold:true, color:'7A8591' });
  [['tag','Black octagon warning labels'],['tv','Marketing restrictions to children'],['school','No sale of “high-in” products in schools']].forEach(([ic,t],i)=>{ const y=5.42+i*0.4;
    s.addImage({ path:icon(ic,'n'), x:0.65, y, w:0.3, h:0.3, objectName:nm('anim2'), altText:t });
    text(s, t, { x:1.1, y:y-0.03, w:3.4, h:0.36, fontSize:12.5, valign:'middle', anim:2 }); });
  const labels = ['Regulated beverages (year 1)','Sugar, regulated products','Sodium, regulated products','Saturated fat, regulated products','Energy, regulated products','Sugar, whole basket (net)','Energy, whole basket (net)'];
  s.addChart(pres.charts.BAR, [{ name:'Change', labels, values:[-23.7,-36.8,-21.9,-15.7,-23.0,-20.2,-8.3] }], { x:4.55, y:1.4, w:8.15, h:3.85, barDir:'bar', barGapWidthPct:40,
    chartColors:[HEX.red,'C25A5D','C25A5D','C25A5D','C25A5D','7B98B8','7B98B8'], invertIfNegative:false, showValue:true, dataLabelPosition:'outEnd', dataLabelFormatCode:'0.0"%"', dataLabelFontSize:12, dataLabelFontBold:true, dataLabelColor:HEX.ink, dataLabelFontFace:'+mn-lt',
    catAxisLabelFontSize:11.5, catAxisLabelColor:HEX.ink, catAxisLabelFontFace:'+mn-lt', catAxisLabelPos:'high', catAxisOrientation:'maxMin', valAxisLabelFontSize:10.5, valAxisLabelColor:'6B7682', valAxisLabelFontFace:'+mn-lt', valAxisMaxVal:0, valAxisMinVal:-45, valAxisMajorUnit:5,
    valGridLine:{ color:'E3E8EE', size:0.75 }, catGridLine:{ style:'none' }, showLegend:false, showTitle:true, title:'Purchases vs counterfactual (household purchase data; first year and three years)', titleFontSize:13, titleColor:HEX.navy, titleFontFace:'+mn-lt', objectName:'chartChile' });
  card(s, 4.7, 5.4, 8.0, 1.12, HEX.paleAmber, 3, 'F0DDBB');
  iconCircle(s, 'warn', 4.88, 5.6, 0.58, HEX.amber, 3);
  text(s, [{ text:'Effect of the package, not of the label alone. ', options:{ bold:true, color:'9A5E0B' } }, { text:'Purchases are not intake; changes were similar across socioeconomic groups; data cover only part of household purchases.' }], { x:5.6, y:5.42, w:6.95, h:1.08, fontSize:13, valign:'middle', anim:3 });
  source(s, 'Sources: Taillie et al. 2020 (first-year beverage purchases); Taillie et al. 2024 (three-year purchases).');
}

// ===== 35 TAXES =====
{ const s = newSlide('taxes','CONTENT'); title(s, 'Sugar-sweetened beverage taxes: flat vs tiered');
  card(s, 0.6, 1.45, 5.95, 4.15, 'FFFFFF', 1);
  iconCircle(s, 'coins', 0.8, 1.6, 0.6, HEX.amber, 1);
  head(s, 'Mexico, 2014: flat tax', 1.55, 1.62, 4.8, 'B06A0A', 1, 18);
  text(s, '1 peso per liter on sugar-sweetened beverages', { x:1.55, y:2.05, w:4.8, h:0.3, fontSize:12.5, color:HEX.grey, anim:1 });
  s.addChart(pres.charts.BAR, [{ name:'All households', labels:['Year 1','Year 2'], values:[-5.5,-9.7] },{ name:'Lowest SES', labels:['Year 1','Year 2'], values:[-9.0,-14.3] }], { x:0.75, y:2.4, w:3.3, h:3.1, barDir:'col', barGapWidthPct:50,
    chartColors:['E0A84E','B06A0A'], invertIfNegative:false, showValue:true, dataLabelPosition:'outEnd', dataLabelFormatCode:'0.0"%"', dataLabelFontSize:11, dataLabelFontBold:true, dataLabelColor:HEX.ink, dataLabelFontFace:'+mn-lt',
    catAxisLabelFontSize:12, catAxisLabelColor:HEX.ink, catAxisLabelFontFace:'+mn-lt', catAxisLabelPos:'high', valAxisHidden:true, valAxisMaxVal:0, valAxisMinVal:-17, valGridLine:{ style:'none' }, catGridLine:{ style:'none' },
    showLegend:true, legendPos:'b', legendFontSize:10.5, legendFontFace:'+mn-lt', legendColor:HEX.ink, showTitle:false, objectName:'chartMexico' });
  bullets(s, ['Year 1: −6% on average, −12% by December; untaxed drinks +4%','Two-year mean: −7.6%','Equity is not automatic: regressive burden and substitution must be measured'], { x:4.15, y:2.55, w:2.25, h:2.95, fontSize:11.5, anim:2 });
  card(s, 6.75, 1.45, 5.95, 4.15, 'FFFFFF', 3);
  iconCircle(s, 'droplet', 6.95, 1.6, 0.6, HEX.teal, 3);
  head(s, 'United Kingdom, 2018: tiered levy', 7.7, 1.62, 4.85, HEX.teal, 3, 18);
  text(s, 'Announced 2016 · implemented April 2018 · paid by producers', { x:7.7, y:2.05, w:4.85, h:0.3, fontSize:12.5, color:HEX.grey, anim:3 });
  [['≥ 8 g sugar / 100 mL','£0.24 per liter',HEX.teal,4.2],['5 to < 8 g / 100 mL','£0.18 per liter','5FA3B1',3.4],['< 5 g / 100 mL','exempt','B7D6DC',2.6]].forEach(([a,b,c,w],i)=>{ const y=2.5+i*0.55;
    s.addShape(SH.rect, { x:7.0, y, w, h:0.46, fill:{ color:c }, line:{ color:'FFFFFF' }, objectName:nm('anim4') });
    text(s, [{ text:a+'   ', options:{ bold:true } }, { text:b }], { x:7.12, y, w:w-0.2, h:0.46, fontSize:12.5, color: i<2?'FFFFFF':HEX.ink, valign:'middle', anim:4 }); });
  [['15.4%','of drinks still above the lower threshold by February 2019'],['−33.8 pp','drinks above 5 g/100 mL vs pre-policy trend — mainly via reformulation']].forEach(([n,l],i)=>{ const y=4.25+i*0.62;
    text(s, n, { x:7.0, y, w:1.55, h:0.55, fontFace:'Cambria', fontSize:21, bold:true, color:HEX.teal, valign:'middle', anim:5 });
    text(s, l, { x:8.6, y, w:3.95, h:0.55, fontSize:12, valign:'middle', anim:5 }); });
  card(s, 0.6, 5.78, 12.1, 0.78, HEX.paleNavy, 6, 'D3DDE8');
  iconCircle(s, 'flag', 0.78, 5.88, 0.56, HEX.navy, 6);
  text(s, [{ text:'For Iran: ', options:{ bold:true, color:HEX.navy } }, { text:'a tiered per-gram sugar tax merits modelling — not yet a recommendation. Needs local data on price elasticity, substitution, inflation and enforcement.' }], { x:1.5, y:5.8, w:11.05, h:0.74, fontSize:13.5, valign:'middle', anim:6 });
  source(s, 'Sources: Colchero et al. 2016, 2017; Scarborough et al. 2020. UK data not sales-weighted: purchases cannot be inferred.');
}

// ===== 36 MARKETING, SCHOOLS, GUIDELINES, TOBACCO =====
{ const s = newSlide('marketing','CONTENT'); title(s, 'Marketing, schools, guidelines — and the tobacco analogy');
  const Q = [['tv',HEX.red,'Marketing to children',[['WHO 2010: ','recommendations on marketing to children'],['UK: ','“less healthy” TV ads before 9 p.m. and paid online ads restricted from 5 January 2026'],['Chile: ','TV ad exposure −44% (preschoolers), −58% (adolescents)']]],
             ['school',HEX.navy,'School food environment',[['','Limit sales of low-nutrition products; remove sugary drinks from vending machines'],['','Strengthen school meals built on fresh, minimally processed foods'],['Chile: ','school sales ban was part of the package']]],
             ['book',HEX.green,'Processing in dietary guidelines',[['Brazil 2014 “golden rule”: ','prefer natural or minimally processed foods and freshly made meals to UPF'],['','Followed to varying degrees by Uruguay, Peru, Ecuador, France, Belgium and Canada (106 guidelines reviewed)']]],
             ['smoking',HEX.slate,'The tobacco analogy',[['1980–2001: ','US tobacco companies owned major food companies; their products were 29% (fat–sodium) and 80% (carb–sodium) more likely to be hyper-palatable'],['Limits: ','food is essential, UPF is heterogeneous, there is no single “nicotine”']]]];
  Q.forEach(([ic,c,h,L],i)=>{ const x=0.6+(i%2)*6.15, y=1.45+Math.floor(i/2)*2.6;
    card(s, x, y, 5.95, 2.42, 'FFFFFF', i+1);
    iconCircle(s, ic, x+0.22, y+0.2, 0.6, c, i+1);
    text(s, h, { x:x+0.98, y:y+0.2, w:4.8, h:0.6, fontFace:'Cambria', fontSize:17, bold:true, color:c, valign:'middle', anim:i+1 });
    text(s, runs(L), { x:x+0.25, y:y+0.9, w:5.5, h:1.45, fontSize:12.5, paraSpaceAfter:3, anim:i+1 }); });
  source(s, 'Sources: WHO 2010; UK Advertising Regulations 2024; Dillman Carpentier et al. 2020; Brazil MoH 2014; Koios et al. 2022; Fazzino et al. 2024; Gilmore et al. 2023.');
}

// ===== 37 IRAN MATRIX =====
{ const s = newSlide('iran_matrix','CONTENT'); title(s, 'Options for Iran: evidence, facilitators, barriers');
  const R = [['Warning-label package','Chile 2016','Regulated products: sugar −36.8%, energy −23.0%','Existing nutrition-labeling infrastructure','Regulatory revision; inter-agency coordination; industry resistance'],
    ['Tiered sugar tax','UK SDIL 2018','Drinks above 5 g/100 mL: −33.8 pp (reformulation)','Existing tax system','Tax–FDA coordination; distribution and substitution'],
    ['Flat SSB tax','Mexico 2014','Purchases −7.6% (two-year mean); largest in lowest SES','Simple to implement','Shift to untaxed drinks; regressivity'],
    ['Marketing limits for children','Chile; WHO 2010','TV ad exposure −44% (preschool), −58% (adolescents)','Oversight of official media','Digital and social media hard to monitor'],
    ['School food environment','Chile, Brazil','Part of packages; independent effect unclear','Ministry of Education canteen rules','Canteen economics; healthy alternatives; monitoring'],
    ['Processing in guidelines','Brazil 2014','Message framework shifts; present in many guidelines','Little new infrastructure needed','Public communication; behavioral effect unevaluated'],
    ['National UPF monitoring','NHANES, NDNS','Enables trends, burden and policy evaluation','Add a module to existing surveys','Cost; standard NOVA coding; coder training']];
  const H = ['Intervention','Example','Documented effect (intermediate)','Facilitator in Iran','Barrier in Iran'].map((t,i)=>({ text:t, options:{ bold:true, color:'FFFFFF', fill:{ color:[HEX.navy,HEX.navy,HEX.navy,HEX.green,HEX.red][i] }, fontSize:12, valign:'middle' } }));
  const body = R.map((r,i)=> r.map((t,j)=>({ text:t, options:{ fontSize:11.5, bold:j===0, color: j===0?HEX.navy:HEX.ink, fill:{ color: i===6 ? HEX.paleAmber : (i%2?'F6F8FA':'FFFFFF') } } })));
  s.addTable([H, ...body], { x:0.6, y:1.4, w:12.1, colW:[2.05,1.4,3.05,2.6,3.0], rowH:[0.4,0.6,0.6,0.6,0.6,0.6,0.6,0.6], fontFace:'Calibri', border:{ type:'solid', color:'DCE2E8', pt:0.75 }, margin:[3,6,3,6], valign:'middle', objectName:'iranTable' });
  text(s, 'Feasibility columns are the author’s qualitative assessment (infrastructure, cost, monitoring capacity, stakeholder resistance) — not a formal feasibility or stakeholder analysis. Highlighted row: a prerequisite for evaluating all the others.', { x:0.6, y:6.2, w:12.1, h:0.5, fontSize:11, italic:true, color:HEX.grey });
}

// ===== 38 DIVIDER 7 =====
section('7 Vulnerable groups and clinic');
divider('div7', 6, 'Vulnerability and the Clinic', 'Who is most at risk — and what should clinicians say?');

// ===== 39 VULNERABLE =====
{ const s = newSlide('vulnerable','CONTENT'); title(s, 'Who is most vulnerable?');
  const Cols = [['child',HEX.navy,'Children and adolescents',[['15%','all samples'],['12%','community'],['19%','overweight']],'YFAS-defined food addiction (Yekaninejad et al. 2021)',
                 ['Prefrontal control still maturing: reward–control imbalance (Casey et al. 2008)','Heavy exposure to food marketing','Food preferences form early but stay malleable (Birch 1999)']],
                ['weight',HEX.purple,'Obesity and eating disorders',[['11.1%','healthy weight'],['24.9%','overweight or obesity']],'Correlation, not identity: BMI is no proxy (Pursey et al. 2014)',
                 ['BED: 92.4% met DSM-IV dependence criteria with “binge eating” in place of “substance” (n = 79; Cassin and von Ranson 2007)','12/12 with BED and 5/12 without met mild SUD criteria (qualitative; Curtis and Davis 2014)']],
                ['people',HEX.teal,'Mental health and income',[['OR 1.44','depression'],['OR 1.48','anxiety']],'Mostly cross-sectional; possibly bidirectional (Lane et al. 2022)',
                 ['US data: stronger link with food insecurity (LaFata et al. 2024)','Iran: inflation → more cereals, less fruit; sanctions → most food groups fell, more so in low-income homes, bread rose','Restrictive UPF policy needs affordable alternatives']]];
  Cols.forEach(([ic,c,h,N,cap,L],i)=>{ const x=0.6+i*4.1;
    card(s, x, 1.45, 3.9, 5.05, 'FFFFFF', i+1);
    iconCircle(s, ic, x+0.22, 1.62, 0.62, c, i+1);
    text(s, h, { x:x+1.0, y:1.62, w:2.8, h:0.62, fontFace:'Cambria', fontSize:16.5, bold:true, color:c, valign:'middle', anim:i+1 });
    const nw = 3.5/N.length;
    N.forEach(([n,l],k)=>{ const nx=x+0.2+k*nw;
      text(s, n, { x:nx, y:2.4, w:nw, h:0.55, fontFace:'Cambria', fontSize: n.length>5 ? 20 : 24, bold:true, color:c, align:'center', valign:'middle', anim:i+1 });
      text(s, l, { x:nx, y:2.95, w:nw, h:0.3, fontSize:11, color:HEX.grey, align:'center', anim:i+1 }); });
    text(s, cap, { x:x+0.22, y:3.3, w:3.45, h:0.5, fontSize:11, italic:true, color:c, align:'center', anim:i+1 });
    s.addShape(SH.line, { x:x+0.3, y:3.88, w:3.3, h:0, line:{ color:HEX.line, width:1 }, objectName:nm('anim'+(i+1)) });
    bullets(s, L, { x:x+0.22, y:3.98, w:3.5, h:2.45, fontSize:12, anim:i+1 }); });
  source(s, 'Sources: Yekaninejad et al. 2021; Casey et al. 2008; Birch 1999; Pursey et al. 2014; Cassin and von Ranson 2007; Curtis and Davis 2014; Lane et al. 2022; LaFata et al. 2024; Rahbarinejad et al. 2025; RezaeeDaryakenari et al. 2024.');
}

// ===== 40 CLINIC =====
{ const s = newSlide('clinic','CONTENT'); title(s, 'Clinical implications: abstinence, moderation, stigma');
  card(s, 0.6, 1.45, 3.9, 4.0, HEX.paleRed, 1, 'EBCACB');
  iconCircle(s, 'ban', 0.8, 1.62, 0.6, HEX.red, 1);
  head(s, 'Abstain from “trigger foods”?', 1.55, 1.65, 2.9, HEX.red, 1, 15.5);
  bullets(s, ['Food itself cannot be given up; proposals target specific foods or features','Peer-support models (e.g., Overeaters Anonymous) are not evidence-based treatment','One 10–14-week UPF-abstinence pilot; rigorous RCTs still needed','Restriction can maintain binge eating'], { x:0.82, y:2.4, w:3.5, h:3.0, fontSize:12.5, anim:1 });
  card(s, 4.7, 1.45, 3.9, 4.0, HEX.paleGreen, 2, 'CFE3D6');
  iconCircle(s, 'stethoscope', 4.9, 1.62, 0.6, HEX.green, 2);
  head(s, 'What already works', 5.65, 1.65, 2.9, HEX.green, 2, 15.5);
  bullets(s, ['CBT and interpersonal therapy: strong evidence in binge-eating disorder (Hilbert et al. 2019)','Harm reduction and moderation are accepted goals in addiction care (Marlatt and Witkiewitz 2010)','Open question: does the addiction model add clinical value?'], { x:4.92, y:2.4, w:3.5, h:3.0, fontSize:12.5, anim:2 });
  card(s, 8.8, 1.45, 3.9, 4.0, HEX.palePurple, 3, 'DCD3EA');
  iconCircle(s, 'heartCrack', 9.0, 1.62, 0.6, HEX.purple, 3);
  head(s, 'Stigma cuts both ways', 9.75, 1.65, 2.9, HEX.purple, 3, 15.5);
  text(s, [{ text:'+  ', options:{ bold:true, color:HEX.green } }, { text:'Addiction framing reduced blame and stigma in an experiment (Latner et al. 2014)', options:{ breakLine:true } }, { text:' ', options:{ breakLine:true, fontSize:6 } },
           { text:'−  ', options:{ bold:true, color:HEX.red } }, { text:'Belief in food addiction may prompt restriction → craving → disinhibited eating; still a hypothesis (Ruddock and Hardman 2017)' }], { x:9.02, y:2.4, w:3.5, h:3.0, fontSize:12.5, anim:3 });
  card(s, 0.6, 5.62, 12.1, 0.9, HEX.paleNavy, 4, 'D3DDE8');
  iconCircle(s, 'doctor', 0.8, 5.75, 0.62, HEX.navy, 4);
  text(s, [{ text:'Clinical bottom line: ', options:{ bold:true, color:HEX.navy } }, { text:'no blanket advice to abstain from trigger foods; individualize after clinical assessment, and use addiction language without denying the person’s agency.' }], { x:1.6, y:5.65, w:10.95, h:0.85, fontSize:14, valign:'middle', anim:4 });
  source(s, 'Sources: LaFata et al. 2024; Fairburn et al. 2003; Hilbert et al. 2019; Marlatt and Witkiewitz 2010; Hebebrand and Gearhardt 2021; Latner et al. 2014; Ruddock and Hardman 2017.');
}

// ===== 41 LIMITATIONS + GAPS =====
section('8 Conclusions');
{ const s = newSlide('limits_gaps','CONTENT'); title(s, 'Limitations of this review and eight research gaps');
  card(s, 0.6, 1.45, 3.75, 5.05, HEX.light, 1, 'DCE2E8');
  head(s, 'Limitations', 0.82, 1.58, 3.3, HEX.slate, 1, 17);
  bullets(s, ['Narrative review: possible selection bias','No predefined criteria; no uniform GRADE appraisal','NIH four-arm trial (NCT05290064) completed but unpublished: data preliminary','Iranian evidence fragmented and partly indirect','Fast-moving field: needs periodic updating'], { x:0.82, y:2.1, w:3.35, h:4.3, fontSize:12.5, anim:1 });
  const G = [['Active factor','Multi-arm factorial feeding trials'],['Construct validity','YFAS + structured interviews + latent class analysis'],['Natural history','Cohorts from childhood into adulthood'],['Withdrawal','Energy-matched selective-elimination trials'],
             ['Treatment','RCTs vs CBT with long-term follow-up'],['UPF classification','Inter-coder reliability; compare systems'],['Iranian intake data','National survey processing module'],['Policy evaluation in Iran','Interrupted time series of traffic-light labels']];
  G.forEach(([h,d],i)=>{ const x=4.55+(i%2)*4.1, y=1.45+Math.floor(i/2)*1.28, pri=i>=6, c= pri?HEX.red:HEX.navy;
    card(s, x, y, 3.95, 1.15, pri?HEX.paleRed:'FFFFFF', 2+Math.floor(i/2)+(pri?1:0), pri?HEX.red:undefined);
    s.addText(String(i+1), { x:x+0.15, y:y+0.3, w:0.55, h:0.55, shape:SH.ellipse, fill:{ color:c }, line:{ color:c }, fontFace:'Cambria', fontSize:17, bold:true, color:'FFFFFF', align:'center', valign:'middle', margin:0, objectName:nm('anim'+(2+Math.floor(i/2)+(pri?1:0))) });
    text(s, h, { x:x+0.85, y:y+0.12, w:3.0, h:0.38, fontSize:14.5, bold:true, color:c, anim:2+Math.floor(i/2)+(pri?1:0) });
    text(s, d, { x:x+0.85, y:y+0.5, w:3.0, h:0.58, fontSize:12, color:HEX.ink, anim:2+Math.floor(i/2)+(pri?1:0) }); });
  [4.55,8.65].forEach(x=> s.addText('PRIORITY FOR IRAN', { x:x+2.2, y:5.29+0.8, w:1.6, h:0.26, shape:SH.roundRect, rectRadius:0.13, fill:{ color:HEX.red }, line:{ color:HEX.red }, fontSize:9, bold:true, color:'FFFFFF', align:'center', valign:'middle', margin:0, objectName:nm('anim6') }));
}

// ===== 42 TAKE-HOME =====
{ const s = newSlide('takehome','CONTENT'); title(s, 'Take-home messages');
  const M = [['UPF and health','Trials and an umbrella review link UPF to higher intake, weight gain and 32 of 45 outcomes — though most observational GRADE is low.','strong',HEX.green],
             ['Food addiction','Not in DSM-5-TR or ICD-11; no identified agent; heterogeneous imaging. Unresolved, but not refuted.','unresolved',HEX.red],
             ['Stay open and testable','Energy density, eating rate and protein leverage explain much; addiction may fit an undefined subgroup.','limited',HEX.amber],
             ['Act now','Labels, taxes, marketing and school limits shift purchases, recipes and ad exposure — without settling the debate.','interm',HEX.teal]];
  M.forEach(([h,d,st,c],i)=>{ const y=1.45+i*1.22;
    card(s, 0.6, y, 7.75, 1.08, 'FFFFFF', i+1);
    s.addText(String(i+1), { x:0.78, y:y+0.24, w:0.6, h:0.6, shape:SH.ellipse, fill:{ color:c }, line:{ color:c }, fontFace:'Cambria', fontSize:20, bold:true, color:'FFFFFF', align:'center', valign:'middle', margin:0, objectName:nm('anim'+(i+1)) });
    text(s, h, { x:1.55, y:y+0.08, w:4.0, h:0.38, fontSize:16, bold:true, color:c, anim:i+1 });
    chip(s, st, 6.15, y+0.1, 2.05, i+1);
    text(s, d, { x:1.55, y:y+0.46, w:6.65, h:0.58, fontSize:12.5, anim:i+1 }); });
  s.addShape(SH.roundRect, { x:8.6, y:1.45, w:4.1, h:4.74, rectRadius:0.08, fill:{ color:HEX.navy }, line:{ color:HEX.navy }, shadow:shadow(), objectName:nm('anim5') });
  text(s, '5', { x:8.85, y:1.6, w:0.6, h:0.6, fontFace:'Cambria', fontSize:30, bold:true, color:HEX.ice, valign:'middle', anim:5 });
  text(s, 'Priorities for Iran', { x:9.45, y:1.6, w:3.1, h:0.6, fontFace:'Cambria', fontSize:19, bold:true, color:'FFFFFF', valign:'middle', anim:5 });
  [['database','Regular national monitoring of UPF in the household basket and diets'],['tag','Strengthen and evaluate the existing labeling system'],['school','Protect the school food environment']].forEach(([ic,t],i)=>{ const y=2.45+i*1.05;
    iconCircle(s, ic, 8.85, y, 0.66, HEX.red, 6+i);
    text(s, t, { x:9.65, y:y-0.1, w:2.9, h:0.86, fontSize:13.5, color:'FFFFFF', valign:'middle', anim:6+i }); });
  text(s, 'Priorities for evaluation — not recommendations based on Iranian evidence.', { x:8.85, y:5.55, w:3.65, h:0.55, fontSize:11.5, italic:true, color:HEX.ice, anim:8 });
  card(s, 0.6, 6.3, 12.1, 0.55, HEX.paleTeal, 9, 'CFE3E7');
  text(s, [{ text:'Answer to the guiding question: ', options:{ bold:true, color:HEX.teal } }, { text:'no — evidence-based action on ultra-processed foods need not wait for the addiction debate to end.' }], { x:0.8, y:6.3, w:11.8, h:0.55, fontSize:14.5, valign:'middle', anim:9 });
}

// ===== 43 CLOSING =====
{ const s = newSlide('closing','CLOSING');
  s.addText('Thank you', { placeholder:'title' });
  text(s, 'Questions and discussion', { x:0.75, y:2.2, w:7, h:0.55, fontSize:24, color:HEX.ice, italic:true });
  text(s, 'Yasmin Ayatollahi  ·  School of Nutritional Sciences and Dietetics, Tehran University of Medical Sciences', { x:0.75, y:2.85, w:7.6, h:0.6, fontSize:13.5, color:'FFFFFF' });
  text(s, 'KEY READING', { x:0.75, y:3.75, w:4, h:0.3, fontSize:11.5, bold:true, color:HEX.ice, charSpacing:2 });
  const K = ['Hall KD et al. Cell Metab 2019 — inpatient UPF trial','Dicken SJ et al. Nat Med 2025 — UPF within dietary guidelines','Lane MM et al. BMJ 2024 — umbrella review','Gearhardt AN, DiFeliceantonio AG. BMJ 2023 — UPF as addictive substances','Ziauddeen H, Fletcher PC. Obes Rev 2013 — is food addiction valid?','Taillie LS et al. PLOS Med 2020 — Chile’s law'];
  text(s, K.map((t,i)=>({ text:t, options:{ bullet:true, breakLine:i<K.length-1 } })), { x:0.75, y:4.1, w:7.6, h:2.6, fontSize:13, color:'FFFFFF', paraSpaceAfter:4 });
  const oc = [[9.05,1.35,1.95,HEX.red,'industry'],[10.85,2.85,1.95,HEX.purple,'brain'],[9.05,4.35,1.95,HEX.green,'landmark']];
  oc.forEach(([x,y,d,c,ic],i)=>{ s.addShape(SH.octagon, { x, y, w:d, h:d, fill:{ color:c }, line:{ color:'FFFFFF', width:3 }, objectName:'coct'+i });
    s.addImage({ path:icon(ic,'w'), x:x+d*0.28, y:y+d*0.28, w:d*0.44, h:d*0.44, objectName:'cocti'+i, altText:ic }); });
  text(s, [{ text:'Back to roadmap', options:{ hyperlink:{ slide:2, tooltip:'Roadmap' }, color:HEX.ice } }], { x:10.9, y:0.45, w:1.9, h:0.35, fontSize:12, align:'right' });
}

// ===== 44 BACKUP: FOR/AGAINST =====
section('Backup');
{ const s = newSlide('backup1','CONTENT'); title(s, 'Backup: arguments for and against food addiction');
  const R = [['Addictive agent','Nutrient combinations, delivery speed and food matrix may raise reinforcing potential','No agent equivalent to a drug has been identified'],
    ['Neural evidence','Overlap in reward circuits and dopamine; DRD2/OPRM1 markers; supra-additive fat + carb response','Human imaging heterogeneous, sometimes contradictory'],
    ['Withdrawal','ProWS: self-reported symptoms after cutting down — preliminary evidence','Not separable from energy deficit or dietary restriction'],
    ['Terminology','“Food addiction” highlights product properties and the food environment','“Eating addiction” is more accurate: the behavior is addictive-like'],
    ['Diagnostic status','No diagnosis ≠ no phenomenon; gambling entered the classifications','Evidence insufficient; absent from DSM-5-TR and ICD-11'],
    ['Policy implication','Can support food-environment interventions','Premature as an independent basis for policy'],
    ['Stigma','Can reduce blame and stigma (Latner et al. 2014)','Belief may prompt restriction and adverse eating (Ruddock and Hardman 2017)']];
  const H = [['Domain',HEX.navy],['Supportive view',HEX.purple],['Critical view',HEX.red]].map(([t,c])=>({ text:t, options:{ bold:true, color:'FFFFFF', fill:{ color:c }, fontSize:13, valign:'middle' } }));
  const body = R.map((r,i)=> r.map((t,j)=>({ text:t, options:{ fontSize:12.5, bold:j===0, color: j===0?HEX.navy:HEX.ink, fill:{ color: i%2?'F6F8FA':'FFFFFF' } } })));
  s.addTable([H, ...body], { x:0.6, y:1.4, w:12.1, colW:[2.3,4.9,4.9], rowH:[0.42,0.66,0.66,0.66,0.66,0.66,0.6,0.6], fontFace:'Calibri', border:{ type:'solid', color:'DCE2E8', pt:0.75 }, margin:[3,7,3,7], valign:'middle', objectName:'proconTable' });
  source(s, 'Table 4 of the seminar. Sources: Gearhardt and Schulte 2021; Gearhardt and DiFeliceantonio 2023; Ziauddeen and Fletcher 2013; Ziauddeen et al. 2012; Hebebrand et al. 2014; Schulte et al. 2018.');
}

// ===== 45 BACKUP: KEY NUMBERS =====
{ const s = newSlide('backup2','CONTENT'); title(s, 'Backup: key numbers at a glance');
  const N = [['58%','UPF share of energy, US adults','Steele 2023',HEX.red],['54% · 66%','UK adults · adolescents','Rauber 2020',HEX.red],['13.4%','Tehran adults, median (TLGS)','Moslehi 2024',HEX.amber],['14% · 12%','YFAS food addiction: adults · children','Gearhardt 2023',HEX.purple],['11.1% · 24.9%','healthy weight · overweight or obesity','Pursey 2014',HEX.purple],['92.4%','BED meeting dependence criteria (n = 79)','Cassin 2007',HEX.purple],
             ['+508','kcal/day on the UPF diet','Hall 2019',HEX.red],['48 vs 31','kcal/min eating rate, UPF vs minimal','Hall 2019',HEX.red],['−2.06% · −1.05%','weight change, minimal vs UPF diet','Dicken 2025',HEX.green],['32 / 45','outcomes with direct associations','Lane 2024',HEX.navy],['0 · 4 · 22 · 19','GRADE high · moderate · low · very low','Lane 2024',HEX.navy],['HR 1.12','cancer per +10% UPF energy','Fiolet 2018',HEX.navy],
             ['HR 1.28','prediabetes, top vs bottom tertile','Moslehi 2024',HEX.amber],['−23.7%','regulated beverage purchases, year 1','Taillie 2020',HEX.green],['−36.8%','sugar purchased, regulated products','Taillie 2024',HEX.green],['−7.6%','taxed beverages, two-year mean','Colchero 2017',HEX.teal],['−33.8 pp','UK drinks above 5 g/100 mL','Scarborough 2020',HEX.teal],['−44% · −58%','TV ad exposure, preschool · teens','Dillman Carpentier 2020',HEX.teal]];
  N.forEach(([n,l,src,c],i)=>{ const x=0.6+(i%6)*2.03, y=1.42+Math.floor(i/6)*1.72;
    card(s, x, y, 1.92, 1.58, 'FFFFFF');
    text(s, n, { x:x+0.06, y:y+0.1, w:1.8, h:0.55, fontFace:'Cambria', fontSize: n.length>11 ? 14 : (n.length>7 ? 17 : 22), bold:true, color:c, align:'center', valign:'middle' });
    text(s, l, { x:x+0.1, y:y+0.68, w:1.72, h:0.55, fontSize:11, align:'center' });
    text(s, src, { x:x+0.1, y:y+1.24, w:1.72, h:0.26, fontSize:10, italic:true, color:'7A8591', align:'center' }); });
  source(s, 'Descriptive figures from different designs and populations: compare with care.');
}

module.exports = B;
