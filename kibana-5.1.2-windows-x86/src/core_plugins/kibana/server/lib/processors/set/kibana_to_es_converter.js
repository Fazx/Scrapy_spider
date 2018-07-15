"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = set;

function set(processorApiDocument) {
  return {
    set: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.target_field,
      value: processorApiDocument.value
    }
  };
}

module.exports = exports["default"];
