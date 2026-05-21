import { Routes } from '@angular/router';
import { SimpleLayoutComponent } from './core/layout/simple-layout/simple-layout';
import { AdminLayoutComponent } from './core/layout/dashboard/admin-layout/admin-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: SimpleLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/pages/login/login').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/pages/register/register').then((m) => m.RegisterComponent),
      },
    ],
  },
  {
    path: 'admin', // <-- parent "admin"
    component: AdminLayoutComponent,
    children: [
      {
        path: 'events',
        loadChildren: () => import('./features/events/events.routes').then((m) => m.EVENT_ROUTES),
      },
      // {
      //   path: 'users',
      //   loadChildren: () =>
      //     import('./features/users/users.routes').then((m) => m.USER_ROUTES),
      // },
      // {
      //   path: 'reservations',
      //   loadChildren: () =>
      //     import('./features/reservations/reservations.routes').then((m) => m.RESERVATION_ROUTES),
      // },
      { path: '', redirectTo: 'events', pathMatch: 'full' }, // /admin => /admin/events
    ],
  },
  { path: '', redirectTo: 'admin', pathMatch: 'full' }, // racine => /admin
];
