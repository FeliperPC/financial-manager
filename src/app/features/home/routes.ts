import { Routes } from '@angular/router';
import { Home } from './home';
import { CreateOrEdit } from './pages/create-or-edit/create-or-edit';
import { getTransactionByIdResolver } from './pages/create-or-edit/resolvers/get-transaction-by-id-resolver';

export default [
  {
    path: '',
    component: Home,
  },
  {
    path: 'create',
    component: CreateOrEdit,
  },
  {
    path: 'edit/:id',
    component: CreateOrEdit,
    resolve: {
      transaction: getTransactionByIdResolver,
    },
  },
] as Routes;
