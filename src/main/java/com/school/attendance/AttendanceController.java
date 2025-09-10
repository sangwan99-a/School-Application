
package com.school.attendance;

import com.school.attendance.dto.AttendanceSummaryDTO;
import java.util.Map;
import java.util.HashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    // Dashboard summary endpoint
    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getAttendanceSummary(
        @RequestParam(required = false) Long classId,
        @RequestParam(required = false) String startDate,
        @RequestParam(required = false) String endDate,
        @RequestParam(required = false) String studentName) {
    // Example: summarize attendance for the selected class and date range
    // Replace with real service logic as needed
    LocalDate start = (startDate != null && !startDate.isEmpty()) ? LocalDate.parse(startDate) : null;
    LocalDate end = (endDate != null && !endDate.isEmpty()) ? LocalDate.parse(endDate) : null;
    List<AttendanceEntity> records = attendanceService.filterAttendance(null, classId, start, end);
    int total = records.size();
    int present = (int) records.stream().filter(r -> "Present".equalsIgnoreCase(r.getStatus())).count();
    int absent = (int) records.stream().filter(r -> "Absent".equalsIgnoreCase(r.getStatus())).count();
    int late = (int) records.stream().filter(r -> "Late".equalsIgnoreCase(r.getStatus())).count();
    AttendanceSummaryDTO summary = new AttendanceSummaryDTO(classId, total, present, absent, late);
    Map<String, Object> result = new HashMap<>();
    result.put("summary", List.of(summary));
    result.put("records", records);
    return ResponseEntity.ok(result);
    }

    // Filter endpoint for attendance table (returns ResponseEntity)
    @GetMapping("/filter")
    public ResponseEntity<List<AttendanceEntity>> filterAttendance(
        @RequestParam(required = false) Long studentId,
        @RequestParam(required = false) Long classId,
        @RequestParam(required = false) String startDate,
        @RequestParam(required = false) String endDate) {
    LocalDate start = (startDate != null && !startDate.isEmpty()) ? LocalDate.parse(startDate) : null;
    LocalDate end = (endDate != null && !endDate.isEmpty()) ? LocalDate.parse(endDate) : null;
    List<AttendanceEntity> filtered = attendanceService.filterAttendance(studentId, classId, start, end);
    return ResponseEntity.ok(filtered);
    }

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<AttendanceEntity>> createBulkAttendance(@RequestBody List<AttendanceEntity> attendanceList) {
        List<AttendanceEntity> saved = attendanceService.saveAllAttendance(attendanceList);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/date/{date}")
    public List<AttendanceEntity> getAttendanceByDate(@PathVariable String date) {
        return attendanceService.findAttendanceByDate(LocalDate.parse(date));
    }

    @GetMapping("/student/{studentId}")
    public List<AttendanceEntity> getAttendanceByStudent(@PathVariable Long studentId) {
        return attendanceService.findAttendanceByStudentId(studentId);
    }

    @GetMapping("/class/{classId}")
    public List<AttendanceEntity> getAttendanceByClass(@PathVariable Long classId) {
        return attendanceService.findAttendanceByClassId(classId);
    }

    @PostMapping
    public ResponseEntity<AttendanceEntity> createAttendance(@RequestBody AttendanceEntity attendanceEntity) {
        return ResponseEntity.ok(attendanceService.saveAttendance(attendanceEntity));
    }

    @GetMapping
    public List<AttendanceEntity> getAllAttendanceRecords() {
        return attendanceService.getAllAttendanceRecords();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttendanceEntity> getAttendanceById(@PathVariable Long id) {
        return ResponseEntity.ok(attendanceService.getAttendanceById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AttendanceEntity> updateAttendance(@PathVariable Long id, @RequestBody AttendanceEntity attendanceDetails) {
        return ResponseEntity.ok(attendanceService.updateAttendance(id, attendanceDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttendance(@PathVariable Long id) {
        attendanceService.deleteAttendance(id);
        return ResponseEntity.noContent().build();
    }

    // (Removed duplicate filterAttendance method)

    @GetMapping("/percentage")
    public ResponseEntity<Double> calculateAttendancePercentage(
            @RequestParam String entityType,
            @RequestParam Long entityId,
            @RequestParam String startDate,
            @RequestParam String endDate
    ) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        return ResponseEntity.ok(attendanceService.calculateAttendancePercentage(entityType, entityId, start, end));
    }

    @GetMapping("/reports")
    public List<AttendanceEntity> getAttendanceReport(@RequestParam(required = false) Long studentId,
                                                      @RequestParam(required = false) Long classId,
                                                      @RequestParam String startDate,
                                                      @RequestParam String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        return attendanceService.getAttendanceReport(studentId, classId, start, end);
    }
}
