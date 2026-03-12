import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'events',
    loadChildren: () => import('./features/events/events.routes').then((m) => m.EVENT_ROUTES),
  },
  // {
  //   path: 'registrations',
  //   loadChildren: () =>
  //     import('./features/registrations/registrations.routes').then((m) => m.REGISTRATION_ROUTES),
  // },
  { path: '', redirectTo: 'events', pathMatch: 'full' },
];
