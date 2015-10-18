import {DomTracker} from './dom-tracker';
import {CreateWindow} from './create-window';

export function configure(aurelia) {

	// Get interception
	aurelia.container.get(DomTracker);	
    
    // Register the window
	aurelia.container.get(CreateWindow);

    aurelia.globalResources('./debug-window');
}