import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BtnToggleSidenavComponent } from './components/btn-toggle-sidenav/btn-toggle-sidenav.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  imports: [BtnToggleSidenavComponent, MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {}
