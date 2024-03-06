package com.github.neuefische.backend.controller;

import com.github.neuefische.backend.repository.RestaurantRepository;
import com.github.neuefische.backend.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/restaurant")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService service;



}
