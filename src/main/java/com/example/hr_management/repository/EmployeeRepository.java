package com.example.hr_management.repository;

import com.example.hr_management.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}