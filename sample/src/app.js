import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
import {inject} from 'aurelia-framework';
import {AureliaDebugger} from 'aurelia-debugger/aurelia-debugger';

@inject(AureliaDebugger)
export class App {
  configureRouter(config, router){
    config.title = 'Demo Pages';
    config.map([
      { route: ['','welcome'],  moduleId: 'welcome',      nav: true, title:'Plugin test' },
  	]);

    this.router = router;
  }
}
