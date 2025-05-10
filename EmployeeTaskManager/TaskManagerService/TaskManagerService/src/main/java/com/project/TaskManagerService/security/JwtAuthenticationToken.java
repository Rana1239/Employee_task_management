package com.project.TaskManagerService.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collections;

public class JwtAuthenticationToken extends AbstractAuthenticationToken {
    private final String username;
    private final String role;
    private final Long userId;
    private final String token;

    public JwtAuthenticationToken(String username, String role, Long userId,String token) {
        super(Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role)));
        this.username = username;
        this.role = role;
        this.userId = userId;
        this.token = token;
        setAuthenticated(true);
        System.out.println("[JwtAuthenticationToken] Username: " + username);
        System.out.println("[JwtAuthenticationToken] Role: " + role);
        System.out.println("[JwtAuthenticationToken] Granted Authority: " + "ROLE_" + role);
    }

    @Override
    public Object getCredentials() {
        return token;
    }

    @Override
    public Object getPrincipal() {
        return username;
    }

    public String getRole() {
        return role;
    }

    public Long getUserId() {
        return userId;
    }
}