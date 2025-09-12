package com.school.student;

import com.school.academic.ClassEntity;
import com.school.dto.StudentDTO;
import java.util.Arrays;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-09-12T18:40:28+0530",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.43.0.v20250819-1513, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class StudentMapperImpl implements StudentMapper {

    @Override
    public StudentDTO toDTO(Student student) {
        if ( student == null ) {
            return null;
        }

        StudentDTO studentDTO = new StudentDTO();

        studentDTO.setClassId( studentStudentClassId( student ) );
        studentDTO.setClassName( studentStudentClassName( student ) );
        byte[] profilePhoto = student.getProfilePhoto();
        if ( profilePhoto != null ) {
            studentDTO.setProfilePhoto( Arrays.copyOf( profilePhoto, profilePhoto.length ) );
        }
        studentDTO.setProfilePhotoName( student.getProfilePhotoName() );
        studentDTO.setAddress( student.getAddress() );
        studentDTO.setDateOfBirth( student.getDateOfBirth() );
        studentDTO.setEmail( student.getEmail() );
        studentDTO.setEmergencyContact( student.getEmergencyContact() );
        studentDTO.setFatherName( student.getFatherName() );
        studentDTO.setFirstName( student.getFirstName() );
        studentDTO.setGender( student.getGender() );
        studentDTO.setGuardianName( student.getGuardianName() );
        studentDTO.setGuardianRelationship( student.getGuardianRelationship() );
        studentDTO.setId( student.getId() );
        studentDTO.setLastName( student.getLastName() );
        studentDTO.setMotherName( student.getMotherName() );
        studentDTO.setNationality( student.getNationality() );
        studentDTO.setPhoneNumber( student.getPhoneNumber() );

        return studentDTO;
    }

    @Override
    public Student toEntity(StudentDTO studentDTO) {
        if ( studentDTO == null ) {
            return null;
        }

        Student student = new Student();

        student.setStudentClass( studentDTOToClassEntity( studentDTO ) );
        byte[] profilePhoto = studentDTO.getProfilePhoto();
        if ( profilePhoto != null ) {
            student.setProfilePhoto( Arrays.copyOf( profilePhoto, profilePhoto.length ) );
        }
        student.setProfilePhotoName( studentDTO.getProfilePhotoName() );
        student.setAddress( studentDTO.getAddress() );
        student.setDateOfBirth( studentDTO.getDateOfBirth() );
        student.setEmail( studentDTO.getEmail() );
        student.setEmergencyContact( studentDTO.getEmergencyContact() );
        student.setFatherName( studentDTO.getFatherName() );
        student.setFirstName( studentDTO.getFirstName() );
        student.setGender( studentDTO.getGender() );
        student.setGuardianName( studentDTO.getGuardianName() );
        student.setGuardianRelationship( studentDTO.getGuardianRelationship() );
        student.setId( studentDTO.getId() );
        student.setLastName( studentDTO.getLastName() );
        student.setMotherName( studentDTO.getMotherName() );
        student.setNationality( studentDTO.getNationality() );
        student.setPhoneNumber( studentDTO.getPhoneNumber() );

        return student;
    }

    @Override
    public void updateStudentFromDTO(StudentDTO studentDTO, Student student) {
        if ( studentDTO == null ) {
            return;
        }

        if ( student.getStudentClass() == null ) {
            student.setStudentClass( new ClassEntity() );
        }
        studentDTOToClassEntity1( studentDTO, student.getStudentClass() );
        byte[] profilePhoto = studentDTO.getProfilePhoto();
        if ( profilePhoto != null ) {
            student.setProfilePhoto( Arrays.copyOf( profilePhoto, profilePhoto.length ) );
        }
        if ( studentDTO.getProfilePhotoName() != null ) {
            student.setProfilePhotoName( studentDTO.getProfilePhotoName() );
        }
        if ( studentDTO.getAddress() != null ) {
            student.setAddress( studentDTO.getAddress() );
        }
        if ( studentDTO.getDateOfBirth() != null ) {
            student.setDateOfBirth( studentDTO.getDateOfBirth() );
        }
        if ( studentDTO.getEmail() != null ) {
            student.setEmail( studentDTO.getEmail() );
        }
        if ( studentDTO.getEmergencyContact() != null ) {
            student.setEmergencyContact( studentDTO.getEmergencyContact() );
        }
        if ( studentDTO.getFatherName() != null ) {
            student.setFatherName( studentDTO.getFatherName() );
        }
        if ( studentDTO.getFirstName() != null ) {
            student.setFirstName( studentDTO.getFirstName() );
        }
        if ( studentDTO.getGender() != null ) {
            student.setGender( studentDTO.getGender() );
        }
        if ( studentDTO.getGuardianName() != null ) {
            student.setGuardianName( studentDTO.getGuardianName() );
        }
        if ( studentDTO.getGuardianRelationship() != null ) {
            student.setGuardianRelationship( studentDTO.getGuardianRelationship() );
        }
        if ( studentDTO.getId() != null ) {
            student.setId( studentDTO.getId() );
        }
        if ( studentDTO.getLastName() != null ) {
            student.setLastName( studentDTO.getLastName() );
        }
        if ( studentDTO.getMotherName() != null ) {
            student.setMotherName( studentDTO.getMotherName() );
        }
        if ( studentDTO.getNationality() != null ) {
            student.setNationality( studentDTO.getNationality() );
        }
        if ( studentDTO.getPhoneNumber() != null ) {
            student.setPhoneNumber( studentDTO.getPhoneNumber() );
        }
    }

    private Long studentStudentClassId(Student student) {
        if ( student == null ) {
            return null;
        }
        ClassEntity studentClass = student.getStudentClass();
        if ( studentClass == null ) {
            return null;
        }
        Long id = studentClass.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String studentStudentClassName(Student student) {
        if ( student == null ) {
            return null;
        }
        ClassEntity studentClass = student.getStudentClass();
        if ( studentClass == null ) {
            return null;
        }
        String name = studentClass.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }

    protected ClassEntity studentDTOToClassEntity(StudentDTO studentDTO) {
        if ( studentDTO == null ) {
            return null;
        }

        ClassEntity classEntity = new ClassEntity();

        classEntity.setId( studentDTO.getClassId() );
        classEntity.setName( studentDTO.getClassName() );

        return classEntity;
    }

    protected void studentDTOToClassEntity1(StudentDTO studentDTO, ClassEntity mappingTarget) {
        if ( studentDTO == null ) {
            return;
        }

        if ( studentDTO.getClassId() != null ) {
            mappingTarget.setId( studentDTO.getClassId() );
        }
        if ( studentDTO.getClassName() != null ) {
            mappingTarget.setName( studentDTO.getClassName() );
        }
    }
}
