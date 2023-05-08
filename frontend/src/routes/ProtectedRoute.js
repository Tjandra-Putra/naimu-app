import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { loading, isAuthenticated } = useSelector((state) => state.userReducer);

  if (!loading) {
    if (!isAuthenticated) {
      dispatch({ type: "ClearErrors" });

      return <Navigate to="/login" replace />;
    }
  }

  // clear errors on the redux when user was trying to access a protected route

  return children;
};

export default ProtectedRoute;
