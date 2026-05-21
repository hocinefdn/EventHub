package com.example.eventhub.auth.dto;

public record AuthenticationRequest(
        String email,
        String password) {
}
