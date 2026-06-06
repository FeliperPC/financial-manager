import { Component, computed, input } from '@angular/core';
import { TransactionType } from '@shared/transactions/enums/transaction-type';
import { Transaction } from '@shared/transactions/interfaces/transaction';

const cssClass = {
  [TransactionType.INCOME]: 'income',
  [TransactionType.OUTCOME]: 'outcome',
};

@Component({
  selector: 'app-transaction-value',
  imports: [],
  template: `{{ transaction().value }}`,
  styleUrl: './transaction-value.component.scss',
  host: {
    '[class]': 'cssClass()',
  },
})
export class TransactionValue {
  transaction = input.required<Transaction>();
  cssClass = computed(() => {
    return cssClass[this.transaction().type];
  });
}
