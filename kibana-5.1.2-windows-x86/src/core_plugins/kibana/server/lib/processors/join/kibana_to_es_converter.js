"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = join;

function join(processorApiDocument) {
  return {
    join: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.source_field,
      separator: processorApiDocument.separator
    }
  };
}

module.exports = exports["default"];
