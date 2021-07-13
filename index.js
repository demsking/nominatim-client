const https = require('https');

const API_ENDPOINT = 'nominatim.openstreetmap.org';
const defaultOptions = {
  useragent: 'NodeJS request',
};

const defaultParams = {
  format: 'json',
}

function encode(params) {
  const params_query = [];

  for (const key in params) {
    params_query.push(key + '=' + encodeURIComponent(params[key]));
  }

  return params_query.join('&');
};

function query(path, params) {
  return new Promise((resolve, reject) => {
    const url = path + '?' + encode(params);

    https.get({ host: API_ENDPOINT, path: url }, (res) => {
      let data = '';

      res.setEncoding('utf8');
      res.on('error', reject);

      res.on('data', (chunk) => {
          data += chunk;
      });

      res.on('end', () => {
        data = params.format === 'json' ? JSON.parse(data) : data;

        resolve(data);
      });
    }).on('error', reject);
  });
};

module.exports = {
  createClient: (options) => ({
    search: (params) => query('/', { ...defaultOptions, ...options, ...defaultParams, ...params }),
    reverse: (params) => query('/reverse', { ...defaultOptions, ...options, ...defaultParams, zoom: 18, ...params }),
  }),
};
