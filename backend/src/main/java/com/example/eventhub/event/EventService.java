package com.example.eventhub.event;

import com.example.eventhub.event.dto.request.EventRequest;
import com.example.eventhub.event.dto.response.EventResponse;
import com.example.eventhub.event.mappers.EventMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final EventMapper eventMapper;

    public EventResponse createEvent(EventRequest request) {
        //System.out.println(request);
        Event event = eventMapper.toEntity(request);
        System.out.println(event);
        Event saved = eventRepository.save(event);
        return eventMapper.toResponse(saved);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }
}
