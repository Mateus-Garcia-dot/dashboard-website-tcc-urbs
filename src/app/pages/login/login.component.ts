import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';
import { Login } from '../../shared/models/login';
import { HttpClientModule } from '@angular/common/http';
import { Usuario } from '../../shared/models/usuario';
import { RespostaLogin } from '../../shared/models/resposta-login';
import { ErroLoginComponent } from '../../components/erro-login/erro-login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    HttpClientModule, 
    ErroLoginComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  
public email = '';
public password = '';

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error during login', error);
        this.openErrorDialog();
  
      }
    });
  }

  openErrorDialog(): void {
    this.dialog.open(ErroLoginComponent);
  }
}

