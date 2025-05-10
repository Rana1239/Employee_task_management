package com.project.AuthService.services;

import com.project.AuthService.dto.AssignedEmployeeDto;
import com.project.AuthService.dto.EmployeeDto;
import com.project.AuthService.dto.UserDto;
import com.project.AuthService.enums.UserRole;
import com.project.AuthService.exceptions.ResourceNotFoundException;
import com.project.AuthService.models.User;
import com.project.AuthService.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public void addUser(UserDto userDto) {
        User user = User.builder()
                .username(userDto.getUsername())
                .email(userDto.getEmail())
                .password(userDto.getPassword())
                .role(userDto.getRole())
                .build();

        userRepository.save(user);
    }

    public List<EmployeeDto> getAllEmployees() {
        List<User> employees = userRepository.findByRole(UserRole.EMPLOYEE);
        return employees.stream()
                .map(user -> new EmployeeDto(user.getUsername(), user.getEmail(), user.getId()))
                .toList();
    }

    public AssignedEmployeeDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return new AssignedEmployeeDto(user.getId(), user.getUsername());
    }



}
