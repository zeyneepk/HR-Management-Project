package com.example.hr_management.exception;

public class InvalidLeaveException extends RuntimeException {
    public InvalidLeaveException(String message) {
        super(message);
    }
}