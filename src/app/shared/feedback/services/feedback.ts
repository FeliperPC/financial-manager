import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Feedback {
  private snackBar = inject(MatSnackBar);
  open(message: string) {
    this.snackBar.open(message, 'Ok', {
      panelClass: 'snack-bar-success',
    });
  }
}
