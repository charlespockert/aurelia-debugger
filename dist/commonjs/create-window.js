'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aureliaFramework = require('aurelia-framework');

var CreateWindow = (function () {
	function CreateWindow(vc, vr, container) {
		_classCallCheck(this, _CreateWindow);

		document.addEventListener('aurelia-composed', function (e) {
			console.log("aurelia-started");

			var host = document.createElement("div");
			var windowHost = document.createElement("debug-window");
			host.appendChild(windowHost);

			var view = vc.compile(host).create(container, undefined);
			var slot = new _aureliaFramework.ViewSlot(document.body, true);

			slot.add(view);
			slot.attached();
		}, false);
	}

	var _CreateWindow = CreateWindow;
	CreateWindow = (0, _aureliaFramework.inject)(_aureliaFramework.ViewCompiler, _aureliaFramework.ViewResources, _aureliaFramework.Container)(CreateWindow) || CreateWindow;
	return CreateWindow;
})();

exports.CreateWindow = CreateWindow;