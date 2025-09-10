package com.school.attendance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<AttendanceEntity, Long> {
    @Query("SELECT a FROM AttendanceEntity a WHERE (:studentId IS NULL OR a.studentId = :studentId) AND (:classId IS NULL OR a.classId = :classId) AND (:startDate IS NULL OR a.date >= :startDate) AND (:endDate IS NULL OR a.date <= :endDate)")
    List<AttendanceEntity> filterAttendance(@Param("studentId") Long studentId, @Param("classId") Long classId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    List<AttendanceEntity> findByStudentIdAndClassIdAndDateBetween(Long studentId, Long classId, LocalDate startDate, LocalDate endDate);

    List<AttendanceEntity> findByDate(LocalDate date);

    List<AttendanceEntity> findByStudentId(Long studentId);

    List<AttendanceEntity> findByClassId(Long classId);
}
