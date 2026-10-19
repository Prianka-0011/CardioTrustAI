import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { AuthComponent } from './auth/auth.component';
import { authRoutes } from './auth/auth-routing.module';
import { ChangePasswordComponent } from './auth/components/change-password/change-password.component';
import { CardioTrustComponent } from './cardio-trust/cardio-trust.component';
import { CardioTrustRoutes } from './cardio-trust/cardio-trust-routing.module';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'cardio-trust',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        component: AuthComponent,
        canActivate: [GuestGuard],
        children: authRoutes
    },
    {
        path: 'cardio-trust',
        component: CardioTrustComponent,
        canActivate: [AuthGuard],
        children: CardioTrustRoutes },
    {
        path: 'change-password-smtp-link',
        component: ChangePasswordComponent,
    },
    // {
    //     canActivate: [GuestGuard],
    //     path: 'change-password-smtp-link',
    //     component: ChangePasswordComponent,
    // },
    {
        path: '**',
        redirectTo: 'auth'
    }
];
