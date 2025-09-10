package com.school.gradebook;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("gradebookGradeService")
public class GradeService {

    private final GradeRepository gradeRepository;

    public GradeService(@Qualifier("gradebookGradeRepository") GradeRepository gradeRepository) {
        this.gradeRepository = gradeRepository;
    }

    public List<Grade> getGradesByStudentId(Long studentId) {
        return gradeRepository.findByStudentId(studentId);
    }

    public Grade saveGrade(Grade grade) {
        return gradeRepository.save(grade);
    }

    public double calculateGPA(Long studentId) {
        // Logic to calculate GPA based on grades
        return 0.0;
    }
}
