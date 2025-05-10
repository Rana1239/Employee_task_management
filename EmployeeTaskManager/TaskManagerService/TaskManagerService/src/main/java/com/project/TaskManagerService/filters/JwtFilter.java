package com.project.TaskManagerService.filters;

import com.project.TaskManagerService.security.JwtAuthenticationToken;
import com.project.TaskManagerService.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = extractToken(request);
        String authHeader = request.getHeader("Authorization");
        System.out.println("[JwtFilter] Authorization header: " + authHeader);
        System.out.println("[JwtFilter] Extracted Token: " + token);


if (token != null && jwtUtil.isTokenValid(token)) {
    String username = jwtUtil.extractUsername(token);
    String role = jwtUtil.extractRole(token);
    Long userId = jwtUtil.extractId(token); // assuming you have added this method in JwtUtil
    
    JwtAuthenticationToken authenticationToken = new JwtAuthenticationToken(username, role, userId,token);
    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    System.out.println("[JwtFilter] Username from token: " + username);
    System.out.println("[JwtFilter] Role from token: " + role);
}

        filterChain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7); // Remove "Bearer " from the header
        }
        return null;
    }
}

