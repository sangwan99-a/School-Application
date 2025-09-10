package com.school.homework;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HomeworkService {
    private final HomeworkRepository repository;
    public HomeworkService(HomeworkRepository repository) {
        this.repository = repository;
    }
    public List<HomeworkEntity> getAll() { return repository.findAll(); }
    public HomeworkEntity getById(Long id) { return repository.findById(id).orElse(null); }
    public HomeworkEntity save(HomeworkEntity hw) { return repository.save(hw); }
    public void delete(Long id) { repository.deleteById(id); }
}
