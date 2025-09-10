package com.school.homework;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/homework")
@CrossOrigin
public class HomeworkController {
    private final HomeworkService service;
    public HomeworkController(HomeworkService service) { this.service = service; }

    @GetMapping
    public List<HomeworkEntity> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public HomeworkEntity getById(@PathVariable Long id) { return service.getById(id); }

    @PostMapping
    public HomeworkEntity create(@RequestBody HomeworkEntity hw) { return service.save(hw); }

    @PutMapping("/{id}")
    public HomeworkEntity update(@PathVariable Long id, @RequestBody HomeworkEntity hw) {
        hw.setId(id);
        return service.save(hw);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
