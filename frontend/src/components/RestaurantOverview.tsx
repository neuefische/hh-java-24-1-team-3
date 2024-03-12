import {Restaurant} from "../types/Restaurant.ts";
import RestaurantCard from "./RestaurantCard.tsx";

type RestaurantOverviewProps = {
    restaurants: Restaurant[],
    fetchRestaurants: () => void
}
export default function RestaurantOverview(props: Readonly<RestaurantOverviewProps>) {


    return (
        <div>
            {props.restaurants.map(restaurant => <RestaurantCard key={restaurant.id} restaurant={restaurant}/>)}
        </div>
    );
}

