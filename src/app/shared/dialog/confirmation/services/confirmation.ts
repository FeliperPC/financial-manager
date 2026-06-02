import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { DialogConfirmation } from '../components/confirmation';
import { DialogData } from '../interfaces/dialogData';

@Injectable({
  providedIn: 'root',
})
export class Confirmation {
  readonly dialog = inject(MatDialog);
  open(data: DialogData) {
    return this.dialog
      .open(DialogConfirmation, { data })
      .afterClosed()
      .pipe(filter((option) => option));
  }
}
