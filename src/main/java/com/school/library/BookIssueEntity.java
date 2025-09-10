package com.school.library;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class BookIssueEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private BookEntity book;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private com.school.student.Student student;

    private String issueDate;
    private String dueDate;
    private String returnDate;
}
