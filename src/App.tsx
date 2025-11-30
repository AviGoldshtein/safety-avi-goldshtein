import { Routes, Route } from "react-router-dom";


import Home from "./pages/Home"
import OverView from "./pages/OverView";
import Development from "./pages/Development";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/over-view" element={<OverView />} />
      <Route path="/development" element={<Development />} />
    </Routes>
  )
}

export default App