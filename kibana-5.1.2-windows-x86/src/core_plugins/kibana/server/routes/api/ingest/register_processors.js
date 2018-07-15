'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.registerProcessors = registerProcessors;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _libHandle_es_error = require('../../../lib/handle_es_error');

var _libHandle_es_error2 = _interopRequireDefault(_libHandle_es_error);

var _libProcess_es_ingest_processors_response = require('../../../lib/process_es_ingest_processors_response');

var _libProcess_es_ingest_processors_response2 = _interopRequireDefault(_libProcess_es_ingest_processors_response);

var _commonLibCase_conversion = require('../../../../common/lib/case_conversion');

function registerProcessors(server) {
  server.route({
    path: '/api/kibana/ingest/processors',
    method: 'GET',
    handler: function handler(request, reply) {
      var boundCallWithRequest = _lodash2['default'].partial(server.plugins.elasticsearch.callWithRequest, request);

      return boundCallWithRequest('transport.request', {
        path: '/_nodes/ingest',
        method: 'GET'
      }).then(_libProcess_es_ingest_processors_response2['default']).then(reply)['catch'](function (error) {
        reply((0, _libHandle_es_error2['default'])(error));
      });
    }
  });
}

;
