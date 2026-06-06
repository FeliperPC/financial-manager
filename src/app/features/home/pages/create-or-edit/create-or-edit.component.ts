import { Component, computed, inject, input, OnInit, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective } from 'ngx-mask';
import { Transaction, TransactionPayload } from '@shared/transactions/interfaces/transaction';
import { TransactionsService } from '@shared/transactions/services/transactions';
import { Router } from '@angular/router';
import { Feedback } from '@shared/feedback/services/feedback.service';
import { tap } from 'rxjs';
import { TransactionType } from '@shared/transactions/enums/transaction-type';

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
  templateUrl: './create-or-edit.component.html',
  styleUrl: './create-or-edit.component.scss',
})
export class CreateOrEdit {
  private transactionService = inject(TransactionsService);
  private router = inject(Router);
  readonly transactionType = TransactionType;
  private snackBarService = inject(Feedback);
  transaction = input<Transaction>();

  form = computed(
    () =>
      new FormGroup({
        type: new FormControl<string>(this.transaction()?.type ?? '', {
          validators: [Validators.required],
        }),
        title: new FormControl<string>(this.transaction()?.title ?? '', {
          validators: [Validators.required],
        }),
        value: new FormControl<number>(this.transaction()?.value ?? 0, {
          validators: [Validators.required, Validators.min(0)],
        }),
      }),
  );

  get isEdit(): Signal<Boolean> {
    return computed(() => Boolean(this.transaction()));
  }

  submit() {
    if (this.form().invalid) {
      return;
    }

    const payload: TransactionPayload = {
      title: this.form().value.title as string,
      value: this.form().value.value as number,
      type: this.form().value.type as TransactionType,
    };

    this.createOrEdit(payload).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }

  createOrEdit(payload: TransactionPayload) {
    if (this.isEdit()) {
      return this.transactionService.update(this.transaction()!.id, payload).pipe(
        tap(() => {
          this.snackBarService.success('Transaction updated successfully');
        }),
      );
    }
    return this.transactionService.create(payload).pipe(
      tap(() => {
        this.snackBarService.success('Transaction created successfully');
      }),
    );
  }
}
