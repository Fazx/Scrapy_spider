"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = remove;

function remove(processorApiDocument) {
  return {
    remove: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.source_field
    }
  };
}

module.exports = exports["default"];
