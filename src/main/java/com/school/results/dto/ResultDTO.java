package com.school.results.dto;

import lombok.Data;

@Data
public class ResultDTO {
    private Long id;
    private Long studentId;
    private Long examId;
    private String subject;
    private Double marksObtained;
    private Double totalMarks;
    private String grade;
    private String remarks;
}
