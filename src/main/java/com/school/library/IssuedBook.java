package com.school.library;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Entity
@Data
public class IssuedBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    private String borrower; // Student or staff name or ID

    private LocalDate issueDate;

    private LocalDate dueDate;

    private Double fine; // Fine for late return

    private boolean isOverdue;

    // Add logic to calculate fine based on due date and current date
    public void calculateFine() {
        LocalDate currentDate = LocalDate.now();
        if (currentDate.isAfter(dueDate)) {
            long daysLate = ChronoUnit.DAYS.between(dueDate, currentDate);
            fine = daysLate * 0.50; // Assuming the fine is 0.50 per day
        } else {
            fine = 0.0;
        }
    }

    // Add logic to determine if a book is overdue
    public void checkOverdue() {
        LocalDate currentDate = LocalDate.now();
        isOverdue = currentDate.isAfter(dueDate);
    }

    public IssuedBook(String title, String borrower, LocalDate dueDate) {
        this.borrower = borrower;
        this.dueDate = dueDate;
    }
}
