package com.example.hr_management.controller;

import lombok.Getter;
import lombok.Setter;

// LoginRequest sınıfı
@Getter
@Setter
public class LoginRequest {
    private String email;
    private String password;
}
