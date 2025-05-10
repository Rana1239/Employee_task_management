package com.project.TaskManagerService.repositories;

import com.project.TaskManagerService.enums.TaskStatus;
import com.project.TaskManagerService.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long> {
    List<Task> findByAdminId(Long adminId);
    List<Task> findByAssignedToId(Long assignedToId);
    List<Task> findByAdminIdAndStatus(Long adminId, TaskStatus status);
}
