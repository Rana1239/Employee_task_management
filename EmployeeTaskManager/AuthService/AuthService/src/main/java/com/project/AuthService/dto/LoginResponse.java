package com.project.AuthService.dto;

import com.project.AuthService.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private Long id;
    private String username;
    private UserRole role;
    private String message;
    private String token;
}
