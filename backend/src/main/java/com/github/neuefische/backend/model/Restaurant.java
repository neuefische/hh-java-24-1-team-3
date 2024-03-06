package com.github.neuefische.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public record Restaurant(
        String id,
        String title,
        String city
) {
}
