package com.example.eventhub.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults()) // Active le CORS avec la config WebConfig
                .csrf(csrf -> csrf.disable())    // Désactive le CSRF (nécessaire pour tester les POST/PUT sans token)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()    // Autorise tout pour l'instant (MVP)
                );

        return http.build();
    }
}