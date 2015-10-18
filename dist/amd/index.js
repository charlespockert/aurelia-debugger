define(['exports', './dom-tracker', './create-window'], function (exports, _domTracker, _createWindow) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.configure = configure;

  function configure(aurelia) {
    aurelia.container.get(_domTracker.DomTracker);

    aurelia.container.get(_createWindow.CreateWindow);

    aurelia.globalResources('./debug-window');
  }
});