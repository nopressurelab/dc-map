<h1>Trends &amp; projections</h1>
<p class="lede">Charts built from the same cited dataset that powers the map. All figures are sourced; the caption under each chart links back to the record in <code>data/datacenters.json</code>.</p>

<h2>1. Electricity: Aragón 2024 → 2030</h2>
<p>Regional consumption is projected to almost quadruple by 2030. The datacenter share grows from 14% to ~50% of that larger total, which means datacenters alone in 2030 will consume roughly as much electricity as the entire region did in 2024.</p>
<div class="chart-wrap"><canvas id="chart-electricity" aria-label="Aragón electricity demand 2024 vs 2030" role="img"></canvas></div>
<p class="chart-note">Sources: <a href="https://www.eldiario.es/aragon/sociedad/28-macrocentros-datos-proyectan-aragon-multiplicaran-nueve-demanda-electrica_1_13331581.html" target="_blank">eldiario.es (2024 regional demand)</a>; <a href="https://www.eldiario.es/aragon/economia/centros-datos-consumiran-si-solos-2030-mitad-demanda-electrica-aragon_1_11896858.html" target="_blank">eldiario.es (2030 projection)</a>; <a href="https://www.aragondigital.es/articulo/economia/aragon-tiene-energia-sobra-centros-datos-reto-es-poder-enchufarla-tiempo/20260317143353972916.html" target="_blank">aragondigital.es (14% current DC share)</a>.</p>

<h2>2. AWS water: company figure vs critics&apos; estimate</h2>
<p>AWS states its Aragón data centers will use 755,000 m³ of water per year. Environmental groups estimate the real number will be closer to 14 hm³/year, ~23% of Zaragoza&apos;s total urban water use, roughly <strong>18× the company figure</strong>. The chart shows both on a linear scale so the gap is visible.</p>
<div class="chart-wrap"><canvas id="chart-water" aria-label="AWS Aragón water consumption company vs critics" role="img"></canvas></div>
<p class="chart-note">Sources: <a href="https://www.cartv.es/aragonnoticias/aragon/10-800-gigavatios-hora-anuales-o-755-000-metros-cubicos-de-agua-lo-que-consumiran-los-centros-de-datos-de-amazon-29645" target="_blank">CARTV (company figure)</a>; <a href="https://www.eldiario.es/aragon/economia/amazon-gastara-centros-datos-aragon-electricidad-region-agua-20-000-hogares_1_11914329.html" target="_blank">eldiario.es (critics&apos; estimate)</a>.</p>

<div class="callout callout-heat">
<strong>Heat–water coupling.</strong> Evaporative cooling scales with cooling load, so datacenter water demand peaks during heatwaves, precisely when the Ebro basin is already under drought stress. Peer-reviewed research also finds waste heat from hyperscale datacenters can raise downwind air temperature by <strong>0.7 to 2.2°C</strong> at neighbourhood scale (Phoenix, Arizona; ASME Journal 2026). Full explanation and citations in the <a href="types.html#heat">primer</a>.
</div>

<h2>3. Speculative pipeline: MW with vs without a confirmed anchor tenant</h2>
<p>Of the Aragón datacenter capacity with a publicly disclosed per-site MW figure, a large share is speculative, sites being built (or land-banked) without a publicly disclosed anchor tenant. Note: AWS does not disclose per-site MW, so most confirmed-tenant capacity is not on this chart. What is on the chart is the visible speculative pipeline.</p>
<div class="chart-wrap"><canvas id="chart-speculative" aria-label="Speculative vs confirmed MW pipeline" role="img"></canvas></div>
<p class="chart-note" id="speculative-note"></p>

<h2>4. Announced investment by operator type</h2>
<p>Where every euro is being staked. Hyperscaler self-build (AWS, Microsoft) still dominates, but speculative and renewable-integrated builds (Forestalia €12,048 M) are a large second wave.</p>
<div class="chart-wrap"><canvas id="chart-investment" aria-label="Investment by operator type" role="img"></canvas></div>
<p class="chart-note">Values sum per-site <code>investment_eur_million</code> from the dataset. AWS Aragón total (€33,700 M) is allocated to the hyperscaler bucket even where per-site figures are unavailable, since the aggregate is officially announced.</p>

<h2>5. Site status pipeline</h2>
<p>How much of the pipeline is real today vs on paper. &quot;Permitted&quot; sites have PIGA / DIGA approval but not necessarily construction underway; &quot;announced&quot; sites are earlier in the process.</p>
<div class="chart-wrap"><canvas id="chart-status" aria-label="Sites by status" role="img"></canvas></div>
<p class="chart-note">Counts sites in the dataset by <code>status</code> field. Withdrawn = Box2Bit Cariñena (moved to Épila after being excluded from the REE 2025-2030 grid plan).</p>

<h2>6. Zaragoza is hot and getting hotter</h2>
<p>Context for the heat-water coupling: the Ebro depression is warming faster than the Spanish baseline. Summer 2025 was the hottest summer in Spain since records began, beating 2003 by +0.6°C. According to AEMET, 9 of the 10 hottest summers in Spain occurred in the 21st century.</p>
<div class="chart-wrap"><canvas id="chart-heat-cluster" aria-label="Distribution of Spain's hottest summers by century" role="img"></canvas></div>
<p class="chart-note">Source: <a href="https://www.aemet.es/en/noticias/2025/09/resumen_verano_2025" target="_blank">AEMET summer 2025 review</a>; <a href="https://www.elespanol.com/ciencia/meteorologia/20250916/aemet-confirma-verano-calido-serie-historica-espana-anticipa-otono-seco/1003743926674_0.html" target="_blank">El Español (rankings)</a>; <a href="https://www.xataka.com/ecologia-y-naturaleza/no-no-tu-imaginacion-verano-espana-2-grados-caluroso-dura-cinco-semanas-que-anos-80" target="_blank">Xataka (climate normal shift)</a>.</p>

<h2>7. Recent Zaragoza heat records</h2>
<p>Absolute values, taken from the AEMET station at Zaragoza airport (index 9434). The 2026 projection reflects the June heatwave AEMET issued warnings for.</p>
<div class="chart-wrap"><canvas id="chart-heat-records" aria-label="Zaragoza extreme heat records" role="img"></canvas></div>
<p class="chart-note">Sources: <a href="https://www.tiempo.com/noticias/prediccion/43-c-zaragoza-al-borde-de-un-record-historico-de-calor-para-un-mes-de-junio.html" target="_blank">tiempo.com (43°C projection June 2026)</a>; <a href="https://meteo.es/noticias/meteorologia/ola-de-calor-espana" target="_blank">meteo.es (records)</a>; <a href="https://www.aemet.es/es/serviciosclimaticos/datosclimatologicos/valoresclimatologicos?l=9434&k=arn" target="_blank">AEMET climate normals Zaragoza</a>. All-time record 42.8°C set 26 Aug 2010; first-ever tropical night 25.7°C set 23 Aug 2023.</p>

<h2>8. Aragón vs other datacenter clusters</h2>
<p>Announced pipeline vs current operational capacity elsewhere. Aragón&apos;s 11,237 MW pipeline is larger than any operational European cluster; it exceeds Northern Virginia&apos;s current operational base even though N. Virginia itself has 24,103 MW planned.</p>
<div class="chart-wrap"><canvas id="chart-comparison" aria-label="Aragón vs other datacenter clusters" role="img"></canvas></div>
<p class="chart-note">Sources: Aragón (announced pipeline) via <a href="https://www.eldiario.es/aragon/sociedad/28-macrocentros-datos-proyectan-aragon-multiplicaran-nueve-demanda-electrica_1_13331581.html" target="_blank">eldiario.es</a>; Northern Virginia operational + planned via <a href="https://www.cushmanwakefield.com/en/insights/americas-data-center-update" target="_blank">Cushman &amp; Wakefield H2 2025</a>; Dublin, London operational via <a href="https://kpmg.com/ie/en/insights/energy-utilities-telecoms/irelands-data-centre-policy-reset.html" target="_blank">KPMG Ireland 2025</a>. Frankfurt/Amsterdam/Madrid approximate FLAP-D operational per industry reports (Cushman, JLL, Savills). Comparison caveat: Aragón is announced pipeline, other European figures are operational; N. Virginia&apos;s 24,103 MW planned is included as scale reference.</p>

<h2>9. Waste heat rejected per site: IT load + cooling overhead</h2>
<p>By the first law of thermodynamics, essentially all electricity that enters a datacenter comes out as heat. The disclosed &quot;MW&quot; figure is the IT load (what the servers consume); real total heat rejected is IT load × PUE (Power Usage Effectiveness), because cooling systems and power distribution themselves consume electricity that also becomes heat. Each bar splits the two components.</p>
<p class="cite" style="margin: 8px 0 0 0;"><em>Building insulation does not affect the total rejected - thermodynamics - but it changes how the heat leaves (concentrated exhaust plumes vs distributed leakage through the envelope). The ASME 2026 downwind-warming measurements were made behind concentrated mechanical exhausts.</em></p>
<div class="chart-wrap" style="height: 420px;"><canvas id="chart-waste-heat" aria-label="Waste heat rejected per site: IT plus cooling overhead" role="img"></canvas></div>
<p class="chart-note">Formula per component: <code>MW × 8,760 × 3.6 GJ/MWh ÷ 1,000</code> = TJ/year. PUE assumptions per operator type: hyperscaler evaporative (AWS, Microsoft) 1.20; hyperscaler colocation (QTS, Vantage) 1.30; free-cooling in hot climate (marketed &quot;water-free&quot;) up to 1.35, because chillers run more often during Ebro heatwaves; closed-loop (Azora, Merlin) 1.25; renewable-integrated (Forestalia) 1.30. Sources: <a href="https://asmedigitalcollection.asme.org/sustainablebuildings/article/7/2/024501/1233035/Data-Center-Waste-Heat-as-an-Emerging-Urban" target="_blank">ASME 2026 downwind warming</a>; <a href="https://uptimeinstitute.com/tiers" target="_blank">Uptime Institute</a> and <a href="https://www.iea.org/reports/data-centres-and-data-transmission-networks" target="_blank">IEA</a> for PUE benchmarks.</p>

<h2>10. Cooling technology by MW</h2>
<p>Cooling choice is the biggest driver of a site&apos;s water bill and its degradation profile under heat stress. Evaporative sites in Aragón will demand the most water precisely during heatwaves; free-cooling sites will lose efficiency at the same time.</p>
<div class="chart-wrap"><canvas id="chart-cooling" aria-label="Datacenter MW by cooling technology" role="img"></canvas></div>
<p class="chart-note">Aggregates the <code>water.cooling_tech</code> field on the dataset. &quot;Undisclosed&quot; = MW disclosed but cooling technology not publicly stated.</p>

<h2>11. Top 10 hottest Spanish summers by decade</h2>
<p>All ten sit after 1990; nine are in the 21st century. The 2020s already hold half of the top 10.</p>
<div class="chart-wrap"><canvas id="chart-summers-decade" aria-label="Top 10 hottest Spanish summers by decade of occurrence" role="img"></canvas></div>
<p class="chart-note">Distribution derived from AEMET seasonal reviews. 2025 (rank 1), 2022 (rank 2), 2023 (rank 4), 2024 (rank 7), plus 2003 (2000s) and additional 2010s/2020s entries per AEMET rankings. Sources: <a href="https://www.aemet.es/en/noticias/2025/09/resumen_verano_2025" target="_blank">AEMET summer 2025 review</a>; <a href="https://www.elespanol.com/ciencia/meteorologia/20250916/aemet-confirma-verano-calido-serie-historica-espana-anticipa-otono-seco/1003743926674_0.html" target="_blank">El Español rankings</a>.</p>

<h2>12. Committed water demand entering the Aragón pipeline during CHE-declared drought years</h2>
<p>What was authorised while the Ebro basin was under drought emergency. The 2021-2023 drought was the most intense since the 1990s (85% of the basin in prolonged drought, 45% in emergency). During those same years the Aragón government continued granting PIGA and related fast-track declarations for datacenter projects that will draw significant water. This is a governance choice, not a coincidence.</p>
<p>Two cumulative lines because the water figure itself is disputed: company-stated (AWS: 755,000 m³/year aggregate) vs critics' estimate (~14 hm³/year, ~23% of Zaragoza urban water use). Committed water is attributed to the year each site&apos;s primary authorisation was granted.</p>
<div class="chart-wrap"><canvas id="chart-drought" aria-label="Cumulative committed water demand vs drought years" role="img"></canvas></div>
<p class="chart-note">Drought shading (darker = extreme, basin-wide; lighter = localised): 2021-2023 was the basin-wide extreme drought (most intense since the 1990s), ended per CHE resolutions in 2024. 2024 had a localised extraordinary-drought declaration in sub-basins Huerva and Guadalope (13 June, ended 8 October 2024). 2025 and 2026 were normal to near-normal, only sub-basin Ésera in prealerta by mid-2026 with basin embalses at ~84%. Water demand allocated by year of PIGA/DIGA approval. Sources: <a href="https://www.chebro.es/documents/20121/1066920/2023-04-19_Resumen_PES_v05.pdf" target="_blank">CHE Plan Especial de Sequías</a>; <a href="https://www.chebro.es/en/-/la-che-declara-el-final-de-la-situaci%C3%B3n-excepcional-por-sequ%C3%ADa-extraordinaria-las-unidades-territoriales-ute-06-cuenca-del-huerva-y-ute-09a-guadalope-alto-y-medio-" target="_blank">CHE end of 2024 drought (Oct 2024)</a>; <a href="https://www.chebro.es/en/-/la-confederaci%C3%B3n-hidrogr%C3%A1fica-del-ebro-despide-el-a%C3%B1o-hidrol%C3%B3gico-2024/2025" target="_blank">CHE hydrological year 2024/2025</a>; <a href="https://www.elespanol.com/aragon/actualidad/20260623/cuenca-ebro-estrena-verano-embalses-aleja-cualquier-fantasma-sequia/1003744296023_0.html" target="_blank">El Español (June 2026 basin at 84%)</a>; <a href="https://www.cartv.es/aragonnoticias/aragon/10-800-gigavatios-hora-anuales-o-755-000-metros-cubicos-de-agua-lo-que-consumiran-los-centros-de-datos-de-amazon-29645" target="_blank">CARTV (AWS company figure)</a>; <a href="https://www.eldiario.es/aragon/economia/amazon-gastara-centros-datos-aragon-electricidad-region-agua-20-000-hogares_1_11914329.html" target="_blank">eldiario.es (critics&apos; ~14 hm³ estimate)</a>.</p>

<h2>13. Grid-electricity CO₂: the same power, counted two ways</h2>
<p>Datacentres run around the clock on grid electricity. How much CO₂ that causes depends entirely on how you count it - the two bar groups below:</p>
<ul>
<li><strong>Location-based</strong> (first two bars) - the emissions of the physical grid the site actually draws from. Spain's grid was ~108 gCO₂/kWh in 2024; the CNMC's official supplier "mix" label is ~258 g (2025). This is what the atmosphere sees.</li>
<li><strong>Market-based</strong> (third bar) - emissions <em>after</em> subtracting renewable energy the operator buys through PPAs or certificates. Matched one-to-one, it is reported as ≈ 0: AWS claims 100% renewable since 2022; Microsoft signed a 95.7 MW solar PPA.</li>
</ul>
<p>Both are legitimate accounting methods, but the ≈ 0 is a <em>contractual</em> result, not zero physical emissions - the grid draw is real, and adding this much new demand can pull up marginal gas generation.</p>
<div class="chart-wrap"><canvas id="chart-emissions" aria-label="Estimated grid-electricity CO2: physical grid range vs after renewable PPAs" role="img"></canvas></div>
<p class="chart-note">Estimate: Σ(site MW) × 8760 h × 0.90 load factor × grid intensity; covers only sites with a disclosed MW figure. Sources: <a href="https://www.electricitymaps.com/grid-in-review-2025/spain" target="_blank">Electricity Maps (Spanish grid 2024)</a> and CNMC official mix (2025); renewable claims - <a href="https://www.aboutamazon.eu/news/job-creation-and-investment/learn-about-awss-long-term-commitment-to-aragon-spain" target="_blank">AWS</a>, <a href="https://www.datacenterdynamics.com/en/news/microsoft-signs-957mw-ppa-with-zelestra-in-aragon-spain/" target="_blank">Microsoft/Zelestra (DCD)</a>.</p>

<h2>14. Land footprint by site</h2>
<p>Disclosed campus footprints total ≈ <strong>1,149 ha</strong> across the nine sites that publish one - mostly rural, agricultural land reclassified to industrial via the PIGA fast-track. See the <a href="land.html">Land &amp; biodiversity page</a> for the expropriation story and how to check a parcel.</p>
<div class="chart-wrap" style="height: 380px;"><canvas id="chart-land" aria-label="Datacenter land footprint by site in hectares" role="img"></canvas></div>
<p class="chart-note">Hectares from each site's own reporting (linked in its map record). Covers the 9 of 21 sites with a disclosed footprint. Prior land use per parcel is verifiable via <a href="https://sigpac.mapa.gob.es/" target="_blank">SIGPAC</a>.</p>
