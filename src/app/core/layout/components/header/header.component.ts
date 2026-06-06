import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LogoutFacade } from '../../../auth/facades/logout-facade';
import { LoggedUser } from '../../../auth/stores/logged-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class Header {
  private readonly logoutFacade = inject(LogoutFacade);
  private readonly store = inject(LoggedUser);
  private readonly router = inject(Router);

  isLoggedIn = computed(() => this.store.isLoggedIn());

  logout() {
    this.logoutFacade.logout().subscribe({
      next: () => this.router.navigate(['auth/login']),
    });
  }
}
