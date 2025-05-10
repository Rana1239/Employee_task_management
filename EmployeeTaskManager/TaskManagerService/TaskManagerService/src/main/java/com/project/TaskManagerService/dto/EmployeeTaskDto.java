package com.project.TaskManagerService.dto;

import com.project.TaskManagerService.enums.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class EmployeeTaskDto {
    private Long id;
    private String title;
    private String description;
    private LocalDate deadline;
    private TaskStatus status;
}
