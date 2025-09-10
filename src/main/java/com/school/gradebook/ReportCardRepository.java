package com.school.gradebook;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportCardRepository extends JpaRepository<ReportCard, Long> {
    ReportCard findByStudentId(Long studentId);
}
