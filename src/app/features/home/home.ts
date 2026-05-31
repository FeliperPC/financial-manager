import { Component, signal } from '@angular/core';
import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { TransactionType } from '../../shared/transactions/interfaces/enums/transaction-type';
import { Transaction } from '../../shared/transactions/interfaces/transaction';

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  transactions = signal<Transaction[]>([
    { title: 'Salary', value: 200, type: TransactionType.INCOME },
    { title: 'Shopping', value: 100, type: TransactionType.OUTCOME },
    { title: 'Pet shop', value: 100, type: TransactionType.OUTCOME },
  ]);
}
