package com.example.hr_management.service;

import com.example.hr_management.exception.EmployeeNotFoundException;
import com.example.hr_management.exception.InvalidLeaveException;
import com.example.hr_management.model.Employee;
import com.example.hr_management.model.Leave;
import com.example.hr_management.repository.EmployeeRepository;
import com.example.hr_management.repository.LeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LeaveService {

    @Autowired
    private LeaveRepository leaveRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public Leave addLeaveEntry(Leave leave) {
        if (leave == null) {
            throw new InvalidLeaveException("Leave request cannot be null");
        }

        if (leave.getDaysRequested() == null || leave.getDaysRequested() <= 0) {
            throw new InvalidLeaveException("Requested leave days must be a positive number");
        }

        Employee employee = employeeRepository.findById(leave.getEmployee().getId())
                .orElseThrow(() -> new EmployeeNotFoundException("Employee with ID " + leave.getEmployee().getId() + " not found"));

        if (employee.getLeaveDays() < leave.getDaysRequested()) {
            throw new InvalidLeaveException("Employee does not have enough leave days");
        }

        employee.setLeaveDays(employee.getLeaveDays() - leave.getDaysRequested());
        employeeRepository.save(employee);

        return leaveRepository.save(leave);
    }
}
