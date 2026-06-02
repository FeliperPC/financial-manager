import { Routes } from '@angular/router';
import { CreateOrEdit } from './pages/create-or-edit/create-or-edit';
import { getTransactionByIdResolver } from './pages/create-or-edit/resolvers/get-transaction-by-id-resolver';
import { List } from './pages/list/list';

export default [
  {
    path: '',
    component: List,
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
