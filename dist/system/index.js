System.register(['./dom-tracker', './create-window'], function (_export) {
  'use strict';

  var DomTracker, CreateWindow;

  _export('configure', configure);

  function configure(aurelia) {
    aurelia.container.get(DomTracker);

    aurelia.container.get(CreateWindow);

    aurelia.globalResources('./debug-window');
  }

  return {
    setters: [function (_domTracker) {
      DomTracker = _domTracker.DomTracker;
    }, function (_createWindow) {
      CreateWindow = _createWindow.CreateWindow;
    }],
    execute: function () {}
  };
});