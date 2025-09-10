package com.school.library;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<BookEntity> getAvailableBooks() {
        return bookRepository.findByAvailableTrue();
    }

    public List<BookEntity> getAllBooks() {
        return bookRepository.findAll();
    }

    public BookEntity addBook(BookEntity book) {
        return bookRepository.save(book);
    }

    public BookEntity getBookById(Long id) {
        return bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    public List<BookEntity> searchBooks(String title, String author, String category) {
        return bookRepository.findByTitleContainingOrAuthorContainingOrCategoryContaining(title, author, category);
    }

    public void updateBookStatus(Long bookId, String status) {
        BookEntity book = getBookById(bookId);
        book.setStatus(status);
        bookRepository.save(book);
    }

    public void updateBookBorrower(Long bookId, Long borrowerId) {
        BookEntity book = getBookById(bookId);
        book.setBorrowerId(borrowerId);
        book.setStatus("issued");
        bookRepository.save(book);
    }
}
