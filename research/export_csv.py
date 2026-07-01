#!/usr/bin/env python3
"""Flatten data/datacenters.json to data/datacenters.csv for spreadsheet users."""
import csv
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
JSON = ROOT / 'data' / 'datacenters.json'
CSV_OUT = ROOT / 'data' / 'datacenters.csv'


def bool_str(v):
    if v is True:
        return 'true'
    if v is False:
        return 'false'
    return ''


def get_investment(s):
    """Best-available investment field, in €M."""
    for key in ('investment_eur_million',
                'investment_eur_million_phase1',
                'investment_eur_million_full'):
        v = s.get(key)
        if isinstance(v, (int, float)):
            return v
    return ''


def get_capacity_mw(s):
    for key in ('capacity_mw',
                'capacity_mw_initial',
                'capacity_mw_max',
                'capacity_mw_expanded'):
        v = s.get(key)
        if isinstance(v, (int, float)):
            return v
    energy = s.get('energy') or {}
    v = energy.get('site_demand_mw')
    if isinstance(v, (int, float)):
        return v
    return ''


def main():
    data = json.loads(JSON.read_text(encoding='utf-8'))

    fieldnames = [
        'id', 'operator', 'operator_entity', 'operator_type',
        'site_name', 'municipality', 'province', 'lat', 'lon',
        'coords_precision', 'status', 'first_announced',
        'operational_date', 'construction_start',
        'investment_eur_million', 'capacity_mw',
        'tenant_status', 'speculative',
        'uses_piga', 'icio_exempt_via_piga',
        'has_litigation', 'has_tax_dispute', 'has_scandal',
        'grid_connection', 'cooling_tech', 'water_body',
        'sources_count', 'first_source'
    ]

    with CSV_OUT.open('w', encoding='utf-8', newline='') as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for s in data.get('sites', []):
            ei = s.get('expedited_indicators') or {}
            water = s.get('water') or {}
            energy = s.get('energy') or {}
            sources = s.get('sources') or []
            w.writerow({
                'id': s.get('id', ''),
                'operator': s.get('operator', ''),
                'operator_entity': s.get('operator_entity', ''),
                'operator_type': s.get('operator_type', ''),
                'site_name': s.get('site_name', ''),
                'municipality': s.get('municipality', ''),
                'province': s.get('province', ''),
                'lat': s.get('lat', ''),
                'lon': s.get('lon', ''),
                'coords_precision': s.get('coords_precision', ''),
                'status': s.get('status', ''),
                'first_announced': s.get('first_announced', ''),
                'operational_date': s.get('operational_date', ''),
                'construction_start': s.get('construction_start', ''),
                'investment_eur_million': get_investment(s),
                'capacity_mw': get_capacity_mw(s),
                'tenant_status': s.get('tenant_status', ''),
                'speculative': bool_str(s.get('speculative')),
                'uses_piga': bool_str(ei.get('uses_piga')) if isinstance(ei.get('uses_piga'), bool) else ei.get('uses_piga', ''),
                'icio_exempt_via_piga': bool_str(ei.get('icio_exempt_via_piga')) if isinstance(ei.get('icio_exempt_via_piga'), bool) else ei.get('icio_exempt_via_piga', ''),
                'has_litigation': bool_str(bool(ei.get('litigation'))),
                'has_tax_dispute': bool_str(bool(ei.get('tax_dispute'))),
                'has_scandal': bool_str(bool(ei.get('scandal'))),
                'grid_connection': energy.get('grid_connection', ''),
                'cooling_tech': water.get('cooling_tech', ''),
                'water_body': water.get('source_water_body', ''),
                'sources_count': len(sources),
                'first_source': sources[0] if sources else '',
            })
    print(f'OK, wrote {CSV_OUT} ({CSV_OUT.stat().st_size} bytes, {len(data["sites"])} rows)')


if __name__ == '__main__':
    main()
