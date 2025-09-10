package com.school.examination;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamResultService {

    private final ExamResultRepository examResultRepository;

    public ExamResultService(ExamResultRepository examResultRepository) {
        this.examResultRepository = examResultRepository;
    }

    public List<ExamResult> getResultsByStudentId(Long studentId) {
        return examResultRepository.findAll();
    }

    public ExamResult saveExamResult(ExamResult examResult) {
        return examResultRepository.save(examResult);
    }

    public void deleteExamResult(Long id) {
        examResultRepository.deleteById(id);
    }
}
