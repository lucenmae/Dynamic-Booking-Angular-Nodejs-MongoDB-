import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const url = state.url;

  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/sign-in'], { queryParams: { returnUrl: url } });
  }

  const role = authService.currentUser()?.role?.toLowerCase();

  if (url.startsWith('/admin')) {
    return role === 'admin' || role === 'super-admin' ? true : router.createUrlTree(['/app']);
  }

  if (url.startsWith('/app')) {
    return role === 'customer' ? true : router.createUrlTree(['/admin']);
  }

  return true;
};
