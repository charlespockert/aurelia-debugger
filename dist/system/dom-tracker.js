System.register(['aurelia-framework', './interception'], function (_export) {
	'use strict';

	var noView, inject, ViewSlot, ViewCompiler, Container, Interception, DomTracker;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function elementHasNamedParent(element, name) {
		var node = element;

		if (node.localName === name) return true;

		while (node.parentElement) {
			node = node.parentElement;

			if (node.localName === name) return true;
		}

		return false;
	}
	return {
		setters: [function (_aureliaFramework) {
			noView = _aureliaFramework.noView;
			inject = _aureliaFramework.inject;
			ViewSlot = _aureliaFramework.ViewSlot;
			ViewCompiler = _aureliaFramework.ViewCompiler;
			Container = _aureliaFramework.Container;
		}, function (_interception) {
			Interception = _interception.Interception;
		}],
		execute: function () {
			DomTracker = (function () {
				function DomTracker(viewCompiler, container, interception) {
					_classCallCheck(this, _DomTracker);

					this.tracked = [];

					this.vc = viewCompiler;
					this.container = container;
					this.interception = interception;

					this.interception.viewAttached = this.viewAttached.bind(this);
					this.interception.viewDetached = this.viewDetached.bind(this);
					this.interception.interceptViews();
				}

				_createClass(DomTracker, [{
					key: 'viewAttached',
					value: function viewAttached(view) {
						var _this = this;

						var element = view.firstChild && view.firstChild.nodeType === 1 ? view.firstChild : view.firstChild.parentElement;

						if (!elementHasNamedParent(element, 'debug-window')) {
							element.onmouseenter = function (e) {
								var ix = _this.tracked.indexOf(view);

								if (ix === -1) _this.tracked.push(view);
							};
							element.onmouseleave = function (e) {
								var ix = _this.tracked.indexOf(view);

								if (ix !== -1) _this.tracked.splice(ix, 1);
							};
						}
					}
				}, {
					key: 'viewDetached',
					value: function viewDetached(view) {
						var ix = this.tracked.indexOf(view);

						if (ix !== -1) this.tracked.splice(ix, 1);
					}
				}]);

				var _DomTracker = DomTracker;
				DomTracker = inject(ViewCompiler, Container, Interception)(DomTracker) || DomTracker;
				return DomTracker;
			})();

			_export('DomTracker', DomTracker);
		}
	};
});