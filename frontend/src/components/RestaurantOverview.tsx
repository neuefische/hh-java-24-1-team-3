import {Restaurant} from "../types/Restaurant.ts";
import RestaurantCard from "./RestaurantCard.tsx";
import "./RestaurantOverview.css";

type RestaurantOverviewProps = {
    restaurants: Restaurant[],
    fetchRestaurants: () => void
}
export default function RestaurantOverview(props: Readonly<RestaurantOverviewProps>) {


    return (
        <div className={"restaurant-grid-container"}>
            <div className={"restaurant-grid"}>
                {props.restaurants.map(restaurant =>
                    <RestaurantCard key={restaurant.id} restaurant={restaurant}/>)}
            </div>
        </div>
    )
}

