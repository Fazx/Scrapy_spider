'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ingestPipelineApiKibanaToEsConverter;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _processorsConverters = require('../processors/converters');

var ingestProcessorApiKibanaToEsConverters = _interopRequireWildcard(_processorsConverters);

function ingestPipelineApiKibanaToEsConverter(pipelineApiDocument) {
  return {
    processors: _lodash2['default'].map(pipelineApiDocument, function (processor) {
      return ingestProcessorApiKibanaToEsConverters[processor.type_id](processor);
    })
  };
}

module.exports = exports['default'];
