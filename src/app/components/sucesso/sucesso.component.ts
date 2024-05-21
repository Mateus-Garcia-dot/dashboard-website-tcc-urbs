import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogContent, MatDialogActions } from '@angular/material/dialog';

@Component({
  selector: 'app-sucesso',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent
  ],
  templateUrl: './sucesso.component.html',
  styleUrl: './sucesso.component.scss'
})
export class SucessoComponent {
  constructor(
    public dialogRef: MatDialogRef<SucessoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }

}
