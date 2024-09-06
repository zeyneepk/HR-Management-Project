package com.example.hr_management.controller;

import com.example.hr_management.model.Admin;
import com.example.hr_management.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Adjust if needed
public class AuthController {

    private final AdminService adminService;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(AdminService adminService, BCryptPasswordEncoder passwordEncoder) {
        this.adminService = adminService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Admin admin = adminService.findByEmail(loginRequest.getEmail());

        if (admin != null && passwordEncoder.matches(loginRequest.getPassword(), admin.getPassword())) {
            return ResponseEntity.ok().body(Collections.singletonMap("success", true));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("success", false));
        }
    }
}
