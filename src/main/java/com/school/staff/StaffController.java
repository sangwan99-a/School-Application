package com.school.staff;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

    private final StaffService staffService;

    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    @GetMapping
    public List<StaffEntity> getAllStaff() {
        return staffService.getAllStaff();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StaffEntity> getStaffById(@PathVariable Long id) {
        return ResponseEntity.ok(staffService.getStaffById(id));
    }

    @PostMapping
    public ResponseEntity<StaffEntity> createStaff(@RequestBody StaffEntity staffEntity) {
        return ResponseEntity.ok(staffService.createStaff(staffEntity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StaffEntity> updateStaff(@PathVariable Long id, @RequestBody StaffEntity staffDetails) {
        return ResponseEntity.ok(staffService.updateStaff(id, staffDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStaff(@PathVariable Long id) {
        staffService.deleteStaff(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count")
    public long getStaffCount() {
        return staffService.getStaffCount();
    }

    @PutMapping("/{id}/specialization")
    public ResponseEntity<StaffEntity> updateSubjectSpecialization(@PathVariable Long id, @RequestBody String specialization) {
        return ResponseEntity.ok(staffService.updateSubjectSpecialization(id, specialization));
    }
}
