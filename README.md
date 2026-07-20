# Aragón Datacenter Map

Interactive Leaflet map + JSON dataset of datacenter projects in the Aragón region of Spain.

Every datapoint is cited. The schema captures **operator, investors, clients, energy and water consumption, government permits, and expedited / fast-track indicators** (PIGA route, ICIO tax controversy, NGO objections, judicial litigation).

## Run it

The page needs HTTP to fetch the JSON (`file://` blocks `fetch`). From the project root:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/
```

## Deploy

It's a fully static site — drop the whole folder on any static host.

- **Cloudflare Pages** (recommended): Pages → Connect to git → pick this repo → leave build command empty, publish directory `/` → done. Custom domain in the Pages UI.
- **GitHub Pages**: Settings → Pages → Source: Deploy from branch → `main` / `/ (root)`.
- **Netlify**: New site → import from git → publish directory `/`.

## File layout

```
dc-map/
├── index.html
├── style.css
├── app.js
├── data/datacenters.json     # the dataset — extend this to add sites
└── README.md
```

## Editorial angles surfaced by the schema

- **Speculative builds** — sites with `speculative: true` are flagged red-ringed on the map. These have no publicly disclosed anchor tenant and carry the highest vacancy risk if hyperscaler demand softens.
- **Expedited authorisation** — every major Aragón DC is using the regional **PIGA** mechanism, which overrides municipal urbanism, enables expropriation, and — per critics — sidesteps the municipal ICIO construction tax.
- **Litigation** — the first DC lawsuit in Spain (Ecologistas en Acción at TSJA, against AWS PIGA) plus 9-group alegaciones against Microsoft PIGA are linked from the relevant site records.
- **Tax controversy** — Microsoft's refusal to pay €87M ICIO to La Muela + Villamayor (and the DGA's extension of the exemption pattern to other sites) is captured per-site.

## How to add a new site

Open `data/datacenters.json` and add an object to the `sites` array. Required fields: `id`, `operator`, `operator_type`, `site_name`, `municipality`, `province`, `lat`, `lon`, `status`, `tenant_status`, `speculative`. The map will pick it up on next load.

If you don't have a confirmed tenant, set `speculative: true` and `tenant_status: "speculative"` or `"unknown"` — the map will ring-highlight it.

### Optional environmental fields

These render in the site dialog only when present, and each takes a `_source` URL (leave the field out when unknown — the schema treats absent as "unknown", never zero):

- `land`: `{ "hectares": 294, "prior_use": "...", "protected_area": "...", "_source": "https://..." }` — site footprint, prior land use (verifiable per parcel via [SIGPAC](https://sigpac.mapa.gob.es/) + Catastro), and any nearby Red Natura 2000 / protected area.
- `backup_power`: `{ "fuel": "diesel", "capacity_mw": 20, "_source": "https://..." }` — standby-generator fuel and capacity (diesel is the industry default; HVO/gas/battery are alternatives).

`prior_use` and `protected_area` accept `_es` siblings for translation.

## Citation policy

Every numeric or factual claim should have a source URL. Field-level citations live in nested `_source` keys; site-level citations live in the `sources` array. The schema treats `null` as "unknown" and never as "zero". When critics and operators disagree on a number (e.g. AWS water consumption: 755,000 m³ company vs. 14 hm³ critics), both are stored with separate citations rather than averaged.

## Contributing

Issues and PRs welcome: https://github.com/nopressurelab/dc-map

To add a new site, edit `data/datacenters.json` and append to the `sites` array. To translate fields, add `_es` siblings (the UI picks them up automatically).

## License

CC BY 4.0 — see [LICENSE](LICENSE). Reuse freely with attribution.
