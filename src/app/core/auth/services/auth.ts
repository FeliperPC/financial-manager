import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AuthPayload } from '../interfaces/authPayload';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  login(payload: AuthPayload): Observable<{ token: string }> {
    if (payload.login == 'admin' && payload.password === '123') {
      return of({ token: 'fake token' });
    }

    return throwError(
      () =>
        new HttpErrorResponse({
          error: 401,
          statusText: 'Unauthorized',
        }),
    );
  }
}
