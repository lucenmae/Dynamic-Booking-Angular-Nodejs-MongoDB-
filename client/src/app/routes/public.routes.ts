import { Routes } from '@angular/router';

import { SignIn } from '../features/auth/sign-in/sign-in';
import { SignUp } from '../features/auth/sign-up/sign-up';
import { Landing } from '../features/landing/landing';
import { guestGuard } from '../core/guards/guest.guard';

export const publicRoutes: Routes = [
  {
    path: '',
    component: Landing,
  },
  {
    path: 'sign-in',
    component: SignIn,
    canActivate: [guestGuard],
  },
  {
    path: 'sign-up',
    component: SignUp,
    canActivate: [guestGuard],
  },
];
