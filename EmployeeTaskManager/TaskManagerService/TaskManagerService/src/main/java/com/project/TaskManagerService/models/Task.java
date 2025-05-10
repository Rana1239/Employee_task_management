package com.project.TaskManagerService.models;

import com.project.TaskManagerService.enums.TaskStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private LocalDate deadline;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    private Long adminId;

    private Long assignedToId;

}
