import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-no-transaction',
  imports: [MatCardModule],
  templateUrl: './no-transaction.component.html',
  styleUrl: './no-transaction.component.scss',
})
export class NoTransaction {}
