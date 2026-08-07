import { Routes } from '@angular/router';

import { authGuard } from '../core/guards/auth.guard';

export const protectedRoutes: Routes = [
  {
    path: 'app',
    canActivate: [authGuard],
    children: [],
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [],
  },
];
