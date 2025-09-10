package com.school.gradebook;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/report-cards")
public class ReportCardController {

    private final ReportCardService reportCardService;

    public ReportCardController(ReportCardService reportCardService) {
        this.reportCardService = reportCardService;
    }

    @GetMapping("/student/{studentId}")
    public ReportCard getReportCardByStudentId(@PathVariable Long studentId) {
        return reportCardService.generateReportCard(studentId);
    }
}
