package com.example.eventhub.event.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record EventRequest(
        @NotBlank(message = "Title is required")
        String title,

        String description,

        @NotNull(message = "Event date is required")
        LocalDateTime eventDate,

        String location) {


}
