import {Link, Route, Routes} from "react-router-dom";
import RestaurantOverview from "./components/RestaurantOverview.tsx";
import NewRestaurantForm from "./components/NewRestaurantForm.tsx";
import RestaurantDetail from "./components/RestaurantDetail.tsx";
import "./App.css"
import {useEffect, useState} from "react";
import {Restaurant} from "./types/Restaurant.ts";
import axios from "axios";
import SearchComponent from "./components/SearchComponent.tsx";


export default function App() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const [searchText, setSearchText] = useState<string>("")

    const filteredRestaurants = restaurants.filter(restaurant => restaurant.title.toLowerCase().includes(searchText.toLowerCase())
        || restaurant.city.toLowerCase().includes(searchText.toLowerCase()))

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = () => {
        axios.get('/api/restaurants')
            .then(response => {
                setRestaurants(response.data);
            })
            .catch(error => {
                console.error('Error fetching Restaurants: ', error);
            });
    }

  return (
    <>
        <header>
            <div className={"HeaderComponent"}>
                <div className={"Wrapper"}>
                    <Link to={"/"}>
                        <img className={"Logo"} src={"foodelicious.png"}
                             alt={"Bild von einem Burger mit Getränk"}/>
                        <h1>Foodelicious</h1>
                    </Link>
                    <Link to={"/restaurants/add"}>Add Restaurant</Link>
                </div>
                <SearchComponent handleSearchText={setSearchText}/>
            </div>
        </header>
        <Routes>
            <Route path={"/"} element={
                filteredRestaurants.length > 0
                    ?
                    <RestaurantOverview restaurants={filteredRestaurants} fetchRestaurants={fetchRestaurants}/>
                    :
                    <h1>No restaurants found</h1>
            }/>
          <Route path={"/restaurants/:id"} element={<RestaurantDetail/>}/>
            <Route path={"/restaurants/add"} element={<NewRestaurantForm/>}/>
      </Routes>
    </>
  )
}
