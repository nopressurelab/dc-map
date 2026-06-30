// Aragón Datacenter Map — main app
// Loads data/datacenters.json, renders Leaflet markers, sidebar filters, and site detail dialog.

const COLORS = {
  hyperscaler: '#58a6ff',
  private_equity: '#d29922',
  colocation_reit: '#a371f7',
  spanish_independent: '#3fb950',
  renewable_developer: '#1eb88a',
  speculative_developer: '#f85149'
};

const STATE = {
  data: null,
  layer: null,
  filters: {
    speculative: false,
    litigated: false,
    piga: false,
    operators: new Set()
  }
};

const map = L.map('map', { preferCanvas: true }).setView([41.65, -0.9], 8);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap & CARTO',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

fetch('data/datacenters.json')
  .then(r => r.json())
  .then(data => {
    STATE.data = data;
    renderAggregate(data);
    buildOperatorFilters(data);
    document.getElementById('last-updated').textContent = `Updated ${data.last_updated} — v${data.version}`;
    renderMarkers();
    wireFilters();
  })
  .catch(err => {
    console.error('Failed to load dataset', err);
    document.getElementById('map').innerHTML = `<div style="padding:24px;color:#f85149">Could not load dataset: ${err.message}. Serve this folder over HTTP (file:// blocks fetch).</div>`;
  });

function renderAggregate(d) {
  const a = d.aggregate;
  const dl = document.getElementById('aggregate-stats');
  const fmt = (n) => n == null ? '—' : n.toLocaleString('en-US');
  dl.innerHTML = `
    <dt>Sites mapped (this dataset)</dt><dd>${d.sites.length}</dd>
    <dt>NGO-mapped projected sites</dt><dd>${fmt(a.ngo_mapped_sites)}</dd>
    <dt>Projected MW</dt><dd>${fmt(a.ngo_mapped_total_mw)} MW</dd>
    <dt>Committed investment (Nov 2025)</dt><dd>€${fmt(a.official_commitment_eur_million_nov2025)} M</dd>
    <dt>Operational now</dt><dd>${fmt(a.currently_operational_sites)} sites / ${fmt(a.currently_operational_mw)} MW</dd>
    <dt>Share of regional electricity (2024)</dt><dd>${fmt(a.current_share_regional_electricity_pct)}%</dd>
    <dt>Share projected 2030</dt><dd>${fmt(a.projected_2030_share_pct)}% / ${fmt(a.projected_2030_demand_twh)} TWh</dd>
    <dt>AWS aggregate energy (annual)</dt><dd>${fmt(a.aws_aggregate_energy_gwh_year)} GWh</dd>
    <dt>AWS water (company)</dt><dd>${fmt(a.aws_aggregate_water_m3_year_company)} m³</dd>
    <dt>AWS water (critics)</dt><dd>${fmt(a.aws_aggregate_water_critics_hm3_year)} hm³</dd>
  `;
}

function buildOperatorFilters(d) {
  const ops = [...new Set(d.sites.map(s => s.operator))].sort();
  STATE.filters.operators = new Set(ops);
  const wrap = document.getElementById('operator-filters');
  wrap.innerHTML = '<h3 style="font-size:0.75rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.05em;margin:8px 0 4px 0;">Operators</h3>' +
    ops.map(o => `<label><input type="checkbox" data-op="${o}" checked> ${o}</label>`).join('');
  wrap.querySelectorAll('input[type=checkbox]').forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) STATE.filters.operators.add(cb.dataset.op);
      else STATE.filters.operators.delete(cb.dataset.op);
      renderMarkers();
    });
  });
}

function wireFilters() {
  document.getElementById('f-speculative').addEventListener('change', e => {
    STATE.filters.speculative = e.target.checked; renderMarkers();
  });
  document.getElementById('f-litigated').addEventListener('change', e => {
    STATE.filters.litigated = e.target.checked; renderMarkers();
  });
  document.getElementById('f-piga').addEventListener('change', e => {
    STATE.filters.piga = e.target.checked; renderMarkers();
  });

  const dialog = document.getElementById('site-dialog');
  document.getElementById('dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
}

function sitePassesFilters(s) {
  if (!STATE.filters.operators.has(s.operator)) return false;
  if (STATE.filters.speculative && !s.speculative) return false;
  if (STATE.filters.litigated && !hasLitigation(s)) return false;
  if (STATE.filters.piga && !usesPiga(s)) return false;
  return true;
}

function hasLitigation(s) {
  return (s.expedited_indicators && Array.isArray(s.expedited_indicators.litigation) && s.expedited_indicators.litigation.length > 0)
      || (s.expedited_indicators && s.expedited_indicators.tax_dispute)
      || (s.expedited_indicators && s.expedited_indicators.environmental_impact_flag);
}

function usesPiga(s) {
  if (!s.expedited_indicators) return false;
  return s.expedited_indicators.uses_piga === true;
}

function radiusForSite(s) {
  // Use max known MW; fall back to small marker.
  const mw = s.capacity_mw || s.capacity_mw_expanded || s.energy?.site_demand_mw || s.capacity_mw_msft_aragon_total;
  if (!mw) return 7;
  return Math.min(28, 6 + Math.sqrt(mw) * 0.9);
}

function renderMarkers() {
  if (STATE.layer) STATE.layer.remove();
  STATE.layer = L.layerGroup();

  STATE.data.sites.filter(sitePassesFilters).forEach(s => {
    const color = COLORS[s.operator_type] || '#888';
    const marker = L.circleMarker([s.lat, s.lon], {
      radius: radiusForSite(s),
      fillColor: color,
      color: hasLitigation(s) ? '#f85149' : (s.speculative ? '#f85149' : color),
      weight: hasLitigation(s) ? 3 : (s.speculative ? 2 : 1),
      opacity: 1,
      fillOpacity: 0.65,
      dashArray: hasLitigation(s) ? '4,3' : null
    });
    marker.bindPopup(popupHtml(s));
    marker.on('popupopen', () => {
      // Attach button handler each time popup opens
      const btn = document.querySelector('.leaflet-popup-content .more-btn');
      if (btn) btn.addEventListener('click', () => openDialog(s));
    });
    STATE.layer.addLayer(marker);
  });

  STATE.layer.addTo(map);
}

function popupHtml(s) {
  const inv = s.investment_eur_million || s.investment_eur_million_phase1 || s.investment_eur_million_full;
  const mw = s.capacity_mw || s.capacity_mw_expanded || s.energy?.site_demand_mw;
  const badges = [];
  if (s.speculative) badges.push('<span class="badge spec">Speculative</span>');
  if (hasLitigation(s)) badges.push('<span class="badge lit">Litigation/objections</span>');
  if (usesPiga(s)) badges.push('<span class="badge piga">PIGA</span>');
  if (s.expedited_indicators?.tax_dispute) badges.push('<span class="badge tax">ICIO dispute</span>');

  return `
    <h3>${s.site_name}</h3>
    <div class="meta">${s.municipality}, ${s.province} · ${s.status}</div>
    <div>${badges.join(' ')}</div>
    <p style="margin:6px 0;">
      <strong>Operator:</strong> ${s.operator}<br>
      ${inv ? `<strong>Investment:</strong> €${inv.toLocaleString('en-US')} M<br>` : ''}
      ${mw ? `<strong>Capacity:</strong> ${mw} MW<br>` : ''}
      <strong>Tenant:</strong> ${formatTenant(s)}
    </p>
    <button class="more-btn">View full record & sources</button>
  `;
}

function formatTenant(s) {
  switch (s.tenant_status) {
    case 'anchor_tenant_confirmed': return 'Anchor tenant confirmed';
    case 'pre_let': return 'Pre-let';
    case 'speculative': return '⚠ Speculative (none disclosed)';
    case 'unknown': return '⚠ Unknown / not disclosed';
    default: return s.tenant_status || '—';
  }
}

function openDialog(s) {
  const body = document.getElementById('dialog-body');
  body.innerHTML = renderFullSite(s);
  document.getElementById('site-dialog').showModal();
}

function renderFullSite(s) {
  const ei = s.expedited_indicators || {};
  const lit = (ei.litigation || []).map(l => `
    <li>${l.plaintiff || l.objectors || l.stage || 'Action'} — ${l.court || ''} ${l.filed || l.filed_year || ''}
      ${l.note ? '<em>' + l.note + '</em>' : ''}
      ${l.source ? `<a class="cite" href="${l.source}" target="_blank">[source]</a>` : ''}
    </li>
  `).join('');

  const permits = (s.permits || []).map(p => `
    <li>
      <strong>${p.type}</strong>${p.name ? ' — ' + p.name : ''}
      ${p.approval_date ? ' · approved ' + p.approval_date : ''}
      ${p.expediente_range ? ' · expediente ' + p.expediente_range : ''}
      ${p.boa_reference ? ' · BOA ' + p.boa_reference : ''}
      ${p.source || p.url ? `<a class="cite" href="${p.source || p.url}" target="_blank">[source]</a>` : ''}
    </li>
  `).join('');

  const ppas = (s.energy?.ppas || []).map(p => `
    <li>${p.counterparty} — ${p.volume_mw} MW ${p.sources ? '(' + p.sources + ')' : ''} ${p.year ? '· ' + p.year : ''}
      ${p.source ? `<a class="cite" href="${p.source}" target="_blank">[source]</a>` : ''}
    </li>
  `).join('');

  const sources = (s.sources || []).map(u => `<li><a href="${u}" target="_blank">${u}</a></li>`).join('');

  const investors = (s.investors || []).map(i => `<li>${i.name} — <em>${i.role}</em> (${i.type})</li>`).join('');
  const clients = (s.clients || []).map(c => `<li>${c.name}${c.confirmed === false ? ' <span class="warning">(not confirmed)</span>' : ''}${c.note ? ' — ' + c.note : ''}</li>`).join('');

  const taxBlock = ei.tax_dispute ? `
    <h3>ICIO Tax Dispute</h3>
    <p>${ei.tax_dispute.type}: <strong>€${ei.tax_dispute.amount_eur_million}M</strong> — ${ei.tax_dispute.municipality} — ${ei.tax_dispute.status}
    ${ei.tax_dispute.source ? `<a class="cite" href="${ei.tax_dispute.source}" target="_blank">[source]</a>` : ''}</p>
  ` : '';

  const envBlock = ei.environmental_impact_flag ? `
    <h3>Environmental Impact Flag</h3>
    <p class="warning">${ei.environmental_impact_flag.issue}
    ${ei.environmental_impact_flag.source ? `<a class="cite" href="${ei.environmental_impact_flag.source}" target="_blank">[source]</a>` : ''}</p>
  ` : '';

  const water = s.water ? `
    <h3>Water</h3>
    <table>
      ${s.water.annual_m3 ? `<tr><th>Annual m³</th><td>${s.water.annual_m3.toLocaleString ? s.water.annual_m3.toLocaleString() : s.water.annual_m3}</td></tr>` : ''}
      ${s.water.aggregate_aws_aragon_m3_year ? `<tr><th>AWS-Aragón aggregate m³</th><td>${s.water.aggregate_aws_aragon_m3_year.toLocaleString()}</td></tr>` : ''}
      ${s.water.cooling_tech ? `<tr><th>Cooling tech</th><td>${s.water.cooling_tech}</td></tr>` : ''}
      ${s.water.source_water_body ? `<tr><th>Source water body</th><td>${s.water.source_water_body}</td></tr>` : ''}
      ${s.water.concession_che_expediente ? `<tr><th>CHE concession</th><td>${s.water.concession_che_expediente}</td></tr>` : ''}
      ${s.water.storage_reservoir_m3 ? `<tr><th>Storage reservoir</th><td>${s.water.storage_reservoir_m3.toLocaleString()} m³</td></tr>` : ''}
      ${s.water.negotiation ? `<tr><th>Notes</th><td>${s.water.negotiation}</td></tr>` : ''}
      ${s.water.vdg_specific ? `<tr><th>Notes</th><td>${s.water.vdg_specific}</td></tr>` : ''}
    </table>
  ` : '';

  return `
    <h2>${s.site_name}</h2>
    <p class="cite">${s.municipality}, ${s.province} · status: <strong>${s.status}</strong> · coords precision: ${s.coords_precision || 'n/a'}</p>
    ${s.phase_notes ? `<p>${s.phase_notes}</p>` : ''}

    <h3>Operator</h3>
    <table>
      <tr><th>Operator</th><td>${s.operator}</td></tr>
      <tr><th>Legal entity</th><td>${s.operator_entity || '—'}</td></tr>
      <tr><th>Type</th><td>${s.operator_type}</td></tr>
    </table>

    <h3>Investment & timeline</h3>
    <table>
      ${s.first_announced ? `<tr><th>Announced</th><td>${s.first_announced}</td></tr>` : ''}
      ${s.operational_date ? `<tr><th>Operational</th><td>${s.operational_date}</td></tr>` : ''}
      ${s.construction_start ? `<tr><th>Construction start</th><td>${s.construction_start}</td></tr>` : ''}
      ${s.investment_eur_million ? `<tr><th>Investment (€M)</th><td>${s.investment_eur_million.toLocaleString()}</td></tr>` : ''}
      ${s.investment_eur_million_phase1 ? `<tr><th>Investment phase 1 (€M)</th><td>${s.investment_eur_million_phase1.toLocaleString()}</td></tr>` : ''}
      ${s.investment_eur_million_full ? `<tr><th>Investment full (€M)</th><td>${s.investment_eur_million_full.toLocaleString()}</td></tr>` : ''}
      ${s.capacity_mw ? `<tr><th>Capacity</th><td>${s.capacity_mw} MW</td></tr>` : ''}
      ${s.capacity_mw_initial ? `<tr><th>Capacity initial</th><td>${s.capacity_mw_initial} MW</td></tr>` : ''}
      ${s.capacity_mw_expanded ? `<tr><th>Capacity expanded</th><td>${s.capacity_mw_expanded} MW</td></tr>` : ''}
    </table>

    <h3>Investors</h3>
    <ul>${investors || '<li>—</li>'}</ul>

    <h3>Clients / Tenant</h3>
    <ul>${clients || '<li>—</li>'}</ul>
    <p><strong>Tenant status:</strong> ${formatTenant(s)} ${s.speculative ? '<span class="badge spec">Speculative</span>' : ''}</p>
    ${s.speculative_reasoning ? `<p class="cite"><em>${s.speculative_reasoning}</em></p>` : ''}

    <h3>Energy</h3>
    <table>
      ${s.energy?.site_demand_mw ? `<tr><th>Site demand</th><td>${s.energy.site_demand_mw} MW</td></tr>` : ''}
      ${s.energy?.grid_connection ? `<tr><th>Grid connection</th><td>${s.energy.grid_connection}</td></tr>` : ''}
      ${s.energy?.self_consumption_pct ? `<tr><th>Self-consumption</th><td>${s.energy.self_consumption_pct}%</td></tr>` : ''}
      ${s.energy?.aws_aragon_aggregate_demand_gwh_year ? `<tr><th>AWS-Aragón aggregate</th><td>${s.energy.aws_aragon_aggregate_demand_gwh_year.toLocaleString()} GWh/yr</td></tr>` : ''}
    </table>
    ${ppas ? `<h3>PPAs</h3><ul>${ppas}</ul>` : ''}

    ${water}

    <h3>Permits</h3>
    <ul>${permits || '<li>—</li>'}</ul>

    <h3>Expedited / fast-track indicators</h3>
    <p>
      ${ei.uses_piga === true ? '<span class="badge piga">Uses PIGA</span>' : ''}
      ${ei.icio_exempt_via_piga ? '<span class="badge tax">ICIO exempt via PIGA</span>' : ''}
    </p>
    ${lit ? `<ul>${lit}</ul>` : ''}
    ${taxBlock}
    ${envBlock}

    <h3>Sources</h3>
    <ul>${sources || '<li>—</li>'}</ul>
  `;
}
