package com.project.TaskManagerService.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class TaskDto {
    private Long id;
    private String title;
    private String description;
    private LocalDate deadline;
    private Long assignedToId;
}