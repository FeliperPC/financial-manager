import { Component, inject, resource, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Confirmation } from '@shared/dialog/confirmation/services/confirmation.service';
import { Feedback } from '@shared/feedback/services/feedback.service';
import { Transaction } from '@shared/transactions/interfaces/transaction';
import { MatButtonModule } from '@angular/material/button';
import { TransactionItem } from './components/transaction-item/transaction-item.component';
import { NoTransaction } from './components/no-transaction/no-transaction.component';
import { TransactionsService } from '@shared/transactions/services/transactions.service';
import { SearchComponent } from './components/search/search/search.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-list',
  imports: [TransactionItem, NoTransaction, MatButtonModule, RouterLink, SearchComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class List {
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);
  transactionsService = inject(TransactionsService);
  snackBarService = inject(Feedback);
  dialogService = inject(Confirmation);

  search = signal('');

  resourceRef = resource({
    params: () => this.search(),
    loader: () => {
      return firstValueFrom(this.transactionsService.getAll(this.search()));
    },
    defaultValue: [],
  });

  edit(transaction: Transaction) {
    this.router.navigate(['edit', transaction.id], { relativeTo: this.activeRoute });
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
    this.resourceRef.update((transactions) =>
      transactions.filter((item) => item.id !== transaction.id),
    );
  }
}
