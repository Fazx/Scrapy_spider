'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = date;

function date(processorApiDocument) {
  var formats = [];
  processorApiDocument.formats.forEach(function (format) {
    if (format.toUpperCase() === 'CUSTOM') {
      if (processorApiDocument.custom_format) {
        formats.push(processorApiDocument.custom_format);
      }
    } else {
      formats.push(format);
    }
  });

  return {
    date: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.source_field,
      target_field: processorApiDocument.target_field,
      formats: formats,
      timezone: processorApiDocument.timezone,
      locale: processorApiDocument.locale
    }
  };
}

module.exports = exports['default'];
