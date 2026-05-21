package com.example.eventhub.event.exception;

public class EventNotFoundException extends RuntimeException {

    public EventNotFoundException(Long id) {
        super("Event not found with id: " + id);
    }

}
