package com.github.neuefische.backend.model;
@Document
public record Restaurant(
        String id,
        String title,
        String city
) {
}
