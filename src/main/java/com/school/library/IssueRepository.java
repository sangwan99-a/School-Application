package com.school.library;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<IssueEntity, Long> {
    List<IssueEntity> findByBorrowerId(Long borrowerId);
}
