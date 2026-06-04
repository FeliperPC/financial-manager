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

  get(): string | null {
    return this.localStorage.getItem(this.key);
  }
}
