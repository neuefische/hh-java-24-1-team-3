import {useEffect, useState} from "react";
import {Restaurant} from "../types/Restaurant.ts";
import axios from "axios";
import RestaurantCard from "./RestaurantCard.tsx";

export default function RestaurantOverview() {

    const [restaurants, setRestaurants] = useState<Restaurant[]>([])

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('/api/restaurants')
            .then(response => {
                setRestaurants(response.data);
            })
            .catch(error => {
                console.error('Error fetching Restaurants: ', error);
            });
    }

    return (
        <div>
            {restaurants.map(restaurant => <RestaurantCard key={restaurant.id} restaurant={restaurant}/>)}
        </div>
    );
}

