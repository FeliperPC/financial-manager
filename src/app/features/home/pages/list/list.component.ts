import { Component, inject, input, linkedSignal, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Confirmation } from '@shared/dialog/confirmation/services/confirmation.service';
import { Feedback } from '@shared/feedback/services/feedback.service';
import { Transaction } from '@shared/transactions/interfaces/transaction';
import { MatButtonModule } from '@angular/material/button';
import { TransactionItem } from './components/transaction-item/transaction-item.component';
import { NoTransaction } from './components/no-transaction/no-transaction.component';
import { Balance } from './components/balance/balance.component';
import { TransactionsService } from '@shared/transactions/services/transactions.service';

@Component({
  selector: 'app-list',
  imports: [Balance, TransactionItem, NoTransaction, MatButtonModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
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
