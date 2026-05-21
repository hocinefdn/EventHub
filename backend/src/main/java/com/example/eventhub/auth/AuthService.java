package com.example.eventhub.auth;

import com.example.eventhub.auth.dto.AuthenticationRequest;
import com.example.eventhub.auth.dto.AuthenticationResponse;
import com.example.eventhub.auth.dto.RegisterRequest;
import com.example.eventhub.security.JwtService;
import com.example.eventhub.user.Role;
import com.example.eventhub.user.User;
import com.example.eventhub.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // REGISTER
    public AuthenticationResponse register(RegisterRequest request) {

        // 1. Vérifier si email existe déjà
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // 2. Créer utilisateur
        User user = new User();
        user.setFirstname(request.firstname());
        user.setLastname(request.lastname());
        user.setEmail(request.email());

        // 3. HASHE password (IMPORTANT)
        user.setPassword(passwordEncoder.encode(request.password()));

        // 4. Donner rôle par défaut
        user.setRole(Role.USER);

        // 5. Sauvegarder en base
        userRepository.save(user);

        // 6. Générer JWT
        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token);
    }

    // LOGIN
    public AuthenticationResponse login(AuthenticationRequest request) {

        // 1. Vérifie email + password via Spring Security
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        // 2. Récupérer user depuis DB
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 3. Générer JWT
        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token);
    }
}
