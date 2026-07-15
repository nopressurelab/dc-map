// Aragón Datacenter Map — main app
// Loads data/datacenters.json, renders Leaflet markers, sidebar, dialog, with EN/ES switcher.

const COLORS = {
  hyperscaler: '#58a6ff',
  private_equity: '#d29922',
  colocation_reit: '#a371f7',
  spanish_independent: '#3fb950',
  renewable_developer: '#1eb88a',
  speculative_developer: '#f85149'
};

const I18N = {
  en: {
    title: 'Aragón Datacenter Map',
    subtitle: 'Operators, investors, clients, energy/water, government permits — every datapoint cited.',
    regional_total: 'Regional total',
    filters: 'Filters',
    speculative_only: 'Speculative only (no confirmed tenant)',
    litigated_only: 'Litigation or alegaciones only',
    piga_only: 'Uses PIGA fast-track only',
    high_risk_only: 'High vacancy risk only',
    thermal_plume: 'Show 500 m thermal plume (ASME 2026)',
    plume_hint: 'Zoom in to a site to see the 500 m thermal footprint to scale.',
    solar_footprint: 'Show equivalent solar-farm footprint (to scale)',
    solar_hint: 'Each amber square is the solar farm needed to supply that site’s electricity, drawn to scale on the map. Assumes datacentre load factor 0.90, Aragón solar capacity factor ~0.20, ~1.5 ha/MWp (NREL). Figures scale ~2× with these assumptions.',
    water_eo: 'Show basin water stress (Copernicus EDO)',
    water_eo_hint: 'Live Earth-observation layer (~5 km, updated every 10 days). Regional context, not site-scale. Areas with no colour aren\'t currently classified — expect the Combined Drought Indicator to be blank when there\'s no active drought. Click a site for the live reading at its location.',
    water_eo_cdiad: 'Combined Drought Indicator',
    water_eo_lfinx: 'Low-Flow Index (river drought)',
    water_eo_smian: 'Soil Moisture Anomaly',
    edo_live_link: 'Live basin water-stress at this location (Copernicus EDO) →',
    risk_label: 'Risk:',
    operators: 'Operators',
    legend: 'Legend',
    leg_hyperscaler: 'Hyperscaler (AWS, Microsoft)',
    leg_pe: 'Private equity / REIT',
    leg_colo: 'Colocation',
    leg_ind: 'Spanish independent',
    leg_renewable: 'Renewable developer (Forestalia)',
    leg_spec: 'Speculative (no anchor tenant)',
    leg_lit: 'Pending litigation',
    legend_hint: 'Marker radius scales with MW capacity (capped). Click for details.',
    download: 'Download dataset (JSON)',
    contribute: 'Contribute on GitHub',
    license_prefix: 'License:',
    about: 'About this project →',
    nav_trends: 'Trends & projections: 8 cited charts on electricity, water, heat, investment →',
    nav_timeline: '20-event timeline 2020→2026: PIGA, INAGA EIA exemption, Operación Perserte →',
    nav_munis: 'Six towns bearing the burden: La Puebla de Híjar (935 people, €5B campus) to Épila →',
    nav_types: 'Primer: what a datacenter is, six types, cooling, and the local heat impact →',
    nav_press: 'For press: headline numbers, quote-ready lines, CSV download →',
    nav_organize: 'Citizens & activists kit: how to research a project, file alegaciones, organise →',
    updated: 'Updated',

    agg_sites_dataset: 'Sites mapped (this dataset)',
    agg_ngo_sites: 'NGO-mapped projected sites',
    agg_projected_mw: 'Projected MW',
    agg_committed: 'Committed investment (Nov 2025)',
    agg_operational: 'Operational now',
    agg_share_2024: 'Share of regional electricity (2024)',
    agg_share_2030: 'Share projected 2030',
    agg_aws_energy: 'AWS aggregate energy (annual)',
    agg_aws_water_co: 'AWS water (company)',
    agg_aws_water_cr: 'AWS water (critics)',

    pop_operator: 'Operator:',
    pop_investment: 'Investment:',
    pop_capacity: 'Capacity:',
    pop_tenant: 'Tenant:',
    pop_view_full: 'View full record & sources',
    badge_spec: 'Speculative',
    badge_lit: 'Litigation/objections',
    badge_piga: 'PIGA',
    badge_tax: 'ICIO dispute',

    tenant_confirmed: 'Anchor tenant confirmed',
    tenant_prelet: 'Pre-let',
    tenant_spec: '⚠ Speculative (none disclosed)',
    tenant_unknown: '⚠ Unknown / not disclosed',

    sec_operator: 'Operator',
    sec_invest: 'Investment & timeline',
    sec_investors: 'Investors',
    sec_clients: 'Clients / Tenant',
    sec_tenant_status: 'Tenant status:',
    sec_energy: 'Energy',
    sec_ppas: 'PPAs',
    sec_water: 'Water',
    sec_permits: 'Permits',
    sec_expedited: 'Expedited / fast-track indicators',
    sec_icio: 'ICIO Tax Dispute',
    sec_env_flag: 'Environmental Impact Flag',
    sec_sources: 'Sources',

    tbl_operator: 'Operator',
    tbl_entity: 'Legal entity',
    tbl_type: 'Type',
    tbl_announced: 'Announced',
    tbl_operational: 'Operational',
    tbl_construction: 'Construction start',
    tbl_investment: 'Investment (€M)',
    tbl_investment_p1: 'Investment phase 1 (€M)',
    tbl_investment_full: 'Investment full (€M)',
    tbl_capacity: 'Capacity',
    tbl_capacity_init: 'Capacity initial',
    tbl_capacity_exp: 'Capacity expanded',
    tbl_site_demand: 'Site demand',
    tbl_grid: 'Grid connection',
    tbl_self: 'Self-consumption',
    tbl_aws_agg: 'AWS-Aragón aggregate',
    tbl_annual_m3: 'Annual m³',
    tbl_aws_agg_m3: 'AWS-Aragón aggregate m³',
    tbl_cooling: 'Cooling tech',
    tbl_water_body: 'Source water body',
    tbl_concession: 'CHE concession',
    tbl_storage: 'Storage reservoir',
    tbl_notes: 'Notes',
    not_confirmed: '(not confirmed)',
    source_link: '[source]',
    uses_piga_badge: 'Uses PIGA',
    icio_exempt_badge: 'ICIO exempt via PIGA',
    coords_precision: 'coords precision',
    status_label: 'status:'
  },
  es: {
    title: 'Mapa de Centros de Datos de Aragón',
    subtitle: 'Operadores, inversores, clientes, energía/agua, permisos administrativos — cada dato con su fuente.',
    regional_total: 'Total regional',
    filters: 'Filtros',
    speculative_only: 'Solo especulativos (sin cliente confirmado)',
    litigated_only: 'Solo con litigio o alegaciones',
    piga_only: 'Solo con PIGA (vía rápida)',
    high_risk_only: 'Solo con alto riesgo de vacancia',
    thermal_plume: 'Mostrar penacho térmico 500 m (ASME 2026)',
    plume_hint: 'Acércate a un sitio para ver el penacho térmico de 500 m a escala.',
    solar_footprint: 'Mostrar huella solar equivalente (a escala)',
    solar_hint: 'Cada cuadrado ámbar es la planta solar necesaria para abastecer la electricidad de ese sitio, dibujada a escala en el mapa. Supone factor de carga del CD 0,90, factor de capacidad solar en Aragón ~0,20, ~1,5 ha/MWp (NREL). Las cifras varían ~2× según estos supuestos.',
    water_eo: 'Mostrar estrés hídrico de la cuenca (Copernicus EDO)',
    water_eo_hint: 'Capa por observación de la Tierra (~5 km, actualizada cada 10 días). Contexto regional, no a escala del sitio. Las zonas sin color no están clasificadas actualmente: el Indicador Combinado de Sequía aparecerá vacío cuando no haya sequía activa. Pulsa un sitio para la lectura en directo en su ubicación.',
    water_eo_cdiad: 'Indicador Combinado de Sequía',
    water_eo_lfinx: 'Índice de Caudales Bajos (sequía fluvial)',
    water_eo_smian: 'Anomalía de Humedad del Suelo',
    edo_live_link: 'Estrés hídrico de la cuenca en directo en esta ubicación (Copernicus EDO) →',
    risk_label: 'Riesgo:',
    operators: 'Operadores',
    legend: 'Leyenda',
    leg_hyperscaler: 'Hyperscaler (AWS, Microsoft)',
    leg_pe: 'Capital privado / SOCIMI',
    leg_colo: 'Colocation',
    leg_ind: 'Independiente español',
    leg_renewable: 'Promotor renovable (Forestalia)',
    leg_spec: 'Especulativo (sin cliente)',
    leg_lit: 'Litigio pendiente',
    legend_hint: 'El tamaño del marcador refleja los MW (limitado). Pulsa para detalles.',
    download: 'Descargar datos (JSON)',
    contribute: 'Contribuir en GitHub',
    license_prefix: 'Licencia:',
    about: 'Sobre este proyecto →',
    nav_trends: 'Tendencias y proyecciones: 8 gráficos citados sobre electricidad, agua, calor, inversión →',
    nav_timeline: 'Cronología 20 hitos 2020→2026: PIGA, exención EIA INAGA, Operación Perserte →',
    nav_munis: 'Seis municipios que cargan con el peso: de La Puebla de Híjar (935 hab, €5.000 M) a Épila →',
    nav_types: 'Introducción: qué es un CD, seis tipos, refrigeración e impacto térmico local →',
    nav_press: 'Para prensa: cifras titulares, frases citables, descarga CSV →',
    nav_organize: 'Kit ciudadano y activista: cómo investigar, alegar y organizarse →',
    updated: 'Actualizado',

    agg_sites_dataset: 'Sitios mapeados (este conjunto)',
    agg_ngo_sites: 'Sitios proyectados (mapa ONG)',
    agg_projected_mw: 'MW proyectados',
    agg_committed: 'Inversión comprometida (nov 2025)',
    agg_operational: 'Operativos ahora',
    agg_share_2024: '% electricidad regional (2024)',
    agg_share_2030: '% proyectado 2030',
    agg_aws_energy: 'Energía AWS (anual)',
    agg_aws_water_co: 'Agua AWS (empresa)',
    agg_aws_water_cr: 'Agua AWS (críticos)',

    pop_operator: 'Operador:',
    pop_investment: 'Inversión:',
    pop_capacity: 'Capacidad:',
    pop_tenant: 'Cliente:',
    pop_view_full: 'Ver registro completo y fuentes',
    badge_spec: 'Especulativo',
    badge_lit: 'Litigio/alegaciones',
    badge_piga: 'PIGA',
    badge_tax: 'Disputa ICIO',

    tenant_confirmed: 'Cliente principal confirmado',
    tenant_prelet: 'Pre-arrendado',
    tenant_spec: '⚠ Especulativo (no divulgado)',
    tenant_unknown: '⚠ Desconocido / no divulgado',

    sec_operator: 'Operador',
    sec_invest: 'Inversión y calendario',
    sec_investors: 'Inversores',
    sec_clients: 'Clientes / Cliente principal',
    sec_tenant_status: 'Estado del cliente:',
    sec_energy: 'Energía',
    sec_ppas: 'PPAs',
    sec_water: 'Agua',
    sec_permits: 'Permisos',
    sec_expedited: 'Indicadores de vía rápida',
    sec_icio: 'Disputa fiscal ICIO',
    sec_env_flag: 'Alerta de impacto ambiental',
    sec_sources: 'Fuentes',

    tbl_operator: 'Operador',
    tbl_entity: 'Entidad legal',
    tbl_type: 'Tipo',
    tbl_announced: 'Anunciado',
    tbl_operational: 'Operativo',
    tbl_construction: 'Inicio construcción',
    tbl_investment: 'Inversión (€M)',
    tbl_investment_p1: 'Inversión fase 1 (€M)',
    tbl_investment_full: 'Inversión total (€M)',
    tbl_capacity: 'Capacidad',
    tbl_capacity_init: 'Capacidad inicial',
    tbl_capacity_exp: 'Capacidad ampliada',
    tbl_site_demand: 'Demanda del sitio',
    tbl_grid: 'Conexión a red',
    tbl_self: 'Autoconsumo',
    tbl_aws_agg: 'Total AWS-Aragón',
    tbl_annual_m3: 'm³ anuales',
    tbl_aws_agg_m3: 'Total AWS-Aragón m³',
    tbl_cooling: 'Refrigeración',
    tbl_water_body: 'Origen del agua',
    tbl_concession: 'Concesión CHE',
    tbl_storage: 'Depósito',
    tbl_notes: 'Notas',
    not_confirmed: '(sin confirmar)',
    source_link: '[fuente]',
    uses_piga_badge: 'Usa PIGA',
    icio_exempt_badge: 'Exento ICIO vía PIGA',
    coords_precision: 'precisión coords',
    status_label: 'estado:'
  }
};

const STATE = {
  data: null,
  layer: null,
  plumeLayer: null,
  solarLayer: null,
  waterEoTile: null,
  lang: localStorage.getItem('lang') || 'en',
  filters: {
    speculative: false,
    litigated: false,
    piga: false,
    high_risk: false,
    operators: new Set()
  },
  thermalPlume: false,
  solarFootprint: false,
  waterEo: false,
  waterEoLayer: 'smian' // default to Soil Moisture Anomaly — reliably has data over Aragón,
                        // unlike the Combined Drought Indicator which is blank when no drought
};

// Waste-heat helper. Given MW, returns TJ/year rejected (1st-law assumption: nearly all electricity → heat).
// TJ/year = MW × 8760 h × 3.6 (GJ per MWh) / 1000 (GJ per TJ)
function wasteHeatTJ(mw) {
  if (!mw) return null;
  return mw * 8760 * 3.6 / 1000;
}

function t(key) { return I18N[STATE.lang][key] || key; }

// Per-field translation: picks obj[field + '_' + lang], falls back to obj[field + '_en'], then obj[field].
function txt(obj, field) {
  if (!obj) return '';
  const lang = STATE.lang;
  return obj[field + '_' + lang] || obj[field + '_en'] || obj[field] || '';
}

const ENUM_T = {
  status: {
    en: { operational: 'operational', under_construction: 'under construction', permitted: 'permitted', announced: 'announced', exploratory: 'exploratory', withdrawn: 'withdrawn' },
    es: { operational: 'operativo', under_construction: 'en construcción', permitted: 'autorizado', announced: 'anunciado', exploratory: 'exploratorio', withdrawn: 'retirado' }
  },
  operator_type: {
    en: { hyperscaler: 'hyperscaler', colocation_reit: 'colocation / REIT', spanish_independent: 'Spanish independent', private_equity: 'private equity', renewable_developer: 'renewable developer', speculative_developer: 'speculative developer' },
    es: { hyperscaler: 'hyperscaler', colocation_reit: 'colocation / SOCIMI', spanish_independent: 'independiente español', private_equity: 'capital privado', renewable_developer: 'promotor renovable', speculative_developer: 'promotor especulativo' }
  },
  coords_precision: {
    en: {
      town_centroid: 'town centroid',
      walqa_park_approx: 'Walqa park (approx)',
      centrovia_park_approx: 'Centrovía park (approx)',
      puerto_venecia_area: 'Puerto Venecia area',
      zaragoza_area: 'Zaragoza area',
      magallon_substation_approx: 'Magallón substation (approx)',
      site_exact: 'exact site location',
      estimated: 'estimated'
    },
    es: {
      town_centroid: 'centroide del municipio',
      walqa_park_approx: 'parque Walqa (aprox)',
      centrovia_park_approx: 'parque Centrovía (aprox)',
      puerto_venecia_area: 'zona Puerto Venecia',
      zaragoza_area: 'zona Zaragoza',
      magallon_substation_approx: 'subestación Magallón (aprox)',
      site_exact: 'ubicación exacta',
      estimated: 'estimado'
    }
  }
};

function enumT(field, value) {
  if (!value) return '';
  const dict = (ENUM_T[field] && ENUM_T[field][STATE.lang]) || (ENUM_T[field] && ENUM_T[field].en) || {};
  return dict[value] || value;
}

// Vacancy-risk score: 0-12 across 4 factors, mapped to Low/Medium/High.
// The score reflects the probability the site ends up under-tenanted or stranded.
// Factors are deliberately simple and traceable so the number is defensible.
function computeRisk(s) {
  var factors = { en: [], es: [] };
  var score = 0;

  // 1. Tenant status (0-4)
  if (s.tenant_status === 'speculative') { score += 4; factors.en.push('no anchor tenant'); factors.es.push('sin cliente principal'); }
  else if (s.tenant_status === 'unknown') { score += 3; factors.en.push('tenant undisclosed'); factors.es.push('cliente no divulgado'); }
  else if (s.tenant_status === 'pre_let') { score += 1; factors.en.push('pre-let (partial)'); factors.es.push('pre-arrendado (parcial)'); }

  // 2. Operator type (0-3)
  if (s.operator_type === 'renewable_developer') { score += 3; factors.en.push('renewable developer, no DC operating history'); factors.es.push('promotor renovable sin experiencia CD'); }
  else if (s.operator_type === 'spanish_independent') { score += 2; factors.en.push('independent Spanish developer'); factors.es.push('promotor español independiente'); }
  else if (s.operator_type === 'private_equity') { score += 1; factors.en.push('PE-backed'); factors.es.push('respaldado por capital privado'); }

  // 3. Grid connection status (0-3)
  var gridText = ((s.energy && s.energy.grid_connection) || '').toLowerCase();
  if (gridText.includes('guaranteed') || gridText.includes('energised') || gridText.includes('energized')) {
    // no penalty
  } else if (gridText.includes('tbd') || gridText === '' || gridText.includes('unknown') || gridText.includes('nudo')) {
    score += 2; factors.en.push('grid connection status unclear'); factors.es.push('conexión a red incierta');
  } else if (gridText.includes('queued') || gridText.includes('pending')) {
    score += 3; factors.en.push('grid capacity queued'); factors.es.push('capacidad de red en cola');
  } else {
    score += 1; factors.en.push('grid connection partial'); factors.es.push('conexión a red parcial');
  }

  // 4. Project status (0-2, or override on operational/withdrawn)
  if (s.status === 'operational') { score = Math.max(0, score - 2); factors.en.push('operational (reduces risk)'); factors.es.push('operativo (reduce riesgo)'); }
  else if (s.status === 'withdrawn') { score = 12; factors.en = ['WITHDRAWN — thesis validated']; factors.es = ['RETIRADO — tesis validada']; }
  else if (s.status === 'announced') { score += 2; factors.en.push('only announced, no permits'); factors.es.push('solo anunciado, sin permisos'); }
  else if (s.status === 'permitted') { score += 1; factors.en.push('permitted, not built'); factors.es.push('autorizado, no construido'); }

  score = Math.max(0, Math.min(12, score));

  var level, colorKey;
  if (score <= 3) { level = { en: 'Low', es: 'Bajo' }; colorKey = 'low'; }
  else if (score <= 7) { level = { en: 'Medium', es: 'Medio' }; colorKey = 'medium'; }
  else { level = { en: 'High', es: 'Alto' }; colorKey = 'high'; }

  return {
    score: score,
    level: level[STATE.lang] || level.en,
    factors: factors[STATE.lang] || factors.en,
    colorKey: colorKey
  };
}

var RISK_COLORS = { low: '#2da44e', medium: '#b87a00', high: '#cf222e' };

// Format investment € in millions. Always shows millions — the rawness of a
// figure like "€33,700 M" carries scale better than the more abstract "€33.7 B".
function fmtEur(millions) {
  if (millions == null) return '—';
  const locale = STATE.lang === 'es' ? 'es-ES' : 'en-US';
  return '€' + millions.toLocaleString(locale) + ' M';
}

const map = L.map('map', { preferCanvas: true }).setView([41.65, -0.9], 8);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

// The plume circle rescales natively with zoom; we only need to refresh the
// "zoom in to see the footprint" hint as the zoom level crosses the threshold.
map.on('zoomend', updatePlumeHint);

fetch('data/datacenters.json')
  .then(r => r.json())
  .then(data => {
    STATE.data = data;
    initLangButtons();
    renderAll();
    wireFilters();
  })
  .catch(err => {
    console.error('Failed to load dataset', err);
    document.getElementById('map').innerHTML = `<div style="padding:24px;color:#f85149">Could not load dataset: ${err.message}. Serve this folder over HTTP (file:// blocks fetch).</div>`;
  });

function initLangButtons() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      STATE.lang = btn.dataset.lang;
      localStorage.setItem('lang', STATE.lang);
      renderAll();
    });
  });
}

function renderAll() {
  // Active button styling
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === STATE.lang);
  });
  document.documentElement.lang = STATE.lang;

  applyStaticTranslations();
  renderAggregate(STATE.data);
  buildOperatorFilters(STATE.data);
  document.getElementById('last-updated').textContent = `${t('updated')} ${STATE.data.last_updated} — v${STATE.data.version}`;
  renderMarkers();
}

function applyStaticTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
}

function renderAggregate(d) {
  const a = d.aggregate;
  const dl = document.getElementById('aggregate-stats');
  const fmt = (n) => n == null ? '—' : n.toLocaleString(STATE.lang === 'es' ? 'es-ES' : 'en-US');
  dl.innerHTML = `
    <dt>${t('agg_sites_dataset')}</dt><dd>${d.sites.length}</dd>
    <dt>${t('agg_ngo_sites')}</dt><dd>${fmt(a.ngo_mapped_sites)}</dd>
    <dt>${t('agg_projected_mw')}</dt><dd>${fmt(a.ngo_mapped_total_mw)} MW</dd>
    <dt>${t('agg_committed')}</dt><dd>${fmtEur(a.official_commitment_eur_million_nov2025)}</dd>
    <dt>${t('agg_operational')}</dt><dd>${fmt(a.currently_operational_sites)} / ${fmt(a.currently_operational_mw)} MW</dd>
    <dt>${t('agg_share_2024')}</dt><dd>${fmt(a.current_share_regional_electricity_pct)}%</dd>
    <dt>${t('agg_share_2030')}</dt><dd>${fmt(a.projected_2030_share_pct)}% / ${fmt(a.projected_2030_demand_twh)} TWh</dd>
    <dt>${t('agg_aws_energy')}</dt><dd>${fmt(a.aws_aggregate_energy_gwh_year)} GWh</dd>
    <dt>${t('agg_aws_water_co')}</dt><dd>${fmt(a.aws_aggregate_water_m3_year_company)} m³</dd>
    <dt>${t('agg_aws_water_cr')}</dt><dd>${fmt(a.aws_aggregate_water_critics_hm3_year)} hm³</dd>
  `;
}

function buildOperatorFilters(d) {
  const ops = [...new Set(d.sites.map(s => s.operator))].sort();
  if (STATE.filters.operators.size === 0) STATE.filters.operators = new Set(ops);
  const wrap = document.getElementById('operator-filters');
  wrap.innerHTML = `<h3 class="op-h">${t('operators')}</h3>` +
    ops.map(o => `<label><input type="checkbox" data-op="${o}" ${STATE.filters.operators.has(o) ? 'checked' : ''}> ${o}</label>`).join('');
  wrap.querySelectorAll('input[type=checkbox]').forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) STATE.filters.operators.add(cb.dataset.op);
      else STATE.filters.operators.delete(cb.dataset.op);
      renderMarkers();
    });
  });
}

function wireFilters() {
  document.getElementById('f-speculative').addEventListener('change', e => { STATE.filters.speculative = e.target.checked; renderMarkers(); });
  document.getElementById('f-litigated').addEventListener('change', e => { STATE.filters.litigated = e.target.checked; renderMarkers(); });
  document.getElementById('f-piga').addEventListener('change', e => { STATE.filters.piga = e.target.checked; renderMarkers(); });
  var hr = document.getElementById('f-high-risk');
  if (hr) hr.addEventListener('change', e => { STATE.filters.high_risk = e.target.checked; renderMarkers(); });
  var tp = document.getElementById('f-thermal-plume');
  if (tp) tp.addEventListener('change', e => { STATE.thermalPlume = e.target.checked; renderMarkers(); });
  var sf = document.getElementById('f-solar-footprint');
  if (sf) sf.addEventListener('change', e => { STATE.solarFootprint = e.target.checked; renderMarkers(); });
  var we = document.getElementById('f-water-eo');
  if (we) we.addEventListener('change', e => { STATE.waterEo = e.target.checked; updateWaterOverlay(); });
  var wel = document.getElementById('water-eo-layer');
  if (wel) wel.addEventListener('change', e => { STATE.waterEoLayer = e.target.value; updateWaterOverlay(); });

  const dialog = document.getElementById('site-dialog');
  document.getElementById('dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
}

function sitePassesFilters(s) {
  if (!STATE.filters.operators.has(s.operator)) return false;
  if (STATE.filters.speculative && !s.speculative) return false;
  if (STATE.filters.litigated && !hasLitigation(s)) return false;
  if (STATE.filters.piga && !usesPiga(s)) return false;
  if (STATE.filters.high_risk) {
    var r = computeRisk(s);
    if (r.colorKey !== 'high') return false;
  }
  return true;
}

function hasLitigation(s) {
  const ei = s.expedited_indicators || {};
  return (Array.isArray(ei.litigation) && ei.litigation.length > 0)
      || !!ei.tax_dispute
      || !!ei.environmental_impact_flag
      || !!ei.scandal;
}

function usesPiga(s) {
  return s.expedited_indicators && s.expedited_indicators.uses_piga === true;
}

function radiusForSite(s) {
  const mw = s.capacity_mw || s.capacity_mw_expanded || s.capacity_mw_max || s.energy?.site_demand_mw || s.capacity_mw_msft_aragon_total;
  if (!mw) return 7;
  return Math.min(28, 6 + Math.sqrt(mw) * 0.9);
}

// Thermal plume: the true-to-scale 500 m downwind warming footprint (ASME 2026).
// It's a genuinely local effect — at region zoom 500 m is ~1 px, so rather than fake
// its size we keep it strictly to-scale (L.circle rescales natively with zoom) and show
// a "zoom in" hint while the current zoom is too low for the footprint to read.
const PLUME_METERS = 500;
const PLUME_LEGIBLE_ZOOM = 11; // at/above this zoom the 500 m circle is clearly visible

function renderPlume() {
  if (STATE.plumeLayer) STATE.plumeLayer.remove();
  STATE.plumeLayer = L.layerGroup();
  if (!STATE.thermalPlume) { updatePlumeHint(); return; }

  STATE.data.sites.filter(sitePassesFilters).forEach(s => {
    L.circle([s.lat, s.lon], {
      radius: PLUME_METERS,
      fillColor: '#f85149',
      fillOpacity: 0.14,
      color: '#cf222e',
      weight: 1,
      opacity: 0.45,
      interactive: false
    }).addTo(STATE.plumeLayer);
  });

  STATE.plumeLayer.addTo(map);
  updatePlumeHint();
}

// Show a hint while the plume is on but the zoom is too low to see 500 m to scale.
let plumeHintCtl = null;
function updatePlumeHint() {
  const show = STATE.thermalPlume && map.getZoom() < PLUME_LEGIBLE_ZOOM;
  if (!show) {
    if (plumeHintCtl) { plumeHintCtl.remove(); plumeHintCtl = null; }
    return;
  }
  if (!plumeHintCtl) {
    plumeHintCtl = L.control({ position: 'bottomleft' });
    plumeHintCtl.onAdd = () => {
      const div = L.DomUtil.create('div', 'plume-hint');
      div.textContent = t('plume_hint');
      return div;
    };
    plumeHintCtl.addTo(map);
  } else {
    plumeHintCtl.getContainer().textContent = t('plume_hint'); // refresh after lang switch
  }
}

// ── Equivalent renewable footprint ─────────────────────────────────────────────
// The land a solar farm needs to supply a site's electricity, drawn to scale on the map
// so "how many km² to power this" is legible at a glance. Assumptions are explicit and
// swappable (results scale ~2× with them), in the same spirit as the water dual-numbers:
//   DC load factor 0.90 · Aragón utility-solar capacity factor ~0.20 · ~1.5 ha/MWp (NREL).
const DC_LOAD_FACTOR = 0.90;
const SOLAR_CAPACITY_FACTOR = 0.20;
const SOLAR_HA_PER_MWP = 1.5;

function siteMW(s) {
  return s.capacity_mw || s.capacity_mw_expanded || s.capacity_mw_max || s.energy?.site_demand_mw || s.capacity_mw_msft_aragon_total || null;
}

// Solar land area (km²) to match a site's continuous electricity demand.
function solarFootprintKm2(s) {
  const mw = siteMW(s);
  if (!mw) return null;
  const solarMwp = mw * DC_LOAD_FACTOR / SOLAR_CAPACITY_FACTOR;
  return solarMwp * SOLAR_HA_PER_MWP / 100; // ha → km²
}

function renderSolarFootprint() {
  if (STATE.solarLayer) STATE.solarLayer.remove();
  STATE.solarLayer = L.layerGroup();
  const totalEl = document.getElementById('solar-total');
  if (!STATE.solarFootprint) { if (totalEl) totalEl.textContent = ''; return; }

  let total = 0;
  STATE.data.sites.filter(sitePassesFilters).forEach(s => {
    const km2 = solarFootprintKm2(s);
    if (!km2) return;
    total += km2;
    const halfM = Math.sqrt(km2 * 1e6) / 2;                       // half-side of the square, metres
    const dLat = halfM / 111320;
    const dLon = halfM / (111320 * Math.cos(s.lat * Math.PI / 180));
    L.rectangle([[s.lat - dLat, s.lon - dLon], [s.lat + dLat, s.lon + dLon]], {
      fillColor: '#e3b341',
      fillOpacity: 0.20,
      color: '#d29922',
      weight: 1,
      opacity: 0.7,
      interactive: false
    }).addTo(STATE.solarLayer);
  });
  STATE.solarLayer.addTo(map);

  if (totalEl) {
    const km2 = Math.round(total);
    const pct = (total / 973 * 100).toFixed(0); // Zaragoza municipality ≈ 973 km²
    totalEl.textContent = STATE.lang === 'es'
      ? `Sitios mostrados ≈ ${km2.toLocaleString('es-ES')} km² de solar — ${pct} % del municipio de Zaragoza.`
      : `Sites shown ≈ ${km2.toLocaleString('en-US')} km² of solar — ${pct}% of Zaragoza municipality.`;
  }
}

// ── Water-resources context (Copernicus European Drought Observatory) ──────────
// A live, always-current WMS overlay of basin water stress — no data is stored, so it
// can never go stale. Per-site "data join" is a deep link (below), not a frozen number:
// EDO's public /api/wms is display-only (GetFeatureInfo returns "Invalid request type"),
// so we hand off to their live map rather than fetch and cache a value that would age.
const EDO_WMS = 'https://drought.emergency.copernicus.eu/api/wms';
const EDO_ATTR = 'Water stress: &copy; European Drought Observatory (JRC/Copernicus)';
// Per-layer quirks of EDO's /api/wms (all verified against the live endpoint, 2026-07):
//  - needsTime: rejects a defaulted request; requires an explicit 10-daily TIME.
//  - crs: served only in EPSG:4326 (not the map's 3857), so request it in that CRS —
//    Leaflet handles a WMS layer whose CRS differs from the map's.
const EDO_LAYERS = {
  cdiad: { needsTime: false },                            // Combined Drought Indicator (latest by default, 3857 ok)
  smian: { needsTime: false },                            // Soil Moisture Index Anomaly (3857 ok)
  lfinx_300_sms: { needsTime: true, crs: L.CRS.EPSG4326 } // Low-Flow Index (river drought) — 4326 + TIME only
};

// Latest EDO 10-daily reference date ('YYYY-MM-DD'). Data publishes for the 1st/11th/21st
// with a few days' lag; back off 12 days from today, then snap down to 1/11/21.
function latestEdoDate() {
  const d = new Date(Date.now() - 12 * 864e5);
  const snapped = d.getDate() >= 21 ? 21 : d.getDate() >= 11 ? 11 : 1;
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${String(snapped).padStart(2, '0')}`;
}

function updateWaterOverlay() {
  if (STATE.waterEoTile) { STATE.waterEoTile.remove(); STATE.waterEoTile = null; }
  if (!STATE.waterEo) return;
  const code = EDO_LAYERS[STATE.waterEoLayer] ? STATE.waterEoLayer : 'cdiad';
  const cfg = EDO_LAYERS[code];
  const wmsOpts = {
    layers: code,
    version: '1.1.1',
    format: 'image/png',
    opacity: 0.55,
    attribution: EDO_ATTR
  };
  if (cfg.crs) wmsOpts.crs = cfg.crs; // layer served in a CRS other than the map's
  const layer = L.tileLayer.wms(EDO_WMS, wmsOpts);
  // EDO's /api/wms is strict and non-standard: it rejects any STYLES param and requires
  // the TRANSPARENT value uppercase. Leaflet's defaults (styles='', transparent=true) would
  // 400 every tile, so patch wmsParams before the layer requests anything. Verified against
  // the live endpoint (2026-07): only `transparent=TRUE`, no `styles`, format=image/png works.
  delete layer.wmsParams.styles;
  layer.wmsParams.transparent = 'TRUE';
  if (cfg.needsTime) layer.wmsParams.TIME = latestEdoDate();
  // Renders in the tile pane, beneath the markers and plume in the overlay pane.
  STATE.waterEoTile = layer.addTo(map);
}

// Deep link to the live EDO map centred on a site. Hash-based permalink; if the format
// drifts it still lands on the current EDO map (correct live context, just not pre-centred).
function edoDeepLink(lat, lon) {
  return `https://drought.emergency.copernicus.eu/tumbo/edo/map/#x=${lon.toFixed(4)}&y=${lat.toFixed(4)}&z=9`;
}

function renderMarkers() {
  if (STATE.layer) STATE.layer.remove();
  STATE.layer = L.layerGroup();

  // Plume and solar footprints render first so they sit beneath the site markers.
  renderPlume();
  renderSolarFootprint();

  STATE.data.sites.filter(sitePassesFilters).forEach(s => {
    const color = COLORS[s.operator_type] || '#888';
    const marker = L.circleMarker([s.lat, s.lon], {
      radius: radiusForSite(s),
      fillColor: color,
      color: hasLitigation(s) ? '#f85149' : (s.speculative ? '#f85149' : color),
      weight: hasLitigation(s) ? 3 : (s.speculative ? 2 : 1),
      opacity: 1,
      fillOpacity: s.status === 'withdrawn' ? 0.15 : 0.65,
      dashArray: hasLitigation(s) ? '4,3' : null
    });
    marker.bindPopup(popupHtml(s));
    marker.on('popupopen', () => {
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
  var risk = computeRisk(s);
  badges.push(`<span class="badge risk" style="background:${RISK_COLORS[risk.colorKey]};color:#fff;">${t('risk_label')} ${risk.level}</span>`);
  if (s.speculative) badges.push(`<span class="badge spec">${t('badge_spec')}</span>`);
  if (hasLitigation(s)) badges.push(`<span class="badge lit">${t('badge_lit')}</span>`);
  if (usesPiga(s)) badges.push(`<span class="badge piga">${t('badge_piga')}</span>`);
  if (s.expedited_indicators?.tax_dispute) badges.push(`<span class="badge tax">${t('badge_tax')}</span>`);
  if (s.status === 'withdrawn') badges.push(`<span class="badge spec">${STATE.lang === 'es' ? 'Retirado' : 'Withdrawn'}</span>`);

  return `
    <h3>${s.site_name}</h3>
    <div class="meta">${s.municipality}, ${s.province} · ${enumT('status', s.status)}</div>
    <div>${badges.join(' ')}</div>
    <p style="margin:6px 0;">
      <strong>${t('pop_operator')}</strong> ${s.operator}<br>
      ${inv ? `<strong>${t('pop_investment')}</strong> ${fmtEur(inv)}<br>` : ''}
      ${mw ? `<strong>${t('pop_capacity')}</strong> ${mw} MW<br>` : ''}
      <strong>${t('pop_tenant')}</strong> ${formatTenant(s)}
    </p>
    <button class="more-btn">${t('pop_view_full')}</button>
  `;
}

function formatTenant(s) {
  switch (s.tenant_status) {
    case 'anchor_tenant_confirmed': return t('tenant_confirmed');
    case 'pre_let': return t('tenant_prelet');
    case 'speculative': return t('tenant_spec');
    case 'unknown': return t('tenant_unknown');
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
  var risk = computeRisk(s);
  const lit = (ei.litigation || []).map(l => `
    <li>${l.plaintiff || l.objectors || l.stage || 'Action'} — ${l.court || ''} ${l.filed || l.filed_year || ''}
      ${l.note ? '<em>' + l.note + '</em>' : ''}
      ${l.source ? `<a class="cite" href="${l.source}" target="_blank">${t('source_link')}</a>` : ''}
    </li>
  `).join('');

  const scandal = ei.scandal ? `
    <h3>${STATE.lang === 'es' ? 'Caso judicial / investigación' : 'Criminal investigation'}</h3>
    <p class="warning"><strong>${ei.scandal.name}</strong> — ${txt(ei.scandal, 'description')}
    ${ei.scandal.source ? `<a class="cite" href="${ei.scandal.source}" target="_blank">${t('source_link')}</a>` : ''}</p>
  ` : '';

  const permits = (s.permits || []).map(p => `
    <li>
      <strong>${p.type}</strong>${p.name ? ' — ' + p.name : ''}
      ${p.approval_date ? ' · ' + p.approval_date : ''}
      ${p.expediente_range || p.expediente ? ' · expediente ' + (p.expediente_range || p.expediente) : ''}
      ${p.boa_reference || p.boa_ref ? ' · BOA ' + (p.boa_reference || p.boa_ref) : ''}
      ${p.source || p.url ? `<a class="cite" href="${p.source || p.url}" target="_blank">${t('source_link')}</a>` : ''}
    </li>
  `).join('');

  const ppas = (s.energy?.ppas || []).map(p => `
    <li>${p.counterparty} — ${p.volume_mw} MW ${p.sources ? '(' + p.sources + ')' : ''} ${p.year ? '· ' + p.year : ''}
      ${p.source ? `<a class="cite" href="${p.source}" target="_blank">${t('source_link')}</a>` : ''}
    </li>
  `).join('');

  const sources = (s.sources || []).map(u => `<li><a href="${u}" target="_blank">${u}</a></li>`).join('');
  const investors = (s.investors || []).map(i => `<li>${i.name} — <em>${i.role}</em> (${i.type})</li>`).join('');
  const clients = (s.clients || []).map(c => `<li>${c.name}${c.confirmed === false ? ' <span class="warning">' + t('not_confirmed') + '</span>' : ''}${c.note ? ' — ' + c.note : ''}</li>`).join('');

  const taxBlock = ei.tax_dispute ? `
    <h3>${t('sec_icio')}</h3>
    <p>${ei.tax_dispute.type}: <strong>€${ei.tax_dispute.amount_eur_million}M</strong> — ${ei.tax_dispute.municipality} — ${ei.tax_dispute.status}
    ${ei.tax_dispute.source ? `<a class="cite" href="${ei.tax_dispute.source}" target="_blank">${t('source_link')}</a>` : ''}</p>
  ` : '';

  const envBlock = ei.environmental_impact_flag ? `
    <h3>${t('sec_env_flag')}</h3>
    <p class="warning">${txt(ei.environmental_impact_flag, 'issue')}
    ${ei.environmental_impact_flag.source ? `<a class="cite" href="${ei.environmental_impact_flag.source}" target="_blank">${t('source_link')}</a>` : ''}</p>
  ` : '';

  const eiaExemptBlock = ei.eia_exemption ? `
    <h3>${STATE.lang === 'es' ? 'Exención EIA' : 'EIA exemption'}</h3>
    <p class="warning">${txt(ei, 'eia_exemption')}
    ${ei.eia_exemption_source ? `<a class="cite" href="${ei.eia_exemption_source}" target="_blank">${t('source_link')}</a>` : ''}</p>
  ` : '';

  const water = s.water ? `
    <h3>${t('sec_water')}</h3>
    <table>
      ${s.water.annual_m3 ? `<tr><th>${t('tbl_annual_m3')}</th><td>${typeof s.water.annual_m3 === 'number' ? s.water.annual_m3.toLocaleString() : s.water.annual_m3}</td></tr>` : ''}
      ${s.water.cooling_tech ? `<tr><th>${t('tbl_cooling')}</th><td>${s.water.cooling_tech}</td></tr>` : ''}
      ${s.water.source_water_body ? `<tr><th>${t('tbl_water_body')}</th><td>${s.water.source_water_body}</td></tr>` : ''}
      ${s.water.concession_che_expediente ? `<tr><th>${t('tbl_concession')}</th><td>${s.water.concession_che_expediente}</td></tr>` : ''}
      ${s.water.storage_reservoir_m3 ? `<tr><th>${t('tbl_storage')}</th><td>${s.water.storage_reservoir_m3.toLocaleString()} m³</td></tr>` : ''}
      ${s.water.negotiation || s.water.negotiation_es ? `<tr><th>${t('tbl_notes')}</th><td>${txt(s.water, 'negotiation')}</td></tr>` : ''}
      ${s.water.vdg_specific || s.water.vdg_specific_es ? `<tr><th>${t('tbl_notes')}</th><td>${txt(s.water, 'vdg_specific')}</td></tr>` : ''}
    </table>
  ` : '';

  // Live basin water-stress context for every site (not just those with a water block).
  const waterContext = (s.lat != null && s.lon != null) ? `
    <p class="water-eo-link"><a href="${edoDeepLink(s.lat, s.lon)}" target="_blank" rel="noopener">${t('edo_live_link')}</a></p>
  ` : '';

  const phaseNotes = txt(s, 'phase_notes');
  const specReasoning = txt(s, 'speculative_reasoning');
  return `
    <h2>${s.site_name}</h2>
    <p class="cite">${s.municipality}, ${s.province} · ${t('status_label')} <strong>${enumT('status', s.status)}</strong> · ${t('coords_precision')}: ${enumT('coords_precision', s.coords_precision) || 'n/a'}</p>
    ${phaseNotes ? `<p>${phaseNotes}</p>` : ''}

    <h3>${t('sec_operator')}</h3>
    <table>
      <tr><th>${t('tbl_operator')}</th><td>${s.operator}</td></tr>
      <tr><th>${t('tbl_entity')}</th><td>${s.operator_entity || '—'}</td></tr>
      <tr><th>${t('tbl_type')}</th><td>${enumT('operator_type', s.operator_type)}</td></tr>
    </table>

    <h3>${t('sec_invest')}</h3>
    <table>
      ${s.first_announced ? `<tr><th>${t('tbl_announced')}</th><td>${s.first_announced}</td></tr>` : ''}
      ${s.operational_date ? `<tr><th>${t('tbl_operational')}</th><td>${s.operational_date}</td></tr>` : ''}
      ${s.construction_start ? `<tr><th>${t('tbl_construction')}</th><td>${s.construction_start}</td></tr>` : ''}
      ${s.investment_eur_million ? `<tr><th>${t('tbl_investment')}</th><td>${fmtEur(s.investment_eur_million)}</td></tr>` : ''}
      ${s.investment_eur_million_phase1 ? `<tr><th>${t('tbl_investment_p1')}</th><td>${fmtEur(s.investment_eur_million_phase1)}</td></tr>` : ''}
      ${s.investment_eur_million_full ? `<tr><th>${t('tbl_investment_full')}</th><td>${fmtEur(s.investment_eur_million_full)}</td></tr>` : ''}
      ${s.capacity_mw ? `<tr><th>${t('tbl_capacity')}</th><td>${s.capacity_mw} MW</td></tr>` : ''}
      ${s.capacity_mw_initial ? `<tr><th>${t('tbl_capacity_init')}</th><td>${s.capacity_mw_initial} MW</td></tr>` : ''}
      ${s.capacity_mw_expanded ? `<tr><th>${t('tbl_capacity_exp')}</th><td>${s.capacity_mw_expanded} MW</td></tr>` : ''}
    </table>

    <h3>${t('sec_investors')}</h3>
    <ul>${investors || '<li>—</li>'}</ul>

    <h3>${t('sec_clients')}</h3>
    <ul>${clients || '<li>—</li>'}</ul>
    <p><strong>${t('sec_tenant_status')}</strong> ${formatTenant(s)} ${s.speculative ? `<span class="badge spec">${t('badge_spec')}</span>` : ''}</p>
    ${specReasoning ? `<p class="cite"><em>${specReasoning}</em></p>` : ''}

    <h3>${t('sec_energy')}</h3>
    <table>
      ${s.energy?.site_demand_mw ? `<tr><th>${t('tbl_site_demand')}</th><td>${s.energy.site_demand_mw} MW</td></tr>` : ''}
      ${s.energy?.grid_connection ? `<tr><th>${t('tbl_grid')}</th><td>${s.energy.grid_connection}</td></tr>` : ''}
      ${s.energy?.self_consumption_pct ? `<tr><th>${t('tbl_self')}</th><td>${s.energy.self_consumption_pct}%</td></tr>` : ''}
      ${s.energy?.aws_aragon_aggregate_demand_gwh_year ? `<tr><th>${t('tbl_aws_agg')}</th><td>${s.energy.aws_aragon_aggregate_demand_gwh_year.toLocaleString()} GWh/yr</td></tr>` : ''}
    </table>
    ${ppas ? `<h3>${t('sec_ppas')}</h3><ul>${ppas}</ul>` : ''}

    ${water}
    ${waterContext}

    <h3>${t('sec_permits')}</h3>
    <ul>${permits || '<li>—</li>'}</ul>

    <h3>${STATE.lang === 'es' ? 'Calor residual estimado' : 'Estimated waste heat'}</h3>
    <p>${(function () {
      var mw = s.capacity_mw || s.capacity_mw_initial || s.capacity_mw_max || s.capacity_mw_expanded || (s.energy && s.energy.site_demand_mw);
      var tj = wasteHeatTJ(mw);
      if (!tj) return STATE.lang === 'es' ? '<em>No se ha divulgado el MW del sitio; el calor residual anual no se puede calcular.</em>' : '<em>Site MW not disclosed; annual waste heat not computable.</em>';
      var mwhy = mw * 8760;
      return (STATE.lang === 'es'
        ? '≈ <strong>' + Math.round(tj).toLocaleString('es-ES') + ' TJ/año</strong> (' + Math.round(mwhy).toLocaleString('es-ES') + ' MWh) rechazados como calor. Prácticamente toda la electricidad de un centro de datos sale como calor (primera ley de la termodinámica). Un estudio revisado por pares (ASME 2026) ha medido un calentamiento a sotavento de 0,7 a 2,2°C hasta 500 m del perímetro.'
        : '≈ <strong>' + Math.round(tj).toLocaleString('en-US') + ' TJ/yr</strong> (' + Math.round(mwhy).toLocaleString('en-US') + ' MWh) rejected as heat. Essentially all electricity into a datacenter comes out as heat (first law of thermodynamics). Peer-reviewed research (ASME 2026) has measured 0.7–2.2°C downwind warming up to 500 m from the perimeter.');
    })()}</p>

    <h3>${STATE.lang === 'es' ? 'Puntuación de riesgo de vacancia' : 'Vacancy risk score'}</h3>
    <p>
      <span class="badge risk" style="background:${RISK_COLORS[risk.colorKey]};color:#fff;">${risk.level} (${risk.score}/12)</span>
    </p>
    <ul>${risk.factors.map(function (f) { return '<li>' + f + '</li>'; }).join('') || '<li>—</li>'}</ul>
    <p class="cite"><em>${STATE.lang === 'es' ? 'Cuatro factores: cliente principal, tipo de operador, estado de conexión a red y fase del proyecto. Cada uno de 0 a 3 puntos. Ver methodology en /about.html.' : 'Four factors: anchor tenant, operator type, grid connection status, project phase. Each 0–3 points. See methodology in /about.html.'}</em></p>

    <h3>${t('sec_expedited')}</h3>
    <p>
      ${ei.uses_piga === true ? `<span class="badge piga">${t('uses_piga_badge')}</span>` : ''}
      ${ei.icio_exempt_via_piga ? `<span class="badge tax">${t('icio_exempt_badge')}</span>` : ''}
    </p>
    ${lit ? `<ul>${lit}</ul>` : ''}
    ${taxBlock}
    ${envBlock}
    ${eiaExemptBlock}
    ${scandal}

    <h3>${t('sec_sources')}</h3>
    <ul>${sources || '<li>—</li>'}</ul>
  `;
}
