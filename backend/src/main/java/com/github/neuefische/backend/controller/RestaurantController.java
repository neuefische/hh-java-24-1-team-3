package com.github.neuefische.backend.controller;

import com.github.neuefische.backend.model.AddRestaurantDto;
import com.github.neuefische.backend.model.Restaurant;
import com.github.neuefische.backend.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/restaurants")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService service;

    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        return service.getAllRestaurants();
    }

    @PostMapping
    public Restaurant addRestaurant(@RequestBody AddRestaurantDto restaurant) {
        return service.addRestaurant(restaurant);
    }


    @GetMapping("/{id}")
    public Restaurant getRestaurantById(@PathVariable String id){
        return service.getRestaurantById(id);
    }

    @DeleteMapping("/{id}")
public void deleteRestaurantById(@PathVariable String id){
        service.deleteRestaurantById(id);
    }

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public void handleNoSuchElementException() {
        // This method is empty because it is sufficient to return a 404 status.
    }

}
