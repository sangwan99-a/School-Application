// ...existing code removed...
package com.school.finance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/fees")
public class FeesController {
    // Removed getLatestFeeByAdmissionNo endpoint and admissionNo logic
    // Endpoint for pending fees count
    @GetMapping("/calculations/pending")
    public ResponseEntity<Map<String, Object>> getPendingFees() {
        List<FeeEntity> allFees = feeService.getAllFees();
        long count = allFees.stream().filter(f -> !Boolean.TRUE.equals(f.getIsPaid())).count();
        Map<String, Object> result = new HashMap<>();
        result.put("count", count);
        return ResponseEntity.ok(result);
    }

    // Endpoint for overdue fees list
    @GetMapping("/calculations/overdue")
    public ResponseEntity<List<FeeEntity>> getOverdueFees() {
        List<FeeEntity> allFees = feeService.getAllFees();
        List<FeeEntity> overdue = allFees.stream()
            .filter(f -> !Boolean.TRUE.equals(f.getIsPaid()) && isOverdue(f.getDueDate()))
            .toList();
        return ResponseEntity.ok(overdue);
    }

    // Helper method to check overdue
    private boolean isOverdue(String dueDate) {
        if (dueDate == null || dueDate.isEmpty()) return false;
        try {
            LocalDate due = LocalDate.parse(dueDate);
            return LocalDate.now().isAfter(due);
        } catch (Exception e) {
            return false;
        }
    }

    @Autowired
    private FeeService feeService;

        // Endpoint for frontend compatibility
        @GetMapping("/collected")
        public ResponseEntity<Double> getCollectedFees() {
            return ResponseEntity.ok(feeService.getTotalFeesCollected());
        }


    @GetMapping
    public List<FeeEntity> getAllFees() {
        return feeService.getAllFees();
    }


    @GetMapping("/{id}")
    public ResponseEntity<FeeEntity> getFeeById(@PathVariable Long id) {
        return ResponseEntity.ok(feeService.getFeeById(id));
    }


    @PostMapping
    public ResponseEntity<FeeEntity> createFee(@RequestBody FeeEntity feeEntity) {
        return ResponseEntity.ok(feeService.createFee(feeEntity));
    }


    @PutMapping("/{id}")
    public ResponseEntity<FeeEntity> updateFee(@PathVariable Long id, @RequestBody FeeEntity feeEntity) {
        return ResponseEntity.ok(feeService.updateFee(id, feeEntity));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFee(@PathVariable Long id) {
        feeService.deleteFee(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/calculations/total-collected")
    public ResponseEntity<Double> getTotalFeesCollected() {
        return ResponseEntity.ok(feeService.getTotalFeesCollected());
    }
}
