package com.school.library;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookIssueService {
    public BookIssueEntity returnBook(Long id) {
        BookIssueEntity issue = bookIssueRepository.findById(id).orElseThrow(() -> new RuntimeException("Issue not found"));
        issue.setReturnDate(java.time.LocalDate.now().toString());
        issue.getBook().setAvailable(true);
        return bookIssueRepository.save(issue);
    }
    private final BookIssueRepository bookIssueRepository;

    public BookIssueService(BookIssueRepository bookIssueRepository) {
        this.bookIssueRepository = bookIssueRepository;
    }

    public List<BookIssueEntity> getAllIssuedBooks() {
        return bookIssueRepository.findAll();
    }

    public BookIssueEntity issueBook(BookIssueEntity bookIssue) {
        return bookIssueRepository.save(bookIssue);
    }

    public List<BookIssueEntity> getOverdueBooks() {
        return bookIssueRepository.findAll().stream()
            .filter(issue -> issue.getReturnDate() == null && java.time.LocalDate.parse(issue.getDueDate()).isBefore(java.time.LocalDate.now()))
            .toList();
    }
}
