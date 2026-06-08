import { computed, Directive, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutFacade } from '../../../../auth/facades/logout-facade';

@Directive({
  selector: '[appLogout]',
  host: {
    '(click)': 'logout()',
  },
})
export class LogoutDirectivesDirective {
  private readonly logoutFacade = inject(LogoutFacade);
  private readonly router = inject(Router);

  logout() {
    this.logoutFacade.logout().subscribe({
      next: () => this.router.navigate(['auth/login']),
    });
  }
}
