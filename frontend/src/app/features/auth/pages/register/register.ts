import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { MATERIAL_IMPORTS } from '../../../../shared/ui/material.imports';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, ...MATERIAL_IMPORTS],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  email = '';
  password = '';

  loading = false;

  constructor(private auth: AuthService) {}

  register() {
    this.loading = true;

    this.auth
      .register({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: () => {
          this.loading = false;
          console.log('REGISTER SUCCESS');
        },
        error: (err) => {
          this.loading = false;
          console.error(err);
        },
      });
  }
}
