const https = require('https');

module.exports = function fetch(host, path, { headers, ...params }) {
  return new Promise((resolve, reject) => {
    https.get({ host, path, headers }, (res) => {
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
