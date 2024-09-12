package com.example.hr_management.test;

import com.example.hr_management.controller.AdminController;
import com.example.hr_management.model.Admin;
import com.example.hr_management.service.AdminService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class AdminControllerTest {

    @InjectMocks
    private AdminController adminController;

    @Mock
    private AdminService adminService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllAdmins() {
        Admin admin1 = new Admin();
        admin1.setId(1);
        admin1.setFirstName("Alice");
        admin1.setLastName("Smith");
        admin1.setEmail("alice@gmail.com");
        admin1.setPassword("Alice123");


        Admin admin2 = new Admin();
        admin2.setId(2);
        admin2.setFirstName("Bob");
        admin2.setLastName("Brown");
        admin2.setEmail("bob@gmail.com");
        admin2.setPassword("Bob123");

        when(adminService.getAllAdmins()).thenReturn(Arrays.asList(admin1, admin2));

        List<Admin> response = adminController.getAllAdmins();
        assertEquals(2, response.size());
        assertEquals(admin1, response.get(0));
        assertEquals(admin2, response.get(1));
    }

    @Test
    public void testAddAdmin() {
        Admin admin = new Admin();
        admin.setId(1);
        admin.setFirstName("Alice");
        admin.setLastName("Smith");
        admin.setEmail("alice@gmail.com");
        admin.setPassword("Alice123");

        when(adminService.addAdmin(admin)).thenReturn(admin);

        Admin response = adminController.addAdmin(admin);
        assertEquals(admin, response);
    }
}
