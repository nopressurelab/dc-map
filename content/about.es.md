<h1>Mapa de Centros de Datos de Aragón</h1>
<p class="lede">Mapa interactivo de cada proyecto de centro de datos anunciado en la región de Aragón,operador, inversores, clientes, consumo energético e hídrico, permisos administrativos y los mecanismos de vía rápida que los autorizan. Cada dato está citado.</p>

<h2>Por qué existe</h2>
<p>Aragón se ha convertido en el mercado de centros de datos más activo del sur de Europa. Morgan Stanley lo llama el «más emocionante» de Europa. A noviembre de 2025, se han comprometido 47.000 millones de euros de inversión, con 11.237 MW proyectados en 28 emplazamientos mapeados por colectivos ecologistas. Si todos se construyen, los centros de datos consumirán más de 9× la demanda eléctrica anual actual de la región.</p>
<p>Esa escala se está autorizando mediante una vía rápida regional llamada <strong>PIGA</strong> (Proyecto de Interés General de Aragón), que anula los planes de urbanismo municipales, reclasifica suelo no urbanizable y,según los críticos,sortea el impuesto municipal ICIO. En agosto de 2025, INAGA eximió directamente a AWS de la evaluación de impacto ambiental ordinaria para más de 320 hectáreas en cuatro municipios. El primer litigio judicial contra centros de datos en España está pendiente en el TSJA. Forestalia, operador de tres proyectos especulativos por 12.000 millones, está en el centro de la <em>Operación Perserte</em>, una investigación activa de la Guardia Civil por cohecho en permisos ambientales.</p>
<p>Este proyecto reúne todo eso en un único conjunto de datos citado, legible por máquina, y lo dispone sobre un mapa.</p>

<h2>Metodología</h2>
<ul>
<li><strong>Cada dato está citado.</strong> Las claves <code>_source</code> a nivel de campo y los arrays <code>sources</code> a nivel de sitio enlazan con fuentes primarias o secundarias de prestigio (BOA, BOE, INAGA, CHE, Heraldo de Aragón, El País, Reuters, Datacenter Dynamics, etc.).</li>
<li><strong>Cuando las fuentes discrepan</strong>, ambas cifras se almacenan con citas separadas en lugar de promediarse (p. ej. agua AWS: 755.000 m³ empresa vs. 14 hm³ críticos).</li>
<li><strong>Construcciones especulativas</strong>,sitios sin cliente principal divulgado,se marcan con <code>speculative: true</code> y se resaltan con anillo en el mapa.</li>
<li><strong>Indicadores de vía rápida</strong> por sitio recogen uso del PIGA, disputas fiscales ICIO, atajos ambientales, litigios e investigaciones penales.</li>
<li><strong>Las coordenadas</strong> son por defecto el centroide del municipio (precisión marcada) salvo que la ubicación exacta del sitio se haya reportado públicamente.</li>
<li><strong>Los vacíos son explícitos.</strong> El array <code>gaps_to_close</code> del conjunto de datos lista lo que falta,es más fácil ampliarlo que fingir completitud.</li>
</ul>

<h2>Registros primarios</h2>
<ul>
<li><a href="https://www.boa.aragon.es/" target="_blank">BOA,Boletín Oficial de Aragón</a> (declaraciones PIGA, decretos regionales)</li>
<li><a href="https://www.boe.es/" target="_blank">BOE,Boletín Oficial del Estado</a> (concesiones de agua, ámbito nacional)</li>
<li><a href="https://www.aragon.es/organismos/instituto-aragones-de-gestion-ambiental-inaga" target="_blank">INAGA</a> (declaraciones de impacto ambiental)</li>
<li><a href="https://iber.chebro.es/" target="_blank">CHE,Confederación Hidrográfica del Ebro</a> (concesiones de agua)</li>
<li><a href="https://www.aragon.es/urbanismo-y-ordenacion-del-territorio/planes-y-proyectos-de-interes-para-aragon-pigas" target="_blank">Registro de PIGAs</a> (Gobierno de Aragón)</li>
<li><a href="https://www.ree.es/" target="_blank">REE,Red Eléctrica</a> (capacidad de conexión a red)</li>
</ul>

<h2>Contribuir</h2>
<p>Issues, correcciones, nuevos sitios y traducciones son bienvenidos en <a href="https://github.com/nopressurelab/dc-map" target="_blank">github.com/nopressurelab/dc-map</a>.</p>
<p>Para añadir un sitio: añade un objeto al array <code>sites</code> en <code>data/datacenters.json</code> siguiendo el esquema. Para traducir campos: añade hermanos <code>_es</code> (la interfaz los detecta automáticamente).</p>
<p>Si detectas un dato erróneo o ausente, abre un issue con la URL de la fuente,esa es la vía más rápida para corregirlo.</p>

<h2>Licencia y citación</h2>
<p>El conjunto de datos, el código y la documentación están bajo licencia <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>. Puedes compartir y adaptar libremente con atribución.</p>
<p>Citación sugerida:</p>
<blockquote>No Pressure Lab. <em>Mapa de Centros de Datos de Aragón</em>. https://github.com/nopressurelab/dc-map</blockquote>
<p>Los hechos originales pertenecen a sus respectivas fuentes (enlazadas en cada registro). La compilación, la estructura y las decisiones editoriales están bajo CC BY 4.0.</p>

<h2>Sobre No Pressure Lab</h2>
<p>No Pressure Lab es un espacio de investigación. Más trabajo en <a href="https://github.com/nopressurelab" target="_blank">github.com/nopressurelab</a>.</p>
