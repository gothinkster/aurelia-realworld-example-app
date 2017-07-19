import {inject} from 'aurelia-dependency-injection';
import {SharedState} from '../../shared/state/sharedstate';

@inject(SharedState)
export class ProfileComponent {
  
  constructor(sharedState) {
    this.sharedState = sharedState;
  }
  
  activate(params, routeConfig) {
    this.username = params.name;
  }
  
  get isUser() {
    return true;
  }
}
