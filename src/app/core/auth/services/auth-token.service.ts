import { inject, Injectable } from '@angular/core';
import { LocalStorageToken } from '../token/local-storage';

@Injectable({
  providedIn: 'root',
})
export class AuthToken {
  private readonly key: string = 'auth-token';
  localStorage = inject(LocalStorageToken);

  set(token: string) {
    this.localStorage.setItem(this.key, token);
  }

  has(): boolean {
    return Boolean(this.get());
  }

  get(): string | null {
    return this.localStorage.getItem(this.key);
  }

  remove(): void {
    return this.localStorage.removeItem(this.key);
  }
}
