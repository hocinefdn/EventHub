import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-simple-layout',
  standalone: true,
  template: `
    <div class="simple-layout">
      <router-outlet />
    </div>
  `,
  imports: [RouterOutlet],
})
export class SimpleLayoutComponent {}
