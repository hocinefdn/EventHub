import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/events';

  private _events = signal<Event[]>([]);
  readonly events = this._events.asReadonly();

  private nextId = 1;

  loadEvents(): void {
    this.http.get<Event[]>(this.apiUrl).subscribe({
      next: (data) => {
        (this._events.set(data), console.log(data));
      },
      error: (err) => console.error('Erreur chargement events', err),
    });
  }

  add(event: Omit<Event, 'id'>): void {
    this.http.post<Event>(this.apiUrl, event).subscribe({
      next: (created) => this._events.update((list) => [...list, created]),
      error: (err) => console.error('Erreur ajout event', err),
    });
  }

  update(updated: Event): void {
    this.http.put<Event>(`${this.apiUrl}/${updated.id}`, updated).subscribe({
      next: (saved) =>
        this._events.update((list) => list.map((e) => (e.id === saved.id ? saved : e))),
      error: (err) => console.error('Erreur mise à jour event', err),
    });
  }

  delete(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => this._events.update((list) => list.filter((e) => e.id !== id)),
      error: (err) => console.error('Erreur suppression event', err),
    });
  }
}
