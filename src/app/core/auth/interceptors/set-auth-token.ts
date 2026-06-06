import { HttpInterceptorFn } from '@angular/common/http';
import { LoggedUser } from '../stores/logged-user';
import { inject } from '@angular/core';
import { AuthToken } from '../services/auth-token.service';

export const setAuthToken: HttpInterceptorFn = (req, next) => {
  const state = inject(LoggedUser);
  if (!state.isLoggedIn()) {
    return next(req);
  }

  const token = inject(AuthToken).get();
  const reqClone = req.clone({
    withCredentials: true,
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(reqClone);
};
