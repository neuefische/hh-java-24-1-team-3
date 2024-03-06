package com.github.neuefische.backend.service;

import com.github.neuefische.backend.model.Restaurant;
import com.github.neuefische.backend.repository.RestaurantRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RestaurantServiceTest {

    private final RestaurantRepository repo = mock(RestaurantRepository.class);
    private RestaurantService service = new RestaurantService(repo);

    @Test
    void getAllRestaurants_whenCalledInitially_ThenReturnEmptyList() {
        //Given
        List<Restaurant> expected = new ArrayList<>();
        when(repo.findAll()).thenReturn(new ArrayList<>());
        //When
        List<Restaurant> actual = service.getAllRestaurants();
        //Then
        assertEquals(expected, actual);
        verify(repo).findAll();
    }
}