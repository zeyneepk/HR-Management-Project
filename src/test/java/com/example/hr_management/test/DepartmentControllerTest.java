package com.example.hr_management.test;

import com.example.hr_management.controller.DepartmentController;
import com.example.hr_management.model.Department;
import com.example.hr_management.service.DepartmentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class DepartmentControllerTest {

    @InjectMocks
    private DepartmentController departmentController;

    @Mock
    private DepartmentService departmentService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllDepartments() {
        Department dept1 = new Department();
        dept1.setId(1L);
        dept1.setDepartment_name("HR");

        Department dept2 = new Department();
        dept2.setId(2L);
        dept2.setDepartment_name("IT");

        when(departmentService.getAllDepartments()).thenReturn(Arrays.asList(dept1, dept2));

        List<Department> response = departmentController.getAllDepartments();
        assertEquals(2, response.size());
        assertEquals(dept1, response.get(0));
        assertEquals(dept2, response.get(1));
    }

    @Test
    public void testAddDepartment() {
        Department department = new Department();
        department.setId(1L);
        department.setDepartment_name("HR");

        when(departmentService.addDepartment(department)).thenReturn(department);

        Department response = departmentController.addDepartment(department);
        assertEquals(department, response);
    }
}
