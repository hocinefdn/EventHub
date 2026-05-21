import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { MATERIAL_IMPORTS } from '../../../../shared/ui/material.imports';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, ...MATERIAL_IMPORTS],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  email = '';
  password = '';

  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  login() {
    this.loading = true;

    this.auth
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          this.auth.saveToken(response.token);
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          this.loading = false;
          console.error(err);
        },
      });
  }
}
