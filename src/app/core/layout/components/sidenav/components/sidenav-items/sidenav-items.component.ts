import { Component, computed, inject, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LogoutDirectivesDirective } from './directives/logout.directive';
import { LoggedUser } from '@auth/stores/logged-user';

@Component({
  selector: 'app-sidenav-items',
  imports: [
    MatListModule,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    LogoutDirectivesDirective,
  ],
  templateUrl: './sidenav-items.component.html',
  styleUrl: './sidenav-items.component.scss',
})
export class SidenavItemsComponent {
  private readonly store = inject(LoggedUser);
  isLoggedIn = computed(() => this.store.isLoggedIn());
  links = signal([
    {
      label: 'Home',
      url: '/',
    },
  ]);
}
