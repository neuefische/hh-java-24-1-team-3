package com.github.neuefische.backend.controller;

import com.github.neuefische.backend.model.Restaurant;
import com.github.neuefische.backend.repository.RestaurantRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;

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
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[]"));
    }

    @Test
    void getRestaurantById_whenCalledWithValidId_thenReturnRestaurantWithId() throws Exception{
        //GIVEN
        repo.save(new Restaurant("1","Okinii", "Cologne" ));

        //WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.get("/api/restaurants/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                                                                           {
                                                                           "id": "1",
                                                                           "title" : "Okinii",
                                                                           "city" : "Cologne"
                                                                           }
                                                                           """));
    }

}