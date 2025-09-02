import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import ManageEvent from "./pages/manage-event";
import AttendeesInsight from "./pages/AttendeesInsight"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/manage-event" element={<ManageEvent />} />
        <Route path="/AttendeesInsight" element={<AttendeesInsight />} />
      </Routes>
    </Router>
  );
}