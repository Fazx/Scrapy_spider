'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _baseSchema = require('../base/schema');

var join = _baseSchema.base.keys({
  type_id: _joi2['default'].string().only('join').required(),
  source_field: _joi2['default'].string().allow(''),
  separator: _joi2['default'].string().allow('')
});
exports.join = join;
