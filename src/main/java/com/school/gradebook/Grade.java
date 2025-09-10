package com.school.gradebook;

import jakarta.persistence.*;

@Entity
public class Grade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private Long subjectId;
    private Long examId;
    private String gradeType; // "MARKS" or "LETTER"
    private String gradeValue; // e.g., "A" or "85"

    // Getters and Setters
}
