import {View} from 'aurelia-templating';
import {inject} from 'aurelia-framework';
import {singleton} from 'aurelia-dependency-injection';

@singleton()
export class Interception {

  viewAttached = function(view) { console.log("View attached") };
  viewDetached = function(view) { console.log("View detached ") };

  // Intercept 'attach' since we can only inspect stuff that's in the DOM
  interceptViews() {
    if(View === undefined || typeof View.prototype.attached !== 'function') {
      throw new Error('Unsupported version of View');
    }

    // Capture tracking list
    var _this = this;

    // When a view is attached to the DOM:
    var attachedImpl = View.prototype.attached;
    View.prototype.attached = function(...args) {

      var result = attachedImpl.apply(this, args);
 
      if(_this.viewAttached)
        _this.viewAttached(this);

      return result;
    };

    // When a view is detached from the DOM:
    var detachedImpl = View.prototype.detached;
    View.prototype.detached = function(...args) {

      var result = detachedImpl.apply(this, args);

      if(_this.viewDetached)
        _this.viewDetached(this);

      return result;
    };
  }
}