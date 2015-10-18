import {singleton, bindable, inject} from 'aurelia-framework';
import {DomTracker} from './dom-tracker';

@inject(Element, DomTracker)
export class DebugWindow {

	tracker;
	visible = true;

	constructor(element, tracker) {
		this.element = element;
		this.inspector;
		this.tracker = tracker;

	}

	attached() {
		this.initDraggable(this.element);

		// Keys
		window.onkeydown = (e) => {
		    if (e.ctrlKey && e.keyCode === 190) {
		    	this.capture();
		    } 
		    else if(e.ctrlKey && e.keyCode === 191) {
		    	this.toggle();
		    }
        };
	}

	capture() {
		var i = 0;

		console.log("Aurelia Debugger: Dumping view contexts");
		this.tracker.tracked.forEach(view => {
			i++;
			var element = view.firstChild && view.firstChild.nodeType === 1 ? view.firstChild : view.firstChild.parentElement;
	
			console.log("Item " + i + ": --------------------------------------------");
			console.log(element);
			console.log(view.bindingContext);
			console.log("End of Item " + i + ": -------------------------------------");
		});
	}

	toggle() {
		this.visible = !this.visible;
	}

	getElementName(view) {
		var element = view.firstChild && view.firstChild.nodeType === 1 ? view.firstChild : view.firstChild.parentElement;
		return element.localName;
	}

	getConstructorName(view) {
		if(!view.bindingContext) return "N/A";

		return view.bindingContext.__proto__.constructor.name;
	}

	/* Drag */
	move = false;
	ldivx = 200;
	ldivy = 200;
	mousex = 0;
	mousey = 0;

	initDraggable(element) {
		element.onmousedown = this.mousedown.bind(this);
		document.onmouseup = this.mouseup.bind(this);
		element.onmousemove = this.mousemove.bind(this);
		element.style.position = 'absolute';
		element.style.display = 'block';
	}

	mousedown(e) {
		this.move = true;
		this.mousex = e.clientX; 
		this.mousey = e.clientY;
	}

	mouseup(e) {
		this.move = false;
	}

	mousemove(e) {
		if(this.move) {
			this.ldivx = this.ldivx + e.clientX - this.mousex;
			this.ldivy = this.ldivy + e.clientY - this.mousey;
			this.mousex = e.clientX;
			this.mousey = e.clientY;
			var d = this.element;
			d.style.left = this.ldivx +'px';
			d.style.top = this.ldivy +'px';
		}
	}

}

