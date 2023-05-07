import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.userReducer);

  const notifyError = (message) => toast.error(message, { duration: 5000 });

  if (loading === false) {
    if (!isAuthenticated) {
      notifyError("Please login to access this page");
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
