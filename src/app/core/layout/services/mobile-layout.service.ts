import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Injectable, isSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MobileLayoutService {
  private readonly breakpointObserver = inject(BreakpointObserver);

  isMobile() {
    const matchesObservable = this.breakpointObserver
      .observe('(max-width:1280px)')
      .pipe(map((state) => state.matches));
    return toSignal(matchesObservable, {
      requireSync: true, // its first value it will be the subscription of the matchesObservable, that is, the boolean
    });
  }
}
