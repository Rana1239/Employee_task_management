package com.project.TaskManagerService.dto;

import com.project.TaskManagerService.enums.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class AdminTaskDto {
    private String title;
    private String description;
    private LocalDate deadline;
    private TaskStatus status;
    private String assignedToName;
    // private Long assignedToId;
}
