import { Component, input } from '@angular/core';
import { Transaction } from '@shared/transactions/interfaces/transaction';
import { Balance } from './components/balance/balance.component';

@Component({
  selector: 'app-list',
  imports: [Balance],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class Home {
  transactions = input.required<Transaction[]>();
}
