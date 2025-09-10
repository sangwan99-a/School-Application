package com.school.attendance;

import org.springframework.stereotype.Service;
import java.util.List;
import java.time.LocalDate;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    public AttendanceService(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    public AttendanceEntity saveAttendance(AttendanceEntity attendanceEntity) {
        return attendanceRepository.save(attendanceEntity);
    }

    public List<AttendanceEntity> findAttendanceByDate(LocalDate date) {
        return attendanceRepository.findByDate(date);
    }

    public List<AttendanceEntity> findAttendanceByStudentId(Long studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }

    public List<AttendanceEntity> findAttendanceByClassId(Long classId) {
        return attendanceRepository.findByClassId(classId);
    }

    public List<AttendanceEntity> filterAttendance(Long studentId, Long classId, LocalDate startDate, LocalDate endDate) {
        return attendanceRepository.filterAttendance(studentId, classId, startDate, endDate);
    }

    public List<AttendanceEntity> saveAllAttendance(List<AttendanceEntity> attendanceList) {
        return attendanceRepository.saveAll(attendanceList);
    }

    public List<AttendanceEntity> getAllAttendanceRecords() {
        return attendanceRepository.findAll();
    }

    public AttendanceEntity getAttendanceById(Long id) {
        return attendanceRepository.findById(id).orElseThrow(() -> new RuntimeException("Attendance record not found"));
    }

    public AttendanceEntity updateAttendance(Long id, AttendanceEntity attendanceDetails) {
        AttendanceEntity attendance = attendanceRepository.findById(id).orElseThrow(() -> new RuntimeException("Attendance record not found"));
        attendance.setDate(attendanceDetails.getDate());
        attendance.setStudentId(attendanceDetails.getStudentId());
        attendance.setClassId(attendanceDetails.getClassId());
        attendance.setStatus(attendanceDetails.getStatus());
        return attendanceRepository.save(attendance);
    }

    public void deleteAttendance(Long id) {
        attendanceRepository.deleteById(id);
    }

    public double calculateAttendancePercentage(String entityType, Long entityId, LocalDate startDate, LocalDate endDate) {
        // Placeholder logic for calculating attendance percentage
        return 0.0;
    }

    public List<AttendanceEntity> getAttendanceReport(Long studentId, Long classId, LocalDate startDate, LocalDate endDate) {
        // Placeholder logic for generating attendance report
        return attendanceRepository.filterAttendance(studentId, classId, startDate, endDate);
    }
}
