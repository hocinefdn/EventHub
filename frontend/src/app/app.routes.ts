import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'events',
    loadChildren: () => import('./features/events/events.routes').then((m) => m.EVENT_ROUTES),
  },
  // {
  //   path: 'users',
  //   loadChildren: () => import('./features/users/users.routes').then((m) => m.USER_ROUTES),
  // },
  // {
  //   path: 'reservations',
  //   loadChildren: () => import('./features/reservations/reservations.routes').then((m) => m.RESERVATION_ROUTES),
  // },

  { path: '', redirectTo: 'events', pathMatch: 'full' },
];
