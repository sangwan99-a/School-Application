package com.school.admin;

import com.school.dashboard.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/admin/dashboard")
public class AdminDashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<Map<String, Long>> getDashboardCounts() {
        return ResponseEntity.ok(dashboardService.getDashboardCounts());
    }
}