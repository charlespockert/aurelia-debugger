System.register([], function (_export) {
	'use strict';

	_export('configure', configure);

	function configure(aurelia) {
		aurelia.globalResources('./aurelia-debugger');
	}

	return {
		setters: [],
		execute: function () {}
	};
});