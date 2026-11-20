#!/usr/bin/env python3
"""Read-only source inventory for EXE-114; stdlib only, no copy generation."""
import argparse
import hashlib
import html
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from datetime import datetime, timezone
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
BLOCKS = set('h1 h2 h3 h4 h5 h6 p a button li dt dd td th summary figcaption blockquote title'.split())
VOID = set('area base br col embed hr img input link meta param source track wbr'.split())
RULES = {
    'quantified_or_dated': r'\d|[$£€%]',
    'product_or_workflow': r'\b(Cosimo|prepares?|produces?|automates?|integrates?|trace|extracts?|reconciles?)\b',
    'security_or_assurance': r'\b(secure|security|SOC\s*2|encrypt\w*|accurate|accuracy|guarantee\w*|certif\w*|train\w*|compliant|compliance)\b',
    'commercial_or_superlative': r'\b(free|price|pricing|cost|cheapest|largest|youngest|fastest|best|warranty|hire|replace\w*)\b',
}


def sha(value):
    return hashlib.sha256(value if isinstance(value, bytes) else value.encode()).hexdigest()


def normal(value):
    return re.sub(r'\s+', ' ', value).strip()


def flags(value):
    return [name for name, pattern in RULES.items() if re.search(pattern, value, re.I)]


class CopyParser(HTMLParser):
    def __init__(self, source, relative):
        super().__init__(convert_charrefs=True)
        self.source, self.relative = source, relative
        self.lines = [0] + [m.end() for m in re.finditer('\n', source)]
        self.stack, self.rows, self.assets, self.metadata, self.body_text = [], [], [], [], []
        self.counts = {}

    def source_offset(self):
        line, column = self.getpos()
        return self.lines[line - 1] + column

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        self.counts[tag] = self.counts.get(tag, 0) + 1
        index = self.counts[tag]
        entry = dict(tag=tag, attrs=attrs, start=self.source_offset(), line=self.getpos()[0], chunks=[], index=index)
        if tag == 'meta' and attrs.get('content'):
            self.metadata.append(dict(kind=attrs.get('name') or attrs.get('property') or 'meta', text=attrs['content'], line=entry['line']))
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.metadata.append(dict(kind='canonical', text=attrs.get('href', ''), line=entry['line']))
        if tag == 'script' and attrs.get('src'):
            self.assets.append(attrs['src'])
        if tag == 'br':
            for frame in self.stack:
                frame['chunks'].append(' ')
        if tag not in VOID:
            self.stack.append(entry)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_data(self, value):
        blocked = any(frame['tag'] in {'script', 'style'} for frame in self.stack)
        if not blocked:
            for frame in self.stack:
                frame['chunks'].append(value)
            if any(frame['tag'] == 'body' for frame in self.stack):
                self.body_text.append(value)

    def handle_endtag(self, tag):
        matching = next((i for i in range(len(self.stack) - 1, -1, -1) if self.stack[i]['tag'] == tag), None)
        if matching is None:
            return
        entry = self.stack[matching]
        self.stack = self.stack[:matching]
        end = self.source.find('>', self.source_offset()) + 1
        raw = self.source[entry['start']:end]
        attrs = entry['attrs']
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.metadata.append(dict(kind='json-ld-source', text=raw, line=entry['line']))
        text = normal(''.join(entry['chunks']))
        if tag not in BLOCKS or not (text or attrs.get('aria-label')):
            return
        key = f"{self.relative}:{tag}:{entry['index']}"
        self.rows.append(dict(id=sha(key)[:20], locator=key, file=self.relative, line=entry['line'],
            tag=tag, elementId=attrs.get('id'), ariaLabel=attrs.get('aria-label'), text=text,
            href=attrs.get('href'), sourceStart=entry['start'], sourceEnd=end, rawHtml=raw,
            sourceSha256=sha(raw), textSha256=sha(text), reviewFlags=flags(text),
            reviewStatus='unreviewed', proposedCopy=None, substantiation=[]))


def artifact(file):
    data = file.read_bytes()
    return dict(path=str(file.relative_to(ROOT)), sha256=sha(data), bytes=len(data))


def inventory():
    pages, rows, assets = [], [], {}
    for file in sorted((ROOT / 'src').rglob('*.html')):
        relative = str(file.relative_to(ROOT))
        parser = CopyParser(file.read_text(), relative)
        parser.feed(parser.source)
        source_path = file.relative_to(ROOT / 'src').as_posix()
        if source_path.startswith('public/'):
            source_path = source_path[len('public/'):]
        route = '/' + (source_path[:-10] if source_path.endswith('index.html') else source_path)
        page = dict(**artifact(file), route=route, metadata=parser.metadata,
            bodyText=normal(' '.join(parser.body_text)), recordIds=[r['id'] for r in parser.rows], scriptAssets=[])
        for src in parser.assets:
            if urlparse(src).scheme or src.startswith('//'):
                page['scriptAssets'].append(dict(url=src, status='external_not_read'))
                continue
            asset_path = urlparse(src).path
            target = ((ROOT / 'src' / asset_path.lstrip('/')) if asset_path.startswith('/') else file.parent / asset_path).resolve()
            if asset_path.startswith('/') and not target.is_file():
                target = (ROOT / 'src/public' / asset_path.lstrip('/')).resolve()
            if not target.is_relative_to(ROOT / 'src') or not target.is_file():
                page['scriptAssets'].append(dict(url=src, status='missing_or_outside_source'))
                continue
            item = artifact(target)
            item['reviewStatus'] = 'dynamic_text_not_executed_or_extracted'
            assets[item['path']] = item
            page['scriptAssets'].append(item)
        pages.append(page)
        rows.extend(parser.rows)
    summaries = []
    for name in ['llms.txt', 'llms-full.txt']:
        file = ROOT / 'src/public' / name
        if file.is_file():
            summaries.append(dict(**artifact(file), text=file.read_text(), reviewStatus='unreviewed'))
    evidence_names = ['docs/website-audit.md', 'docs/re-copy-audit.md', 'docs/marketing-legal-audit.md',
        'docs/audits/financial-audience-polish.md', 'docs/audits/deep-integration-copy.md']
    evidence_names += [f'docs/audits/deep-{sector}-buyer.md' for sector in ['re', 'vc', 'pe', 'credit', 'hedge']]
    evidence = [dict(**artifact(ROOT / name), role='historical_context_not_current_product_substantiation')
                for name in evidence_names if (ROOT / name).is_file()]
    identities = [r['id'] for r in rows]
    if len(identities) != len(set(identities)):
        raise ValueError('Duplicate copy record identity')
    return dict(schemaVersion=1, observedAt=datetime.now(timezone.utc).isoformat(), issue='EXE-114',
        status='source_inventory_ready_editorial_and_substantiation_pending', sourceRoot=str(ROOT),
        boundaries=['Current local source, not a deployed-site observation.',
            'Whitespace-normalized text is for reading; rawHtml and source offsets preserve exact source.',
            'IDs are stable only while file and tag ordinal are unchanged. Reconcile source hashes before reuse.',
            'Nested blocks intentionally overlap; counts are review records, not unique claims.',
            'Flags are search aids, not judgments of truth, legality, importance or approval.',
            'Historical audits are context; no claim inherits approval or product substantiation from them.',
            'Script-generated copy and interaction states require separate review of listed script assets.',
            'LinkedIn company and personal-profile current copy have not been collected by this command.'],
        counts=dict(pages=len(pages), copyRecords=len(rows), flaggedRecords=sum(bool(r['reviewFlags']) for r in rows),
            scriptAssets=len(assets), crawlerSummaries=len(summaries), contextualEvidence=len(evidence),
            substantiatedClaims=0, proposedReplacements=0, publishedChanges=0),
        pages=pages, records=sorted(rows, key=lambda r: (r['file'], r['sourceStart'])),
        scriptAssets=list(assets.values()), crawlerSummaries=summaries, contextualEvidence=evidence)


def render(report):
    escape = lambda value: html.escape(str(value), quote=True)
    sections = []
    for page in report['pages']:
        records = [r for r in report['records'] if r['file'] == page['path']]
        items = ''.join('<tr><td>' + escape(f"{r['tag']} · line {r['line']} · {r['id']}") + '</td><td>' +
            escape(r['text']) + ('<br><code>' + escape(r['href']) + '</code>' if r['href'] else '') +
            '</td><td>' + escape(', '.join(r['reviewFlags']) or '—') + '</td></tr>' for r in records)
        sections.append(f'<details><summary>{escape(page["route"])} · {len(records)} records</summary><p>{escape(page["path"])}</p><table><thead><tr><th>Source</th><th>Current wording / destination</th><th>Review search flags</th></tr></thead><tbody>{items}</tbody></table></details>')
    return '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>EXE-114 current source inventory</title><style>body{font:16px system-ui;max-width:1200px;margin:2rem auto;padding:0 1rem;line-height:1.5}summary{cursor:pointer;padding:.6rem}table{width:100%;border-collapse:collapse;table-layout:fixed}td,th{padding:.6rem;border:1px solid #bbb;text-align:left;vertical-align:top;overflow-wrap:anywhere}th:first-child{width:24%}th:last-child{width:23%}code{font-size:.8rem}details{border-top:1px solid #bbb} @media(max-width:600px){table,tbody,tr,td{display:block}thead{display:none}td{border-bottom:0}tr{margin-bottom:1rem}}</style><body><h1>EXE-114 · Current source inventory</h1><p>Private editorial worksheet. No new copy, claim approval, deployment or LinkedIn edit.</p><p>' + escape(json.dumps(report['counts'])) + '</p><ul>' + ''.join('<li>' + escape(v) + '</li>' for v in report['boundaries']) + '</ul>' + ''.join(sections) + '</body></html>'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=Path.home() / 'Library/Application Support/cosimo-content/copy-inventory/exe-114')
    args = parser.parse_args()
    output = args.output.resolve()
    if output.is_relative_to(ROOT):
        parser.error('Output must be outside the website checkout so private review material cannot enter a build.')
    report = inventory()
    output.mkdir(parents=True, exist_ok=True, mode=0o700)
    for name, data in [('inventory.json', json.dumps(report, indent=2, ensure_ascii=False) + '\n'), ('review.html', render(report))]:
        destination = output / name
        destination.write_text(data)
        destination.chmod(0o600)
    latest = dict(schemaVersion=1, observedAt=report['observedAt'], status=report['status'], counts=report['counts'],
        dependencies=['Review script-generated copy and both current LinkedIn surfaces.',
            'Retain primary proof for objective claims; contextual audits are not product evidence.',
            'Eliot chooses voice/position/offer and approves replacements before any publication.'],
        evidencepaths=[str(output / 'inventory.json'), str(output / 'review.html')])
    (output / 'latest.json').write_text(json.dumps(latest, indent=2) + '\n')
    (output / 'latest.json').chmod(0o600)
    print(json.dumps(latest, indent=2))


if __name__ == '__main__':
    main()
