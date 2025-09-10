package com.school.examination;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {
    // Added missing methods
    List<ExamResult> findByExam_Id(Long examId);

    ExamResult findByExam_IdAndStudent_Id(Long examId, Long studentId);
}
