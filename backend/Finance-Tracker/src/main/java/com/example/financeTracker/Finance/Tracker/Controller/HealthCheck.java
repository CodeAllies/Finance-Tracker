package com.example.financeTracker.Finance.Tracker.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheck {

    @GetMapping("/health")
    public String getHealth(){
        return "Application is working fine.";
    }
}
