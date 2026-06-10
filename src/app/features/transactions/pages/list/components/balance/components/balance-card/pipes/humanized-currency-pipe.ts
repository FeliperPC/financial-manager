import { formatCurrency } from '@angular/common';
import { inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

const sufixes = ['K', 'M', 'B', 'T'];
@Pipe({
  name: 'humanizedCurrency',
})
export class HumanizedCurrencyPipe implements PipeTransform {
  private readonly localeId = inject(LOCALE_ID);
  transform(value: number): string {
    const currency = formatCurrency(value, this.localeId, '$');
    const slittedCurrency = currency.split(',');

    const suffixIndex = slittedCurrency.length - 2;

    if (suffixIndex < 0) {
      return currency;
    }

    const integerPart = slittedCurrency[0];
    const decimalDigit = slittedCurrency[1][0];
    const suffix = sufixes[suffixIndex];

    return `${integerPart},${decimalDigit}${suffix}`;
  }
}
