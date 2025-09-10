package com.school.finance;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class FeesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;
    // Add other fields as needed (e.g., studentId, dueDate, etc.)
}
