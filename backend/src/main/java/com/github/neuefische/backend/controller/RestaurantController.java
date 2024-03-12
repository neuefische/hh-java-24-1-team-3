package com.github.neuefische.backend.controller;

import com.github.neuefische.backend.model.Restaurant;
import com.github.neuefische.backend.model.RestaurantDto;
import com.github.neuefische.backend.service.RestaurantService;
import lombok.RequiredArgsConstructor;
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
    public Restaurant addRestaurant(@RequestBody RestaurantDto restaurant) {
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

    @PutMapping("/{id}")
    public Restaurant editRestaurantById(@PathVariable String id, @RequestBody RestaurantDto restaurant) {
        return service.editRestaurantById(id, restaurant);
    }

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleNoSuchElementException(NoSuchElementException e) {
        return e.getMessage();
    }

}
