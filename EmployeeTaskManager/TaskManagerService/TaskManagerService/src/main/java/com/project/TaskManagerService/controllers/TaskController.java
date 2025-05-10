package com.project.TaskManagerService.controllers;

import com.project.TaskManagerService.dto.AdminTaskDto;
import com.project.TaskManagerService.dto.EmployeeTaskDto;
import com.project.TaskManagerService.dto.TaskDto;
import com.project.TaskManagerService.enums.TaskStatus;
import com.project.TaskManagerService.services.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/task")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping("/assign")
    public ResponseEntity<?> assignTask(@RequestBody TaskDto taskDto) {
        return ResponseEntity.ok(taskService.assignTask(taskDto));
    }

    @GetMapping("/employee/tasks")
    public ResponseEntity<List<EmployeeTaskDto>> getTasksByEmployee() {
        List<EmployeeTaskDto> tasks = taskService.getTasksForCurrentEmployee();
        return ResponseEntity.ok(tasks);
    }

    @PutMapping("/employee/tasks/{taskId}/status")
    public ResponseEntity<Void> updateTaskStatus(
            @PathVariable Long taskId,
            @RequestParam TaskStatus status) {
        taskService.updateTaskStatus(taskId, status);
        return ResponseEntity.noContent().build();
    }

/*
    @GetMapping("/admin/{adminId}/tasks")
    public ResponseEntity<List<AdminTaskDto>> getAllTasksByAdmin(@PathVariable Long adminId, @RequestParam(required = false) TaskStatus status) {
        List<AdminTaskDto> tasks = taskService.getAllTasksByAdmin(adminId,status);
        return ResponseEntity.ok(tasks);
    }
    */

    @GetMapping("/admin/tasks")
    public ResponseEntity<List<AdminTaskDto>> getAllTasksByAdmin2(@RequestParam(required = false) TaskStatus status) {
        List<AdminTaskDto> tasks = taskService.getAllTasksByAdmin2(status);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("[Controller] Authenticated User: " + auth.getName());
        System.out.println("[Controller] Authorities: " + auth.getAuthorities());
        System.out.println("[Controller] Auth class: " + auth.getClass().getSimpleName());
        return ResponseEntity.ok(tasks);
    }





}

