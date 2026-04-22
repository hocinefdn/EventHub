import { Component, signal } from '@angular/core';
import { AdminLayoutComponent } from './core/layout/dashboard/admin-layout/admin-layout.component';

@Component({
  selector: 'app-root',
  imports: [AdminLayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('frontend');
}
