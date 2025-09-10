package com.school.examination;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;


@RestController("examinationGradeController")
@RequestMapping("/api/exam-grades")
public class GradeController {
    private final GradeService gradeService;

    public GradeController(GradeService gradeService) {
        this.gradeService = gradeService;
    }

    @GetMapping
    public List<GradeEntity> getAllGrades() {
        return gradeService.getAllGrades();
    }

    @PostMapping
    public ResponseEntity<GradeEntity> createGrade(@RequestBody GradeEntity grade) {
        GradeEntity createdGrade = gradeService.createGrade(grade);
        return new ResponseEntity<>(createdGrade, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GradeEntity> getGradeById(@PathVariable Long id) {
        GradeEntity grade = gradeService.getGradeById(id);
        return ResponseEntity.ok(grade);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GradeEntity> updateGrade(@PathVariable Long id, @RequestBody GradeEntity gradeDetails) {
        GradeEntity updatedGrade = gradeService.updateGrade(id, gradeDetails);
        return ResponseEntity.ok(updatedGrade);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrade(@PathVariable Long id) {
        gradeService.deleteGrade(id);
        return ResponseEntity.noContent().build();
    }

}
