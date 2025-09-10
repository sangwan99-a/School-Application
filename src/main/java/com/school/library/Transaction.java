package com.school.library;

import com.school.student.Student;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private BookEntity book;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    private LocalDate borrowDate;

    private LocalDate dueDate;

    private LocalDate returnDate;

    private String status; // Borrowed, Returned, Overdue

    public void setStudent(Student student) {
        this.student = student;
    }

    public void setBook(BookEntity book) {
        this.book = book;
    }

    public BookEntity getBook() {
        return book;
    }
}
