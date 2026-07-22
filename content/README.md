# Editing page text

The text on every content page lives here, one file per page per language:

```
content/land.en.md    content/land.es.md
content/trends.en.md  content/trends.es.md
content/about.en.md   content/about.es.md
… (about, types, municipalities, timeline, press, organize, trends, land)
```

**To edit**, change the `.md` file — on GitHub, click the pencil ✎ and commit; it's live as soon as the site deploys. No build step, no touching the page code.

Each page is a thin HTML shell (`about.html`, etc.) that just loads its `.md` and renders it with [marked](https://marked.js.org/). The page skeleton (header, language buttons) and any data-driven pieces (charts, tables, the CSV button — all built from `data/datacenters.json`) stay in the shell / JS; you only ever edit the prose here.

## Two flavours of content file

- **Pure Markdown** — `land.en.md` is written in clean Markdown (`# Heading`, `**bold**`, `[link](url)`, `- lists`). Prefer this for new pages.
- **HTML kept as-is** — the older pages (trends, organize, timeline, municipalities, press, about, types) were extracted from existing HTML that had designed layouts and dense citations, so their `.md` files contain that HTML. **You can still just edit the words**, and you can drop Markdown in alongside the HTML (marked renders both). Converting a page fully to Markdown later is fine — just keep the placeholder lines below intact.

## Leave these placeholder lines intact

A few lines are hooks the page fills with live, data-driven content. Edit the words around them, not these:

```html
<canvas id="chart-…"></canvas>          <!-- a chart, built from the dataset -->
<tbody id="land-table-body"></tbody>    <!-- a table, built from the dataset -->
<button class="csv-btn" data-csv>…</button>  <!-- the live CSV download -->
```

External links (`http…`) open in a new tab automatically.

## Keep EN and ES in step

Every page has an `.en.md` and an `.es.md`. When you change one, update the other.
