'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = geoip;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function geoip(processorApiDocument) {
  var processor = {
    geoip: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.source_field
    }
  };
  if (!_lodash2['default'].isEmpty(processorApiDocument.target_field)) {
    processor.geoip.target_field = processorApiDocument.target_field;
  }
  if (!_lodash2['default'].isEmpty(processorApiDocument.database_file)) {
    processor.geoip.database_file = processorApiDocument.database_file;
  }
  if (!_lodash2['default'].isEmpty(processorApiDocument.database_fields)) {
    processor.geoip.properties = processorApiDocument.database_fields;
  }

  return processor;
}

module.exports = exports['default'];
