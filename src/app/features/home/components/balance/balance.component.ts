import { Component, computed, input } from '@angular/core';
import { BalanceCard } from './components/balance-card/balance-card.component';
import { Transaction } from '@shared/transactions/interfaces/transaction';
import { TransactionType } from '@shared/transactions/enums/transaction-type';
import { sumTransactionsByType } from '@shared/transactions/functions/sumTransactionsByType';

@Component({
  selector: 'app-balance',
  imports: [BalanceCard],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss',
})
export class Balance {
  transactions = input.required<Transaction[]>();

  totalIncome = computed(() => sumTransactionsByType(this.transactions(), TransactionType.INCOME));

  totalOutcome = computed(() =>
    sumTransactionsByType(this.transactions(), TransactionType.OUTCOME),
  );

  totalBalance = computed(() => this.totalIncome() - this.totalOutcome());
}
