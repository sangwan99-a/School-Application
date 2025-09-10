package com.school.transportation;

import jakarta.persistence.*;

@Entity
public class StudentRouteAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;

    @ManyToOne
    @JoinColumn(name = "route_id")
    private Route route;

    // Getters and Setters
}
