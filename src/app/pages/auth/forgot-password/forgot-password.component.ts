import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  email = '';

  resetPassword() {
    this.authService.forgotPassword(this.email).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Se ha enviado un correo para restablecer la contraseña', 'success').then(() =>{
          this.router.navigate(['/auth/login'])
        });
      },
      error: (err) => {
        Swal.fire('Error', err.message, 'error');
      }
    });
  }

}
