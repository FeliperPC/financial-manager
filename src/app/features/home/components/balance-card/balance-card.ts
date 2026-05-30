import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

type CardType = 'income' | 'outcome' | 'balance';
type ValueCssClass = 'income' | 'outcome';

@Component({
  selector: 'app-balance-card',
  imports: [MatCardModule],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.scss',
})
export class BalanceCard {
  type = input.required<CardType>();
  label = input.required<string>();
  value = input.required<number>();

  cssClass = computed<ValueCssClass>(() => {
    switch (this.type()) {
      case 'income':
        return 'income';
      case 'outcome':
        return 'outcome';
      default:
        return this.value() > 0 ? 'income' : 'outcome';
    }
  });
}
