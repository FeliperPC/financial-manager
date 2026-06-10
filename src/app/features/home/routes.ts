import { Routes } from '@angular/router';
import { getTransactionsResolver } from './resolvers/get-transactions-resolver';
import { Home } from './home.component';

export default [
  {
    path: '',
    component: Home,
    resolve: {
      transactions: getTransactionsResolver,
    },
  },
] as Routes;
