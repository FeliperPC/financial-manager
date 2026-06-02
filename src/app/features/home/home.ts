import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { Transaction } from '../../shared/transactions/interfaces/transaction';
import { NoTransaction } from './components/no-transaction/no-transaction';
import { TransactionsService } from '../../shared/transactions/services/transactions-service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Feedback } from '../../shared/feedback/services/feedback';
import { Confirmation } from '../../shared/dialog/confirmation/services/confirmation';
@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem, NoTransaction, MatButtonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private router = inject(Router);
  transactionsService = inject(TransactionsService);
  transactions = signal<Transaction[]>([]);
  snackBarService = inject(Feedback);
  dialogService = inject(Confirmation);

  ngOnInit(): void {
    this.getTransactions();
  }

  private getTransactions() {
    this.transactionsService.getAll().subscribe({
      next: (result) => {
        this.transactions.set(result);
      },
    });
  }

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
    this.transactions.update((transactions) =>
      transactions.filter((item) => item.id !== transaction.id),
    );
  }
}
