package com.example.hr_management.controller;

import com.example.hr_management.model.Employee;
import com.example.hr_management.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")

public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;


    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @PostMapping
    public Employee addEmployee(@RequestBody Employee employee) {
        return employeeService.addEmployee(employee);
    }

    @PutMapping("/{id}/leave")
    public Employee updateLeaveDays(@PathVariable Long id, @RequestBody Integer leaveDays) {
        return employeeService.updateLeaveDays(id, leaveDays);
    }


}