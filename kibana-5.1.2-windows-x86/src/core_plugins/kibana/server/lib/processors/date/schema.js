'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _baseSchema = require('../base/schema');

var date = _baseSchema.base.keys({
  type_id: _joi2['default'].string().only('date').required(),
  source_field: _joi2['default'].string().allow(''),
  target_field: _joi2['default'].string().allow(''),
  formats: _joi2['default'].array().items(_joi2['default'].string().allow('')),
  timezone: _joi2['default'].string().allow(''),
  locale: _joi2['default'].string().allow(''),
  custom_format: _joi2['default'].string().allow('')
});
exports.date = date;
