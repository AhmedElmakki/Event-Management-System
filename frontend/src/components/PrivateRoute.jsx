import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // check if user is logged in
  if (!token) return <Navigate to="/login" replace />; // redirect if not
  return children; // render the page if logged in
};

export default PrivateRoute;
