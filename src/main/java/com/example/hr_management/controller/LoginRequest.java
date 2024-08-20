package com.example.hr_management.controller;

// LoginRequest sınıfı
public class LoginRequest {
    private String email;
    private String password;

    // Getters ve setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
