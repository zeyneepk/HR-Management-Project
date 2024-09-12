package com.example.hr_management.test;

import com.example.hr_management.controller.EmployeeController;
import com.example.hr_management.model.Employee;
import com.example.hr_management.model.Leave;
import com.example.hr_management.service.EmployeeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class EmployeeControllerTest {

    @InjectMocks
    private EmployeeController employeeController;

    @Mock
    private EmployeeService employeeService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllEmployees() {
        Employee emp1 = new Employee();
        emp1.setId(1L);
        emp1.setFirstName("John");
        emp1.setLastName("Doe");

        Employee emp2 = new Employee();
        emp2.setId(2L);
        emp2.setFirstName("Jane");
        emp2.setLastName("Doe");

        when(employeeService.getAllEmployees()).thenReturn(Arrays.asList(emp1, emp2));

        List<Employee> response = employeeController.getAllEmployees();
        assertEquals(2, response.size());
        assertEquals(emp1, response.get(0));
        assertEquals(emp2, response.get(1));
    }

    @Test
    public void testAddEmployee() {
        Employee employee = new Employee();
        employee.setId(1L);
        employee.setFirstName("John");
        employee.setLastName("Doe");
        employee.setLeaveDays(15);
        employee.setEmail("john@gmail.com");
        employee.setPassword("John123");
        employee.setDepartment("Yazılım");

        when(employeeService.addEmployee(employee)).thenReturn(employee);

        Employee response = employeeController.addEmployee(employee);
        assertEquals(employee, response);
    }

    @Test
    public void testUpdateLeaveDays() {
        Employee employee = new Employee();
        employee.setId(1L);
        employee.setLeaveDays(10);

        Leave leave = new Leave();
        leave.setDaysRequested(5);

        when(employeeService.updateLeaveDays(1L, leave)).thenReturn(employee);

        Employee response = employeeController.updateLeaveDays(1L, leave);
        assertEquals(employee, response);
    }

    @Test
    public void testChangeLeaveLimit() {
        Employee employee = new Employee();
        employee.setId(1L);
        employee.setFirstName("Gülden");
        employee.setLastName("Karaböcek");
        employee.setEmail("gulden@gmail.com");
        employee.setDepartment("Hukuk");
        employee.setLeaveDays(15);
        employee.setPassword("Gulden123");

        when(employeeService.changeLeaveLimit(1L, 25)).thenReturn(employee);

        Employee response = employeeController.changeLeaveLimit(1L, 25);
        assertEquals(employee, response);
    }
}
