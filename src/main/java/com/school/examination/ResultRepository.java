
    package com.school.examination;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<ResultEntity, Long> {
    List<ResultEntity> findByStudent_Id(Long studentId);
    List<ResultEntity> findByClassEntity_Id(Long classId);
    List<ResultEntity> findByExam_Id(Long examId);
    List<ResultEntity> findByExam_IdAndStudent_Id(Long examId, Long studentId);
    // Removed findByStudent_AdmissionNo(String admissionNo) as Student no longer has admissionNo
}