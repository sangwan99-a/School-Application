package com.school.gradebook;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("gradebookGradeController")
@RequestMapping("/api/grades")
public class GradeController {

    private final GradeService gradeService;

    public GradeController(GradeService gradeService) {
        this.gradeService = gradeService;
    }

    @GetMapping("/student/{studentId}")
    public List<Grade> getGradesByStudentId(@PathVariable Long studentId) {
        return gradeService.getGradesByStudentId(studentId);
    }

    @PostMapping
    public Grade saveGrade(@RequestBody Grade grade) {
        return gradeService.saveGrade(grade);
    }

    @GetMapping("/student/{studentId}/gpa")
    public double calculateGPA(@PathVariable Long studentId) {
        return gradeService.calculateGPA(studentId);
    }
}
