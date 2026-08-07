import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

const ACCESS_TOKEN_KEY = 'dynamic-booking.access-token';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (typeof localStorage !== 'undefined' && localStorage.getItem(ACCESS_TOKEN_KEY)) {
    return router.createUrlTree(['/']);
  }

  return true;
};
