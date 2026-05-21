package com.example.eventhub.auth;

import com.example.eventhub.auth.dto.AuthenticationRequest;
import com.example.eventhub.auth.dto.AuthenticationResponse;
import com.example.eventhub.auth.dto.RegisterRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;


    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {

        return ResponseEntity.ok(
                authService.register(request)
        );
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @Valid @RequestBody AuthenticationRequest request
    ) {

        return ResponseEntity.ok(
                authService.login(request)
        );
    }
}
