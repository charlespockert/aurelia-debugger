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

		this.popups = 0;
		this.vr = viewResources;
		this.vr.registerViewEngineHooks(this);
	}

	_createClass(AureliaDebugger, [{
		key: 'createDebugPopup',
		value: function createDebugPopup(e, behaviors) {

			var popup = document.createElement("div");
			this.popups++;
			popup.classList.add("debug-popup");

			if (behaviors.constructor === Array) {
				for (var i = 0; i < behaviors.length; i++) {
					this.inspect(popup, behaviors[i]);
				}
			} else {
				this.inspect(popup, behaviors);
			}

			popup.style.left = e.clientX + 5 + 200 * this.popups + "px";
			popup.style.top = e.clientY + 5 + "px";

			document.body.appendChild(popup);

			return popup;
		}
	}, {
		key: 'inspect',
		value: function inspect(popup, behavior) {

			if (!behavior.bindingContext) return;

			var ctx = behavior.bindingContext;
			var hdr = document.createElement("p");
			hdr.innerText = behavior.behavior.apiName;
			popup.appendChild(hdr);

			this.createList(popup, ctx);
		}
	}, {
		key: 'createList',
		value: function createList(popup, ctx) {

			this.propsToList(popup, ctx, 0);
		}
	}, {
		key: 'propsToList',
		value: function propsToList(root, obj, lvl) {

			lvl += 1;

			if (lvl >= 2) return;

			if (obj) {
				var ul = document.createElement("ul");
				root.appendChild(ul);

				for (var key in obj) {
					if (typeof obj[key] != 'object' && typeof obj[key] != "function") {
						var li = document.createElement("li");
						li.innerHTML = "<span class='prop'>" + key + ":</span> " + obj[key];
						ul.appendChild(li);
					}
				}
			}

			return;
		}
	}, {
		key: 'destroyDebugPopup',
		value: function destroyDebugPopup(popup) {
			this.popups--;
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