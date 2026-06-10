import { ResolveFn } from '@angular/router';
import { Transaction } from '@shared/transactions/interfaces/transaction';
import { inject } from '@angular/core';
import { TransactionsService } from '@shared/transactions/services/transactions.service';

export const getTransactionsResolver: ResolveFn<Transaction[]> = (route, state) => {
  const transactionsService = inject(TransactionsService);
  return transactionsService.getAll();
};
