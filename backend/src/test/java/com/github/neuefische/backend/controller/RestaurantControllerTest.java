package com.github.neuefische.backend.controller;

import com.github.neuefische.backend.model.Restaurant;
import com.github.neuefische.backend.model.RestaurantAddress;
import com.github.neuefische.backend.repository.RestaurantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class RestaurantControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private RestaurantRepository repo;

    @Test
    void getAllRestaurants_whenCalledInitially_thenReturnEmptyList() throws Exception {
        //Given
        //When&Then
        mvc.perform(MockMvcRequestBuilders.get("/api/restaurants"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void addRestaurant_whenCalledWithRestaurant_thenReturnRestaurant() throws Exception {
        //Given

        //When&Then
        mvc.perform(post("/api/restaurants")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                                "title": "Burger King",
                                        "city": "Hamburg",
                                        "cuisine": "Fast Food",
                                        "address": {
                                            "address": "Reeperbahn",
                                            "number": "7"
                                        }
                                    }                          
                        """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "title": "Burger King",
                            "city": "Hamburg",
                            "cuisine": "Fast Food",
                            "address": {
                                "address": "Reeperbahn",
                                "number": "7"
                            }
                        }
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    void getRestaurantById_whenCalledWithValidId_thenReturnRestaurantWithId() throws Exception{
        //GIVEN
        RestaurantAddress address = new RestaurantAddress("Hohenzollernring", "22");
        Restaurant restaurant = new Restaurant("1", "Okinii", "Cologne", "Sushi", address);
        repo.save(restaurant);

        //WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.get("/api/restaurants/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                                                                           {
                                                                           "id": "1",
                                                                           "title" : "Okinii",
                        "city" : "Cologne",
                         "cuisine" : "Sushi",
                         "address" : {
                             "address" : "Hohenzollernring",
                             "number" : "22"
                             }
                                                                           }
                                                                           """));
    }

    @Test
    void deleteRestaurantById_whenCalledWithValidId_thenStatusIsOk() throws Exception {
        // Given
        String id = "2";
        RestaurantAddress address = new RestaurantAddress("Döppersberg", "50");
        Restaurant restaurant = new Restaurant(id, "7 Paintings", "Wuppertal", "Italian", address);
        repo.save(restaurant);

        // When & Then
        mvc.perform(MockMvcRequestBuilders.delete("/api/restaurants/" + id))
                .andExpect(MockMvcResultMatchers.status().isOk());

        assertFalse(repo.findById(id).isPresent());
    }

    @Test
    void deleteRestaurantById_whenCalledWithInvalidId_thenThrowException() throws Exception {
        // Given
        String invalidId = "123";

        // When & Then
        mvc.perform(MockMvcRequestBuilders.delete("/api/restaurants/" + invalidId))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}