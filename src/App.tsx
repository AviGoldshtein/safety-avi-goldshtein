import { Routes, Route } from "react-router-dom";
import { EventsProvider } from "./context/EventsContext";

import NewEvent from "./pages/NewEvent";
import OverView from "./pages/OverView";
import Development from "./pages/Development";

function App() {
  return (
    <EventsProvider>
      <Routes>
        <Route path="/" element={<NewEvent />} />
        <Route path="/over-view" element={<OverView />} />
        <Route path="/development" element={<Development />} />
      </Routes>
    </EventsProvider>
  );
}

export default App;
