package com.school.examination;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ExamEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;

    private String examDate;

    private String grade;

    private Double maxMarks;

    private Double obtainedMarks;

    public Double getMaximumMarks() {
        return maxMarks;
    }
}
