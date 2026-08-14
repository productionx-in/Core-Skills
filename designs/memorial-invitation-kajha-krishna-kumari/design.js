/* Memorial invitation + photo frame creative generator
 * Edit CONFIG below, then run:  node design.js
 */

const CONFIG = {
  // ---- EDIT THESE -------------------------------------------------------
  relationTe: 'మా తల్లి గారైన',        // 'మా అమ్మమ్మ గారైన' / 'మా నాన్నమ్మ గారైన' etc.
  relationEn: 'Our beloved mother',
  honorificTe: 'శ్రీమతి',
  nameTe: 'కాజ఼ా కృష్ణ కుమారి',
  nameSuffixTe: 'గారు',
  honorificEn: 'Smt.',
  nameEn: 'Kajha Krishna Kumari',
  passedOnTe: 'ది 10-08-2026 సోమవారం',
  passedOnPlainTe: '10-08-2026 సోమవారం',
  passedOnEn: 'Monday, 10 August 2026',
  venueTe: ['కార్యస్థలం:', 'భారత్ సేవాశ్రమ్ సంఘ్,', 'లోయర్ ట్యాంక్ బండ్,', 'హైదరాబాద్.'],
  venueEn: ['Venue:', 'Bharat Sevashram Sangha,', 'Lower Tank Bund,', 'Hyderabad.'],
  fromGroupsTe: [['కుమార్తెలు', 'మీరా, మేధ'], ['అల్లుళ్లు', 'హేమంత్, హర్ష']],
  fromGroupsEn: [['Daughters', 'Meera, Medha'], ['Sons-in-law', 'Hemanth, Harsha']],
  fromLabelTe: 'ఇట్లు',
  fromLabelEn: 'With heavy hearts,',
  // Leave null to auto-detect: any file named photo.* next to this script is
  // picked up automatically. Set a filename here to override.
  photo: null,
  // -----------------------------------------------------------------------
};

const SCHEDULE_TE = [
  { d: '19-08-2026', wd: 'బుధవారం', r: 'దశాహం (ధర్మోదకాలు, తిలోదకాలు)', hi: false },
  { d: '20-08-2026', wd: 'గురువారం', r: 'షోడశం.', hi: false },
  { d: '21-08-2026', wd: 'శుక్రవారం', r: 'సపిండీకరణం, సమారాధనలు', hi: true },
];

const SCHEDULE_EN = [
  { d: '19 Aug 2026', wd: 'Wednesday', r: 'Dasaha — tenth-day rites', hi: false },
  { d: '20 Aug 2026', wd: 'Thursday', r: 'Shodasa', hi: false },
  { d: '21 Aug 2026', wd: 'Friday', r: 'Sapindikaranam & Samaradhana', hi: true },
];

/* ------------------------------ shared CSS ------------------------------ */

const FONTS = `
@font-face{font-family:'NST';src:url('fonts/noto-serif-telugu-telugu-400-normal.woff2')format('woff2');font-weight:400}
@font-face{font-family:'NST';src:url('fonts/noto-serif-telugu-telugu-500-normal.woff2')format('woff2');font-weight:500}
@font-face{font-family:'NST';src:url('fonts/noto-serif-telugu-telugu-600-normal.woff2')format('woff2');font-weight:600}
@font-face{font-family:'NST';src:url('fonts/noto-serif-telugu-telugu-700-normal.woff2')format('woff2');font-weight:700}
@font-face{font-family:'Cormorant';src:url('fonts/cormorant-garamond-latin-400-normal.woff2')format('woff2');font-weight:400}
@font-face{font-family:'Cormorant';src:url('fonts/cormorant-garamond-latin-600-normal.woff2')format('woff2');font-weight:600}
@font-face{font-family:'Cormorant';src:url('fonts/cormorant-garamond-latin-700-normal.woff2')format('woff2');font-weight:700}
@font-face{font-family:'EBG';src:url('fonts/eb-garamond-latin-400-normal.woff2')format('woff2');font-weight:400}
@font-face{font-family:'EBG';src:url('fonts/eb-garamond-latin-500-normal.woff2')format('woff2');font-weight:500}
@font-face{font-family:'EBG';src:url('fonts/eb-garamond-latin-600-normal.woff2')format('woff2');font-weight:600}
`;

const BASE = `
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --ivory:#FAF6EE; --ivory-2:#F3ECDF;
  --gold:#B08A46; --gold-lt:#D8BC85; --gold-dk:#8A6A2F;
  --ink:#3B322B; --ink-soft:#5E5248;
  --maroon:#6E2230; --accent:#A32430;
}
body{background:#fff}
.card{position:relative;overflow:hidden;
  background:
    radial-gradient(120% 90% at 50% 0%, #FFFDF8 0%, var(--ivory) 46%, var(--ivory-2) 100%);
  color:var(--ink);-webkit-font-smoothing:antialiased}
/* paper grain */
.card::after{content:'';position:absolute;inset:0;pointer-events:none;opacity:.05;
  background-image:radial-gradient(circle at 1px 1px, #6b5533 1px, transparent 0);
  background-size:4px 4px}
.frame{position:absolute;border:1px solid var(--gold);}
.rule{height:1px;background:linear-gradient(90deg,transparent,var(--gold-lt) 18%,var(--gold) 50%,var(--gold-lt) 82%,transparent)}
.diamond{width:7px;height:7px;background:var(--gold);transform:rotate(45deg);flex:0 0 auto}
.orn{display:flex;align-items:center;justify-content:center;gap:12px}
.orn .rule{width:110px}
`;

/* ornamental corner spray — lotus + leaf, muted rose-gold */
function cornerSVG(size = 200) {
  return `<svg class="corner" width="${size}" height="${size}" viewBox="0 0 200 200" fill="none">
  <g stroke="#B08A46" stroke-width="1.6" stroke-linecap="round" fill="none" opacity=".85">
    <path d="M6 76 C 44 74, 74 44, 76 6"/>
    <path d="M6 96 C 54 92, 92 54, 96 6" opacity=".55"/>
    <path d="M22 108 C 40 104, 52 92, 58 74"/>
    <path d="M40 128 C 62 122, 80 104, 88 82"/>
  </g>
  <g fill="#C99C6B" opacity=".5">
    ${[[30,58,14,-38],[58,30,14,52],[46,46,12,8],[70,74,11,45],[26,92,10,-20],[92,26,10,70]]
      .map(([x,y,r,rot])=>`<g transform="translate(${x} ${y}) rotate(${rot})">
        ${[0,60,120,180,240,300].map(a=>`<ellipse cx="0" cy="${-r*0.55}" rx="${r*0.3}" ry="${r*0.55}" transform="rotate(${a})"/>`).join('')}
        <circle r="${r*0.22}" fill="#B08A46"/></g>`).join('')}
  </g>
  <g fill="#9AA87B" opacity=".55">
    ${[[16,120,16,60],[36,140,13,55],[120,16,16,-30],[140,36,13,-35],[64,100,12,20],[100,64,12,70]]
      .map(([x,y,l,rot])=>`<path transform="translate(${x} ${y}) rotate(${rot})"
        d="M0 0 C ${l*0.7} ${-l*0.5}, ${l*1.3} ${-l*0.2}, ${l*1.6} ${l*0.15}
           C ${l*1.1} ${l*0.6}, ${l*0.4} ${l*0.5}, 0 0 Z"/>`).join('')}
  </g>
</svg>`;
}

/* restrained L-bracket for corners that sit next to text */
function cornerBracket(size = 120) {
  return `<svg class="corner" width="${size}" height="${size}" viewBox="0 0 120 120" fill="none">
  <g stroke="#B08A46" stroke-width="1.6" stroke-linecap="round" opacity=".9">
    <path d="M4 62 L4 4 L62 4"/>
    <path d="M14 74 L14 14 L74 14" opacity=".45"/>
  </g>
  <g transform="translate(4 4)"><rect x="-4" y="-4" width="8" height="8"
     fill="#B08A46" transform="rotate(45)"/></g>
  <g fill="#C99C6B" opacity=".45" transform="translate(40 40) rotate(45)">
    ${[0,60,120,180,240,300].map(a=>`<ellipse cx="0" cy="-6" rx="3.2" ry="6" transform="rotate(${a})"/>`).join('')}
    <circle r="2.4" fill="#B08A46"/>
  </g>
</svg>`;
}

function photoBlock(cfg, w, h) {
  const inner = cfg.photo
    ? `<img src="${cfg.photo}" alt="">`
    : `<div class="ph">
         <svg viewBox="0 0 100 120" width="58%" fill="none" stroke="#B79E77" stroke-width="2.4" stroke-linecap="round">
           <circle cx="50" cy="40" r="21"/>
           <path d="M14 112 C 16 82, 32 68, 50 68 C 68 68, 84 82, 86 112"/>
         </svg>
         <span>PHOTO</span>
       </div>`;
  return `<div class="photo" style="--pw:${w}px;--ph:${h}px">
    ${cornerSVG(94)}${cornerSVG(94)}${cornerSVG(94)}${cornerSVG(94)}
    <div class="photo-in">${inner}</div>
  </div>`;
}

const PHOTO_CSS = `
.photo{position:relative;width:var(--pw);height:var(--ph);flex:0 0 auto}
.photo .corner{position:absolute;opacity:.9}
.photo .corner:nth-of-type(1){top:-26px;left:-26px}
.photo .corner:nth-of-type(2){top:-26px;right:-26px;transform:scaleX(-1)}
.photo .corner:nth-of-type(3){bottom:-26px;left:-26px;transform:scaleY(-1)}
.photo .corner:nth-of-type(4){bottom:-26px;right:-26px;transform:scale(-1)}
.photo-in{position:absolute;inset:0;padding:7px;border:1.5px solid var(--gold);
  background:linear-gradient(150deg,#E7D3A8,#B08A46 42%,#F0E2C2 58%,#9B7735);
  box-shadow:0 10px 30px rgba(90,64,28,.20)}
.photo-in>*{width:100%;height:100%;display:block;object-fit:cover;
  border:1px solid rgba(255,255,255,.5)}
.ph{background:linear-gradient(160deg,#EDE3D2,#DFD2BB);display:flex;
  flex-direction:column;align-items:center;justify-content:center;gap:10px}
.ph span{font:500 15px/1 'EBG',serif;letter-spacing:.34em;color:#9A8464}
`;

/* ----------------------------- invitation ------------------------------- */

function invite(lang) {
  const te = lang === 'te';
  const c = CONFIG;
  const sched = te ? SCHEDULE_TE : SCHEDULE_EN;
  const F = te ? `'NST',serif` : `'Cormorant','EBG',serif`;
  const FB = te ? `'NST',serif` : `'EBG',serif`;

  const rows = sched.map(s => `
    <div class="row${s.hi ? ' hi' : ''}">
      <span class="rd">${te ? 'ది : ' : ''}${s.d}${te ? ' ' : ', '}${s.wd}</span>
      <span class="rr">${s.r}</span>
    </div>`).join('');

  const venue = (te ? c.venueTe : c.venueEn);
  const groups = (te ? c.fromGroupsTe : c.fromGroupsEn);

  return `<!doctype html><html><head><meta charset="utf-8"><style>
${FONTS}${BASE}${PHOTO_CSS}
.card{width:1080px;height:1350px;padding:66px 74px 58px;display:flex;flex-direction:column}
.b1{inset:26px;border-width:2.5px}
.b2{inset:38px;border-color:var(--gold-lt)}
.b3{inset:44px;border-color:var(--gold-lt);opacity:.6}
.sheetcorner{position:absolute;z-index:2}
.sheetcorner:nth-of-type(1){top:44px;left:44px}
.sheetcorner:nth-of-type(2){top:44px;right:44px;transform:scaleX(-1)}
.sheetcorner:nth-of-type(3){bottom:44px;left:44px;transform:scaleY(-1)}
.sheetcorner:nth-of-type(4){bottom:44px;right:44px;transform:scale(-1)}
.inner{position:relative;z-index:3;display:flex;flex-direction:column;height:100%;text-align:center}

.om{font:${te?`500 34px`:`600 30px`}/1 ${FB};color:var(--gold-dk);letter-spacing:${te?'0':'.2em'};margin-bottom:14px}
.rel{font:${te?`500 32px`:`500 30px`}/1.4 ${FB};color:var(--ink-soft);margin:14px 0 12px;
  letter-spacing:${te?'0':'.04em'}}
.nameplate{border:1.5px solid var(--gold);width:fit-content;
  padding:${te?'12px 34px 16px':'10px 34px 12px'};margin:0 auto}
.nm{font:${te?`700 62px`:`700 66px`}/1.24 ${F};color:var(--maroon);letter-spacing:${te?'0':'.012em'}}
.nm small{font-size:${te?'40px':'40px'};font-weight:${te?500:600};color:var(--ink);letter-spacing:${te?'0':'.06em'}}

.mid{display:flex;align-items:stretch;gap:42px;margin:32px 0 18px;text-align:left}
.midcol{display:flex;flex-direction:column;justify-content:center;gap:26px;flex:1}
.venue .lbl{text-decoration:underline;text-underline-offset:5px;
  text-decoration-thickness:1.5px;color:var(--ink)}
.venue,.venue .time{font:${te?`400 25px`:`400 25px`}/1.5 ${FB};color:var(--ink)}
.passed{font:${te?`400 29px`:`400 28px`}/1.58 ${FB};color:var(--ink)}
.passed b{font-weight:${te?600:600};color:var(--maroon)}

.schedule{margin-top:auto;padding-top:0}
.sched-h{font:${te?`600 26px`:`600 23px`}/1 ${FB};letter-spacing:${te?'.02em':'.22em'};
  color:var(--gold-dk);text-transform:${te?'none':'uppercase'};margin-bottom:14px;
  text-align:left;padding-left:14px;margin-bottom:18px}
.row{text-align:left;padding:10px 14px;line-height:1.5}
.rd{font:${te?`600 28px`:`600 27px`}/1.5 ${FB};color:var(--maroon);letter-spacing:.01em}
.rr{font:${te?`500 28px`:`500 27px`}/1.5 ${FB};color:var(--ink);margin-left:16px}
.row.hi .rd{color:var(--accent);font-weight:700;
  text-decoration:underline;text-underline-offset:6px;text-decoration-thickness:1.5px}
.row.hi .rr{color:var(--accent);font-weight:${te?700:600}}

.closing{font:${te?`700 27px`:`600 26px`}/1.45 ${FB};color:var(--accent);
  text-align:center;margin-top:14px;padding:0 14px}
.foot{margin-top:18px;padding-top:20px;font-family:${FB};
  border-top:1px solid rgba(176,138,70,.4);text-align:center}
.lbl{font-family:${FB};font-weight:600;color:var(--gold-dk);display:block;
  margin-bottom:8px;letter-spacing:${te?'0':'.06em'};font-size:${te?'25px':'24px'}}
.foot .grp{display:flex;align-items:baseline;justify-content:center;gap:12px;
  margin-top:6px}
.foot .role{font:${te?`500 24px`:`500 23px`}/1.4 ${FB};color:var(--ink-soft);
  letter-spacing:${te?'0':'.04em'}}
.foot .role::after{content:':'}
.foot em{font-style:normal;color:var(--maroon);
  font:${te?`700 29px`:`600 30px`}/1.4 ${F};letter-spacing:${te?'0':'.02em'}}
.time{font:${te?`500 24px`:`500 23px`}/1.4 ${FB};color:var(--ink-soft);margin-top:8px}
</style></head><body>
<div class="card">
  <div class="frame b1"></div><div class="frame b2"></div><div class="frame b3"></div>
  ${cornerSVG(150).replace('class="corner"','class="sheetcorner"')}
  ${cornerSVG(150).replace('class="corner"','class="sheetcorner"')}
  ${cornerBracket(84).replace('class="corner"','class="sheetcorner"')}
  ${cornerBracket(84).replace('class="corner"','class="sheetcorner"')}
  <div class="inner">
    <div class="orn"><span class="rule"></span><span class="diamond"></span><span class="rule"></span></div>
    <div class="rel">${te ? c.relationTe : c.relationEn}</div>
    <div class="nameplate">
      <div class="nm"><small>${te ? c.honorificTe : c.honorificEn}</small> ${te ? c.nameTe : c.nameEn} ${te ? `<small>${c.nameSuffixTe}</small>` : ''}</div>
    </div>
    <div class="mid">
      ${photoBlock(c, 344, 516)}
      <div class="midcol">
        <div class="passed">${te
          ? `<b>${c.passedOnTe}</b> రాత్రి 9.55 గంటలకు స్వర్గస్థురాలైనారని తెలియజేయుటకు ఎంతో చింతిస్తున్నాము.<br><br>వారి ఉత్తరక్రియలు క్రింది విధముగా జరుపబడును.`
          : `It is with profound sorrow that we inform you of her passing on <b>${c.passedOnEn} at 9:55&nbsp;PM</b>.<br><br>The ceremonies will be held as follows.`}</div>
        <div class="venue"><span class="lbl">${venue[0]}</span>${venue.slice(1).join('<br>')}</div>
      </div>
    </div>
    <div class="schedule">
      <div class="sched-h">${te ? 'ఉత్తరక్రియల వివరములు' : 'Order of Rites'}</div>
      ${rows}
    </div>
    <div class="closing">${te
      ? 'జరపబడును కావున తెలియజేయనైనది.'
      : 'This is to respectfully inform you.'}</div>
    <div class="foot">
      <span class="lbl">${te ? c.fromLabelTe : c.fromLabelEn}</span>
      ${groups.map(([role, names]) => `<div class="grp">
        <span class="role">${role}</span><em>${names}</em></div>`).join('')}
    </div>
  </div>
</div></body></html>`;
}

/* -------------------------- photo frame creative ------------------------- */

function frame(lang) {
  const te = lang === 'te';
  const c = CONFIG;
  const F = te ? `'NST',serif` : `'Cormorant','EBG',serif`;
  const FB = te ? `'NST',serif` : `'EBG',serif`;

  return `<!doctype html><html><head><meta charset="utf-8"><style>
${FONTS}${BASE}${PHOTO_CSS}
.card{width:1080px;height:1080px;padding:48px;display:flex;flex-direction:column;
  align-items:center;justify-content:center}
.b1{inset:22px;border-width:3px}
.b2{inset:34px;border-color:var(--gold-lt)}
.sheetcorner{position:absolute;z-index:2}
.sheetcorner:nth-of-type(1){top:38px;left:38px}
.sheetcorner:nth-of-type(2){top:38px;right:38px;transform:scaleX(-1)}
.sheetcorner:nth-of-type(3){bottom:38px;left:38px;transform:scaleY(-1)}
.sheetcorner:nth-of-type(4){bottom:38px;right:38px;transform:scale(-1)}
.inner{position:relative;z-index:3;display:flex;flex-direction:column;align-items:center;
  text-align:center}
.om{font:${te?'600 36px':'600 31px'}/1 ${FB};color:var(--gold-dk);letter-spacing:${te?'.02em':'.24em'};
  margin-bottom:34px}
.photo{margin-bottom:8px}
.nm{font:${te?'700 52px':'700 56px'}/1.26 ${F};color:var(--maroon);margin-top:56px;
  letter-spacing:${te?'0':'.012em'}}
.nm small{font-size:${te?'36px':'36px'};font-weight:${te?500:600};color:var(--ink);
  letter-spacing:${te?'0':'.06em'}}
.dates{font:${te?'500 28px':'500 27px'}/1.5 ${FB};color:var(--ink-soft);margin-top:14px;
  letter-spacing:${te?'0':'.05em'}}
.blessing{font:${te?'500 28px':'500 26px'}/1.5 ${FB};color:var(--gold-dk);margin-top:22px;
  letter-spacing:${te?'0':'.07em'};font-style:${te?'normal':'italic'}}
.orn{margin-top:20px}
.orn .rule{width:150px}
</style></head><body>
<div class="card">
  <div class="frame b1"></div><div class="frame b2"></div>
  ${cornerSVG(160).replace('class="corner"','class="sheetcorner"')}
  ${cornerSVG(160).replace('class="corner"','class="sheetcorner"')}
  ${cornerSVG(160).replace('class="corner"','class="sheetcorner"')}
  ${cornerSVG(160).replace('class="corner"','class="sheetcorner"')}
  <div class="inner">
    <div class="om">${te ? 'ఓం శాంతిః' : 'OM SHANTI'}</div>
    ${photoBlock(c, 520, 624)}
    <div class="nm"><small>${te ? c.honorificTe : c.honorificEn}</small> ${te ? c.nameTe : c.nameEn} ${te ? `<small>${c.nameSuffixTe}</small>` : ''}</div>
    <div class="dates">${te ? `స్వర్గస్థురాలైన తేదీ — ${c.passedOnPlainTe}` : `Passed away on ${c.passedOnEn}`}</div>
    <div class="orn"><span class="rule"></span><span class="diamond"></span><span class="rule"></span></div>
    <div class="blessing">${te ? 'వారి ఆత్మకు శాంతి కలుగుగాక' : 'May her soul rest in eternal peace'}</div>
  </div>
</div></body></html>`;
}

/* -------------------------------- render -------------------------------- */

const fs = require('fs');
const path = require('path');

// Auto-detect the portrait: any image dropped next to this script that isn't
// one of our own rendered outputs. Filename doesn't matter.
if (!CONFIG.photo) {
  const outputs = new Set(['invitation-telugu.png', 'invitation-english.png',
    'photo-frame-telugu.png', 'photo-frame-english.png']);
  const found = fs.readdirSync(__dirname)
    .filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f) && !outputs.has(f))
    .sort((a, b) => (/^photo\./i.test(b) ? 1 : 0) - (/^photo\./i.test(a) ? 1 : 0));
  if (found.length > 1) console.log('note: multiple images present, using the first of', found);
  if (found[0]) CONFIG.photo = found[0];
}
console.log(CONFIG.photo
  ? `portrait: using ${CONFIG.photo}`
  : 'portrait: none found (drop a photo.jpg here) - rendering placeholder');
const out = __dirname;
const pages = {
  'invitation-telugu.html': invite('te'),
  'invitation-english.html': invite('en'),
  'photo-frame-telugu.html': frame('te'),
  'photo-frame-english.html': frame('en'),
};
for (const [f, html] of Object.entries(pages)) fs.writeFileSync(path.join(out, f), html);

(async () => {
  const { chromium } = require('/opt/node22/lib/node_modules/playwright');
  const b = await chromium.launch();
  const pg = await b.newPage({ deviceScaleFactor: 2 });
  for (const f of Object.keys(pages)) {
    await pg.goto('file://' + path.join(out, f));
    await pg.evaluate(() => document.fonts.ready);
    await pg.waitForTimeout(300);
    const fit = await pg.evaluate(() => {
      const i = document.querySelector('.inner'), c = document.querySelector('.card');
      const cs = getComputedStyle(c);
      const avail = c.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      return { used: Math.ceil(i.scrollHeight), avail: Math.floor(avail) };
    });
    console.log('   fit: used', fit.used, '/ avail', fit.avail, fit.used > fit.avail ? '*** OVERFLOW ***' : 'ok');
    const el = await pg.$('.card');
    await el.screenshot({ path: path.join(out, f.replace('.html', '.png')) });
    console.log('rendered', f.replace('.html', '.png'));
  }
  await b.close();
})();
