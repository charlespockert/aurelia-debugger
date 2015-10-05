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
		value: function createDebugPopup(e, behaviors) {
			var popup = document.createElement("div");
			popup.classList.add("debug-popup");

			if (behaviors.constructor === Array) {
				for (var i = 0; i < behaviors.length; i++) {
					this.inspect(popup, behaviors[i]);
				}
			} else {
				this.inspect(popup, behaviors);
			}

			popup.style.left = e.clientX + "px";
			popup.style.top = e.clientY + "px";

			document.body.appendChild(popup);

			return popup;
		}
	}, {
		key: 'inspect',
		value: function inspect(popup, behavior) {

			if (!behavior.bindingContext) return;

			var ctx = behavior.bindingContext;
			var hdr = document.createElement("p");
			hdr.innerText = typeof ctx;
			popup.appendChild(hdr);

			this.createList(popup, ctx);
		}
	}, {
		key: 'createList',
		value: function createList(popup, ctx) {
			var ul = document.createElement("ul");
			popup.appendChild(ul);

			for (var p in ctx) {

				if (typeof ctx[p] !== "function") {
					var li = document.createElement("li");
					li.innerHTML = "<span class='prop'>" + p.toString() + "</span>: <span class='value'>" + ctx[p] + "</span>";
					ul.appendChild(li);
				}
			}
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
				var ctx = view.behaviors.length > 0 ? view.behaviors : view.bindingContext;

				if (ctx) {
					fec.onmouseenter = function (e) {
						fec.classList.add("debug-element-highlight");
						popup = _this.createDebugPopup(e, ctx);
					};

					fec.onmouseleave = function (e) {
						fec.classList.remove("debug-element-highlight");
						_this.destroyDebugPopup(popup);
					};

					fec.onclick = function (e) {
						console.log("Dumping context for '" + fec.localName + "'");
						console.log(ctx);
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

function shallowStringify(obj, onlyProps, skipTypes) {
	var objType = typeof obj;
	if (['function', 'undefined'].indexOf(objType) >= 0) {
		return objType;
	} else if (['string', 'number', 'boolean'].indexOf(objType) >= 0) {
		return obj;
	}

	var res = '{';
	for (var p in obj) {
		if (typeof onlyProps !== 'undefined' && onlyProps) {
			res += p + ', ';
		} else {
			var valType = typeof obj[p];

			if (typeof skipTypes == 'undefined') {
				skipTypes = ['function'];
			}

			if (skipTypes.indexOf(valType) >= 0) {
				res += p + ': ' + valType + ', ';
			} else {
				res += p + ': ' + obj[p] + ', ';
			}
		}
	}
	res += '}';

	return res;
}