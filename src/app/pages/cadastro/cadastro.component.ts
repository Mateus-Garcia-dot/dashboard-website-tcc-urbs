import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../shared/models/usuario';
import { CadastroService } from '../../services/cadastro.service';
import { CpfDirective } from '../../directives/cpf.directive';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatDialog } from '@angular/material/dialog';
import { CpfInvalidoComponent } from '../../components/cpf-invalido/cpf-invalido.component';
import { cpfValidador } from '../../validators/cpf-validador';
import { MensagemErroComponent } from '../../components/mensagem-erro/mensagem-erro.component';
import { emailValidador } from '../../validators/email-validador';
import { SucessoComponent } from '../../components/sucesso/sucesso.component';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  providers: [provideNgxMask()],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgIf,
    CommonModule,
    CpfDirective,
    NgxMaskDirective,
    CpfInvalidoComponent,
    MensagemErroComponent
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})

export class CadastroComponent {
  cadastroForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private cadastroService: CadastroService,
    private dialog: MatDialog
  ) {
    this.cadastroForm = this.fb.group({
      name: ['', Validators.required],
      cpf: ['', [Validators.required, cpfValidador]],
      birthday: ['', Validators.required],
      cellphone: ['', Validators.required],
      email: ['', [Validators.required, emailValidador()]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.cadastroForm.invalid) {
      const emailControl = this.cadastroForm.get('email');
      if (emailControl?.errors?.['invalidEmail']) {
        this.openErrorDialog('E-mail no formato inválido.');
        return;
      }
      const cpfControl = this.cadastroForm.get('cpf');
      if (cpfControl?.errors?.['cpfInvalid']) {
        this.openErrorDialog('CPF inválido.');
        return;
      }
    }

    this.cadastroService.cadastrar(this.cadastroForm.value).subscribe({
      next: () => this.openSucesso('Usuário cadastrado com sucesso!'),
      error: (error) => {
        if (error.status === 400) {
          this.openErrorDialog('Já existe um usuário com esse e-mail ou CPF.');
        } else {
          alert('Registration failed: ' + error.message);
        }
      }
    });
  }

  openErrorDialog(message: string): void {
    this.dialog.open(MensagemErroComponent, {
      data: { message }
    });
  }

  openSucesso(message: string): void {
    this.dialog.open(SucessoComponent, {
      data: { message }
    });
  }

}