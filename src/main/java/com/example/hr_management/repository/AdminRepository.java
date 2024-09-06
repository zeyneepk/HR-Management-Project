package com.example.hr_management.repository;

import com.example.hr_management.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Admin findByEmail(String email);
}
