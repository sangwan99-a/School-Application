package com.school.finance;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "fee_entity")
@Data
public class FeeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentName;
    // Removed admissionNo field

    private String grade;

    private Double amount;

    private String dueDate;

    private Boolean isPaid;
}
