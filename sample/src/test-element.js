import {bindable} from 'aurelia-framework';

export class TestElement {
	@bindable value;

	numbers = [10,21,36,48,101];
	
	bind(ctx) {
		this["$parent"] = ctx;
	}

	testClick(e) {
		console.log(e);
	}
}