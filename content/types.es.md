<h1>¿Qué es un centro de datos y qué tipos se están construyendo en Aragón?</h1>
<p class="lede">Una introducción con referencias. Cada categoría se enlaza a proyectos reales del mapa para que el vocabulario conecte con lo que realmente se está construyendo.</p>

<h2>¿Qué es un centro de datos?</h2>
<p>Un centro de datos es una instalación construida a propósito para albergar equipos de cómputo, almacenamiento y red, junto con la distribución eléctrica, la refrigeración, la seguridad y la conectividad necesarias para mantener ese equipo funcionando de forma continua. La capacidad se mide en <strong>MW de carga TI</strong>, no en metros cuadrados, porque la energía y la refrigeración son las restricciones vinculantes.</p>
<p>Dos referencias útiles: la <a href="https://uptimeinstitute.com/tiers" target="_blank">clasificación por niveles del Uptime Institute</a> (estándar del sector para niveles de fiabilidad I a IV) y el <a href="https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks" target="_blank">seguimiento de centros de datos y redes de transmisión de la AIE</a> (huella energética global, actualización anual).</p>

<h2>Tipos que se están construyendo en Aragón</h2>

<h3>Hyperscaler propio</h3>
<p>Proveedores de nube que construyen centros de datos que ellos mismos operan. Sus clientes internos son los usuarios de nube pública de AWS, Azure, etc. Capacidad, cliente y carga de trabajo son todo interno.</p>
<ul>
<li>AWS Villanueva de Gállego, Walqa, El Burgo de Ebro, Zaragoza, La Sotonera, San Mateo de Gállego, La Puebla de Híjar (especializado en IA)</li>
<li>Microsoft La Muela, Villamayor de Gállego, Zaragoza (Puerto Venecia)</li>
</ul>

<h3>Colocation mayorista / hiperescala</h3>
<p>Grandes campus construidos por un promotor especializado y luego arrendados en grandes bloques, normalmente a un único cliente hyperscale por edificio. El inquilino opera los servidores; el operador proporciona la infraestructura, la energía y la refrigeración. Cuando el cliente principal no se divulga en el anuncio, esto entra en terreno <em>especulativo</em>.</p>
<ul>
<li><strong>QTS Calatorao</strong> (Proyecto Rhodes), respaldado por Blackstone. 300 MW, €7.500 M fase 1, sin cliente principal públicamente divulgado.</li>
<li><strong>Vantage Villanueva de Gállego</strong> (campus ZAZ2), respaldado por DigitalBridge con promotor español <em>Desarrollos Ecoindustriales La Cartuja</em>. €3.200 M, 90 MW garantizados por Endesa para la fase 1.</li>
</ul>

<h3>SOCIMI de colocation</h3>
<p>Vehículos inmobiliarios cotizados que añaden capacidad de centros de datos multi-cliente a su cartera industrial y logística. El espacio se arrienda en bloques más pequeños a una mezcla de hyperscalers y clientes corporativos.</p>
<ul>
<li><strong>Merlin Properties + Edged Energy</strong>, ZGZ-WIND 01 y 02, 150 MW combinados. Forma parte del plan Iberia fase III de Merlin de 412 MW (€4.470 M para 2032).</li>
</ul>

<h3>Independiente español / promotor especulativo</h3>
<p>Promotores españoles no-hyperscale que construyen gran capacidad sin cliente principal públicamente divulgado, apostando a que la demanda llegará. La categoría con mayor riesgo de vacancia.</p>
<ul>
<li><strong>Box2Bit Épila</strong> (proyecto «Epilon»), €3.900 M, 150 MW → 520 MW. Se movió desde Cariñena en enero de 2026 tras la exclusión del emplazamiento por parte de Red Eléctrica del plan de red 2025-2030, un caso de manual de fallo especulativo.</li>
<li><strong>Azora / Tillion Aragón</strong> (Villamayor de Gállego), €1.100 M inicial → €1.950 M ampliado, 150 → 300 MW. DIGA concedida, cliente sin divulgar.</li>
</ul>

<h3>Integrado con renovables</h3>
<p>Centros de datos co-ubicados con generación renovable propia, vendidos como «autoconsumo». La historia energética es central en la propuesta; el cliente informático real suele estar poco claro.</p>
<ul>
<li><strong>Forestalia Proyecto Búfalo</strong>, 3 emplazamientos (Magallón, Botorrita, Alfamén), €12.048 M, 601 MW total. 50% de autoconsumo desde eólica y solar co-ubicada. Actualmente bajo investigación penal, ver «Operación Perserte» en el resumen de litigios del mapa.</li>
</ul>

<h3>Especializado en IA</h3>
<p>Un subconjunto de construcciones hyperscaler y colocation ajustadas para muy alta densidad por rack (30-100+ kW por rack) para alojar clústeres de GPU para entrenamiento e inferencia de IA. Refrigeración más densa, más agua y energía por m², y un perfil económico distinto: una huella más pequeña puede absorber un capital enorme.</p>
<ul>
<li>AWS La Puebla de Híjar (Teruel), €5.000 M, 100 MW, explícitamente especializado en IA, mayor campus AWS en Aragón.</li>
</ul>

<h2>Tecnologías de refrigeración (y su coste en agua)</h2>
<p>La elección de refrigeración es el principal factor determinante de la factura de agua de un sitio.</p>
<ul>
<li><strong>Refrigeración evaporativa (adiabática).</strong> El agua se evapora para retirar el calor. Muy eficaz en climas secos, pero consume de cientos de miles a millones de m³ al año a escala hyperscale. Opción estándar histórica de AWS.</li>
<li><strong>Refrigeración líquida en circuito cerrado.</strong> El agua circula en un sistema sellado; el agua de reposición es escasa. Usada por Azora / Tillion Aragón y Vantage en Aragón.</li>
<li><strong>Free-cooling / economizadores de aire.</strong> El aire exterior (o intercambio aire-aire) hace el trabajo cuando la temperatura ambiente lo permite. Muy poca agua, más energía en verano. Comercializado por QTS Calatorao como «sin agua».</li>
<li><strong>Refrigeración por inmersión.</strong> Servidores sumergidos en fluido dieléctrico. Emergente, común en construcciones de IA, uso de agua casi nulo.</li>
</ul>
<p>Contexto sectorial: <a href="https://www.ashrae.org/technical-resources/bookstore/datacom-series" target="_blank">serie Datacom de ASHRAE</a> y <a href="https://tc0909.ashraetcs.org/documents.html" target="_blank">whitepapers de ASHRAE TC 9.9</a>.</p>

<h2>Glosario</h2>
<ul>
<li><strong>MW (carga TI)</strong>, la potencia eléctrica entregada a los servidores. Excluye las pérdidas en refrigeración y distribución.</li>
<li><strong>MW totales del sitio</strong>, carga TI más sobrecargas (refrigeración, pérdidas UPS, iluminación). Total ÷ carga TI = <strong>PUE</strong>.</li>
<li><strong>PUE (Power Usage Effectiveness)</strong>, ratio de potencia total sobre carga TI. Los centros nuevos apuntan a 1,2-1,4; instalaciones antiguas suelen estar por encima de 2.</li>
<li><strong>Cliente principal (anchor tenant)</strong>, el cliente principal cuyo contrato justifica la construcción.</li>
<li><strong>Pre-arrendamiento (pre-let)</strong>, capacidad arrendada antes de que la construcción termine.</li>
<li><strong>PPA (Power Purchase Agreement)</strong>, contrato a largo plazo para comprar electricidad, normalmente de un generador renovable específico.</li>
<li><strong>Colocation</strong>, modelo en el que el operador proporciona edificio + energía + refrigeración, y el cliente aporta los servidores.</li>
<li><strong>Hyperscaler</strong>, proveedores de nube a escala global: AWS, Microsoft Azure, Google Cloud, Meta, Oracle Cloud.</li>
</ul>

<h2 id="heat">Cómo afectan los centros de datos a la temperatura local</h2>
<p>Cada julio de electricidad que entra en un centro de datos sale como calor. A escala hyperscale, ese calor no es trivial. Un estudio revisado por pares (ASME Journal of Engineering for Sustainable Buildings and Cities, 2026) reporta que el flujo de calor de los centros de datos hyperscale alcanza <strong>hasta 6.000 W/m², de dos a seis veces la irradiación solar máxima</strong> en la superficie. Mediciones de temperatura del aire realizadas en vehículo a sotavento de centros de datos operativos en Phoenix (Arizona) encontraron un calentamiento medio <strong>de 0,7 a 0,9°C</strong> respecto a las zonas correspondientes a barlovento, con picos de hasta <strong>2,2°C</strong>. La firma térmica seguía siendo detectable a <strong>500 metros</strong> del perímetro de la instalación.<br><a class="cite" href="https://asmedigitalcollection.asme.org/sustainablebuildings/article/7/2/024501/1233035/Data-Center-Waste-Heat-as-an-Emerging-Urban" target="_blank">Fuente, ASME Journal 2026</a> · <a class="cite" href="https://www.facilitiesdive.com/news/data-centers-raise-temperatures-4-degrees-ASU-Sailor-thermal-plume/821164/" target="_blank">Cobertura, Facilities Dive</a> · <a class="cite" href="https://www.forbes.com/sites/marshallshepherd/2026/05/19/new-evidence-data-centers-cause-hotter-weather/" target="_blank">Cobertura, Forbes (Marshall Shepherd)</a></p>

<p>La <strong>paradoja del enfriamiento evaporativo</strong> agrava esto en un lugar como Aragón. El enfriamiento evaporativo es eficiente en climas secos, por eso se elige a menudo en el valle del Ebro. Pero durante las olas de calor la tecnología demanda más agua justo cuando la cuenca está bajo estrés hídrico. Investigación en <em>Buildings</em> (MDPI, 2024) encuentra que las unidades evaporativas en regiones secas como Urumqi son las más intensivas en agua y que las extracciones escalan con la demanda de refrigeración.<br><a class="cite" href="https://www.mdpi.com/2075-5309/14/11/3623" target="_blank">Fuente, Buildings 2024</a></p>

<p>Frente a eso, AEMET ya advierte que el verano de 2026 podría ser uno de los más extremos en décadas y que Zaragoza y toda la depresión del Ebro son <strong>zonas de máximo riesgo</strong> ante el impacto de las olas de calor. Junio de 2025 fue el más cálido desde que hay registros para la mayor parte de España; las olas de calor empujan ahora regularmente al valle del Ebro a <strong>40-42°C</strong>.<br><a class="cite" href="https://www.ecoticias.com/cambio-climatico/la-aemet-alerta-de-otra-ola-de-calor-con-temperaturas-de-hasta-42-grados" target="_blank">Fuente, AEMET vía ecoticias</a> · <a class="cite" href="https://www.cope.es/emisoras/aragon/teruel-provincia/teruel/noticias/meteorologo-explica-aragon-ola-calor-durara-20260623_3389872.html" target="_blank">Análisis meteorológico, COPE Aragón</a></p>

<p>La cadena aragonesa es por tanto:</p>
<ol>
<li>El valle del Ebro ya es zona de máximo riesgo por olas de calor, y en calentamiento.</li>
<li>Los centros de datos liberan calor a 2-6× la intensidad del sol en superficie, elevando de forma medible la temperatura del aire a sotavento.</li>
<li>El enfriamiento evaporativo se elige porque el clima es seco, pero consume más agua durante las olas de calor, cuando la cuenca del Ebro ya está estresada.</li>
<li>La concentración de 28 sitios proyectados en el mismo corredor convierte un efecto por instalación en un efecto regional.</li>
</ol>
<p>La recuperación de calor residual (introducir el calor en calefacción de distrito, invernaderos o procesos industriales) es la mitigación más efectiva, pero ningún proyecto de Aragón se ha comprometido públicamente con ella a escala. Los ejemplos de referencia son las instalaciones de Google en Hamina (Finlandia) y las de Microsoft en Países Bajos.</p>

<h2>Por qué importa en Aragón</h2>
<p>La concentración de centros de datos ejerce presión sobre cuatro recursos compartidos que ya eran escasos: capacidad de red eléctrica, agua en la cuenca del Ebro, suelo no urbanizado y, según los estudios anteriores, confort térmico durante las olas de calor. El gobierno regional ha autorizado la ola usando la vía rápida PIGA, que permite a Aragón anular el planeamiento municipal, expropiar suelo y, según los críticos, dispensar del impuesto municipal ICIO de construcción. Este mapa existe para hacer legible esa presión concentrada, sitio a sitio, con fuentes.</p>
