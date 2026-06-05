import { makeEnvironmentProviders } from '@angular/core';
import { provideLoggedUser } from './initializers/provide-logged-user';

export function provideAuth() {
  return makeEnvironmentProviders([provideLoggedUser()]);
}
