import json
from typing import Dict


def merge(
    source: Dict[str, "str | Dict[str, str]"],
    destination: Dict[str, "str | Dict[str, str]"],
):
    for key, value in source.items():
        if isinstance(value, dict):
            node = destination.setdefault(key, {})
            merge(value, node)
        else:
            destination[key] = value

    return destination


sensitive_data_map: Dict[str, "str | Dict[str, str]"]
realm_data: Dict[str, "str | Dict[str, str]"]

with open("../../realms/sensitive-data-map.json") as f:
    sensitive_data_map = json.load(f)

with open("../../realms/mocap-dev-realm.json") as f:
    realm_data = json.load(f)

with open("../../realms/mocap-dev-realm.json", "w") as f:
    json.dump(
        merge(sensitive_data_map, realm_data),
        f,
        indent=4,
    )
