package com.school.student;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "student")
@Data
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // Removed admissionNo field

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private String address;

    private String fatherName;

    private String motherName;

    private java.time.LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String nationality;

    private String emergencyContact;

    private String guardianName;

    private String guardianRelationship;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private com.school.academic.ClassEntity studentClass;

    @Lob
    private byte[] profilePhoto;
    private String profilePhotoName;

    public Student() {
        // Default constructor needed by JPA
    }
    
    public Student(Long id) {
        this.id = id;
    }
}
