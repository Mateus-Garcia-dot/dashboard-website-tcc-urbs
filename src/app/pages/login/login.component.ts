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
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  
  credentials: Login = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}


  onSubmit(): void {
    this.authService.login(this.credentials).subscribe({
      next: data => {
        console.log(data); 
        this.router.navigate(['/dashboard'], { queryParamsHandling: 'preserve', replaceUrl: true })
      },
      error: error => {
        console.error(error)
      },
      complete: () => {
        console.log('Request complete')
      }
    } );
  }
}

