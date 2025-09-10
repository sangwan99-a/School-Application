package com.school.library;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/library")
public class LibraryController {

    @Autowired
    private LibraryService libraryService;

    // CRUD operations for books


    @PostMapping("/books")
    public ResponseEntity<BookEntity> addBook(@RequestBody BookEntity bookEntity) {
        return ResponseEntity.ok(libraryService.addBook(bookEntity));
    }


    @GetMapping("/books")
    public ResponseEntity<List<BookEntity>> getAllBooks() {
        return ResponseEntity.ok(libraryService.getAllBooks());
    }


    @GetMapping("/books/{id}")
    public ResponseEntity<BookEntity> getBookById(@PathVariable Long id) {
        return ResponseEntity.ok(libraryService.getBookById(id));
    }


    @PutMapping("/books/{id}")
    public ResponseEntity<BookEntity> updateBook(@PathVariable Long id, @RequestBody BookEntity bookEntity) {
        return ResponseEntity.ok(libraryService.updateBook(id, bookEntity));
    }

    @DeleteMapping("/books/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        libraryService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    // API to issue a book

    @PostMapping("/books/issue")
    public ResponseEntity<IssueEntity> issueBook(@RequestBody IssueEntity issueEntity) {
        return ResponseEntity.ok(libraryService.issueBook(issueEntity));
    }

    // API to fetch issued books by borrower ID

    @GetMapping("/books/issued/{borrowerId}")
    public ResponseEntity<List<IssueEntity>> getIssuedBooksByBorrower(@PathVariable Long borrowerId) {
        return ResponseEntity.ok(libraryService.getIssuedBooksByBorrower(borrowerId));
    }

    // API to return a book

    @PostMapping("/books/return")
    public ResponseEntity<IssueEntity> returnBook(@RequestBody IssueEntity issueEntity) {
        return ResponseEntity.ok(libraryService.returnBook(issueEntity));
    }

    // API to search books by title, author, or category
    @GetMapping("/books/search")
    public ResponseEntity<List<BookEntity>> searchBooks(@RequestParam String query) {
        return ResponseEntity.ok(libraryService.searchBooks(query));
    }

    // New endpoints for issuing and returning books with additional parameters
    @PostMapping("/books/{id}/issue")
    public ResponseEntity<IssuedBook> issueBook(@PathVariable Long id, @RequestParam String borrower, @RequestParam String dueDate) {
        LocalDate parsedDueDate = LocalDate.parse(dueDate);
        return ResponseEntity.ok(libraryService.issueBook(id, borrower, parsedDueDate));
    }

    @PostMapping("/books/{id}/return")
    public ResponseEntity<Double> returnBook(@PathVariable Long id) {
        return ResponseEntity.ok(libraryService.returnBook(id));
    }
}
