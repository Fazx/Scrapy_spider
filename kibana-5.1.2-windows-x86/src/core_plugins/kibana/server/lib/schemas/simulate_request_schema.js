'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _processorsSchemas = require('../processors/schemas');

var ingestProcessorSchemas = _interopRequireWildcard(_processorsSchemas);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

exports['default'] = _joi2['default'].object({
  processors: _joi2['default'].array().items(_lodash2['default'].values(ingestProcessorSchemas)).required().min(1),
  input: _joi2['default'].object().required()
});
module.exports = exports['default'];
