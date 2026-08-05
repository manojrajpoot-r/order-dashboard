import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { SnackbarService } from '../../../shared/services/snackbar/snackbar.service';
import { MATERIAL_MODULES } from '../../../shared/components/material/material';
import { FormErrorComponent } from '../../../shared/components/form-error/form-error';
import { AppInputComponent } from '../../../shared/components/app-input/app-input';
import { AppButtonComponent } from '../../../shared/components/app-button/app-button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormErrorComponent,
    ...MATERIAL_MODULES,
    AppInputComponent,
    AppButtonComponent,

  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  // Services
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private snackbar = inject(SnackbarService);
  private router = inject(Router);

  loading = false;

  // Login Form
  loginForm = this.fb.group({

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: [
      '',
      [
        Validators.required
      ]
    ]

  });

  login() {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    this.authService
      .login(this.loginForm.value)
      .subscribe({

        next: (res: any) => {

          this.loading = false;

          this.authService.setToken(res.token);

          this.authService.setUser(res.user);

          this.snackbar.success(res.message);
          this.router.navigate(['/admin/dashboard']);

        },

        error: (err) => {

          this.loading = false;

          this.snackbar.error(
            err.error?.message || 'Login Failed'
          );

        }

      });

  }

}
