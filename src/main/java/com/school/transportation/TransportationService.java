package com.school.transportation;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TransportationService {

    private final BusRepository busRepository;
    private final RouteRepository routeRepository;

    public TransportationService(BusRepository busRepository, RouteRepository routeRepository) {
        this.busRepository = busRepository;
        this.routeRepository = routeRepository;
    }

    // CRUD operations for buses
    public Bus addBus(Bus bus) {
        return busRepository.save(bus);
    }

    public List<Bus> getAllBuses() {
        return busRepository.findAll();
    }

    public Bus updateBus(Long id, Bus busDetails) {
        Bus bus = busRepository.findById(id).orElseThrow(() -> new RuntimeException("Bus not found"));
        bus.setBusNumber(busDetails.getBusNumber());
        bus.setCapacity(busDetails.getCapacity());
        bus.setDriverName(busDetails.getDriverName());
        bus.setContact(busDetails.getContact());
        bus.setRoute(busDetails.getRoute());
        return busRepository.save(bus);
    }

    public void deleteBus(Long id) {
        busRepository.deleteById(id);
    }

    // CRUD operations for routes
    public Route addRoute(Route route) {
        return routeRepository.save(route);
    }

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Route updateRoute(Long id, Route routeDetails) {
        Route route = routeRepository.findById(id).orElseThrow(() -> new RuntimeException("Route not found"));
        route.setPickupPoints(routeDetails.getPickupPoints());
        route.setDropPoints(routeDetails.getDropPoints());
        route.setTimings(routeDetails.getTimings());
        return routeRepository.save(route);
    }

    public void deleteRoute(Long id) {
        routeRepository.deleteById(id);
    }
}
