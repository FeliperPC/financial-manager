import { Component, computed, input } from '@angular/core';
import { BalanceCard } from './components/balance-card/balance-card';
import { Transaction } from '../../../../../../shared/transactions/interfaces/transaction';

@Component({
  selector: 'app-balance',
  imports: [BalanceCard],
  templateUrl: './balance.html',
  styleUrl: './balance.scss',
})
export class Balance {
  transactions = input.required<Transaction[]>();

  totalIncome = computed(() => {
    return this.transactions()
      .filter((item) => item.type == 'income')
      .reduce((acc, item) => acc + item.value, 0);
  });

  totalOutcome = computed(() => {
    return this.transactions()
      .filter((item) => item.type == 'outcome')
      .reduce((acc, item) => acc + item.value, 0);
  });

  totalBalance = computed(() => this.totalIncome() - this.totalOutcome());
}
