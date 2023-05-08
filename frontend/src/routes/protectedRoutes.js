import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const notifyError = (message) => toast.error(message, { duration: 5000 });

  const { loading, isAuthenticated, error } = useSelector((state) => state.userReducer);

  if (!loading) {
    if (!isAuthenticated) {
      // error toast message is rendered by other components useEffect
      return <Navigate to="/login" replace />;
    }
    // only once authenticated, will remove the error message only if the error message is "Login first to access this resource." if not it will have a bug that removes all error from other components
    else {
      if (error === "Login first to access this resource.") dispatch({ type: "ClearErrors" });
    }
  }

  // clear errors on the redux when user was trying to access a protected route

  return children;
};

export default ProtectedRoute;
