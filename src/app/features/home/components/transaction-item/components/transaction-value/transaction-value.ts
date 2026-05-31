import { Component, computed, input } from '@angular/core';
import { Transaction } from '../../../../../../shared/transactions/interfaces/transaction';
import { TransactionType } from '../../../../../../shared/transactions/interfaces/enums/transaction-type';

const cssClass = {
  [TransactionType.INCOME]: 'income',
  [TransactionType.OUTCOME]: 'outcome',
};

@Component({
  selector: 'app-transaction-value',
  imports: [],
  template: `{{ transaction().value }}`,
  styleUrl: './transaction-value.scss',
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
