'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = processESIngestProcessorsResponse;
var _ = require('lodash');

function processESIngestProcessorsResponse(response) {
  var nodes = _.get(response, 'nodes');

  var results = _.chain(nodes).map('ingest.processors').reduce(function (result, processors) {
    return result.concat(processors);
  }).map('type').unique().value();

  return results;
}

;
module.exports = exports['default'];
