import { Component, inject, OnInit, signal } from '@angular/core';
import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { Transaction } from '../../shared/transactions/interfaces/transaction';
import { NoTransaction } from './components/no-transaction/no-transaction';
import { TransactionsService } from '../../shared/transactions/services/transactions-service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

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
}
