package com.school.transportation;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
public class StudentRouteAssignmentController {

    private final StudentRouteAssignmentService studentRouteAssignmentService;

    public StudentRouteAssignmentController(StudentRouteAssignmentService studentRouteAssignmentService) {
        this.studentRouteAssignmentService = studentRouteAssignmentService;
    }

    @GetMapping("/student/{studentId}")
    public List<StudentRouteAssignment> getAssignmentsByStudentId(@PathVariable Long studentId) {
        return studentRouteAssignmentService.getAssignmentsByStudentId(studentId);
    }

    @PostMapping
    public StudentRouteAssignment assignStudentToRoute(@RequestBody StudentRouteAssignment assignment) {
        return studentRouteAssignmentService.assignStudentToRoute(assignment);
    }

    @DeleteMapping("/{id}")
    public void unassignStudentFromRoute(@PathVariable Long id) {
        studentRouteAssignmentService.unassignStudentFromRoute(id);
    }
}
