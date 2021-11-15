const nominatim = require('./nominatim');
const fetch = require('./fetch.browser');

module.exports = nominatim(fetch);
