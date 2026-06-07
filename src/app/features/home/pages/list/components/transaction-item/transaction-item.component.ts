import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TransactionValue } from './components/transaction-value/transaction-value.component';
import { Transaction } from '@shared/transactions/interfaces/transaction';
import { CustomColorDirective } from '@shared/material/buttons/directives/custom-color.directive';
import { IsIncomeDirective } from './directives/is-income.directive';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-transaction-item',
  imports: [
    MatCardModule,
    MatButtonModule,
    TransactionValue,
    CustomColorDirective,
    IsIncomeDirective,
    MatChipsModule,
  ],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.scss',
})
export class TransactionItem {
  transaction = input.required<Transaction>();

  edit = output<Transaction>();
  remove = output<Transaction>();
}
