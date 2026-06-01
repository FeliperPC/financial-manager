import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TransactionType } from '../../../../shared/transactions/enums/transaction-type';
import { NgxMaskDirective } from 'ngx-mask';
import { TransactionPayload } from '../../../../shared/transactions/interfaces/transaction';
import { TransactionsService } from '../../../../shared/transactions/services/transactions-service';
import { Router } from '@angular/router';
import { Feedback } from '../../../../shared/feedback/services/feedback';

@Component({
  selector: 'app-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    NgxMaskDirective,
  ],
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class Create {
  private transactionService = inject(TransactionsService);
  private router = inject(Router);
  readonly transactionType = TransactionType;
  private snackBarService = inject(Feedback);

  form = new FormGroup({
    type: new FormControl<string>('', { validators: [Validators.required] }),
    title: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    value: new FormControl<number>(0, {
      validators: [Validators.required, Validators.min(0)],
    }),
  });

  submit() {
    if (this.form.invalid) {
      return;
    }

    const payload: TransactionPayload = {
      title: this.form.value.title as string,
      value: this.form.value.value as number,
      type: this.form.value.type as TransactionType,
    };

    this.transactionService.create(payload).subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.snackBarService.open('Transaction created successfully');
      },
    });
  }
}
