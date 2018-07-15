"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = append;

function append(processorApiDocument) {
  return {
    append: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.target_field,
      value: processorApiDocument.values
    }
  };
}

module.exports = exports["default"];
