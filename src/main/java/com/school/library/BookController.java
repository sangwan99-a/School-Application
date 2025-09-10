package com.school.library;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/available")
    public List<BookEntity> getAvailableBooks() {
        return bookService.getAvailableBooks();
    }

    @GetMapping
    public List<BookEntity> getAllBooks() {
        return bookService.getAllBooks();
    }

    @PostMapping
    public ResponseEntity<BookEntity> addBook(@RequestBody BookEntity book) {
        BookEntity addedBook = bookService.addBook(book);
        return new ResponseEntity<>(addedBook, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookEntity> getBookById(@PathVariable Long id) {
        BookEntity book = bookService.getBookById(id);
        return ResponseEntity.ok(book);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public List<BookEntity> searchBooks(@RequestParam String title, @RequestParam String author, @RequestParam String category) {
        return bookService.searchBooks(title, author, category);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Void> updateBookStatus(@PathVariable Long id, @RequestParam String status) {
        bookService.updateBookStatus(id, status);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/borrower")
    public ResponseEntity<Void> updateBookBorrower(@PathVariable Long id, @RequestParam Long borrowerId) {
        bookService.updateBookBorrower(id, borrowerId);
        return ResponseEntity.noContent().build();
    }
}
