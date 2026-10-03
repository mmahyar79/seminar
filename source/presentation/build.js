const { applyTheme } = require('/root/.claude/skills/synced/458ec37a-3550-4e47-9eb1-983528050156_0d32c606-1c87-4622-8b07-557bc5580eda/pptx/scripts/apply_theme.js');
const B = require('./build_part4.js');
(async () => {
  const out = process.argv[2] || 'deck.pptx';
  await B.pres.writeFile({ fileName: out });
  await applyTheme(out, B.THEME);
  require('fs').writeFileSync('slide_keys.json', JSON.stringify(B.SLIDE_KEYS));
  console.log('slides', B.SLIDE_KEYS.length, B.SLIDE_KEYS.join(','));
})().catch(e => { console.error(e); process.exit(1); });
