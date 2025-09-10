package com.school.student;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
	java.util.List<Student> findByStudentClassId(Long classId);
	// Removed admissionNo related query method
}
