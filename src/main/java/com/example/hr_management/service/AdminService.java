package com.example.hr_management.service;

import com.example.hr_management.model.Admin;
import com.example.hr_management.repository.AdminRepository;
import com.example.hr_management.repository.EmployeeRepository;
import com.example.hr_management.repository.LeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private BCryptPasswordEncoder PasswordEncoder;

    public Admin addAdmin(Admin admin) {
        admin.setPassword(PasswordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Admin findByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

}
