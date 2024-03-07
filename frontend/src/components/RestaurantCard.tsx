import {Restaurant} from '../types/Restaurant.ts'
import "./RestaurantCard.css"
import {useNavigate} from "react-router-dom";

type RestaurantCardProps = {
    restaurant: Restaurant,
}
export default function RestaurantCard(props: Readonly<RestaurantCardProps>) {
    const navigate = useNavigate()
    function navigateToDetail(){
        navigate("/restaurants/" + props.restaurant.id)
    }

    return (
        <div className={"RestaurantCard"} onClick={navigateToDetail}>
            <h2 className={"RestaurantTitle"}>{props.restaurant.title}</h2>
            <h3>{props.restaurant.city}</h3>
        </div>
    );
}
