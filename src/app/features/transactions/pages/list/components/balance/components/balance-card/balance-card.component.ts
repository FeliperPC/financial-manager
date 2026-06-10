import { CurrencyPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HumanizedCurrencyPipe } from './pipes/humanized-currency-pipe';

type CardType = 'income' | 'balance' | 'outcome';
enum ValueCssClass {
  income = 'income',
  outcome = 'outcome',
  zero = 'zero',
}

@Component({
  selector: 'app-balance-card',
  imports: [MatCardModule, HumanizedCurrencyPipe],
  templateUrl: './balance-card.component.html',
  styleUrl: './balance-card.component.scss',
})
export class BalanceCard {
  type = input.required<CardType>();
  label = input.required<string>();
  value = input.required<number>();

  cssClass = computed<ValueCssClass>(() => {
    if (this.value() == 0) {
      return ValueCssClass.zero;
    }
    switch (this.type()) {
      case ValueCssClass.income:
        return ValueCssClass.income;
      case ValueCssClass.outcome:
        return ValueCssClass.outcome;
      default:
        return this.value() > 0 ? ValueCssClass.income : ValueCssClass.outcome;
    }
  });
}
