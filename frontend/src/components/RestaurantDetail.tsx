import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Restaurant} from "../types/Restaurant.ts";
import axios from "axios";
import "./RestaurantDetail.css"

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
            <h1>Details:</h1>
            <div className={"RestaurantDetail"}>
                <h2>{restaurant.title}</h2>
                <h3>{restaurant.city}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <button className="HomeButton" onClick={navigateToHome}>Back</button>
        </>
    );
}