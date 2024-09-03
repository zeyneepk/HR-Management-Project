package com.example.hr_management.service;

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
        if (leave == null || leave.getEmployee() == null) {
            throw new IllegalArgumentException("Leave or Employee cannot be null");
        }

        Employee employee = leave.getEmployee();
        employee.setLeaveDays(employee.getLeaveDays() - leave.getDaysRequested());
        employeeRepository.save(employee);

        return leaveRepository.save(leave);
    }

}
