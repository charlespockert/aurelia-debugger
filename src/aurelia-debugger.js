import {noView, inject, ViewResources} from 'aurelia-framework';
import './aurelia-debugger.css!';

@noView()
@inject(ViewResources)
export class AureliaDebugger {

	constructor(viewResources) {
		this.vr = viewResources;
		this.vr.registerViewEngineHooks(this);		
	}
	
	createDebugPopup(e, ctx) {	
		var popup = document.createElement("div");
		popup.classList.add("debug-popup");
		
		try {
			var json = shallowStringify(ctx);
   		}
	   	catch(err) {
	   		var json = "Error serializing object: " + err;
		}

   		popup.innerHTML = json;
		popup.style.left = e.clientX + "px";
		popup.style.top = e.clientY + "px";

		document.body.appendChild(popup);
	
		return popup;
	}

	destroyDebugPopup(popup) {
		popup.parentElement.removeChild(popup);
	}

	afterCreate(view) {
		var f = view.fragment;
		var fec = f.firstElementChild;

		if(fec) {
			var popup = null;
			var ctx = view.behaviors.length > 0 ? view.behaviors[0].bindingContext : undefined;
		
			if(ctx) {	
				fec.onmouseenter = (e) => {
					fec.classList.add("debug-element-highlight");
					popup = this.createDebugPopup(e, ctx);
				}

				fec.onmouseleave = (e) => {
					fec.classList.remove("debug-element-highlight");
					this.destroyDebugPopup(popup);
				}

				fec.onclick = (e) => {
					console.log("Dumping context for '" + fec.localName + "'");
					console.log(ctx);
				}
			}
		}
	}
}

function shallowStringify(obj, onlyProps, skipTypes) {
	var objType = typeof(obj);
  	if(['function', 'undefined'].indexOf(objType) >= 0) {
    	return objType;
  	} else if(['string', 'number', 'boolean'].indexOf(objType) >= 0) {
    	return obj; // will toString
  	}

	var res = '{';
  	for (var p in obj) { // property in object
    	if(typeof(onlyProps)!=='undefined' && onlyProps) {
	    // Only show property names as values may show too much noise.
	    // After this you can trace more specific properties to debug
	    res += p +', ';
    
    	} else {
	    	var valType = typeof(obj[p]);
	      	
	      	if(typeof(skipTypes) == 'undefined') {
	        	skipTypes = ['function'];
	      	}

	      	if(skipTypes.indexOf(valType) >= 0) {
	        	res += p + ': ' + valType + ', ';
	      	} else {
	        	res += p + ': ' + obj[p] + ', ';
      		}
    	}
  	}
  	res += '}';
  	
  	return res;
}