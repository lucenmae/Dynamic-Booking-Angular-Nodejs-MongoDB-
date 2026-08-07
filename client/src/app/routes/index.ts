import { Routes } from '@angular/router';

import { protectedRoutes } from './protected.routes';
import { publicRoutes } from './public.routes';

export const routes: Routes = [
  ...publicRoutes,
  ...protectedRoutes,
  {
    path: '**',
    redirectTo: '',
  },
];

export { protectedRoutes } from './protected.routes';
export { publicRoutes } from './public.routes';
