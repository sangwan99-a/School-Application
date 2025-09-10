package com.school.examination;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ExamSubject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;
    private String teacher;

    @ManyToOne
    @JoinColumn(name = "exam_id")
    private Exam exam;

    private int maxMarks;
    private int passingMarks;

    // Add logic to manage marks for each subject
}
