package com.project.TaskManagerService.services;

import com.project.TaskManagerService.dto.AdminTaskDto;
import com.project.TaskManagerService.dto.AssignedEmployeeDto;
import com.project.TaskManagerService.dto.EmployeeTaskDto;
import com.project.TaskManagerService.dto.TaskDto;
import com.project.TaskManagerService.enums.TaskStatus;
import com.project.TaskManagerService.models.Task;
import com.project.TaskManagerService.repositories.TaskRepository;
import com.project.TaskManagerService.security.JwtAuthenticationToken;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public Task assignTask(TaskDto taskDto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long adminId = ((JwtAuthenticationToken) auth).getUserId();

        Task task = Task.builder()
                .title(taskDto.getTitle())
                .description(taskDto.getDescription())
                .deadline(taskDto.getDeadline())
                .assignedToId(taskDto.getAssignedToId())
                .adminId(adminId)
                .status(TaskStatus.PENDING)
                .build();
        
        
        return taskRepository.save(task);
    }

    public List<EmployeeTaskDto> getTasksForCurrentEmployee() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long employeeId = ((JwtAuthenticationToken) auth).getUserId();

        List<Task> tasks = taskRepository.findByAssignedToId(employeeId);
        return tasks.stream()
                .map(task -> new EmployeeTaskDto(
                        task.getId(),
                        task.getTitle(),
                        task.getDescription(),
                        task.getDeadline(),
                        task.getStatus()
                ))
                .toList();
    }

    public void updateTaskStatus(Long taskId, TaskStatus newStatus) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long employeeId = ((JwtAuthenticationToken) auth).getUserId();

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getAssignedToId().equals(employeeId)) {
            throw new RuntimeException("You can only update your own tasks");
        }

        task.setStatus(newStatus);
        taskRepository.save(task);
    }

    @Autowired
    private RestTemplate restTemplate;

    private final String AUTH_SERVICE_URL = "http://AUTHSERVICE/user/getUserNameById/";

    /* public List<AdminTaskDto> getAllTasksByAdmin(Long adminId,TaskStatus status) {

        List<Task> tasks ;

        if (status != null) {
            tasks = taskRepository.findByAdminIdAndStatus(adminId, status);
        } else {
            tasks = taskRepository.findByAdminId(adminId);
        }

        String jwtToken = extractJwtFromContext();
        System.out.println("Extracted JWT from context: " + jwtToken);

        return tasks.stream()
                .map(task -> {

                    String url = AUTH_SERVICE_URL + task.getAssignedToId();

                    HttpHeaders headers = new HttpHeaders();
                    headers.set("Authorization", "Bearer " + jwtToken);
                    HttpEntity<String> entity = new HttpEntity<>(headers);

                    ResponseEntity<AssignedEmployeeDto> response = restTemplate.exchange(
                            url, HttpMethod.GET, entity, AssignedEmployeeDto.class);

                    AssignedEmployeeDto employeeDto = response.getBody();

                    return new AdminTaskDto(
                            task.getTitle(),
                            task.getDescription(),
                            task.getDeadline(),
                            task.getStatus(),
                            employeeDto != null ? employeeDto.getUsername() : "Not Found"
                    );
                })
                .collect(Collectors.toList());
    }  */

    public List<AdminTaskDto> getAllTasksByAdmin2(TaskStatus status) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (!(authentication instanceof JwtAuthenticationToken jwtAuth)) {
            throw new RuntimeException("Authentication token is invalid");
        }

        Long adminId = jwtAuth.getUserId();
        String jwtToken = extractJwtFromContext();
        System.out.println("admin id: "+ adminId);
 
        List<Task> tasks;

        if (status != null) {
            tasks = taskRepository.findByAdminIdAndStatus(adminId, status);
        } else {
            tasks = taskRepository.findByAdminId(adminId);
        }

        return tasks.stream()
                .map(task -> {
                    String url = AUTH_SERVICE_URL + task.getAssignedToId();

                    HttpHeaders headers = new HttpHeaders();
                    headers.set("Authorization", "Bearer " + jwtToken);
                    HttpEntity<String> entity = new HttpEntity<>(headers);

                    ResponseEntity<AssignedEmployeeDto> response = restTemplate.exchange(
                            url, HttpMethod.GET, entity, AssignedEmployeeDto.class);

                    AssignedEmployeeDto employeeDto = response.getBody();

                    return new AdminTaskDto(
                            task.getTitle(),
                            task.getDescription(),
                            task.getDeadline(),
                            task.getStatus(),
                            // task.getAssignedToId()                            
                            employeeDto != null ? employeeDto.getUsername() : "Not Found"
                    );
                })
                .collect(Collectors.toList());
    }

    private String extractJwtFromContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getCredentials() instanceof String) {
            return (String) authentication.getCredentials(); // token is stored as credentials
        }
        return null;
    }


}

