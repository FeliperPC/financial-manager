import { Routes } from '@angular/router';
import { isAuthenticated } from './core/auth/guards/isAuthenticated';

export const routes: Routes = [
  {
    path: '',
    canActivate: [isAuthenticated],
    loadComponent: () => import('./core/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/routes'),
      },
      {
        path: 'transactions',
        loadChildren: () => import('./features/transactions/routes'),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/pages/login/routes'),
  },
];
