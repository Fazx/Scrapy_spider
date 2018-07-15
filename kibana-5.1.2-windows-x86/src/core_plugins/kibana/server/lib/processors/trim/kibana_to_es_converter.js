"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = trim;

function trim(processorApiDocument) {
  return {
    trim: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.source_field
    }
  };
}

module.exports = exports["default"];
