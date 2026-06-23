import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import DashboardLayout from "../components/common/DashboardLayout";

function ProtectedRoute() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const storedUser = localStorage.getItem("authUser");

  if (isLoggedIn || storedUser) {
    return <DashboardLayout />;
  }

  return <Navigate to="/login" replace />;
}

export default ProtectedRoute;