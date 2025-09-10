package com.school.library;

import com.school.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private BookRepository bookRepository;

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public List<Transaction> getTransactionsByStudent(Long studentId) {
        return transactionRepository.findByStudentId(studentId);
    }

    public Transaction borrowBook(Long studentId, Long bookId) {
        // Check borrow limit
        List<Transaction> activeBorrows = transactionRepository.findByStudentId(studentId).stream()
            .filter(transaction -> "Borrowed".equals(transaction.getStatus()))
            .toList();

        if (activeBorrows.size() >= 3) {
            throw new RuntimeException("Borrow limit exceeded. A student can borrow a maximum of 3 books at a time.");
        }

        BookEntity book = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));

        if (book.getQuantityAvailable() <= 0) {
            throw new RuntimeException("No copies available");
        }

        book.setQuantityAvailable(book.getQuantityAvailable() - 1);
        bookRepository.save(book);

        Transaction transaction = new Transaction();
        transaction.setStudent(new Student(studentId));
        transaction.setBook(book); // Updated to use BookEntity
        transaction.setBorrowDate(LocalDate.now());
        transaction.setDueDate(LocalDate.now().plusDays(14)); // 2 weeks
        transaction.setStatus("Borrowed");

        return transactionRepository.save(transaction);
    }

    public Transaction returnBook(Long transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId).orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!"Borrowed".equals(transaction.getStatus())) {
            throw new RuntimeException("Book is not currently borrowed");
        }

        transaction.setReturnDate(LocalDate.now());
        transaction.setStatus("Returned");

        BookEntity book = transaction.getBook();
        book.setQuantityAvailable(book.getQuantityAvailable() + 1);
        bookRepository.save(book);

        return transactionRepository.save(transaction);
    }

    public List<Transaction> getOverdueTransactions() {
        List<Transaction> transactions = transactionRepository.findByStatus("Borrowed");
        transactions.forEach(transaction -> {
            if (transaction.getDueDate().isBefore(LocalDate.now())) {
                transaction.setStatus("Overdue");
                transactionRepository.save(transaction);
            }
        });
        return transactionRepository.findByStatus("Overdue");
    }

    public double calculateFine(Long transactionId, double fineRatePerDay) {
        Transaction transaction = transactionRepository.findById(transactionId).orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!"Overdue".equals(transaction.getStatus())) {
            return 0.0;
        }

        long overdueDays = LocalDate.now().toEpochDay() - transaction.getDueDate().toEpochDay();
        return overdueDays * fineRatePerDay;
    }

    public List<Transaction> getUpcomingDueTransactions(int days) {
        LocalDate today = LocalDate.now();
        LocalDate targetDate = today.plusDays(days);

        return transactionRepository.findByStatus("Borrowed").stream()
            .filter(transaction -> !transaction.getDueDate().isBefore(today) && transaction.getDueDate().isBefore(targetDate))
            .toList();
    }
}
