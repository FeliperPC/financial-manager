import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LogoutDirectivesDirective } from './directives/logout.directive';
import { LoggedUser } from '@auth/stores/logged-user';
import { SidenavVisibilityStore } from '../../../../stores/sidenav-visibility.store';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavItemsComponent {
  private readonly store = inject(LoggedUser);
  private readonly sidenavStore = inject(SidenavVisibilityStore);
  isLoggedIn = computed(() => this.store.isLoggedIn());
  links = signal([
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Transactions',
      url: '/transactions',
    },
  ]);
  closeSidenav() {
    this.sidenavStore.close();
  }
}
