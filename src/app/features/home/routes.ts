import { Routes } from '@angular/router';
import { Home } from './home';
import { Create } from './pages/create/create';

export default [
  {
    path: '',
    component: Home,
  },
  {
    path: 'create',
    component: Create,
  },
] as Routes;
