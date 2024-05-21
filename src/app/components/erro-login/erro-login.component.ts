import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogContent, MatDialogActions } from '@angular/material/dialog';

@Component({
  selector: 'app-erro-login',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './erro-login.component.html',
  styleUrl: './erro-login.component.scss'
})
export class ErroLoginComponent {

  constructor(public dialogRef: MatDialogRef<ErroLoginComponent>) {}

  close(): void {
    this.dialogRef.close();
  }

}
