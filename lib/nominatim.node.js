const nominatim = require('./nominatim');
const fetch = require('./fetch.node');

module.exports = nominatim(fetch);
