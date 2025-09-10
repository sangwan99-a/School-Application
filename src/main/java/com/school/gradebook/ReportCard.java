package com.school.gradebook;

import jakarta.persistence.*;

@Entity
public class ReportCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private String reportDetails; // JSON or String representation of the report card

    // Getters and Setters
}
