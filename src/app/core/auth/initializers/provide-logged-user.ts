import { inject, provideAppInitializer } from '@angular/core';
import { AuthToken } from '../services/auth-token.ts';
import { LoginFacede } from '../facedes/login-facede';
import { of } from 'rxjs';

export function provideLoggedUser() {
  return provideAppInitializer(() => {
    const authToken = inject(AuthToken);
    const loginFacede = inject(LoginFacede);

    if (!authToken.has()) {
      return of();
    }

    const token = authToken.get() as string;
    return loginFacede.refreshToken(token);
  });
}
