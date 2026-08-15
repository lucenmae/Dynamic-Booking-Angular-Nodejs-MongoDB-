import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Blocks already-authenticated users from guest-only routes (sign-in,
 * sign-up) and sends them to the right home route for their role instead.
 */
export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isAuthenticated()) {
    return true;
  }

  const role = authService.currentUser()?.role?.toLowerCase();
  const destination = role === 'admin' || role === 'super-admin' ? ['/admin'] : ['/app'];
  return router.createUrlTree(destination);
};
