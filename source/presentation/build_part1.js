const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');
const D = __dirname;
const NOTES = fs.existsSync(D+'/notes_fa.json') ? JSON.parse(fs.readFileSync(D+'/notes_fa.json','utf8')) : {};

const THEME = { name: 'UPF Seminar', headFontFace: 'Cambria', bodyFontFace: 'Calibri',
  colors: { dk1:'1B1F24', lt1:'FFFFFF', dk2:'1F3A5F', lt2:'EEF2F6', accent1:'B3393C', accent2:'2A7A8C', accent3:'D88A1F',
            accent4:'3B7D5A', accent5:'6A4C93', accent6:'5B6B8C', hlink:'2A7A8C', folHlink:'6A4C93' } };
const HEX = { navy:'1F3A5F', red:'B3393C', teal:'2A7A8C', amber:'D88A1F', green:'3B7D5A', purple:'6A4C93', slate:'5B6B8C',
              ink:'1B1F24', grey:'5F6B76', light:'EEF2F6', line:'D5DCE3', ice:'CADCFC', white:'FFFFFF', paleRed:'F8E9E9',
              paleTeal:'E6F1F3', paleAmber:'FBF0DD', paleGreen:'E8F2EC', palePurple:'EFEAF6', paleNavy:'E8EEF5' };

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';
pres.author = 'Yasmin Ayatollahi';
pres.company = 'Tehran University of Medical Sciences';
pres.title = 'Ultra-Processed Foods and Addictive-Like Eating Behaviors';
pres.subject = 'Seminar - School of Nutritional Sciences and Dietetics';
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;
const SH = pres.ShapeType;
const W = 13.333, H = 7.5;

// ---------- layouts ----------
pres.defineSlideMaster({ title: 'TITLE', background: { path: D+'/bg_title.png' },
  objects: [
    { placeholder: { options: { name:'title', type:'title', x:0.75, y:1.85, w:7.9, h:1.75, fontFace:'Cambria', fontSize:36, bold:true, color:C.background1, align:'left', valign:'bottom', margin:0 }, text:'' } },
    { placeholder: { options: { name:'body', type:'body', x:0.75, y:3.8, w:7.6, h:0.9, fontFace:'Calibri', fontSize:21, color:'CADCFC', align:'left', valign:'top', margin:0 }, text:'' } },
  ]});
pres.defineSlideMaster({ title: 'SECTION', background: { path: D+'/bg_section.png' },
  objects: [
    { placeholder: { options: { name:'title', type:'title', x:3.05, y:2.55, w:8.3, h:1.1, fontFace:'Cambria', fontSize:42, bold:true, color:C.background1, align:'left', valign:'middle', margin:0 }, text:'' } },
    { placeholder: { options: { name:'body', type:'body', x:3.05, y:3.7, w:8.3, h:0.8, fontFace:'Calibri', fontSize:21, italic:true, color:'CADCFC', align:'left', valign:'top', margin:0 }, text:'' } },
  ]});
pres.defineSlideMaster({ title: 'CONTENT', background: { color: C.background1 },
  objects: [
    { placeholder: { options: { name:'title', type:'title', x:0.6, y:0.32, w:12.1, h:0.9, fontFace:'Cambria', fontSize:32, bold:true, color:C.text2, align:'left', valign:'middle', margin:0 }, text:'' } },
    { text: { text:'Ultra-Processed Foods and Addictive-Like Eating  |  Seminar, Autumn 2026', options: { x:0.6, y:7.02, w:8.5, h:0.3, fontFace:'Calibri', fontSize:10, color:'7A8591', margin:0 } } },
  ],
  slideNumber: { x:12.2, y:7.0, w:0.55, h:0.32, fontFace:'Calibri', fontSize:11, color:'7A8591', align:'right' } });
pres.defineSlideMaster({ title: 'CLOSING', background: { path: D+'/bg_title.png' },
  objects: [
    { placeholder: { options: { name:'title', type:'title', x:0.75, y:1.0, w:7.5, h:1.2, fontFace:'Cambria', fontSize:44, bold:true, color:C.background1, align:'left', valign:'middle', margin:0 }, text:'' } },
  ]});

// ---------- helpers ----------
let SLIDE_KEYS = [];
let currentSection = null;
function section(title){ pres.addSection({ title }); currentSection = title; }
function newSlide(key, master){
  const s = pres.addSlide({ masterName: master, sectionTitle: currentSection });
  SLIDE_KEYS.push(key);
  if (NOTES[key]) s.addNotes(NOTES[key]);
  return s;
}
function icon(name, color){ return D+'/icons/'+name+'_'+color+'.png'; }
let OBJ = 0;
function nm(prefix){ OBJ++; return prefix+'_'+OBJ; }
function shadow(){ return { type:'outer', color:'1B1F24', opacity:0.14, blur:9, offset:2.5, angle:90 }; }
function iconCircle(s, ic, x, y, d, fill, anim, iconColor){
  const n = anim ? 'anim'+anim : 'ic';
  s.addShape(SH.ellipse, { x, y, w:d, h:d, fill:{ color:fill }, line:{ color:fill, width:0.5 }, objectName: nm(n) });
  const p = d*0.27;
  s.addImage({ path: icon(ic, iconColor||'w'), x:x+p, y:y+p, w:d-2*p, h:d-2*p, objectName: nm(n), altText: ic+' icon' });
}
function card(s, x, y, w, h, fill, anim, lineColor){
  s.addShape(SH.roundRect, { x, y, w, h, rectRadius:0.08, fill:{ color: fill||C.background1 }, line:{ color: lineColor||'E1E6EC', width:0.75 }, shadow: shadow(), objectName: nm(anim?'anim'+anim:'card') });
}
function text(s, t, o){ const opts = Object.assign({ isTextBox:true, margin:0, fontFace:'Calibri', fontSize:14, color:HEX.ink, valign:'top' }, o); if (opts.anim){ opts.objectName = nm('anim'+opts.anim); delete opts.anim; } return s.addText(t, opts); }
const STATUS = { strong:['RELATIVELY STRONG', HEX.green], interm:['STRONG (INTERMEDIATE)', HEX.teal], limited:['LIMITED', HEX.amber], unresolved:['UNRESOLVED', HEX.red], moderate:['MODERATE', HEX.teal], hyp:['HYPOTHESIS-GENERATING', HEX.purple] };
function chip(s, kind, x, y, w, anim){
  const [label, color] = STATUS[kind];
  s.addText(label, { x, y, w, h:0.32, shape:SH.roundRect, rectRadius:0.16, fill:{ color }, line:{ color, width:0.5 }, fontFace:'Calibri', fontSize: label.length>18 ? 9.5 : 10.5, bold:true, color:'FFFFFF', align:'center', valign:'middle', margin:0, charSpacing: label.length>18 ? 0 : 0.5, isTextBox:false, objectName: nm(anim?'anim'+anim:'chip') });
}
function meter(s, n, x, y, color, anim){
  for (let i=0;i<5;i++) s.addShape(SH.ellipse, { x:x+i*0.27, y, w:0.18, h:0.18, fill:{ color: i<n ? color : 'DDE3E9' }, line:{ color: i<n ? color : 'DDE3E9', width:0.5 }, objectName: nm(anim?'anim'+anim:'meter') });
}
function source(s, t){ text(s, t, { x:0.6, y:6.62, w:12.1, h:0.32, fontSize:10, color:'7A8591', italic:true, valign:'bottom' }); }
function title(s, t){ s.addText(t, { placeholder:'title' }); }
module.exports = { pres, THEME, HEX, C, SH, W, H, D, NOTES, SLIDE_KEYS, section, newSlide, icon, nm, shadow, iconCircle, card, text, chip, meter, source, title, STATUS };
