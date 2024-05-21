import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-mensagem-erro',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent
  ],
  templateUrl: './mensagem-erro.component.html',
  styleUrl: './mensagem-erro.component.scss'
})
export class MensagemErroComponent {
  constructor(
    public dialogRef: MatDialogRef<MensagemErroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }

}
