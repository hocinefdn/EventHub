import { ChangeDetectionStrategy, Component, inject, model, output, effect } from '@angular/core';
import { Event } from '../../models/event.model';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './event-form.html',
  styleUrl: './event-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventForm {
  private eventService = inject(EventService);

  // 👉 Input signal (remplace @Input)
  eventData = model<Event | null>(null);

  close = output<void>();
  saveSuccess = output<void>();

  form = {
    title: '',
    description: '',
    eventDate: '',
    maxParticipants: 0,
  };

  constructor() {
    // 👉 Pré-remplir en mode EDIT
    effect(() => {
      const ev = this.eventData();
      if (ev) {
        this.form = {
          title: ev.title,
          description: ev.description,
          eventDate: ev.eventDate,
          maxParticipants: ev.maxParticipants,
        };
      } else {
        // reset en mode ADD
        this.form = {
          title: '',
          description: '',
          eventDate: '',
          maxParticipants: 0,
        };
      }
    });
  }

  cancel(): void {
    this.close.emit();
  }

  submit(): void {
    if (!this.form.title || !this.form.eventDate || !this.form.maxParticipants) return;

    const ev = this.eventData();

    if (ev) {
      // 👉 EDIT
      this.eventService.update({
        ...ev,
        ...this.form,
      });
    } else {
      // 👉 ADD
      this.eventService.add({ ...this.form });
    }

    this.saveSuccess.emit();
    this.close.emit();
  }
}
