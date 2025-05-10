package com.project.AuthService.services;

import com.project.AuthService.dto.LoginRequest;
import com.project.AuthService.dto.LoginResponse;
//import com.project.AuthService.dto.LoginResponse;
//import com.project.AuthService.exceptions.InvalidCredentialsException;
import com.project.AuthService.exceptions.InvalidCredentialsException;
import com.project.AuthService.models.User;
import com.project.AuthService.repositories.UserRepository;
import com.project.AuthService.util.JwtUtil;
//import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;




/*
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public LoginResponse login(@NonNull LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail());

        if (user != null && user.getPassword().equals(request.getPassword())) {
            return new LoginResponse(user.getId(), user.getUsername(),user.getRole() ,"Login successful!");
        } else {
            throw new InvalidCredentialsException("Invalid email or password.");
        }
    }
}

 */

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest request) {
        System.out.println("Login request received: " + request.getEmail() + ", " + request.getPassword());
        System.out.println("Stored password: " + userRepository.findByEmail(request.getEmail()).get().getPassword());
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email."));

        if (!request.getPassword().equals(user.getPassword())) {
            throw new InvalidCredentialsException("Invalid password.");
        }

        System.out.println("Login successful for user: " + user.getEmail());
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name(),user.getId());

        return new LoginResponse(
            user.getId(),
            user.getUsername(),
            user.getRole(),
            "Login successful!",
            token
        );
    }

}
