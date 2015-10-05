import {bindable} from 'aurelia-framework';

export class TestElement {
	@bindable value;

	bind(ctx) {
		this["$parent"] = ctx;
	}
}