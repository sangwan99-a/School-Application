package com.school.academic;

import org.springframework.stereotype.Service;
import java.util.List;
import com.school.student.Student;
import com.school.student.StudentRepository;

@Service
public class ClassService {
    // ...existing code...

    private final ClassRepository classRepository;
    private final StudentRepository studentRepository;

    public ClassService(ClassRepository classRepository, StudentRepository studentRepository) {
        this.classRepository = classRepository;
        this.studentRepository = studentRepository;
    }
    public List<Student> getStudentsForClass(Long classId) {
        return studentRepository.findByStudentClassId(classId);
    }

    public List<ClassEntity> getAllClasses() {
        return classRepository.findAll();
    }

    public ClassEntity getClassById(Long id) {
        return classRepository.findById(id).orElseThrow(() -> new RuntimeException("Class not found"));
    }

    public ClassEntity createClass(ClassEntity classEntity) {
        return classRepository.save(classEntity);
    }

    public ClassEntity updateClass(Long id, ClassEntity classDetails) {
        ClassEntity classEntity = getClassById(id);
        classEntity.setName(classDetails.getName());
        classEntity.setSection(classDetails.getSection());
        classEntity.setTeacherInCharge(classDetails.getTeacherInCharge());
        return classRepository.save(classEntity);
    }

    public void deleteClass(Long id) {
        classRepository.deleteById(id);
    }

    public long getClassCount() {
        return classRepository.count();
    }

    public ClassEntity assignStaffToClass(Long classId, Long staffId) {
        ClassEntity classEntity = getClassById(classId);
        classEntity.setTeacherInChargeId(staffId);
        return classRepository.save(classEntity);
    }
}
