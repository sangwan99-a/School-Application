package com.school.examination;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import java.util.List;

@Service("examinationGradeService")
public class GradeService {

    private final GradeRepository gradeRepository;

    public GradeService(@Qualifier("examinationGradeRepository") GradeRepository gradeRepository) {
        this.gradeRepository = gradeRepository;
    }

    public List<GradeEntity> getAllGrades() {
        return gradeRepository.findAll();
    }

    public GradeEntity createGrade(GradeEntity grade) {
        return gradeRepository.save(grade);
    }

    public GradeEntity getGradeById(Long id) {
        return gradeRepository.findById(id).orElseThrow(() -> new RuntimeException("Grade not found"));
    }

    public void deleteGrade(Long id) {
        gradeRepository.deleteById(id);
    }

    public GradeEntity updateGrade(Long id, GradeEntity gradeDetails) {
        GradeEntity grade = gradeRepository.findById(id).orElseThrow(() -> new RuntimeException("Grade not found"));
        grade.setName(gradeDetails.getName());
        grade.setDescription(gradeDetails.getDescription());
        return gradeRepository.save(grade);
    }
}
