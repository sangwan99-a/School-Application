    // ...existing code...
package com.school.admission;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "admissions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdmissionEntity {
    private String motherName;
    private String nationality;
    private String guardianName;
    private String guardianRelationship;
    private String guardianNumber;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Student Info
    @Column(nullable = false)
    private String firstName;
    @Column(nullable = false)
    private String lastName;
    @Column(nullable = false)
    private String dob;
    @Column(nullable = false)
    private String gender;
    @Column(nullable = false)
    private String classApplied;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private String phone;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String parentName;
    @Column(nullable = false)
    private String parentPhone;
    @Column(nullable = false)
    private String parentEmail;

    // Document Uploads
    @Lob
    private byte[] marksheet;
    private String marksheetName;
    @Lob
    private byte[] aadhaar;
    private String aadhaarName;
    @Lob
    private byte[] birthCertificate;
    private String birthCertificateName;
    @Lob
    private byte[] studentPhoto;
    private String studentPhotoName;
    @Lob
    private byte[] parentsId;
    private String parentsIdName;
    @Lob
    private byte[] transferCertificate;
    private String transferCertificateName;

    // Status: PENDING, APPROVED, REJECTED
    @Column(nullable = false)
    private String status = "PENDING";
}
