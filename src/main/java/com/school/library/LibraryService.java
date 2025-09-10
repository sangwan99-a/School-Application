package com.school.library;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.time.temporal.ChronoUnit;
import java.time.LocalDate;

@Service
public class LibraryService {

    // Search books by title, author, or category
    public List<BookEntity> searchBooks(String query) {
        return bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCaseOrIsbnContainingIgnoreCase(query, query, query);
    }

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private IssueRepository issueRepository;

    // CRUD operations for books

    public BookEntity addBook(BookEntity bookEntity) {
        return bookRepository.save(bookEntity);
    }


    public List<BookEntity> getAllBooks() {
        return bookRepository.findAll();
    }


    public BookEntity getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }


    public BookEntity updateBook(Long id, BookEntity bookDetails) {
        BookEntity bookEntity = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        bookEntity.setTitle(bookDetails.getTitle());
        bookEntity.setAuthor(bookDetails.getAuthor());
        bookEntity.setIsbn(bookDetails.getIsbn());
        bookEntity.setCategory(bookDetails.getCategory());
        bookEntity.setQuantityAvailable(bookDetails.getQuantityAvailable());
        bookEntity.setPublishDate(bookDetails.getPublishDate());
        bookEntity.setStatus(bookDetails.getStatus());
        return bookRepository.save(bookEntity);
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    // Issue a book

    public IssueEntity issueBook(IssueEntity issueEntity) {
        return issueRepository.save(issueEntity);
    }

    public IssuedBook issueBook(Long id, String borrower, LocalDate dueDate) {
        BookEntity book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        if (book.getQuantityAvailable() <= 0) {
            throw new RuntimeException("No copies available for issue");
        }

        book.setQuantityAvailable(book.getQuantityAvailable() - 1);
        bookRepository.save(book);

        IssueEntity issue = new IssueEntity();
        issue.setBook(book);
        issue.setBorrower(borrower);
        issue.setDueDate(dueDate);
        issueRepository.save(issue);

        return new IssuedBook(book.getTitle(), borrower, dueDate);
    }

    // Fetch issued books by borrower ID

    public List<IssueEntity> getIssuedBooksByBorrower(Long borrowerId) {
        return issueRepository.findByBorrowerId(borrowerId);
    }

    // Return a book and calculate late fees

    public IssueEntity returnBook(IssueEntity issueEntity) {
        IssueEntity existingIssue = issueRepository.findById(issueEntity.getId())
                .orElseThrow(() -> new RuntimeException("Issue record not found"));
        existingIssue.setReturnDate(issueEntity.getReturnDate());
        long daysLate = ChronoUnit.DAYS.between(existingIssue.getDueDate(), issueEntity.getReturnDate());
        double lateFee = daysLate > 0 ? daysLate * 5.0 : 0.0;
        existingIssue.setLateFee(lateFee);
        return issueRepository.save(existingIssue);
    }

    public double returnBook(Long id) {
        IssueEntity issue = issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue record not found"));

        BookEntity book = issue.getBook();
        book.setQuantityAvailable(book.getQuantityAvailable() + 1);
        bookRepository.save(book);

        issue.setReturnDate(LocalDate.now());
        long daysLate = ChronoUnit.DAYS.between(issue.getDueDate(), issue.getReturnDate());
        double lateFee = daysLate > 0 ? daysLate * 5.0 : 0.0;
        issue.setLateFee(lateFee);
        issueRepository.save(issue);

        return lateFee;
    }

}
