import { inject, provideAppInitializer } from '@angular/core';
import { of } from 'rxjs';
import { LoginFacade } from '../facades/login-facade.js';
import { AuthToken } from '../services/auth-token.js';

export function provideLoggedUser() {
  return provideAppInitializer(() => {
    const authToken = inject(AuthToken);
    const loginFacade = inject(LoginFacade);

    if (!authToken.has()) {
      return of();
    }

    const token = authToken.get() as string;
    return loginFacade.refreshToken(token);
  });
}
