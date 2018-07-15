'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _elasticsearch = require('elasticsearch');

var _elasticsearch2 = _interopRequireDefault(_elasticsearch);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _call_with_request = require('./call_with_request');

var _call_with_request2 = _interopRequireDefault(_call_with_request);

var _filter_headers = require('./filter_headers');

var _filter_headers2 = _interopRequireDefault(_filter_headers);

var readFile = function readFile(file) {
  return require('fs').readFileSync(file, 'utf8');
};

module.exports = function (server) {
  var config = server.config();

  var ElasticsearchClientLogging = (function () {
    function ElasticsearchClientLogging() {
      _classCallCheck(this, ElasticsearchClientLogging);
    }

    _createClass(ElasticsearchClientLogging, [{
      key: 'error',
      value: function error(err) {
        server.log(['error', 'elasticsearch'], err);
      }
    }, {
      key: 'warning',
      value: function warning(message) {
        server.log(['warning', 'elasticsearch'], message);
      }
    }, {
      key: 'info',
      value: function info() {}
    }, {
      key: 'debug',
      value: function debug() {}
    }, {
      key: 'trace',
      value: function trace() {}
    }, {
      key: 'close',
      value: function close() {}
    }]);

    return ElasticsearchClientLogging;
  })();

  function createClient(options) {
    options = _lodash2['default'].defaults(options || {}, {
      url: config.get('elasticsearch.url'),
      username: config.get('elasticsearch.username'),
      password: config.get('elasticsearch.password'),
      verifySsl: config.get('elasticsearch.ssl.verify'),
      clientCrt: config.get('elasticsearch.ssl.cert'),
      clientKey: config.get('elasticsearch.ssl.key'),
      ca: config.get('elasticsearch.ssl.ca'),
      apiVersion: config.get('elasticsearch.apiVersion'),
      pingTimeout: config.get('elasticsearch.pingTimeout'),
      requestTimeout: config.get('elasticsearch.requestTimeout'),
      keepAlive: true,
      auth: true
    });

    var uri = _url2['default'].parse(options.url);

    var authorization = undefined;
    if (options.auth && options.username && options.password) {
      uri.auth = _util2['default'].format('%s:%s', options.username, options.password);
    }

    var ssl = { rejectUnauthorized: options.verifySsl };
    if (options.clientCrt && options.clientKey) {
      ssl.cert = readFile(options.clientCrt);
      ssl.key = readFile(options.clientKey);
    }
    if (options.ca) {
      ssl.ca = options.ca.map(readFile);
    }

    var host = {
      host: uri.hostname,
      port: uri.port,
      protocol: uri.protocol,
      path: uri.pathname,
      auth: uri.auth,
      query: uri.query,
      headers: config.get('elasticsearch.customHeaders')
    };

    return new _elasticsearch2['default'].Client({
      host: host,
      ssl: ssl,
      plugins: options.plugins,
      apiVersion: options.apiVersion,
      keepAlive: options.keepAlive,
      pingTimeout: options.pingTimeout,
      requestTimeout: options.requestTimeout,
      defer: function defer() {
        return _bluebird2['default'].defer();
      },
      log: ElasticsearchClientLogging
    });
  }

  var client = createClient();
  server.on('close', _lodash2['default'].bindKey(client, 'close'));

  var noAuthClient = createClient({ auth: false });
  server.on('close', _lodash2['default'].bindKey(noAuthClient, 'close'));

  server.expose('ElasticsearchClientLogging', ElasticsearchClientLogging);
  server.expose('client', client);
  server.expose('createClient', createClient);
  server.expose('callWithRequestFactory', _lodash2['default'].partial(_call_with_request2['default'], server));
  server.expose('callWithRequest', (0, _call_with_request2['default'])(server, noAuthClient));
  server.expose('filterHeaders', _filter_headers2['default']);
  server.expose('errors', _elasticsearch2['default'].errors);

  return client;
};
