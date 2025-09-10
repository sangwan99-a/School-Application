package com.school.examination;

import org.springframework.stereotype.Service;
import java.util.List;
import java.time.LocalDate;

@Service
public class ExamService {

    private final ExamRepository examRepository;
    private final ExamResultRepository examResultRepository;

    public ExamService(ExamRepository examRepository, ExamResultRepository examResultRepository) {
        this.examRepository = examRepository;
        this.examResultRepository = examResultRepository;
    }

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    public Exam getExamById(Long id) {
        return examRepository.findById(id).orElseThrow(() -> new RuntimeException("Exam not found"));
    }

    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    public Exam updateExam(Long id, Exam examDetails) {
        Exam exam = getExamById(id);
        exam.setSubject(examDetails.getSubject());
        exam.setExamDate(examDetails.getExamDate());
        exam.setGrade(examDetails.getGrade());
        exam.setMaxMarks(examDetails.getMaxMarks());
        exam.setObtainedMarks(examDetails.getObtainedMarks());
        return examRepository.save(exam);
    }

    public void deleteExam(Long id) {
        examRepository.deleteById(id);
    }

    public List<Exam> getUpcomingExamsByClass(Long classId) {
        // Placeholder for repository method implementation
        throw new UnsupportedOperationException("Method not implemented");
    }

    public List<Exam> getPastExamsByClass(Long classId) {
        // Placeholder for repository method implementation
        throw new UnsupportedOperationException("Method not implemented");
    }

    public List<Exam> getExamsByClassAndDate(String className, LocalDate date) {
        // Placeholder for repository method implementation
        throw new UnsupportedOperationException("Method not implemented");
    }

    public List<ExamSubject> getSubjectsByExamId(Long examId) {
        // Placeholder for repository method implementation
        throw new UnsupportedOperationException("Method not implemented");
    }

    public ExamResult addExamResult(ExamResult examResult) {
        return examResultRepository.save(examResult);
    }

    public List<ExamResult> getResultsByExamId(Long examId) {
        return examResultRepository.findByExam_Id(examId);
    }

    public double calculatePercentage(Long studentId, Long examId) {
        // Logic to calculate percentage based on marks obtained and max marks
        return 0.0;
    }

    public String calculateGrade(int marksObtained, int totalMarks) {
        double percentage = (double) marksObtained / totalMarks * 100;
        if (percentage >= 90) return "A";
        else if (percentage >= 80) return "B";
        else if (percentage >= 70) return "C";
        else if (percentage >= 60) return "D";
        else return "F";
    }

    // Added missing methods
    public List<Exam> getUpcomingExams(String className, String subject) {
        // Placeholder for implementation
        throw new UnsupportedOperationException("Method not implemented");
    }

    public void assignExamToClass(Long examId, Long classId, String subject) {
        // Placeholder for implementation
        throw new UnsupportedOperationException("Method not implemented");
    }
}
