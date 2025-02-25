import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

export const LandingGuard: CanActivateFn = (route, state) => {

    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isAuthenticated().pipe(
        map(isAuth => isAuth ? true : router.createUrlTree(['/landing']))
    );
    
};
