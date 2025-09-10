package com.school.library;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/overdue")
    public List<Transaction> getOverdueTransactions() {
        return transactionService.getOverdueTransactions();
    }

    @GetMapping("/fine/{transactionId}")
    public ResponseEntity<Double> calculateFine(@PathVariable Long transactionId, @RequestParam double fineRatePerDay) {
        double fine = transactionService.calculateFine(transactionId, fineRatePerDay);
        return ResponseEntity.ok(fine);
    }

    @GetMapping("/upcoming-due")
    public List<Transaction> getUpcomingDueTransactions(@RequestParam int days) {
        return transactionService.getUpcomingDueTransactions(days);
    }
}
