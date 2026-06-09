import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavVisibilityService } from '../../stores/sidenav-visibility.store';
import { CommonModule } from '@angular/common';
import { MobileLayoutService } from '../../services/mobile-layout.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class Header {
  sidenavVisibilityStore = inject(SidenavVisibilityService);
  mobileLayoutService = inject(MobileLayoutService);
  isMobile = this.mobileLayoutService.isMobile();
  toggleSidenavVisibility() {
    this.sidenavVisibilityStore.toggle();
  }
}
