# Nominatim Client

A simple client to handle geocoding and reverse geocoding via
[OpenStreetMap (OSM)](http://openstreetmap.org/).
It attempts to adhere to the [Nominatim Usage Policy](https://operations.osmfoundation.org/policies/nominatim/).

[![npm](https://img.shields.io/npm/v/nominatim-client.svg)](https://www.npmjs.com/package/nominatim-client)
[![Build status](https://gitlab.com/demsking/nominatim-client/badges/master/pipeline.svg)](https://gitlab.com/demsking/nominatim-client/pipelines)
[![Test coverage](https://gitlab.com/demsking/nominatim-client/badges/master/coverage.svg)](https://gitlab.com/demsking/nominatim-client/pipelines)
[![Buy me a beer](https://img.shields.io/badge/Buy%20me-a%20beer-1f425f.svg)](https://www.buymeacoffee.com/demsking)

## Install

```sh
npm install nominatim-client
```

## Usage

```js
const nominatim = require('nominatim-client');
const client = nominatim.createClient({
  useragent: "MyApp",             // The name of your application
  referer: 'http://example.com',  // The referer link
});
```

**[Search](https://nominatim.org/release-docs/develop/api/Search/)**

```js
const query = {
  q: '1 boulevard Anatole France Belfort',
  addressdetails: '1'
};

nominatim.search(query).then((result) => console.log(result));
```

Output:

```json
[
  {
    "place_id": 273995170,
    "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    "osm_type": "way",
    "osm_id": 929173018,
    "boundingbox": [
      "47.6405466",
      "47.640965",
      "6.8419814",
      "6.8480751"
    ],
    "lat": "47.6407423",
    "lon": "6.844936",
    "display_name": "Boulevard Anatole France, Le Mont Sud, Belfort, Territoire-de-Belfort, Bourgogne-Franche-Comté, Metropolitan France, 90000, France",
    "class": "highway",
    "type": "primary",
    "importance": 0.5199999999999999,
    "address": {
      "road": "Boulevard Anatole France",
      "suburb": "Le Mont Sud",
      "city": "Belfort",
      "municipality": "Belfort",
      "county": "Territoire-de-Belfort",
      "state": "Bourgogne-Franche-Comté",
      "country": "France",
      "postcode": "90000",
      "country_code": "fr"
    }
  }
]
```

**[Reverse](https://nominatim.org/release-docs/develop/api/Reverse/)**

```js
const query = {
  lat: 47.6407423,
  lon: 6.844936
};

client.reverse(query).then((result) => console.log(result));
```

Output:

```json
{
  "place_id": 119321832,
  "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
  "osm_type": "way",
  "osm_id": 79763493,
  "lat": "47.64105015",
  "lon": "6.845205480320034",
  "display_name": "C, 8A, Boulevard Anatole France, Barres Le Mont, Belfort, Territoire-de-Belfort, Bourgogne-Franche-Comté, Metropolitan France, 90000, France",
  "address": {
    "building": "C",
    "house_number": "8A",
    "road": "Boulevard Anatole France",
    "suburb": "Barres Le Mont",
    "city": "Belfort",
    "municipality": "Belfort",
    "county": "Territoire-de-Belfort",
    "state": "Bourgogne-Franche-Comté",
    "country": "France",
    "postcode": "90000",
    "country_code": "fr"
  },
  "boundingbox": [
    "47.6409593",
    "47.6411156",
    "6.8449412",
    "6.8454734"
  ]
}
```

## Versioning

Given a version number `MAJOR.MINOR.PATCH`, increment the:

- `MAJOR` version when you make incompatible API changes,
- `MINOR` version when you add functionality in a backwards-compatible manner,
  and
- `PATCH` version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions
to the `MAJOR.MINOR.PATCH` format.

See [SemVer.org](https://semver.org/) for more details.

## License

Under the MIT license.
See [LICENSE](https://gitlab.com/demsking/nominatim-client/blob/master/LICENSE)
file for more details.
