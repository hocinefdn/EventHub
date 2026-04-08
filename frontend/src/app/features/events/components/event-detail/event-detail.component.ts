import { Component, inject, signal, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailComponent implements OnInit {
  private eventService = inject(EventService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Signal pour stocker l'événement
  event = signal<Event | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set('Event ID not found');
      this.loading.set(false);
      return;
    }

    this.eventService.getById(Number(id)).subscribe({
      next: (e) => {
        this.event.set(e);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load event');
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  goBack() {
    this.router.navigate(['/admin/events']);
  }
}
