package com.school.examination;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("examinationGradeRepository")
public interface GradeRepository extends JpaRepository<GradeEntity, Long> {
}
