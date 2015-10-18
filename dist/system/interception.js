System.register(['aurelia-templating', 'aurelia-framework', 'aurelia-dependency-injection'], function (_export) {
  'use strict';

  var View, inject, singleton, Interception;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaTemplating) {
      View = _aureliaTemplating.View;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaDependencyInjection) {
      singleton = _aureliaDependencyInjection.singleton;
    }],
    execute: function () {
      Interception = (function () {
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
            if (View === undefined || typeof View.prototype.attached !== 'function') {
              throw new Error('Unsupported version of View');
            }

            var _this = this;

            var attachedImpl = View.prototype.attached;
            View.prototype.attached = function () {
              for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              var result = attachedImpl.apply(this, args);

              if (_this.viewAttached) _this.viewAttached(this);

              return result;
            };

            var detachedImpl = View.prototype.detached;
            View.prototype.detached = function () {
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
        Interception = singleton()(Interception) || Interception;
        return Interception;
      })();

      _export('Interception', Interception);
    }
  };
});