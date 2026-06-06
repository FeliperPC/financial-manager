import { Routes } from '@angular/router';
import { Login } from './login.component';
import { LayoutComponent } from '../../components/layout/layout.component';

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
