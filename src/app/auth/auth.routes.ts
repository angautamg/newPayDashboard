import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './guards/auth.guard';

export const AUTH_ROUTES: Routes = [
  
  {
    path: '',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
  },
  {
    path:'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];
