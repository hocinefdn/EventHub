import { ChangeDetectionStrategy, Component, inject, model, output } from '@angular/core';
import { Event } from '../../models/event.model';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-form',
  imports: [FormsModule],
  templateUrl: './event-form.html',
  styleUrl: './event-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventForm {
  newEvent: Omit<Event, 'id'> = { title: '', description: '', eventDate: '', maxParticipants: 0 };
  private eventService = inject(EventService);

  close = output<void>();
  saveSuccess = output<void>();

  eventData = model<Omit<Event, 'id'>>({
    title: '',
    description: '',
    eventDate: '',
    maxParticipants: 0,
  });

  cancelAdd(): void {
    this.close.emit();
  }

  submitAdd(): void {
    if (!this.newEvent.title || !this.newEvent.eventDate || !this.newEvent.maxParticipants) return;

    this.eventService.add({ ...this.newEvent });
    this.saveSuccess.emit();
    this.close.emit();
  }
}
