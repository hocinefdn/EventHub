import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true, // Si tu utilises les Standalone Components
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {}
