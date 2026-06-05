import { inject, Injectable } from '@angular/core';
import { AuthPayload } from '../interfaces/authPayload';
import { Auth } from '../services/auth';
import { tap, switchMap, pipe } from 'rxjs';
import { AuthToken } from '../services/auth-token.ts';
import { LoggedUser } from '../stores/logged-user';
import { AuthTokenResponse } from '../interfaces/authToken';

@Injectable({
  providedIn: 'root',
})
export class LoginFacade {
  authService = inject(Auth);
  authToken = inject(AuthToken);
  userStore = inject(LoggedUser);

  login(userCredentials: AuthPayload) {
    return this.authService.login(userCredentials).pipe(this.createUserSession());
  }

  refreshToken(token: string) {
    return this.authService.refreshToken(token).pipe(this.createUserSession());
  }

  private createUserSession() {
    return pipe(
      tap((res: AuthTokenResponse) => this.authToken.set(res.token)),
      switchMap((res) => this.authService.getCurrentUser(res.token)),
      tap((user) => this.userStore.setUser(user)),
    );
  }
}
