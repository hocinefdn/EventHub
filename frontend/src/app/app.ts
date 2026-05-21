import { Component, signal } from '@angular/core';
import { AdminLayoutComponent } from './core/layout/dashboard/admin-layout/admin-layout.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('frontend');
}
