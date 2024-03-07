package com.github.neuefische.backend.service;

import com.github.neuefische.backend.model.Restaurant;
import com.github.neuefische.backend.repository.RestaurantRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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

    @Test
    void getRestaurantById_whenCalledWithInvalidId_thenThrowNoSuchElementException(){
        assertThrows(NoSuchElementException.class, () -> {service.getRestaurantById("123");});
    }

    @Test
    void getRestaurantById_whenCalledWithValidId_thenRestaurantWithId(){
        //GIVEN
        Restaurant expected = new Restaurant("1","Okinii", "Cologne" );
        when(repo.findById("1")).thenReturn(Optional.of(expected));

        //WHEN
        Restaurant actual = service.getRestaurantById("1");

        //THEN
        assertEquals(expected,actual);
        verify(repo).findById("1");
    }
}