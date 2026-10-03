// Shared timing: duration per slide from spoken word count (~128 words/min), rounded to 5 s.
const S = require('./script_fa.js');
const WPM = 128;
const fa = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const mmss = s => fa(Math.floor(s / 60)) + ':' + fa(String(s % 60).padStart(2, '0'));
const words = s => s.text.join(' ').replace(/\[[^\]]*\]/g, '').split(/\s+/).filter(Boolean).length;
function plan(){
  let cum = 0;
  return S.SLIDES.map((s, i) => {
    let dur = 0;
    if (!s.backup){
      if (s.key.startsWith('div')) dur = 10;
      else dur = Math.max(20, Math.round(words(s) * 60 / WPM / 5) * 5);
    }
    cum += dur;
    return Object.assign({}, s, { n: i + 1, dur, cum, words: words(s) });
  });
}
module.exports = { plan, fa, mmss, S };
if (require.main === module){
  const P = plan(); const notes = {};
  P.forEach(s => { notes[s.key] = (s.backup ? 'اسلاید پشتیبان (فقط در صورت پرسش)' : 'زمان پیشنهادی: ' + mmss(s.dur) + '   |   زمان تجمعی: ' + mmss(s.cum)) + '\n\n' + s.text.join('\n\n'); });
  require('fs').writeFileSync(__dirname + '/notes_fa.json', JSON.stringify(notes, null, 1));
  const last = P.filter(s => !s.backup).pop();
  console.log('total', (last.cum / 60).toFixed(1), 'min;', P.map(s => s.n + ':' + s.dur).join(' '));
}
