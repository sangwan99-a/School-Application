package com.school.examination;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/exams")
public class ExamController {

    private final ExamService examService;
    private final ExamResultRepository examResultRepository;

    public ExamController(ExamService examService, ExamResultRepository examResultRepository) {
        this.examService = examService;
        this.examResultRepository = examResultRepository;
    }

    @GetMapping
    public List<Exam> getAllExams() {
        return examService.getAllExams();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exam> getExamById(@PathVariable Long id) {
        return ResponseEntity.ok(examService.getExamById(id));
    }

    @PostMapping
    public ResponseEntity<Exam> createExam(@RequestBody Exam exam) {
        return ResponseEntity.ok(examService.createExam(exam));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Exam> updateExam(@PathVariable Long id, @RequestBody Exam examDetails) {
        return ResponseEntity.ok(examService.updateExam(id, examDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExam(@PathVariable Long id) {
        examService.deleteExam(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/class/{classId}/upcoming")
    public List<Exam> getUpcomingExamsByClass(@PathVariable Long classId) {
        return examService.getUpcomingExamsByClass(classId);
    }

    @GetMapping("/class/{classId}/past")
    public List<Exam> getPastExamsByClass(@PathVariable Long classId) {
        return examService.getPastExamsByClass(classId);
    }

    @GetMapping("/upcoming")
    public List<Exam> getUpcomingExams(@RequestParam String className, @RequestParam String subject) {
        return examService.getUpcomingExams(className, subject);
    }

    @PostMapping("/assign")
    public ResponseEntity<Void> assignExamToClass(@RequestParam Long examId, @RequestParam Long classId, @RequestParam String subject) {
        examService.assignExamToClass(examId, classId, subject);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/class/{className}/date/{date}")
    public ResponseEntity<List<Exam>> getExamsByClassAndDate(@PathVariable String className, @PathVariable String date) {
        LocalDate examDate = LocalDate.parse(date);
        return ResponseEntity.ok(examService.getExamsByClassAndDate(className, examDate));
    }

    @GetMapping("/{examId}/subjects")
    public List<ExamSubject> getSubjectsByExamId(@PathVariable Long examId) {
        return examService.getSubjectsByExamId(examId);
    }

    @PostMapping("/{examId}/results")
    @ResponseStatus(HttpStatus.CREATED)
    public ExamResult addExamResult(@PathVariable Long examId, @RequestBody ExamResult examResult) {
        examResult.setExamId(examId);
        return examService.addExamResult(examResult);
    }

    @GetMapping("/{examId}/results")
    public List<ExamResult> getResultsByExamId(@PathVariable Long examId) {
        return examService.getResultsByExamId(examId);
    }

    @GetMapping("/{examId}/percentage/{studentId}")
    public double calculatePercentage(@PathVariable Long examId, @PathVariable Long studentId) {
        return examService.calculatePercentage(studentId, examId);
    }

    @GetMapping("/{examId}/grades/{studentId}")
    public String calculateGrade(@PathVariable Long examId, @PathVariable Long studentId) {
        ExamResult result = examResultRepository.findByExam_IdAndStudent_Id(examId, studentId);
        return examService.calculateGrade(result.getMarksObtained(), result.getExam().getTotalMarks());
    }
}
