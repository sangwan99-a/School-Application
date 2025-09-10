package com.school.admission;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import com.school.dto.StudentDTO;
import com.school.student.StudentService;
import com.school.student.Gender;
import org.springframework.beans.factory.annotation.Autowired;
import com.school.academic.ClassRepository;
import com.school.academic.ClassEntity;
import java.time.LocalDate;

@Service
public class AdmissionService {

    private final AdmissionRepository admissionRepository;
    private final StudentService studentService;
    private final ClassRepository classRepository;

    @Autowired
    public AdmissionService(AdmissionRepository admissionRepository, StudentService studentService, ClassRepository classRepository) {
        this.admissionRepository = admissionRepository;
        this.studentService = studentService;
        this.classRepository = classRepository;
    }
    @Transactional
    public boolean approveAdmission(Long id, Long classId) {
        AdmissionEntity admission = admissionRepository.findById(id).orElse(null);
        if (admission == null) {
            System.err.println("Admission not found for id: " + id);
            return false;
        }
        if (!"PENDING".equals(admission.getStatus())) {
            System.err.println("Admission status is not PENDING for id: " + id + ", status: " + admission.getStatus());
            return false;
        }
        try {
            // Map AdmissionEntity to StudentDTO (all available fields)
            StudentDTO dto = new StudentDTO();
            dto.setFirstName(admission.getFirstName());
            dto.setLastName(admission.getLastName());
            dto.setEmail(admission.getEmail());
            dto.setPhoneNumber(admission.getPhone());
            dto.setAddress(admission.getAddress());
            dto.setFatherName(admission.getParentName());
            dto.setMotherName(admission.getMotherName());
            dto.setDateOfBirth(LocalDate.parse(admission.getDob()));
            dto.setGender(Gender.valueOf(admission.getGender().toUpperCase()));
            dto.setNationality(admission.getNationality());
            dto.setEmergencyContact(""); // Not collected in admission form
            dto.setGuardianName(admission.getGuardianName());
            dto.setGuardianRelationship(admission.getGuardianRelationship());

            // Admission number logic removed
            // Assign class by ID
            ClassEntity classEntity = classRepository.findById(classId).orElse(null);
            if (classEntity != null) {
                dto.setClassId(classEntity.getId());
                dto.setClassName(classEntity.getName());
            } else {
                throw new RuntimeException("Class not found for id: " + classId);
            }

            // Copy student photo
            dto.setProfilePhoto(admission.getStudentPhoto());
            dto.setProfilePhotoName(admission.getStudentPhotoName());

            studentService.createStudent(dto);
            admission.setStatus("APPROVED");
            admissionRepository.save(admission);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Exception while approving admission for id " + id + ": " + e.getMessage());
            return false;
        }
    }

    public List<AdmissionEntity> getAllAdmissions() {
        return admissionRepository.findAll();
    }

    public AdmissionEntity createAdmission(AdmissionEntity admission) {
        return admissionRepository.save(admission);
    }

    public AdmissionEntity getAdmissionById(Long id) {
        return admissionRepository.findById(id).orElseThrow(() -> new RuntimeException("Admission not found"));
    }

    public void deleteAdmission(Long id) {
        admissionRepository.deleteById(id);
    }
}
