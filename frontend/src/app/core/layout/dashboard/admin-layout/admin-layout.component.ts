import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  templateUrl: './admin-layout.component.html',
  imports: [SidebarComponent, TopbarComponent, RouterOutlet],
})
export class AdminLayoutComponent {}
