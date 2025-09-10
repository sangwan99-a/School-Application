package com.school.events;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;

    public Event save(Event event) {
        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getEventsByDate(java.time.LocalDate date) {
        return eventRepository.findByDate(date);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}
