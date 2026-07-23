<h1>Aragón Datacenter Map</h1>
<p class="lede">An interactive map of every datacenter project announced in the Aragón region of Spain. We have tracked operators, investors, clients, energy and water consumption, government permits, and the fast-track mechanisms that authorise them. Every datapoint is cited.</p>

<h2>Why this exists</h2>
<p>Aragón has become the most active datacenter market in Southern Europe. Morgan Stanley calls it the &quot;most exciting&quot; in Europe. As of November 2025, €47 billion in investment has been committed, with a projected 11,237 MW across 28 sites mapped by environmental groups. If all are built, datacenters will consume more than 9× the region&apos;s current annual electricity demand.</p>
<p>That scale is being authorised through a regional fast-track called <strong>PIGA</strong> (Proyecto de Interés General de Aragón), which overrides municipal urbanism plans, reclassifies non-developable land, and,per critics,sidesteps the municipal ICIO construction tax. In August 2025, INAGA outright exempted AWS from the ordinary environmental impact evaluation for 320+ hectares across four municipalities. The first datacenter lawsuit in Spain is now pending at the TSJA. Forestalia, the operator of three speculative datacenter projects worth €12 billion, is at the centre of <em>Operación Perserte</em>, an active Guardia Civil investigation into environmental-permit bribery.</p>
<p>This project pulls all of that into one cited, machine-readable dataset and lays it on a map.</p>

<h2>Methodology</h2>
<ul>
<li><strong>Every datapoint is cited.</strong> Field-level <code>_source</code> keys and site-level <code>sources</code> arrays link to primary or reputable secondary sources (BOA, BOE, INAGA, CHE, Heraldo de Aragón, El País, Reuters, Datacenter Dynamics, etc.).</li>
<li><strong>When sources disagree</strong>, both numbers are stored with separate citations rather than averaged (e.g. AWS aggregate water: 755,000 m³ company vs. 14 hm³ critics).</li>
<li><strong>Speculative builds</strong>,sites without a publicly disclosed anchor tenant,are flagged with <code>speculative: true</code> and ring-highlighted on the map.</li>
<li><strong>Expedited / fast-track indicators</strong> per site capture PIGA use, ICIO tax disputes, environmental shortcuts, litigation, and criminal investigations.</li>
<li><strong>Coordinates</strong> default to the municipality centroid (precision marked) unless the exact site location was publicly reported.</li>
<li><strong>Gaps are explicit.</strong> The <code>gaps_to_close</code> array in the dataset lists known unknowns,easier to extend than to pretend completeness.</li>
</ul>

<h2>Primary registries</h2>
<ul>
<li><a href="https://www.boa.aragon.es/" target="_blank">BOA, Boletín Oficial de Aragón</a> (PIGA declarations, regional decrees)</li>
<li><a href="https://www.boe.es/" target="_blank">BOE, Boletín Oficial del Estado</a> (water concessions, national-level)</li>
<li><a href="https://www.aragon.es/organismos/instituto-aragones-de-gestion-ambiental-inaga" target="_blank">INAGA</a> (environmental impact declarations)</li>
<li><a href="https://iber.chebro.es/" target="_blank">CHE, Confederación Hidrográfica del Ebro</a> (water concessions)</li>
<li><a href="https://www.aragon.es/urbanismo-y-ordenacion-del-territorio/planes-y-proyectos-de-interes-para-aragon-pigas" target="_blank">PIGAs registry</a> (Gobierno de Aragón)</li>
<li><a href="https://www.ree.es/" target="_blank">REE, Red Eléctrica</a> (grid connection capacity)</li>
</ul>

<h2>Contributing</h2>
<p>Issues, corrections, new sites, and translations are welcome at <a href="https://github.com/nopressurelab/dc-map" target="_blank">github.com/nopressurelab/dc-map</a>.</p>
<p>To add a site: append an object to the <code>sites</code> array in <code>data/datacenters.json</code> following the schema. To translate fields: add <code>_es</code> siblings (the UI picks them up automatically).</p>
<p>If you spot a missing or wrong datapoint, open an issue with the source URL,that&apos;s the fastest path to a fix.</p>

<h2>License &amp; citation</h2>
<p>The dataset, code, and documentation are licensed <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>. You may share and adapt freely with attribution.</p>
<p>Suggested citation:</p>
<blockquote>No Pressure Lab. <em>Aragón Datacenter Map</em>. https://github.com/nopressurelab/dc-map</blockquote>
<p>Original facts are owned by their respective sources (linked in each record). The compilation, structure, and editorial choices are licensed CC BY 4.0.</p>

<h2>About No Pressure Lab</h2>
<p>No Pressure Lab is a research workspace. Find more work at <a href="https://github.com/nopressurelab" target="_blank">github.com/nopressurelab</a>.</p>
