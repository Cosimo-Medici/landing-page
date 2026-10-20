#!/usr/bin/env python3
"""Check accessibility-critical structure in the real built marketing pages.

Run after `npm run build`. This intentionally supplements browser checks; it
does not claim WCAG conformance or validate the generated application's DOM.
"""
from html.parser import HTMLParser
from pathlib import Path


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.nodes = []

    def handle_starttag(self, tag, attributes):
        self.nodes.append((tag, dict(attributes)))


root = Path(__file__).resolve().parents[1] / "dist"
pages = sorted(p for p in root.rglob("*.html") if "product-demo" not in p.parts)
assert pages, "Build the site before running this check"
failures = []
for path in pages:
    page = Page()
    page.feed(path.read_text())
    nodes = page.nodes
    ids = [a["id"] for _, a in nodes if "id" in a]
    by_id = {a["id"]: (tag, a) for tag, a in nodes if "id" in a}

    def check(condition, description):
        if not condition:
            failures.append(f"{path.relative_to(root)}: {description}")

    check(len(ids) == len(set(ids)), "duplicate IDs")
    check(sum(tag == "main" for tag, _ in nodes) == 1, "needs exactly one main landmark")
    check(sum(tag == "h1" for tag, _ in nodes) == 1, "needs exactly one primary heading")
    check(any(tag == "html" and a.get("lang") for tag, a in nodes), "missing document language")
    check(any(tag == "a" and a.get("href") == "#main" for tag, a in nodes), "missing skip link")
    check(by_id.get("main", (None, {}))[1].get("tabindex") == "-1", "skip destination cannot receive keyboard focus")
    for tag, attributes in nodes:
        if tag == "img":
            check("alt" in attributes, "image missing alternative text")
        if tag == "iframe":
            check(bool(attributes.get("title")), "iframe missing accessible title")
        for reference in ("aria-labelledby", "aria-describedby", "aria-controls"):
            for target in attributes.get(reference, "").split():
                check(target in by_id, f"{reference} points at missing #{target}")
        if tag == "a" and attributes.get("href", "").startswith("#"):
            target = attributes["href"][1:]
            check(not target or target in by_id, f"link points at missing #{target}")
if failures:
    raise SystemExit("\n".join(failures))
print(f"Accessibility structure checks passed for {len(pages)} built pages.")
