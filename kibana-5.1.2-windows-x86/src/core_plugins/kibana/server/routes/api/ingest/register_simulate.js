'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.registerSimulate = registerSimulate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _libHandle_es_error = require('../../../lib/handle_es_error');

var _libHandle_es_error2 = _interopRequireDefault(_libHandle_es_error);

var _libProcess_es_ingest_simulate_response = require('../../../lib/process_es_ingest_simulate_response');

var _libProcess_es_ingest_simulate_response2 = _interopRequireDefault(_libProcess_es_ingest_simulate_response);

var _libProcess_es_ingest_simulate_error = require('../../../lib/process_es_ingest_simulate_error');

var _libProcess_es_ingest_simulate_error2 = _interopRequireDefault(_libProcess_es_ingest_simulate_error);

var _libSchemasSimulate_request_schema = require('../../../lib/schemas/simulate_request_schema');

var _libSchemasSimulate_request_schema2 = _interopRequireDefault(_libSchemasSimulate_request_schema);

var _libConvertersIngest_simulate_api_kibana_to_es_converter = require('../../../lib/converters/ingest_simulate_api_kibana_to_es_converter');

var _libConvertersIngest_simulate_api_kibana_to_es_converter2 = _interopRequireDefault(_libConvertersIngest_simulate_api_kibana_to_es_converter);

var _commonLibCase_conversion = require('../../../../common/lib/case_conversion');

function registerSimulate(server) {
  server.route({
    path: '/api/kibana/ingest/simulate',
    method: 'POST',
    config: {
      validate: {
        payload: _libSchemasSimulate_request_schema2['default']
      }
    },
    handler: function handler(request, reply) {
      var boundCallWithRequest = _lodash2['default'].partial(server.plugins.elasticsearch.callWithRequest, request);
      var simulateApiDocument = request.payload;
      var body = (0, _libConvertersIngest_simulate_api_kibana_to_es_converter2['default'])(simulateApiDocument);

      return boundCallWithRequest('transport.request', {
        path: '/_ingest/pipeline/_simulate',
        query: { verbose: true },
        method: 'POST',
        body: body
      }).then(_libProcess_es_ingest_simulate_response2['default'], _libProcess_es_ingest_simulate_error2['default']).then(function (processors) {
        return _lodash2['default'].map(processors, _commonLibCase_conversion.keysToSnakeCaseShallow);
      }).then(reply)['catch'](function (error) {
        reply((0, _libHandle_es_error2['default'])(error));
      });
    }
  });
}

;
