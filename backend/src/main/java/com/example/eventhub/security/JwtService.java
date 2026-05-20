package com.example.eventhub.security;

import com.example.eventhub.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    // change this to real key in env
    private static final String SECRET_KEY = "THIS_IS_A_VERY_SECURE_SECRET_KEY_CHANGE_IT";

    // 1. Générer le token
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(getSignInKey())
                .compact();
    }

    // 2. Extraire username (email)
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // 3. Vérifier si token est valide
    public boolean isTokenValid(String token, User user) {
        final String username = extractUsername(token);
        return (username.equals(user.getEmail())) && !isTokenExpired(token);
    }

    // 4. Vérifier expiration
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // 5. Extraire date expiration
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // 6. Extraire un claim générique
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // 7. Lire tous les claims du token
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // 8. Clé de signature
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(encodeSecret());
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // 9. Encoder secret
    private String encodeSecret() {
        return Base64.getEncoder().encodeToString(SECRET_KEY.getBytes());
    }


}
