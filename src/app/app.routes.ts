import { Routes } from '@angular/router';
import { isAuthenticated } from './core/auth/guards/isAuthenticated';

export const routes: Routes = [
  {
    path: '',
    canActivate: [isAuthenticated],
    loadComponent: () => import('./core/layout/layout').then((m) => m.Layout),
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/routes'),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/pages/login/routes'),
  },
];
