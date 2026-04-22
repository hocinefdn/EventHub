package com.example.eventhub.event.dto.response;

import java.time.LocalDateTime;

public record EventResponse(

        Long id,
        String title,
        String description,
        LocalDateTime eventDate,
        Integer maxParticipants,
        String location

) {


}
