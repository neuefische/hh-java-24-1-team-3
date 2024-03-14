import {Link, Route, Routes} from "react-router-dom";
import RestaurantOverview from "./components/RestaurantOverview.tsx";
import NewRestaurantForm from "./components/NewRestaurantForm.tsx";
import RestaurantDetail from "./components/RestaurantDetail.tsx";
import "./App.css"
import {useEffect, useState} from "react";
import {Restaurant} from "./types/Restaurant.ts";
import axios from "axios";
import SearchComponent from "./components/SearchComponent.tsx";
import Logo from "./assets/foodelicious.png"


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
                <div className={"HeaderWrapper"}>
                    <Link to={"/"} className={"HeaderLink"}>
                        <h1 className={"HeaderTitle"}>Foodelicious</h1>
                        <img className={"HeaderLogo"} src={Logo}
                             alt={"Bild von einem Burger mit Getränk"}/>
                    </Link>
                </div>
                <div className={"HeaderNavigation"}>
                    <Link to={"/restaurants/add"} className={"HeaderNavLink"}>Add Restaurant</Link>
                    <SearchComponent handleSearchText={setSearchText}/>
                </div>
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
            <Route path={"/restaurants/:id"}
                   element={<RestaurantDetail saveNewRestaurant={setRestaurants} restaurants={restaurants}/>}/>
            <Route path={"/restaurants/add"} element={<NewRestaurantForm saveNewRestaurant={setRestaurants}/>}/>
      </Routes>
    </>
  )
}
