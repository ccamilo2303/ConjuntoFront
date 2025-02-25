import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  email: string = '';
  password: string = '';
  
  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (user) => this.router.navigate(['/']),
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: "La contraseña o correo que has introducido es incorrecto",
          confirmButtonText: 'Aceptar',
        });
      },
    });
  }

  logout(){
    console.log(this.authService.logout());
  }

}
