#!/usr/bin/env python3
"""Add Spanish (_es) translations to prose fields in datacenters.json.

Strategy: load the JSON, add `_es` sibling fields where appropriate, write back.
Re-runnable: existing `_es` fields are overwritten only if the translation map
has them.
"""
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / 'data' / 'datacenters.json'

# Top-level translations
TOPLEVEL_ES = {
    'notes_es': (
        'Cada dato enlaza con su fuente. Las coordenadas son por defecto el centroide del '
        "municipio (precisión: 'town_centroid') salvo que se haya reportado públicamente la "
        "ubicación exacta del sitio. El bloque `expedited_indicators` indica cómo cada proyecto "
        'avanzó por la vía rápida regional (PIGA), litigios/alegaciones y atajos procedimentales. '
        'Las construcciones especulativas (sin cliente principal confirmado) se marcan con '
        '`speculative: true`.'
    ),
}

EXPEDITED_ES = {
    'what_it_does_es': (
        'Instrumento legal regional que declara un proyecto privado de "interés general" para '
        'Aragón. Anula los planes de urbanismo municipales (PGOU), reclasifica suelo no '
        'urbanizable, concede el estatus de utilidad pública (lo que permite expropiar), se '
        'tramita a través del Gobierno de Aragón en lugar de los ayuntamientos afectados, y '
        '(según los críticos) sortea el ICIO municipal — una ventaja fiscal que la legislación '
        'vigente no obliga a conceder.'
    ),
    'supporting_legal_basis_es': (
        'Ley 1/2021 de simplificación administrativa de Aragón; Ley 2/2022 '
        '(https://www.boe.es/buscar/doc.php?id=BOE-A-2022-9438) — reduce aún más los plazos '
        'administrativos.'
    ),
}

SMOKING_GUN_ES = (
    'El 5-6 de agosto de 2025, INAGA EXIMIÓ a AWS de la evaluación de impacto ambiental '
    'ordinaria para más de 320 hectáreas en Villanueva de Gállego, Huesca, El Burgo de Ebro y '
    'Zaragoza. El proyecto solo tuvo que cumplir "medidas preventivas, correctoras y '
    'complementarias" en lugar de una EIA completa. Justificación citada por INAGA: los '
    'proyectos "no afectan a espacios naturales protegidos" y producen "afecciones poco '
    'significativas". La misma vía rápida se usó para la fase 0 de la gigafactoría de baterías '
    'de Stellantis, indicando un patrón regional y no un caso aislado.'
)

ICIO_ES = (
    'La tramitación PIGA se ha interpretado como exención del ICIO municipal, aunque ningún '
    'precepto legal lo obliga. Críticos (arainfo, ecologistas) lo describen como privilegio '
    'fiscal arbitrario otorgado por el gobierno Azcón a los hyperscalers.'
)

# Per-site translations: keyed by site `id`.
SITES_ES = {
    'aws-villanueva-gallego': {
        'phase_notes_es': (
            'Ancla de la región AWS eu-south-2 (España). Ampliación: parcela de 13 ha junto al '
            'CD existente + nueva parcela de 68 ha en zona recién urbanizada. Edificios de hasta '
            '12 m de altura visible, hasta 14 m excepcionalmente, 3 plantas de oficinas + 2 de '
            'producción.'
        ),
    },
    'aws-walqa-huesca': {
        'phase_notes_es': (
            'Parcela de 69 ha. Permiso obtenido vía tercera aprobación final parcial del PIGA '
            '(mayo 2026). DIA INAGA más temprana en 2020 para el área de la Plataforma '
            'Logística Sur de Huesca.'
        ),
    },
    'aws-san-mateo-de-gallego': {
        'phase_notes_es': (
            'Campus de 294 hectáreas — segunda mayor huella AWS Aragón tras La Puebla de Híjar.'
        ),
    },
    'aws-la-puebla-de-hijar': {
        'phase_notes_es': (
            'Mayor campus AWS Aragón. 70 ha junto a la N-232, pero la huella total supera las '
            '300 ha entre La Puebla de Híjar y Azaila. Especializado en IA. Las obras comienzan '
            'en otoño de 2027. Contexto poblacional: La Puebla de Híjar tiene 935 habitantes.'
        ),
    },
    'microsoft-la-muela': {
        'phase_notes_es': (
            'El mayor de los tres campus de Microsoft en Aragón por inversión. En el Polígono '
            'Centrovía.'
        ),
    },
    'microsoft-villamayor-de-gallego': {
        'phase_notes_es': (
            'Primer emplazamiento de Microsoft en recibir la declaración PIGA (3 de julio de '
            '2024).'
        ),
    },
    'microsoft-zaragoza-puerto-venecia': {
        'phase_notes_es': (
            'La construcción requiere talar ~1.000 pinos en los Pinares de Venecia. Alegaciones '
            'contundentes presentadas durante la consulta pública.'
        ),
    },
    'blackstone-qts-calatorao': {
        'phase_notes_es': (
            'Primera instalación de QTS en España. 224 ha junto a la A-2, a 7 km de Calatorao. '
            '8 edificios de CD + auxiliares. Fase 1: 2T 2026 → finales de 2035.'
        ),
        'speculative_reasoning_es': (
            'A pesar de la escala Blackstone/QTS, no hay acuerdo público de pre-arrendamiento '
            'ni cliente principal para Calatorao. 300 MW con €7.500M de gasto fase-1 ⇒ riesgo '
            'sustancial de vacancia si la demanda hyperscaler se debilita.'
        ),
    },
    'vantage-villanueva-de-gallego': {
        'phase_notes_es': (
            'Primer campus de Vantage en España. 40 ha en parque ecoindustrial. 5 fases en 10 '
            'años. Refrigeración en circuito cerrado. Empleo inicial 180, hasta 520 puestos '
            'permanentes.'
        ),
        'speculative_reasoning_es': (
            'Colocation hyperscale pero sin pre-arrendamiento público nombrado. Vantage suele '
            'pre-arrendar antes de la construcción completa, pero el patrón de divulgación varía.'
        ),
    },
    'azora-tillion-villamayor': {
        'phase_notes_es': (
            "Nombre oficial del proyecto: 'Tillion Aragón'. 79,6 ha, a menos de 3 km de la "
            'subestación de transporte. DIGA (Declaración de Interés General, precursora del '
            'PIGA) aprobada por el Consejo de Gobierno. Inicio de obras 2026. 150 MW iniciales, '
            'ampliables a 300 MW. Agua: circuito cerrado, equivalente a 25 hogares/año. '
            'Permisos de red concedidos en 2024.'
        ),
        'speculative_reasoning_es': (
            'Respaldado por capital privado sin cliente hyperscaler público. €1.100M+ de gasto '
            'sobre base especulativa supone riesgo de vacancia considerable.'
        ),
    },
    'box2bit-carinena-withdrawn': {
        'phase_notes_es': (
            'Anunciado originalmente en octubre 2024 (€3.400M, 28 ha, 5 edificios en el '
            'Polígono Entreviñas). PROYECTO RETIRADO en enero 2026 tras la exclusión por Red '
            'Eléctrica del plan de inversión 2025–2030, dejando a Cariñena sin acceso viable a '
            'la red. Box2Bit trasladó el proyecto a Épila. Yudigar asumirá las parcelas '
            'liberadas para ampliación industrial (150 empleos).'
        ),
        'withdrawal_reason_es': (
            'Excluido del plan de Red Eléctrica 2025–2030 — sin conexión eléctrica viable'
        ),
        'speculative_reasoning_es': (
            'Independiente español sin pre-arrendamiento hyperscaler público. La retirada '
            'confirmó la tesis del riesgo especulativo: un proyecto multimillonario que nunca '
            'llegó a conectarse a la red.'
        ),
    },
    'box2bit-epila': {
        'phase_notes_es': (
            'Proyecto sustituto tras la exclusión de Cariñena del plan de Red Eléctrica. 33 ha '
            '(ampliables a 100), junto a la A-2. Fase 1: 2 edificios de CD + control de acceso. '
            'Fase 2 pendiente de 300+ MW adicionales.'
        ),
        'speculative_reasoning_es': (
            'Mismo perfil especulativo que el fallido proyecto de Cariñena. €3.900M de gasto '
            'especulativo sin cliente principal divulgado.'
        ),
    },
    'box2bit-calatayud': {
        'speculative_reasoning_es': 'Mismo perfil especulativo que Cariñena.',
    },
    'merlin-zgz-wind-01': {
        'phase_notes_es': (
            'Fase III del plan Iberia de Merlin (412 MW, €4.470M para 2032). Operativo 4T 2029. '
            'Merlin ya posee el suelo y tiene acceso a red garantizado.'
        ),
        'speculative_reasoning_es': (
            'Parte del pipeline de Merlin está pre-arrendado a hyperscalers pero el cliente '
            'específico de Zaragoza no se ha nombrado. Menor riesgo de vacancia que un proyecto '
            'puramente especulativo dado el historial comercial de Merlin.'
        ),
    },
    'merlin-zgz-wind-02': {
        'speculative_reasoning_es': (
            'Segundo edificio Merlin de Zaragoza, cliente principal aún no nombrado.'
        ),
    },
    'forestalia-bufalo-magallon': {
        'phase_notes_es': (
            'Uno de los tres emplazamientos del Proyecto Búfalo. PIGA aprobado por el Gobierno '
            'de Aragón (ORDEN BOA PEJ/1656/2025, 25 nov 2025). Autoconsumo = 50% de la energía '
            'desde renovables co-ubicadas.'
        ),
        'speculative_reasoning_es': (
            'Forestalia es un promotor de energía renovable sin historial operativo en CD. '
            '€12.000M de gasto especulativo en 3 emplazamientos es una de las mayores apuestas '
            'puramente especulativas de CD en Europa. Cliente principal ausente.'
        ),
    },
    'forestalia-bufalo-botorrita': {
        'speculative_reasoning_es': 'Igual que Magallón — pipeline especulativo de Forestalia.',
    },
    'forestalia-bufalo-alfamen': {
        'speculative_reasoning_es': (
            'El mayor de los tres emplazamientos Búfalo. Mismo perfil especulativo.'
        ),
    },
}

# Scandal description translations (long), keyed by site id.
SCANDAL_ES = {
    'forestalia-bufalo-magallon': (
        'El 3 de marzo de 2026, la UCOMA (unidad ambiental de la UCO/Guardia Civil) detuvo a '
        '6 personas incluido el propietario de Forestalia Fernando Samper Rivas como '
        'presunto "centro neurálgico" desde el sector privado, además de un ex alto cargo del '
        'MITECO (Eugenio Jesús Domínguez Collado). 12 registros simultáneos (10 Madrid, 2 '
        'Zaragoza). Delitos investigados: prevaricación ambiental, cohecho, blanqueo de '
        'capitales y pertenencia a organización criminal. Los investigadores creen que '
        'Domínguez manipuló decenas de permisos ambientales en favor de proyectos de '
        'Forestalia a cambio de compensación. El PIGA Búfalo fue aprobado por el Gobierno de '
        'Aragón CUATRO MESES antes de que la administración Azcón pidiera investigar al PSOE '
        'por sus vínculos con Forestalia. Forestalia ha desinvertido posteriormente de 2 de '
        'los 3 centros Búfalo.'
    ),
    'forestalia-bufalo-botorrita': (
        'El propietario de Forestalia, Fernando Samper, fue detenido el 3 de marzo de 2026 en '
        'operación de corrupción ambiental. Ver descripción completa en el registro de '
        'Magallón. Forestalia ha desinvertido de 2 de los 3 centros Búfalo durante la '
        'investigación.'
    ),
    'forestalia-bufalo-alfamen': (
        'El mayor de los 3 emplazamientos Búfalo. El propietario de Forestalia, Fernando '
        'Samper, fue detenido el 3 de marzo de 2026 en operación de corrupción ambiental. Ver '
        'descripción completa en el registro de Magallón.'
    ),
}

# Environmental impact flag translation (Microsoft Puerto Venecia)
ENV_FLAG_ES = {
    'microsoft-zaragoza-puerto-venecia': 'Tala de ~1.000 pinos en los Pinares de Venecia',
}

# AWS site: EIA exemption Spanish
EIA_EXEMPTION_ES = {
    'aws-villanueva-gallego': (
        'INAGA eximió a AWS de la EIA ordinaria para más de 320 ha en Villanueva de Gállego, '
        'Huesca, El Burgo de Ebro y Zaragoza — solo se exigieron "medidas preventivas, '
        'correctoras y complementarias" (ago 2025). Justificación: "afecciones poco '
        'significativas". Mismo patrón aplicado previamente a la fase 0 de la gigafactoría de '
        'baterías de Stellantis.'
    ),
}

# Water field translations
WATER_ES = {
    'aws-villanueva-gallego': {
        'vdg_specific_es': (
            'Se prevé que el consumo de agua en Villanueva de Gállego se multiplique por 5 '
            'respecto al uso local actual'
        ),
    },
    'aws-la-puebla-de-hijar': {
        'negotiation_es': (
            'AWS negocia con regantes de Híjar, Urrea de Gaén y La Puebla a cambio del '
            'entubado parcial de la Acequia de Gaén'
        ),
    },
}


def main():
    data = json.loads(DATA.read_text(encoding='utf-8'))

    # Top-level
    for k, v in TOPLEVEL_ES.items():
        data[k] = v

    if 'expedited_mechanism_explainer' in data:
        for k, v in EXPEDITED_ES.items():
            data['expedited_mechanism_explainer'][k] = v
        sg = data['expedited_mechanism_explainer'].get('smoking_gun_eia_exemption')
        if sg:
            sg['issue_es'] = SMOKING_GUN_ES
        ic = data['expedited_mechanism_explainer'].get('iciotax_controversy')
        if ic:
            ic['issue_es'] = ICIO_ES

    # Per site
    for site in data.get('sites', []):
        sid = site.get('id')

        # Phase notes / speculative reasoning / withdrawal reason
        if sid in SITES_ES:
            for k, v in SITES_ES[sid].items():
                site[k] = v

        # Scandal description
        if sid in SCANDAL_ES:
            ei = site.setdefault('expedited_indicators', {})
            scandal = ei.get('scandal')
            if scandal:
                scandal['description_es'] = SCANDAL_ES[sid]

        # Environmental impact flag
        if sid in ENV_FLAG_ES:
            ei = site.setdefault('expedited_indicators', {})
            flag = ei.get('environmental_impact_flag')
            if flag:
                flag['issue_es'] = ENV_FLAG_ES[sid]

        # EIA exemption (per-site)
        if sid in EIA_EXEMPTION_ES:
            ei = site.setdefault('expedited_indicators', {})
            if 'eia_exemption' in ei:
                ei['eia_exemption_es'] = EIA_EXEMPTION_ES[sid]

        # Water fields
        if sid in WATER_ES:
            water = site.setdefault('water', {})
            for k, v in WATER_ES[sid].items():
                water[k] = v

    DATA.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8'
    )
    print(f'OK — translations added. JSON now {DATA.stat().st_size} bytes.')


if __name__ == '__main__':
    main()
