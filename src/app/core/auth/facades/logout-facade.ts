import { inject, Injectable } from '@angular/core';
import { Auth } from '../services/auth';
import { LoggedUser } from '../stores/logged-user';
import { tap } from 'rxjs';
import { AuthToken } from '../services/auth-token';

@Injectable({
  providedIn: 'root',
})
export class LogoutFacade {
  authService = inject(Auth);
  store = inject(LoggedUser);
  localStorageService = inject(AuthToken);
  logout() {
    return this.authService.logout().pipe(
      tap(() => this.localStorageService.remove()),
      tap(() => this.store.logout()),
    );
  }
}
