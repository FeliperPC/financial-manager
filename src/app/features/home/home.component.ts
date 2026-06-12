import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { Transaction } from '@shared/transactions/interfaces/transaction';
import { Balance } from './components/balance/balance.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { TransactionType } from '@shared/transactions/enums/transaction-type';
import { sumTransactionsByType } from '@shared/transactions/functions/sumTransactionsByType';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CustomColorDirective } from '@shared/material/buttons/directives/custom-color.directive';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-list',
  imports: [
    Balance,
    PieChartComponent,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    CustomColorDirective,
    MatProgressBarModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  transactions = input.required<Transaction[]>();

  totalIncome = computed(() => sumTransactionsByType(this.transactions(), TransactionType.INCOME));

  totalOutcome = computed(() =>
    sumTransactionsByType(this.transactions(), TransactionType.OUTCOME),
  );

  canShowChart = signal(false);

  transactionPieConfig = computed(() => {
    return {
      labels: ['Income', 'Outcome'],
      dataLabel: 'Transactions',
      data: [this.totalIncome(), this.totalOutcome()],
    };
  });
}
