package com.school.library;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;

@RestController
@RequestMapping("/api/book-issues")
public class BookIssueController {
    private final BookIssueService bookIssueService;

    public BookIssueController(BookIssueService bookIssueService) {
        this.bookIssueService = bookIssueService;
    }

    @GetMapping
    public List<BookIssueEntity> getAllIssuedBooks() {
        return bookIssueService.getAllIssuedBooks();
    }

    @GetMapping("/issued")
    public List<BookIssueEntity> getIssuedBooks() {
        return bookIssueService.getAllIssuedBooks().stream()
            .filter(bi -> bi.getReturnDate() == null)
            .toList();
    }

    @GetMapping("/returned")
    public List<BookIssueEntity> getReturnedBooks() {
        return bookIssueService.getAllIssuedBooks().stream()
            .filter(bi -> bi.getReturnDate() != null)
            .toList();
    }

    @PostMapping
    public ResponseEntity<BookIssueEntity> issueBook(@RequestBody BookIssueEntity bookIssue) {
        BookIssueEntity issued = bookIssueService.issueBook(bookIssue);
        return new ResponseEntity<>(issued, HttpStatus.CREATED);
    }

    @PostMapping("/{id}/return")
    public ResponseEntity<BookIssueEntity> returnBook(@PathVariable Long id) {
        BookIssueEntity returned = bookIssueService.returnBook(id);
        return ResponseEntity.ok(returned);
    }

    @GetMapping("/overdue")
    public List<BookIssueEntity> getOverdueBooks() {
        return bookIssueService.getOverdueBooks();
    }
}
