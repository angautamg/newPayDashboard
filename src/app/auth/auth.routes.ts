import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './guards/auth.guard';

export const AUTH_ROUTES: Routes = [
  
  {
    path: '',
    loadComponent: () => import('./components/payment/payment.component').then(m => m.PaymentComponent),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];
