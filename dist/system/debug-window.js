System.register(['aurelia-framework', './dom-tracker'], function (_export) {
	'use strict';

	var singleton, bindable, inject, DomTracker, DebugWindow;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_aureliaFramework) {
			singleton = _aureliaFramework.singleton;
			bindable = _aureliaFramework.bindable;
			inject = _aureliaFramework.inject;
		}, function (_domTracker) {
			DomTracker = _domTracker.DomTracker;
		}],
		execute: function () {
			DebugWindow = (function () {
				function DebugWindow(element, tracker) {
					_classCallCheck(this, _DebugWindow);

					this.visible = true;
					this.move = false;
					this.ldivx = 200;
					this.ldivy = 200;
					this.mousex = 0;
					this.mousey = 0;

					this.element = element;
					this.inspector;
					this.tracker = tracker;
				}

				_createClass(DebugWindow, [{
					key: 'attached',
					value: function attached() {
						var _this = this;

						this.initDraggable(this.element);

						window.onkeydown = function (e) {
							if (e.ctrlKey && e.keyCode === 190) {
								_this.capture();
							} else if (e.ctrlKey && e.keyCode === 191) {
								_this.toggle();
							}
						};
					}
				}, {
					key: 'capture',
					value: function capture() {
						var i = 0;

						console.log("Aurelia Debugger: Dumping view contexts");
						this.tracker.tracked.forEach(function (view) {
							i++;
							var element = view.firstChild && view.firstChild.nodeType === 1 ? view.firstChild : view.firstChild.parentElement;

							console.log("Item " + i + ": --------------------------------------------");
							console.log(element);
							console.log(view.bindingContext);
							console.log("End of Item " + i + ": -------------------------------------");
						});
					}
				}, {
					key: 'toggle',
					value: function toggle() {
						this.visible = !this.visible;
					}
				}, {
					key: 'getElementName',
					value: function getElementName(view) {
						var element = view.firstChild && view.firstChild.nodeType === 1 ? view.firstChild : view.firstChild.parentElement;
						return element.localName;
					}
				}, {
					key: 'getConstructorName',
					value: function getConstructorName(view) {
						if (!view.bindingContext) return "N/A";

						return view.bindingContext.__proto__.constructor.name;
					}
				}, {
					key: 'initDraggable',
					value: function initDraggable(element) {
						element.onmousedown = this.mousedown.bind(this);
						document.onmouseup = this.mouseup.bind(this);
						element.onmousemove = this.mousemove.bind(this);
						element.style.position = 'absolute';
						element.style.display = 'block';
					}
				}, {
					key: 'mousedown',
					value: function mousedown(e) {
						this.move = true;
						this.mousex = e.clientX;
						this.mousey = e.clientY;
					}
				}, {
					key: 'mouseup',
					value: function mouseup(e) {
						this.move = false;
					}
				}, {
					key: 'mousemove',
					value: function mousemove(e) {
						if (this.move) {
							this.ldivx = this.ldivx + e.clientX - this.mousex;
							this.ldivy = this.ldivy + e.clientY - this.mousey;
							this.mousex = e.clientX;
							this.mousey = e.clientY;
							var d = this.element;
							d.style.left = this.ldivx + 'px';
							d.style.top = this.ldivy + 'px';
						}
					}
				}]);

				var _DebugWindow = DebugWindow;
				DebugWindow = inject(Element, DomTracker)(DebugWindow) || DebugWindow;
				return DebugWindow;
			})();

			_export('DebugWindow', DebugWindow);
		}
	};
});