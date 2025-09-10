package com.school.academic;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AcademicTimetableService {
    private final AcademicTimetableRepository timetableRepository;

    public AcademicTimetableService(AcademicTimetableRepository timetableRepository) {
        this.timetableRepository = timetableRepository;
    }

    public List<AcademicTimetableEntity> getAllTimetables() {
        return timetableRepository.findAll();
    }

    public AcademicTimetableEntity createTimetable(AcademicTimetableEntity timetable) {
        return timetableRepository.save(timetable);
    }

    public AcademicTimetableEntity getTimetableById(Long id) {
        return timetableRepository.findById(id).orElseThrow(() -> new RuntimeException("Timetable not found"));
    }

    public void deleteTimetable(Long id) {
        timetableRepository.deleteById(id);
    }

    public AcademicTimetableEntity updateTimetable(Long id, AcademicTimetableEntity timetableDetails) {
        AcademicTimetableEntity timetable = timetableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Timetable not found"));
        timetable.setClassId(timetableDetails.getClassId());
        timetable.setSubjectName(timetableDetails.getSubjectName());
        timetable.setTeacherId(timetableDetails.getTeacherId());
        timetable.setDayOfWeek(timetableDetails.getDayOfWeek());
        timetable.setStartTime(timetableDetails.getStartTime());
        timetable.setEndTime(timetableDetails.getEndTime());
        return timetableRepository.save(timetable);
    }

    public List<AcademicTimetableEntity> getTimetableForClass(Long classId) {
        return timetableRepository.findByClassId(classId);
    }
}
