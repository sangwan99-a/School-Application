package com.school.news;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/news")
@CrossOrigin
public class NewsController {
    private final NewsService service;
    public NewsController(NewsService service) { this.service = service; }

    @GetMapping
    public List<NewsEntity> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public NewsEntity getById(@PathVariable Long id) { return service.getById(id); }

    @PostMapping
    public NewsEntity create(@RequestBody NewsEntity news) { return service.save(news); }

    @PutMapping("/{id}")
    public NewsEntity update(@PathVariable Long id, @RequestBody NewsEntity news) {
        news.setId(id);
        return service.save(news);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
