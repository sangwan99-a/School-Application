package com.school.library;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class IssuedBookService {

    private final IssuedBookRepository issuedBookRepository;

    public IssuedBookService(IssuedBookRepository issuedBookRepository) {
        this.issuedBookRepository = issuedBookRepository;
    }

    public List<IssuedBook> getIssuedBooksByStudentId(String borrower) {
        return issuedBookRepository.findByBorrower(borrower);
    }

    public IssuedBook issueBook(IssuedBook issuedBook) {
        issuedBook.setIssueDate(LocalDate.now());
        issuedBook.setDueDate(LocalDate.now().plusDays(14)); // Default due date is 2 weeks
        return issuedBookRepository.save(issuedBook);
    }

    public void returnBook(Long id) {
        issuedBookRepository.deleteById(id);
    }
}
