package com.school.examination;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exam-subjects")
public class ExamSubjectController {

    private final ExamSubjectService examSubjectService;

    public ExamSubjectController(ExamSubjectService examSubjectService) {
        this.examSubjectService = examSubjectService;
    }

    @GetMapping("/exam/{examId}")
    public List<ExamSubject> getSubjectsByExamId(@PathVariable Long examId) {
        return examSubjectService.getSubjectsByExamId(examId);
    }

    @PostMapping
    public ExamSubject saveExamSubject(@RequestBody ExamSubject examSubject) {
        return examSubjectService.saveExamSubject(examSubject);
    }

    @DeleteMapping("/{id}")
    public void deleteExamSubject(@PathVariable Long id) {
        examSubjectService.deleteExamSubject(id);
    }
}
