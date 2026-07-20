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
    map_layers: 'Map layers',
    nav_explore: 'Explore the project',
    how_to_read: 'How to read this map',
    htr_dot: 'Each dot is a datacenter project. Colour = operator type (see Legend).',
    htr_size: 'Dot size = power capacity (MW) — bigger dot, more power.',
    htr_ring: 'Red ring = speculative (no confirmed tenant). Dashed red = litigation or objections.',
    htr_layers: 'Map layers add context: a 500 m heat plume, the equivalent solar-farm footprint, and NASA soil moisture.',
    htr_cluster: 'Overlapping sites group into a numbered blue circle — click it to fan them out.',
    htr_click: 'Click any dot for the full, cited record and its sources.',
    htr_flags: 'Watch the badges: PIGA fast-track, ICIO tax dispute, and litigation.',
    leg_size: 'Dot size = capacity (MW)',
    tour_start: '▶ Take the tour',
    tour_prev: 'Back',
    tour_next: 'Next',
    tour_done: 'Done',
    speculative_only: 'Speculative only (no confirmed tenant)',
    litigated_only: 'Litigation or alegaciones only',
    piga_only: 'Uses PIGA fast-track only',
    high_risk_only: 'High vacancy risk only',
    thermal_plume: 'Show 500 m thermal plume (ASME 2026)',
    plume_hint: 'Zoom in to a site to see the 500 m thermal footprint to scale.',
    solar_footprint: 'Solar-equivalent land footprint (illustrative)',
    solar_hint: 'Illustrative, not the site’s actual supply: the land a solar farm alone would need to match this site’s electricity, drawn to scale. Most projects actually use a mix of solar and wind PPAs — wind needs far more spacing but far less built-up land. Assumes load factor 0.90, Aragón solar capacity factor ~0.20, ~1.5 ha/MWp (NREL); figures scale ~2× with these.',
    water_eo: 'Show soil moisture (NASA SMAP)',
    water_eo_hint: 'Live NASA SMAP soil-moisture (how much water is in the ground, ~9 km, updated every few days). Regional context, not site-scale — see the map legend for the colour scale. Click a site for the live reading at its location.',
    water_eo_rootzone: 'Root-zone soil moisture (SMAP L4)',
    water_eo_surface: 'Surface soil moisture (SMAP L4)',
    water_eo_error: 'Water layer: tiles couldn’t load — the NASA GIBS service may be busy. Try again shortly.',
    water_live_link: 'Live soil-moisture at this location (NASA Worldview) →',
    water_legend_title: 'Soil water (m³/m³)',
    water_legend_dry: 'Dry 0',
    water_legend_wet: '0.7 Wet',
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
    nav_trends: 'Trends & projections: cited charts on electricity, water, heat, emissions, investment →',
    nav_timeline: '20-event timeline 2020→2026: PIGA, INAGA EIA exemption, Operación Perserte →',
    nav_munis: 'Six towns bearing the burden: La Puebla de Híjar (935 people, €5B campus) to Épila →',
    nav_land: 'Land & biodiversity: footprints, PIGA expropriation, how to check a parcel →',
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
    map_layers: 'Capas del mapa',
    nav_explore: 'Explora el proyecto',
    how_to_read: 'Cómo leer este mapa',
    htr_dot: 'Cada punto es un proyecto de centro de datos. Color = tipo de operador (ver Leyenda).',
    htr_size: 'Tamaño del punto = potencia (MW): a mayor punto, más potencia.',
    htr_ring: 'Anillo rojo = especulativo (sin cliente confirmado). Rojo discontinuo = litigio o alegaciones.',
    htr_layers: 'Las capas del mapa aportan contexto: penacho térmico de 500 m, huella solar equivalente y humedad del suelo (NASA).',
    htr_cluster: 'Los sitios superpuestos se agrupan en un círculo azul con número — púlsalo para desplegarlos.',
    htr_click: 'Pulsa cualquier punto para ver la ficha completa y sus fuentes.',
    htr_flags: 'Fíjate en las etiquetas: vía rápida PIGA, disputa ICIO y litigios.',
    leg_size: 'Tamaño del punto = potencia (MW)',
    tour_start: '▶ Ver el recorrido',
    tour_prev: 'Atrás',
    tour_next: 'Siguiente',
    tour_done: 'Listo',
    speculative_only: 'Solo especulativos (sin cliente confirmado)',
    litigated_only: 'Solo con litigio o alegaciones',
    piga_only: 'Solo con PIGA (vía rápida)',
    high_risk_only: 'Solo con alto riesgo de vacancia',
    thermal_plume: 'Mostrar penacho térmico 500 m (ASME 2026)',
    plume_hint: 'Acércate a un sitio para ver el penacho térmico de 500 m a escala.',
    solar_footprint: 'Huella de suelo solar-equivalente (ilustrativa)',
    solar_hint: 'Ilustrativo, no es el suministro real del sitio: el suelo que necesitaría solo una planta solar para igualar la electricidad de este sitio, a escala. La mayoría de proyectos usan en realidad una mezcla de PPAs solares y eólicos — la eólica necesita mucho más espacio pero mucho menos suelo construido. Supone factor de carga 0,90, factor de capacidad solar en Aragón ~0,20, ~1,5 ha/MWp (NREL); las cifras varían ~2×.',
    water_eo: 'Mostrar humedad del suelo (NASA SMAP)',
    water_eo_hint: 'Humedad del suelo NASA SMAP en directo (cuánta agua hay en el suelo, ~9 km, actualizada cada pocos días). Contexto regional, no a escala del sitio — consulta la leyenda del mapa para la escala de color. Pulsa un sitio para la lectura en directo en su ubicación.',
    water_eo_rootzone: 'Humedad del suelo en zona radicular (SMAP L4)',
    water_eo_surface: 'Humedad del suelo superficial (SMAP L4)',
    water_eo_error: 'Capa de agua: no se pudieron cargar los mosaicos — el servicio NASA GIBS puede estar saturado. Inténtalo de nuevo.',
    water_live_link: 'Humedad del suelo en directo en esta ubicación (NASA Worldview) →',
    water_legend_title: 'Agua en el suelo (m³/m³)',
    water_legend_dry: 'Seco 0',
    water_legend_wet: '0,7 Húmedo',
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
    nav_trends: 'Tendencias y proyecciones: gráficos citados sobre electricidad, agua, calor, emisiones, inversión →',
    nav_timeline: 'Cronología 20 hitos 2020→2026: PIGA, exención EIA INAGA, Operación Perserte →',
    nav_munis: 'Seis municipios que cargan con el peso: de La Puebla de Híjar (935 hab, €5.000 M) a Épila →',
    nav_land: 'Suelo y biodiversidad: huellas, expropiación PIGA, cómo comprobar una parcela →',
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
  waterEoLayer: 'SMAP_L4_Analyzed_Root_Zone_Soil_Moisture', // NASA SMAP root-zone soil moisture
  selectedSite: null
};

// Waste-heat helper. Given MW, returns TJ/year rejected (1st-law assumption: nearly all electricity → heat).
// TJ/year = MW × 8760 h × 3.6 (GJ per MWh) / 1000 (GJ per TJ)
function wasteHeatTJ(mw) {
  if (!mw) return null;
  return mw * 8760 * 3.6 / 1000;
}

function t(key) { return I18N[STATE.lang][key] || key; }

// ── Shareable URL state ────────────────────────────────────────────────────────
// Encode the active filters, map layers and open site into the location hash so a
// filtered view or a specific project can be linked. Parsing is defensive: a bad hash
// is ignored and never breaks the map.
const DEFAULT_SOIL = 'SMAP_L4_Analyzed_Root_Zone_Soil_Moisture';
function serializeState() {
  if (!STATE.data) return;
  const p = [];
  const f = STATE.filters;
  const fl = [];
  if (f.speculative) fl.push('spec');
  if (f.litigated) fl.push('lit');
  if (f.piga) fl.push('piga');
  if (f.high_risk) fl.push('risk');
  if (fl.length) p.push('f=' + fl.join(','));
  const allOps = new Set(STATE.data.sites.map(s => s.operator));
  if (f.operators.size && f.operators.size < allOps.size) {
    p.push('ops=' + [...f.operators].map(encodeURIComponent).join(','));
  }
  const layers = [];
  if (STATE.thermalPlume) layers.push('plume');
  if (STATE.solarFootprint) layers.push('solar');
  if (STATE.waterEo) layers.push('water');
  if (layers.length) p.push('l=' + layers.join(','));
  if (STATE.waterEo && STATE.waterEoLayer && STATE.waterEoLayer !== DEFAULT_SOIL) p.push('soil=' + STATE.waterEoLayer);
  if (STATE.selectedSite) p.push('site=' + encodeURIComponent(STATE.selectedSite));
  const hash = p.length ? '#' + p.join('&') : '';
  try { history.replaceState(null, '', location.pathname + location.search + hash); } catch (e) { /* ignore */ }
}

// Parse the hash into STATE. Returns the requested site id (or null). Call before renderAll.
function readStateFromHash() {
  let site = null;
  try {
    const h = location.hash.replace(/^#/, '');
    if (!h) return null;
    const q = {};
    h.split('&').forEach(kv => { const i = kv.indexOf('='); if (i > 0) q[kv.slice(0, i)] = kv.slice(i + 1); });
    if (q.f) {
      const s = q.f.split(',');
      STATE.filters.speculative = s.includes('spec');
      STATE.filters.litigated = s.includes('lit');
      STATE.filters.piga = s.includes('piga');
      STATE.filters.high_risk = s.includes('risk');
    }
    if (q.ops) STATE.filters.operators = new Set(q.ops.split(',').map(decodeURIComponent));
    if (q.l) {
      const l = q.l.split(',');
      STATE.thermalPlume = l.includes('plume');
      STATE.solarFootprint = l.includes('solar');
      STATE.waterEo = l.includes('water');
    }
    if (q.soil) STATE.waterEoLayer = decodeURIComponent(q.soil);
    if (q.site) site = decodeURIComponent(q.site);
  } catch (e) { /* malformed hash — ignore */ }
  return site;
}

// Reflect STATE into the sidebar controls (operator checkboxes are handled by buildOperatorFilters).
function syncControlsFromState() {
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.checked = v; };
  set('f-speculative', STATE.filters.speculative);
  set('f-litigated', STATE.filters.litigated);
  set('f-piga', STATE.filters.piga);
  set('f-high-risk', STATE.filters.high_risk);
  set('f-thermal-plume', STATE.thermalPlume);
  set('f-solar-footprint', STATE.solarFootprint);
  set('f-water-eo', STATE.waterEo);
  const sel = document.getElementById('water-eo-layer');
  if (sel && STATE.waterEoLayer) sel.value = STATE.waterEoLayer;
}

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
    const linkedSite = readStateFromHash();  // restore filters/layers from the URL
    initLangButtons();
    renderAll();
    wireFilters();
    syncControlsFromState();                 // reflect restored state into the controls
    if (STATE.waterEo) updateWaterOverlay();  // apply a restored water layer
    document.getElementById('sidebar').addEventListener('change', serializeState); // persist any control change to the URL
    var tourBtn = document.getElementById('tour-btn');
    if (tourBtn) tourBtn.addEventListener('click', startTour);
    // Open a linked site, if any.
    if (linkedSite) { const s = STATE.data.sites.find(x => x.id === linkedSite); if (s) openDialog(s); }
    // First visit (and not arriving via a shared link): run the story tour once.
    try {
      if (!linkedSite && !localStorage.getItem('mapOnboarded')) { localStorage.setItem('mapOnboarded', '1'); startTour(); }
    } catch (e) { /* localStorage blocked — skip auto-tour */ }
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
  if (STATE.waterEo) showWaterLegend(true); // keep legend text in sync with language
}

function applyStaticTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    // If the key is missing (e.g. a stale cached app.js), keep the HTML fallback text
    // rather than blitting the raw key onto the page.
    if (val !== key) el.textContent = val;
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

  // Honesty note: derived totals only cover sites that report a figure.
  const n = d.sites.length;
  const mwSites = d.sites.filter(siteMW);
  const withMW = mwSites.length;
  const withWater = d.sites.filter(s => s.water).length;
  const cov = document.getElementById('coverage-note');
  if (cov) cov.textContent = STATE.lang === 'es'
    ? `Cobertura de datos: ${withMW}/${n} potencia · ${withWater}/${n} agua. Los totales derivados usan solo los sitios con dato.`
    : `Field coverage: ${withMW}/${n} capacity · ${withWater}/${n} water. Derived totals count only sites that report a figure.`;

  // Derived, cited: estimated location-based grid-electricity CO2 for mapped sites with capacity.
  const totalMW = mwSites.reduce((a, s) => a + siteMW(s), 0);
  const loc = STATE.lang === 'es' ? 'es-ES' : 'en-US';
  const mt = (g) => (gridCO2Tonnes(totalMW, g) / 1e6).toLocaleString(loc, { maximumFractionDigits: 1 });
  const g = document.getElementById('grid-co2-note');
  if (g) g.textContent = STATE.lang === 'es'
    ? `CO₂ estimado de la electricidad de red (${withMW} sitios con potencia): ≈ ${mt(GRID_G_PHYSICAL)}–${mt(GRID_G_LABEL)} Mt/año (basado en ubicación; mercado ≈ 0 con PPAs renovables). Fuentes: Electricity Maps, CNMC.`
    : `Estimated grid-electricity CO₂ (${withMW} sites with capacity): ≈ ${mt(GRID_G_PHYSICAL)}–${mt(GRID_G_LABEL)} Mt/yr (location-based; market-based ≈ 0 with renewable PPAs). Sources: Electricity Maps, CNMC.`;

  // Land & biodiversity (derived from disclosed footprints; regional context is cited).
  const landSites = d.sites.filter(s => s.land && s.land.hectares);
  const totalHa = Math.round(landSites.reduce((a, s) => a + s.land.hectares, 0));
  const ansar = 'https://www.ansararagon.com/alegaciones-al-piga-de-expansion-de-los-centros-de-datos-de-amazon-aws-en-aragon/';
  const ln = document.getElementById('land-note');
  if (ln) ln.innerHTML = STATE.lang === 'es'
    ? `Suelo: ≈ ${totalHa.toLocaleString(loc)} ha en ${landSites.length} sitios con huella divulgada — en su mayoría suelo rural/agrícola reclasificado vía PIGA (INAGA eximió 320+ ha de la EIA ordinaria). Alegaciones por biodiversidad y territorio de <a href="${ansar}" target="_blank">ANSAR/Ecologistas</a>.`
    : `Land: ≈ ${totalHa.toLocaleString(loc)} ha across ${landSites.length} sites with a disclosed footprint — mostly rural/agricultural land reclassified via PIGA (INAGA exempted 320+ ha from ordinary EIA). Biodiversity/territorial objections filed by <a href="${ansar}" target="_blank">ANSAR/Ecologistas</a>.`;
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
  // Clear the linked site from the URL when the dialog closes (any dismissal route).
  dialog.addEventListener('close', () => { STATE.selectedSite = null; serializeState(); });
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

// Relatable "household equivalents" (Spanish averages, cited in the dialog):
//   electricity ≈ 3,500 kWh per household·yr (IDAE);
//   mains water ≈ 130 m³ per household·yr (INE, ~133 L/person·day).
const HOME_KWH_YEAR = 3500;
const HOME_WATER_M3_YEAR = 130;
function homesFromMW(mw) {
  if (!mw) return null;
  return Math.round(mw * 8760 * DC_LOAD_FACTOR * 1000 / HOME_KWH_YEAR);
}
function homesFromWaterM3(m3) {
  if (typeof m3 !== 'number' || !m3) return null;
  return Math.round(m3 / HOME_WATER_M3_YEAR);
}

// Grid-electricity CO2 (estimate). Spanish grid carbon intensity, gCO2/kWh:
//   ~108 = physical grid 2024 (Electricity Maps); ~258 = CNMC official "mix" label 2025.
// Shown as a location-based RANGE; market-based (renewable PPA) accounting reports ~0.
const GRID_G_PHYSICAL = 108;
const GRID_G_LABEL = 258;
function gridCO2Tonnes(mw, gPerKwh) {
  if (!mw) return null;
  return mw * 8760 * DC_LOAD_FACTOR * 1000 * gPerKwh / 1e6; // annual kWh × g/kWh → tonnes
}

function renderSolarFootprint() {
  if (STATE.solarLayer) STATE.solarLayer.remove();
  STATE.solarLayer = L.layerGroup();
  const totalEl = document.getElementById('solar-total');
  if (!STATE.solarFootprint) { if (totalEl) totalEl.textContent = ''; return; }

  let total = 0, withMW = 0;
  const filtered = STATE.data.sites.filter(sitePassesFilters);
  filtered.forEach(s => {
    const km2 = solarFootprintKm2(s);
    if (!km2) return;
    total += km2; withMW++;
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
      ? `Sitios mostrados ≈ ${km2.toLocaleString('es-ES')} km² de suelo solar-equivalente (ilustrativo) — ${pct} % del municipio de Zaragoza (según ${withMW} de ${filtered.length} sitios con dato de potencia).`
      : `Sites shown ≈ ${km2.toLocaleString('en-US')} km² of solar-equivalent land (illustrative) — ${pct}% of Zaragoza municipality (based on ${withMW} of ${filtered.length} sites with capacity data).`;
  }
}

// ── Water-resources context (NASA EOSDIS GIBS — SMAP soil moisture) ────────────
// A live, always-current tile overlay of soil-moisture (how much water is in the ground) —
// nothing is stored, so it can't go stale. GIBS serves standard XYZ/WMTS tiles (no key,
// CORS-clean, CDN-backed), far more reliable than EDO's custom WMS. The per-site "data
// join" is a deep link (below) to NASA Worldview at the site, not a cached number.
const GIBS_BASE = 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best';
const GIBS_ATTR = 'Water: NASA EOSDIS GIBS — SMAP';
const GIBS_TMS = 'GoogleMapsCompatible_Level6'; // SMAP L4 tiles exist to zoom 6…
const GIBS_MAX_NATIVE_ZOOM = 6;                 // …so cap native requests there and let Leaflet upsample
const GIBS_LAYERS = {
  SMAP_L4_Analyzed_Root_Zone_Soil_Moisture: true, // ~1 m root-zone water (drought/water-stress relevant)
  SMAP_L4_Analyzed_Surface_Soil_Moisture: true    // top few cm
};

// Small bottom-left notice so a failing overlay isn't a silent blank.
let waterNoticeCtl = null;
function showWaterNotice(msg) {
  if (!msg) { if (waterNoticeCtl) { waterNoticeCtl.remove(); waterNoticeCtl = null; } return; }
  if (!waterNoticeCtl) {
    waterNoticeCtl = L.control({ position: 'bottomleft' });
    waterNoticeCtl.onAdd = () => { const d = L.DomUtil.create('div', 'plume-hint'); d.textContent = msg; return d; };
    waterNoticeCtl.addTo(map);
  } else {
    waterNoticeCtl.getContainer().textContent = msg;
  }
}

// Bottom-right colour legend for the SMAP layer (colormap SMAP_Analyzed_Soil_Moisture:
// dry→wet = orange→green→cyan→blue over 0–0.7 m³/m³). Recreated so it follows language.
let waterLegendCtl = null;
function showWaterLegend(show) {
  if (waterLegendCtl) { waterLegendCtl.remove(); waterLegendCtl = null; }
  if (!show) return;
  waterLegendCtl = L.control({ position: 'bottomright' });
  waterLegendCtl.onAdd = () => {
    const d = L.DomUtil.create('div', 'water-legend');
    d.innerHTML =
      `<div class="wl-title">${t('water_legend_title')}</div>` +
      `<div class="wl-bar"></div>` +
      `<div class="wl-labels"><span>${t('water_legend_dry')}</span><span>${t('water_legend_wet')}</span></div>`;
    return d;
  };
  waterLegendCtl.addTo(map);
}

function updateWaterOverlay() {
  if (STATE.waterEoTile) { STATE.waterEoTile.remove(); STATE.waterEoTile = null; }
  showWaterNotice('');
  if (!STATE.waterEo) { showWaterLegend(false); return; }
  const layerId = GIBS_LAYERS[STATE.waterEoLayer] ? STATE.waterEoLayer : 'SMAP_L4_Analyzed_Root_Zone_Soil_Moisture';
  // '.../<layer>/default/default/<TMS>/{z}/{y}/{x}.png' — style=default, time=default (latest available).
  // GIBS REST path is TileMatrix/TileRow/TileCol, i.e. {z}/{y}/{x}.
  const url = `${GIBS_BASE}/${layerId}/default/default/${GIBS_TMS}/{z}/{y}/{x}.png`;
  const layer = L.tileLayer(url, {
    tileSize: 256,
    maxNativeZoom: GIBS_MAX_NATIVE_ZOOM,
    opacity: 0.6,
    attribution: GIBS_ATTR,
    bounds: [[-85.05, -180], [85.05, 180]]
  });
  let errored = false;
  layer.on('tileerror', () => { if (!errored) { errored = true; showWaterNotice(t('water_eo_error')); } });
  // Renders in the tile pane, beneath the markers and plume in the overlay pane.
  STATE.waterEoTile = layer.addTo(map);
  showWaterLegend(true);
}

// Deep link to NASA Worldview centred on a site, with the soil-moisture layer on.
// Documented, stable permalink: ?v=<west,south,east,north>&l=<layers>&t=<date optional>.
function nasaWorldviewLink(lat, lon) {
  const w = (lon - 0.6).toFixed(3), s = (lat - 0.4).toFixed(3), e = (lon + 0.6).toFixed(3), n = (lat + 0.4).toFixed(3);
  return `https://worldview.earthdata.nasa.gov/?v=${w},${s},${e},${n}&l=SMAP_L4_Analyzed_Root_Zone_Soil_Moisture,Coastlines_15m`;
}

// Neutral cluster badge — a plain count, so it never reads as an operator colour or a
// red litigation/speculative ring.
function clusterIcon(cluster) {
  return L.divIcon({
    html: `<div class="dc-cluster"><span>${cluster.getChildCount()}</span></div>`,
    className: 'dc-cluster-wrap',
    iconSize: L.point(32, 32)
  });
}

function renderMarkers() {
  if (STATE.layer) STATE.layer.remove();
  // Cluster only near-coincident markers (small radius) so overlapping sites — chiefly the
  // Zaragoza stack — collapse into one clickable count that fans out on click; everything
  // else stays an individual dot. Falls back to a plain group if the plugin didn't load.
  STATE.layer = L.markerClusterGroup ? L.markerClusterGroup({
    maxClusterRadius: 30,
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: true,
    iconCreateFunction: clusterIcon
  }) : L.layerGroup();

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
  STATE.selectedSite = s.id || null;
  serializeState();
}

// ── Story tour ─────────────────────────────────────────────────────────────────
// A guided fly-through of emblematic sites. Each stop targets a site by id (so the
// coordinates stay in sync with the data) or a fixed centre, with a bilingual caption.
const TOUR = [
  { id: 'aws-villanueva-gallego', zoom: 13,
    en: { title: 'Water: company figure vs critics', text: 'AWS says its Aragón datacentres will use 755,000 m³ of water a year; environmental groups estimate closer to 14 hm³ — about 18× higher. This site draws on the Ebro/Gállego and faces litigation.' },
    es: { title: 'Agua: cifra de la empresa vs críticos', text: 'AWS afirma que sus centros de datos en Aragón usarán 755.000 m³ de agua al año; los grupos ecologistas estiman ~14 hm³, unas 18× más. Este sitio consume del Ebro/Gállego y afronta litigios.' } },
  { id: 'aws-la-puebla-de-hijar', zoom: 12,
    en: { title: 'A multi-billion campus in a town of 935', text: 'La Puebla de Híjar has 935 residents and is slated for a multi-billion-euro AWS campus. The mismatch between the infrastructure and the community it lands on is the story of Aragón’s datacentre boom.' },
    es: { title: 'Un campus de miles de millones en un pueblo de 935', text: 'La Puebla de Híjar tiene 935 habitantes y está prevista para un campus de AWS de miles de millones. El desajuste entre la infraestructura y la comunidad resume el boom de centros de datos en Aragón.' } },
  { id: 'aws-san-mateo-de-gallego', zoom: 13,
    en: { title: 'Land use & biodiversity', text: 'This 294-hectare campus is one of many carved mostly from rural, agricultural land, reclassified to industrial via the PIGA fast-track — which also enables compulsory purchase. INAGA exempted 320+ ha from ordinary environmental review; ecological groups (ANSAR, Ecologistas) have filed biodiversity and territorial objections. Prior use per parcel is checkable via SIGPAC.' },
    es: { title: 'Uso del suelo y biodiversidad', text: 'Este campus de 294 hectáreas es uno de muchos abiertos sobre suelo rural y agrícola, reclasificado a industrial vía la vía rápida PIGA — que además permite la expropiación forzosa. INAGA eximió a más de 320 ha de la evaluación ambiental ordinaria; grupos ecologistas (ANSAR, Ecologistas) han presentado alegaciones por biodiversidad y territorio. El uso anterior por parcela se puede comprobar en SIGPAC.' } },
  { id: 'microsoft-la-muela', zoom: 13,
    en: { title: 'The €87M tax dispute', text: 'Microsoft has refused to pay ~€87M in ICIO construction tax to La Muela and Villamayor, arguing the PIGA fast-track exempts it. The municipalities dispute that, and the site is also litigated.' },
    es: { title: 'La disputa fiscal de 87 M€', text: 'Microsoft se ha negado a pagar ~87 M€ de ICIO a La Muela y Villamayor, alegando que la vía rápida PIGA le exime. Los municipios lo disputan, y el sitio también está en litigio.' } },
  { id: 'blackstone-qts-calatorao', zoom: 13,
    en: { title: 'Speculative: building without a tenant', text: 'Red-ringed sites like this have no publicly disclosed anchor tenant — the highest vacancy risk if hyperscaler demand softens. Land and grid capacity are committed on spec.' },
    es: { title: 'Especulativo: construir sin cliente', text: 'Los sitios con anillo rojo como este no tienen cliente principal divulgado — el mayor riesgo de vacancia si la demanda se enfría. Suelo y capacidad de red comprometidos a especulación.' } },
  { center: [41.65, -0.9], zoom: 8,
    en: { title: 'The regional picture', text: 'Together the mapped projects add up to thousands of MW and billions in investment, on a water-stressed basin and a grid whose CO₂ depends on how you count it. Open any dot for the full cited record — or explore the layers and charts.' },
    es: { title: 'El panorama regional', text: 'En conjunto, los proyectos mapeados suman miles de MW y miles de millones en inversión, sobre una cuenca con estrés hídrico y una red cuyo CO₂ depende de cómo se cuente. Abre cualquier punto para la ficha citada — o explora las capas y gráficos.' } }
];
let tourIdx = -1;

function ensureTourCard() {
  if (document.getElementById('tour-card')) return;
  const c = document.createElement('div');
  c.id = 'tour-card';
  c.innerHTML =
    '<button id="tour-close" aria-label="Close">×</button>' +
    '<div id="tour-step"></div>' +
    '<h3 id="tour-title"></h3>' +
    '<p id="tour-text"></p>' +
    '<div class="tour-nav"><button id="tour-prev"></button><button id="tour-next"></button></div>';
  document.body.appendChild(c);
  document.getElementById('tour-close').addEventListener('click', endTour);
  document.getElementById('tour-prev').addEventListener('click', () => tourGoTo(tourIdx - 1));
  document.getElementById('tour-next').addEventListener('click', () => {
    if (tourIdx >= TOUR.length - 1) endTour(); else tourGoTo(tourIdx + 1);
  });
}

function startTour() {
  if (!STATE.data) return;
  ensureTourCard();
  tourGoTo(0);
}

function tourGoTo(i) {
  if (i < 0 || i >= TOUR.length) return;
  tourIdx = i;
  const stop = TOUR[i];
  const lang = STATE.lang === 'es' ? 'es' : 'en';
  let center = stop.center;
  if (stop.id) { const s = STATE.data.sites.find(x => x.id === stop.id); if (s) center = [s.lat, s.lon]; }
  if (center) map.flyTo(center, stop.zoom, { duration: 1.2 });
  const card = document.getElementById('tour-card');
  card.style.display = 'block';
  document.getElementById('tour-step').textContent = (i + 1) + ' / ' + TOUR.length;
  document.getElementById('tour-title').textContent = stop[lang].title;
  document.getElementById('tour-text').textContent = stop[lang].text;
  const prev = document.getElementById('tour-prev');
  prev.textContent = t('tour_prev'); prev.disabled = (i === 0);
  document.getElementById('tour-next').textContent = (i === TOUR.length - 1) ? t('tour_done') : t('tour_next');
}

function endTour() {
  const card = document.getElementById('tour-card');
  if (card) card.style.display = 'none';
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

  // Optional land / backup-power block — renders only when a site carries the (sourced) data.
  // Schema (all optional): land: { hectares, prior_use, protected_area, _source }
  //                        backup_power: { fuel, capacity_mw, _source }
  const src = (o) => o && o._source ? ` <a class="cite" href="${o._source}" target="_blank">${t('source_link')}</a>` : '';
  const landBackup = (s.land || s.backup_power) ? `
    <h3>${STATE.lang === 'es' ? 'Suelo y energía de respaldo' : 'Land & backup power'}</h3>
    <table>
      ${s.land?.hectares ? `<tr><th>${STATE.lang === 'es' ? 'Superficie' : 'Land area'}</th><td>${s.land.hectares} ha${src(s.land)}</td></tr>` : ''}
      ${s.land?.prior_use || s.land?.prior_use_es ? `<tr><th>${STATE.lang === 'es' ? 'Uso anterior del suelo' : 'Prior land use'}</th><td>${txt(s.land, 'prior_use')}${src(s.land)}</td></tr>` : ''}
      ${s.land?.protected_area || s.land?.protected_area_es ? `<tr><th>${STATE.lang === 'es' ? 'Espacio protegido cercano' : 'Nearby protected area'}</th><td>${txt(s.land, 'protected_area')}${src(s.land)}</td></tr>` : ''}
      ${s.backup_power?.fuel ? `<tr><th>${STATE.lang === 'es' ? 'Combustible de respaldo' : 'Backup fuel'}</th><td>${s.backup_power.fuel}${s.backup_power.capacity_mw ? ` (${s.backup_power.capacity_mw} MW)` : ''}${src(s.backup_power)}</td></tr>` : ''}
    </table>
  ` : '';

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
    ${(function () {
      var homes = homesFromWaterM3(s.water.annual_m3);
      if (!homes) return '';
      return STATE.lang === 'es'
        ? `<p class="cite">≈ el agua de <strong>${homes.toLocaleString('es-ES')} hogares</strong> españoles (supone ~130 m³/hogar·año, INE).</p>`
        : `<p class="cite">≈ the water of <strong>${homes.toLocaleString('en-US')} Spanish homes</strong> (assumes ~130 m³/home·yr, INE).</p>`;
    })()}
  ` : '';

  // Live basin water-stress context for every site (not just those with a water block).
  const waterContext = (s.lat != null && s.lon != null) ? `
    <p class="water-eo-link"><a href="${nasaWorldviewLink(s.lat, s.lon)}" target="_blank" rel="noopener">${t('water_live_link')}</a></p>
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
    ${(function () {
      var homes = homesFromMW(siteMW(s));
      if (!homes) return '';
      return STATE.lang === 'es'
        ? `<p class="cite">≈ la electricidad de <strong>${homes.toLocaleString('es-ES')} hogares</strong> españoles (supone factor de carga 0,90 y 3.500 kWh/hogar·año, IDAE).</p>`
        : `<p class="cite">≈ the electricity of <strong>${homes.toLocaleString('en-US')} Spanish homes</strong> (assumes 0.90 load factor, 3,500 kWh/home·yr, IDAE).</p>`;
    })()}
    ${ppas ? `<h3>${t('sec_ppas')}</h3><ul>${ppas}</ul>` : ''}

    <h3>${STATE.lang === 'es' ? 'Emisiones de la electricidad de red (estimadas)' : 'Grid-electricity emissions (estimated)'}</h3>
    <p>${(function () {
      var mw = siteMW(s);
      if (!mw) return STATE.lang === 'es' ? '<em>No se ha divulgado el MW del sitio; las emisiones no se pueden calcular.</em>' : '<em>Site MW not disclosed; emissions not computable.</em>';
      var loc = STATE.lang === 'es' ? 'es-ES' : 'en-US';
      var lo = Math.round(gridCO2Tonnes(mw, GRID_G_PHYSICAL)).toLocaleString(loc);
      var hi = Math.round(gridCO2Tonnes(mw, GRID_G_LABEL)).toLocaleString(loc);
      return (STATE.lang === 'es'
        ? '≈ <strong>' + lo + '–' + hi + ' t CO₂/año</strong> con contabilidad <em>basada en ubicación</em> (red española 108 g a etiqueta CNMC 258 gCO₂/kWh). Con contabilidad <em>basada en mercado</em> ≈ 0 si se cubre con PPAs renovables — AWS declara 100% renovable desde 2022 y Microsoft firmó un PPA solar de 95,7 MW —, pero el consumo físico de la red no es cero y la nueva demanda puede elevar la generación marginal (gas). Supone factor de carga 0,90.'
        : '≈ <strong>' + lo + '–' + hi + ' t CO₂/yr</strong> on a <em>location-based</em> basis (Spanish grid 108 g to CNMC label 258 gCO₂/kWh). On a <em>market-based</em> basis ≈ 0 if matched by renewable PPAs — AWS reports 100% renewable since 2022 and Microsoft signed a 95.7 MW solar PPA — but the physical grid draw isn\'t zero and new demand can lift marginal (gas) generation. Assumes 0.90 load factor.');
    })()}</p>
    <p class="cite">${STATE.lang === 'es' ? 'Fuentes: intensidad de red — Electricity Maps (2024) y CNMC (2025); declaraciones renovables — AWS y Microsoft (DCD).' : 'Sources: grid intensity — Electricity Maps (2024) and CNMC (2025); renewable claims — AWS and Microsoft (DCD).'}</p>

    ${water}
    ${waterContext}
    ${landBackup}

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
