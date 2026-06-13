import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidenavVisibilityStore {
  private state = signal(false);

  toggle() {
    this.state.update((state) => !state);
  }

  close() {
    this.state.set(false);
  }

  isVisible = computed(() => this.state());
}
