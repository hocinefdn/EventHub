package com.example.eventhub.event.mappers;

import com.example.eventhub.event.Event;
import com.example.eventhub.event.dto.request.EventRequest;
import com.example.eventhub.event.dto.response.EventResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EventMapper {

    // Request → Entity
    Event toEntity(EventRequest request);

    // Entity → Response
    EventResponse toResponse(Event event);

    List<EventResponse> toResponseList(List<Event> events);
}
