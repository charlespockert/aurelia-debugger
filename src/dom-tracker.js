import {noView, inject, ViewSlot, ViewCompiler, Container} from 'aurelia-framework';
import {Interception} from './interception';

@inject(ViewCompiler, Container, Interception)
export class DomTracker {

	tracked = [];

	constructor(viewCompiler, container, interception) {
		this.vc = viewCompiler;
		this.container = container;
		this.interception = interception;

		this.interception.viewAttached = this.viewAttached.bind(this);
		this.interception.viewDetached = this.viewDetached.bind(this);
		this.interception.interceptViews();
	}
	
	viewAttached(view) {
		var element = view.firstChild && view.firstChild.nodeType === 1 ? view.firstChild : view.firstChild.parentElement;

		if(!elementHasNamedParent(element, 'debug-window')) {
			element.onmouseenter = (e) => {
				var ix = this.tracked.indexOf(view);

				if(ix === -1)
				this.tracked.push(view);
			}
			element.onmouseleave = (e) => {
				var ix = this.tracked.indexOf(view);

				if(ix !== -1)
					this.tracked.splice(ix, 1);
			}
		}
	}

	viewDetached(view) {
		var ix = this.tracked.indexOf(view);

		if(ix !== -1)
			this.tracked.splice(ix, 1);
	}

}

function elementHasNamedParent(element, name) {
	var node = element;

	if(node.localName === name)
		return true;

	while(node.parentElement) {
		node = node.parentElement;

		if(node.localName === name)
			return true;
	}

	return false;
} 
