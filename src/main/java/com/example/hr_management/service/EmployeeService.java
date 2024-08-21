package com.example.hr_management.service;

import com.example.hr_management.model.Employee;
import com.example.hr_management.model.Leave;
import com.example.hr_management.repository.LeaveRepository;
import com.example.hr_management.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private LeaveRepository leaveRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee updateLeaveDays(Long id, Integer leaveDays) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow();
        employee.setLeaveDays(employee.getLeaveDays()-leaveDays);


        return employeeRepository.save(employee);
    }

    //izin hakkını değiştirme
    public Employee changeLeaveLimit(Long id, Integer leaveDays) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow();
        employee.setLeaveDays(leaveDays);
        return employeeRepository.save(employee);
    }

}