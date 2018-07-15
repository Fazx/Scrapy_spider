'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilsFrom_root = require('../utils/from_root');

var _utilsFrom_root2 = _interopRequireDefault(_utilsFrom_root);

var _lodash = require('lodash');

var asRegExp = (0, _lodash.flow)(_lodash.escapeRegExp, function (path) {
  var last = path.slice(-1);
  if (last === '/' || last === '\\') {
    // match a directory explicitly
    return path + '.*';
  } else {
    // match a directory or files or just the absolute path
    return path + '(?:\\.js$|$|\\\\|\\/)?';
  }
}, RegExp);

var arr = function arr(v) {
  return [].concat(v || []);
};

module.exports = (function () {
  function UiBundlerEnv(workingDir) {
    _classCallCheck(this, UiBundlerEnv);

    // the location that bundle entry files and all compiles files will
    // be written
    this.workingDir = workingDir;

    // the context that the bundler is running in, this is not officially
    // used for anything but it is serialized into the entry file to ensure
    // that they are invalidated when the context changes
    this.context = {};

    // the plugins that are used to build this environment
    // are tracked and embedded into the entry file so that when the
    // environment changes we can rebuild the bundles
    this.pluginInfo = [];

    // regular expressions which will prevent webpack from parsing the file
    this.noParse = [/node_modules[\/\\](angular|elasticsearch-browser)[\/\\]/, /node_modules[\/\\](mocha|moment)[\/\\]/];

    // webpack aliases, like require paths, mapping a prefix to a directory
    this.aliases = {
      ui: (0, _utilsFrom_root2['default'])('src/ui/public'),
      test_harness: (0, _utilsFrom_root2['default'])('src/test_harness/public'),
      querystring: 'querystring-browser'
    };

    // map of which plugins created which aliases
    this.aliasOwners = {};

    // webpack loaders map loader configuration to regexps
    this.loaders = [];
    this.postLoaders = [];
  }

  _createClass(UiBundlerEnv, [{
    key: 'consumePlugin',
    value: function consumePlugin(plugin) {
      var tag = plugin.id + '@' + plugin.version;
      if ((0, _lodash.includes)(this.pluginInfo, tag)) return;

      if (plugin.publicDir) {
        this.aliases['plugins/' + plugin.id] = plugin.publicDir;
      }

      this.pluginInfo.push(tag);
    }
  }, {
    key: 'exportConsumer',
    value: function exportConsumer(type) {
      var _this = this;

      switch (type) {
        case 'loaders':
          return function (plugin, spec) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = arr(spec)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var loader = _step.value;
                _this.addLoader(loader);
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator['return']) {
                  _iterator['return']();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          };

        case 'postLoaders':
          return function (plugin, spec) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = arr(spec)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var loader = _step2.value;
                _this.addPostLoader(loader);
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                  _iterator2['return']();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          };

        case 'noParse':
          return function (plugin, spec) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = arr(spec)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var re = _step3.value;
                _this.addNoParse(re);
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                  _iterator3['return']();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          };

        case 'modules':
          return function (plugin, spec) {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = (0, _lodash.keys)(spec)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var id = _step4.value;
                _this.addModule(id, spec[id], plugin.id);
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                  _iterator4['return']();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }
          };
      }
    }
  }, {
    key: 'addContext',
    value: function addContext(key, val) {
      this.context[key] = val;
    }
  }, {
    key: 'addLoader',
    value: function addLoader(loader) {
      this.loaders.push(loader);
    }
  }, {
    key: 'addPostLoader',
    value: function addPostLoader(loader) {
      this.postLoaders.push(loader);
    }
  }, {
    key: 'addNoParse',
    value: function addNoParse(regExp) {
      this.noParse.push(regExp);
    }
  }, {
    key: 'addModule',
    value: function addModule(id, spec, pluginId) {
      this.claim(id, pluginId);

      // configurable via spec
      var path = undefined;
      var parse = true;
      var imports = null;
      var exports = null;
      var expose = null;

      // basic style, just a path
      if ((0, _lodash.isString)(spec)) path = spec;

      if ((0, _lodash.isArray)(spec)) {
        path = spec[0];
        imports = spec[1];
        exports = spec[2];
      }

      if ((0, _lodash.isPlainObject)(spec)) {
        path = spec.path;
        parse = (0, _lodash.get)(spec, 'parse', parse);
        imports = (0, _lodash.get)(spec, 'imports', imports);
        exports = (0, _lodash.get)(spec, 'exports', exports);
        expose = (0, _lodash.get)(spec, 'expose', expose);
      }

      if (!path) {
        throw new TypeError('Invalid spec definition, unable to identify path');
      }

      this.aliases[id] = path;

      var loader = [];
      if (imports) {
        loader.push('imports?' + imports);
      }

      if (exports) loader.push('exports?' + exports);
      if (expose) loader.push('expose?' + expose);
      if (loader.length) this.loaders.push({ test: asRegExp(path), loader: loader.join('!') });
      if (!parse) this.addNoParse(path);
    }
  }, {
    key: 'claim',
    value: function claim(id, pluginId) {
      var owner = pluginId ? 'Plugin ' + pluginId : 'Kibana Server';

      // TODO(spalger): we could do a lot more to detect colliding module defs
      var existingOwner = this.aliasOwners[id] || this.aliasOwners[id + '$'];

      if (existingOwner) {
        throw new TypeError(owner + ' attempted to override export "' + id + '" from ' + existingOwner);
      }

      this.aliasOwners[id] = owner;
    }
  }]);

  return UiBundlerEnv;
})();
