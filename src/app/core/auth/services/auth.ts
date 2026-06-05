import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AuthPayload } from '../interfaces/authPayload';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../interfaces/user';
import { AuthTokenResponse } from '../interfaces/authToken';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private generateRandomKey(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
    return Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]).join(
      '',
    );
  }

  login(payload: AuthPayload): Observable<AuthTokenResponse> {
    if (payload.login == 'admin' && payload.password === '123') {
      return of({ token: this.generateRandomKey() });
    }

    return throwError(
      () =>
        new HttpErrorResponse({
          error: 401,
          statusText: 'Unauthorized',
        }),
    );
  }

  getCurrentUser(token: string): Observable<User> {
    return of({
      username: 'admin',
    });
  }

  refreshToken(token: string) {
    return of({ token: this.generateRandomKey() });
  }
}
