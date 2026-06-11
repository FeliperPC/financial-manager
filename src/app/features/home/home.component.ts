import { Component, computed, input } from '@angular/core';
import { Transaction } from '@shared/transactions/interfaces/transaction';
import { Balance } from './components/balance/balance.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { TransactionType } from '@shared/transactions/enums/transaction-type';
import { sumTransactionsByType } from '@shared/transactions/functions/sumTransactionsByType';

@Component({
  selector: 'app-list',
  imports: [Balance, PieChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class Home {
  transactions = input.required<Transaction[]>();

  totalIncome = computed(() => sumTransactionsByType(this.transactions(), TransactionType.INCOME));

  totalOutcome = computed(() =>
    sumTransactionsByType(this.transactions(), TransactionType.OUTCOME),
  );

  transactionPieConfig = computed(() => {
    return {
      labels: ['Income', 'Outcome'],
      dataLabel: 'Transactions',
      data: [this.totalIncome(), this.totalOutcome()],
    };
  });
}
