package com.project.TaskManagerService.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Component
public class JwtUtil {

    @Value("${jwt.secret.key}")
    private String secretKey;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public Claims extractAllClaims(String token) {
        JwtParser parser = Jwts.parser()
                .verifyWith(getSigningKey())
                .build();

        Jwt<?, ?> jwt = parser.parse(token);
        return (Claims) jwt.getPayload(); // cast to Claims
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    public Long extractId(String token) {
        return extractAllClaims(token).get("id", Long.class);
    }

    public boolean isTokenValid(String token) {
        try {
            extractAllClaims(token);
            return true;
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            return false;
        } catch (io.jsonwebtoken.security.SignatureException e) {
            return false;
        } catch (Exception e) {
            return false;
        }
    }
}


