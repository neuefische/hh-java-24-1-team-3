import {Route, Routes} from "react-router-dom";

export default function App() {

  return (
    <>
      <Routes>
        <Route path={"/"} element={<h1>Hello Foodies!</h1>}/>
      </Routes>
    </>
  )
}
