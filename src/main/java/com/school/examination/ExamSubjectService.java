package com.school.examination;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamSubjectService {

    private final ExamSubjectRepository examSubjectRepository;

    public ExamSubjectService(ExamSubjectRepository examSubjectRepository) {
        this.examSubjectRepository = examSubjectRepository;
    }

    public List<ExamSubject> getSubjectsByExamId(Long examId) {
        return examSubjectRepository.findAll();
    }

    public ExamSubject saveExamSubject(ExamSubject examSubject) {
        return examSubjectRepository.save(examSubject);
    }

    public void deleteExamSubject(Long id) {
        examSubjectRepository.deleteById(id);
    }
}
