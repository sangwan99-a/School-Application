package com.school.timetable;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TimetableService {
    private final TimetableRepository repository;
    public TimetableService(TimetableRepository repository) {
        this.repository = repository;
    }
    public List<TimetableEntity> getAll() { return repository.findAll(); }
    public TimetableEntity getById(Long id) { return repository.findById(id).orElse(null); }
    public TimetableEntity save(TimetableEntity tt) { return repository.save(tt); }
    public void delete(Long id) { repository.deleteById(id); }
}
