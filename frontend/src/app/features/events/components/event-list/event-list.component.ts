import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { RouterLink } from '@angular/router';
import { EventForm } from '../event-form/event-form';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, EventForm],
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
    console.log(event);
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
