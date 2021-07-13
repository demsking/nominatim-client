const nominatim = require('..');

const client = nominatim.createClient({
  useragent: "nominatim-client",
  referer: 'https://gitlab.com/demsking/nominatim-client',
  email: 'user@example.com'
});

test('search', () => {
  const query = {
    q: 'Avenue Monseigneur Vogt, Yaounde, Cameroon',
    addressdetails: 1,
  };

  return client.search(query).then((result) => {
    expect(result).toHaveLength(2);
    expect(result[0].lat).toBeDefined();
    expect(result[0].lon).toBeDefined();
  });
});

test('reverse', () => {
  const query = {
    lat: 3.869414,
    lon: 11.523433,
  };

  return client.reverse(query).then((result) => {
    expect(result.lat).toBeDefined();
    expect(result.lon).toBeDefined();
    expect(result.address).toBeDefined();
  });
});
