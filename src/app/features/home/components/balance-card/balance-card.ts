import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-balance-card',
  imports: [MatCardModule],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.scss',
})
export class BalanceCard {
  type = input.required<'income' | 'outcome' | 'balance'>();
  label = input.required<string>();
  value = input.required<number>();

  cssClass = computed(() => {
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
