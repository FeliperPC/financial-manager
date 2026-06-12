import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthPayload } from '../../interfaces/authPayload';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggedUser } from '../../stores/logged-user';
import { LoginFacade } from '../../facades/login-facade';
import { FullWidthDirective } from '@shared/material/form-field/directives/full-width.directive';
import { MarginBottomDirective } from '@shared/material/form-field/directives/margin-bottom.directive';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    FullWidthDirective,
    MarginBottomDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  router = inject(Router);
  userStore = inject(LoggedUser);
  loginFacade = inject(LoginFacade);
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
    this.loginFacade.login(payload).subscribe({
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
