package com.project.AuthService.repositories;

import com.project.AuthService.enums.UserRole;
import com.project.AuthService.models.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(UserRole role);
}
