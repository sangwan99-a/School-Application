package com.school.library;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByStudentId(Long studentId);

    List<Transaction> findByStatus(String status);

    List<Transaction> findByBookIdAndStatus(Long bookId, String status);
}
