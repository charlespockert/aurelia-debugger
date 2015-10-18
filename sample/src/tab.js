import {bindable} from 'aurelia-framework';

export class Tab {
    @bindable heading = "Tab";
    visible = false;

    bind(ctx) {
        this["$parent"] = ctx;
    }
}