import {FormEvent, useState} from "react";
import "./NewRestaurantForm.css"
import axios from "axios";



export default function NewRestaurantForm() {

    const [title, setTitle] = useState("")
    const [city, setCity] = useState("")

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    function saveNewRestaurant() {
        setCity("")
        setTitle("")
        axios.post("/api/restaurants",
            {
                title: title,
                city: city
        })
    }


    return (
        <form onSubmit={handleSubmit} >
            <h3>New Restaurant</h3>
            <label>Title:
                <input
                    type={"text"}
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
            </label>
            <label>City:
                <input
                    type={"text"}
                    value={city}
                    onChange={event => setCity(event.target.value)}
                />
            </label>
            <button onClick={saveNewRestaurant}>Add restaurant</button>
        </form>
    );
}
