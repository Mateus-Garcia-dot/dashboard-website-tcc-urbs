import { Component } from '@angular/core';
import { MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-cpf-invalido',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent
  ],
  templateUrl: './cpf-invalido.component.html',
  styleUrl: './cpf-invalido.component.scss'
})
export class CpfInvalidoComponent {

  constructor(public dialogRef: MatDialogRef<CpfInvalidoComponent>) {}

  close(): void {
    this.dialogRef.close();
  }

}
