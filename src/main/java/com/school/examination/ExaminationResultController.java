// ...existing code...
package com.school.examination;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("examinationResultControllerV2")
@RequestMapping("/api/exam-results")
public class ExaminationResultController {

    @Autowired
    private ExaminationResultService examinationResultService;

    @GetMapping
    public List<ResultEntity> getAllResults() {
        return examinationResultService.getAllResults();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResultEntity> getResultById(@PathVariable Long id) {
        return ResponseEntity.ok(examinationResultService.getResultById(id));
    }

    @PostMapping
    public ResponseEntity<ResultEntity> createResult(@RequestBody ResultEntity resultEntity) {
        return ResponseEntity.ok(examinationResultService.createResult(resultEntity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResultEntity> updateResult(@PathVariable Long id, @RequestBody ResultEntity resultEntity) {
        return ResponseEntity.ok(examinationResultService.updateResult(id, resultEntity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResult(@PathVariable Long id) {
        examinationResultService.deleteResult(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/student/{studentId}")
    public List<ResultEntity> getResultsByStudent(@PathVariable Long studentId) {
        return examinationResultService.getResultsByStudentId(studentId);
    }

    @GetMapping("/class/{classId}")
    public List<ResultEntity> getResultsByClass(@PathVariable Long classId) {
        return examinationResultService.getResultsByClassId(classId);
    }

    @GetMapping("/exam/{examId}")
    public List<ResultEntity> getResultsByExam(@PathVariable Long examId) {
        return examinationResultService.getResultsByExamId(examId);
    }

    @GetMapping("/student/{studentId}/summary")
    public ResponseEntity<String> getStudentPerformanceSummary(@PathVariable Long studentId) {
        return ResponseEntity.ok("Summary feature is not implemented.");
    }
}
