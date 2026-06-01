import { Component, inject, OnInit, signal } from '@angular/core';
import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { TransactionType } from '../../shared/transactions/enums/transaction-type';
import { Transaction } from '../../shared/transactions/interfaces/transaction';
import { NoTransaction } from './components/no-transaction/no-transaction';
import { HttpClient } from '@angular/common/http';
import { TransactionsService } from '../../shared/transactions/services/transactions-service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem, NoTransaction, MatButtonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
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
}
