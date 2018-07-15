'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _register_processors = require('./register_processors');

var _register_simulate = require('./register_simulate');

var _register_field_capabilities = require('./register_field_capabilities');

exports['default'] = function (server) {
  (0, _register_processors.registerProcessors)(server);
  (0, _register_simulate.registerSimulate)(server);
  (0, _register_field_capabilities.registerFieldCapabilities)(server);
};

module.exports = exports['default'];
