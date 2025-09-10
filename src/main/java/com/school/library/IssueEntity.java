package com.school.library;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class IssueEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private BookEntity book;

    private Long borrowerId;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private double lateFees;

    public void setLateFee(double lateFee) {
        this.lateFees = lateFee;
    }

    public double getLateFee() {
        return this.lateFees;
    }

    public void setBorrower(String borrower) {
        this.borrowerId = Long.parseLong(borrower);
    }
}
