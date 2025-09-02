import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import ManageEvent from "./pages/manage-event";
import AttendeesInsight from "./pages/AttendeesInsight"
import AttendeesDetails from "./pages/AttendeesDetails"
import AddEvent from "./pages/AddEvent"
import EventDetails from "./pages/EventDetails"
import EditEvent from "./pages/EditEvent"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/manage-event" element={<ManageEvent />} />
        <Route path="/AttendeesInsight" element={<AttendeesInsight />} />
        <Route path="/AttendeesDetails" element={<AttendeesDetails />} />
        <Route path="/AddEvent" element={<AddEvent />} />
        <Route path="/EventDetails" element={<EventDetails />} />
        <Route path="/EditEvent" element={<EditEvent />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />

      </Routes>
    </Router>
  );
}