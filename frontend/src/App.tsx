import {Route, Routes} from "react-router-dom";
import RestaurantOverview from "./components/RestaurantOverview.tsx";

export default function App() {

  return (
    <>
      <Routes>
        <Route path={"/"} element={<RestaurantOverview/>}/>
      </Routes>


    </>
  )
}
