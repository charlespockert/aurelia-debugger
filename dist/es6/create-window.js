import {inject, ViewSlot, ViewCompiler, ViewResources, Container} from 'aurelia-framework';

@inject(ViewCompiler, ViewResources, Container)
export class CreateWindow {

	constructor(vc, vr, container) {

		// Listen for the event.
		document.addEventListener('aurelia-composed', (e) => 
		{ 
			console.log("aurelia-started");

			// Create the element
			var host = document.createElement("div");
			var windowHost = document.createElement("debug-window");
			host.appendChild(windowHost);


			// Compile and add it
			var view = vc.compile(host).create(container, undefined);
			var slot = new ViewSlot(document.body, true);

	   		slot.add(view);
	   		slot.attached();

		}, false);

	}
}