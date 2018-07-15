'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = processESIngestSimulateError;
var _ = require('lodash');

function buildError(error) {
  var errorMessage = _.get(error, 'body.error.root_cause[0].reason');
  return {
    compile: true,
    message: errorMessage
  };
}

function processESIngestSimulateError(error) {
  var processorId = _.get(error, 'body.error.root_cause[0].header.processor_tag');
  if (!processorId) throw error;

  var results = [{
    processorId: processorId,
    error: buildError(error)
  }];

  return results;
}

module.exports = exports['default'];
