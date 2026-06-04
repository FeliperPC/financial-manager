import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Auth } from '../../services/auth';
import { AuthPayload } from '../../interfaces/authPayload';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthToken } from '../../services/auth-token.ts';
import { LoggedUser } from '../../stores/logged-user';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  authService = inject(Auth);
  authToken = inject(AuthToken);
  router = inject(Router);
  userStore = inject(LoggedUser);
  form = new FormGroup({
    login: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', { validators: [Validators.required] }),
  });

  submit() {
    if (this.form.invalid) {
      return;
    }
    const payload: AuthPayload = {
      login: this.form.controls.login.value as string,
      password: this.form.controls.password.value as string,
    };
    this.authService
      .login(payload)
      .pipe(
        tap((res) => this.authToken.set(res.token)),
        switchMap((res) => this.authService.getCurrentUser(res.token)),
        tap((user) => this.userStore.setUser(user)),
      )
      .subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: (response: HttpErrorResponse) => {
          this.form.setErrors({
            wrongCredentials: true,
          });
        },
      });
  }
}
