'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aureliaFramework = require('aurelia-framework');

require('./aurelia-debugger.css!');

var AureliaDebugger = (function () {
	function AureliaDebugger(viewResources) {
		_classCallCheck(this, _AureliaDebugger);

		this.vr = viewResources;
		this.vr.registerViewEngineHooks(this);
	}

	_createClass(AureliaDebugger, [{
		key: 'createDebugPopup',
		value: function createDebugPopup(e, ctx) {
			var popup = document.createElement("div");
			popup.classList.add("debug-popup");

			try {
				var json = JSON.stringify(ctx, handleCircularRefs, 4);
			} catch (err) {
				var json = "Error serializing object: " + err;
			}

			popup.innerHTML = json;
			popup.style.position = 'absolute';
			popup.style.left = e.clientX + "px";
			popup.style.top = e.clientY + "px";

			document.body.appendChild(popup);

			return popup;
		}
	}, {
		key: 'destroyDebugPopup',
		value: function destroyDebugPopup(popup) {
			popup.parentElement.removeChild(popup);
		}
	}, {
		key: 'afterCreate',
		value: function afterCreate(view) {
			var _this = this;

			var f = view.fragment;
			var fec = f.firstElementChild;

			if (fec) {
				var popup = null;
				var ctx = view.behaviors.length > 0 ? view.behaviors[0].bindingContext : undefined;

				if (ctx) {
					fec.onmouseenter = function (e) {
						fec.classList.add("debug-element-highlight");
						popup = _this.createDebugPopup(e, ctx);
					};

					fec.onmouseleave = function (e) {
						fec.classList.remove("debug-element-highlight");
						_this.destroyDebugPopup(popup);
					};
				}
			}
		}
	}]);

	var _AureliaDebugger = AureliaDebugger;
	AureliaDebugger = (0, _aureliaFramework.inject)(_aureliaFramework.ViewResources)(AureliaDebugger) || AureliaDebugger;
	AureliaDebugger = (0, _aureliaFramework.noView)()(AureliaDebugger) || AureliaDebugger;
	return AureliaDebugger;
})();

exports.AureliaDebugger = AureliaDebugger;

function handleCircularRefs(key, value) {
	if (key == 'parent') {
		return value.id;
	} else {
		return value;
	}
}