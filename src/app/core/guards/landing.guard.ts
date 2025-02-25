import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const LandingGuard: CanActivateFn = (route, state) => {

    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.getToken() != null) {
        router.navigate(['/']);
        return false;
    }

    return true;
    
};
