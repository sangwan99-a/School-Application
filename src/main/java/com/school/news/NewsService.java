package com.school.news;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NewsService {
    private final NewsRepository repository;
    public NewsService(NewsRepository repository) {
        this.repository = repository;
    }
    public List<NewsEntity> getAll() { return repository.findAll(); }
    public NewsEntity getById(Long id) { return repository.findById(id).orElse(null); }
    public NewsEntity save(NewsEntity news) { return repository.save(news); }
    public void delete(Long id) { repository.deleteById(id); }
}
