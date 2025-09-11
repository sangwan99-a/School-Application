package com.school.student;

import com.school.academic.ClassEntity;
import com.school.dto.StudentDTO;
import java.util.Arrays;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-09-11T16:48:59+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
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
        studentDTO.setId( student.getId() );
        studentDTO.setFirstName( student.getFirstName() );
        studentDTO.setLastName( student.getLastName() );
        studentDTO.setEmail( student.getEmail() );
        studentDTO.setPhoneNumber( student.getPhoneNumber() );
        studentDTO.setAddress( student.getAddress() );
        studentDTO.setFatherName( student.getFatherName() );
        studentDTO.setMotherName( student.getMotherName() );
        studentDTO.setDateOfBirth( student.getDateOfBirth() );
        studentDTO.setGender( student.getGender() );
        studentDTO.setNationality( student.getNationality() );
        studentDTO.setEmergencyContact( student.getEmergencyContact() );
        studentDTO.setGuardianName( student.getGuardianName() );
        studentDTO.setGuardianRelationship( student.getGuardianRelationship() );

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
        student.setId( studentDTO.getId() );
        student.setFirstName( studentDTO.getFirstName() );
        student.setLastName( studentDTO.getLastName() );
        student.setEmail( studentDTO.getEmail() );
        student.setPhoneNumber( studentDTO.getPhoneNumber() );
        student.setAddress( studentDTO.getAddress() );
        student.setFatherName( studentDTO.getFatherName() );
        student.setMotherName( studentDTO.getMotherName() );
        student.setDateOfBirth( studentDTO.getDateOfBirth() );
        student.setGender( studentDTO.getGender() );
        student.setNationality( studentDTO.getNationality() );
        student.setEmergencyContact( studentDTO.getEmergencyContact() );
        student.setGuardianName( studentDTO.getGuardianName() );
        student.setGuardianRelationship( studentDTO.getGuardianRelationship() );

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
        if ( studentDTO.getId() != null ) {
            student.setId( studentDTO.getId() );
        }
        if ( studentDTO.getFirstName() != null ) {
            student.setFirstName( studentDTO.getFirstName() );
        }
        if ( studentDTO.getLastName() != null ) {
            student.setLastName( studentDTO.getLastName() );
        }
        if ( studentDTO.getEmail() != null ) {
            student.setEmail( studentDTO.getEmail() );
        }
        if ( studentDTO.getPhoneNumber() != null ) {
            student.setPhoneNumber( studentDTO.getPhoneNumber() );
        }
        if ( studentDTO.getAddress() != null ) {
            student.setAddress( studentDTO.getAddress() );
        }
        if ( studentDTO.getFatherName() != null ) {
            student.setFatherName( studentDTO.getFatherName() );
        }
        if ( studentDTO.getMotherName() != null ) {
            student.setMotherName( studentDTO.getMotherName() );
        }
        if ( studentDTO.getDateOfBirth() != null ) {
            student.setDateOfBirth( studentDTO.getDateOfBirth() );
        }
        if ( studentDTO.getGender() != null ) {
            student.setGender( studentDTO.getGender() );
        }
        if ( studentDTO.getNationality() != null ) {
            student.setNationality( studentDTO.getNationality() );
        }
        if ( studentDTO.getEmergencyContact() != null ) {
            student.setEmergencyContact( studentDTO.getEmergencyContact() );
        }
        if ( studentDTO.getGuardianName() != null ) {
            student.setGuardianName( studentDTO.getGuardianName() );
        }
        if ( studentDTO.getGuardianRelationship() != null ) {
            student.setGuardianRelationship( studentDTO.getGuardianRelationship() );
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
