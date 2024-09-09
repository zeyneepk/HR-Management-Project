package com.example.hr_management.service;

import com.example.hr_management.exception.InvalidDepartmentException;
import com.example.hr_management.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.hr_management.model.Department;

import java.util.List;

@Service
public class DepartmentService {

    @Autowired
    private final DepartmentRepository departmentRepository;

    @Autowired
    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department addDepartment(Department department) {

        if (department == null || department.getDepartment_name() == null || department.getDepartment_name().isEmpty()) {
            throw new InvalidDepartmentException("Department name cannot be null or empty");
        }
        return departmentRepository.save(department);
    }
}
