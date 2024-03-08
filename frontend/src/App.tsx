import {Route, Routes} from "react-router-dom";
import RestaurantOverview from "./components/RestaurantOverview.tsx";
import NewRestaurantForm from "./components/NewRestaurantForm.tsx";
import RestaurantDetail from "./components/RestaurantDetail.tsx";

export default function App() {

  return (
    <>
      <Routes>
        <Route path={"/"} element={<RestaurantOverview/>}/>
          <Route path={"/restaurants/add"} element={<NewRestaurantForm/>}/>
          <Route path={"/restaurants/:id"} element={<RestaurantDetail/>}/>
      </Routes>


    </>
  )
}
