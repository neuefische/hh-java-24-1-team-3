package com.github.neuefische.backend.service;

import com.github.neuefische.backend.model.AddRestaurantDto;
import com.github.neuefische.backend.model.Restaurant;
import com.github.neuefische.backend.model.RestaurantAddress;
import com.github.neuefische.backend.repository.RestaurantRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
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
    void addRestaurant_whenCalledWithRestaurant_ThenReturnRestaurant() {
        //Given
        RestaurantAddress address = new RestaurantAddress("Reeperbahn", "7");
        AddRestaurantDto restaurant = new AddRestaurantDto("Burger King", "Hamburg", "Fast Food", address);
        Restaurant restaurantToSave = new Restaurant("Test-1", "Burger King", "Hamburg", "Fast Food", address);

        when(repo.save(any(Restaurant.class))).thenReturn(restaurantToSave);

        //When
        Restaurant actual = service.addRestaurant(restaurant);

        //Then
        verify(repo).save(any(Restaurant.class));
        assertEquals(restaurantToSave, actual);

    }


    @Test
    void getRestaurantById_whenCalledWithInvalidId_thenThrowNoSuchElementException(){
        assertThrows(NoSuchElementException.class, () -> {service.getRestaurantById("123");});
    }

    @Test
    void getRestaurantById_whenCalledWithValidId_thenRestaurantWithId(){
        //GIVEN
        Restaurant expected = new Restaurant("1", "Okinii", "Cologne", "Sushi", new RestaurantAddress("Hohenzollernring", "60"));
        when(repo.findById("1")).thenReturn(Optional.of(expected));

        //WHEN
        Restaurant actual = service.getRestaurantById("1");

        //THEN
        verify(repo).findById("1");
        assertEquals(expected,actual);
    }

    @Test
    void deleteRestaurantByID_whenCalledWithValidId_thenDeleteRestaurant(){
        //GIVEN
        String id = "2";
        Restaurant expected = new Restaurant(id, "7 Paintings", "Wuppertal", "Italian", new RestaurantAddress("Hofaue", "51"));
        when(repo.findById(id)).thenReturn(Optional.of(expected));

        //WHEN
        service.deleteRestaurantById(id);

        //THEN
        verify(repo).delete(expected);
    }

    @Test
    void deleteRestaurantByID_whenCalledWithInvalidId_thenThrowNoSuchElementException() {
        assertThrows(NoSuchElementException.class, () -> {service.deleteRestaurantById("123");});
    }
}