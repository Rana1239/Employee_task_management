package com.project.AuthService.dto;

import com.project.AuthService.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {
    private String username;
    private String email;
    private String password;
    private UserRole role;
}
