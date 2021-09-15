const https = require('https');

const API_ENDPOINT = 'nominatim.openstreetmap.org';
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

function query(path, { headers, ...params }) {
  return new Promise((resolve, reject) => {
    const url = path + '?' + encode(params);

    https.get({ host: API_ENDPOINT, path: url, headers }, (res) => {
      let data = '';

      res.setEncoding('utf8');
      res.on('error', reject);

      res.on('data', (chunk) => {
          data += chunk;
      });

      res.on('end', () => {
        try {
          data = params.format === 'json' ? JSON.parse(data) : data;

          resolve(data);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
};

module.exports = {
  createClient: ({ useragent, referer, ...options }) => {
    const headers = {
      'User-Agent': useragent,
      referer,
    };

    return {
      search: (params) => query('/', { ...defaultParams, ...options, ...params, headers }),
      reverse: (params) => query('/reverse', { ...defaultParams, zoom: 18, ...options, ...params, headers }),
    };
  },
};
