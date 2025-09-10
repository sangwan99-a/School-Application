package com.school.academic;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.school.student.Student;

@RestController
@RequestMapping("/api/classes")
public class ClassController {
    @GetMapping("/{id}/students")
    public ResponseEntity<List<Student>> getStudentsForClass(@PathVariable Long id) {
        List<Student> students = classService.getStudentsForClass(id);
        return ResponseEntity.ok(students);
    }

    private final ClassService classService;

    public ClassController(ClassService classService) {
        this.classService = classService;
    }

    @GetMapping
    public List<ClassEntity> getAllClasses() {
        return classService.getAllClasses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClassEntity> getClassById(@PathVariable Long id) {
        return ResponseEntity.ok(classService.getClassById(id));
    }

    @PostMapping
    public ResponseEntity<ClassEntity> createClass(@RequestBody ClassEntity classEntity) {
        return ResponseEntity.ok(classService.createClass(classEntity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClassEntity> updateClass(@PathVariable Long id, @RequestBody ClassEntity classDetails) {
        return ResponseEntity.ok(classService.updateClass(id, classDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClass(@PathVariable Long id) {
        classService.deleteClass(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count")
    public long getClassCount() {
        return classService.getClassCount();
    }

    @PutMapping("/{id}/assign-staff")
    public ResponseEntity<ClassEntity> assignStaffToClass(@PathVariable Long id, @RequestBody Long staffId) {
        return ResponseEntity.ok(classService.assignStaffToClass(id, staffId));
    }
}
