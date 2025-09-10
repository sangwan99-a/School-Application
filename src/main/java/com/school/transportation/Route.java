package com.school.transportation;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pickupPoints;
    private String dropPoints;
    private String timings;
    private String routeName; // Name of the route

    @OneToMany(mappedBy = "route")
    private List<Bus> buses;
}
