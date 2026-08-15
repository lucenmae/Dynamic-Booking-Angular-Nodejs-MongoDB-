import { Routes } from '@angular/router';

import { Dashboard } from '../features/admin/dashboard/dashboard';
import { adminRoutes } from '../features/admin/admin-routes.routes';
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
    children: [{ path: '', component: Dashboard }, ...adminRoutes],
  },
];
