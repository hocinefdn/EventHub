package com.example.eventhub.event;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class EventRepositoryTest {

    @Autowired
    private EventRepository eventRepository;

    @Test
    void shouldGetAllEvents() {
        List<Event> events = eventRepository.findAll();

        assertEquals(2, events.size());
        assertEquals("Spring Boot Summit",
                events.get(0).getTitle());
    }

    @Test
    void shouldGetEventById() {
        Event event = eventRepository.getReferenceById(1L);

        assertEquals("Spring Boot Summit",
                event.getTitle());
        assertEquals("Tech conference about Java and Spring Boot",
                event.getDescription());
        assertEquals(200,
                event.getMaxParticipants());
    }

    @Test
    void shouldSaveEvent() {

        Event event = new Event();

        event.setTitle("New event");
        event.setDescription("New event description");
        event.setEventDate(LocalDateTime.of(2026, 4, 10, 15, 30));
        event.setMaxParticipants(200);

        Event savedEvent = eventRepository.save(event);

        assertNotNull(savedEvent.getId());
        assertEquals("New event", savedEvent.getTitle());
        assertEquals("New event description", savedEvent.getDescription());
        assertEquals(LocalDateTime.of(2026, 4, 10, 15, 30), savedEvent.getEventDate());


    }

    @Test
    void shouldUpdateEvent() {
        Event event = eventRepository.findById(1L).get();

        event.setTitle("Event updated");

        Event savedEvent = eventRepository.save(event);

        assertEquals("Event updated", savedEvent.getTitle());

    }

    @Test
    void shouldDeleteEvent(){
        eventRepository.deleteById(3L);

        Optional<Event> event = eventRepository.findById(3L);

        assertFalse(event.isPresent());

    }
}