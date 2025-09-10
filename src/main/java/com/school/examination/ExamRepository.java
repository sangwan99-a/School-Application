package com.school.examination;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ExamRepository extends JpaRepository<Exam, Long> {
    List<Exam> findByClassIdAndExamDateAfter(Long classId, LocalDate date);
    List<Exam> findByClassIdAndExamDateBefore(Long classId, LocalDate date);
}
