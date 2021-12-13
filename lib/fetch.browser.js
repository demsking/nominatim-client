module.exports = async function query(host, path, { headers, ...params }) {
  const response = await fetch('https://' + host + path, { headers });

  return params.format === 'json'
    ? await response.json()
    : await response.text();
};
