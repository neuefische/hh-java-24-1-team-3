import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Restaurant, RestaurantAddress} from "../types/Restaurant.ts";
import axios from "axios";
import "./RestaurantDetail.css"

type RestaurantDetailProps = {
    saveNewRestaurant: React.Dispatch<React.SetStateAction<Restaurant[]>>,
    restaurants: Restaurant[]
}

type Input = {
    title: string,
    city: string,
    cuisine: string,
    address: RestaurantAddress
}

const initialFormValue = {title: "", city: "", cuisine: "", address: {address: "", number: ""}}

export default function RestaurantDetail(props: Readonly<RestaurantDetailProps>) {
    const params = useParams()
    const [restaurantAddress, setRestaurantAddress] = useState<RestaurantAddress>({address: "", number: ""});
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [formData, setFormData] = useState<Input>(initialFormValue)
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

    function handleEdit() {
        setIsEditable(true)
        setFormData({
            title: restaurant.title,
            city: restaurant.city,
            cuisine: restaurant.cuisine,
            address: restaurant.address
        })
    }

    function handleCancel() {
        setIsEditable(false)
    }

    function handleEditSave() {
        axios.put("/api/restaurants/" + params.id, formData)
            .then((response) => {
                    setIsEditable(false)
                    setRestaurant(response.data)
                }
            )
            .catch((error) => console.log(error.message))
    }

    function deleteRestaurant(){
        if (window.confirm("Are you sure you want to delete this restaurant?"))
        axios.delete("/api/restaurants/" + params.id)
            .then(() => {
                props.saveNewRestaurant(props.restaurants.filter((restaurant) => restaurant.id !== params.id))
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
                {isEditable
                    ? (
                        <div>
                            <input
                                type={"text"}
                                value={formData.title}
                                onChange={event =>
                                    setFormData({...formData, title: event.target.value})}
                                maxLength={100}
                                required={true}
                            />
                            <input
                                type={"text"}
                                value={formData.city}
                                onChange={event => setFormData({...formData, city: event.target.value})}
                                maxLength={100}
                                required={true}
                            />
                            <input
                                type={"text"}
                                value={formData.cuisine}
                                onChange={event => setFormData({...formData, cuisine: event.target.value})}
                                maxLength={50}
                                required={true}
                            />
                            <input
                                type={"text"}
                                value={formData.address.address}
                                onChange={event => setFormData({
                                    ...formData,
                                    address: {...formData.address, address: event.target.value}
                                })}
                                maxLength={100}
                                required={true}
                            />
                            <input
                                type={"text"}
                                value={formData.address.number}
                                onChange={event => setFormData({
                                    ...formData,
                                    address: {...formData.address, number: event.target.value}
                                })}
                                maxLength={5}
                                required={true}
                            />
                            <div>
                                <button onClick={handleEditSave}>Save</button>
                                <button onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div>
                            <h2>{restaurant.title}</h2>
                            <h3>{restaurant.city}</h3>
                            <h3>{restaurant.cuisine}</h3>
                            <h3>{restaurant.address.address}</h3>
                            <h3>{restaurant.address.number}</h3>
                        </div>
                    )
                }
            </div>
            <div className={"ButtonWrapper"}>
                <button className="HomeButton" onClick={navigateToHome}>Back</button>
                <button className="EditButton"
                        onClick={handleEdit}>Edit
                </button>
                <button className="DeleteButton" onClick={deleteRestaurant}>Delete</button>
            </div>
        </div>
    );
}