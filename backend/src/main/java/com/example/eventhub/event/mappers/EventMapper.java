package com.example.eventhub.event.mappers;

import com.example.eventhub.event.Event;
import com.example.eventhub.event.dto.request.EventRequest;
import com.example.eventhub.event.dto.response.EventResponse;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EventMapper {

    // Request → Entity
    Event toEntity(EventRequest request);

    // Entity → Response
    EventResponse toResponse(Event event);

    List<EventResponse> toResponseList(List<Event> events);

    // 🔥 UPDATE PARTIEL
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEventFromRequest(EventRequest request, @MappingTarget Event event);
}
