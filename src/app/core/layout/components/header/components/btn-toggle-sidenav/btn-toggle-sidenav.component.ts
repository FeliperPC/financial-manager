import { Component, inject } from '@angular/core';
import { MobileLayoutService } from '../../../../services/mobile-layout.service';
import { SidenavVisibilityService } from '../../../../stores/sidenav-visibility.store';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-btn-toggle-sidenav',
  imports: [MatButtonModule, MatIconModule, MatButtonModule],
  templateUrl: './btn-toggle-sidenav.component.html',
  styleUrl: './btn-toggle-sidenav.component.scss',
})
export class BtnToggleSidenavComponent {
  sidenavVisibilityStore = inject(SidenavVisibilityService);
  mobileLayoutService = inject(MobileLayoutService);
  isMobile = this.mobileLayoutService.isMobile();
  toggleSidenavVisibility() {
    this.sidenavVisibilityStore.toggle();
  }
}
