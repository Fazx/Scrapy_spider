"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = split;

function split(processorApiDocument) {
  return {
    split: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.source_field,
      separator: processorApiDocument.separator
    }
  };
}

module.exports = exports["default"];
