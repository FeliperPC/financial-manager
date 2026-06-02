import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from '../interfaces/dialogData';

@Component({
  selector: 'app-dialog-confirmation',
  template: `<h2 mat-dialog-title>{{ dialogData.title }}</h2>
    <mat-dialog-content>{{ dialogData.message }}</mat-dialog-content>
    <mat-dialog-actions>
      <button matButton mat-dialog-close [mat-dialog-close]="false">
        {{ dialogData.yesBtnText || 'No' }}
      </button>
      <button matButton mat-dialog-close cdkFocusInitial [mat-dialog-close]="true">
        {{ dialogData.noBtnText || 'Yes' }}
      </button>
    </mat-dialog-actions>`,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogConfirmation {
  readonly dialogRef = inject(MatDialogRef<DialogConfirmation>);
  readonly dialogData: DialogData = inject(MAT_DIALOG_DATA);
}
