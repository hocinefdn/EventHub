import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { RouterLink } from '@angular/router';
import { EventForm } from '../event-form/event-form';
import { AgGridAngular } from 'ag-grid-angular'; // Import du composant
import { ColDef } from 'ag-grid-community';
import { ActionButtonsComponent } from '../../../../shared/action-buttons/action-buttons'; // Import du composant d'action
@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    EventForm,
    AgGridAngular,
    ActionButtonsComponent,
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventListComponent {
  private eventService = inject(EventService);

  readonly events = this.eventService.events;
  readonly count = computed(() => this.events().length);

  editingEvent = signal<Event | null>(null);
  showAddForm = signal(false);
  toast = signal<string | null>(null);

  context = {
    componentParent: this,
  };

  readonly MONTHS = [
    'jan',
    'fév',
    'mar',
    'avr',
    'mai',
    'juin',
    'juil',
    'aoû',
    'sep',
    'oct',
    'nov',
    'déc',
  ];

  rowData = computed(() =>
    this.events().map((ev) => ({
      title: ev.title,
      date: ev.eventDate,
      participants: ev.maxParticipants,
      raw: ev,
    })),
  );

  columnDefs = signal<ColDef[]>([
    { field: 'title', headerName: 'Événement' },
    { field: 'date', headerName: 'Date' },
    { field: 'participants', headerName: 'Max' },
    {
      headerName: 'Actions',
      cellRenderer: ActionButtonsComponent,
    },
  ]);

  ngOnInit(): void {
    this.eventService.loadEvents();
  }
  getDay(dateStr: string): number {
    return new Date(dateStr + 'T00:00:00').getDate();
  }

  getMonth(dateStr: string): string {
    return this.MONTHS[new Date(dateStr + 'T00:00:00').getMonth()];
  }

  openAddForm(): void {
    this.showAddForm.set(true);
    this.editingEvent.set(null);
  }

  cancelAdd(): void {
    this.showAddForm.set(false);
  }

  submitAdd(): void {
    this.showAddForm.set(false);
    this.showToast('Événement ajouté');
  }

  startEdit(event: Event): void {
    this.editingEvent.set({ ...event });
    this.showAddForm.set(false);
  }

  cancelEdit(): void {
    this.editingEvent.set(null);
  }

  submitEdit(): void {
    const ev = this.editingEvent();
    if (!ev || !ev.title || !ev.eventDate || !ev.maxParticipants) return;
    this.eventService.update(ev);
    this.editingEvent.set(null);
    this.showToast('Événement modifié');
  }

  delete(event: Event): void {
    this.eventService.delete(event.id!);
    this.showToast('Événement supprimé');
  }

  private showToast(msg: string): void {
    this.toast.set(msg);
    setTimeout(() => this.toast.set(null), 2500);
  }
}
