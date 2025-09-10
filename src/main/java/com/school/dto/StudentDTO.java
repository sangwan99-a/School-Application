package com.school.dto;

import lombok.Data;
import java.time.LocalDate;
import com.school.student.Gender;

@Data
public class StudentDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;
    private String fatherName;
    private String motherName;
    private LocalDate dateOfBirth;
    private Gender gender;
    private String nationality;
    private String emergencyContact;
    private String guardianName;
    private String guardianRelationship;
    private Long classId;
    private String className;  // Added to show class name in responses

    private byte[] profilePhoto;
    private String profilePhotoName;
}
