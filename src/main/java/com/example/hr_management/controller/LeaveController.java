package com.example.hr_management.controller;

import com.example.hr_management.model.Leave;
import com.example.hr_management.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/leaves")
public class LeaveController {
    @Autowired
    private LeaveService leaveService;

    @PostMapping
    public Leave addLeaveEntry(@RequestBody Leave leave) {
        return leaveService.addLeaveEntry(leave);
    }
}