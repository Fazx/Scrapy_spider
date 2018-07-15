"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = lowercase;

function lowercase(processorApiDocument) {
  return {
    lowercase: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.source_field
    }
  };
}

module.exports = exports["default"];
