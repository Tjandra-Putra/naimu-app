import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProtectedAdminRoute = ({ children }) => {
  const dispatch = useDispatch();

  // toast component
  const notifyError = (message) => toast.error(message, { duration: 5000 });

  const { loading, isAuthenticated, user, error } = useSelector((state) => state.userReducer);

  if (!loading) {
    if (!isAuthenticated) {
      if (error) {
        notifyError(error);
        dispatch({ type: "ClearErrors" });
      }

      return <Navigate to="/login" replace />;
    } else if (user?.user?.role !== "admin") {
      notifyError("Admin resource. Access denied.");
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  return null;
};

export default ProtectedAdminRoute;
