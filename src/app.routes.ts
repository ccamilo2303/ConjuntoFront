import { Routes } from '@angular/router';
import { LayoutComponent } from './app/shared/layout/layout.component';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { LandingComponent } from './app/pages/landing/landing.component';
import { Notfound } from './app/pages/notfound/notfound';
import { AuthGuard } from './app/core/guards/auth.guard';
import { LandingGuard } from './app/core/guards/landing.guard';

export const appRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [LandingGuard],
        children: [
            { path: '', component: Dashboard },
            { path: 'management', loadChildren: () => import('./app/pages/management/management.routes') },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: LandingComponent },
    { path: 'notfound', component: Notfound },
    { path: 'auth', canActivate: [AuthGuard], loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
