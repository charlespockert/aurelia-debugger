System.register(['aurelia-framework'], function (_export) {
	'use strict';

	var inject, ViewSlot, ViewCompiler, ViewResources, Container, CreateWindow;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_aureliaFramework) {
			inject = _aureliaFramework.inject;
			ViewSlot = _aureliaFramework.ViewSlot;
			ViewCompiler = _aureliaFramework.ViewCompiler;
			ViewResources = _aureliaFramework.ViewResources;
			Container = _aureliaFramework.Container;
		}],
		execute: function () {
			CreateWindow = (function () {
				function CreateWindow(vc, vr, container) {
					_classCallCheck(this, _CreateWindow);

					document.addEventListener('aurelia-composed', function (e) {
						console.log("aurelia-started");

						var host = document.createElement("div");
						var windowHost = document.createElement("debug-window");
						host.appendChild(windowHost);

						var view = vc.compile(host).create(container, undefined);
						var slot = new ViewSlot(document.body, true);

						slot.add(view);
						slot.attached();
					}, false);
				}

				var _CreateWindow = CreateWindow;
				CreateWindow = inject(ViewCompiler, ViewResources, Container)(CreateWindow) || CreateWindow;
				return CreateWindow;
			})();

			_export('CreateWindow', CreateWindow);
		}
	};
});