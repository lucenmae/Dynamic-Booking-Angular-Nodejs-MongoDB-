import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

const ACCESS_TOKEN_KEY = 'dynamic-booking.access-token';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (typeof localStorage !== 'undefined' && localStorage.getItem(ACCESS_TOKEN_KEY)) {
    const role = authService.getCurrentUser()?.role?.toLowerCase();
    const destination = role === 'admin' || role === 'super-admin' ? ['/admin'] : ['/app'];
    return router.createUrlTree(destination);
  }

  return true;
};
