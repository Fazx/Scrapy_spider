'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ingestSimulateApiKibanaToEsConverter;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ingest_pipeline_api_kibana_to_es_converter = require('./ingest_pipeline_api_kibana_to_es_converter');

var _ingest_pipeline_api_kibana_to_es_converter2 = _interopRequireDefault(_ingest_pipeline_api_kibana_to_es_converter);

function ingestSimulateApiKibanaToEsConverter(simulateApiDocument) {
  return {
    pipeline: (0, _ingest_pipeline_api_kibana_to_es_converter2['default'])(simulateApiDocument.processors),
    docs: [{
      _source: simulateApiDocument.input
    }]
  };
}

module.exports = exports['default'];
