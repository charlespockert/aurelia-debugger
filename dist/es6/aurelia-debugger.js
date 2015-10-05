import {noView, inject, ViewResources} from 'aurelia-framework';
import './aurelia-debugger.css!';

@noView()
@inject(ViewResources)
export class AureliaDebugger {

	constructor(viewResources) {
		this.vr = viewResources;
		this.vr.registerViewEngineHooks(this);		
	}
	
	createDebugPopup(e, behaviors) {	
		var popup = document.createElement("div");
		popup.classList.add("debug-popup");
		
		if(behaviors.constructor === Array) {
			for(var i = 0; i < behaviors.length; i++) {
				this.inspect(popup, behaviors[i]);
			}
		} 
		else {
			this.inspect(popup, behaviors);
		}

		popup.style.left = e.clientX + "px";
		popup.style.top = e.clientY + "px";

		document.body.appendChild(popup);
	
		return popup;
	}

	inspect(popup, behavior) {

		if(!behavior.bindingContext) return;

		var ctx = behavior.bindingContext;
		var hdr = document.createElement("p");
		hdr.innerText = typeof(ctx);
		popup.appendChild(hdr);

		this.createList(popup, ctx);
	}

	createList(popup, ctx) {
		var ul = document.createElement("ul");
		popup.appendChild(ul);

		for(var p in ctx) {

			if(typeof(ctx[p]) !== "function") {
				var li = document.createElement("li");
				li.innerHTML = "<span class='prop'>" + p.toString() + "</span>: <span class='value'>" + ctx[p] + "</span>";
				ul.appendChild(li);
			}
		}
	}

	destroyDebugPopup(popup) {
		popup.parentElement.removeChild(popup);
	}

	afterCreate(view) {
		var f = view.fragment;
		var fec = f.firstElementChild;

		if(fec) {
			var popup = null;
			var ctx = view.behaviors.length > 0 ? view.behaviors : view.bindingContext;
		
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