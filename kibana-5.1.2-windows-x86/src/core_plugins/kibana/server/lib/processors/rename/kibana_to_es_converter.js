"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rename;

function rename(processorApiDocument) {
  return {
    rename: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.source_field,
      target_field: processorApiDocument.target_field
    }
  };
}

module.exports = exports["default"];
