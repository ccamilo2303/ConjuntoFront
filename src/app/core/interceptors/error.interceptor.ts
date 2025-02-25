import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
    
    const authService = inject(AuthService);
    const router = inject(Router);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                authService.logout();
                router.navigate(['/login']);
            } else if (error.status === 403) {
                console.error('Acceso denegado');
            } else if (error.status === 400) {
                console.error('Bad Request');
            } else if (error.status >= 500) {
                console.error('Error del servidor');
            }

            return throwError(() => new Error(error.message));
        })
    );
};