package com.school.academic;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;

@RestController
@RequestMapping("/api/timetables")
public class AcademicTimetableController {
    private final AcademicTimetableService timetableService;

    public AcademicTimetableController(AcademicTimetableService timetableService) {
        this.timetableService = timetableService;
    }

    @GetMapping
    public List<AcademicTimetableEntity> getAllTimetables() {
        return timetableService.getAllTimetables();
    }

    @PostMapping
    public ResponseEntity<AcademicTimetableEntity> createTimetable(@RequestBody AcademicTimetableEntity timetable) {
        AcademicTimetableEntity createdTimetable = timetableService.createTimetable(timetable);
        return new ResponseEntity<>(createdTimetable, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AcademicTimetableEntity> getTimetableById(@PathVariable Long id) {
        AcademicTimetableEntity timetable = timetableService.getTimetableById(id);
        return ResponseEntity.ok(timetable);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTimetable(@PathVariable Long id) {
        timetableService.deleteTimetable(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<AcademicTimetableEntity> updateTimetable(@PathVariable Long id, @RequestBody AcademicTimetableEntity timetableDetails) {
        AcademicTimetableEntity updatedTimetable = timetableService.updateTimetable(id, timetableDetails);
        return ResponseEntity.ok(updatedTimetable);
    }

    @GetMapping("/class/{classId}")
    public List<AcademicTimetableEntity> getTimetableForClass(@PathVariable Long classId) {
        return timetableService.getTimetableForClass(classId);
    }
}