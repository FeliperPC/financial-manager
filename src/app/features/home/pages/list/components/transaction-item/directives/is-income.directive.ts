import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { TransactionType } from '@shared/transactions/enums/transaction-type';

@Directive({
  selector: '[isIncome]',
})
export class IsIncomeDirective {
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);

  transactionType = input.required<TransactionType>({ alias: 'isIncome' });
  elseTemplate = input<TemplateRef<any>>(undefined, { alias: 'isIncomeElse' });

  constructor() {
    effect(() => {
      if (this.transactionType() === TransactionType.INCOME) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        if (this.elseTemplate()) {
          this.viewContainerRef.createEmbeddedView(this.elseTemplate()!);
        } else {
          this.viewContainerRef.clear();
        }
      }
    });
  }
}
