'use strict';

var log = require('debug')('nominatim-client'),
    util = require('util');

var should = require('should');

var nominatim = require('../index');

nominatim.global({
    useragent: "MyApp",
    referer: 'https://github.com/demsking/nominatim-client',
    email: 'user@example.com'
});

var query = {
    q: 'Avenue Monseigneur Vogt, Yaounde, Cameroon',
    addressdetails: '1'
};

nominatim.search(query, function(err, data) {
    if (err) {
        throw err;
    }
    
    console.log(data);
    
    log('data: ' + util.inspect(data));
    
    data[0].should.have.property('lon');
    data[0].should.have.property('lat');
    data[0].should.have.property('address');
    data[0].address.should.have.property('country');
});

query = {
    lat: 3.869414,
    lon: 11.523433
};

nominatim.reverse(query, function (err, data) {
    if (err) {
        throw err;
    }
    
    console.log(data);
    
    log('data: ' + util.inspect(data));
    
    data.should.have.property('lon');
    data.should.have.property('lat');
    data.should.have.property('address');
    data.address.should.have.property('country');
});
