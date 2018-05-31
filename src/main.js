import environment from './environment';
import {HttpClient} from "aurelia-fetch-client";
import {HttpInterceptor} from "./shared/services/http-interceptor";

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .feature('shared');

  configureHttpClient(aurelia.container);

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}

function configureHttpClient(container) {
  let http = container.get(HttpClient);
  let interceptor = container.get(HttpInterceptor);
  http.configure(config => {
    config
      .withDefaults()
      .withInterceptor(interceptor);
  });
}
