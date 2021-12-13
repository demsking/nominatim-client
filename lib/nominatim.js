const fetch = require('./fetch');

const API_ENDPOINT = 'nominatim.openstreetmap.org';
const defaultParams = {
  format: 'json',
};

function encode(params) {
  const params_query = [];

  for (const key in params) {
    params_query.push(key + '=' + encodeURIComponent(params[key]));
  }

  return params_query.join('&');
};

module.exports = {
  createClient: ({ useragent, referer, ...options }) => {
    const headers = {
      'User-Agent': useragent,
      referer,
    };

    return {
      search(params) {
        const queryParams = { ...defaultParams, ...options, ...params };
        const search = encode(queryParams);

        return fetch(API_ENDPOINT, `/?${search}`, { ...queryParams, headers });
      },
      reverse(params) {
        const queryParams = { ...defaultParams, zoom: 18, ...options, ...params };
        const search = encode(queryParams);

        return fetch(API_ENDPOINT, `/reverse?${search}`, { ...queryParams, headers });
      },
    };
  },
};
