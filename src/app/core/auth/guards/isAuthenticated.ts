import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { LoggedUser } from '../stores/logged-user';

export const isAuthenticated: CanActivateFn = (route, state) => {
  const userStore = inject(LoggedUser);

  if (userStore.isLoggedIn()) {
    return true;
  }

  const router = inject(Router);
  const urlTree = router.parseUrl('/auth/login');
  return new RedirectCommand(urlTree);
};
