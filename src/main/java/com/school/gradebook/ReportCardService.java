package com.school.gradebook;

import org.springframework.stereotype.Service;

@Service
public class ReportCardService {

    private final ReportCardRepository reportCardRepository;

    public ReportCardService(ReportCardRepository reportCardRepository) {
        this.reportCardRepository = reportCardRepository;
    }

    public ReportCard generateReportCard(Long studentId) {
        // Logic to generate report card
        return new ReportCard();
    }
}
