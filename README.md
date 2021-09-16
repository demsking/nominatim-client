# Nominatim Client

A basic node module to handle geocoding and reverse geocoding via
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

**Search**

```js
const query = {
  q: 'Avenue Monseigneur Vogt, Yaounde, Cameroon',
  addressdetails: '1'
};

nominatim.search(query).then((result) => console.log(result));
```

Output:

```js
[ { place_id: '81750916',
    licence: 'Data © OpenStreetMap contributors, ODbL 1.0. http://www.openstreetmap.org/copyright',
    osm_type: 'way',
    osm_id: '97815221',
    boundingbox: [ '3.8623122', '3.8708124', '11.5208506', '11.5238461' ],
    lat: '3.8667843',
    lon: '11.5225728',
    display_name: 'Avenue Monseigneur Vogt, Centre Commercial, Yaoundé I, CUY, Mfoundi, CE, 1561, Cameroun',
    class: 'highway',
    type: 'secondary',
    importance: 0.4,
    address:
     { road: 'Avenue Monseigneur Vogt',
       suburb: 'Centre Commercial',
       city: 'Yaoundé I',
       county: 'CUY',
       state: 'CE',
       postcode: '1561',
       country: 'Cameroun',
       country_code: 'cm' } } ]
```

**Reverse**

```js
const query = {
  lat: 3.869414,
  lon: 11.523433
};

client.reverse(query).then((result) => console.log(result));
```

Output:

```js
{ place_id: '122705430',
  licence: 'Data © OpenStreetMap contributors, ODbL 1.0. http://www.openstreetmap.org/copyright',
  osm_type: 'way',
  osm_id: '270179822',
  lat: '3.8696559',
  lon: '11.5237866599278',
  display_name: 'Le Bois d\'Ébène, Avenue Monseigneur Vogt, Centre Commercial, Yaoundé I, CUY, Mfoundi, CE, 1561, Cameroun',
  address:
   { restaurant: 'Le Bois d\'Ébène',
     road: 'Avenue Monseigneur Vogt',
     suburb: 'Centre Commercial',
     city: 'Yaoundé I',
     county: 'CUY',
     state: 'CE',
     postcode: '1561',
     country: 'Cameroun',
     country_code: 'cm' },
  boundingbox: [ '3.8696101', '3.8697112', '11.5237394', '11.5238284' ] }
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
