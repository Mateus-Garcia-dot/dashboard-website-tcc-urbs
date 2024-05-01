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


@Component({
  selector: 'app-cadastro',
  standalone: true,
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
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})

export class CadastroComponent {
  
  usuario: Usuario = {
    
    name: '',
    email: '',
    birthday: '',
    cellphone: '',
    password: '',
    cpf: '',
  };
  
  //form!: FormGroup;

  constructor(private cadastroService: CadastroService) {}

  onSubmit(): void {
    this.cadastroService.cadastrar(this.usuario).subscribe({
      next: () => alert('Registration successful'),
      error: (error) => alert('Registration failed: ' + error.message)
    });
  }

  /*
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmarEmail: ['', [Validators.required, Validators.email]],
      birthday: ['', Validators.required],
      cellphone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]]
    },
      validators: [this.matchFields('email', 'confirmarEmail'), this.matchFields('password', 'confirmarSenha')]
    });
  }

  matchFields(field: string, matchTo: string): (group: AbstractControl) => ValidationErrors | null {
    return (group: AbstractControl): ValidationErrors | null => {
      const input = group.get(field);
      const confirmInput = group.get(matchTo);
      if (input && confirmInput && input.value !== confirmInput.value) {
        confirmInput.setErrors({ mismatch: true });
        return { mismatch: true };
      } else {
        return null;
      }
    };
  }

  
  cadastro(): void {
    console.log('Dados enviados:', this.form.value);
    if (this.form.valid) {
      this.cadastroService.cadastrar(this.usuario).subscribe({
        next: (usuario) => console.log('User registered successfully!', usuario),
        error: (error) => console.error('Registration failed!', error)
      });
    } else {
      alert('O e-mail fornecido é inválido. Por favor, insira um e-mail válido.');
    }
  } */
}
