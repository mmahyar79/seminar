const fs = require('fs');
const docx = require('/opt/node22/lib/node_modules/docx');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, ShadingType, BorderStyle,
        Header, Footer, PageNumber, LevelFormat, PageBreak, VerticalAlign, TableLayoutType } = docx;
const { plan, fa, mmss, S } = require('./timing.js');
const P = plan();

const BODY = 'B Nazanin', HEAD = 'B Titr', LAT = 'Times New Roman';
const NAVY = '1F3A5F', RED = 'B3393C', TEAL = '2A7A8C', GREY = '6B7682', AMBER = '9A5E0B', PURPLE = '6A4C93';
const SZ = 26; // 13 pt

function font(cs){ return { ascii: LAT, hAnsi: LAT, cs, eastAsia: cs }; }
// split text into runs; [cues] grey italic, Latin segments keep LTR font
function runs(text, o){
  o = o || {};
  const out = [];
  text.split(/(\[[^\]]+\])/).forEach(part => {
    if (!part) return;
    const cue = /^\[.*\]$/.test(part);
    out.push(new TextRun({ text: part, rightToLeft: true, font: font(o.font || BODY), size: o.size || SZ, sizeComplexScript: o.size || SZ,
      bold: !!o.bold, boldComplexScript: !!o.bold, italics: cue || !!o.italic, italicsComplexScript: cue || !!o.italic,
      color: cue ? '7A8591' : (o.color || '1B1F24') }));
  });
  return out;
}
function para(text, o){
  o = o || {};
  return new Paragraph({ bidirectional: true, alignment: o.align || AlignmentType.BOTH, spacing: { before: o.before || 0, after: o.after === undefined ? 120 : o.after, line: o.line || 312 },
    indent: o.indent, keepNext: o.keepNext, numbering: o.numbering, shading: o.shading, border: o.border, children: Array.isArray(text) ? text : runs(text, o) });
}
function h1(text){ return new Paragraph({ bidirectional: true, heading: docx.HeadingLevel.HEADING_1, alignment: AlignmentType.RIGHT, spacing: { before: 240, after: 160 }, keepNext: true,
  border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: NAVY, space: 4 } }, children: runs(text, { font: HEAD, size: 32, color: NAVY, bold: true }) }); }
function h2(text, color){ return new Paragraph({ bidirectional: true, heading: docx.HeadingLevel.HEADING_2, alignment: AlignmentType.RIGHT, spacing: { before: 200, after: 80 }, keepNext: true,
  children: runs(text, { font: HEAD, size: 26, color: color || TEAL, bold: true }) }); }
const border = { style: BorderStyle.SINGLE, size: 4, color: 'C9D2DC' };
const borders = { top: border, bottom: border, left: border, right: border };
function cell(text, w, o){
  o = o || {};
  return new TableCell({ width: { size: w, type: WidthType.DXA }, borders, verticalAlign: VerticalAlign.CENTER,
    shading: o.fill ? { fill: o.fill, type: ShadingType.CLEAR, color: 'auto' } : undefined, margins: { top: o.tight ? 20 : 60, bottom: o.tight ? 20 : 60, left: 100, right: 100 },
    children: [ new Paragraph({ bidirectional: !o.ltr, alignment: o.align || (o.ltr ? AlignmentType.LEFT : AlignmentType.RIGHT), spacing: { after: 0, line: o.tight ? 228 : 276 },
      children: o.ltr ? [ new TextRun({ text, font: font(BODY), size: o.size ? o.size - 1 : 20, bold: !!o.bold, color: o.color || '1B1F24' }) ] : runs(text, { size: o.size || 22, bold: o.bold, color: o.color, font: o.font }) }) ] });
}
function table(widths, header, rows, o){
  o = o || {};
  const total = widths.reduce((a, b) => a + b, 0);
  const hdr = new TableRow({ tableHeader: true, children: header.map((t, i) => cell(t, widths[i], { fill: NAVY, color: 'FFFFFF', bold: true, size: 22, ltr: o.ltrHead && o.ltrHead[i] })) });
  const body = rows.map((r, k) => new TableRow({ cantSplit: true, children: r.map((t, i) => cell(t, widths[i], { fill: k % 2 ? 'F3F6F9' : undefined, ltr: o.ltr && o.ltr[i], bold: o.bold && o.bold[i], color: o.color && o.color[i], align: o.align && o.align[i], tight: o.tight, size: o.size })) }));
  return new Table({ width: { size: total, type: WidthType.DXA }, columnWidths: widths, visuallyRightToLeft: true, layout: TableLayoutType.FIXED, rows: [hdr, ...body] });
}

const C = [];
// ---------- cover ----------
C.push(para('دانشگاه علوم پزشکی تهران', { align: AlignmentType.CENTER, font: HEAD, size: 30, color: NAVY, before: 1200 }));
C.push(para('دانشکده‌ی علوم تغذیه و رژیم‌شناسی', { align: AlignmentType.CENTER, size: 28, color: NAVY, after: 600 }));
C.push(para('متن ارائه‌ی شفاهی سمینار', { align: AlignmentType.CENTER, font: HEAD, size: 30, color: TEAL, after: 200 }));
C.push(para('غذاهای فوق‌فرآوری‌شده و رفتارهای غذایی اعتیادگونه', { align: AlignmentType.CENTER, font: HEAD, size: 40, color: RED, after: 120 }));
C.push(para('از سازوکارهای عصبی‌زیستی تا سیاست‌گذاری تغذیه‌ی جامعه', { align: AlignmentType.CENTER, size: 30, color: NAVY, after: 600 }));
C.push(para('همراه با پیوست پرسش‌های احتمالی داوران و مخاطبان، توضیحات تکمیلی، واژه‌نامه و اعداد کلیدی', { align: AlignmentType.CENTER, size: 26, color: GREY, italic: true, after: 900 }));
C.push(para('ارائه‌دهنده: یاسمین آیت‌اللهی', { align: AlignmentType.CENTER, size: 28, bold: true, after: 80 }));
C.push(para('استاد درس: جناب آقای دکتر پورآرام', { align: AlignmentType.CENTER, size: 28, after: 80 }));
C.push(para('پاییز ۱۴۰۵', { align: AlignmentType.CENTER, size: 28, after: 80 }));
const total = P.filter(s => !s.backup).pop().cum;
C.push(para('مدت ارائه: حدود ' + fa(Math.round(total / 60)) + ' دقیقه · ' + fa(P.filter(s => !s.backup).length) + ' اسلاید اصلی + ' + fa(P.filter(s => s.backup).length) + ' اسلاید پشتیبان', { align: AlignmentType.CENTER, size: 24, color: GREY }));
C.push(new Paragraph({ children: [new PageBreak()] }));

// ---------- how to use ----------
C.push(h1('راهنمای استفاده و نکات اجرایی'));
C.push(para('این متن برای اجرای شفاهی پاورپوینت انگلیسی سمینار نوشته شده است. اسلایدها به انگلیسی‌اند و این متن، روایت فارسی آن‌هاست، نه ترجمه‌ی تحت‌اللفظی. همین متن در بخش یادداشت‌های سخنران (Notes) هر اسلاید هم قرار داده شده است. عبارت‌های داخل [کروشه] راهنمای اجرا هستند و خوانده نمی‌شوند.'));
const cp = n => mmss(P[n - 1].cum);
const tips = S.TIPS.slice();
tips[1] = 'نقاط کنترل زمان: پایان اسلاید ۱۱ حدود ' + cp(11) + '؛ پایان اسلاید ۲۳ حدود ' + cp(23) + '؛ پایان اسلاید ۳۱ حدود ' + cp(31) + '؛ پایان اسلاید ۴۲ حدود ' + cp(42) + ' (دقیقه:ثانیه).';
tips.forEach(t => C.push(para(t, { numbering: { reference: 'bul', level: 0 }, after: 80 })));

// ---------- timing table ----------
C.push(new Paragraph({ children: [new PageBreak()] }));
C.push(h1('جدول زمان‌بندی اسلایدها'));
C.push(table([700, 5600, 1400, 1400], ['#', 'عنوان اسلاید', 'مدت', 'زمان تجمعی'],
  P.map(s => [fa(s.n), s.en, s.backup ? 'پشتیبان' : mmss(s.dur), s.backup ? '—' : mmss(s.cum)]),
  { ltr: [false, true, false, false], align: [AlignmentType.CENTER, AlignmentType.LEFT, AlignmentType.CENTER, AlignmentType.CENTER], tight: true, size: 20 }));

// ---------- script ----------
C.push(h1('متن کامل ارائه، اسلاید به اسلاید'));
const SECTION_FA = { div1:'بخش ۱ · غذاهای فوق‌فرآوری‌شده', div2:'بخش ۲ · اعتیاد غذایی', div3:'بخش ۳ · سازوکارها', div4:'بخش ۴ · شواهد انسانی', div5:'بخش ۵ · مناظره', div6:'بخش ۶ · سیاست‌گذاری', div7:'بخش ۷ · گروه‌های آسیب‌پذیر و بالین' };
P.forEach(s => {
  if (s.backup && s.key === 'backup1') C.push(h1('اسلایدهای پشتیبان'));
  if (s.key === 'limits_gaps') C.push(para('بخش ۸ · جمع‌بندی', { font: HEAD, size: 28, color: 'FFFFFF', align: AlignmentType.CENTER, shading: { fill: RED, type: ShadingType.CLEAR, color: 'auto' }, before: 240, after: 120, keepNext: true }));
  if (SECTION_FA[s.key]) { C.push(para(SECTION_FA[s.key], { font: HEAD, size: 28, color: 'FFFFFF', align: AlignmentType.CENTER, shading: { fill: NAVY, type: ShadingType.CLEAR, color: 'auto' }, before: 240, after: 120, keepNext: true })); }
  C.push(new Paragraph({ bidirectional: true, alignment: AlignmentType.RIGHT, spacing: { before: 160, after: 40 }, keepNext: true, children: [
    ...runs('اسلاید ' + fa(s.n) + '  ', { font: HEAD, size: 24, color: RED, bold: true }),
    new TextRun({ text: '\u200E' + s.en + '\u200E', font: font(BODY), size: 22, bold: true, color: NAVY }) ] }));
  C.push(para(s.backup ? 'فقط در صورت پرسش' : ('مدت پیشنهادی ' + mmss(s.dur) + '  ·  زمان تجمعی ' + mmss(s.cum)), { size: 20, color: GREY, after: 60, keepNext: true }));
  s.text.forEach((t, i) => C.push(para(t, { after: i === s.text.length - 1 ? 160 : 100 })));
});
C.push(new Paragraph({ children: [new PageBreak()] }));

// ---------- appendix 1: Q&A ----------
C.push(h1('پیوست ۱ · پرسش‌های احتمالی داوران و مخاطبان، با پاسخ پیشنهادی'));
C.push(para('پاسخ‌ها کوتاه و قابل گفتن در یک تا دو دقیقه نوشته شده‌اند. در پاسخ به هر پرسش، ابتدا یک جمله‌ی مستقیم بگویید، سپس شاهد را بیاورید و در پایان به پیام اصلی سمینار، یعنی تفکیک ادعاها، برگردید. هر جا لازم شد، از پیوند «Back to roadmap» یا اسلایدهای پشتیبان ۴۴ و ۴۵ استفاده کنید.', { color: GREY }));
let qn = 0;
S.QA.forEach(g => {
  C.push(h2(g.cat, PURPLE));
  g.items.forEach(it => {
    qn++;
    C.push(para([...runs('پرسش ' + fa(qn) + ': ', { bold: true, color: RED }), ...runs(it.q, { bold: true, color: NAVY })], { after: 40, keepNext: true }));
    C.push(para([...runs('پاسخ: ', { bold: true, color: TEAL }), ...runs(it.a)], { after: 160, indent: { right: 240 } }));
  });
});

// ---------- appendix 2: extra explanations ----------
C.push(h1('پیوست ۲ · توضیحات تکمیلی برای وقتی که توضیح بیشتر خواسته شود'));
S.EXTRA.forEach(e => { C.push(h2(e.t)); e.p.forEach(t => C.push(para(t))); });

// ---------- appendix 3: glossary ----------
C.push(h1('پیوست ۳ · واژه‌نامه'));
C.push(table([2600, 2000, 4500], ['اصطلاح انگلیسی', 'معادل فارسی', 'توضیح'], S.GLOSS, { ltr: [true, false, false], bold: [true, true, false] }));

// ---------- appendix 4: numbers ----------
C.push(h1('پیوست ۴ · اعداد کلیدی برای مرور سریع'));
C.push(table([2300, 4900, 1900], ['عدد', 'معنا', 'منبع'], S.NUMS, { ltr: [false, false, true], bold: [true, false, false], color: [RED, undefined, undefined] }));

// ---------- appendix 5: names ----------
C.push(h1('پیوست ۵ · تلفظ نام پژوهشگران'));
const half = Math.ceil(S.NAMES.length / 2);
C.push(table([2400, 2150, 2400, 2150], ['نام', 'تلفظ', 'نام', 'تلفظ'],
  Array.from({ length: half }, (_, i) => { const a = S.NAMES[i], b = S.NAMES[i + half] || ['', '']; return [a[0], a[1], b[0], b[1]]; }),
  { ltr: [true, false, true, false] }));

const doc = new Document({
  creator: 'Yasmin Ayatollahi', title: 'متن ارائه‌ی سمینار غذاهای فوق‌فرآوری‌شده و رفتارهای غذایی اعتیادگونه',
  styles: { default: { document: { run: { font: font(BODY), size: SZ, sizeComplexScript: SZ, rightToLeft: true } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: font(HEAD), size: 32, sizeComplexScript: 32, bold: true, color: NAVY }, paragraph: { outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: font(HEAD), size: 26, sizeComplexScript: 26, bold: true, color: TEAL }, paragraph: { outlineLevel: 1 } } ] },
  numbering: { config: [ { reference: 'bul', levels: [ { level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.RIGHT, style: { paragraph: { indent: { right: 360, hanging: 260 } } } } ] } ] },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1300, bottom: 1300, left: 1250, right: 1250 } }, bidi: true },
    headers: { default: new Header({ children: [ para('متن ارائه · غذاهای فوق‌فرآوری‌شده و رفتارهای غذایی اعتیادگونه', { size: 18, color: GREY, align: AlignmentType.LEFT, after: 0 }) ] }) },
    footers: { default: new Footer({ children: [ new Paragraph({ bidirectional: true, alignment: AlignmentType.CENTER, children: [ new TextRun({ children: [PageNumber.CURRENT], font: font(BODY), size: 20, color: GREY }) ] }) ] }) },
    children: C }],
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync(process.argv[2] || 'script_fa.docx', b); console.log('ok', C.length, 'blocks; total', mmss(total)); });
