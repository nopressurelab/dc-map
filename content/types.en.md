<h1>What is a datacenter and what types are being built in Aragón?</h1>
<p class="lede">A primer with references. Every category is linked to real projects on the map so the vocabulary connects to what&apos;s actually being built.</p>

<h2>What is a datacenter?</h2>
<p>A datacenter is a purpose-built facility that houses computing, storage and network equipment, along with the power distribution, cooling, security and connectivity required to keep that equipment running continuously. Modern datacenter capacity is measured in <strong>MW of IT load</strong>, not square metres, because power and cooling are the binding constraints.</p>
<p>Two useful reference works: the <a href="https://uptimeinstitute.com/tiers" target="_blank">Uptime Institute Tier Classification</a> (industry standard for reliability tiers I to IV), and the <a href="https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks" target="_blank">International Energy Agency&apos;s data-centres and data-transmission networks tracker</a> (global energy footprint, updated annually).</p>

<h2>Types being built in Aragón</h2>

<h3>Hyperscaler self-built</h3>
<p>Cloud providers building datacenters they will operate themselves. Their internal customers are the public cloud users of AWS, Azure, and so on. Capacity, tenant, and workload are all in-house.</p>
<ul>
<li>AWS Villanueva de Gállego, Walqa, El Burgo de Ebro, Zaragoza, La Sotonera, San Mateo de Gállego, La Puebla de Híjar (AI-specialised)</li>
<li>Microsoft La Muela, Villamayor de Gállego, Zaragoza (Puerto Venecia)</li>
</ul>

<h3>Wholesale / hyperscale colocation</h3>
<p>Large campuses built by a specialist developer and then leased in big blocks — typically to a single hyperscale customer per building. The tenant runs the servers, the operator provides the shell, power and cooling. When the anchor tenant is not disclosed at announcement, this shades into <em>speculative</em>.</p>
<ul>
<li><strong>QTS Calatorao</strong> (Proyecto Rhodes), backed by Blackstone. 300 MW, €7,500 M phase 1, no publicly disclosed anchor tenant.</li>
<li><strong>Vantage Villanueva de Gállego</strong> (ZAZ2 campus), backed by DigitalBridge with Spanish promoter <em>Desarrollos Ecoindustriales La Cartuja</em>. €3,200 M, 90 MW guaranteed by Endesa for phase 1.</li>
</ul>

<h3>Colocation REIT</h3>
<p>Publicly listed real-estate vehicles adding multi-tenant datacenter capacity to their industrial/logistics portfolio. Space is leased in smaller blocks to a mix of hyperscalers and enterprise customers.</p>
<ul>
<li><strong>Merlin Properties + Edged Energy</strong>, ZGZ-WIND 01 and 02, 150 MW combined. Part of Merlin&apos;s 412 MW Iberia phase III plan (€4,470 M by 2032).</li>
</ul>

<h3>Spanish independent / speculative developer</h3>
<p>Non-hyperscale Spanish sponsors building large capacity without a publicly disclosed anchor customer, betting demand will arrive. Highest vacancy risk category.</p>
<ul>
<li><strong>Box2Bit Épila</strong> (project &quot;Epilon&quot;), €3,900 M, 150 MW → 520 MW. Moved from Cariñena in January 2026 after Red Eléctrica excluded the Cariñena site from its 2025-2030 grid plan, a textbook speculative-build failure mode.</li>
<li><strong>Azora / Tillion Aragón</strong> (Villamayor de Gállego), €1,100 M initial → €1,950 M expanded, 150 → 300 MW. DIGA granted, tenant undisclosed.</li>
</ul>

<h3>Renewable-integrated</h3>
<p>Datacenters co-located with their own renewable generation, sold as &quot;self-consuming&quot;. The energy story is central to the pitch; the actual computing tenant is often unclear.</p>
<ul>
<li><strong>Forestalia Proyecto Búfalo</strong>, 3 sites (Magallón, Botorrita, Alfamén), €12,048 M, 601 MW total. 50% self-consumption from co-located wind and solar. Now under criminal investigation, see &quot;Operación Perserte&quot; in the map litigation overview.</li>
</ul>

<h3>AI-specialised</h3>
<p>A subset of hyperscaler and colocation builds tuned for very high rack density (30-100+ kW per rack) to house GPU clusters for AI training and inference. Denser cooling, higher water and energy per unit floor area, and a different economic profile — a smaller footprint can absorb enormous capital.</p>
<ul>
<li>AWS La Puebla de Híjar (Teruel), €5,000 M, 100 MW, explicitly AI-specialised, largest AWS campus in Aragón.</li>
</ul>

<h2>Cooling technologies (and what they cost in water)</h2>
<p>Cooling choice is the single biggest driver of a site&apos;s water bill.</p>
<ul>
<li><strong>Evaporative (adiabatic) cooling.</strong> Water evaporates to remove heat. Very effective in dry climates, but consumes hundreds of thousands to millions of m³ per year at hyperscale. Standard AWS choice historically.</li>
<li><strong>Closed-loop liquid cooling.</strong> Water circulates in a sealed system; make-up water is small. Used by Azora / Tillion Aragón and Vantage in Aragón.</li>
<li><strong>Free-cooling / air-side economisers.</strong> Outside air (or air-to-air heat exchange) does the work when ambient temperatures allow. Very low water, higher energy in hot weather. Marketed by QTS Calatorao as &quot;water-free&quot;.</li>
<li><strong>Immersion cooling.</strong> Servers submerged in dielectric fluid. Emerging, common in AI builds, near-zero water use.</li>
</ul>
<p>Industry background: <a href="https://www.ashrae.org/technical-resources/bookstore/datacom-series" target="_blank">ASHRAE Datacom series</a> and <a href="https://tc0909.ashraetcs.org/documents.html" target="_blank">ASHRAE TC 9.9 whitepapers</a>.</p>

<h2>Jargon glossary</h2>
<ul>
<li><strong>MW (IT load)</strong>, the electrical power delivered to the servers. Excludes the losses in cooling and power distribution.</li>
<li><strong>Total facility MW</strong>, IT load plus overhead (cooling, UPS losses, lighting). Total ÷ IT load = <strong>PUE</strong>.</li>
<li><strong>PUE (Power Usage Effectiveness)</strong>, ratio of total power to IT load. New datacenters target 1.2-1.4; older facilities are often above 2.</li>
<li><strong>Anchor tenant</strong>, the primary customer whose lease justifies the build.</li>
<li><strong>Pre-let</strong>, capacity leased before construction is complete.</li>
<li><strong>PPA (Power Purchase Agreement)</strong>, long-term contract to buy electricity, usually from a specific renewable generator.</li>
<li><strong>Colocation</strong>, model where the operator provides shell + power + cooling, and the customer brings servers.</li>
<li><strong>Hyperscaler</strong>, cloud providers at global scale, AWS, Microsoft Azure, Google Cloud, Meta, Oracle Cloud.</li>
</ul>

<h2>Why this matters in Aragón</h2>
<p>Datacenter concentration puts pressure on three shared resources that were already scarce: grid capacity, water in the Ebro basin, and non-urbanised land. The regional government has authorised the wave using the PIGA fast-track, which lets Aragón override municipal planning, expropriate land, and — critics argue — waive the municipal ICIO construction tax. This map exists to make that concentrated pressure legible, per site, with citations.</p>
