package com.github.neuefische.backend.model;

public record AddRestaurantDto(
        String title,
        String city,
        String cuisine,
        RestaurantAddress address

) {
}
