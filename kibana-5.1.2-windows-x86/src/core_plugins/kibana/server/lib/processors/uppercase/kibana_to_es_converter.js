"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = uppercase;

function uppercase(processorApiDocument) {
  return {
    uppercase: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.source_field
    }
  };
}

module.exports = exports["default"];
