package com.example.eventhub.event;

import com.example.eventhub.event.dto.request.EventRequest;
import com.example.eventhub.event.dto.response.EventResponse;
import com.example.eventhub.event.exception.EventNotFoundException;
import com.example.eventhub.event.mappers.EventMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final EventMapper eventMapper;

    public EventResponse createEvent(EventRequest request) {
        Event event = eventMapper.toEntity(request);
        System.out.println(event);
        Event saved = eventRepository.save(event);
        return eventMapper.toResponse(saved);
    }

    public List<EventResponse> getAllEvents() {
        return eventMapper.toResponseList(eventRepository.findAll());
    }

    public EventResponse getEventById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));

        return eventMapper.toResponse(event);
    }

    public EventResponse updateEvent(Long id, EventRequest request) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));

        eventMapper.updateEventFromRequest(request, event);

        Event updated = eventRepository.save(event);

        return eventMapper.toResponse(updated);
    }

    public void deleteEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));

        eventRepository.delete(event);
    }


}
