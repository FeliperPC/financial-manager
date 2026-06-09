import { Component, computed, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavItemsComponent } from './components/sidenav-items/sidenav-items.component';
import { MobileLayoutService } from '../../services/mobile-layout.service';
import { SidenavVisibilityService } from '../../stores/sidenav-visibility.store';

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, SidenavItemsComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  private readonly mobileLayoutService = inject(MobileLayoutService);
  isMobile = this.mobileLayoutService.isMobile();
  sidenavStore = inject(SidenavVisibilityService);

  sidenaveMode = computed(() => (this.isMobile() ? 'over' : 'side'));

  isSideNavOpen = computed(() => {
    if (!this.isMobile()) {
      return true;
    }
    return this.sidenavStore.isVisible();
  });
}
