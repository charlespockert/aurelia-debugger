define(['exports', 'aurelia-framework', './aurelia-debugger.css!'], function (exports, _aureliaFramework, _aureliaDebuggerCss) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var AureliaDebugger = (function () {
		function AureliaDebugger(viewResources) {
			_classCallCheck(this, _AureliaDebugger);

			this.popup = undefined;
			this.vr = viewResources;
			this.vr.registerViewEngineHooks(this);
		}

		_createClass(AureliaDebugger, [{
			key: 'createDebugPopup',
			value: function createDebugPopup(e, behaviors) {

				this.popup = this.popup || document.createElement("div");

				var popup = this.popup;

				popup.classList.add("debug-popup");

				var section = document.createElement("div");

				if (behaviors.constructor === Array) {
					for (var i = 0; i < behaviors.length; i++) {
						this.inspect(section, behaviors[i]);
					}
				} else {
					this.inspect(section, behaviors);
				}

				popup.appendChild(section);

				popup.style.left = e.clientX + 5 + "px";
				popup.style.top = e.clientY + 5 + "px";

				document.body.appendChild(popup);

				return section;
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

						if (typeof obj[key] == 'object') {
							var li = document.createElement("li");
							li.innerHTML = "<span class='prop'>" + key + ":</span> " + obj[key];
							ul.appendChild(li);
						} else if (typeof obj[key] != "function") {
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

				if (this.popup.children.length == 0) {
					this.popup.parentElement.removeChild(this.popup);
					this.popup = undefined;
				}
			}
		}, {
			key: 'afterCreate',
			value: function afterCreate(view) {
				var _this = this;

				var f = view.fragment;
				var fec = f.firstElementChild;

				if (fec) {
					var section = null;
					var ctx = view.behaviors.length > 0 ? view.behaviors : view.bindingContext;

					if (ctx) {
						fec.onmouseenter = function (e) {
							fec.classList.add("debug-element-highlight");
							section = _this.createDebugPopup(e, ctx);
						};

						fec.onmouseleave = function (e) {
							fec.classList.remove("debug-element-highlight");
							_this.destroyDebugPopup(section);
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
});