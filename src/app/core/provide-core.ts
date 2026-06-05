import { makeEnvironmentProviders } from '@angular/core';
import { provideAuth } from './auth/provide-auth';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { setAuthToken } from './auth/interceptors/set-auth-token';

export function provideCore() {
  return makeEnvironmentProviders([
    provideAuth(),
    provideHttpClient(withInterceptors([setAuthToken])),
    provideEnvironmentNgxMask({
      decimalMarker: ',',
      thousandSeparator: '.',
    }),
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      } as MatSnackBarConfig,
    },
  ]);
}
