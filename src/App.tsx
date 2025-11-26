import { Routes, Route } from "react-router-dom";


import Home from "./pages/Home"
import Development from "./pages/Development";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/development" element={<Development />} />
    </Routes>
  )
}

export default App