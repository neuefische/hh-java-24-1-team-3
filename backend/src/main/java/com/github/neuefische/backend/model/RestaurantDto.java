package com.github.neuefische.backend.model;

public record RestaurantDto(
        String title,
        String city,
        String cuisine,
        RestaurantAddress address

) {
}
