import { ResolveFn } from '@angular/router';
import { Transaction } from '@shared/transactions/interfaces/transaction';
import { inject } from '@angular/core';
import { TransactionsService } from '@shared/transactions/services/transactions.service';

export const getTransactionByIdResolver: ResolveFn<Transaction> = (route, state) => {
  const transactionService = inject(TransactionsService);
  const id = route.paramMap.get('id') as string;
  return transactionService.getTransactionById(id);
};
