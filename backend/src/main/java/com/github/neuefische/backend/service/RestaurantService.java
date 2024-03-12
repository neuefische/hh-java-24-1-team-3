package com.github.neuefische.backend.service;

import com.github.neuefische.backend.model.Restaurant;
import com.github.neuefische.backend.model.RestaurantDto;
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

    public Restaurant addRestaurant(RestaurantDto restaurant) {

        Restaurant restaurantToSave = new Restaurant(null, restaurant.title(), restaurant.city(), restaurant.cuisine(), restaurant.address());

        return repo.save(restaurantToSave);

    }

    public Restaurant getRestaurantById(String id) {
        return repo.findById(id).orElseThrow(() -> new NoSuchElementException("Element with Id: " + id +" not found"));
    }

    public void deleteRestaurantById(String id) {
        Restaurant restaurant = getRestaurantById(id);
       repo.delete(restaurant);
    }

    public Restaurant editRestaurantById(String id, RestaurantDto restaurantDto) {
        Restaurant restaurantToUpdate = getRestaurantById(id);
        return repo.save(restaurantToUpdate
                .withCity(restaurantDto.city())
                .withTitle(restaurantDto.title())
                .withCuisine(restaurantDto.cuisine())
                .withAddress(restaurantDto.address()));
    }
}
