import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TransactionType } from '@shared/transactions/enums/transaction-type';
import { Transaction } from '@shared/transactions/interfaces/transaction';

const cssClass = {
  [TransactionType.INCOME]: 'income',
  [TransactionType.OUTCOME]: 'outcome',
};

@Component({
  selector: 'app-transaction-value',
  imports: [CurrencyPipe],
  template: `{{ transaction().value | currency }}`,
  styleUrl: './transaction-value.component.scss',
  host: {
    '[class]': 'cssClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionValue {
  transaction = input.required<Transaction>();
  cssClass = computed(() => {
    return cssClass[this.transaction().type];
  });
}
