'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _lodashInternalToPath = require('lodash/internal/toPath');

var _lodashInternalToPath2 = _interopRequireDefault(_lodashInternalToPath);

var _filter_headers = require('./filter_headers');

var _filter_headers2 = _interopRequireDefault(_filter_headers);

module.exports = function (server, client) {
  return function (req, endpoint) {
    var clientParams = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    var wrap401Errors = options.wrap401Errors !== false;
    var filteredHeaders = (0, _filter_headers2['default'])(req.headers, server.config().get('elasticsearch.requestHeadersWhitelist'));
    _lodash2['default'].set(clientParams, 'headers', filteredHeaders);
    var path = (0, _lodashInternalToPath2['default'])(endpoint);
    var api = _lodash2['default'].get(client, path);
    var apiContext = _lodash2['default'].get(client, path.slice(0, -1));
    if (_lodash2['default'].isEmpty(apiContext)) {
      apiContext = client;
    }
    if (!api) throw new Error('callWithRequest called with an invalid endpoint: ' + endpoint);
    return api.call(apiContext, clientParams)['catch'](function (err) {
      if (!wrap401Errors || err.statusCode !== 401) {
        return _bluebird2['default'].reject(err);
      }

      var boomError = _boom2['default'].wrap(err, err.statusCode);
      var wwwAuthHeader = _lodash2['default'].get(err, 'body.error.header[WWW-Authenticate]');
      boomError.output.headers['WWW-Authenticate'] = wwwAuthHeader || 'Basic realm="Authorization Required"';
      throw boomError;
    });
  };
};
