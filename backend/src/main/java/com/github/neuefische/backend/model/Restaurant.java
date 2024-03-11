package com.github.neuefische.backend.model;

import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

@With
@Document("restaurants")
public record Restaurant(
        String id,
        String title,
        String city,
        String cuisine,
        RestaurantAddress address
) {
}
