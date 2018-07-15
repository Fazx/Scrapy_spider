'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = processESIngestSimulateResponse;
var _ = require('lodash');

function buildError(error) {
  var errorMessage = _.get(error, 'root_cause[0].reason') || _.get(error, 'root_cause[0].type');
  if (!errorMessage) return;

  return {
    compile: false,
    message: errorMessage
  };
}

function processESIngestSimulateResponse(resp) {
  var processorResults = _.get(resp, 'docs[0].processor_results');
  var results = processorResults.map(function (processorResult) {
    return {
      processorId: _.get(processorResult, 'tag'),
      output: _.get(processorResult, 'doc._source'),
      error: buildError(_.get(processorResult, 'error'))
    };
  });

  return results;
}

;
module.exports = exports['default'];
