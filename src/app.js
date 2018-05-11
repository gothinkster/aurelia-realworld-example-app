import {inject} from 'aurelia-dependency-injection';
import {UserService} from './shared/services/user-service';
import {SharedState} from './shared/state/shared-state';
import {Redirect} from 'aurelia-router';

@inject(UserService)
export class App {

  constructor(userService) {
    this.message = 'Hello World!'; // just for unit testing ;)
    this.userService = userService;
  }

  configureRouter(config, router) {
    config.title = 'Conduit';
    config.addAuthorizeStep(AuthorizeStep);
    config.map([
      {route: ['', 'home'], moduleId: 'components/home/home-component', name: 'home', title: 'Home'},
      {route: ['login'], moduleId: 'components/auth/auth-component', name: 'login', title: 'Sign in'},
      {route: ['register'], moduleId: 'components/auth/auth-component', name:'register', title: 'Sign up'},
      {route: ['settings'], moduleId: 'components/settings/settings-component', name:'settings', title: 'Settings', settings: {auth: true}},
      {route: [':name'], moduleId: 'components/profile/profile-component', name:'profile', title: 'Profile'},
      {route: ['editor/:slug?'], moduleId: 'components/editor/editor-component', name:'editor', title: 'Editor', settings: {auth: true}},
      {route: ['article/:slug'], moduleId: 'components/article/article-component', name:'article', title: 'article'}
    ]);

    this.router = router;
  }

  attached() {
    this.userService.populate();
  }
}

@inject(SharedState)
export class AuthorizeStep {
  
  constructor(state) {
    this.state = state;
  }

  run(navigationInstruction, next) {
    if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
      const isLoggedIn = this.state.isAuthenticated;
      if (!isLoggedIn) {
        return next.cancel(new Redirect('login'));
      }
    }

    return next();
  }
}
