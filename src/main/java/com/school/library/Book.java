package com.school.library;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String author;

    private String isbn;

    private String category;

    private int quantityAvailable;

    private String shelfLocation;

    private int publicationYear;
    private String status; // available or issued

    private Long borrowerId; // ID of the student who borrowed the book

    // Add logic to link books to student profiles
}
