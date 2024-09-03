package com.example.hr_management.repository;

import com.example.hr_management.model.Department;
import com.example.hr_management.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
}