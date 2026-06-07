import { computed, Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMarginBottom]',
})
export class MarginBottomDirective {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer2 = inject(Renderer2);

  marginBottom = input('', {
    alias: 'appMarginBottom',
  });

  resolved = computed(() => this.marginBottom() || '24px');

  constructor() {
    effect(() => {
      if (this.resolved()) {
        this.renderer2.setStyle(this.elementRef.nativeElement, 'margin-bottom', this.resolved());
      }
    });
  }
}
