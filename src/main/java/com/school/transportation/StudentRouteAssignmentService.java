package com.school.transportation;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentRouteAssignmentService {

    private final StudentRouteAssignmentRepository studentRouteAssignmentRepository;

    public StudentRouteAssignmentService(StudentRouteAssignmentRepository studentRouteAssignmentRepository) {
        this.studentRouteAssignmentRepository = studentRouteAssignmentRepository;
    }

    public List<StudentRouteAssignment> getAssignmentsByStudentId(Long studentId) {
        return studentRouteAssignmentRepository.findAll();
    }

    public StudentRouteAssignment assignStudentToRoute(StudentRouteAssignment assignment) {
        return studentRouteAssignmentRepository.save(assignment);
    }

    public void unassignStudentFromRoute(Long id) {
        studentRouteAssignmentRepository.deleteById(id);
    }
}
