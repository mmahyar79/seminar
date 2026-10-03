"""Post-process the pptxgenjs deck:
1. remove duplicate <a:pPr> that pptxgenjs writes mid-paragraph for multi-run text,
2. add slide transitions (Morph with Fade fallback on section changes, Fade elsewhere),
3. add automatic staggered fade-in entrance animations from objectName 'animN_*',
4. make Persian speaker notes right-to-left.
"""
import json, re, sys, zipfile

src, dst = sys.argv[1], sys.argv[2]
keys = json.load(open('slide_keys.json'))
MORPH = {'agenda', 'closing'} | {k for k in keys if k.startswith('div')}
after_div = {keys[i + 1] for i, k in enumerate(keys) if k.startswith('div') and i + 1 < len(keys)}
MORPH |= after_div

P_RE = re.compile(r'<a:p>(.*?)</a:p>', re.S)
PPR_RE = re.compile(r'<a:pPr\b[^>]*/>|<a:pPr\b[^>]*>.*?</a:pPr>', re.S)


def fix_ppr(xml):
    def one(m):
        body = m.group(1)
        first_r = body.find('<a:r>')
        if first_r < 0:
            return m.group(0)
        head, tail = body[:first_r], body[first_r:]
        tail = PPR_RE.sub('', tail)
        return '<a:p>' + head + tail + '</a:p>'
    return P_RE.sub(one, xml)


def transition(key):
    if key in MORPH:
        return ('<mc:AlternateContent xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006">'
                '<mc:Choice xmlns:p159="http://schemas.microsoft.com/office/powerpoint/2015/09/main" '
                'xmlns:p14="http://schemas.microsoft.com/office/powerpoint/2010/main" Requires="p159">'
                '<p:transition spd="slow" p14:dur="1000"><p159:morph option="byObject"/></p:transition></mc:Choice>'
                '<mc:Fallback><p:transition spd="slow"><p:fade/></p:transition></mc:Fallback></mc:AlternateContent>')
    return '<p:transition spd="med"><p:fade/></p:transition>'


SHAPE_RE = re.compile(r'<p:(sp|pic|cxnSp|graphicFrame)>.*?</p:\1>', re.S)
CNV_RE = re.compile(r'<p:cNvPr id="(\d+)" name="anim(\d+)_\d+"')


def timing(xml):
    groups, text_ids = {}, []
    for m in SHAPE_RE.finditer(xml):
        c = CNV_RE.search(m.group(0))
        if not c:
            continue
        sid, g = int(c.group(1)), int(c.group(2))
        groups.setdefault(g, []).append(sid)
        if m.group(1) == 'sp' and '<p:txBody>' in m.group(0):
            text_ids.append(sid)
    if not groups:
        return ''
    nid = [2]

    def nxt():
        nid[0] += 1
        return nid[0]
    DUR, STEP = 450, 380
    inner = []
    for gi, g in enumerate(sorted(groups)):
        effects = []
        for k, sid in enumerate(groups[g]):
            node = 'afterEffect' if k == 0 else 'withEffect'
            grp = ' grpId="0"' if sid in text_ids else ''
            effects.append(
                f'<p:par><p:cTn id="{nxt()}" presetID="10" presetClass="entr" presetSubtype="0" fill="hold"'
                f'{grp} nodeType="{node}"><p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst>'
                f'<p:set><p:cBhvr><p:cTn id="{nxt()}" dur="1" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst></p:cTn>'
                f'<p:tgtEl><p:spTgt spid="{sid}"/></p:tgtEl><p:attrNameLst><p:attrName>style.visibility</p:attrName></p:attrNameLst></p:cBhvr>'
                f'<p:to><p:strVal val="visible"/></p:to></p:set>'
                f'<p:animEffect transition="in" filter="fade"><p:cBhvr><p:cTn id="{nxt()}" dur="{DUR}"/>'
                f'<p:tgtEl><p:spTgt spid="{sid}"/></p:tgtEl></p:cBhvr></p:animEffect>'
                f'</p:childTnLst></p:cTn></p:par>')
        inner.append(f'<p:par><p:cTn id="{nxt()}" fill="hold"><p:stCondLst><p:cond delay="{0 if gi == 0 else STEP}"/></p:stCondLst>'
                     f'<p:childTnLst>{"".join(effects)}</p:childTnLst></p:cTn></p:par>')
    outer_id = nxt()
    seq = (f'<p:par><p:cTn id="{outer_id}" fill="hold"><p:stCondLst><p:cond delay="indefinite"/>'
           f'<p:cond evt="onBegin" delay="0"><p:tn val="2"/></p:cond></p:stCondLst><p:childTnLst>{"".join(inner)}</p:childTnLst></p:cTn></p:par>')
    bld = ''.join(f'<p:bldP spid="{i}" grpId="0" animBg="1"/>' for i in text_ids)
    return ('<p:timing><p:tnLst><p:par><p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot"><p:childTnLst>'
            '<p:seq concurrent="1" nextAc="seek"><p:cTn id="2" dur="indefinite" nodeType="mainSeq"><p:childTnLst>'
            + seq +
            '</p:childTnLst></p:cTn><p:prevCondLst><p:cond evt="onPrev" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:prevCondLst>'
            '<p:nextCondLst><p:cond evt="onNext" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:nextCondLst></p:seq>'
            '</p:childTnLst></p:cTn></p:par></p:tnLst>'
            + (f'<p:bldLst>{bld}</p:bldLst>' if bld else '') + '</p:timing>')


def rtl_notes(xml):
    # rebuild the notes body: one right-to-left paragraph per line, Persian language tag, Tahoma for script text
    m = re.search(r'(<p:ph type="body" idx="1"/>.*?<p:txBody><a:bodyPr/><a:lstStyle/>)(.*?)(</p:txBody>)', xml, re.S)
    if not m:
        return xml
    texts = re.findall(r'<a:t>(.*?)</a:t>', m.group(2), re.S)
    lines = [l.strip() for l in '\n'.join(texts).replace('\r', '').split('\n')]
    lines = [l for l in lines if l]
    if not lines or not re.search(r'[\u0600-\u06FF]', ''.join(lines)):
        return xml
    paras = []
    for i, l in enumerate(lines):
        b = ' b="1"' if i == 0 else ''
        paras.append('<a:p><a:pPr rtl="1" algn="r"><a:spcAft><a:spcPts val="600"/></a:spcAft></a:pPr>'
                     f'<a:r><a:rPr lang="fa-IR" sz="1400"{b} dirty="0"><a:cs typeface="Tahoma"/></a:rPr><a:t>{l}</a:t></a:r></a:p>')
    return xml[:m.start(2)] + ''.join(paras) + xml[m.end(2):]


zin = zipfile.ZipFile(src)
zout = zipfile.ZipFile(dst, 'w', zipfile.ZIP_DEFLATED)
stats = []
for item in zin.infolist():
    data = zin.read(item.filename)
    m = re.match(r'ppt/slides/slide(\d+)\.xml$', item.filename)
    if m:
        n = int(m.group(1))
        key = keys[n - 1]
        x = fix_ppr(data.decode('utf8'))
        t = timing(x)
        assert '<p:transition' not in x and '<p:timing' not in x
        x = x.replace('</p:clrMapOvr>', '</p:clrMapOvr>' + transition(key) + t, 1)
        stats.append((n, key, len(CNV_RE.findall(x))))
        data = x.encode('utf8')
    elif re.match(r'ppt/notesSlides/notesSlide\d+\.xml$', item.filename):
        data = rtl_notes(data.decode('utf8')).encode('utf8')
    zout.writestr(item, data)
zout.close()
print('animated shapes per slide:', ' '.join(f'{n}:{c}' for n, k, c in stats))
