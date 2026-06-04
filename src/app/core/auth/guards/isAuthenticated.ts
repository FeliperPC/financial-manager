import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { LoggedUser } from '../stores/logged-user';
import { AuthToken } from '../services/auth-token.ts';
import { Auth } from '../services/auth';

export const isAuthenticated: CanActivateFn = (route, state) => {
  const userStore = inject(LoggedUser);

  const authTokenService = inject(AuthToken);
  const authService = inject(Auth);
  const token = authTokenService.get();
  if (token) {
    authService.getCurrentUser(token).subscribe({
      next: (user) => {
        userStore.setUser(user);
      },
    });
    return true;
  }

  if (userStore.isLoggedIn()) {
    return true;
  }

  const router = inject(Router);
  const urlTree = router.parseUrl('/auth/login');
  return new RedirectCommand(urlTree);
};
