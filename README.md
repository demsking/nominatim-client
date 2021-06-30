# Nominatim Client

_nominatim-client_ is a basic node module to handle geocoding and reverse geocoding via [OpenStreetMap](http://openstreetmap.org/) (OSM). It attempts to adhere to the [Nominatim usage policy](http://wiki.openstreetmap.org/wiki/Nominatim_usage_policy).

## Installation

```shell
npm install --save nominatim-client
```

## Usage
```js
var nominatim = require('nominatim-client');

// Set the global settings here
nominatim.global({
    useragent: "MyApp",             // The name of your application
    referer: 'http://example.com',  // The referer link
    email: 'user@example.com'       // The valid email
});

// The query
var query = {
    q: 'Avenue Monseigneur Vogt, Yaounde, Cameroon',
    addressdetails: '1'
};
```

### Search

```js
nominatim.search(query, function(err, data) {
    if (err) {
        throw err;
    }

    console.log(data);
});
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

### Reverse

```js
query = {
    lat: 3.869414,
    lon: 11.523433
};

nominatim.reverse(query, function (err, data) {
    if (err) {
        throw err;
    }

    console.log(data);
});
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

## License

(The MIT License)

Copyright (c) 2016 Sébastien Demanou

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
