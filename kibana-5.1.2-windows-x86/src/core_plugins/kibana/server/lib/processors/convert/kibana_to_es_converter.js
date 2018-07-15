'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = convert;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function convert(processorApiDocument) {
  var types = {
    //<kibana type>: <ingest type>,
    auto: 'auto',
    number: 'float',
    string: 'string',
    boolean: 'boolean'
  };

  var processor = {
    convert: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.source_field,
      type: types[processorApiDocument.type]
    }
  };
  if (!_lodash2['default'].isEmpty(processorApiDocument.target_field)) {
    processor.convert.target_field = processorApiDocument.target_field;
  }

  return processor;
}

module.exports = exports['default'];
