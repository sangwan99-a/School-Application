package com.school.examination;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exam-assignments")
public class ExamAssignmentController {

    private final ExamAssignmentService examAssignmentService;

    public ExamAssignmentController(ExamAssignmentService examAssignmentService) {
        this.examAssignmentService = examAssignmentService;
    }

    @GetMapping("/class/{className}")
    public List<ExamAssignment> getAssignmentsByClass(@PathVariable String className) {
        return examAssignmentService.getAssignmentsByClass(className);
    }

    @PostMapping
    public ExamAssignment saveExamAssignment(@RequestBody ExamAssignment examAssignment) {
        return examAssignmentService.saveExamAssignment(examAssignment);
    }

    @DeleteMapping("/{id}")
    public void deleteExamAssignment(@PathVariable Long id) {
        examAssignmentService.deleteExamAssignment(id);
    }
}
