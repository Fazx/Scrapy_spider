'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _create_agent = require('./create_agent');

var _create_agent2 = _interopRequireDefault(_create_agent);

var _map_uri = require('./map_uri');

var _map_uri2 = _interopRequireDefault(_map_uri);

var _url = require('url');

var _lodash = require('lodash');

function createProxy(server, method, route, config) {

  var options = {
    method: method,
    path: createProxy.createPath(route),
    config: {
      timeout: {
        socket: server.config().get('elasticsearch.requestTimeout')
      }
    },
    handler: {
      proxy: {
        mapUri: (0, _map_uri2['default'])(server),
        agent: (0, _create_agent2['default'])(server),
        xforward: true,
        timeout: server.config().get('elasticsearch.requestTimeout'),
        onResponse: function onResponse(err, responseFromUpstream, request, reply) {
          if (err) {
            reply(err);
            return;
          }

          if (responseFromUpstream.headers.location) {
            // TODO: Workaround for #8705 until hapi has been updated to >= 15.0.0
            responseFromUpstream.headers.location = encodeURI(responseFromUpstream.headers.location);
          }

          reply(null, responseFromUpstream);
        }
      }
    }
  };

  (0, _lodash.assign)(options.config, config);

  server.route(options);
};

createProxy.createPath = function createPath(path) {
  var pre = '/elasticsearch';
  var sep = path[0] === '/' ? '' : '/';
  return '' + pre + sep + path;
};

module.exports = createProxy;
