import { Component, inject, input, linkedSignal, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Confirmation } from '@shared/dialog/confirmation/services/confirmation';
import { Feedback } from '@shared/feedback/services/feedback';
import { Transaction } from '@shared/transactions/interfaces/transaction';
import { TransactionsService } from '@shared/transactions/services/transactions-service';
import { MatButtonModule } from '@angular/material/button';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { NoTransaction } from './components/no-transaction/no-transaction';
import { Balance } from './components/balance/balance';

@Component({
  selector: 'app-list',
  imports: [Balance, TransactionItem, NoTransaction, MatButtonModule, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  private router = inject(Router);
  transactionsService = inject(TransactionsService);
  transactions = input.required<Transaction[]>();
  snackBarService = inject(Feedback);
  dialogService = inject(Confirmation);

  list = linkedSignal(() => this.transactions());

  edit(transaction: Transaction) {
    this.router.navigate(['edit', transaction.id]);
  }

  remove(transaction: Transaction) {
    this.dialogService
      .open({
        title: 'Delete transaction',
        message: `Are you sure you want to delete this transaction : ${transaction.title}  ?`,
      })
      .subscribe({
        next: () => {
          this.transactionsService.remove(transaction.id).subscribe({
            next: () => {
              this.removeTransactionFromArray(transaction);
              this.snackBarService.success('Transaction removed successfully');
            },
          });
        },
      });
  }

  private removeTransactionFromArray(transaction: Transaction) {
    this.list.update((transactions) => transactions.filter((item) => item.id !== transaction.id));
  }
}
