package com.example.hr_management.test;

import com.example.hr_management.controller.AuthController;
import com.example.hr_management.controller.LoginRequest;
import com.example.hr_management.model.Admin;
import com.example.hr_management.service.AdminService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class AuthControllerTest {

    @InjectMocks
    private AuthController authController;

    @Mock
    private AdminService adminService;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testLoginSuccess() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("admin@example.com");
        loginRequest.setPassword("password123");

        Admin admin = new Admin();
        admin.setEmail("admin@example.com");
        admin.setPassword("$2a$10$testhash1234567890"); // Example bcrypt hash

        when(adminService.findByEmail("admin@example.com")).thenReturn(admin);
        when(passwordEncoder.matches("password123", "$2a$10$testhash1234567890")).thenReturn(true);

        ResponseEntity<?> response = authController.login(loginRequest);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(Collections.singletonMap("success", true), response.getBody());
    }

    @Test
    public void testLoginFailure() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("admin@example.com");
        loginRequest.setPassword("wrongpassword");

        Admin admin = new Admin();
        admin.setEmail("admin@example.com");
        admin.setPassword("$2a$10$testhash1234567890"); // Example bcrypt hash

        when(adminService.findByEmail("admin@example.com")).thenReturn(admin);
        when(passwordEncoder.matches("wrongpassword", "$2a$10$testhash1234567890")).thenReturn(false);

        ResponseEntity<?> response = authController.login(loginRequest);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals(Collections.singletonMap("success", false), response.getBody());
    }
}
