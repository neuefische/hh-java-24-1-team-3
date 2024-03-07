package com.github.neuefische.backend.service;

import com.github.neuefische.backend.model.Restaurant;
import com.github.neuefische.backend.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository repo;

    public List<Restaurant> getAllRestaurants() {
        return repo.findAll();
    }

    public Restaurant getRestaurantById(String id) {
        return repo.findById(id).orElseThrow(() -> new NoSuchElementException("Element with Id: " + id +" not found"));
    }
}
