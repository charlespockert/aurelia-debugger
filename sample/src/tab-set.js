import {sync, bindable} from 'aurelia-framework';

@sync({ name: "tabs", selector: "tab" })
export class TabSet {
    tabs = [];
    @bindable selectedTab = null;
    @bindable selectedIndex = 0;
    @bindable tabChanged;

    bind(ctx) {
        this["$parent"] = ctx;
    }

    selectedTabChanged() {
        this.onTabChanged();
    }

    tabsChanged() {
        if (this.tabs.length > 0) {
            if (this.selectedIndex >= this.tabs.length)
                this.selectedTab = this.tabs[0];
            else
                this.selectedTab = this.tabs[this.selectedIndex];
        }
        else
            this.selectedTab = null;   

        this.updateVisibility();
    }

    onTabChanged() {
        if (this.tabChanged)
            this.tabChanged(this.selectedTab);
    }

    selectTab(tab) {
        this.selectedTab = tab;

        // Find tab index
        var i = 0;
        this.tabs.forEach(t => { if (t === this.selectedTab) this.selectedIndex = i; i++ })

        this.updateVisibility();
    }

    updateVisibility() {
        this.tabs.forEach(tab => {
            tab.visible = tab === this.selectedTab;
        });
    }
}