'use strict';

var https = require('https');

var API_HOST = 'nominatim.openstreetmap.org';

var global = {};
var API_PORT = 443;
var API_PATH = '';


var to_encode_uri = function(params, done) {
    params.format = params.format || 'json';
    params.useragent = params.useragent || 'NodeJS request';

    var params_query = [];

    for (let i in global) {
        params_query.push(i + '=' + encodeURIComponent(global[i]));
    }

    for (let i in params) {
        params_query.push(i + '=' + encodeURIComponent(params[i]));
    }

    return params_query.join('&');
};

var query = function(path,options, done) {
    https.get({
        host: API_HOST,
        port: API_PORT,
        path: API_PATH + path,
        headers: options.headers || {},
    }, function(res) {
        var output = '';

        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            done(false, output, path);
        });
    }).on('error', function(e) {
        done(e, null, path, null);
    });
};

var query_done = function(params, done) {
    return function(err, data, path) {
        if (err) {
            return done(err);
        }

        if (params.format == 'json') {
            data = JSON.parse(data);
        }

        done(false, data, path);
    };
};

module.exports = {
    global: function(globals ) {
      if (typeof globals === 'undefined' || globals === null) {
          // variable is undefined or null
          //just do nothing
        } else {
          global = globals.globalQueryElements || {};
          API_HOST = globals.customHost || API_HOST;
          API_PORT = globals.customPort || API_PORT;
          API_PATH = globals.customPath || API_PATH;
        }

    },

    search: function(params,options, done) {
        query('/?' + to_encode_uri(params), options,query_done(params, done));
    },

    reverse: function(params,options, done) {
        params.zoom = params.zoom || 18;

        query('/reverse?' + to_encode_uri(params), options,query_done(params, done));
    },
};
