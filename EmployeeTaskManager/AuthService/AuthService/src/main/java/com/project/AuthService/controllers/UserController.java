package com.project.AuthService.controllers;

import com.project.AuthService.dto.AssignedEmployeeDto;
import com.project.AuthService.dto.EmployeeDto;
import com.project.AuthService.dto.UserDto;
import com.project.AuthService.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/addEmployee")
    public ResponseEntity<String> addUser(@RequestBody UserDto userDto) {
        userService.addUser(userDto);
        return ResponseEntity.ok("Employee added successfully");
    }

    @GetMapping("/getAllEmployees")
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        return ResponseEntity.ok(userService.getAllEmployees());
    }

    @GetMapping("/getUserNameById/{id}")
    public ResponseEntity<AssignedEmployeeDto> getUserById(@PathVariable Long id) {
        AssignedEmployeeDto employee = userService.getUserById(id);
        return ResponseEntity.ok(employee);
    }
}
