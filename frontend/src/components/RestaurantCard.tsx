import {Restaurant} from '../types/Restaurant.ts'
import "./RestaurantCard.css"

type RestaurantCardProps = {
    restaurant: Restaurant,
}
export default function RestaurantCard(props: Readonly<RestaurantCardProps>) {
    return (
        <div className={"RestaurantCard"}>
            <h2>{props.restaurant.title}</h2>
            <h3>{props.restaurant.city}</h3>
        </div>
    );
}
