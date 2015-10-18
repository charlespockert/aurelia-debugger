import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
import {inject} from 'aurelia-framework';

export class App {
  configureRouter(config, router){
    config.title = 'Demo Pages';
    config.map([
      { route: ['','welcome'],  moduleId: 'welcome',      nav: true, title:'Plugin test' },
      { route: 'page2',  moduleId: 'page2',      nav: true, title:'Another page' },
  	]);

    this.router = router;
  }
}
