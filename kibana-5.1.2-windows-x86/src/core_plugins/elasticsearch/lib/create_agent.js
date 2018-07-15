'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var readFile = function readFile(file) {
  return require('fs').readFileSync(file, 'utf8');
};

module.exports = _lodash2['default'].memoize(function (server) {
  var config = server.config();
  var target = _url2['default'].parse(config.get('elasticsearch.url'));

  if (!/^https/.test(target.protocol)) return new _http2['default'].Agent();

  var agentOptions = {
    rejectUnauthorized: config.get('elasticsearch.ssl.verify')
  };

  if (_lodash2['default'].size(config.get('elasticsearch.ssl.ca'))) {
    agentOptions.ca = config.get('elasticsearch.ssl.ca').map(readFile);
  }

  // Add client certificate and key if required by elasticsearch
  if (config.get('elasticsearch.ssl.cert') && config.get('elasticsearch.ssl.key')) {
    agentOptions.cert = readFile(config.get('elasticsearch.ssl.cert'));
    agentOptions.key = readFile(config.get('elasticsearch.ssl.key'));
  }

  return new _https2['default'].Agent(agentOptions);
});

// See https://lodash.com/docs#memoize: We use a Map() instead of the default, because we want the keys in the cache
// to be the server objects, and by default these would be coerced to strings as keys (which wouldn't be useful)
module.exports.cache = new Map();
