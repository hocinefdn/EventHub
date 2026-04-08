package com.example.eventhub.event;

import com.example.eventhub.event.dto.request.EventRequest;
import com.example.eventhub.event.dto.response.EventResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    /**
     * POST /api/v1/events
     * Create new event.
     * Return 201 Created with ressource URI in Location.
     */
    @PostMapping
    public ResponseEntity<EventResponse> create(@Valid @RequestBody EventRequest request) {
        EventResponse created = eventService.createEvent(request);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.id())
                .toUri();

        return ResponseEntity.created(location).body(created);
    }

    @GetMapping
    public ResponseEntity<List<Event>> getAll() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }
}
