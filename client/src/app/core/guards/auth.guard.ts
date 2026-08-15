import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

const ACCESS_TOKEN_KEY = 'dynamic-booking.access-token';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const url = state.url;

  if (typeof localStorage !== 'undefined' && localStorage.getItem(ACCESS_TOKEN_KEY)) {
    const user = authService.getCurrentUser();
    const role = user?.role?.toLowerCase();

    if (url.startsWith('/admin')) {
      return role === 'admin' || role === 'super-admin' ? true : router.createUrlTree(['/app']);
    }

    if (url.startsWith('/app')) {
      return role === 'customer' ? true : router.createUrlTree(['/admin']);
    }

    return true;
  }

  return router.createUrlTree(['/sign-in']);
};
