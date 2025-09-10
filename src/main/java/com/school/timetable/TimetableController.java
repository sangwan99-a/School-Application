package com.school.timetable;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/timetable")
@CrossOrigin
public class TimetableController {
    private final TimetableService service;
    public TimetableController(TimetableService service) { this.service = service; }

    @GetMapping
    public List<TimetableEntity> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public TimetableEntity getById(@PathVariable Long id) { return service.getById(id); }

    @PostMapping
    public TimetableEntity create(@RequestBody TimetableEntity tt) { return service.save(tt); }

    @PutMapping("/{id}")
    public TimetableEntity update(@PathVariable Long id, @RequestBody TimetableEntity tt) {
        tt.setId(id);
        return service.save(tt);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
