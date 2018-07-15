"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = grok;

function grok(processorApiDocument) {
  return {
    grok: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.source_field,
      patterns: [processorApiDocument.pattern]
    }
  };
}

module.exports = exports["default"];
