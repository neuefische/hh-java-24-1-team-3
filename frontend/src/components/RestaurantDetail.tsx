import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Restaurant} from "../types/Restaurant.ts";
import axios from "axios";
import RestaurantCard from "./RestaurantCard.tsx";

export default function RestaurantDetail() {
    const params = useParams()
    const[restaurant, setRestaurant] = useState<Restaurant>({id:"", title:"", city:""})
    const navigate = useNavigate()

    function navigateToHome(){
        navigate("/")
    }

    function fetchRestaurant(){
        axios.get("/api/restaurants/" + params.id)
            .then((response) => setRestaurant(response.data))
            .catch((error) => console.log(error.message))
    }

    useEffect(
        fetchRestaurant,
        []
    )

    return (
        <>
            <RestaurantCard restaurant={restaurant}/>
            <button onClick={navigateToHome}>Back to home</button>
        </>
    );
}