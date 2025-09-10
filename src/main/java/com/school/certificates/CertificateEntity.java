package com.school.certificates;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class CertificateEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long studentId;
    private String certificateType;
    private LocalDate issueDate;
    private String description;
    private String digitalSignature;
}
