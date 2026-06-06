import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './core/auth/components/layout/layout';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('financial-manager');
}
