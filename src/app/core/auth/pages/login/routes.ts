import { Routes } from '@angular/router';
import { Login } from './login';
import { LayoutComponent } from '../../components/layout/layout';

export default [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'login',
        component: Login,
      },
    ],
  },
] as Routes;
