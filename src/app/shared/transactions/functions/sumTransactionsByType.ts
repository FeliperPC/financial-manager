import { TransactionType } from '../enums/transaction-type';
import { Transaction } from '../interfaces/transaction';

export function sumTransactionsByType(transactions: Transaction[], type: TransactionType) {
  return transactions
    .filter((item) => item.type == type)
    .reduce((acc, item) => acc + item.value, 0);
}
