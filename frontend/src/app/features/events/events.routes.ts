import { Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
// import { EventFormComponent } from './components/event-form/event-form.component';

export const EVENT_ROUTES: Routes = [
  { path: '', component: EventListComponent },
  // { path: 'new', component: EventFormComponent },
  // { path: 'edit/:id', component: EventFormComponent },
];
