'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aureliaTemplating = require('aurelia-templating');

var _aureliaFramework = require('aurelia-framework');

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var Interception = (function () {
  function Interception() {
    _classCallCheck(this, _Interception);

    this.viewAttached = function (view) {
      console.log("View attached");
    };

    this.viewDetached = function (view) {
      console.log("View detached ");
    };
  }

  _createClass(Interception, [{
    key: 'interceptViews',
    value: function interceptViews() {
      if (_aureliaTemplating.View === undefined || typeof _aureliaTemplating.View.prototype.attached !== 'function') {
        throw new Error('Unsupported version of View');
      }

      var _this = this;

      var attachedImpl = _aureliaTemplating.View.prototype.attached;
      _aureliaTemplating.View.prototype.attached = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var result = attachedImpl.apply(this, args);

        if (_this.viewAttached) _this.viewAttached(this);

        return result;
      };

      var detachedImpl = _aureliaTemplating.View.prototype.detached;
      _aureliaTemplating.View.prototype.detached = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        var result = detachedImpl.apply(this, args);

        if (_this.viewDetached) _this.viewDetached(this);

        return result;
      };
    }
  }]);

  var _Interception = Interception;
  Interception = (0, _aureliaDependencyInjection.singleton)()(Interception) || Interception;
  return Interception;
})();

exports.Interception = Interception;