package com.example.hr_management.service;

import com.example.hr_management.exception.EmployeeNotFoundException;
import com.example.hr_management.exception.InvalidEmployeeException;
import com.example.hr_management.exception.InvalidLeaveException;
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

        if (employee == null || employee.getFirstName() == null || employee.getFirstName().isEmpty()) {
            throw new InvalidEmployeeException("Employee name cannot be null or empty");
        }

        return employeeRepository.save(employee);
    }

    public Employee updateLeaveDays(Long id, Leave leave) {

        if (leave == null || leave.getDaysRequested() == null || leave.getDaysRequested() <= 0) {
            throw new InvalidLeaveException("Leave days requested must be a positive integer");
        }

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee with ID " + id + " not found"));

        employee.setLeaveDays(employee.getLeaveDays()-leave.getDaysRequested());

        leaveRepository.save(leave);
        return employeeRepository.save(employee);
    }

    //izin hakkını değiştirme
    public Employee changeLeaveLimit(Long id, Integer leaveDays) {
        if (leaveDays == null || leaveDays < 0) {
            throw new InvalidLeaveException("Leave days must be a non-negative integer");
        }

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee with ID " + id + " not found"));

        employee.setLeaveDays(leaveDays);
        return employeeRepository.save(employee);
    }

}