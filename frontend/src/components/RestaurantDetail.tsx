import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Restaurant, RestaurantAddress} from "../types/Restaurant.ts";
import axios from "axios";
import "./RestaurantDetail.css"

export default function RestaurantDetail() {
    const params = useParams()
    const [restaurantAddress, setRestaurantAddress] = useState<RestaurantAddress>({address: "", number: ""});
    const [restaurant, setRestaurant] = useState<Restaurant>({
        id: "",
        title: "",
        city: "",
        cuisine: "",
        address: restaurantAddress
    })
    const navigate = useNavigate()

    function navigateToHome(){
        navigate("/")
    }

    function deleteRestaurant(){
        if (window.confirm("Are you sure you want to delete this restaurant?"))
        axios.delete("/api/restaurants/" + params.id)
            .then((response) => {
                console.log(response.data)
                navigate("/")
            })
            .catch((error) => console.log(error.message))
    }

    function fetchRestaurant(){
        axios.get("/api/restaurants/" + params.id)
            .then((response) => {
                setRestaurantAddress(response.data.address);
                setRestaurant(response.data);
            })
            .catch((error) => console.log(error.message))
    }

    useEffect(
        fetchRestaurant,
        [params.id]
    )

    return (
        <div className={"DetailRestaurantPage"}>
            <h1>Details:</h1>
            <div className={"RestaurantDetail"}>
                <h2>{restaurant.title}</h2>
                <h3>{restaurant.city}</h3>
                <h3>{restaurant.cuisine}</h3>
                <h3>{restaurant.address.address}</h3>
            </div>
            <div className={"ButtonWrapper"}>
            <button className="HomeButton" onClick={navigateToHome}>Back</button>
                <button className="DeleteButton" onClick={deleteRestaurant}>Delete</button>
            </div>
        </div>
    );
}