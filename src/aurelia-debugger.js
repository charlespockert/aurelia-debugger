import {noView, inject, ViewResources} from 'aurelia-framework';
import './aurelia-debugger.css!';

@noView()
@inject(ViewResources)
export class AureliaDebugger {

	constructor(viewResources) {
		this.popups = 0;
		this.vr = viewResources;
		this.vr.registerViewEngineHooks(this);		
	}
	
	createDebugPopup(e, behaviors) {	

		var popup = document.createElement("div");
		this.popups++;
		popup.classList.add("debug-popup");
		
		if(behaviors.constructor === Array) {
			for(var i = 0; i < behaviors.length; i++) {
				this.inspect(popup, behaviors[i]);
			}
		} 
		else {
			this.inspect(popup, behaviors);
		}

		popup.style.left = (e.clientX + 5 + (200 * this.popups)) + "px";
		popup.style.top = (e.clientY + 5) + "px";

		document.body.appendChild(popup);
	
		return popup;
	}

	inspect(popup, behavior) {

		if(!behavior.bindingContext) return;

		var ctx = behavior.bindingContext;
		var hdr = document.createElement("p");
		hdr.innerText = behavior.behavior.apiName;
		popup.appendChild(hdr);

		this.createList(popup, ctx);
	}

	createList(popup, ctx) {
		
		this.propsToList(popup, ctx, 0);

	}

	propsToList(root, obj, lvl) {

		lvl += 1;

		if(lvl >= 2)
			return;

		// Write the UL for this object
		
	    if (obj) {
			var ul = document.createElement("ul");
			root.appendChild(ul);

	        for (var key in obj) {
	            if (typeof obj[key] != 'object' && typeof obj[key] != "function") {
	            	var li = document.createElement("li");
                    li.innerHTML = "<span class='prop'>"  + key + ":</span> " + obj[key];
	    		    ul.appendChild(li);
		        }

	        }

	    }

	    return;
	} 

	destroyDebugPopup(popup) {
		this.popups--;
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