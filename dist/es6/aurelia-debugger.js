import {noView, inject, ViewResources} from 'aurelia-framework';
import './aurelia-debugger.css!';

@noView()
@inject(ViewResources)
export class AureliaDebugger {

	constructor(viewResources) {
		this.popup = undefined;
		this.vr = viewResources;
		this.vr.registerViewEngineHooks(this);		
	}
	
	createDebugPopup(e, behaviors) {	

		this.popup = this.popup || document.createElement("div");
		
		var popup = this.popup;

		popup.classList.add("debug-popup");

		// Add a div to the popup for this inspection
		var section = document.createElement("div");

		if(behaviors.constructor === Array) {
			for(var i = 0; i < behaviors.length; i++) {
				this.inspect(section, behaviors[i]);
			}
		} 
		else {
			this.inspect(section, behaviors);
		}

		popup.appendChild(section);
		
		popup.style.left = (e.clientX + 5) + "px";
		popup.style.top = (e.clientY + 5) + "px";

		document.body.appendChild(popup);
	
		return section;
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
	            
	           
	            if(typeof obj[key] == 'object') {
	            	// Recurse
	            	var li = document.createElement("li");
            		li.innerHTML = "<span class='prop'>"  + key + ":</span> " + obj[key];
	    		    ul.appendChild(li);
	            }
	            else if (typeof obj[key] != "function") {
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

		if(this.popup.children.length == 0){
			this.popup.parentElement.removeChild(this.popup);
			this.popup = undefined;
		}
	}

	afterCreate(view) {
		var f = view.fragment;
		var fec = f.firstElementChild;

		if(fec) {
			var section = null;
			var ctx = view.behaviors.length > 0 ? view.behaviors : view.bindingContext;
		
			if(ctx) {	
				fec.onmouseenter = (e) => {
					fec.classList.add("debug-element-highlight");
					section = this.createDebugPopup(e, ctx);
				}

				fec.onmouseleave = (e) => {
					fec.classList.remove("debug-element-highlight");
					this.destroyDebugPopup(section);
				}

				fec.onclick = (e) => {
					console.log("Dumping context for '" + fec.localName + "'");
					console.log(ctx);
				}
			}
		}
	}
}