package com.school.examination;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exam-results-v2")
public class ExamResultController {

    private final ExamResultService examResultService;

    public ExamResultController(ExamResultService examResultService) {
        this.examResultService = examResultService;
    }

    @GetMapping("/student/{studentId}")
    public List<ExamResult> getResultsByStudentId(@PathVariable Long studentId) {
        return examResultService.getResultsByStudentId(studentId);
    }

    @PostMapping
    public ExamResult saveExamResult(@RequestBody ExamResult examResult) {
        return examResultService.saveExamResult(examResult);
    }

    @DeleteMapping("/{id}")
    public void deleteExamResult(@PathVariable Long id) {
        examResultService.deleteExamResult(id);
    }
}
