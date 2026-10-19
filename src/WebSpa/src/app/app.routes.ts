import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { AuthComponent } from './auth/auth.component';
import { authRoutes } from './auth/auth-routing.module';
import { ChangePasswordComponent } from './auth/components/change-password/change-password.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        component: AuthComponent,
        canActivate: [GuestGuard],
        children: authRoutes
    },
    // {
    //     path: 'learning-suite',
    //     component: LearningSuiteComponent,
    //     canActivate: [AuthGuard],
    //     children: learningSuiteRoutes
    // },
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
