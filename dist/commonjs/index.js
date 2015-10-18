'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.configure = configure;

var _domTracker = require('./dom-tracker');

var _createWindow = require('./create-window');

function configure(aurelia) {
  aurelia.container.get(_domTracker.DomTracker);

  aurelia.container.get(_createWindow.CreateWindow);

  aurelia.globalResources('./debug-window');
}