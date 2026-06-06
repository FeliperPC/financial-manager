import {
  booleanAttribute,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appFullWidth]',
})
export class FullWidthDirective {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer2 = inject(Renderer2);

  appFullWidth = input(true, { alias: 'appFullWidth', transform: booleanAttribute });

  constructor() {
    effect(() => {
      if (this.appFullWidth()) {
        this.renderer2.setStyle(this.elementRef.nativeElement, 'width', '100%');
      }
    });
  }
}
