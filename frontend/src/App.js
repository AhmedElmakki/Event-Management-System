import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Index from "./pages/index";
import ManageEvent from "./pages/manage-event";
import AttendeesInsight from "./pages/AttendeesInsight"
import AttendeesDetails from "./pages/AttendeesDetails"
import AddEvent from "./pages/AddEvent"
import EventDetails from "./pages/EventDetails"
import EditEvent from "./pages/EditEvent"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ManageUsers from "./pages/manageusers"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute><Index/></PrivateRoute>} />
        <Route path="/manage-event" element={<PrivateRoute><ManageEvent /></PrivateRoute>} />
        <Route path="/AttendeesInsight" element={<PrivateRoute><AttendeesInsight /></PrivateRoute>} />
        <Route path="/ManageUsers" element={<PrivateRoute><ManageUsers /></PrivateRoute>} />
        <Route path="/AttendeesDetails/:id" element={<PrivateRoute><AttendeesDetails /></PrivateRoute>} />
        <Route path="/AddEvent" element={<PrivateRoute><AddEvent /></PrivateRoute>} />
        <Route path="/EventDetails/:id" element={<PrivateRoute><EventDetails /></PrivateRoute>} />
        <Route path="/EditEvent/:id" element={<PrivateRoute><EditEvent /></PrivateRoute>} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />

      </Routes>
    </Router>
  );
}