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
			var json = JSON.stringify(ctx, handleCircularRefs, 4);
   		}
	   	catch(err) {
	   		var json = "Error serializing object: " + err;
		}

   		popup.innerHTML = json;
		popup.style.position = 'absolute';
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
			}
		}
	}
}


function handleCircularRefs(key, value) {
  if(key == 'parent') { return value.id; }
  else { return value; }
}