package com.example.hr_management.test;

import com.example.hr_management.controller.LeaveController;
import com.example.hr_management.model.Employee;
import com.example.hr_management.model.Leave;
import com.example.hr_management.service.LeaveService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class LeaveControllerTest {

    @InjectMocks
    private LeaveController leaveController;

    @Mock
    private LeaveService leaveService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddLeaveEntry() {
        Employee employee = new Employee();
        employee.setId(1L);

        Leave leave = new Leave();
        leave.setId(1L);
        leave.setEmployee(employee);
        leave.setStartDate(new Date());
        leave.setEndDate(new Date());
        leave.setDaysRequested(5);

        when(leaveService.addLeaveEntry(leave)).thenReturn(leave);

        Leave response = leaveController.addLeaveEntry(leave);
        assertEquals(leave, response);
    }
}
