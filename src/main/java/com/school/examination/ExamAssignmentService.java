package com.school.examination;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamAssignmentService {

    private final ExamAssignmentRepository examAssignmentRepository;

    public ExamAssignmentService(ExamAssignmentRepository examAssignmentRepository) {
        this.examAssignmentRepository = examAssignmentRepository;
    }

    public List<ExamAssignment> getAssignmentsByClass(String className) {
        return examAssignmentRepository.findAll();
    }

    public ExamAssignment saveExamAssignment(ExamAssignment examAssignment) {
        return examAssignmentRepository.save(examAssignment);
    }

    public void deleteExamAssignment(Long id) {
        examAssignmentRepository.deleteById(id);
    }
}
