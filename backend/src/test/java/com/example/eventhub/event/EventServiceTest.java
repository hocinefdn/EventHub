package com.example.eventhub.event;

import com.example.eventhub.event.dto.request.EventRequest;
import com.example.eventhub.event.dto.response.EventResponse;
import com.example.eventhub.event.mappers.EventMapper;
import com.example.eventhub.event.mappers.EventMapperImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
public class EventServiceTest {

    @Mock
    private EventRepository eventRepository;

    @Spy
    private EventMapper eventMapper = new EventMapperImpl();

    @InjectMocks
    private EventService eventService;

    @Test
    void shouldReturnAllEvents() {
        EventResponse event1 = new EventResponse(
                1L,
                "Spring Boot Summit",
                "Tech conference about Java and Spring Boot",
                LocalDateTime.now(),
                200,
                "Paris");

        EventResponse event2 = new EventResponse(
                2L,
                "Dev Meetup Paris",
                "Networking event for developers in Paris",
                LocalDateTime.now(),
                500,
                "Paris");


        Event eventEntity1 = eventMapper.toEntityFromResponse(event1);
        Event eventEntity2 = eventMapper.toEntityFromResponse(event2);

        when(eventRepository.findAll()).thenReturn(List.of(eventEntity1, eventEntity2));


        List<EventResponse> events = eventService.getAllEvents();

        assertThat(events).hasSize(2).containsExactly(event1, event2);
    }

    @Test
    void should_create_event() {

        EventRequest request = new EventRequest(
                "title",
                "desc",
                LocalDateTime.now(),
                10,
                "Paris"
        );

        Event event = new Event();
        Event savedEvent = new Event();
        EventResponse response = new EventResponse(
                1L,
                "title",
                "desc",
                LocalDateTime.now(),
                10,
                "Paris"
        );

        when(eventMapper.toEntity(request)).thenReturn(event);
        when(eventRepository.save(event)).thenReturn(savedEvent);
        when(eventMapper.toResponse(savedEvent)).thenReturn(response);

        // Act
        EventResponse result = eventService.createEvent(request);

        // Assert
        Assertions.assertNotNull(result);

        Assertions.assertEquals("title", result.title());
        Assertions.assertEquals("desc", result.description());
        Assertions.assertEquals("Paris", result.location());
        Assertions.assertEquals(10, result.maxParticipants());

        Mockito.verify(eventRepository).save(event);
        Mockito.verify(eventMapper).toResponse(savedEvent);
    }
}
