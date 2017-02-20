'use strict';

var http = require('http');

const API_ENDPOINT = 'nominatim.openstreetmap.org';

var global = {};

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

var query = function(path, done) {
    http.get({
        host: API_ENDPOINT,
        path: path
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
    global: function(globals, value) {
        global = globals;
    },
    
    search: function(params, done) {
        query('/?' + to_encode_uri(params), query_done(params, done));
    },
    
    reverse: function(params, done) {
        params.zoom = params.zoom || 18;
        
        query('/reverse?' + to_encode_uri(params), query_done(params, done));
    },
};
