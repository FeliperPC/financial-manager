import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidenavVisibilityService {
  private state = signal(false);

  toggle() {
    this.state.update((state) => !state);
  }

  isVisible = computed(() => this.state());
}
