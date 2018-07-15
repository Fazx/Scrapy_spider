"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = gsub;

function gsub(processorApiDocument) {
  return {
    gsub: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.source_field,
      pattern: processorApiDocument.pattern,
      replacement: processorApiDocument.replacement
    }
  };
}

module.exports = exports["default"];
