# aurelia-debugger

A visual debug tool for Aurelia applications

![image](https://cloud.githubusercontent.com/assets/9073518/10678421/0c32a516-790a-11e5-8adb-186d1e668e0e.png)

## Installation

1. Install via JSPM `jspm install github:charlespockert/aurelia-debugger`

2. Register the plugin in your Aurelia startup:
```
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    // Add plugin here
    .plugin('charlespockert/aurelia-debugger');
  
  aurelia.start().then(a => a.setRoot('app'));
}
```
**Thats it!**

Start your application and you should see the *context inspector* window

## Key Commands:

**CTRL + . (full stop)** 

captures the current items to the console where you can inspect them further

**CTRL + / (forward slash)**

toggles the context inspector window
