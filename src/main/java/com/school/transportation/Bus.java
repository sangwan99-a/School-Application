package com.school.transportation;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Bus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String busNumber;
    private int capacity;
    private String driverName;
    private String contact;
    private String status; // "active" or "inactive"

    @OneToOne
    @JoinColumn(name = "route_id")
    private Route route;

    // Add logic to manage bus status
}
