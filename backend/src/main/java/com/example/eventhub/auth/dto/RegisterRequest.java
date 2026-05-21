package com.example.eventhub.auth.dto;

public record RegisterRequest(
        String firstname,
        String lastname,
        String email,
        String password) {
}
